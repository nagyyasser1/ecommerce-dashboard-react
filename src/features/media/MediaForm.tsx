import styles from "./styles/MediaForm.module.css";

const MediaForm = () => {
  return (
    <div className={styles.mediaForm}>
      <form>
        <input type="text" placeholder="Create new folder" />
        <button>create</button>
      </form>
    </div>
  );
};

export default MediaForm;
