import React from "react";
import { Card, CardMedia } from "@mui/material";
import type { LoremPicsumImage } from "../types";
import { ImageService } from "../services/imageService";

interface ImageCardProps {
  image: LoremPicsumImage;
  onImageClick: (image: LoremPicsumImage) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  return (
    <Card
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
        image={ImageService.getImageUrl(image.id, 400, 300)}
        alt={`Photo by ${image.author}`}
        sx={{ objectFit: "cover" }}
      />
    </Card>
  );
};

export default ImageCard;
