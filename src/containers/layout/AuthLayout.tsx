import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import Bisma from "assets/images/bisma.png";
import Validate from "assets/images/validate.png";
import Nft from "assets/images/NFT.png";
import Metaverse from "assets/images/Metaverse.png";
import MDBox from "@@/components/mui/MDBox";
interface Props {
  background?: "white" | "light" | "default";
  image: string;
  children: ReactNode;
}

function AuthLayout({ background, image, children }: Props): JSX.Element {
  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      sx={{ overflowX: "hidden" }}
      className="bg-gradient"
    >
      <MDBox width="100%" height="100vh" mx="auto" position="relative">
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={11} sm={9} md={6} lg={5} xl={3.3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default AuthLayout;
