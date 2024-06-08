import styles from "./styles/Media.module.css";
import AddFolder from "./AddFolder";
import FolderList from "./FolderList";

const Media = () => {
  return (
    <div className={styles.media}>
      <header className={styles.media_header}>
        <p>File Manager</p>
        <AddFolder />
      </header>
      <FolderList />
    </div>
  );
};

export default Media;
