import { useState } from "react";
import MDBox from "@@/components/mui/MDBox";
import MDTypography from "@@/components/mui/MDTypography";
import MDInput from "@@/components/mui/MDInput";
import MDButton from "@@/components/mui/MDButton";
import Spinner from "@@/components/Spinner";
// import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import { LOGIN } from "@@/utils/routeUtils";

export default function FinalStep(props: any) {
  const { errors, values, handleChange, handleSubmit, goTo, loading } = props;
  const [isClicked, setIsClicked] = useState(false);
  // const navigate = useNavigate();
  const handleNext = () => {
    setIsClicked(true);
    handleSubmit();
  };
  const thisBackType = values.userType === "Organisation" ? "step2" : "step1";

  return (
    <>
      {/* <MDTypography
                variant="button"
                color="light"
                fontWeight="medium"
                onClick={() => goTo(thisBackType)}
                sx={{ cursor: "pointer", userSelect: "none" }}
            >
                Back
            </MDTypography> */}
      <MDBox>
        <MDBox mt={4} mb={2} textAlign="center">
          <MDTypography fontWeight="medium" color="light">
            {values.organisationName}
          </MDTypography>
          <MDTypography fontSize={18} fontWeight="light" color="light">
            {values.email}
          </MDTypography>
        </MDBox>

        <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password *"
            fullWidth
            value={values.password}
            onChange={handleChange}
            name="password"
            className="white-label"
          />
          {isClicked && errors.password && (
            <span className="error-msg">{errors.password}</span>
          )}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="password"
            label="Confirm Password *"
            fullWidth
            value={values.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            className="white-label"
          />
          {isClicked && errors.confirmPassword && (
            <span className="error-msg">{errors.confirmPassword}</span>
          )}
        </MDBox>
        <MDBox mt={8} width="100%">
          {/* <MDButton
            onClick={handleNext}
            variant="gradient"
            color="info"
            fullWidth
            disabled={loading}
          >
            {loading ? <Spinner /> : "Signup"}
          </MDButton> */}
          <LoadingButton
            onClick={handleNext}
            variant="contained"
            loading={loading}
            className="loader"
            fullWidth
            type="submit"
          >
            Signup
          </LoadingButton>
          <MDButton
            onClick={() => goTo(thisBackType)}
            variant="text"
            color="light"
            fullWidth
            disabled={loading}
            sx={{ marginTop: "10px" }}
          >
            Go Back
          </MDButton>
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
