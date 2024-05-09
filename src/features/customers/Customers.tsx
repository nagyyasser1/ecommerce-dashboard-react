import { Outlet } from "react-router-dom";

const Customers = () => {
  return (
    <div>
      <h1>Customers</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Customers;
