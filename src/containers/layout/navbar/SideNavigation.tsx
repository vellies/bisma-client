"use client";
import { useState, useEffect } from "react";
import MDBox from "@@/components/mui/MDBox";
import { useMaterialUIController } from "@@/contexts/MuiContext";
import Sidenav from "@@/containers/layout/sidenav";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PaidIcon from "@mui/icons-material/Paid";
import GroupIcon from "@mui/icons-material/Group";
// import { Role } from 'helpers/role';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "@@/contexts/AuthContextProvider";

function SideNavigation() {
  const [controller] = useMaterialUIController();
  const {
    miniSidenav,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  const [loading, setLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");

  const [routes, setRoutes] = useState([]);
  const { accountProfile, userAccessType } = useAuth();
  const [superAdminRoutes, setSuperAdminRoutes] = useState([]);
  const [individualRoutes, setIndividualRoutes] = useState([]);

  useEffect(() => {
    var routes: any = [];
    var superAdminRoutes: any = [];
    var individualRoutes: any = [];

    routes = [
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        route: "/organisation/dashboard",
        icon: <DashboardIcon />,
        noCollapse: true,
      },
      {
        type: "collapse",
        name: "Category",
        key: "category",
        route: "/organisation/category",
        icon: <CorporateFareIcon />,
        noCollapse: true,
      },
      {
        type: "collapse",
        name: "Products",
        key: "product",
        route: "/organisation/product",
        icon: <WorkspacePremiumIcon />,
        noCollapse: true,
      },
      
    ];

    superAdminRoutes = [
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        route: "/manage/dashboard",
        icon: <DashboardIcon />,
        noCollapse: true,
      },
      {
        type: "collapse",
        name: "Category",
        key: "category",
        route: "/manage/category",
        icon: <CorporateFareIcon />,
        noCollapse: true,
      },
      {
        type: "collapse",
        name: "Products",
        key: "product",
        route: "/manage/product",
        icon: <WorkspacePremiumIcon />,
        noCollapse: true,
      },
      
    ];

    individualRoutes = [
      {
        type: "collapse",
        name: "My Certificates",
        key: "my-certificates",
        route: "/user/my-certificates",
        icon: <WorkspacePremiumIcon />,
        noCollapse: true,
      },
    ];

    setRoutes(routes);
    setSuperAdminRoutes(superAdminRoutes);
    setIndividualRoutes(individualRoutes);
  }, []);

  return (
    <MDBox>
      <Sidenav
        color={sidenavColor}
        brand="/images/bisma.png"
        brandName="/images/bisma-typeface.png"
        routes={
          userAccessType == "superadmin"
            ? superAdminRoutes
            : userAccessType == "admin"
              ? routes
              : userAccessType == "student"
                ? individualRoutes
                : []
        }
      />
    </MDBox>
  );
}

export default SideNavigation;
