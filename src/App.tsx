import { useState } from "react";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Box,
  Alert,
} from "@mui/material";
import { PhotoLibrary } from "@mui/icons-material";
import { useImages } from "./hooks/useImages";
import { usePaginationContext } from "./hooks/usePaginationContext";
import ImageGrid from "./components/ImageGrid";
import Pagination from "./components/Pagination";
import ImageModal from "./components/ImageModal";
import type { LoremPicsumImage } from "./types";

function App() {
  const [selectedImage, setSelectedImage] = useState<LoremPicsumImage | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use context-based pagination
  const { currentPage, canGoNext, canGoPrevious, goToNext, goToPrevious } =
    usePaginationContext();

  const { images, isLoading, error } = useImages(currentPage, 10);

  const handleImageClick = (image: LoremPicsumImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* App Bar */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <PhotoLibrary sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ROI Hunter Image Gallery
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
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
            Browse through beautiful photos with pagination. Click on any image
            to view it in full size.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to load images. Please try again later.
            </Alert>
          )}

          {/* Image Grid */}
          <ImageGrid
            images={images}
            isLoading={isLoading}
            error={error}
            onImageClick={handleImageClick}
          />

          {/* Pagination */}
          {!error && (
            <Pagination
              currentPage={currentPage}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
              onNext={goToNext}
              onPrevious={goToPrevious}
              imagesCount={images.length}
            />
          )}
        </Container>
      </Box>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Box>
  );
}

export default App;
