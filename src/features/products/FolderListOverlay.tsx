// FolderListOverlay.tsx
import { useEffect, useState } from "react";
import { useGetFoldersQuery } from "../../app/services/mediaService";
import { Skeleton } from "../../components";
import styles from "./styles/FolderListOverlay.module.css";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "../../app/hooks";
import { toggleAssestOverlay } from "../appSlice";
import ImagesListOverlay from "./ImagesListOverlay";

const FolderListOverlay = ({ setValue, getValues }: any) => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFolderName, setSelectedFolderName] = useState("");
  const dispatch = useAppDispatch();

  const handleOverLayClicked = () => {
    dispatch(toggleAssestOverlay());
  };

  const handleSetFolderName = (folderName: string) => {
    setSelectedFolderName(folderName);
  };

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
      <div className={styles.folderList_loading}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} width="120px" height="40px" />
        ))}
      </div>
    );

  return (
    <div className={styles.folderList}>
      <div className={styles.folderList_header}>
        <IoMdClose
          className={styles.folderList_header_icon}
          onClick={handleOverLayClicked}
        />
      </div>
      {error ? (
        <p>Error fetching folders: {fetchError}</p>
      ) : (
        <div className={styles.folderList_content}>
          <ul>
            {folders.map((folder: any) => (
              <li className={styles.folderItem} key={folder.name}>
                <p onClick={() => handleSetFolderName(folder.name)}>
                  {folder.name}
                </p>
              </li>
            ))}
          </ul>
          <ImagesListOverlay
            folderName={selectedFolderName}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
      )}
    </div>
  );
};

export default FolderListOverlay;
