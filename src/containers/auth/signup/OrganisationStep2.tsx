import { useState } from "react";
import MDBox from "@@/components/mui/MDBox";
import MDButton from "@@/components/mui/MDButton";
import MDInput from "@@/components/mui/MDInput";
import MDTypography from "@@/components/mui/MDTypography";
import MuiPhoneNumber from "material-ui-phone-number";
import { useAuth } from "@@/contexts/AuthContextProvider";
import Spinner from "@@/components/Spinner";
import { string } from "yup";
// import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { Select, MenuItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Link from "next/link";
import { LOGIN, STUDENTS_SIGNUP } from "@@/utils/routeUtils";

export default function OrganisationStep2(props: any) {
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    goTo,
    handleNumberChange,
    handleSelectDefault,
    isInviteUser,
  } = props;
  // const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isEmailExists } = useAuth();

  const handleNext = () => {
    setIsClicked(true);
    let emailSchema = string().email();
    let isValid = emailSchema.isValidSync(values.email);
    if (
      values.firstName != "" &&
      values.lastName != "" &&
      values.mobile != ""
    ) {
      if (values.email && isValid) {
        setLoading(true);
        isEmailExists({ email: values.email })
          .then((res: any) => {
            setLoading(false);
            if (res && res.length > 0) {
              if (res[0].isEmailExists) {
                handleSubmit({
                  customError: { email: "Email already exists!" },
                });
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
    }
  };

  return (
    <>
      <MDBox>
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
          {isClicked && errors.organisationName && (
            <span className="error-msg">{errors.organisationName}</span>
          )}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="Organisation Code"
            fullWidth
            value={values.organisationCode}
            onChange={handleChange}
            name="organisationCode"
            autoComplete="on"
            className="white-label"
          />
          {isClicked && errors.organisationCode && (
            <span className="error-msg">{errors.organisationCode}</span>
          )}
        </MDBox>
        <MDBox mb={2}>
          <FormControl
            className="white-label"
            sx={{ width: "100%", minHeight: 44.13 }}
          >
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
            {isClicked && errors.organisationType && (
              <span className="error-msg">{errors.organisationType}</span>
            )}
          </FormControl>
        </MDBox>

        {/* <MDBox mb={2}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="organisation-sector-label">
              Organisation Sector
            </InputLabel>
            <Select
              labelId="organisation-sector-label"
              onChange={(e) => handleSelectDefault(e, "organisationSector")}
              value={values.organisationSector}
              label="Organisation Sector"
              name="organisationSector"
              sx={{ width: "100%", minHeight: 44.13 }}
              className="white-label"
            >
              <MenuItem value={"Government"}>Government</MenuItem>
              <MenuItem value={"Public"}>Public</MenuItem>
              <MenuItem value={"NGO"}>NGO</MenuItem>
              <MenuItem value={"Individual"}>Individual</MenuItem>
            </Select>
            {isClicked && errors.organisationSector && (
              <span className="error-msg">{errors.organisationSector}</span>
            )}
          </FormControl>
        </MDBox> */}

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
              <MenuItem value={"Aerospace Industry"}>
                Aerospace Industry
              </MenuItem>
              <MenuItem value={"Transport Industry"}>
                Transport Industry
              </MenuItem>
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
              <MenuItem value={"Education industry"}>
                Education industry
              </MenuItem>
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
            {isClicked && errors.regType && (
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
            className="white-label"
          />
          {isClicked && errors.regNo && (
            <span className="error-msg">{errors.regNo}</span>
          )}
        </MDBox>
        <MDBox mb={2}>
          <TextField
            label="Address"
            rows={3}
            name="address"
            value={values.address}
            onChange={handleChange}
            multiline
            className="white-label"
            fullWidth
          />
          {isClicked && errors.address && (
            <span className="error-msg">{errors.address}</span>
          )}
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
            className="white-label"
          />
        </MDBox>

        <MDBox mt={8} width="100%">
          {/* <MDButton
              onClick={handleNext}
              variant="gradient"
              color="info"
              fullWidth
            >
              {loading ? <Spinner /> : "Next"}
            </MDButton> */}
          <LoadingButton
            variant="contained"
            loading={loading}
            className="loader"
            fullWidth
            onClick={handleNext}
          >
            {loading ? "" : "Next"}
          </LoadingButton>
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
