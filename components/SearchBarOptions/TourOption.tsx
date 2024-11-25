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
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setSelectedTours([]);
      return;
    }

    const filteredTours = filterPlansByTitle(value, allTours);
    setSelectedTours(filteredTours);
  }, [value, allTours]);

  const handleTourClick = (tourTitle: string) => {
    setSelectedTour(tourTitle);
    setValue(tourTitle);
    setTours(allTours.filter((tour) => tour.title === tourTitle));
  };

  const handleRemoveTour = () => {
    setSelectedTour(null);
    setValue("");
    setTours(allTours);
  };

  const tourNames = selectedTours.map((tour) => tour.title);

  return (
    <>
      {selectedTours.length > 0 && (
        <ResultsTable
          selectedTour={selectedTour}
          selectedTours={tourNames}
          handleTourClick={handleTourClick}
          handleRemoveTour={handleRemoveTour}
        />
      )}
    </>
  );
};

export default TourOption;
