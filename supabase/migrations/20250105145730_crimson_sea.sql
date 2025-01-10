/*
  # Update Schema and Security Policies

  1. Tables
    - Ensure tables exist with proper structure
    - Add IF NOT EXISTS checks to prevent errors
  
  2. Security
    - Enable RLS on both tables
    - Add public read access for candidates
    - Add public read/write access for votes
*/

-- Create tables if they don't exist
DO $$ 
BEGIN
  -- Create candidates table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'candidates') THEN
    CREATE TABLE candidates (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      description text NOT NULL,
      photo_url text NOT NULL,
      created_at timestamptz DEFAULT now()
    );
  END IF;

  -- Create votes table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'votes') THEN
    CREATE TABLE votes (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
      created_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON candidates;
DROP POLICY IF EXISTS "Allow public read access" ON votes;
DROP POLICY IF EXISTS "Allow public insert access" ON votes;

-- Create new policies
CREATE POLICY "Allow public read access" ON candidates
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public read access" ON votes
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public insert access" ON votes
  FOR INSERT TO public
  WITH CHECK (true);