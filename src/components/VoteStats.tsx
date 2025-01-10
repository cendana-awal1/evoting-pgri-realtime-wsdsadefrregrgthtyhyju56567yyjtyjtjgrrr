import React from 'react';
import type { Candidate } from '../lib/supabase';

interface Props {
  candidates: Candidate[];
  votes: Record<string, number>;
  totalVotes: number;
}

export function VoteStats({ candidates, votes, totalVotes }: Props) {
  const sortedCandidates = [...candidates].sort((a, b) => 
    (votes[b.id] || 0) - (votes[a.id] || 0)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Live Vote Statistics</h2>
      <div className="space-y-4">
        {sortedCandidates.map((candidate) => {
          const voteCount = votes[candidate.id] || 0;
          const percentage = totalVotes > 0 
            ? ((voteCount / totalVotes) * 100).toFixed(1) 
            : '0';

          return (
            <div key={candidate.id}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{candidate.name}</span>
                <span className="text-sm text-gray-600">{voteCount} votes ({percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Total votes: {totalVotes}
      </p>
    </div>
  );
}