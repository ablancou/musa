'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UserStoreState {
  // State
  user: Profile | null;
  loading: boolean;
  authenticated: boolean;
  error: string | null;

  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string,
    preferredLanguage: string,
    level?: 'starter' | 'explorer' | 'enthusiast' | 'connoisseur'
  ) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;

  // Profile actions
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;

  // Streak actions
  checkStreak: () => Promise<void>;
  incrementStreak: () => Promise<void>;

  // Utility
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useUserStore = create<UserStoreState>((set, get) => ({
  // Initial state
  user: null,
  loading: false,
  authenticated: false,
  error: null,

  // Auth actions
  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user?.id)
        .single();

      if (profileError) throw profileError;

      set({
        user: profile,
        authenticated: true,
        loading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Login failed';
      set({
        error: message,
        authenticated: false,
        loading: false,
      });
      throw error;
    }
  },

  register: async (
    email: string,
    password: string,
    displayName: string,
    preferredLanguage: string,
    level = 'starter'
  ) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('Failed to create user');

      const now = new Date().toISOString();
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        display_name: displayName,
        preferred_language: preferredLanguage,
        level: level as 'starter' | 'explorer' | 'enthusiast' | 'connoisseur',
        streak_count: 0,
        streak_last_date: null,
        total_xp: 0,
        created_at: now,
        updated_at: now,
      });

      if (profileError) throw profileError;

      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (fetchError) throw fetchError;

      set({
        user: profile,
        authenticated: true,
        loading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      set({
        error: message,
        authenticated: false,
        loading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({
        user: null,
        authenticated: false,
        loading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Logout failed';
      set({ error: message, loading: false });
      throw error;
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Google sign-in failed';
      set({
        error: message,
        loading: false,
      });
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/reset-password`,
      });

      if (error) throw error;

      set({ loading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Password reset failed';
      set({
        error: message,
        loading: false,
      });
      throw error;
    }
  },

  // Profile actions
  updateProfile: async (updates: Partial<Profile>) => {
    try {
      set({ loading: true, error: null });
      const state = get();
      if (!state.user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', state.user.id)
        .select()
        .single();

      if (error) throw error;

      set({
        user: data,
        loading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Profile update failed';
      set({
        error: message,
        loading: false,
      });
      throw error;
    }
  },

  refreshProfile: async () => {
    try {
      set({ loading: true, error: null });
      const state = get();
      if (!state.user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', state.user.id)
        .single();

      if (error) throw error;

      set({
        user: data,
        loading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to refresh profile';
      set({
        error: message,
        loading: false,
      });
      throw error;
    }
  },

  // Streak actions
  checkStreak: async () => {
    try {
      const state = get();
      if (!state.user) return;

      const lastDate = state.user.streak_last_date
        ? new Date(state.user.streak_last_date)
        : null;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!lastDate) {
        return;
      }

      const lastDateOnly = new Date(lastDate);
      lastDateOnly.setHours(0, 0, 0, 0);

      const dayDifference =
        (today.getTime() - lastDateOnly.getTime()) / (1000 * 60 * 60 * 24);

      if (dayDifference > 1) {
        await get().updateProfile({
          streak_count: 0,
          streak_last_date: null,
        } as Partial<Profile>);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to check streak';
      set({ error: message });
    }
  },

  incrementStreak: async () => {
    try {
      set({ error: null });
      const state = get();
      if (!state.user) throw new Error('No user logged in');

      const today = new Date().toISOString().split('T')[0];
      const lastDate = state.user.streak_last_date
        ? state.user.streak_last_date.split('T')[0]
        : null;

      if (lastDate === today) {
        return;
      }

      await get().updateProfile({
        streak_count: (state.user.streak_count || 0) + 1,
        streak_last_date: new Date().toISOString(),
      } as Partial<Profile>);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to increment streak';
      set({ error: message });
      throw error;
    }
  },

  // Utility
  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
