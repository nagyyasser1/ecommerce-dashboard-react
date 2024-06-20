import React from "react";
import styles from "./styles/CategoriesList.module.css";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../app/services/categoryService";

const CategoriesList: React.FC = () => {
  const { data: categories, error, isLoading } = useGetAllCategoriesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div className={styles.categoriesList}>
      <div className={styles.categories_header}>
        <p>categories</p>
        <Link to={"/categories/new"}>New</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesList;
