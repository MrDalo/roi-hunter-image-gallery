import React from "react";
import { Card, Skeleton } from "@mui/material";

const ImageCardSkeleton: React.FC = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <Skeleton variant="rectangular" height={200} />
    </Card>
  );
};

export default ImageCardSkeleton;
