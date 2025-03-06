import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="hidden md:block px-3 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Перша сторінка
      </button>

      <button
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className="px-3 py-2 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        назад
      </button>

      <span className="px-4 py-2 text-sm font-semibold bg-gray-100 rounded">
        {`Сторінка ${currentPage} з ${totalPages}`}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Вперед
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="hidden md:block px-3 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Остання сторінка
      </button>
    </div>
  );
};

export default Pagination;
