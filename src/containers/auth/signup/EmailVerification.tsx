import Icon from "@mui/material/Icon";
import MDBox from "@@/components/mui/MDBox";
import MDTypography from "@@/components/mui/MDTypography";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function EmailVerification(props: any): JSX.Element {
  const { values } = props;
  return (
    <MDBox p={0}>
      <MDBox mb={2} textAlign="center">
        {/* <Icon sx={{ fontSize: "7rem !important", color: "#ffffff" }}>
          check_circle
        </Icon> */}
        <CheckCircleIcon sx={{ fontSize: "6rem !important", color: "#ffffff" }} />
        {/* <MDTypography fontSize="22px" fontWeight="medium" color="light">
          Registration Successful!
        </MDTypography> */}
        <MDTypography fontSize="14px" fontWeight="regular" sx={{color: "#aaaaaa"}}>
          Please check &quot;{values.email}&quot; to verify your email and activate your account.
        </MDTypography>
        {/* <MDTypography fontWeight="regular" color="light" pt={3}>
          Email:
        </MDTypography> */}
        {/* <MDTypography fontWeight="bold" color="light">
          {values.email}
        </MDTypography> */}
      </MDBox>
    </MDBox>
  );
}

export default EmailVerification;
