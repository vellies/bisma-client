"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import MDBox from "@@/components/mui/MDBox";
import MDTypography from "@@/components/mui/MDTypography";
import useForm from "@@/helpers/useForm";
import { loginValidate } from "@@/helpers/validateRules";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { errorCode } from "@@/utils/ServiceAPIUtil";
import MDInput from "@@/components/mui/MDInput";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import { LOGIN, FORGOT_PASSWORD, SIGNUP } from "@@/utils/routeUtils";
import {
  checkUserLoggedIn,
  checkAndRedirectUserLogIn,
} from "@@/utils/CommonUtils";
import { useRouter, usePathname } from "next/navigation";

const initialValues = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();
  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
    handleSubmitCB,
    loginValidate
  );
  const { login, accountProfile, accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");

  useEffect(() => {}, []);

  function handleSubmitCB() {
    setLoading(true);
    login({
      username: values.username.toLowerCase(),
      password: values.password,
    })
      .then((res) => {})
      .catch((err) => {
        setGlobalErrMsg(errorCode(err));
        setLoading(false);
      });
  }
  if (accountProfile && accountProfile._id)
    router.push(checkAndRedirectUserLogIn(accountProfile, LOGIN));
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Grid item xs={11} sm={9} md={6} lg={5} xl={3}>
        <Card className="form-container">
          <MDBox bgColor="transparent" textAlign="center">
            {/* <MDBox
              component="img"
              src="/images/signature.svg"
              my={0}
              className="brand"
            /> */}
            <MDTypography
              fontSize="32px"
              fontWeight="regular"
              color="light"
              mt={1}
            >
              Welcome Back!
            </MDTypography>
            <MDTypography fontSize="16px" fontWeight="light" color="light">
              Login to your account
            </MDTypography>
          </MDBox>
          <MDBox pt={6} pb={2} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Username"
                  fullWidth
                  value={values.username}
                  onChange={handleChange}
                  name="username"
                  className="white-label"
                />
              </MDBox>
              <MDBox>
                <MDInput
                  type="password"
                  label="Password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  className="white-label"
                />
              </MDBox>
              <MDBox display="flex" justifyContent="end" alignItems="center">
                <MDTypography
                  component={Link}
                  href={FORGOT_PASSWORD}
                  variant="button"
                  fontWeight="regular"
                  color="light"
                  mt={1}
                  textGradient
                >
                  Forgot password?
                </MDTypography>
              </MDBox>
              {globalErrMsg !== "" && (
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  mt={3}
                >
                  <ErrorOutlineIcon
                    sx={{
                      color: "#ffffff",
                      fontSize: "20px !important",
                      margin: "0 5px",
                    }}
                  />
                  <MDTypography
                    fontSize="16px"
                    color="light"
                    sx={{ lineHeight: 1 }}
                  >
                    {globalErrMsg}
                  </MDTypography>
                </MDBox>
              )}

              <MDBox mt={8} mb={1}>
                <LoadingButton
                  variant="contained"
                  loading={loading}
                  className="loader"
                  fullWidth
                  type="submit"
                >
                  {loading ? "" : "Login"}
                </LoadingButton>
              </MDBox>
              <MDBox mt={2} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    variant="button"
                    color="light"
                    fontWeight="medium"
                    textGradient
                    sx={{ cursor: "pointer", userSelect: "none" }}
                  >
                    <Link href={SIGNUP}>Sign up</Link>
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
