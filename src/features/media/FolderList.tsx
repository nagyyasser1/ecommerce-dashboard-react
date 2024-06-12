import { useState, useEffect } from "react";
import { useGetFoldersQuery } from "../../app/services/media.service";
import styles from "./styles/FolderList.module.css";
import { Skeleton } from "../../components";
import { Link } from "react-router-dom";
import RandomImages from "./RandomImages";

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);

  const { data, error: fetchError, isLoading } = useGetFoldersQuery({});

  useEffect(() => {
    if (data) {
      setFolders(data);
    } else if (fetchError) {
      setError(fetchError);
    }
  }, [data, fetchError]);

  if (isLoading)
    return (
      <div className={styles.imagesContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} width="120px" height="40px" />
        ))}
      </div>
    );

  return (
    <div className={styles.folderList}>
      {error ? (
        <p>Error fetching folders: {fetchError}</p>
      ) : (
        <ul>
          {folders.map((folder: any) => (
            <li className={styles.folderItem} key={folder.name}>
              <Link to={`/media/${folder.name}`}>{folder.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <RandomImages />
    </div>
  );
};

export default FolderList;
