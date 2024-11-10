export interface TouristPlanRequestDto {
  title: string;
  description: string;
  price: number;
  seller: string;
  cityId: number;
  categoryId: number;
  multipartImages?: string[];
  imagesUrl?: string[];
  availabilityStartDate: string;
  availabilityEndDate: string;
  capacity: number;
  duration: string;
  foodIncluded: boolean;
  wifiIncluded: boolean;
  petsFriendly: boolean;
  disabilityAccess: boolean;
}
