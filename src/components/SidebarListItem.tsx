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

const SidebarListItem = ({ title, items }: any) => {
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
          ) : (
            <FaUserShield />
          )}
          <p>{title}</p>
        </div>
        <FaArrowLeft
          className={`${
            isOpen
              ? styles.sidebar_list_arrow_down
              : styles.sidebar_list_arrow_left
          }`}
        />
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
