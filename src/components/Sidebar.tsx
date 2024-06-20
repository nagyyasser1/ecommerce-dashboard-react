import styles from "./styles/Sidebar.module.css";
import SidebarListItem from "./SidebarListItem";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectIsMenuOpend } from "../features/appSlice";

interface Item {
  name: string;
  path: string;
}

interface Category {
  title: string;
  path: string;
  items: Item[];
}

const categories: Category[] = [
  {
    title: "Media",
    path: "media",
    items: [],
  },
  {
    title: "Categories",
    path: "categories",
    items: [
      { name: "all", path: "categories" },
      { name: "new", path: "categories/new" },
    ],
  },
  {
    title: "Products",
    path: "products",
    items: [
      { name: "product list", path: "products" },
      { name: "product details", path: "products/5" },
    ],
  },
  {
    title: "Orders",
    path: "orders",
    items: [
      { name: "order list", path: "orders" },
      { name: "order details", path: "orders/5" },
    ],
  },
  {
    title: "Customers",
    path: "customers",
    items: [
      { name: "customer list", path: "customers" },
      { name: "customer details", path: "customers/5" },
    ],
  },
  {
    title: "Admins",
    path: "admins",
    items: [
      { name: "admin list", path: "admins" },
      { name: "admin details", path: "admins/4" },
    ],
  },
  {
    title: "Authentication",
    path: "auth/signin",
    items: [],
  },
];

const Sidebar = () => {
  const isMenuOpend = useAppSelector(selectIsMenuOpend);

  return (
    <div className={`${styles.sidebar} ${isMenuOpend && styles.sidebar_left}`}>
      <div className={styles.sidebar_header}>
        <p className={styles.sidebar_header_brand}>
          <span>K`</span>AREZMA
        </p>
        <p className={styles.sidebar_header_btn}>admin</p>
      </div>
      <div className={styles.sidebar_section}>
        <p>
          <Link to="/">Dashboard</Link>
        </p>
      </div>
      <ul className={styles.sidebar_list}>
        {categories.map((cat) => (
          <SidebarListItem
            title={cat.title}
            path={cat.path}
            items={cat.items}
            key={cat.title}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
