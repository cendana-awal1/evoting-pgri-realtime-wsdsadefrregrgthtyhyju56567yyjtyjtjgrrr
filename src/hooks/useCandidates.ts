import { useEffect, useState } from 'react';
import { supabase, type Candidate } from '../lib/supabase';

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidates();

    const channel = supabase
      .channel('candidates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'candidates' }, 
        () => fetchCandidates()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchCandidates() {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setCandidates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return { candidates, loading, error };
}