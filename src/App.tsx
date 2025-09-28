import React from "react";
import { Container, Box } from "@mui/material";
import { useImages, usePaginationContext, useImageModal } from "./hooks";
import {
  ImageGrid,
  Pagination,
  ImageModal,
  HeaderBar,
  PageHeader,
} from "./components";

const App: React.FC = () => {
  const { selectedImage, isModalOpen, openModal, closeModal } = useImageModal();

  const { currentPage, canGoNext, canGoPrevious, goToNext, goToPrevious } =
    usePaginationContext();

  const { images, isLoading, error } = useImages(currentPage, 10);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Bar */}
      <HeaderBar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <PageHeader />

          {/* Image Grid */}
          <ImageGrid
            images={images}
            isLoading={isLoading}
            error={error}
            onImageClick={openModal}
          />

          {/* Pagination */}
          {!error && (
            <Pagination
              currentPage={currentPage}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
              onNext={goToNext}
              onPrevious={goToPrevious}
            />
          )}
        </Container>
      </Box>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </Box>
  );
};

export default App;
