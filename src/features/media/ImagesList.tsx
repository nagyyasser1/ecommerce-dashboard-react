import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllInFolderQuery } from "../../app/services/media.service";
import styles from "./styles/ImagesList.module.css";
import ImageOverlay from "./ImageOverlay";
import { Skeleton } from "../../components";

const ImagesList: React.FC = () => {
  const { folderName } = useParams<{ folderName: string }>();
  const {
    data: images,
    error,
    isLoading,
  } = useGetAllInFolderQuery({ folderName });

  if (isLoading) {
    return (
      <div className={styles.imagesContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} width="170px" height="170px" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error loading images</div>;
  }

  return (
    <div className={styles.imagesContainer}>
      {images?.map((image: any, index: React.Key | null | undefined) => (
        <div key={index} className={styles.imageWrapper}>
          <img
            src={image?.url}
            alt={`Image ${index}`}
            className={styles.image}
          />
          <ImageOverlay image={image ? image : ""} />
        </div>
      ))}
    </div>
  );
};

export default ImagesList;
