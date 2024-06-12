import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles/FolderDetails.module.css";
import UploadAssets from "./UploadAssets";
import ImagesList from "./ImagesList";
import { useRemoveFolderMutation } from "../../app/services/media.service";

const FolderDetails = () => {
  const { folderName } = useParams();
  const navigate = useNavigate();

  const [removeFolder, { isLoading, error, isError }] =
    useRemoveFolderMutation();

  const handleDelete = async () => {
    try {
      await removeFolder(folderName).unwrap();

      navigate("/media");
    } catch (error) {
      console.error("Failed to delete folder:", error);
    }
  };

  return (
    <div className={styles.folderDetails}>
      <div className={styles.folderDetails_header}>
        <p>
          Name <span>{` >`}</span> {folderName}
        </p>
        <div className={styles.folderDetails_actions}>
          <button onClick={handleDelete}>
            {isLoading ? "Removing" : "Remove"}
          </button>
          {isError ? error?.data?.message : ""}
        </div>
      </div>
      <UploadAssets />
      <ImagesList />
    </div>
  );
};

export default FolderDetails;
