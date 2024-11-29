import { RangeProps } from "@/types/RangeProps";
import { filterPlansByRange } from "@/utils/filters/filters";
import { useEffect, useState } from "react";
import { IoIosArrowDropdown, IoIosCloseCircle } from "react-icons/io";
import { Range, getTrackBackground } from "react-range";

const CapacityOption: React.FC<RangeProps> = ({
  allTours,
  setTours,
  minValue,
  maxValue,
  onClose,
}) => {
  const [values, setValues] = useState<number[]>([minValue, maxValue]);
  const [tempValues, setTempValues] = useState<number[]>([minValue, maxValue]);

  useEffect(() => {
    const filteredTours = filterPlansByRange(
      values[0],
      values[1],
      allTours,
      "capacity"
    );
    setTours(filteredTours);
  }, [values, allTours, setTours]);
  const [isRangeSelectorOpen, setIsRangeSelectorOpen] = useState(true);

  // Cambia los valores moviendo los indicadores y guarda los nuevos valores en un estado temporal
  const handleChange = (newValues: number[]) => {
    setTempValues(newValues);
  };

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = Math.max(
      minValue,
      Math.min(maxValue, Number(value) || 0)
    );
    setTempValues(newValues);
  };

  // Aplica el filtro al hacer clic en el botón "Buscar"
  const handleClick = () => {
    setValues(tempValues);
  };

  return (
    <div className="w-[390px] absolute right-0 -bottom-1 translate-y-full p-6 bg-gray-50 text-gray-700 rounded-xl shadow-md flex flex-col gap-4 items-center">
      <div className="flex items-center justify-between w-full">
        <IoIosArrowDropdown
          className={`text-primary w-6 h-6 cursor-pointer transform ${
            isRangeSelectorOpen ? "rotate-0" : "rotate-180"
          }`}
          onClick={() => setIsRangeSelectorOpen(!isRangeSelectorOpen)}
        />
        <h2 className="text-lg font-semibold">
          Selecciona la cantidad de personas
        </h2>
        <IoIosCloseCircle
          className="text-primary w-6 h-6 cursor-pointer"
          onClick={() => onClose(setValues, minValue, maxValue)}
        />
      </div>

      {isRangeSelectorOpen && (
        <>
          <div className="w-full px-2 pt-5">
            <Range
              values={tempValues}
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
                      values: tempValues,
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
                      {tempValues[index]}
                    </div>
                  </div>
                );
              }}
            />
          </div>

          <div className="w-full flex flex-col justify-between mt-4">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Desde
                </label>
                <input
                  type="number"
                  value={tempValues[0]}
                  onChange={(e) => handleInputChange(0, e.target.value)}
                  className="mt-1 p-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-gray-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Hasta
                </label>
                <input
                  type="number"
                  value={tempValues[1]}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="mt-1 p-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-gray-400"
                />
              </div>
            </div>
            <button
              className="btn hover:bg-primary mt-3 bg-primary text-white"
              onClick={handleClick}
            >
              Buscar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CapacityOption;
