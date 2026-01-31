export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          slug: string;
          title_vi: string;
          title_en: string;
          title_zh: string;
          category: string;
          services: string[];
          location: string;
          scale: string | null;
          year: number;
          client: string | null;
          summary_vi: string | null;
          summary_en: string | null;
          summary_zh: string | null;
          content_vi: string | null;
          content_en: string | null;
          content_zh: string | null;
          cover_image: string | null;
          gallery: string[];
          featured: boolean;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_vi: string;
          title_en: string;
          title_zh: string;
          category: string;
          services?: string[];
          location: string;
          scale?: string | null;
          year: number;
          client?: string | null;
          summary_vi?: string | null;
          summary_en?: string | null;
          summary_zh?: string | null;
          content_vi?: string | null;
          content_en?: string | null;
          content_zh?: string | null;
          cover_image?: string | null;
          gallery?: string[];
          featured?: boolean;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_vi?: string;
          title_en?: string;
          title_zh?: string;
          category?: string;
          services?: string[];
          location?: string;
          scale?: string | null;
          year?: number;
          client?: string | null;
          summary_vi?: string | null;
          summary_en?: string | null;
          summary_zh?: string | null;
          content_vi?: string | null;
          content_en?: string | null;
          content_zh?: string | null;
          cover_image?: string | null;
          gallery?: string[];
          featured?: boolean;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name_vi: string;
          name_en: string;
          name_zh: string;
          description_vi: string | null;
          description_en: string | null;
          description_zh: string | null;
          icon: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name_vi: string;
          name_en: string;
          name_zh: string;
          description_vi?: string | null;
          description_en?: string | null;
          description_zh?: string | null;
          icon?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name_vi?: string;
          name_en?: string;
          name_zh?: string;
          description_vi?: string | null;
          description_en?: string | null;
          description_zh?: string | null;
          icon?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      team: {
        Row: {
          id: string;
          name: string;
          role_vi: string;
          role_en: string;
          role_zh: string;
          bio_vi: string | null;
          bio_en: string | null;
          bio_zh: string | null;
          photo: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role_vi: string;
          role_en: string;
          role_zh: string;
          bio_vi?: string | null;
          bio_en?: string | null;
          bio_zh?: string | null;
          photo?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role_vi?: string;
          role_en?: string;
          role_zh?: string;
          bio_vi?: string | null;
          bio_en?: string | null;
          bio_zh?: string | null;
          photo?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          message: string;
          attachments: string[];
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          message: string;
          attachments?: string[];
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          message?: string;
          attachments?: string[];
          status?: string;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          title_vi: string;
          title_en: string;
          title_zh: string;
          summary_vi: string | null;
          summary_en: string | null;
          summary_zh: string | null;
          content: Json | null;
          cover_image: string | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_vi: string;
          title_en: string;
          title_zh: string;
          summary_vi?: string | null;
          summary_en?: string | null;
          summary_zh?: string | null;
          content?: Json | null;
          cover_image?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_vi?: string;
          title_en?: string;
          title_zh?: string;
          summary_vi?: string | null;
          summary_en?: string | null;
          summary_zh?: string | null;
          content?: Json | null;
          cover_image?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          website: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          website?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          website?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

