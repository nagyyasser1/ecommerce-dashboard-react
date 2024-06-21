import { useGetAllInFolderQuery } from "../../app/services/mediaService";
import { Skeleton } from "../../components";
import styles from "./styles/ImagesListOverlay.module.css";

const ImagesListOverlay = ({ folderName, setValue, getValues }: any) => {
  const {
    data: images,
    error,
    isLoading,
    isFetching,
  } = useGetAllInFolderQuery({ folderName });

  const addImage = (newImage: string) => {
    const currentImages = getValues("images");
    setValue("images", [...currentImages, newImage]);
  };

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
      {images.map((image: { url: string }, index: number) => (
        <div key={index}>
          <img
            src={image?.url}
            alt={`Image ${index}`}
            width={100}
            onClick={() => addImage(image?.url)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesListOverlay;
