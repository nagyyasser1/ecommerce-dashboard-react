import { useParams } from "react-router-dom";
import { useGetCategoryByIdQuery } from "../../app/services/categoryService";
import styles from "./styles/CategoryDetails.module.css";
import EditCategory from "./EditCategory";
import { useState } from "react";
import { Category } from "../../interfaces/category";

const CategoryDetails = () => {
  const { id } = useParams();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { data, error, isLoading, isError } = useGetCategoryByIdQuery(
    Number(id)
  );

  const toggleEditMenu = () => {
    setIsEditOpen((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>{error?.message || "error fetch categroy!."}</p>
      </div>
    );
  }

  return (
    <div className={styles.categoryDetails}>
      <div className={styles.header}>
        <button onClick={toggleEditMenu}>Edit</button>
      </div>
      <div className={styles.basic_info}>
        <img src={data?.picUrl} />
        <div>
          <p>Name: {data?.name}</p>
          <p>Slug: {data?.slug}</p>
          <p>Description: {data?.description}</p>
          <p>Page Title: {data?.pageTitle}</p>
          <p>Meta Description: {data?.metaDescription}</p>
          <div className={styles.subCategories}>
            <h4>sub-categories</h4>
            <ul>
              {data?.subCategories.map((sub) => (
                <li>{sub.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isEditOpen && (
        <EditCategory
          toggleEditMenu={toggleEditMenu}
          category={data as Category}
        />
      )}
    </div>
  );
};

export default CategoryDetails;
