import React from "react";

const Pagination = ({ currentPage, handlePageChange, hasNextPage }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="bg-gray-200 py-2 px-4">{currentPage}</span>
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ${
          !hasNextPage && "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
