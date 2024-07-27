import {
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "../../app/services/categoryService";

type SubCatItem = {
  id: string;
  name: string;
  active: boolean;
};

interface SubCatItemProp {
  categoryId: string;
  subCatItem: SubCatItem;
}

const SubCatItem = ({ subCatItem, categoryId }: SubCatItemProp) => {
  const [deleteSubCat, { isLoading, isError, error }] =
    useDeleteSubCategoryMutation();

  const [
    updateSubCategory,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateSubCategoryMutation();

  const handleDeleteSubCategory = async () => {
    try {
      await deleteSubCat({
        id: +subCatItem.id,
        categoryId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateActiveStatus = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const updatedActiveStatus = event.target.value === "1";
      await updateSubCategory({
        id: subCatItem.id,
        categoryId,
        active: updatedActiveStatus,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li>
      <p>{isError && error.message}</p>
      <p>{subCatItem.name}</p>
      <button onClick={handleDeleteSubCategory} disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete"}
      </button>
      <select
        name="active"
        value={subCatItem.active ? 1 : 0}
        onChange={handleUpdateActiveStatus}
        disabled={isLoadingUpdate}
      >
        <option value={1}>Active</option>
        <option value={0}>Inactive</option>
      </select>
      {isLoadingUpdate && <p>Updating...</p>}
      {isErrorUpdate && <p>{errorUpdate.message}</p>}
    </li>
  );
};

export default SubCatItem;
