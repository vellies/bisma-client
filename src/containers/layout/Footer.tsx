import { Container, Grid } from "@mui/material";
import MDBox from "@@/components/mui/MDBox";
import MDTypography from "@@/components/mui/MDTypography";
// import { Link } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlayStore from "assets/images/playstore.png";
import AppStore from "assets/images/app-store.png";
import Link from "next/link";

function Footer() {
  return (
    <MDBox className="footer-container">
      <Container fixed maxWidth="xl">
        <Grid container>
          <Grid xs={12} md={6} lg={3} mb={3}>
            <MDTypography className="footer-title">Company</MDTypography>
            <ul className="footer-menu">
              <li>
                <a href="https://www.bisma.com/about/">About Us</a>
              </li>
              <li>
                <a href="/">Team</a>
              </li>
              <li>
                <a href="https://www.bisma.com/contact/">Careers</a>
              </li>
            </ul>
          </Grid>
          <Grid xs={12} md={6} lg={3} mb={3}>
            <MDTypography className="footer-title">Support</MDTypography>
            <ul className="footer-menu">
              <li>
                <a href="https://www.bisma.com/contact/">Contact Us</a>
              </li>
              <li>
                <a href="/">FAQ</a>
              </li>
            </ul>
          </Grid>
          <Grid xs={12} md={6} lg={3} mb={3}>
            <MDTypography className="footer-title">Legal</MDTypography>
            <ul className="footer-menu">
              <li>
                <a href="https://www.bisma.com/terms-of-use/">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="https://www.bisma.com/privacy-policy/">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/">White Paper (coming soon)</a>
              </li>
            </ul>
          </Grid>
          <Grid xs={12} md={6} lg={3} mb={3}>
            <MDTypography className="footer-title">Follow Us</MDTypography>
            <MDBox display="flex" gap={2} alignItems="center" width="100%">
              <MDTypography
                component={Link}
                href="https://www.facebook.com/bisma"
                className="footer-social"
              >
                <FacebookRoundedIcon />
              </MDTypography>
              <MDTypography
                component={Link}
                href="https://twitter.com/bismaofficial"
                className="footer-social"
              >
                <TwitterIcon />
              </MDTypography>
              <MDTypography
                component={Link}
                href="https://www.instagram.com/bisma/"
                className="footer-social"
              >
                <InstagramIcon />
              </MDTypography>
            </MDBox>

            {/* <MDTypography className="footer-title">Download</MDTypography>
        <MDBox className="download-btn">
          <MDTypography component={Link} to="#">
            <MDBox component="img" src={PlayStore} />
          </MDTypography>
          <MDTypography component={Link} to="#">
            <MDBox component="img" src={AppStore} />
          </MDTypography>
        </MDBox> */}
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default Footer;
