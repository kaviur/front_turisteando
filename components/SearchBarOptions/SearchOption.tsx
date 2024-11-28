import { TouristPlan } from "@/types/touristPlan";
import { filterPlansByPropertie } from "@/utils/filters/filters";
import { useEffect, useState } from "react";
import { SearchBarOptionProps } from "./CityOption";
import ResultsTable from "./ResultsTable";

const SearchOption: React.FC<SearchBarOptionProps> = ({
  value,
  setValue,
  setTours,
  allTours,
  filterBy,
}) => {
  const [selectedTours, setSelectedTours] = useState<TouristPlan[]>([]);

  const propertie = filterBy === "Tours" ? "title" : "seller";

  useEffect(() => {
    if (!value) {
      setSelectedTours([]);
      setTours(allTours);
      return;
    }

    const filteredTours = filterPlansByPropertie(value, allTours, propertie);
    setSelectedTours(filteredTours);
  }, [value, allTours, setTours, propertie]);

  const handleTourClick = (tourPropertie: string) => {
    setValue(tourPropertie);
    setTours(allTours.filter((tour) => tour[propertie] === tourPropertie));
  };

  const tourNames =
    filterBy === "Empresa"
      ? Array.from(new Set(selectedTours.map((tour) => tour.seller)))
      : selectedTours.map((tour) => tour.title);

  return (
    <>
      {value.length > 0 && (
        <ResultsTable
          selectedTours={tourNames}
          handleTourClick={handleTourClick}
        />
      )}
    </>
  );
};

export default SearchOption;
