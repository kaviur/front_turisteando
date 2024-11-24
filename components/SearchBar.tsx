import { TouristPlan } from "@/types/touristPlan";
import { useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineSearch } from "react-icons/md";
import Calendar from "./Calendar";
import {
  filterPlansByDateRange,
  filterPlansByTitle,
} from "@/utils/filters/filters";
import { Range } from "react-date-range";
import PriceRange from "./PriceRange";

type SearchBarProps = {
  setTours: React.Dispatch<React.SetStateAction<TouristPlan[]>>;
  allTours: TouristPlan[];
};

const SearchBar = ({ setTours, allTours }: SearchBarProps) => {
  const [selectedOption, setSelectedOption] = useState("Lugares");
  const [selectedTours, setSelectedTours] = useState<TouristPlan[]>([]);
  const [rangeDate, setRangeDate] = useState<Range>({});

  const searchOptions = [
    "Lugares",
    "Fecha",
    "Categoría",
    "Capacidad",
    "Tours",
    "Precio",
  ];

  const allowOptions = ["Tours", "Lugares"];

  const handleSelectedOption = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelectedOption(e.currentTarget.textContent || "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const filteredTours = filterPlansByTitle(value, allTours);

    setSelectedTours(filteredTours);
    setTours(filteredTours);

    if (value === "") {
      setSelectedTours([]);
    }
  };

  const handleGetRangeDate = (rangeDate: Range) => {
    setRangeDate(rangeDate);
  };

  useEffect(() => {
    if (rangeDate.startDate && rangeDate.endDate) {
      const filteredTours = filterPlansByDateRange(
        rangeDate.startDate,
        rangeDate.endDate,
        allTours
      );
      setTours(filteredTours);
    }
  }, [rangeDate.startDate, rangeDate.endDate, allTours, setTours]);

  const optionsList = searchOptions.map((option, index) => (
    <li
      key={index}
      className="px-4 py-2 text-white hover:bg-pink-600 text-sm cursor-pointer font-medium rounded-xl"
      onClick={handleSelectedOption}
    >
      {option}
    </li>
  ));

  const toursList = selectedTours.map((tour, index) => (
    <li
      key={index}
      className="px-4 py-2 text-white hover:bg-pink-600 text-sm cursor-pointer font-medium rounded-xl"
    >
      {tour.title}
    </li>
  ));

   const handlePriceChange = (range: { min: number; max: number }) => {
     console.log("Price Range Updated:", range);
   };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white rounded-full shadow-lg p-1.5 relative">
        <div className="dropdown dropdown-hover w-[135px]">
          <div
            tabIndex={0}
            role="button"
            className="btn ml-2 bg-white border-none hover:bg-white w-full"
          >
            {selectedOption}
            <IoChevronDownOutline />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box z-[1] w-36 p-2 shadow bg-primary"
          >
            {optionsList}
          </ul>
        </div>
        <input
          disabled={allowOptions.includes(selectedOption) ? false : true}
          type="text"
          onChange={handleChange}
          placeholder="Comienza tu búsqueda aquí..."
          className=" flex-grow p-2 text-gray-700 outline-none"
        />
        <MdOutlineSearch className="mr-6" size={24} color="oklch(var(--p))" />
      </div>

      {/**
       * Mostrar el calendario si la opción seleccionada es 'Fecha'
       */}
      {selectedOption === "Fecha" && (
        <Calendar onRangeDate={handleGetRangeDate} />
      )}

      <PriceRange
        minPrice={0}
        maxPrice={5000}
        step={50}
        onRangeChange={handlePriceChange}
      />

      {/**
       * Resultados de la búsqueda para 'Lugares' y 'Tours'
       */}
      <div
        className={`absolute -bottom-1 right-0 mt-2 translate-y-full bg-primary w-[390px] rounded-lg p-2 text-start max-h-[230px] overflow-auto ${
          selectedTours.length > 0 ? "block" : "hidden"
        }`}
      >
        <ul>
          {selectedTours.length > 0 ? (
            toursList
          ) : (
            <li className="px-4 py-2 text-white text-sm font-medium rounded-xl">
              No se encontraron resultados
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
