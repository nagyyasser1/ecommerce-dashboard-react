import { useState } from "react";
import { SubCategory } from "../../interfaces/category";
import { useCreateSubCategoryMutation } from "../../app/services/categoryService";
import SubCatItem from "./SubCatItem";

type EditSubCatProp = {
  categoryId: string;
  subCategories: SubCategory[];
};

const EditSubCat = ({ subCategories, categoryId }: EditSubCatProp) => {
  const [newCategory, setNewCategory] = useState<string>("");

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const [createSubCategory, { isLoading, isError, error }] =
    useCreateSubCategoryMutation();

  const handleAddNewSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await createSubCategory({
        categoryId,
        name: newCategory,
      }).unwrap();
      setNewCategory("");
    } catch (error) {
      console.error("Failed to create subcategory: ", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="New subcategory"
        value={newCategory}
        onChange={handleNewCategoryChange}
      />
      <button
        type="button"
        disabled={isLoading}
        onClick={handleAddNewSubCategory}
      >
        {isLoading ? "Adding..." : "+"}
      </button>
      {isError && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <ul>
        {subCategories.map((sub) => (
          <SubCatItem key={sub.id} subCatItem={sub} categoryId={categoryId} />
        ))}
      </ul>
    </div>
  );
};

export default EditSubCat;
