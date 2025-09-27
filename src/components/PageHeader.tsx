import React from "react";
import { Typography } from "@mui/material";

const PageHeader: React.FC = () => {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Lorem Picsum Gallery
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
        component="p"
      >
        Browse through beautiful photos with pagination. Click on any image to
        view it in full size.
      </Typography>
    </>
  );
};

export default PageHeader;
