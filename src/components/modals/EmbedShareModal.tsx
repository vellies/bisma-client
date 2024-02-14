import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import MDBox from "@@/components/mui/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect } from "react";
import MDInput from "@@/components/mui/MDInput";
import MDButton from "@@/components/mui/MDButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

let inputData: Object;
interface Props {
  onClose: () => void;
  inputData: Object;
}

const embedCode = ``;
const EmbedShareModal = ({ onClose, inputData }: Props) => {
  const [tabValue, setTabValue] = useState("1");
  const [certificateImageCopy, setCertificateImageCopy] = useState(false);
  const [badgeImageCopy, setBadgeImageCopy] = useState(false);
  const [embedeCopy, setEmbedeCopy] = useState(false);
  const [inputCertificateData, setInputCertificateData] = useState({
    certificateImageUrl: '',
    badgeImageUrl: '',
    badge: false,
    ...inputData
  });
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };


  return (
    <MDBox className="embed-share-dialog nasalization">
      <DialogTitle>
        Embed Credentials{" "}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        <MDBox width="100%">
          <TabContext value={tabValue}>
            <MDBox width="fit-content">
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Embed Image" value="1" />
                <Tab label="Embed Full Page" value="2" />
              </TabList>
            </MDBox>
            <TabPanel value="1">
              {/* Badge Image */}
              {
                inputCertificateData.badge ?
                  <MDBox width="100%" mb={4}>
                    <h4>Badge Image</h4>
                    <MDBox
                      width="100%"
                      display="flex"
                      flexWrap="nowrap"
                      alignItems="center"
                      gap={3}
                      my={2}
                    >
                      <MDInput
                        type="text"
                        value={inputCertificateData?.badgeImageUrl}
                        disabled
                        fullWidth
                      />
                      <MDButton variant="outlined" color="info" onClick={() => {
                        navigator.clipboard.writeText(inputCertificateData?.badgeImageUrl)
                        setBadgeImageCopy(true)
                        setTimeout(() => { setBadgeImageCopy(false) }, 1000);
                      }}>
                        <ContentCopyIcon sx={{ mr: 1 }} /> Copy
                      </MDButton>
                    </MDBox>
                    {badgeImageCopy ? "Badge copy successfull" : ''}
                  </MDBox> : ''
              }


              {/* Certificate Image */}
              <MDBox width="100%">
                <h4>Certificate Image </h4>
                <MDBox
                  width="100%"
                  display="flex"
                  flexWrap="nowrap"
                  alignItems="center"
                  gap={3}
                  my={2}
                >
                  <MDInput
                    type="text"
                    value={inputCertificateData?.certificateImageUrl}
                    disabled
                    fullWidth
                  />
                  <MDButton variant="outlined" color="info" onClick={() => {
                    navigator.clipboard.writeText(inputCertificateData?.certificateImageUrl)
                    setCertificateImageCopy(true)
                    setTimeout(() => { setCertificateImageCopy(false) }, 1000);
                  }}>
                    <ContentCopyIcon sx={{ mr: 1 }} /> Copy
                  </MDButton>
                </MDBox>
                {certificateImageCopy ? "Certificate copy successfull" : ''}
              </MDBox>
            </TabPanel>
            <TabPanel value="2">
              {/* Embed Full Page */}
              <MDBox width="100%">
                <h4>Code</h4>
                <MDBox
                  width="100%"
                  display="flex"
                  flexWrap="nowrap"
                  alignItems="flex-start"
                  gap={3}
                  my={2}
                >
                  <MDInput multiline value={embedCode} fullWidth disabled />
                  <MDButton variant="outlined" color="info" onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="${inputCertificateData?.certificateImageUrl}" width="800" height="600" frameborder="0" allowFullScreen></iframe>`)
                    setEmbedeCopy(true)
                    setTimeout(() => { setEmbedeCopy(false) }, 1000);
                  }}>
                    <ContentCopyIcon sx={{ mr: 1 }} /> Copy
                  </MDButton>
                </MDBox>
                {embedeCopy ? "Embeded copy successfull" : ''}
              </MDBox>
            </TabPanel>
          </TabContext>
        </MDBox>
      </DialogContent>
    </MDBox>
  );
};

export default EmbedShareModal;
