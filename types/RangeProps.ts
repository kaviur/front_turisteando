import { TouristPlan } from "./touristPlan";

export interface RangeProps {
  allTours: TouristPlan[];
  setTours: React.Dispatch<React.SetStateAction<TouristPlan[]>>;
  minValue: number;
  maxValue: number;
}
