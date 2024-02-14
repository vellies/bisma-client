import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "@@/components/mui/MDBox";
import MDTypography from "@@/components/mui/MDTypography";
import MDInput from "@@/components/mui/MDInput";
import { Select, MenuItem, TextField, InputAdornment } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MDButton from "@@/components/mui/MDButton";
import MuiPhoneNumber from "material-ui-phone-number";
import { profileOrganisationValidate } from "@@/helpers/validateRules";
import useForm from "@@/helpers/useForm";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { toast } from 'react-toastify';
import Spinner from "@@/components/Spinner";
import { errorCode } from "@@/utils/ServiceAPIUtil";
import 'react-toastify/dist/ReactToastify.css';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import Swal from "sweetalert2";

const initialValues = {
  _id: null,
  userType: "Organisation",
  organisationName: "",
  organisationCode: "",
  organisationType: "",
  // organisationSector: "",
  // regType: "",
  regNo: "",
  address: "",
  website: "",
  firstName: "",
  lastName: "",
  mobile: "",
  designation: "",
  email: "",
}

function OrganisationBasicInfo(): JSX.Element {

  const { errors, values, handleChange, handleSubmit, handleSelectDefault, setUpdateValue } = useForm(
    initialValues,
    handleSubmitCB,
    profileOrganisationValidate
  );
  const { updateProfile, accountProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accountProfile && accountProfile._id) {
      setUpdateValue('_id', accountProfile._id);
      setUpdateValue('firstName', accountProfile.firstName);
      setUpdateValue('lastName', accountProfile.lastName);
      setUpdateValue('email', accountProfile.email);
      setUpdateValue('mobile', accountProfile.mobile);

      setUpdateValue('address', accountProfile.address);
      setUpdateValue('organisationName', accountProfile.organisationName);
      setUpdateValue('organisationCode', accountProfile.organisationCode);
      setUpdateValue('organisationType', accountProfile.organisationType);
      // setUpdateValue('organisationSector', accountProfile.organisationSector);
      // setUpdateValue('regType', accountProfile.regType);
      setUpdateValue('regNo', accountProfile.regNo);
      setUpdateValue('website', accountProfile.website);
      setUpdateValue('designation', accountProfile.designation);

    }
  }, [accountProfile]);

  function handleSubmitCB() {
    Swal.fire({
      html: "Are you sure want to save the changes you made now?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result: any) => {
      if (result.isConfirmed) {
        setLoading(true);
        const signupValues = {
          _id: values._id,
          userType: values.userType,
          organisationName: values.organisationName,
          organisationCode: values.organisationCode,
          organisationType: values.organisationType,
          // organisationSector: values.organisationSector,
          // regType: values.regType,
          regNo: values.regNo,
          address: values.address,
          website: values.website,
          firstName: values.firstName,
          lastName: values.lastName,
          mobile: values.mobile,
          designation: values.designation,
          email: values.email,

          thumbFiles: [],
          imageAttachment: [],
          profileImageUrl: ''
        }

        updateProfile(signupValues)
          .then((res) => {
            setLoading(false);
            toast.success('Profile has been updated.');
            setUpdateValue('organisationName', values.organisationName);
          })
          .catch((err) => {
            toast.error(errorCode(err))
            setLoading(false);
          });
      } else if (result.isDenied) {

      }
    })
  }

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }} className="blur-effect">
      <MDBox p={3}>
        <MDTypography variant="h5" color="light">Basic Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDInput
              type="text"
              label="First Name"
              fullWidth
              value={values.firstName}
              onChange={handleChange}
              name="firstName"
              autoComplete="on"
              className="white-label"
            />
            {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDInput
              type="text"
              label="Last Name"
              fullWidth
              value={values.lastName}
              onChange={handleChange}
              name="lastName"
              autoComplete="on"
              className="white-label"
            />
            {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPhoneNumber
              variant="outlined"
              defaultCountry={'my'}
              onChange={(mobileNo) => setUpdateValue('mobile', mobileNo)}
              value={values.mobile}
              fullWidth
              name="mobile"
              className="white-label"
            />
            {errors.mobileNo && <span className="error-msg">{errors.mobileNo}</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
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
            {errors.designation && <span className="error-msg">{errors.designation}</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDInput
              disabled
              type="text"
              label="Email"
              fullWidth
              value={values.email}
              onChange={handleChange}
              name="email"
              autoComplete="on"
              className="white-label"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              rows={3}
              name="address"
              value={values.address}
              onChange={handleChange}
              multiline
              fullWidth
              className="white-label"
            />
            {errors.address && <span className="error-msg">{errors.address}</span>}
          </Grid>
        </Grid>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap" mt={3}>
          <MDBox ml="auto">
            <MDButton variant="gradient" color="white" size="small" disabled={loading} type="submit">
              {loading ? <Spinner /> : "Save"}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default OrganisationBasicInfo;
