/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React TS components
import MDBox from "@@/components/mui/MDBox";
import MDTypography from "@@/components/mui/MDTypography";
import CountUp from "react-countup";

// Declaring props types for CompleStatisticsCard
interface Props {
  color?:
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";
  title: string;
  count: number;
  percentage: {
    color:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "white";
    amount: string | number;
    label: string;
  };
  icon: ReactNode;
  [key: string]: any;
}

function ComplexStatisticsCard({
  color,
  title,
  count,
  percentage,
  icon,
  decimalPoint
}: Props): JSX.Element {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" py={2} px={2}>
        <MDBox
          variant="gradient"
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          sx={{ background: "transparent" }}
        >
          {icon}
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <MDTypography variant="h4" title={count}>
            <CountUp decimal={decimalPoint ? "." : ""} decimals={decimalPoint ? 4 : 0} end={count} duration={3} />
          </MDTypography>
        </MDBox>
      </MDBox>
      {/* <Divider />
      <MDBox pb={2} px={2}>
        <MDTypography
          component="p"
          variant="button"
          color="text"
          display="flex"
        >
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </MDTypography>
          &nbsp;{percentage.label}
        </MDTypography>
      </MDBox> */}
    </Card>
  );
}

// Declaring defualt props for ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

export default ComplexStatisticsCard;
