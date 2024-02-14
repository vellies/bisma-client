import Input from "@mui/material/Input";

// Material Dashboard 2 PRO React TS components
import MDBox from "@@/components/mui/MDBox";

// Declaring props types for FormField
interface Props {
  label: string;
  name: string;
  [key: string]: any;
}

function FormField({ a, name, ...rest }: Props): JSX.Element {
  return (
    <MDBox mb={1.5}>
      <Input name={name} fullWidth />
    </MDBox>
  );
}

export default FormField;
