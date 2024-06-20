import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { useUploadFilesMutation } from "../../app/services/mediaService";
import styles from "./styles/UploadAssets.module.css";

const UploadAssets: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const { folderName } = useParams<{ folderName: string }>();
  const [uploadFiles] = useUploadFilesMutation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setUploadStatus("");
  }, []);

  const handleUpload = async () => {
    setUploading(true);
    setUploadStatus("Uploading...");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    if (folderName) formData.append("folder", folderName);

    try {
      await uploadFiles(formData).unwrap();
      setUploadStatus("Upload successful!");
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.container}>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ""}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <button
        className={styles.uploadButton}
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
      >
        Upload Files
        {uploadStatus && (
          <span className={styles.uploadStatus}> {uploadStatus}</span>
        )}
      </button>
    </div>
  );
};

export default UploadAssets;
