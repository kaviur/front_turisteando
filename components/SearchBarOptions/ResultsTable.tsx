import React from "react";

interface ResultsTableProps {
  selectedTour: string | null;
  selectedTours: string[];
  handleTourClick: (title: string) => void;
  handleRemoveTour: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  selectedTour,
  selectedTours,
  handleTourClick,
  handleRemoveTour,
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
            className={`px-4 py-2 text-white hover:bg-pink-600 text-sm cursor-pointer font-medium rounded-xl`}
          >
            <span className="tour-title" onClick={() => handleTourClick(tour)}>
              {tour}
            </span>
            {selectedTour === tour && (
              <button className="remove-tour-button" onClick={handleRemoveTour}>
                X
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsTable;
