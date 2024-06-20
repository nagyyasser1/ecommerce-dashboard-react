import { Link } from "react-router-dom";
import styles from "./styles/Products.module.css";
import ProductsList from "./ProductsList";
const Products = () => {
  return (
    <div className={styles.products}>
      <div className={styles.products_header}>
        <p>products</p>
        <Link to={"/products/new"}>New</Link>
      </div>
      <div className={styles.main}>
        <ProductsList />
      </div>
    </div>
  );
};

export default Products;
