"use client";
import { Category } from "@prisma/client";
import React, { useState } from "react";

interface Props {
  category: Category;
}
const SelectCategory = ({ category }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          id="roundedCheckbox"
          className="h-6 w-6 cursor-pointer rounded-sm"
          checked={isChecked}
          onChange={handleChange}
        />
        <h6 className="text-xl">{category.name}</h6>
      </div>
    </>
  );
};

export default SelectCategory;
