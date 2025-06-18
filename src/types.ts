export interface StudentType {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  cf_handle: string;
  current_rating?: number;
  max_rating?: number;
  allow_email: boolean;
  reminder_count?: number;
  rank?: string;
  max_rank?: string;
  last_sync?: Date;
}

export interface ContestDataType {
  _id: string;
  contestName: string;
  date: string;
  oldRating: number;
  newRating: number;
  rank: number;
  unsolvedProblems: number;
}
