import { TouristPlan } from "./touristPlan";

export interface RangeProps {
  allTours: TouristPlan[];
  setTours: React.Dispatch<React.SetStateAction<TouristPlan[]>> | ((plans: TouristPlan[]) => void);
  minValue: number;
  maxValue: number;
  onClose: (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    min: number,
    max: number
  ) => void;
}
