"use client";
import { Category } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  category: Category;
}
const SelectCategory = ({ category }: Props) => {
  const router = useRouter();
  const { data: selectedCategoriesList, isError } =
    api.category.userSelectedCategoryList.useQuery();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { mutate: Addcategory } = api.category.selectCategory.useMutation({
    onSuccess: (data) => {
      console.log(data);
      toast.success("Added!")
    },
    onError: (error) => {
      toast.error(error.message)
      console.log(error.message);
    },
  });

  const { mutate: RemoveSelectedcategory } =
    api.category.removeCategory.useMutation({
      onSuccess: (data) => {
        console.log(data);
        toast.success("Removed!")
        router.refresh();
      },
      onError: (error) => {
        console.log(error.message);
        toast.error(error.message)
      },
    });

  useEffect(() => {
    const isCheckedInList = selectedCategoriesList?.some(
      (selectedCategory) => selectedCategory.categoryId === category.id,
    );
    setIsChecked(isCheckedInList || false);
  }, [selectedCategoriesList, category.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);

    let categoryId = category.id;

    if (isChecked) {
      Addcategory({ categoryId });
    } else {
      const selectedCategory = selectedCategoriesList?.find(
        (selectedCategory) => selectedCategory.categoryId === categoryId,
      );
      if (selectedCategory) {
        let selectedCategoryId = selectedCategory.id;
        RemoveSelectedcategory({ selectedCategoryId });
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          id="Checkbox"
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
