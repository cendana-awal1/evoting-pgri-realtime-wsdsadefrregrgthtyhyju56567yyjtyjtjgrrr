import React from 'react';
import { useCandidates } from '../hooks/useCandidates';
import { useVotes } from '../hooks/useVotes';
import { VoteStats } from '../components/VoteStats';

export function Results() {
  const { candidates, loading: loadingCandidates } = useCandidates();
  const { votes } = useVotes();

  const votesByCandidate = votes.reduce((acc, vote) => {
    acc[vote.candidate_id] = (acc[vote.candidate_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loadingCandidates) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-xl">Loading results...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Live Voting Results</h2>
      <VoteStats
        candidates={candidates}
        votes={votesByCandidate}
        totalVotes={votes.length}
      />
    </div>
  );
}