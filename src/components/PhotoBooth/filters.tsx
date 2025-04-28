import React from "react";

const Filters = ({ onFilterChange }: { onFilterChange: (filter: string) => void }) => {
  const filters = [
    { name: "None", value: "none" },
    { name: "Black & White", value: "grayscale(1)" },
    { name: "Sepia", value: "sepia(1)" },
    { name: "Pop Art", value: "contrast(2) saturate(2)" },
  ];

  return (
    <div className="flex justify-center space-x-4">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
};

export default Filters;