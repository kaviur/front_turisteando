import { TouristPlan } from "./touristPlan";

export interface RangeProps {
  allTours: TouristPlan[];
  setTours: React.Dispatch<React.SetStateAction<TouristPlan[]>>;
  minValue: number;
  maxValue: number;
  onClose: (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    min: number,
    max: number
  ) => void;
}
