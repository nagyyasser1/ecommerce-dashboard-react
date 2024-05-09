import styles from "./styles/Header.module.css";
import { CiMenuFries } from "react-icons/ci";
import { useAppDispatch } from "../app/hooks";
import { toggleMenu } from "../features/appSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const handleOverLayClicked = () => {
    dispatch(toggleMenu());
  };
  return (
    <header className={styles.header}>
      <div>
        <CiMenuFries
          className={styles.header_menu}
          onClick={handleOverLayClicked}
        />
      </div>
      <div className={styles.header_profile}>
        <p>nagyy8751</p>
      </div>
    </header>
  );
};

export default Header;
