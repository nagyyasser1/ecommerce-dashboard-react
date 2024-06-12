import { useState } from "react";
import styles from "./styles/Header.module.css";
import { CiMenuFries } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleMenu } from "../features/appSlice";
import ProfileMenu from "./ProfileMenu";
import { selectCurrentUser } from "../features/auth/authSlice";
import { BsPersonSquare } from "react-icons/bs";

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
        <img
          src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611710.jpg?w=740&t=st=1718225049~exp=1718225649~hmac=9886c4fd17343a4d0ba9f5f47fc435c8fe4de61dd70e4828b19320e497dcbdb5"
          className={styles.header_profile_icon}
        />
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
