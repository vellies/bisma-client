import React from "react";
import MDBox from "@@/components/mui/MDBox";
import MDButton from "@@/components/mui/MDButton";
import MDInput from "@@/components/mui/MDInput";
import { Select, MenuItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MDTypography from "@@/components/mui/MDTypography";
// import TextareaAutosize from "@mui/base/TextareaAutosize";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import Link from "next/link";
import { LOGIN, STUDENTS_SIGNUP } from "@@/utils/routeUtils";

export default function OrganisationStep1(props: any) {
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    handleSelectDefault,
    handleNumberChange,
    isInviteUser,
    goTo,
  } = props;

  // const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleNext = () => {
    handleSubmit();
  };

  return (
    <>
      <MDBox>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="First Name"
            fullWidth
            value={values.firstName}
            onChange={handleChange}
            name="firstName"
            autoComplete="on"
            className="white-label"
            required
          />
          {errors.firstName && (
            <span className="error-msg">{errors.firstName}</span>
          )}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="Last Name"
            fullWidth
            value={values.lastName}
            onChange={handleChange}
            name="lastName"
            autoComplete="on"
            className="white-label"
            required
          />
          {errors.lastName && (
            <span className="error-msg">{errors.lastName}</span>
          )}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="Email"
            fullWidth
            value={values.email}
            onChange={handleChange}
            name="email"
            autoComplete="on"
            className="white-label"
            disabled={isInviteUser}
            required
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </MDBox>
        <MDBox mb={2}>
          <MuiPhoneNumber
            variant="outlined"
            defaultCountry={"my"}
            onChange={handleNumberChange}
            value={values.mobile}
            fullWidth
            name="mobile"
            className="white-label"
          />
          {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="Designation"
            fullWidth
            value={values.designation}
            onChange={handleChange}
            name="designation"
            autoComplete="on"
            className="white-label"
          />
        </MDBox>
        <MDBox mt={8} width="100%">
          <MDButton
            onClick={handleNext}
            variant="gradient"
            className="loader"
            fullWidth
          >
            Next
          </MDButton>
          {/* <MDButton
            onClick={() => goTo("init")}
            variant="text"
            color="light"
            fullWidth
            sx={{ marginTop: "10px" }}
          >
            Go Back
          </MDButton> */}
        </MDBox>
        <MDBox mt={2} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
            Already have an account?{" "}
            <MDTypography
              component={Link}
              href={LOGIN}
              variant="button"
              color="light"
              fontWeight="medium"
              textGradient
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              Sign in
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox textAlign="center">
          <MDTypography variant="button" color="text">
            Are you a student?{" "}
            <MDTypography
              component={Link}
              href={STUDENTS_SIGNUP}
              variant="button"
              color="light"
              fontWeight="medium"
              textGradient
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              Sign up
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </>
  );
}
