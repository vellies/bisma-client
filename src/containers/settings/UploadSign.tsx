import { useEffect, useState } from "react";
import { settingsUploadSignValidate } from "@@/helpers/validateRules";
import useForm from "@@/helpers/useForm";
import { useAuth } from "@@/contexts/AuthContextProvider";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MDBox from "@@/components/mui/MDBox";
import MDTypography from "@@/components/mui/MDTypography";
import MDButton from "@@/components/mui/MDButton";
import MDInput from "@@/components/mui/MDInput";

import { ToastContainer, toast } from 'react-toastify';
import Spinner from "@@/components/Spinner";
import { errorCode } from "@@/utils/ServiceAPIUtil";
import 'react-toastify/dist/ReactToastify.css';
import Dropzone from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';

const initialValues = {
  _id: null,
  thumbFiles: [],
  imageAttachment: [],
  imageUrl: ""
}

function UploadSign(): JSX.Element {
  const { errors, values, handleChange, handleSubmit, setUpdateValue, setValues } = useForm(
    initialValues,
    handleSubmitCB,
    settingsUploadSignValidate
  );
  const { settingsUploadSign, accountProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  function handleSubmitCB() {
    if (values.thumbFiles.length > 0) {
      setLoading(true);
      const inputValues = {
        ...values
      }

      settingsUploadSign({ _id: values._id, body: inputValues })
        .then(() => {
          setLoading(false);
          toast.success('Bisma has been uploaded successfully.');
        })
        .catch((err) => {
          toast.error(errorCode(err))
          setLoading(false);
        });
    } else {
      toast.warning("Please upload a valid bisma")
    }

  }

  useEffect(() => {

    if (accountProfile && accountProfile._id) {
      setUpdateValue('_id', accountProfile._id);
      if (accountProfile.signUrl != undefined && accountProfile.signUrl != "") {
        setUpdateValue('imageUrl', accountProfile.signUrl);
      }
    }
  }, [accountProfile]);

  const handleOnDrop = (files: any) => {
    setValues({
      ...values,
      imageUrl: "",
      imageAttachment: files,
      thumbFiles: files.map((file: any) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    })
  }

  const removeAuthorizedImage = () => {
    setValues({
      ...values,
      imageAttachment: [],
      thumbFiles: [],
      imageUrl: ""
    })
  }

  return (
    <Card id="change-password" className="blur-effect">
      <MDBox p={3}>
        <MDTypography variant="h5" color="light" mb={0.5}>Upload Sign</MDTypography>
        <span className="note-msg"><b>Note:</b> Preferred image size is 150px × 150px, and must be in png format.</span>
      </MDBox>
      <MDBox component="form" pb={3} px={3} onSubmit={handleSubmit}>
        <Grid container py={2}>
          <Dropzone onDrop={files => handleOnDrop(files)}
            accept={{
              'image/*': ['.png']
            }}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone-container">
                {
                  (values.thumbFiles.length > 0 || values.imageUrl != "") && (<CloseIcon className="close-btn" onClick={() => {
                    removeAuthorizedImage()
                  }} />)
                }
                <div
                  {...getRootProps({
                    className: 'dropzone',
                    onDrop: event => event.stopPropagation()
                  })}
                >
                  <input {...getInputProps()} />
                  {
                    (values._id && (values.imageUrl != "")) ?
                      <div className="dropzone.thumb" key={values.imageUrl}>
                        <div className="dropzone.thumb-inner">
                          {
                            values.imageUrl != "" ?
                              <img src={values.imageUrl} className="dropzone.thumb-img" />
                              :
                              <MDButton variant="outlined" color="default" className="sign-upload-btn"><FileUploadIcon />Upload</MDButton>
                          }

                        </div>
                      </div> :
                      <aside className={"dropzone.thumbs-container"}>
                        {
                          values.thumbFiles.length > 0 ?
                            values.thumbFiles.map((file: any) => {
                              return (
                                <div className="dropzone.thumb" key={file.name}>
                                  <div className="dropzone.thumb-inner">
                                    <img
                                      src={file.preview}
                                      className="dropzone.thumb-img"
                                      onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                    />
                                  </div>
                                </div>
                              )
                            })
                            :
                            <div className="dropzone.thumb">
                              <div className="dropzone.thumb-inner">
                                <MDButton variant="outlined" color="default" className="sign-upload-btn"><FileUploadIcon />Upload</MDButton>

                              </div>
                            </div>
                        }
                      </aside>
                  }
                </div>
              </div>
            )}
          </Dropzone>
        </Grid>
        <MDBox mr="auto" mt={3}>
          <MDButton variant="outlined" color="white" size="small" disabled={loading} type="submit">
            {loading ? <Spinner /> : "update Sign"}
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default UploadSign;