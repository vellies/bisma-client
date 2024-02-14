/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import MDButton from "@@/components/mui/MDButton";
// import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MDAvatar from "@@/components/mui/MDAvatar";
import MDTypography from "@@/components/mui/MDTypography";
import MDBox from "@@/components/mui/MDBox";
import { Grid } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { PROFILE } from "@@/utils/routeUtils";
import { useRouter, usePathname } from "next/navigation";
import { ADD, EDIT, ORGANISATION, PRODUCT, LOGIN } from "@@/utils/routeUtils";

function HomeNav() {
  const router = useRouter();
  const { logout, accountProfile, accessToken } = useAuth();
  const [profileEl, setProfileEl] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(profileEl);

  const [userFullName, setUserFullName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    let imageURL = accountProfile?.profileImageUrl;
    let userName = accountProfile?.firstName + ' ' + accountProfile?.lastName;
    if (imageURL == ("undefined" || null || "null")) {
      imageURL = "";
    }
    setUserImage(imageURL ? imageURL : "");
    setUserFullName(userName ? userName : "");
  });

  const redirectUrl = (path: string) => {
    window.location.href = path;
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileEl(null);
  };

  return (
    <>
      <header className="home-nav">
        <div className="page-container root-padding">
          <nav>
            <div className="brand">
              <Link href="/">
                <img
                  src="https://bisma-bucket.s3.ap-southeast-1.amazonaws.com/website/images/bisma.svg"
                  alt=""
                />
              </Link>
            </div>
            {accessToken ? (
              <>
                <MDBox display="flex" alignItems="center" gap={0.5}>
                  <IconButton
                    onClick={handleProfileMenu}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={openProfileMenu ? "profile-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openProfileMenu ? "true" : undefined}
                  >
                    {userImage ? (
                      <Grid item>
                        <MDAvatar
                          src={userImage}
                          alt="profile-image"
                          size="md"
                          shadow="sm"
                          className="cursor-pointer"
                        />
                      </Grid>
                    ) : (
                      <MDAvatar
                        sx={{ width: 32, height: 32 }}
                        src={userImage}
                      />
                    )}
                  </IconButton>
                  <MDTypography
                    className="profile-name"
                    onClick={handleProfileMenu}
                  >
                    {userFullName}
                  </MDTypography>
                </MDBox>
                <Menu
                  anchorEl={profileEl}
                  id="profile-menu"
                  open={openProfileMenu}
                  onClose={handleProfileMenuClose}
                  onClick={handleProfileMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() =>
                      router.push(PROFILE)}
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
              </>
            ) : (
              <>
                <MDButton
                  variant="gradient"
                  color="info"
                  size="large"
                  className="login-btn"
                  onClick={() => router.push(LOGIN) }
                >
                  Log in
                </MDButton>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default HomeNav;
