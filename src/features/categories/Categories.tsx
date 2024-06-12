import styles from "./styles/Categories.module.css";
import { Outlet } from "react-router-dom";

const Categories = () => {
  return (
    <div className={styles.categories}>
      <div className={styles.categories_main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Categories;
