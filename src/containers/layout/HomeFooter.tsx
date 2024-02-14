/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
// import { Link } from "react-router-dom";
import MDBox from "@@/components/mui/MDBox";
import Link from "next/link";

const HomeFooter = () => {
  return (
    <footer>
      <div className="page-container root-padding">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox className="footer-column">
              <h4>About Bisma</h4>
             
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox className="footer-column">
              <h4>About Bisma</h4>
              
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li>
                
                </li>
                <li>
                </li>
              </ul>
            </MDBox>
          </Grid>
        </Grid>
      </div>
      <div className="copyrights">
        <p>
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default HomeFooter;
