import React from "react";
import styles from "./styles/CategoriesList.module.css";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../app/services/categoryService";

type SubCategories = {
  id: string;
  name: string;
};

const CategoriesList: React.FC = () => {
  const {
    data: categories,
    isError,
    error,
    isLoading,
  } = useGetAllCategoriesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>{error.data.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.categoriesList}>
      <div className={styles.header}>
        <Link to={"new"} className={styles.header_link}>
          New
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Sub-Categories</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category: any) => (
            <tr key={category.id}>
              <td>
                <Link to={`${category.id}`} className={styles.link}>
                  {category.name}
                </Link>
              </td>
              <td>
                <img
                  src={category.picUrl}
                  alt={category.name}
                  className={styles.image}
                />
              </td>
              <td>
                {category.subCategories.map((sub: SubCategories) => (
                  <span key={sub.id}>{sub.name},</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesList;
