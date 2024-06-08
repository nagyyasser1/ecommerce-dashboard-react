import styles from "./styles/ProfileMenu.module.css";
import { useAppDispatch } from "../app/hooks";
import { useLogoutMutation } from "../app/services/auth.service";
import { logOut } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ onClose }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout({}).unwrap();
    dispatch(logOut());
    onClose();
    navigate("/auth/signin");
  };

  return (
    <div className={styles.profileMenu}>
      <ul>
        <li>
          <button className={styles.logoutButton}>profile</button>
        </li>

        <li>
          <button onClick={handleLogout} className={styles.logoutButton}>
            {isLoading ? "loading" : "Logout"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
