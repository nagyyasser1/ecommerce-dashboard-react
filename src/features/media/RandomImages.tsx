import React from "react";
import { useGetImagesFromAllFoldersQuery } from "../../app/services/mediaService";
import ImageOverlay from "./ImageOverlay";
import { Skeleton } from "../../components";
import styles from "./styles/RandomImages.module.css";
import RandomOverly from "./RandomOverly";

const RandomImages = () => {
  const {
    data: images,
    error,
    isLoading,
  } = useGetImagesFromAllFoldersQuery({});

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
          <RandomOverly image={image ? image : ""} />
        </div>
      ))}
    </div>
  );
};

export default RandomImages;
