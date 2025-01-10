import { useEffect, useState } from 'react';
import { supabase, type Vote } from '../lib/supabase';

export function useVotes() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVotes();

    // Subscribe to real-time changes with optimistic updates
    const channel = supabase
      .channel('votes-channel')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'votes' 
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Optimistically update the votes array
            setVotes(currentVotes => [...currentVotes, payload.new as Vote]);
          } else {
            // For other changes, refetch to ensure consistency
            fetchVotes();
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to real-time changes');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchVotes() {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setVotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function castVote(candidateId: string) {
    try {
      const { error } = await supabase
        .from('votes')
        .insert([{ candidate_id: candidateId }]);

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  return { votes, loading, error, castVote };
}