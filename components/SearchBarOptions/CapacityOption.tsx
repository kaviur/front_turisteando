import { RangeProps } from "@/types/RangeProps";
import { filterPlansByRange } from "@/utils/filters/filters";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Range, getTrackBackground } from "react-range";

const CapacityOption: React.FC<RangeProps> = ({
  allTours,
  setTours,
  minValue,
  maxValue,
  onClose
}) => {
  const [values, setValues] = useState<number[]>([minValue, maxValue]);

  useEffect(() => {
    const filteredTours = filterPlansByRange(
      values[0],
      values[1],
      allTours,
      "capacity"
    );
    setTours(filteredTours);
  }, [values, allTours, setTours]);

  const handleChange = (newValues: number[]) => {
    setValues(newValues);
  };

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = Math.max(
      minValue,
      Math.min(maxValue, Number(value) || 0)
    );
    setValues(newValues);
  };

  return (
    <div className="w-[390px] absolute right-0 -bottom-1 translate-y-full p-6 bg-gray-50 text-gray-700 rounded-xl shadow-md flex flex-col gap-4 items-center">
      <div className="absolute top-7 right-3">
        <IoIosCloseCircle
          className="text-primary w-6 h-6 cursor-pointer"
          onClick={() => onClose(setValues, minValue, maxValue)}
        />
      </div>
      <h2 className="text-lg mb-5 font-semibold max-w-[300px]">
        Selecciona el rango de capacidad de personas
      </h2>

      <div className="w-full px-2">
        <Range
          values={values}
          step={1}
          min={minValue}
          max={maxValue}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#ff0178", "#ccc"],
                  min: minValue,
                  max: maxValue,
                }),
                borderRadius: "4px",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged, index }) => {
            const { key, ...restProps } = props;
            return (
              <div
                key={key}
                {...restProps}
                style={{
                  ...restProps.style,
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  backgroundColor: isDragged ? "#ff0178" : "#fff",
                  border: "2px solid #ff0178",
                  boxShadow: "0px 2px 6px #aaa",
                  position: "relative",
                }}
              >
                <div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white text-sm px-2 py-1 rounded-lg shadow-md"
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {values[index]}
                </div>
              </div>
            );
          }}
        />
      </div>

      <div className="w-full flex flex-col justify-between gap-4 mt-4">
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Desde</label>
            <input
              type="number"
              value={values[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              className="mt-1 p-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Hasta</label>
            <input
              type="number"
              value={values[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              className="mt-1 p-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapacityOption;
