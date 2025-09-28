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
import { AIDescriptionService } from "../services/aiDescriptionService";
import { HTTPError } from "../errors";
import ImageModalSkeleton from "./ImageModalSkeleton";
import ImageError from "./ImageError";
import ImageDetails from "./ImageDetails";

interface ImageModalProps {
  image: LoremPicsumImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [aiDescription, setAiDescription] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && image) {
      setIsImageLoading(true);
      setImageError(false);
      setAiDescription("");
      setIsAiLoading(false);
      setAiError(null);
    }
  }, [isOpen, image]);

  // Generate AI description when conditions are met
  useEffect(() => {
    if (isImageLoading || imageError || !image || !isOpen || aiDescription) {
      return;
    }

    const generateAiDescription = async () => {
      setIsAiLoading(true);
      setAiError(null);

      try {
        const description = await AIDescriptionService.generateDescription(
          ImageService.getLargeImageUrl(image.id)
        );
        setAiDescription(description);
      } catch (error) {
        console.error("Failed to generate AI description:", error);

        // Handle HTTPError with specific error messages
        if (error instanceof HTTPError) {
          setAiError(error.message);
        } else {
          setAiError("Failed to generate AI description");
        }
      } finally {
        setIsAiLoading(false);
      }
    };

    // Small delay to ensure image is fully loaded
    const timeoutId = setTimeout(generateAiDescription, 500);
    return () => clearTimeout(timeoutId);
  }, [isImageLoading, imageError, image, isOpen, aiDescription]);

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
            overflow: "auto",
            outline: "none",
          }}
        >
          <Card
            sx={{
              position: "relative",
              height: "100%",
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
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
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                height: {
                  xs: "40vh",
                  sm: "45vh",
                  md: "50vh",
                },
                flexShrink: 0,
              }}
            >
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
                    height: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
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
            <Box sx={{ flex: "0 0 auto" }}>
              <ImageDetails
                image={image}
                aiDescription={aiDescription}
                isAiLoading={isAiLoading}
                aiError={aiError}
              />
            </Box>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ImageModal;
