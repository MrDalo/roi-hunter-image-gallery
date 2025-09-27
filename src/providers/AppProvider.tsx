import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaginationProvider } from "./PaginationProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <PaginationProvider
          totalItems={undefined}
          itemsPerPage={10}
          initialPage={1}
        >
          <CssBaseline />
          {children}
        </PaginationProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
