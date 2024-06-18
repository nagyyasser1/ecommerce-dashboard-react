import { Link, Outlet } from "react-router-dom";
import styles from "./styles/Products.module.css";
const Products = () => {
  return (
    <div className={styles.products}>
      <div className={styles.products_header}>
        <p>products</p>
        <button>
          <Link to={"/products/new"}>New</Link>
        </button>
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Products;
