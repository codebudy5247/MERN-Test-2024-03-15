"use client";
import { Category } from "@prisma/client";
import SelectCategory from "./select-category";
import usePagination from "~/hooks/usePagination";
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Props = {
  categories: Category[];
};

function CategoryList({ categories }: Props) {
  const ITEMS_PER_PAGE = 6;
  const {
    currentData,
    totalPages,
    currentPage,
    handlePageChange,
    handleNext,
    handlePrevious,
    handleFirst,
    handleLast,
  } = usePagination(categories, ITEMS_PER_PAGE);

  return (
    <>
      <h6 className="text-md mb-1 font-semibold">My saved interests!</h6>
      {currentData &&
        currentData.map((cat: any) => (
          <div key={cat.id}>
            <SelectCategory category={cat} />
          </div>
        ))}

      <div className="mt-5 flex items-center">
        <div onClick={() => handleFirst()} className="cursor-pointer">
          <ChevronsLeft color="gray" />
        </div>
        <div onClick={() => handlePrevious()} className="cursor-pointer">
          <ChevronLeft color="gray" />
        </div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <div
              key={page}
              className={`mx-1 mt-1 cursor-pointer py-1 ${
                currentPage === page ? "text-black" : "text-gray-400"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </div>
          ),
        )}
        <div onClick={() => handleNext()} className="cursor-pointer">
          <ChevronRight color="gray" />
        </div>
        <div onClick={() => handleLast()} className="cursor-pointer">
          <ChevronsRight color="gray" />
        </div>
      </div>
    </>
  );
}

export default CategoryList;
