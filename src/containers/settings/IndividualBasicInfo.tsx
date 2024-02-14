import { useEffect, useState } from "react";
import { profileIndividualValidate } from "@@/helpers/validateRules";
import useForm from "@@/helpers/useForm";
import { useAuth } from "@@/contexts/AuthContextProvider";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "@@/components/mui/MDBox";
import MDTypography from "@@/components/mui/MDTypography";
import MDInput from "@@/components/mui/MDInput";
import MuiPhoneNumber from "material-ui-phone-number";
import MDButton from "@@/components/mui/MDButton";
import { toast } from "react-toastify";
import Spinner from "@@/components/Spinner";
import { errorCode } from "@@/utils/ServiceAPIUtil";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  _id: null,
  userType: "Individual",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  address: "",
  // profession: ""
};

function IndividualBasicInfo(): JSX.Element {
  const { errors, values, handleChange, handleSubmit, setUpdateValue } =
    useForm(initialValues, handleSubmitCB, profileIndividualValidate);
  const { updateProfile, accountProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accountProfile && accountProfile._id) {
      setUpdateValue("_id", accountProfile._id);
      setUpdateValue("firstName", accountProfile.firstName);
      setUpdateValue("lastName", accountProfile.lastName);
      setUpdateValue("email", accountProfile.email);
      setUpdateValue("mobile", accountProfile.mobile);
      // setUpdateValue("profession", accountProfile.profession);
      setUpdateValue("address", accountProfile.address);
    }
  }, [accountProfile]);

  function handleSubmitCB() {
    setLoading(true);
    const signupValues = {
      _id: values._id,
      userType: values.userType,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobile: values.mobile,
      address: values.address,
      // profession: values.profession,
      thumbFiles: [],
      imageAttachment: [],
      profileImageUrl: ''
    };

    updateProfile(signupValues)
      .then((res) => {
        setLoading(false);
        toast.success("Profile has been updated.");
      })
      .catch((err) => {
        toast.error(errorCode(err));
        setLoading(false);
      });
  }

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }} className="blur-effect">
      <MDBox p={3}>
        <MDTypography variant="h5" color="light">
          Basic Info
        </MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDInput
              type="text"
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              fullWidth
              className="white-label"
            />
            {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDInput
              type="text"
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              fullWidth
              className="white-label"
            />
            {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDInput
              disabled
              type="email"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              className="white-label"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPhoneNumber
              variant="outlined"
              defaultCountry={"my"}
              fullWidth
              name="mobile"
              value={values.mobile}
              onChange={(mobileNo) => setUpdateValue("mobile", mobileNo)}
              className="white-label"
            />
            {errors.mobile && (
              <span className="error-msg">{errors.mobile}</span>
            )}
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <MDInput
              type="text"
              label="Profession"
              name="profession"
              value={values.profession}
              onChange={handleChange}
              fullWidth
            />
          </Grid> */}
          <Grid item xs={12}>
            <MDInput
              type="text"
              label="Address"
              name="address"
              value={values.address}
              onChange={handleChange}
              fullWidth
              rows={3}
              multiline
              className="white-label"
            />
          </Grid>
        </Grid>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          flexWrap="wrap"
          mt={3}
        >
          <MDBox mr="auto">
            <MDButton
              variant="outlined"
              color="white"
              size="small"
              disabled={loading}
              type="submit"
            >
              {loading ? <Spinner /> : "Save"}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default IndividualBasicInfo;
