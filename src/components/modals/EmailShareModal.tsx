import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import MDBox from "@@/components/mui/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import MDInput from "@@/components/mui/MDInput";
import MDButton from "@@/components/mui/MDButton";
import { useMaterialUIController } from "@@/contexts/MuiContext";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { useState } from "react";
import { toast } from "react-toastify";
import { shareEmailValidate } from "@@/helpers/validateRules";
import useForm from "@@/helpers/useForm";
import Spinner from "@@/components/Spinner";
import { SOCIAL_KEYS } from "@@/config/constant";

interface Props {
  onClose: () => void;
  inputData: Object;
}

const initialValues = {
  sendEmail: "",
};

const EmailShareModal = ({ onClose, inputData }: Props) => {
  const [controller] = useMaterialUIController();
  const { shareCredentials, certificateCountUpdate } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    errors,
    values,
    setValues,
    handleChange,
    handleSubmit,
    handleSelectDefault,
    setUpdateValue,
  } = useForm(initialValues, handleSubmitCB, shareEmailValidate);

  function handleSubmitCB() {
    let data = {
      certificateId: inputData,
      ...values,
      url: window.location.href,
    };
    setLoading(true);
    shareCredentials({ body: data })
      .then((res) => {
        setLoading(false);
        if (res.responseCode === "1") {
          increaseCertifcateDownloadCount(SOCIAL_KEYS.email);
          onClose();
          toast.success(res.data[0].message);
        } else {
          toast.success(res[0].message);
        }
      })
      .catch((err) => {
        console.log("login errrorr", err);
      });
  }

  const increaseCertifcateDownloadCount = async (key: string) => {
    let inputValues = {
      urlParamsData: "",
      _id: inputData,
      key: key,
    };
    setLoading(true);
    certificateCountUpdate({ body: inputValues })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log("login errrorr", err);
      });
  };

  return (
    <MDBox
      className="email-share-dialog nasalization"
      component="form"
      role="form"
      onSubmit={handleSubmit}
    >
      {loading ? <Spinner /> : ""}
      <DialogTitle>
        Share Credential via Email{" "}
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
          <p>
            We will send a link to view your credential to the email addresses
            you enter.
          </p>
          {/* <p>Enter an email or a list of emails separated by commas.</p> */}
          <MDBox width="100%" my={3}>
            <MDInput
              type="text"
              label="Send To"
              fullWidth
              value={values.sendEmail}
              name="sendEmail"
              onChange={handleChange}
            />
            {errors.sendEmail && (
              <span className="error-msg">{errors.sendEmail}</span>
            )}
          </MDBox>
        </MDBox>
      </DialogContent>
      <DialogActions>
        <MDButton variant="outlined" color="info" onClick={onClose}>
          {" "}
          Cancel{" "}
        </MDButton>
        <MDButton variant="gradient" color="info" type="submit">
          {" "}
          Send{" "}
        </MDButton>
      </DialogActions>
    </MDBox>
  );
};

export default EmailShareModal;
