import React from "react";
import { CardContent, Typography, Box } from "@mui/material";
import type { LoremPicsumImage } from "../types";

interface ImageDetailsProps {
  image: LoremPicsumImage;
  description?: string;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ image, description }) => {
  return (
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Photo by {image.author}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
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
  );
};

export default ImageDetails;
