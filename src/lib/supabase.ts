import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const supabase = createClient<Database>(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6c3JhcHljeWFsYm9yeGZvaGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwODg5MTMsImV4cCI6MjA1MTY2NDkxM30.RZsLOvDu0HOrApuV16wvGXpa_6LyKDc9qfbMm1lSkSs'
,
  'https://szsrapycyalborxfohgt.supabase.co'
);

export type Candidate = Database['public']['Tables']['candidates']['Row'];
export type Vote = Database['public']['Tables']['votes']['Row'];
