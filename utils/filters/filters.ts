import { TouristPlan } from "@/types/touristPlan";

export const filterPlansByPropertie = (
  value: string,
  allTours: TouristPlan[],
  param: keyof TouristPlan
) => {
  const filteredTours = allTours.filter((tour) =>
    (tour[param] as string).toLowerCase().includes(value.toLowerCase())
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

    // return tourStartDate >= startDate && tourEndDate <= endDate;
    return tourEndDate >= startDate && tourStartDate <= endDate;
  });

  return filteredTours;
};

export const filterPlansByRange = (
  minValue: number,
  maxValue: number,
  allTours: TouristPlan[],
  filterBy: keyof TouristPlan
) => {
  const filteredTours = allTours.filter((tour) => {
    const value = tour[filterBy] as number;
    return value >= minValue && value <= maxValue;
  });

  return filteredTours;
};
