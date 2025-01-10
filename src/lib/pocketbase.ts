import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://awaluddin.pockethost.io');

export type Candidate = {
  id: string;
  name: string;
  description: string;
  photo: string;
  expand?: {
    votes: Vote[];
  };
};

export type Vote = {
  id: string;
  voterId: string;
  candidateId: string;
  timestamp: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
};