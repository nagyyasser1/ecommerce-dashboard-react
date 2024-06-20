import { useState } from "react";
import styles from "./styles/ProductList.module.css";
import { useFindAllByPageQuery } from "../../app/services/productsService";
import { Product } from "./types";
import SelectCategory from "./SelectCategory";
import { MdDone, MdClose } from "react-icons/md";

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState<null | number>(null);

  const { data, isLoading, error } = useFindAllByPageQuery({
    page,
    limit: 10,
    categoryId,
  });

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleCategoryChange = (id: number | null) => {
    setCategoryId(id);
    setPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div className={styles.productsList}>
      <div className={styles.productsList_filters}>
        <SelectCategory handleCategoryChange={handleCategoryChange} />
        <p>Page: {page}</p>
      </div>
      <div className={styles.productsList_table_container}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Visible</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product: Product, index: number) => (
              <tr key={index}>
                <td>
                  <span className={styles.productName}>{product.name}</span>
                </td>
                <td>
                  <span className={styles.productCategory}>
                    {product.category.name}
                  </span>
                </td>
                <td>
                  <span className={styles.productVisible}>
                    {product.visible ? <MdDone /> : <MdClose />}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.productsList_actions}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          prev
        </button>
        <button onClick={handleNextPage}>next</button>
      </div>
    </div>
  );
};

export default ProductsList;
