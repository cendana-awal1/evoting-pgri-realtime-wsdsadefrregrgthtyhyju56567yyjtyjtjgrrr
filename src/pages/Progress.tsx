import React, { useEffect, useState } from 'react';
import { useVotes } from '../hooks/useVotes';

const TOTAL_VOTERS = 300;

export function Progress() {
  const { votes } = useVotes();
  const [animatedCount, setAnimatedCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const totalVotes = votes.length;
  const percentage = ((totalVotes / TOTAL_VOTERS) * 100).toFixed(1);
  useEffect(() => {
    // Reload window every 10 seconds
    const reloadInterval = setInterval(() => {
      window.location.reload();
    }, 15000);

    return () => clearInterval(reloadInterval);
  }, []);
  useEffect(() => {
    // Update clock every second
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 3000);

    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    // Animate the count when votes change
    const duration = 800;
    const steps = 30;
    const increment = (totalVotes - animatedCount) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedCount(prev => {
          const next = prev + increment;
          return Math.min(Math.round(next), totalVotes);
        });
        currentStep++;
      } else {
        setAnimatedCount(totalVotes);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalVotes]);

  const formattedTime = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Voting Progress</h2>
        <div className="text-lg font-mono bg-gray-100 px-3 py-1 rounded-md">
          {formattedTime}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-medium text-gray-700">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-600 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Voters</p>
            <p className="text-2xl font-bold text-blue-600">{TOTAL_VOTERS}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Votes Cast</p>
            <p className="text-2xl font-bold text-green-600 transition-all duration-300">
              {animatedCount}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Remaining Voters</p>
            <p className="text-2xl font-bold text-orange-600 transition-all duration-300">
              {TOTAL_VOTERS - animatedCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}