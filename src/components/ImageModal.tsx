import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Card,
  CardMedia,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { LoremPicsumImage } from "../types";
import { ImageService } from "../services/imageService";
import ImageModalSkeleton from "./ImageModalSkeleton";
import ImageError from "./ImageError";
import ImageDetails from "./ImageDetails";

interface ImageModalProps {
  image: LoremPicsumImage | null;
  isOpen: boolean;
  onClose: () => void;
  description?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  image,
  isOpen,
  onClose,
  description,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Reset loading state when modal opens with new image
  useEffect(() => {
    if (isOpen && image) {
      setIsImageLoading(true);
      setImageError(false);
    }
  }, [isOpen, image]);

  if (!image) return null;

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageError(true);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "95%",
              sm: "90%",
              md: "80%",
              lg: "70%",
              xl: "60%",
            },
            maxWidth: 900,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            overflow: "hidden",
            outline: "none",
          }}
        >
          <Card sx={{ position: "relative", height: "100%" }}>
            {/* Close button */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <Close />
            </IconButton>

            {/* Image with skeleton fallback */}
            <Box sx={{ position: "relative" }}>
              {/* Skeleton placeholder */}
              {isImageLoading && <ImageModalSkeleton />}

              {/* Actual image */}
              {!imageError && (
                <CardMedia
                  component="img"
                  image={ImageService.getLargeImageUrl(image.id)}
                  alt={`Photo by ${image.author}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  sx={{
                    width: "100%",
                    maxHeight: "70vh",
                    objectFit: "contain",
                    bgcolor: "grey.100",
                    display: isImageLoading ? "none" : "block",
                  }}
                />
              )}

              {/* Error fallback */}
              {imageError && <ImageError />}
            </Box>

            {/* Image details */}
            <ImageDetails image={image} description={description} />
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ImageModal;
