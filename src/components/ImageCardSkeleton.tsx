import React from "react";
import { Card, CardContent, Skeleton } from "@mui/material";

const ImageCardSkeleton: React.FC = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  );
};

export default ImageCardSkeleton;
