import React from 'react';
import type { Candidate } from '../lib/supabase';

interface Props {
  candidate: Candidate;
  onVote: (candidateId: string) => Promise<void>;
}

export function CandidateCard({ candidate, onVote }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={candidate.photo_url}
        alt={candidate.name}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{candidate.name}</h3>
        {/* <p className="text-gray-600 mb-4">{candidate.description}</p> */}
        <button
          onClick={() => onVote(candidate.id)}
          className="w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Vote for {candidate.name}
        </button>
      </div>
    </div>
  );
}