/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import MDBox from "@@/components/mui/MDBox";
import { AccountCircle } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "assets/images/bisma.svg";
import MDAvatar from "@@/components/mui/MDAvatar";
import MDTypography from "@@/components/mui/MDTypography";
import AppsIcon from "@mui/icons-material/Apps";
import BismaLogo from "assets/images/bisma.png";
import ValidateLogo from "assets/images/validate.png";
import MarketplaceLogo from "assets/images/NFT.png";
import MetaverseLogo from "assets/images/Metaverse.png";
import { Grid } from "@mui/material";
import Link from "next/link";

const Header = () => {
  const { accessToken, logout, accountProfile } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [productList, setProductList] = useState(false);
  useEffect(() => {
    if (window.location.pathname != "/dashboard") {
      setProductList(true);
    }
    // messageService.getMessage().subscribe((message: any) => {
    //   if (message) {
    //     if (message.text.key == "updateProfileData") {
    //       setUserFullName(message.text.updateProfile);
    //       setUserImage(message.text.userImage);
    //     }
    //   }
    // });
  }, []);

  // Apps menu
  const [appsAnchorEl, setAppsAnchorEl] = useState<null | HTMLElement>(null);
  const appsOpen = Boolean(appsAnchorEl);
  const handleAppsMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAppsAnchorEl(event.currentTarget);
  };
  const handleAppsClose = () => {
    setAppsAnchorEl(null);
  };

  const [userFullName, setUserFullName] = useState("");
  const [userImage, setUserImage] = useState("");
  // brand logo changed - sharfudeen
  return (
    <AppBar position="absolute" className="header">
      <Toolbar>
        <MDBox sx={{ flexGrow: 1 }}>
          <MDBox
            component="img"
            src={BrandLogo}
            className="brand-logo"
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </MDBox>
        <MDBox display="flex" alignItems="center" gap={2}>
          {/* {
            productList ?
              <IconButton onClick={handleAppsMenu} sx={{ color: "#ffffff" }}>
                <AppsIcon />
              </IconButton>
              : ''
          } */}
          <MDBox
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            display="flex"
            justifyContent="end"
            alignItems="center"
            gap={2}
            sx={{ cursor: "pointer" }}
          >
            {/* <MDAvatar
              src=""
              sx={{ width: { xs: 30 }, height: { xs: 30 } }}
            /> */}
            {userImage != "" ? (
              // <img src={values.profileImageUrl} className="dropzone.thumb-img" />
              <Grid item>
                <MDAvatar
                  src={userImage}
                  alt="profile-image"
                  size="sm"
                  shadow="sm"
                  // onLoad={() => { URL.revokeObjectURL(file.preview) }}
                  className="cursor-pointer"
                />
              </Grid>
            ) : (
              <MDAvatar src="" sx={{ width: { xs: 30 }, height: { xs: 30 } }} />
            )}
            {/* {userImage} */}
            <MDTypography color="light" className="profile-name">
              {/* {accountProfile?.firstName} {accountProfile?.lastName} */}
              {userFullName}
            </MDTypography>
          </MDBox>
          {/* profile menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ marginTop: "10px" }}
          >
            <Link
              href="/profile"
              style={{ textDecoration: "none", color: "#7b809a" }}
            >
              <MenuItem>Profile</MenuItem>
            </Link>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>

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
            <MDBox
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="stretch"
              gap={1.5}
              sx={{ width: "200px", px: 2, py: 4 }}
            >
              <MDBox width="40%">
                <a href="/" className="apps-menu">
                  <img src={BismaLogo.src} alt="" />
                  <p>Bisma</p>
                </a>
              </MDBox>
              <MDBox width="40%">
                <a href="/commingSoon?site=validate" className="apps-menu">
                  <img src={ValidateLogo.src} alt="" />
                  <p>Validate</p>
                </a>
              </MDBox>
              <MDBox width="40%">
                <a href="/commingSoon?site=marketplace" className="apps-menu">
                  <img src={MarketplaceLogo.src} alt="" />
                  <p>NFT</p>
                </a>
              </MDBox>
              <MDBox width="40%">
                <a href="/commingSoon?site=metaverse" className="apps-menu">
                  <img src={MetaverseLogo.src} alt="" />
                  <p>Metaverse</p>
                </a>
              </MDBox>
            </MDBox>
          </Menu>
        </MDBox>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
