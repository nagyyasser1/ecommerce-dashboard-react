import styles from "./styles/FolderMenu.module.css";

const FolderMenu = ({ onClose }: any) => {
  const handleLogout = async () => {
    onClose();
  };

  return (
    <div className={styles.folderMenu}>
      <ul>
        <li>
          <button onClick={handleLogout} className={styles.deleteButton}>
            {false ? "loading" : "delete"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FolderMenu;
