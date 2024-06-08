import { AiOutlineProduct } from "react-icons/ai";
import {
  FaArrowLeft,
  FaUserShield,
  FaUsers,
  FaUserSecret,
} from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import styles from "./styles/Sidebar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { useAppDispatch } from "../app/hooks";
import { toggleMenu } from "../features/appSlice";
import { GoFileMedia } from "react-icons/go";

const SidebarListItem = ({ title, path, items }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOverLayClicked = () => {
    if (window.innerWidth <= 740) dispatch(toggleMenu());
  };

  const handleClicked = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li>
      <div className={styles.sidebar_listItem_header} onClick={handleClicked}>
        <div>
          {title === "Products" ? (
            <AiOutlineProduct />
          ) : title === "Orders" ? (
            <IoMdCart />
          ) : title === "Customers" ? (
            <FaUsers />
          ) : title === "Categories" ? (
            <MdOutlineCategory />
          ) : title === "Admins" ? (
            <FaUserSecret />
          ) : title === "Media" ? (
            <GoFileMedia />
          ) : (
            <FaUserShield />
          )}
          <Link to={path} className={styles.sidebar_listItem_link}>
            <p>{title}</p>
          </Link>
        </div>
        {items.length > 0 && (
          <FaArrowLeft
            className={`${
              isOpen
                ? styles.sidebar_list_arrow_down
                : styles.sidebar_list_arrow_left
            }`}
          />
        )}
      </div>
      <ul className={`${styles.list_container} ${isOpen && styles.open}`}>
        {items?.map((i: any) => (
          <li key={i.name}>
            <Link to={`${i.path}`} onClick={handleOverLayClicked}>
              {i.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default SidebarListItem;
