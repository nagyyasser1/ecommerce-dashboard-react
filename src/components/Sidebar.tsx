import styles from "./styles/Sidebar.module.css";
import SidebarListItem from "./SidebarListItem";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { toggleMenu } from "../features/appSlice";

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
  const dispatch = useAppDispatch();

  const handleOverLayClicked = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <h2>
          <span>K</span>arezma
        </h2>
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
