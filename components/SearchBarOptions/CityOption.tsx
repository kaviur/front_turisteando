import { TouristPlan } from "@/types/touristPlan";
import { filterPlansByCity } from "@/utils/filters/filters";
import { useEffect, useState } from "react";
import ResultsTable from "./ResultsTable";

export interface SearchBarOptionProps {
  value: string;
  setValue: (value: string) => void;
  allTours: TouristPlan[];
  setTours: (tours: TouristPlan[]) => void;
}

const CityOption: React.FC<SearchBarOptionProps> = ({
  value,
  setValue,
  setTours,
  allTours,
}) => {
  const [selectedTours, setSelectedTours] = useState<TouristPlan[]>([]);
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setSelectedTours([]);
      return;
    }

    const filteredTours = filterPlansByCity(value, allTours);
    console.log(filteredTours);
    setSelectedTours(filteredTours);
  }, [value, allTours]);

  const handleTourClick = (cityName: string) => {
    setSelectedTour(cityName);
    setValue(cityName);
    setTours(allTours.filter((tour) => tour.city.name === cityName));
  };

  const handleRemoveTour = () => {
    setSelectedTour(null);
    setValue("");
    setTours(allTours);
  };

  const tourCities = Array.from(
    new Set(selectedTours.map((tour) => tour.city.name))
  );

  return (
    <>
      {selectedTours.length > 0 && (
        <ResultsTable
          selectedTour={selectedTour}
          selectedTours={tourCities}
          handleTourClick={handleTourClick}
          handleRemoveTour={handleRemoveTour}
        />
      )}
    </>
  );
};

export default CityOption;
