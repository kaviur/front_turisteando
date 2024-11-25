import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";

export interface DateRangeState {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
}

interface DateRangePickerProps {
  onRangeDate: (param: Range) => void;
}

const CalendarOption: React.FC<DateRangePickerProps> = ({ onRangeDate }) => {
  const [selectedRange, setSelectedRange] = useState<DateRangeState>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

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
    <div className="calendar absolute z-50 right-5 -bottom-1 translate-y-full flex flex-col items-center gap-4 p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold text-gray-800">
        Selecciona un rango de fechas
      </h2>

      {/* Componente de selección de rango */}
      <DateRange
        ranges={[selectedRange]}
        onChange={handleSelect}
        // rangeColors={["#4f46e5"]}
        rangeColors={["#ff0178"]}
        showDateDisplay={false}
        minDate={new Date()}
        className="rounded-lg"
      />

      {/* Mostrar el rango seleccionado */}
      <div className="flex flex-col items-start gap-2 text-sm">
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
    </div>
  );
};

export default CalendarOption;
