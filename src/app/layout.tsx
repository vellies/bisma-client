// "use client";
import type { Metadata } from "next";
import { MaterialUIControllerProvider } from "@@/contexts/MuiContext";
import { AuthContextProvider } from "@@/contexts/AuthContextProvider"
import { ApolloWrapper } from "@@/lib/apollo-provider";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import theme from "@@/assets/theme";
// css import
import "@@/assets/css/main.scss";

export const metadata: Metadata = {
  title: "BISMA",
  description:
    "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthContextProvider>
            <MaterialUIControllerProvider>
              <ThemeProvider theme={theme}>
                {children}
                <ToastContainer />
              </ThemeProvider>
            </MaterialUIControllerProvider>
          </AuthContextProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
