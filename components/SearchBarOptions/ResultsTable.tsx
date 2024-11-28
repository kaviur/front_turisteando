import React from "react";

interface ResultsTableProps {
  selectedTours: string[];
  handleTourClick: (title: string) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  selectedTours,
  handleTourClick,
}) => {
  const results = selectedTours.map((title, index) => (
    <li
      key={index}
      className="px-4 py-2 text-white hover:bg-pink-600 text-sm cursor-pointer font-medium rounded-xl"
      onClick={() => handleTourClick(title)}
    >
      {title}
    </li>
  ));

  return (
    <div
      className={`absolute -bottom-1 right-0 mt-2 translate-y-full bg-primary w-[390px] rounded-lg p-2 text-start max-h-[230px] overflow-auto`}
    >
      <ul className="results-table">
        {selectedTours.length > 0 ? (
          results
        ) : (
          <li className="px-4 py-2 text-white bg-primary text-sm font-medium rounded-xl">
            No se encontraron resultados
          </li>
        )}
      </ul>
    </div>
  );
};

export default ResultsTable;
