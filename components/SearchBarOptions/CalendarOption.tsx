import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";

export interface DateRangeState {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
}

interface DateRangePickerProps {
  onRangeDate: (param: Range) => void;
  onClose: (
    param: React.Dispatch<React.SetStateAction<DateRangeState>>
  ) => void;
}

const CalendarOption: React.FC<DateRangePickerProps> = ({
  onRangeDate,
  onClose,
}) => {
  const [selectedRange, setSelectedRange] = useState<DateRangeState>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);

  const handleSelect = (ranges: RangeKeyDict): void => {
    const range = ranges.selection;
    setSelectedRange({
      ...selectedRange,
      startDate: range.startDate || new Date(),
      endDate: range.endDate || new Date(),
    });

    onRangeDate(range);
  };

  return (
    <div className="absolute z-10 right-5 -bottom-1 translate-y-full flex flex-col items-center p-4 bg-white shadow-md rounded-lg w-[370px] mx-auto">
      {/* Encabezado con dropdown */}
      <div className="flex items-center justify-between w-full">
        <IoIosArrowDropdown
          className={`text-primary w-6 h-6 cursor-pointer transform ${
            isCalendarOpen ? "rotate-0" : "rotate-180"
          }`}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        />
        <h2 className="text-lg font-bold text-gray-800 max-w-48">
          Selecciona un rango de fechas
        </h2>
          <IoIosCloseCircle
            className="text-primary w-6 h-6 cursor-pointer"
            onClick={() => onClose(setSelectedRange)}
          />
      </div>

      {/* Condicional para mostrar/ocultar el calendario */}
      {isCalendarOpen && (
        <>
          {/* Componente de selección de rango */}
          <DateRange
            ranges={[selectedRange]}
            onChange={handleSelect}
            rangeColors={["#ff0178"]}
            showDateDisplay={false}
            minDate={new Date()}
            className="rounded-lg mt-4"
          />

          {/* Mostrar el rango seleccionado */}
          <div className="flex flex-col items-start gap-2 text-sm mt-4">
            <p className="text-gray-600">
              <span className="font-medium mr-2">Fecha de inicio:</span>{" "}
              {selectedRange.startDate
                ? format(selectedRange.startDate, "dd/MM/yyyy")
                : "No hay fecha seleccionada"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium mr-2">Fecha de fin:</span>{" "}
              {selectedRange.endDate
                ? format(selectedRange.endDate, "dd/MM/yyyy")
                : "No hay fecha seleccionada"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarOption;
