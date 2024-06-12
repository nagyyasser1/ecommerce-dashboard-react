import { Link } from "react-router-dom";
import styles from "./styles/Footer.module.css";
import { MdCopyright } from "react-icons/md";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.information}>
        <p>
          <span>Made by </span>
          <Link
            to={"https://www.linkedin.com/in/nagy-yasser-629bab239/"}
            target="_blank"
          >
            NagyYasser
          </Link>
          <span>
            {" "}
            <MdCopyright /> 2024
          </span>
        </p>
      </div>
      <ul className={styles.links}>
        <li>+201094066795</li>
      </ul>
    </footer>
  );
};

export default Footer;
