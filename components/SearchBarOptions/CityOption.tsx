import { TouristPlan } from "@/types/touristPlan";
import { filterPlansByCity } from "@/utils/filters/filters";
import { useEffect, useState } from "react";
import ResultsTable from "./ResultsTable";

export interface SearchBarOptionProps {
  value: string;
  setValue: (value: string) => void;
  allTours: TouristPlan[];
  setTours: (tours: TouristPlan[]) => void;
  filterBy?: string;
}

const CityOption: React.FC<SearchBarOptionProps> = ({
  value,
  setValue,
  setTours,
  allTours,
}) => {
  const [selectedTours, setSelectedTours] = useState<TouristPlan[]>([]);

  useEffect(() => {
    if (!value) {
      setSelectedTours([]);
      setTours(allTours);
      return;
    }

    const filteredTours = filterPlansByCity(value, allTours);
    setSelectedTours(filteredTours);
  }, [value, allTours, setTours]);

  const handleTourClick = (cityName: string) => {
    setValue(cityName);
    setTours(allTours.filter((tour) => tour.city.name === cityName));
  };

  const tourCities = Array.from(
    new Set(selectedTours.map((tour) => tour.city.name))
  );

  return (
    <>
      {value.length > 0 && (
        <ResultsTable
          selectedTours={tourCities}
          handleTourClick={handleTourClick}
        />
      )}
    </>
  );
};

export default CityOption;
