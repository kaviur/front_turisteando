import { TouristPlan } from "@/types/touristPlan";

export const filterPlansByTitle = (value: string, allTours: TouristPlan[]) => {
  const filteredTours = allTours.filter((tour) =>
    tour.title.toLowerCase().includes(value.toLowerCase())
  );
  return filteredTours;
};

export const filterPlansByCity = (value: string, allTours: TouristPlan[]) => {
  const filteredTours = allTours.filter((tour) =>
    tour.city.name.toLowerCase().includes(value.toLowerCase())
  );
  return filteredTours;
};

export const filterPlansByDateRange = (
  startDate: Date,
  endDate: Date,
  allTours: TouristPlan[]
) => {
  const filteredTours = allTours.filter((tour) => {
    const tourStartDate = new Date(tour.availabilityStartDate);
    const tourEndDate = new Date(tour.availabilityEndDate);

    return tourStartDate >= startDate && tourEndDate <= endDate;
  });

  return filteredTours;
};

export const filterPlansByPriceRange = (
  minPrice: number,
  maxPrice: number,
  allTours: TouristPlan[]
) => {
  const filteredTours = allTours.filter((tour) => {
    const price = tour.price;
    return price >= minPrice && price <= maxPrice;
  });

  return filteredTours;
};
