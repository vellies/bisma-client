import { useState } from "react";
import MDBox from "@@/components/mui/MDBox";
import MDButton from "@@/components/mui/MDButton";
import MDInput from "@@/components/mui/MDInput";
import MDTypography from "@@/components/mui/MDTypography";
import { TextField } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { useAuth } from "@@/contexts/AuthContextProvider";
// import Spinner from "components/Spinner";
import { string } from "yup";
// import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import { LOGIN } from "@@/utils/routeUtils";

export default function OrganisationPersonalDetail(props: any) {
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    handleNumberChange,
    goTo,
    isInviteUser,
  } = props;
  // const navigate = useNavigate();
  const { isEmailExists } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    let emailSchema = string().email();
    let isValid = emailSchema.isValidSync(values.email);
    if (values.email && isValid) {
      setLoading(true);
      isEmailExists({ email: values.email })
        .then((res: any) => {
          setLoading(false);
          if (res && res.length > 0) {
            if (res[0].isEmailExists) {
              handleSubmit({ customError: { email: "Email already exists!" } });
            } else {
              handleSubmit();
            }
          }
        })
        .catch(() => {
          setLoading(false);
          handleSubmit();
        });
    } else {
      handleSubmit();
    }
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
            required
            autoComplete="on"
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
            required
            autoComplete="on"
          />
          {errors.lastName && (
            <span className="error-msg">{errors.lastName}</span>
          )}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="email"
            label="Email"
            fullWidth
            value={values.email}
            onChange={handleChange}
            name="email"
            autoComplete="on"
            required
            disabled={isInviteUser}
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
          />
          {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
        </MDBox>
        <MDBox mb={2}>
          <TextField
            label="Address"
            rows={3}
            name="address"
            value={values.address}
            onChange={handleChange}
            required
            multiline
            fullWidth
          />
          {errors.address && (
            <span className="error-msg">{errors.address}</span>
          )}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="Profession"
            fullWidth
            value={values.profession}
            onChange={handleChange}
            name="profession"
            autoComplete="on"
          />
        </MDBox>
        <MDBox mt={8} width="100%">
          <LoadingButton
            variant="contained"
            loading={loading}
            className="loader"
            fullWidth
            onClick={handleNext}
          >
            {loading ? "" : "Next"}
          </LoadingButton>
          {values.goback ? (
            <MDButton
              onClick={() => goTo("init")}
              variant="text"
              color="light"
              fullWidth
              disabled={loading}
              sx={{ marginTop: "10px" }}
            >
              Go Back
            </MDButton>
          ) : (
            ""
          )}
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
      </MDBox>
    </>
  );
}
