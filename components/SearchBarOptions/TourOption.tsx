import { TouristPlan } from "@/types/touristPlan";
import { filterPlansByTitle } from "@/utils/filters/filters";
import { useEffect, useState } from "react";
import { SearchBarOptionProps } from "./CityOption";
import ResultsTable from "./ResultsTable";

const TourOption: React.FC<SearchBarOptionProps> = ({
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

    const filteredTours = filterPlansByTitle(value, allTours);
    setSelectedTours(filteredTours);
  }, [value, allTours, setTours]);

  const handleTourClick = (tourTitle: string) => {
    setValue(tourTitle);
    setTours(allTours.filter((tour) => tour.title === tourTitle));
  };

  const tourNames = selectedTours.map((tour) => tour.title);

  return (
    <>
      {selectedTours.length > 0 && (
        <ResultsTable
          selectedTours={tourNames}
          handleTourClick={handleTourClick}
        />
      )}
    </>
  );
};

export default TourOption;
