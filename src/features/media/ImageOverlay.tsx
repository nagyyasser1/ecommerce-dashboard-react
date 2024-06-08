import { Link } from "react-router-dom";
import { useDeleteFileMutation } from "../../app/services/media.service";
import styles from "./styles/ImagesList.module.css";

interface ImageOverlayProp {
  image: any;
}
const ImageOverlay = ({ image }: ImageOverlayProp) => {
  const [deleteFileMutation, { isLoading }] = useDeleteFileMutation();

  const handleReview = () => {};

  const handleDelete = async () => {
    try {
      await deleteFileMutation({ public_Id: image?.public_id }).unwrap();
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <button className={styles.button} onClick={handleReview}>
        <Link to={image.url} target="_blank">
          Review
        </Link>
      </button>
      <button
        className={styles.button}
        onClick={handleDelete}
        disabled={isLoading}
      >
        {isLoading ? "Deleting" : "Delete"}
      </button>
    </div>
  );
};

export default ImageOverlay;
