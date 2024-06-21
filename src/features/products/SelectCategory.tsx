import { useGetAllCategoriesQuery } from "../../app/services/categoryService";
import { Category } from "./interfaces";

const SelectCategory = ({ handleCategoryChange }: any) => {
  const { data: categories, error, isLoading } = useGetAllCategoriesQuery();

  const handleChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    handleCategoryChange(value ? parseInt(value) : null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories.</div>;
  }

  return (
    <select name="categories" onChange={handleChange}>
      <option value="">All</option>
      {categories?.map((category: Category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCategory;
