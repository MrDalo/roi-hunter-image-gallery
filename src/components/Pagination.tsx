import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface PaginationProps {
  currentPage: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 4,
        mb: 2,
      }}
    >
      <Button
        variant="contained"
        startIcon={<ArrowBackIos />}
        onClick={onPrevious}
        disabled={!canGoPrevious}
        sx={{ minWidth: 120 }}
      >
        Previous
      </Button>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Page {currentPage}
        </Typography>
      </Box>

      <Button
        variant="contained"
        endIcon={<ArrowForwardIos />}
        onClick={onNext}
        disabled={!canGoNext}
        sx={{ minWidth: 120 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
