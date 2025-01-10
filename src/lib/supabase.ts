import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export type Candidate = Database['public']['Tables']['candidates']['Row'];
export type Vote = Database['public']['Tables']['votes']['Row'];