import MDBox from "@@/components/mui/MDBox";
import MDInput from "@@/components/mui/MDInput";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import MDButton from "@@/components/mui/MDButton";
import MDTypography from "@@/components/mui/MDTypography";
import Link from "next/link";
import { LOGIN, STUDENTS_SIGNUP } from "@@/utils/routeUtils";
// import { useNavigate } from "react-router-dom";

const OrganisationDetail = (props: any) => {
  // const navigate = useNavigate();
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    handleSelectDefault,
    goTo,
  } = props;

  const handleNext = () => {
    handleSubmit();
  };
  return (
    <>
      <MDBox mb={2}>
        <MDInput
          type="text"
          label="Organisation Name"
          fullWidth
          value={values.organisationName}
          onChange={handleChange}
          name="organisationName"
          autoComplete="on"
          className="white-label"
        />
        {errors.organisationName && (
          <span className="error-msg">{errors.organisationName}</span>
        )}
      </MDBox>

      <MDBox mb={2}>
        <FormControl sx={{ width: "100%", minHeight: 44.13 }}>
          <InputLabel id="org-type-label">Organisation Type</InputLabel>
          <Select
            labelId="org-type-label"
            id="org-type"
            onChange={(e) => handleSelectDefault(e, "organisationType")}
            value={values.organisationType}
            label="Organisation Type"
            name="organisationType"
            sx={{ width: "100%", minHeight: 44.13 }}
          >
            <MenuItem className="abc" value={"University"}>
              University
            </MenuItem>
            <MenuItem value={"Institute"}>Institute</MenuItem>
          </Select>
          {errors.organisationType && (
            <span className="error-msg">{errors.organisationType}</span>
          )}
        </FormControl>
      </MDBox>

      {/* <MDBox mb={2}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="reg-type-label">Registration Type</InputLabel>
          <Select
            labelId="reg-type-label"
            onChange={(e) => handleSelectDefault(e, "regType")}
            value={values.regType}
            label="Registration Type"
            name="regType"
            sx={{ minHeight: 44.13 }}
          >
            <MenuItem value={"Aerospace Industry"}>Aerospace Industry</MenuItem>
            <MenuItem value={"Transport Industry"}>Transport Industry</MenuItem>
            <MenuItem value={"Computer Industry"}>Computer Industry</MenuItem>
            <MenuItem value={"Telecommunication industry"}>
              Telecommunication industry
            </MenuItem>
            <MenuItem value={"Agriculture industry"}>
              Agriculture industry
            </MenuItem>
            <MenuItem value={"Construction industry"}>
              Construction industry
            </MenuItem>
            <MenuItem value={"Education industry"}>Education industry</MenuItem>
            <MenuItem value={"Pharmaceutical industry"}>
              Pharmaceutical industry
            </MenuItem>
            <MenuItem value={"Food industry"}>Food industry</MenuItem>
            <MenuItem value={"Health care industry"}>
              Health care industry
            </MenuItem>
            <MenuItem value={"Hospitality industry"}>
              Hospitality industry
            </MenuItem>
            <MenuItem value={"Entertainment industry"}>
              Entertainment industry
            </MenuItem>
            <MenuItem value={"News Media industry"}>
              News Media industry
            </MenuItem>
            <MenuItem value={"Energy industry"}>Energy industry</MenuItem>
            <MenuItem value={"Manufacturing industry"}>
              Manufacturing industry
            </MenuItem>
            <MenuItem value={"Music industry"}>Music industry</MenuItem>
            <MenuItem value={"Mining industry"}>Mining industry</MenuItem>
            <MenuItem value={"Worldwide web"}>Worldwide web</MenuItem>
            <MenuItem value={"Electronics Industry"}>
              Electronics Industry
            </MenuItem>
          </Select>
          {errors.regType && (
            <span className="error-msg">{errors.regType}</span>
          )}
        </FormControl>
      </MDBox> */}

      <MDBox mb={2}>
        <MDInput
          type="text"
          label="Registration Number"
          fullWidth
          value={values.regNo}
          onChange={handleChange}
          name="regNo"
          autoComplete="on"
        />
        {errors.regNo && <span className="error-msg">{errors.regNo}</span>}
      </MDBox>
      <MDBox mb={2}>
        <MDInput
          type="text"
          label="Website"
          fullWidth
          value={values.website}
          onChange={handleChange}
          name="website"
          autoComplete="on"
        />
      </MDBox>
      <MDBox mb={2}>
        <TextField
          label="Address"
          rows={3}
          name="address"
          value={values.address}
          onChange={handleChange}
          multiline
          fullWidth
        />
        {errors.address && <span className="error-msg">{errors.address}</span>}
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
        <MDButton
          onClick={() => goTo("step1")}
          variant="text"
          color="light"
          fullWidth
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
            // onClick={() => navigate("/login")}
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
    </>
  );
};

export default OrganisationDetail;
