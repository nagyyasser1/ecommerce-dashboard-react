import styles from "./styles/Header.module.css";
import { CiMenuFries } from "react-icons/ci";
import { useAppDispatch } from "../app/hooks";
import { toggleMenu } from "../features/appSlice";
import { FaCircleUser } from "react-icons/fa6";

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
        <FaCircleUser className={styles.header_profile_icon} />
        <div className={styles.header_profile_info}>
          <p>nagyyasser</p>
          <span>nagyy8751@gmail.com</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
