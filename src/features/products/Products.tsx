import { Outlet } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <h1>products</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Products;
