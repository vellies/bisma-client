import React from "react";
import { useEffect, useState } from "react";
import { settingsResetPasswordValidate } from "@@/helpers/validateRules";
import useForm from "@@/helpers/useForm";
import { useAuth } from "@@/contexts/AuthContextProvider";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MDBox from "@@/components/mui/MDBox";
import MDTypography from "@@/components/mui/MDTypography";
import MDButton from "@@/components/mui/MDButton";
import MDInput from "@@/components/mui/MDInput";

import { ToastContainer, toast } from "react-toastify";
import Spinner from "@@/components/Spinner";
import { errorCode } from "@@/utils/ServiceAPIUtil";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  _id: null,
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function ChangePassword(): JSX.Element {
  const { errors, values, handleChange, handleSubmit, setUpdateValue } =
    useForm(initialValues, handleSubmitCB, settingsResetPasswordValidate);
  const { settingsResetPassword, accountProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  function handleSubmitCB() {
    setLoading(true);
    if (values.newPassword != values.oldPassword) {
      const signupValues = {
        _id: values._id,
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      };

      settingsResetPassword(signupValues)
        .then(() => {
          setLoading(false);
          toast.success("Password has been reset.");
        })
        .catch((err) => {
          toast.error(errorCode(err));
          setLoading(false);
        });
    } else {
      toast.warning("Old password and new passwords cann't be equal.");
    }

  }

  useEffect(() => {
    if (accountProfile && accountProfile._id) {
      setUpdateValue("_id", accountProfile._id);
    }
  }, [accountProfile]);

  const passwordRequirements = [
    "Password must contain at least 8 characters that includes at least",
    "1 uppercase",
    "1 lowercase",
    "1 number and",
    "1 special character",
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <MDBox
        key={itemKey}
        component="li"
        color="text"
        fontSize="1.25rem"
        lineHeight={1}
      >
        <MDTypography
          variant="button"
          color="text"
          fontWeight="regular"
          verticalAlign="middle"
        >
          {item}
        </MDTypography>
      </MDBox>
    );
  });

  return (
    <React.Fragment>
      <Card id="change-password" className="blur-effect">
        <MDBox p={3}>
          <MDTypography variant="h5" color="light">
            Change Password
          </MDTypography>
        </MDBox>
        <MDBox component="form" pb={3} px={3} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MDInput
                type="password"
                label="Old Password"
                name="oldPassword"
                value={values.oldPassword}
                onChange={handleChange}
                fullWidth
                className="white-label"
              />
              {errors.oldPassword && (
                <span className="error-msg">{errors.oldPassword}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <MDInput
                type="password"
                label="New Password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                fullWidth
                className="white-label"
              />
              {errors.newPassword && (
                <span className="error-msg">{errors.newPassword}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <MDInput
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                fullWidth
                className="white-label"
              />
              {errors.confirmPassword && (
                <span className="error-msg">{errors.confirmPassword}</span>
              )}
            </Grid>
          </Grid>
          <MDBox mr="auto" mt={3}>
            <MDButton
              variant="outlined"
              color="white"
              size="small"
              disabled={loading}
              type="submit"
            >
              {loading ? "UPDATING..." : "update password"}
            </MDButton>
          </MDBox>
          <MDBox mt={6} mb={1}>
            <MDTypography variant="h5" color="light">
              Password requirements
            </MDTypography>
          </MDBox>
          <MDBox mb={1}>
            <MDTypography variant="body2" color="text">
              Please follow this guide for a strong password
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            flexWrap="wrap"
          >
            <MDBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
              {renderPasswordRequirements}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </React.Fragment>
  );
}

export default ChangePassword;
