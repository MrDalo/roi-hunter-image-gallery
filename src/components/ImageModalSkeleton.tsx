import React from "react";
import { Skeleton } from "@mui/material";

interface ImageModalSkeletonProps {
  height?: string;
}

const ImageModalSkeleton: React.FC<ImageModalSkeletonProps> = ({
  height = "70vh",
}) => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        width: "100%",
        height,
        bgcolor: "grey.200",
      }}
    />
  );
};

export default ImageModalSkeleton;
