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

import React, { ReactNode } from "react";

// @mui material components
import List from "@mui/material/List";

function SidenavList({ children }: { children: ReactNode }): JSX.Element {

  return (
    <React.Fragment>
      <List
        sx={{
          px: 2,
          my: 0.3,
        }}
      >
        {children}
      </List>
    </React.Fragment>


  );
}

export default SidenavList;
