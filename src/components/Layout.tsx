import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./styles/Layout.module.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMenuOpend, toggleMenu } from "../features/appSlice";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useRefreshTokenMutation } from "../app/services/auth.service";
import { setCredentials } from "../features/auth/authSlice";
import Footer from "./Footer";

const Layout = () => {
  const [refresh, { isLoading }] = useRefreshTokenMutation();
  const isMenuOpend = useAppSelector(selectIsMenuOpend);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const handleOverLayClicked = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { accessToken } = await refresh({}).unwrap();
        setIsInitialLoading(false);
        const user = JSON.parse(localStorage.getItem("user") as any);
        dispatch(setCredentials({ accessToken, user }));
      } catch (error) {
        console.error("Error refreshing token:", error);
        navigate("/auth/signin");
      }
    };
    fetchData();
  }, [refresh]);

  useEffect(() => {
    if (isMenuOpend) {
      document.body.classList.add(styles.with_sidebar);
    } else {
      document.body.classList.remove(styles.with_sidebar);
    }
  }, [isMenuOpend]);

  if (isInitialLoading || isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

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
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
