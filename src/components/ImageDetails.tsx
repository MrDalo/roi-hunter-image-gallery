import React from "react";
import { CardContent, Typography, Box, Skeleton, Alert } from "@mui/material";
import { AutoAwesome, Error } from "@mui/icons-material";
import type { LoremPicsumImage } from "../types";

interface ImageDetailsProps {
  image: LoremPicsumImage;
  aiDescription?: string;
  isAiLoading?: boolean;
  aiError?: boolean;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({
  image,
  aiDescription,
  isAiLoading = false,
  aiError = false,
}) => {
  return (
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Photo by {image.author}
      </Typography>

      {/* AI Description Section */}
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <AutoAwesome sx={{ fontSize: 18, color: "primary.main" }} />
          <Typography variant="subtitle2" color="primary.main">
            AI Description:
          </Typography>
        </Box>

        {(isAiLoading || !aiDescription) && (
          <Box sx={{ mt: 1 }}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </Box>
        )}

        {aiError && (
          <Alert severity="warning" icon={<Error />} sx={{ mt: 1 }}>
            Unable to generate description at this time.
          </Alert>
        )}

        {!isAiLoading && !aiError && aiDescription && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              p: 1.5,
              bgcolor: "grey.50",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            {aiDescription}
          </Typography>
        )}
      </Box>
    </CardContent>
  );
};

export default ImageDetails;
