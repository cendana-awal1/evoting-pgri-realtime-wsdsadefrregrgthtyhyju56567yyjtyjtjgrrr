import React from 'react';
import { NavLink } from 'react-router-dom';
import { Vote, BarChart3, Home, Activity } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive
                    ? 'border-b-2 border-indigo-500 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </NavLink>
            <NavLink
              to="/vote"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive
                    ? 'border-b-2 border-indigo-500 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <Vote className="w-4 h-4 mr-2" />
              Vote
            </NavLink>
            <NavLink
              to="/results"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive
                    ? 'border-b-2 border-indigo-500 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Results
            </NavLink>
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive
                    ? 'border-b-2 border-indigo-500 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <Activity className="w-4 h-4 mr-2" />
              Progress
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}