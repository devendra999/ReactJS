"use client";
import React from "react";
import "../globals.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider, Box } from "@mui/material";
import Sidebar from "@root/components/Sidebar";
import { FooterItem } from "@root/components/Footer";
import Loading from "@root/components/Loading";
import { useMe } from "../../utils/auth/useAuth";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useMe();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body>
            {/* <Sidebar /> */}
            {children}
          </body>
        </html>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

