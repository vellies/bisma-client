
import { useState, useEffect } from "react";
import { DialogContent, DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "../mui/MDBox";
import DoneIcon from "@mui/icons-material/Done";
import MDAvatar from "../mui/MDAvatar";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { dateFormate,timeFormate,dateFormateWithMonth } from "@@/utils/CommonUtils";
import { useMaterialUIController } from "@@/contexts/MuiContext";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { useSearchParams } from "next/navigation";

let inputData: Object;
interface Props {
  onClose: () => void;
  inputData: Object;
}
const VerifyCredentialModal = ({ onClose, inputData }: Props) => {
  // const [inputCertificateData, setInputCertificateData] = useState({
  //   certificateImageUrl: '',
  //   courseData:inputData?.course[0],
  //   ...inputData
  // });
  const [controller] = useMaterialUIController();
  const { viewCertificateById, certificateCountUpdate } = useAuth();
  const searchParams = useSearchParams()
  const [urlParamsData] = useState(searchParams.get("id"));
  const [certificateData, setCertificateData] = useState({
    // qrcode: QrCode,
    email: "",
    enrollmentNo: "",
    firstName: "",
    lastName: "",
    mobile: "",
    instituteName: "",
    certificateImageUrl: "",
    certificateType: "",
    _id: "",
    uniqueid: '',
    createdAt:''
  });
  const [course, setCourse] = useState({
    courseCode: "",
    courseName: "",
    description: '',
    createdAt: '',
    certificateType: "",
  });
  const [issuerData, setIssuerData] = useState({
    firstName: "",
    lastName: "",
  });
  const [transactionData, setTransactionData] = useState({ createdAt: '' });

  useEffect(() => {
    if (urlParamsData) {
      getViewCertificatedata();
      // setShareUrl(window.location.href);
    }
  }, []);

  const getViewCertificatedata = () => {
    // setLoading(true);
    let inputs = { u_id: urlParamsData };
    viewCertificateById(inputs).then((res) => {
      let data = res[0].body[0];
      data.certificateImageUrl = data.otherDetails.certificateImageUrl;
      setCertificateData(data);
      if (data?.certificateType == "education") {
        setCourse(data.course[0]);
        setTransactionData(data.transaction[0])
        setIssuerData(data.issuer[0].userDetails)
      } else if (
        data?.certificateType == "doctor" ||
        data?.certificateType == "lawyer"
      ) {
        // setOtherCertificateData(data?.otherDetails?.pdfUrl);
      }
    });
  };

  return (
    <>
      <MDBox className="verify-credentials-dialog nasalization">
        <DialogTitle>
          Credential Verification{" "}
          {/* {console.log(`====`,inputCertificateData)} */}
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
        <DialogContent dividers sx={{ pt: 3, pb: 5 }}>
          {/* Credentials data */}
          <MDBox width="100%">
            <h4>1. Credential data</h4>
            <MDBox
              display="flex"
              alignItems="center"
              sx={{ gap: 2, mt: 2, mb: 3 }}
            >
              <div className="verified">
                <DoneIcon />
              </div>
              <MDBox className="font-poppins">
                {/* <p className="sub-title">{course.certificateType}</p> */}
                <h5>{course.courseCode} - {course.courseName}</h5>
              </MDBox>
            </MDBox>

            {/* Verification block */}
            {/* <MDBox
              display="flex"
              alignItems="center"
              sx={{ gap: 2, mt: 2, mb: 3 }}
            >
              <div className="verify-loader">
                <AutorenewIcon />
              </div>
              Verifying...
            </MDBox> */}
          </MDBox>

          {/* Issuer data */}
          <MDBox width="100%">
            <h4>2. Issuer</h4>
            <MDBox
              display="flex"
              alignItems="center"
              className="font-poppins"
              sx={{ gap: 2, mt: 2, mb: 3 }}
            >
              <div className="verified">
                <DoneIcon />
              </div>
              {/* <MDAvatar size="md" src="https://picsum.photos/200" /> */}
              <MDBox className="font-poppins">
                <h5>{issuerData.firstName} {issuerData.lastName}</h5>
                <p>
                  <a
                    href="mailto:issuer@issuer.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Connect to the issuer through email
                  </a>
                </p>
              </MDBox>
            </MDBox>
          </MDBox>

          {/* Blockchain record */}
          <MDBox width="100%">
            <h4>3. Blockchain record</h4>
            <MDBox
              display="flex"
              alignItems="center"
              className="font-poppins"
              sx={{ gap: 2, mt: 2, mb: 3 }}
            >
              <div className="verified">
                <DoneIcon />
              </div>
              {/* <MDAvatar size="md" src="https://picsum.photos/200" /> */}
              <MDBox>
                <h5>Credential is Blockchain Secured</h5>
                <p className="sub-title">Blockchain ID: {certificateData.uniqueid}</p>
              </MDBox>
            </MDBox>
          </MDBox>

          {/* Certificate Owner */}
          <MDBox width="100%">
            <h4>4. Certificate Owner</h4>
            <MDBox
              display="flex"
              alignItems="center"
              className="font-poppins"
              sx={{ gap: 2, mt: 2, mb: 3 }}
            >
              <div className="verified">
                <DoneIcon />
              </div>
              {/* <MDAvatar size="md" src="https://picsum.photos/200" /> */}
              <MDBox>
                <h5>{certificateData.firstName} {certificateData.lastName}</h5>
                {/* <p className="sub-title">User Since Dec 2021</p> */}
              </MDBox>
            </MDBox>
          </MDBox>

          {/* Credential Status */}
          <MDBox width="100%">
            <h4>5. Credential Status</h4>
            <MDBox
              display="flex"
              alignItems="center"
              className="font-poppins"
              sx={{ gap: 2, mt: 2, mb: 3 }}
            >
              <div className="verified">
                <DoneIcon />
              </div>
              <MDBox borderRight={2} borderColor="#cccccc" pr={2}>
                <p className="sub-title">Issued Date</p>
                <p>{dateFormateWithMonth(certificateData.createdAt)}</p>
              </MDBox>
              <MDBox>
                <p className="sub-title">Expiry Type</p>
                <p>{course.certificateType}</p>
              </MDBox>
            </MDBox>
            <MDBox className="font-poppins">
              <p className="sub-title">Full Credential History</p>
              <p>{dateFormate(transactionData.createdAt)} {timeFormate(transactionData.createdAt)} • Credential Issued</p>
              <p>{dateFormate(transactionData.createdAt)} {timeFormate(transactionData.createdAt)} • Blockchain Record Created</p>
            </MDBox>
          </MDBox>
        </DialogContent>
      </MDBox>
    </>
  );
};

export default VerifyCredentialModal;
