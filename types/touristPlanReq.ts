export interface TouristPlanReq {
    title: string;
    description: string;
    price: number | string;
    seller: string;
    cityId: number | string;
    categoryId: number | string;
    availabilityStartDate: string;
    availabilityEndDate: string;
    capacity: number;
    duration: string;
    characteristicIds: number[];
    images: File[] | null;
    imagesToDelete?: string[];
    rating?: number;        // Rating como opcional
    totalReviews?: number;  // Total de reseñas como opcional
    totalStars?: number;    // Total de estrellas como opcional
}