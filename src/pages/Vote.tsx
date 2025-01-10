import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCandidates } from '../hooks/useCandidates';
import { useVotes } from '../hooks/useVotes';
import { CandidateCard } from '../components/CandidateCard';

export function Vote() {
  const { candidates, loading } = useCandidates();
  const { castVote } = useVotes();
  const navigate = useNavigate();

  const handleVote = async (candidateId: string) => {
    try {
      await castVote(candidateId);
      const message = 'Thank you for voting!';
      const sanitizedMessage = message.replace(/http?:\/\/[^\s]+/g, '[URL disembunyikan]');
      alert(sanitizedMessage);
      navigate('/');
    } catch (error) {
      alert('Error casting vote. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-xl">Loading candidates...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-2 ">Choose Your Candidate</h2>
      <div className='min-h-screen flex items-center justify-center'>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 item-center justify-center">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onVote={handleVote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}