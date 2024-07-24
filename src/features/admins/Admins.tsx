import { Link } from "react-router-dom";
import styles from "./styles/Admins.module.css";
import AdminsList from "./AdminsList";

const Admins = () => {
  return (
    <div className={styles.admins}>
      <div className={styles.admins_header}>
        <p>admins</p>
        <Link to={`new`}>new</Link>
      </div>
      <div>
        <AdminsList />
      </div>
    </div>
  );
};

export default Admins;
