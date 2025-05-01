export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      packages: {
        Row: {
          id: string
          name: string
          price: number
          credits: number
          description: string | null
          features: string[] | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          price: number
          credits: number
          description?: string | null
          features?: string[] | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          price?: number
          credits?: number
          description?: string | null
          features?: string[] | null
          created_at?: string | null
        }
      }
      user_accounts: {
        Row: {
          id: string
          user_id: string
          credits: number | null
          active_package_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          credits?: number | null
          active_package_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          credits?: number | null
          active_package_id?: string | null
          created_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          package_id: string
          amount: number
          status: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          package_id: string
          amount: number
          status: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          package_id?: string
          amount?: number
          status?: string
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}