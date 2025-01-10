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
      candidates: {
        Row: {
          id: string
          name: string
          description: string
          photo_url: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          photo_url: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          photo_url?: string
          created_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          candidate_id: string
          created_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          created_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          created_at?: string
        }
      }
    }
  }
}