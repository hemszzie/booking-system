const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center gap-3 mt-10">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === index + 1
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;