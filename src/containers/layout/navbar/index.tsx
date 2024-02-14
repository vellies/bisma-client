/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { checkUserRouter } from "@@/utils/CommonUtils";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AppsIcon from "@mui/icons-material/Apps";
import { Grid } from "@mui/material";
import MDAvatar from "@@/components/mui/MDAvatar";

// Material Dashboard 2 PRO React TS components
import MDBox from "@@/components/mui/MDBox";
import MDInput from "@@/components/mui/MDInput";
import MDBadge from "@@/components/mui/MDBadge";

// Material Dashboard 2 PRO React TS examples components
import Breadcrumbs from "@@/components/mui/Breadcrumbs";
import NotificationItem from "@@/components/mui/NotificationItem";
import { NOTIFICATION, PROFILE } from "@@/utils/routeUtils";
import { ORGANISATION, MANAGE, USER, LOGIN, DASHBOARD, MY_CERTIFICATES } from "@@/utils/routeUtils";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "@@/containers/layout/navbar/styles";

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "@@/contexts/MuiContext";
import { MenuItem } from "@mui/material";
import MDTypography from "@@/components/mui/MDTypography";
import BismaLogo from "assets/images/bisma.png";
import ValidateLogo from "assets/images/validate.png";
import MarketplaceLogo from "assets/images/NFT.png";
import MetaverseLogo from "assets/images/Metaverse.png";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// Declaring prop types for DashboardNavbar
interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
}

function Navbar({ absolute, light, isMini }: Props): JSX.Element {
  const router = useRouter();
  const { logout, accountProfile, accessToken, getCounts } = useAuth();
  const [navbarType, setNavbarType] = useState<
    "fixed" | "absolute" | "relative" | "static" | "sticky"
  >();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
  } = controller;
  const [openMenu, setOpenMenu] = useState<any>(false);
  const route = usePathname().split("/").slice(1);
  const [notificationCount, setNotificationCount] = useState(0);
  const [userFullName, setUserFullName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRoleRouter, setUserRoleRouter] = useState("");

  useEffect(() => {

    getCountsData();

    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);

  }, [dispatch, fixedNavbar]);

  useEffect(() => {
    if (accountProfile) {
      let imageURL = accountProfile?.profileImageUrl;
      let userName = accountProfile?.firstName + ' ' + accountProfile?.lastName;
      let logedInRole = accountProfile?.userRole
      setUserRoleRouter(logedInRole == 'admin' ? ORGANISATION :
        logedInRole == 'superadmin' ? MANAGE :
          logedInRole == 'student' ? USER : '')
      if (imageURL == ("undefined" || null || "null")) {
        imageURL = "";
      }

      setUserImage(imageURL ? imageURL : "");
      setUserFullName(userName ? userName : "");
    }
  }, [accountProfile])

  const getCountsData = () => {
    setLoading(true);
    let values = {
      certificateType: 'education',
    };
    getCounts({ body: values })
      .then((res) => {
        setNotificationCount(res.body.notificationCount)
      })
  };

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event: any) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference="anchorEl"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<EmailIcon />} title="Check new messages" />
      <NotificationItem
        icon={<PodcastsIcon />}
        title="Manage Podcast sessions"
      />
      <NotificationItem
        icon={<ShoppingCartIcon />}
        title="Payment successfully completed"
      />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }: {
    palette: any;
    functions: any;
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const redirectUrl = (path: string) => {
    window.location.href = path;
  };

  // profile menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Apps menu
  const [appsAnchorEl, setAppsAnchorEl] = useState<null | HTMLElement>(null);
  const appsOpen = Boolean(appsAnchorEl);
  const handleAppsMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAppsAnchorEl(event.currentTarget);
  };
  const handleAppsClose = () => {
    setAppsAnchorEl(null);
  };
  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => ({
        ...navbar(theme, { transparentNavbar, absolute, light, darkMode }),
        zIndex: 1059,
      })}
    >
      <Toolbar sx={navbarContainer}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
          gap={2}
        >
          <IconButton
            sx={navbarDesktopMenu}
            onClick={handleMiniSidenav}
            size="small"
            disableRipple
          >
            {miniSidenav ? (
              <MenuOpenIcon sx={iconsStyle} fontSize="medium" />
            ) : (
              <MenuIcon sx={iconsStyle} fontSize="medium" />
            )}
          </IconButton>
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                {miniSidenav ? (
                  <MenuOpenIcon sx={iconsStyle} fontSize="medium" />
                ) : (
                  <MenuIcon sx={iconsStyle} fontSize="medium" />
                )}
              </IconButton>
              <MDBox display="flex" alignItems="center" gap={0.5}>
                {/* {
                  accountProfile?.userType == 'individual' ? "" : */}
                    <IconButton
                      size="small"
                      color="inherit"
                      sx={navbarIconButton}
                      onClick={() => {
                        router.push(userRoleRouter + NOTIFICATION)
                      }}
                    >
                      {
                        (notificationCount != (null && undefined && "")) ?
                          notificationCount > 0 ? <MDBadge badgeContent={notificationCount} color="error" size="xs" circular>
                            <NotificationsIcon sx={iconsStyle} />
                          </MDBadge>
                            : <NotificationsIcon sx={iconsStyle} />
                          : <NotificationsIcon sx={iconsStyle} />
                      }
                    </IconButton>
                {/* } */}

                <IconButton
                  sx={navbarIconButton}
                  size="large"
                  onClick={handleClick}
                  disableRipple
                >
                  {userImage ? (
                    <Grid item>
                      <MDAvatar
                        src={userImage}
                        alt="profile-image"
                        size="sm"
                        shadow="sm"
                        className="cursor-pointer"
                      />
                    </Grid>
                  ) : (
                    <AccountCircleIcon sx={iconsStyle} />
                  )}
                </IconButton>
                <MDTypography className="profile-name" onClick={handleClick}>
                  {userFullName}
                </MDTypography>
              </MDBox>

              {/* apps menu */}
              <Menu
                id="apps-menu"
                anchorEl={appsAnchorEl}
                open={appsOpen}
                onClose={handleAppsClose}
                MenuListProps={{
                  "aria-labelledby": "apps-button",
                }}
              >
              </Menu>

              {/* profile menu */}
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "profile-button",
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    router.push(PROFILE)
                  }}
                >
                  <span style={{ cursor: "pointer", color: "#7b809a" }}>
                    Profile
                  </span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar >
  );
}

// Declaring default props for DashboardNavbar
Navbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default Navbar;
