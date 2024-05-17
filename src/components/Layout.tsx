import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./styles/Layout.module.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMenuOpend, toggleMenu } from "../features/appSlice";
import Header from "./Header";
import { useEffect } from "react";

const Layout = () => {
  const isMenuOpend = useAppSelector(selectIsMenuOpend);
  const dispatch = useAppDispatch();

  const handleOverLayClicked = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    if (isMenuOpend) {
      document.body.classList.add(styles.with_sidebar);
    } else {
      document.body.classList.remove(styles.with_sidebar);
    }
  }, [isMenuOpend]);

  return (
    <div className={styles.layout}>
      <aside className={`${styles.aside} ${isMenuOpend && styles.aside_left}`}>
        <Sidebar />
        {!isMenuOpend && (
          <div
            className={styles.aside_overlay}
            onClick={handleOverLayClicked}
          />
        )}
      </aside>
      <main
        className={`${styles.main} ${isMenuOpend ? "" : styles.main_fullwidth}`}
      >
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
