import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout, NotFound, OverView } from "./components";
import {
  AdminDetails,
  Admins,
  Auth,
  CustomerDetails,
  Customers,
  FolderDetails,
  Forgot,
  Login,
  Media,
  OrderDetails,
  Orders,
  ProductDetails,
  Products,
  Reset,
  Signup,
} from "./features";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OverView />} />
          <Route path="/media" element={<Media />} />
          <Route path="/media/:folderName" element={<FolderDetails />} />
          <Route path="/products" element={<Products />}>
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="/orders" element={<Orders />}>
            <Route path=":orderId" element={<OrderDetails />} />
          </Route>
          <Route path="/customers" element={<Customers />}>
            <Route path=":customerId" element={<CustomerDetails />} />
          </Route>
          <Route path="/admins" element={<Admins />}>
            <Route path=":adminId" element={<AdminDetails />} />
          </Route>
        </Route>
        <Route path="/auth">
          <Route index element={<Auth />} />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpassword" element={<Forgot />} />
          <Route path="resetpassword/:token" element={<Reset />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
