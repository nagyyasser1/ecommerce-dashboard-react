import { useState } from "react";
import styles from "./styles/Header.module.css";
import { CiMenuFries } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleMenu } from "../features/appSlice";
import ProfileMenu from "./ProfileMenu";
import { selectCurrentUser } from "../features/auth/authSlice";
import profileIcon from "../assets/profileIcon.avif";

const Header = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);

  const handleOverLayClicked = () => {
    dispatch(toggleMenu());
  };

  const toggleProfileMenu = () => {
    setProfileMenuVisible(!isProfileMenuVisible);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_menu_icon_container}>
        <CiMenuFries
          className={styles.header_menu}
          onClick={handleOverLayClicked}
        />
      </div>
      <div className={styles.header_profile} onClick={toggleProfileMenu}>
        <img src={profileIcon} className={styles.header_profile_icon} />
        <div className={styles.header_profile_info}>
          <p>
            {currentUser?.fname}
            {currentUser?.lname}
          </p>
          <span>{currentUser?.email}</span>
        </div>
      </div>
      {isProfileMenuVisible && <ProfileMenu onClose={toggleProfileMenu} />}
    </header>
  );
};

export default Header;
