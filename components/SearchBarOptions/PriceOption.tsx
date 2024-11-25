import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
  step?: number;
  onRangeChange: (range: { min: number; max: number }) => void;
}

const PriceOption: React.FC<PriceRangeProps> = ({
  minPrice,
  maxPrice,
  step = 1,
  onRangeChange,
}) => {
  const [values, setValues] = useState<number[]>([minPrice, maxPrice]);

  const handleChange = (newValues: number[]) => {
    setValues(newValues);
    onRangeChange({ min: newValues[0], max: newValues[1] });
  };

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = Math.max(
      minPrice,
      Math.min(maxPrice, Number(value) || 0)
    );
    setValues(newValues);
    onRangeChange({ min: newValues[0], max: newValues[1] });
  };

  return (
    <div className="w-[390px] absolute right-0 -bottom-1 translate-y-full p-6 bg-gray-50 text-gray-700 rounded-xl shadow-md flex flex-col gap-4 items-center">
      <h2 className="text-lg mb-5 font-semibold">
        Selecciona el rango de precio
      </h2>

      <div className="w-full">
        <Range
          values={values}
          step={step}
          min={minPrice}
          max={maxPrice}
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
                  min: minPrice,
                  max: maxPrice,
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
                  S/. {values[index]}
                </div>
              </div>
            );
          }}
        />
      </div>

      <div className="w-full flex flex-col justify-between gap-4 mt-4">
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Desde (S/.)
            </label>
            <input
              type="number"
              value={values[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              className="mt-1 p-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Hasta (S/.)
            </label>
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

export default PriceOption;
