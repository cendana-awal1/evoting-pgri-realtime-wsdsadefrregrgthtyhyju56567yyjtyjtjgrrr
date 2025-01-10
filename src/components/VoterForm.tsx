import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function VoterForm() {
  const [voterNumber, setVoterNumber] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (voterNumber.trim()==='246817') {
      localStorage.setItem('voterNumber', voterNumber);
      navigate('/vote');
    }else if(voterNumber.trim()==='1357908642'){
      navigate('/results');
    }
    else if( voterNumber.trim()==='1234567892') {
      navigate('/progress');
    }
    else{
      alert('Invalid Voter Number');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="voterNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Enter Your Voter Number
        </label>
        <input
          ref={inputRef}
          type="password"
          id="voterNumber"
          value={voterNumber}
          onChange={(e) => setVoterNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., V123456"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Start Voting
      </button>
    </form>
  );
}