'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UseAuthReturn {
  user: Profile | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName: string,
    preferredLanguage: string,
    level?: 'starter' | 'explorer' | 'enthusiast' | 'connoisseur'
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

/**
 * Custom hook for authentication
 * Wraps Supabase auth functionality and syncs with user store
 */
export function useAuth(): UseAuthReturn {
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    user,
    loading,
    error,
    login,
    register,
    logout,
    signInWithGoogle,
    resetPassword,
  } = useUserStore();

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            useUserStore.setState({
              user: profile,
              authenticated: true,
            });
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          useUserStore.setState({
            user: profile,
            authenticated: true,
            error: null,
          });
        }
      } else if (event === 'SIGNED_OUT') {
        useUserStore.setState({
          user: null,
          authenticated: false,
          error: null,
        });
      } else if (event === 'TOKEN_REFRESHED') {
        // Token was automatically refreshed
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return {
    user,
    loading: !isInitialized || loading,
    error,
    signInWithEmail: login,
    signUpWithEmail: register,
    signInWithGoogle,
    signOut: logout,
    resetPassword,
  };
}
