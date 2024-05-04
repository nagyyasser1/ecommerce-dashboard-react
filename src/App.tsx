import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout, NotFound, OverView } from "./components";
import {
  Admins,
  Auth,
  Customers,
  Login,
  OrderDetails,
  Orders,
  ProductDetails,
  Products,
  Signup,
} from "./features";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<OverView />} />
            <Route path="products" element={<Products />}>
              <Route path=":productId" element={<ProductDetails />} />
            </Route>
            <Route path="/orders" element={<Orders />}>
              <Route path=":orderId" element={<OrderDetails />} />
            </Route>
            <Route path="/customers" element={<Customers />} />
            <Route path="/admins" element={<Admins />} />
          </Route>
          <Route path="/auth" element={<Auth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
