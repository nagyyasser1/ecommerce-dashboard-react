import React from "react";
import styles from "./styles/CategoriesList.module.css";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../app/services/category.service";

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
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category: any) => (
            <tr key={category.id}>
              <td>
                <img
                  src={category.picUrl}
                  alt={category.name}
                  className={styles.image}
                />
              </td>
              <td>
                <Link to={`${category.id}`} className={styles.link}>
                  {category.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesList;
