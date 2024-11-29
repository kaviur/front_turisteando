export interface Review {
  comment: string;
  idReview: number;
  date: string;
  rating: number;
  user: {
    email: string;
    id: number;
    name: string;
    isActive: boolean;
    date: string;
    role: string;
  };
}