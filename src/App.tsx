import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, NotFound, OverView } from "./components";
import {
  AddNewCatForm,
  AdminDetails,
  Admins,
  Auth,
  Categories,
  CategoriesList,
  CategoryDetails,
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <OverView /> },
      { path: "media", element: <Media /> },
      { path: "media/:folderName", element: <FolderDetails /> },
      {
        path: "categories",
        element: <Categories />,
        children: [
          {
            index: true,
            element: <CategoriesList />,
          },
          {
            path: "new",
            element: <AddNewCatForm />,
          },
          {
            path: ":catId",
            element: <CategoryDetails />,
          },
        ],
      },
      {
        path: "products",
        element: <Products />,
        children: [{ path: ":productId", element: <ProductDetails /> }],
      },
      {
        path: "orders",
        element: <Orders />,
        children: [{ path: ":orderId", element: <OrderDetails /> }],
      },
      {
        path: "customers",
        element: <Customers />,
        children: [{ path: ":customerId", element: <CustomerDetails /> }],
      },
      {
        path: "admins",
        element: <Admins />,
        children: [{ path: ":adminId", element: <AdminDetails /> }],
      },
    ],
  },
  {
    path: "auth",
    children: [
      { index: true, element: <Auth /> },
      { path: "signin", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgotpassword", element: <Forgot /> },
      { path: "resetpassword/:token", element: <Reset /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
