import React from "react";
import styles from "./styles/Skeleton.module.css";

interface SkeletonProps {
  width: string;
  height: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height }) => {
  return <div className={styles.skeleton} style={{ width, height }}></div>;
};

export default Skeleton;
