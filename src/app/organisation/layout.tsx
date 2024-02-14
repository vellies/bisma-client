"use client";
import Navbar from "@@/containers/layout/navbar";
import SideNavigation from "@@/containers/layout/navbar/SideNavigation";
import MDBox from "@@/components/mui/MDBox";
import { useMaterialUIController } from "@@/contexts/MuiContext";

export default function OrganisationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [controller] = useMaterialUIController();
  const { miniSidenav } = controller;
  return (
    <>
      <MDBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          p: 3,
          position: "relative",
          [breakpoints.up("xl")]: {
            marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
            transition: transitions.create(["margin-left", "margin-right"], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard,
            }),
          },
        })}
      >
        <SideNavigation />
        <Navbar />
        {children}
      </MDBox>
    </>
  );
}
