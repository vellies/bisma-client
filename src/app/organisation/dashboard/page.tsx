'use client'
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import MDBox from "@@/components/mui/MDBox";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { Card, Grid } from "@mui/material";
import ComplexStatisticsCard from '@@/components/mui/ComplexStatisticsCard';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import SchoolIcon from '@mui/icons-material/School';
import ArticleIcon from '@mui/icons-material/Article';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AlarmIcon from '@mui/icons-material/Alarm';
import CountUp from "react-countup";
import MDBadge from "@@/components/mui/MDBadge";
import {
  WhatsappIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  EmailIcon
} from "react-share";
import { reportsLineChartData } from "@@/utils/data";
import { LOGIN } from "@@/utils/routeUtils";
import { canAccess } from "@@/utils/CommonUtils";
import Spinner from "@@/components/Spinner";

const DashboardPage = () => {

  const router = useRouter();
  const pathname = usePathname()
  const { getCounts, accessToken, accountProfile } = useAuth();
  const { tasks } = reportsLineChartData;
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({
    organizationCount: 0,
    individualsCount: 0,
    usersCount: 0,
    institutionsCount: 0,
    programsCount: 0,
    coursesCount: 0,
    certificatesCount: 0,
    mintedCertificatesCount: 0,
    submittedForMintingCount: 0,
    myCertificatesCount: 0,
    transactionsCount: 0,
    clients: 0
  });
  const [socialShareCount, setSocialShareCount] = useState({
    download: 0,
    facebook: 0,
    instagram: 0,
    linkedin: 0,
    twitter: 0,
    view: 0,
    whatsapp: 0,
    email: 0
  });

  useEffect(() => {
    // runOneSignal();
    getCountsData();
  }, []);

  useEffect(() => {
    if (accountProfile?._id && !canAccess(accountProfile, pathname)) router.push(LOGIN);
  }, [accountProfile]);

  const getCountsData = () => {
    setLoading(true);
    let values = {
      certificateType: 'education'
    }
    getCounts({ body: values })
      .then((res) => {
        setLoading(false);
        setCounts(res.body)
        localStorage.setItem("notificationCount", res.body.notificationCount)
        if (res.body.socialShareCount.length > 0) {
          setSocialShareCount(res.body.socialShareCount[0])
        }

      })
  };

  if (typeof accessToken === 'string' && accessToken === "") router.push(LOGIN);
  return (
    <React.Fragment>{loading ? <Spinner /> : ""}
      <MDBox mt={1.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}> <MDBox mb={1.5}> <ComplexStatisticsCard icon={<CorporateFareIcon sx={{ width: "5em", height: "5em", color: "#3949ab" }} />} title="Institutions" count={counts.institutionsCount} percentage={{ color: "success", amount: "", label: "", }} /> </MDBox> </Grid>
          <Grid item xs={12} md={6} lg={3}> <MDBox mb={1.5}> <ComplexStatisticsCard icon={<ArticleIcon sx={{ width: "5em", height: "5em", color: "#3949ab" }} />} title="Programs" count={counts.programsCount} percentage={{ color: "success", amount: "", label: "", }} /> </MDBox> </Grid>
          <Grid item xs={12} md={6} lg={3}> <MDBox mb={1.5}> <ComplexStatisticsCard icon={<SchoolIcon sx={{ width: "5em", height: "5em", color: "#3949ab" }} />} title="Courses" count={counts.coursesCount} percentage={{ color: "success", amount: "", label: "", }} /> </MDBox> </Grid>
          <Grid item xs={12} md={6} lg={3}> <MDBox mb={1.5}> <ComplexStatisticsCard icon={<WorkspacePremiumIcon sx={{ width: "5em", height: "5em", color: "#3949ab" }} />} title="Certificates" count={counts.certificatesCount} percentage={{ color: "success", amount: "", label: "", }} /> </MDBox> </Grid>
          <Grid item xs={12} md={6} lg={3}> <MDBox mb={1.5}> <ComplexStatisticsCard icon={<AddTaskIcon sx={{ width: "5em", height: "5em", color: "#3949ab" }} />} title="Minted certificates" count={counts.mintedCertificatesCount} percentage={{ color: "success", amount: "", label: "", }} /> </MDBox> </Grid>
          <Grid item xs={12} md={6} lg={3}> <MDBox mb={1.5}> <ComplexStatisticsCard icon={<AlarmIcon sx={{ width: "5em", height: "5em", color: "#3949ab" }} />} title="Submitted for minting" count={counts.submittedForMintingCount} percentage={{ color: "success", amount: "", label: "", }} /> </MDBox> </Grid>
        </Grid>
        <MDBox mt={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <Card>
                <MDBox p={3} className="insight-report" >
                  <h3 className="table-header">Activity Insights</h3>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th align="left">Name</th>
                        <th align="right">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td align="left">Total downloads</td>
                        <td align="right"><CountUp end={socialShareCount.download} duration={3} /></td>
                      </tr>
                      <tr>
                        <td align="left">Total views</td>
                        <td align="right">
                          <CountUp end={socialShareCount.view} duration={3} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </MDBox>
              </Card>
            </Grid>
            <Grid container item xs={12} lg={6}>
              <Card>
                <MDBox p={3}>
                  <h3 className="table-header">Market Reach Analytics</h3>
                  <Grid container item xs={12} spacing={3} mt={1}>
                    <Grid item xs={12} md={6} xl={4}>
                      <MDBox display="flex" alignItems="center" gap={1.5}>
                        <MDBadge badgeContent={socialShareCount.facebook} color="error" size="xs" circular>
                          <FacebookIcon size={40} round={false} color="#3949ab" />
                        </MDBadge> <p>Facebook</p>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                      <MDBox display="flex" alignItems="center" gap={1.5}>
                        <MDBadge badgeContent={socialShareCount.linkedin} color="error" size="xs" circular>
                          <LinkedinIcon size={40} round={false} color="#3949ab" />
                        </MDBadge> <p>LinkedIn</p>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                      <MDBox display="flex" alignItems="center" gap={1.5}>
                        <MDBadge badgeContent={socialShareCount.twitter} color="error" size="xs" circular>
                          <TwitterIcon size={40} round={false} color="#3949ab" />
                        </MDBadge> <p>Twitter</p>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                      <MDBox display="flex" alignItems="center" gap={1.5}>
                        <MDBadge badgeContent={socialShareCount.whatsapp} color="error" size="xs" circular>
                          <WhatsappIcon size={40} round={false} color="#3949ab" />
                        </MDBadge> <p>WhatsApp</p>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                      <MDBox display="flex" alignItems="center" gap={1.5}>
                        <MDBadge badgeContent={socialShareCount.email} color="error" size="xs" circular>
                          <EmailIcon size={40} round={false} color="#3949ab" />
                        </MDBadge> <p>Email</p>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </React.Fragment>
  )
}

export default DashboardPage;