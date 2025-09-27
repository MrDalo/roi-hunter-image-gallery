import React from "react";
import { Box, Alert } from "@mui/material";
import type { LoremPicsumImage } from "../types";
import { HTTPError } from "../errors";
import ImageCard from "./ImageCard";
import ImageCardSkeleton from "./ImageCardSkeleton";

interface ImageGridProps {
  images: LoremPicsumImage[];
  isLoading: boolean;
  error: HTTPError | null;
  onImageClick: (image: LoremPicsumImage) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  isLoading,
  error,
  onImageClick,
}) => {
  if (error) {
    return (
      <Alert
        severity={error.isServerError() ? "warning" : "error"}
        sx={{ my: 2 }}
      >
        {error.message}
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 2,
          mt: 2,
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <ImageCardSkeleton key={index} />
        ))}
      </Box>
    );
  }

  if (images.length === 0) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        No images found.
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        },
        gap: 2,
        mt: 2,
      }}
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} onImageClick={onImageClick} />
      ))}
    </Box>
  );
};

export default ImageGrid;
