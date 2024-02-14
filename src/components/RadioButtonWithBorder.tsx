import MDBox from "@@/components/mui/MDBox";
import MDButton from "@@/components/mui/MDButton";
import MDTypography from "@@/components/mui/MDTypography";
import Icon from "@mui/material/Icon";

interface Props {
  name: string;
  icon?: string;
}

function RadioButtonWithBorder({ name, icon }: Props): JSX.Element {
  return (
    <MDBox fullWidth>
      <MDButton variant="outlined" color="white" fullWidth>
        <MDBox
          display="flex"
          flexDirection="row"
          justifyContent="start"
          alignItems="center"
          gap={1.5}
          className="form-radio"
        >
          {icon && <Icon sx={{ color: "#ffffff" }}>{icon}</Icon>}
          <MDBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            textAlign="left"
            sx={{ height: "2.5rem" }}
          >
            <MDTypography
              color="light"
              sx={{ fontSize: "1.3rem" }}
              fontWeight="light"
            >
              {name}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDButton>
    </MDBox>
  );
}

export default RadioButtonWithBorder;
