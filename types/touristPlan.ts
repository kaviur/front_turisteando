export interface TouristPlan {
  id: string;
  title: string;
  description: string;
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
  availabilityStartDate: string;
  availabilityEndDate: string;
  capacity: number;
  duration: string;
  characteristic: {
    id: number;
    name: string;
    image: string;
  }[];
  active: boolean;
}
