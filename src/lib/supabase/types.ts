export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          avatar_url: string | null;
          preferred_language: string;
          level: 'starter' | 'explorer' | 'enthusiast' | 'connoisseur';
          streak_count: number;
          streak_last_date: string | null;
          total_xp: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name: string;
          avatar_url?: string | null;
          preferred_language?: string;
          level?: 'starter' | 'explorer' | 'enthusiast' | 'connoisseur';
          streak_count?: number;
          streak_last_date?: string | null;
          total_xp?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string;
          avatar_url?: string | null;
          preferred_language?: string;
          level?: 'starter' | 'explorer' | 'enthusiast' | 'connoisseur';
          streak_count?: number;
          streak_last_date?: string | null;
          total_xp?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          slug: string;
          era_id: string;
          artist_id: string;
          order_index: number;
          difficulty_level: string;
          duration_minutes: number;
          image_urls: string[];
          music_connections: string[];
          published_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          era_id: string;
          artist_id: string;
          order_index: number;
          difficulty_level: string;
          duration_minutes: number;
          image_urls: string[];
          music_connections?: string[];
          published_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          era_id?: string;
          artist_id?: string;
          order_index?: number;
          difficulty_level?: string;
          duration_minutes?: number;
          image_urls?: string[];
          music_connections?: string[];
          published_at?: string | null;
        };
      };
      lesson_translations: {
        Row: {
          id: string;
          lesson_id: string;
          language_code: string;
          title: string;
          subtitle: string;
          narrative_content: Record<string, unknown>;
          quiz_data: Record<string, unknown>;
          meta_description: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          language_code: string;
          title: string;
          subtitle: string;
          narrative_content: Record<string, unknown>;
          quiz_data: Record<string, unknown>;
          meta_description: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          language_code?: string;
          title?: string;
          subtitle?: string;
          narrative_content?: Record<string, unknown>;
          quiz_data?: Record<string, unknown>;
          meta_description?: string;
        };
      };
      user_lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          status: 'not_started' | 'in_progress' | 'completed';
          score: number | null;
          completed_at: string | null;
          time_spent_seconds: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          status?: 'not_started' | 'in_progress' | 'completed';
          score?: number | null;
          completed_at?: string | null;
          time_spent_seconds?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          status?: 'not_started' | 'in_progress' | 'completed';
          score?: number | null;
          completed_at?: string | null;
          time_spent_seconds?: number;
        };
      };
      achievements: {
        Row: {
          id: string;
          slug: string;
          icon_url: string;
          xp_reward: number;
          rarity: 'common' | 'rare' | 'epic' | 'legendary';
        };
        Insert: {
          id?: string;
          slug: string;
          icon_url: string;
          xp_reward: number;
          rarity?: 'common' | 'rare' | 'epic' | 'legendary';
        };
        Update: {
          id?: string;
          slug?: string;
          icon_url?: string;
          xp_reward?: number;
          rarity?: 'common' | 'rare' | 'epic' | 'legendary';
        };
      };
      achievement_translations: {
        Row: {
          id: string;
          achievement_id: string;
          language_code: string;
          title: string;
          description: string;
        };
        Insert: {
          id?: string;
          achievement_id: string;
          language_code: string;
          title: string;
          description: string;
        };
        Update: {
          id?: string;
          achievement_id?: string;
          language_code?: string;
          title?: string;
          description?: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          unlocked_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_id?: string;
          unlocked_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_level: 'starter' | 'explorer' | 'enthusiast' | 'connoisseur';
      lesson_status: 'not_started' | 'in_progress' | 'completed';
      achievement_rarity: 'common' | 'rare' | 'epic' | 'legendary';
    };
  };
};
