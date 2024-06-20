import React, { useEffect, useState } from "react";
import { useGetAllInFolderQuery } from "../../app/services/mediaService";
import { Skeleton } from "../../components";
import styles from "./styles/ImagesListOverlay.module.css";
import { useFormContext } from "react-hook-form";

interface Image {
  url: string;
}

interface ImagesListOverlayProps {
  folderName: string;
}

const ImagesListOverlay: React.FC<ImagesListOverlayProps> = ({
  folderName,
}) => {
  const {
    data: images,
    error,
    isLoading,
    isFetching,
  } = useGetAllInFolderQuery({ folderName });

  const { register, setValue } = useFormContext();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const toggleImageSelection = (imageUrl: string) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(imageUrl)
        ? prevSelectedImages.filter((url) => url !== imageUrl)
        : [...prevSelectedImages, imageUrl]
    );
  };

  useEffect(() => {
    setValue("images", selectedImages);
  }, [selectedImages, setValue]);

  useEffect(() => {
    register("images");
  }, [register]);

  if (!folderName) {
    return null;
  }

  if (isLoading || isFetching) {
    return (
      <div className={styles.imagesContainer}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} width="100px" height="100px" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error loading images</div>;
  }

  return (
    <div className={styles.imagesContainer}>
      {images?.map((image: Image, index: number) => (
        <div
          key={index}
          className={`${styles.imageWrapper} ${
            selectedImages.includes(image.url) ? styles.selected : ""
          }`}
          onClick={() => toggleImageSelection(image.url)}
        >
          <img
            src={image.url}
            alt={`Image ${index}`}
            className={styles.image}
          />
          {selectedImages.includes(image.url) && (
            <div className={styles.checkmark}>✔</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImagesListOverlay;
