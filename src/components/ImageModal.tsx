import React from "react";
import {
  Modal,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { LoremPicsumImage } from "../types";
import { ApiService } from "../services/apiService";

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
  if (!image) return null;

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

            {/* Image */}
            <CardMedia
              component="img"
              image={ApiService.getLargeImageUrl(image.id)}
              alt={`Photo by ${image.author}`}
              sx={{
                width: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                bgcolor: "grey.100",
              }}
            />

            {/* Image details */}
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Photo by {image.author}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Dimensions:</strong> {image.width} × {image.height}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>ID:</strong> {image.id}
                </Typography>
              </Box>

              {description && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    AI Description:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ImageModal;
