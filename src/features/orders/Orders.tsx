import { Outlet } from "react-router-dom";

const Orders = () => {
  return (
    <div>
      <h1>Orders</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Orders;
