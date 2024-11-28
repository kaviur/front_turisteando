import { TouristPlan } from "@/types/touristPlan";
import { useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineSearch } from "react-icons/md";
import CalendarOption, {
  DateRangeState,
} from "./SearchBarOptions/CalendarOption";
import { filterPlansByDateRange } from "@/utils/filters/filters";
import { Range } from "react-date-range";
import PriceOption from "./SearchBarOptions/PriceOption";
import SearchOption from "./SearchBarOptions/SearchOption";
import CityOption from "./SearchBarOptions/CityOption";
import CapacityOption from "./SearchBarOptions/CapacityOption";

type SearchBarProps = {
  setTours: React.Dispatch<React.SetStateAction<TouristPlan[]>>;
  allTours: TouristPlan[];
};

const SearchBar = ({ setTours, allTours }: SearchBarProps) => {
  const [selectedOption, setSelectedOption] = useState("Tours");
  const [rangeDate, setRangeDate] = useState<Range>({});
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [capacityRange, setCapacityRange] = useState({ min: 0, max: 5000 });

  const [value, setValue] = useState("");

  const searchOptions = [
    "Tours",
    "Ciudad",
    "Fecha",
    "Precio",
    "Capacidad",
    "Empresa",
  ];

  const allowOptions = ["Tours", "Ciudad", "Empresa"];

  const handleSelectedOption = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelectedOption(e.currentTarget.textContent || "");
    setValue("");
    setTours(allTours);
  };

  // Maneja los filtro por tours y ciudades
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  // Maneja el filtro por rango de fechas
  const handleGetRangeDate = (rangeDate: Range) => {
    setRangeDate(rangeDate);
  };

  const handleCloseCalendar = (
    setSelectedRange: React.Dispatch<React.SetStateAction<DateRangeState>>
  ) => {
    setSelectedRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
    setSelectedOption("Tours");
  };

  const handleCloseRange = (
    setValues: React.Dispatch<React.SetStateAction<number[]>>,
    min: number,
    max: number
  ) => {
    setValues([min, max]);
    setSelectedOption("Tours");
  };

  // Obtener valores minimo y maximo de los tours
  useEffect(() => {
    const minPrice = allTours.reduce((min, tour) => {
      return Math.min(min, tour.price);
    }, Infinity);

    const maxPrice = allTours.reduce((max, tour) => {
      return Math.max(max, tour.price);
    }, -Infinity);

    const minCapacity = allTours.reduce((min, tour) => {
      return Math.min(min, tour.capacity);
    }, Infinity);

    const maxCapacity = allTours.reduce((max, tour) => {
      return Math.max(max, tour.capacity);
    }, -Infinity);

    setCapacityRange({ min: minCapacity, max: maxCapacity });
    setPriceRange({ min: minPrice, max: maxPrice });
  }, [allTours]);

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
          value={value}
          disabled={allowOptions.includes(selectedOption) ? false : true}
          type="text"
          onChange={handleChange}
          placeholder="Comienza tu búsqueda aquí..."
          className=" flex-grow p-2 text-gray-700 outline-none"
        />
        <MdOutlineSearch className="mr-6" size={24} color="oklch(var(--p))" />
      </div>

      {/**
       * Mostrar los tours filtrados por rango de fecha
       */}
      {selectedOption === "Fecha" && (
        <CalendarOption
          onRangeDate={handleGetRangeDate}
          onClose={handleCloseCalendar}
        />
      )}

      {/**
       *  Mostrar los tours filtrados por rango de precio
       */}
      {selectedOption === "Precio" && (
        <PriceOption
          minValue={priceRange.min}
          maxValue={priceRange.max}
          allTours={allTours}
          setTours={setTours}
          onClose={handleCloseRange}
        />
      )}

      {/**
       *   Mostrar los tours filtrados por título
       */}
      {(selectedOption === "Tours" || selectedOption === "Empresa") && (
        <SearchOption
          value={value}
          setValue={setValue}
          setTours={setTours}
          allTours={allTours}
          filterBy={selectedOption}
        />
      )}

      {/**
       *  Mostrar los tours filtrados por ciudad
       */}
      {selectedOption === "Ciudad" && (
        <CityOption
          value={value}
          setValue={setValue}
          setTours={setTours}
          allTours={allTours}
        />
      )}

      {/**
       *  Mostrar los tours filtrados por capacidad
       */}
      {selectedOption === "Capacidad" && (
        <CapacityOption
          minValue={capacityRange.min}
          maxValue={capacityRange.max}
          allTours={allTours}
          setTours={setTours}
          onClose={handleCloseRange}
        />
      )}
    </div>
  );
};

export default SearchBar;
