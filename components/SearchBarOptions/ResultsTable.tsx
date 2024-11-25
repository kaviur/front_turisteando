import React from "react";

interface ResultsTableProps {
  selectedTours: string[];
  handleTourClick: (title: string) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  selectedTours,
  handleTourClick,
}) => {
  return (
    <div
      className={`absolute -bottom-1 right-0 mt-2 translate-y-full bg-primary w-[390px] rounded-lg p-2 text-start max-h-[230px] overflow-auto ${
        selectedTours.length > 0 ? "block" : "hidden"
      }`}
    >
      <ul className="results-table">
        {selectedTours.map((tour) => (
          <li
            key={tour}
            onClick={() => handleTourClick(tour)}
            className={`relative px-4 py-2 text-white cursor-pointer hover:bg-pink-600 text-sm font-medium rounded-xl`}
          >
            {tour}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsTable;
