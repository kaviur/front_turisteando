export interface TouristPlan {
  id: number;
  title: string;
  description: string;
  rating: number;
  totalReviews?: number;
  totalStars?: number;  
  price: number;
  seller: string;
  city: {
    id: number;
    name: string;
    country: {
      id: number;
      name: string;
    };
  };
  category: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  images: {
    id: number;
    imageUrl: string;
  }[];
  reviews: {
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
  }[];
  availabilityStartDate: string;
  availabilityEndDate: string;
  capacity: number;
  duration: string;
  characteristic: {
    id: number;
    name: string;
    image: {
      id: number;
      imageUrl: string;
    };
  }[];
  active: boolean;
  isFavorite?: boolean;
}
