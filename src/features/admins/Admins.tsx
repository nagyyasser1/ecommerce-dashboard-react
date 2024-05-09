import { Outlet } from "react-router-dom";

const Admins = () => {
  return (
    <div>
      <h1>Admins</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admins;
