export interface TouristPlan {
  id: number;
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
  characteristic:{
    id: number,
    name: string,
    icon: {
      id: number;
      imageUrl: string;
    }
  }[];
  foodIncluded: boolean;
  wifiIncluded: boolean;
  petsFriendly: boolean;
  disabilityAccess: boolean;
  active: boolean;
}

