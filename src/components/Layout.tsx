import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./styles/Layout.module.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMenuOpend, toggleMenu } from "../features/appSlice";
import Header from "./Header";

const Layout = () => {
  const isMenuOpend = useAppSelector(selectIsMenuOpend);

  const dispatch = useAppDispatch();

  const handleOverLayClicked = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className={styles.layout}>
      <aside className={`${styles.aside} ${isMenuOpend && styles.displayNone}`}>
        <Sidebar />
        <div className={styles.aside_overlay} onClick={handleOverLayClicked} />
      </aside>
      <main className={styles.main}>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
