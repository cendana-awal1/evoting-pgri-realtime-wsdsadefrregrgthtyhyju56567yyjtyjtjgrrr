/*
  # Insert Dummy Candidates

  1. Data
    - Insert 3 sample candidates with realistic data
    - Each candidate has:
      - Name
      - Description (vision and mission)
      - Photo URL (from Unsplash)
*/

-- Insert dummy candidates if they don't exist
INSERT INTO candidates (name, description, photo_url)
SELECT
  'Dr. Ahmad Syafii',
  'Dedicated educator with 20 years of experience. Committed to improving teacher welfare and professional development. Vision: Create an innovative and inclusive education system.',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'
WHERE NOT EXISTS (
  SELECT 1 FROM candidates WHERE name = 'Dr. Ahmad Syafii'
);

INSERT INTO candidates (name, description, photo_url)
SELECT
  'Prof. Sarah Wijaya',
  'Expert in educational technology and curriculum development. Focused on modernizing teaching methods and implementing digital learning solutions.',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
WHERE NOT EXISTS (
  SELECT 1 FROM candidates WHERE name = 'Prof. Sarah Wijaya'
);

INSERT INTO candidates (name, description, photo_url)
SELECT
  'Dr. Budi Santoso',
  'Experienced administrator and education policy expert. Aims to strengthen school-community partnerships and enhance educational quality standards.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800'
WHERE NOT EXISTS (
  SELECT 1 FROM candidates WHERE name = 'Dr. Budi Santoso'
);