import MDBox from "@@/components/mui/MDBox";
import { Grid } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BISMA",
  description:
    "",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      sx={{ overflowX: "hidden" }}
      className="bg-gradient"
    >
      <MDBox width="100%" height="100vh" mx="auto" position="relative">
        {children}
      </MDBox>
    </MDBox>
  );
}
