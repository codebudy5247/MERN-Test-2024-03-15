import { useState } from "react";

const usePagination = (data: any, itemsPerPage: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleFirst = () => {
    setCurrentPage(1);
  };

  const handleLast = () => {
    setCurrentPage(Math.ceil(data.length / itemsPerPage));
  };


  const getPaginatedData = () => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentData = data?.slice(firstIndex, lastIndex);

    return {
      currentData,
      totalPages: Math.ceil(data?.length / itemsPerPage),
      currentPage,
      handlePageChange,
      handleNext,
      handlePrevious,
      handleFirst,
      handleLast,
    };
  };

  return getPaginatedData();
};

export default usePagination;
