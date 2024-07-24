import { useGetFoldersQuery } from "../../app/services/mediaService";
import styles from "./styles/FolderList.module.css";
import { Skeleton } from "../../components";
import { Link } from "react-router-dom";
import RandomImages from "./RandomImages";

const FolderList = () => {
  const { data: folders, error, isLoading, isError } = useGetFoldersQuery({});

  if (isLoading)
    return (
      <div className={styles.imagesContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} width="120px" height="40px" />
        ))}
      </div>
    );

  console.log(error);

  if (isError)
    return (
      <div>
        <p>error: {error.data.message}</p>
      </div>
    );

  return (
    <div className={styles.folderList}>
      <ul>
        {folders?.map((folder: any) => (
          <li className={styles.folderItem} key={folder.name}>
            <Link to={`/media/${folder.name}`}>{folder.name}</Link>
          </li>
        ))}
      </ul>

      <RandomImages />
    </div>
  );
};

export default FolderList;
