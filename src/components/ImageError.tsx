import React from "react";
import { Box, Typography } from "@mui/material";
import { BrokenImage } from "@mui/icons-material";

interface ImageErrorProps {
  message?: string;
  height?: string;
}

const ImageError: React.FC<ImageErrorProps> = ({
  message = "Failed to load image",
  height = "70vh",
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        color: "text.secondary",
        gap: 2,
      }}
    >
      <BrokenImage sx={{ fontSize: 48, color: "grey.400" }} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default ImageError;
