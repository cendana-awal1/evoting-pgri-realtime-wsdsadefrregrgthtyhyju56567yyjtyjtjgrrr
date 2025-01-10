import React from 'react';
import { VoterForm } from '../components/VoterForm';

export function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">

          <img src="https://pgrikotasemarang.org/assets/upload/image/Logo.jpg" alt="" width="200" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          PGRI E-Voting System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Welcome to the PGRI Chairman Election. This system ensures a secure and
          transparent voting process for selecting our next chairman.
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <VoterForm />
      </div>
    </div>
  );
}