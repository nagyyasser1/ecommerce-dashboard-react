import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, NotFound, OverView } from "./components";
import {
  AddNewAdmin,
  AddNewCatForm,
  AddProduct,
  Admins,
  Auth,
  CategoriesList,
  CategoryDetails,
  CustomerDetails,
  Customers,
  EditAdmin,
  EditProduct,
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
        element: <CategoriesList />,
      },
      {
        path: "categories/new",
        element: <AddNewCatForm />,
      },
      {
        path: "categories/:id",
        element: <CategoryDetails />,
      },
      {
        path: "products",
        element: <Products />,
        children: [{ path: ":productId", element: <ProductDetails /> }],
      },
      {
        path: "products/new",
        element: <AddProduct />,
      },
      {
        path: "products/edit/:productId",
        element: <EditProduct />,
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
      },
      {
        path: "admins/new",
        element: <AddNewAdmin />,
      },
      {
        path: "admins/edit/:adminId",
        element: <EditAdmin />,
      },
    ],
  },
  {
    path: "auth",
    children: [
      { index: true, element: <Auth /> },
      { path: "signin", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <Forgot /> },
      { path: "reset-password/:token", element: <Reset /> },
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
