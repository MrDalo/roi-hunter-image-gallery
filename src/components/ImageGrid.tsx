import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
  Alert,
} from "@mui/material";
import type { LoremPicsumImage } from "../types";
import { ApiService } from "../services/apiService";
import { HTTPError } from "../errors";

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
  const getErrorMessage = (error: HTTPError) => {
    if (error.isClientError()) {
      return "The requested images could not be found. Please try a different page.";
    }
    if (error.isServerError()) {
      return "Server is temporarily unavailable. Please try again later.";
    }
    if (error.status === 0) {
      return "Network connection error. Please check your internet connection.";
    }
    return `Error loading images: ${error.message}`;
  };

  if (error) {
    return (
      <Alert
        severity={error.isServerError() ? "warning" : "error"}
        sx={{ my: 2 }}
      >
        {getErrorMessage(error)}
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
          <Card key={index} sx={{ height: "100%" }}>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </CardContent>
          </Card>
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
        <Card
          key={image.id}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
          }}
          onClick={() => onImageClick(image)}
        >
          <CardMedia
            component="img"
            height="200"
            image={ApiService.getImageUrl(image.id, 400, 300)}
            alt={`Photo by ${image.author}`}
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h3"
              sx={{ fontWeight: 500 }}
            >
              Photo by {image.author}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.875rem" }}
            >
              {image.width} × {image.height}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ImageGrid;
