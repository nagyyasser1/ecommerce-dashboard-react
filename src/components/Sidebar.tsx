import styles from "./styles/Sidebar.module.css";
import SidebarListItem from "./SidebarListItem";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMenuOpend, toggleMenu } from "../features/appSlice";

interface Item {
  name: string;
  path: string;
}

interface Category {
  title: string;
  items: Item[];
}

const categories: Category[] = [
  {
    title: "Products",
    items: [
      { name: "product list", path: "products" },
      { name: "product details", path: "products/5" },
    ],
  },
  {
    title: "Categories",
    items: [
      { name: "product list", path: "categories" },
      { name: "product details", path: "category/5" },
    ],
  },
  {
    title: "Orders",
    items: [
      { name: "order list", path: "orders" },
      { name: "order details", path: "orders/5" },
    ],
  },
  {
    title: "Customers",
    items: [
      { name: "customer list", path: "customers" },
      { name: "customer details", path: "customers/5" },
    ],
  },
  {
    title: "Admins",
    items: [
      { name: "admin list", path: "admins" },
      { name: "admin details", path: "admins/4" },
    ],
  },
  {
    title: "Authentication",
    items: [
      { name: "sign up", path: "auth/signup" },
      { name: "sign in", path: "auth/signin" },
      { name: "forgot password", path: "auth/forgot" },
    ],
  },
];

const Sidebar = () => {
  const isMenuOpend = useAppSelector(selectIsMenuOpend);
  const dispatch = useAppDispatch();

  const handleOverLayClicked = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className={`${styles.sidebar} ${isMenuOpend && styles.sidebar_left}`}>
      <div className={styles.sidebar_header}>
        <h3>
          <span>K`</span>AREZMA
        </h3>
        <p>admin</p>
      </div>
      <div className={styles.sidebar_section}>
        <p>
          <Link to="/" onClick={handleOverLayClicked}>
            Application
          </Link>
        </p>
      </div>
      <ul className={styles.sidebar_list}>
        {categories.map((cat) => (
          <SidebarListItem
            title={cat.title}
            items={cat.items}
            key={cat.title}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
