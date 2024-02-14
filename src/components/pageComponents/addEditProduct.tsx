'use client'
import React from 'react'
import { useState, useEffect } from "react";
import TextEditor from "@@/components/TextEditor";
import MDBox from "@@/components/mui/MDBox";
import MDButton from "@@/components/mui/MDButton";
import MDInput from "@@/components/mui/MDInput";
import MDTypography from "@@/components/mui/MDTypography";
import { useMaterialUIController } from "@@/contexts/MuiContext";
import { Card, Divider, FormControl, Grid, InputLabel, Select } from "@mui/material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useForm from "@@/helpers/useForm";
import { productValidate } from "@@/helpers/validateRules";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { inputStatus } from "@@/utils/CommonUtils";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { errorCode } from "@@/utils/ServiceAPIUtil";
import MenuItem from '@mui/material/MenuItem';
import Dropzone from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { ORGANISATION, PRODUCT } from "@@/utils/routeUtils";
import { canAccess } from "@@/utils/CommonUtils";
import Spinner from "@@/components/Spinner";
import moment from 'moment';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const initialValues = {
  name: "",
  code: "",
  categoryId: "",
  thumbFiles: [],
  imageAttachment: [],
  imageUrl: "",
  status: 1,
  createdFrom: moment(new Date()).format('MM/DD/YYYY'),
  expiryTo: moment(new Date()).format('MM/DD/YYYY'),
  purchasedAmount: "",
  mrp: "",
  saleAmount: "",
};

const AddEditProduct = () => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [urlParamsData] = useState(searchParams.get('id'))
  const { errors, values, setValues, handleChange, handleSubmit, handleSelectDefault } = useForm(
    initialValues,
    handleSubmitCB,
    productValidate
  );
  const { getDropdownCategoryList, updateProduct, createProduct, getProductById, accountProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [onKeyDownState, setOnKeyDownState] = useState(false);
  const [inputStatusList, setInputStatusList] = useState(inputStatus)

  const [pageTitle, setPageTitle] = useState("Add");
  const [dropdownCategoryList, setDropdownCategoryList] = useState([])
  const [minStartDate, setMinStartDate] = useState<any>(new Date());
  const [maxStartDate, setMaxStartDate] = useState<any>(new Date());


  useEffect(() => {
    if (urlParamsData) {
      getSelectedProductById()
      setPageTitle("Edit");
    }
    getDropdownCategoryListData()
  }, []);

  useEffect(() => {
    if (accountProfile?._id && !canAccess(accountProfile, pathname)) router.push('/');
  }, [accountProfile]);

  function handleSubmitCB() {
    let inputValues = {
      ...values
    }
    // if ((inputValues.imageAttachment.length > 0) || (inputValues.productImageUrl)) {
    setLoading(true);
    if (urlParamsData) {
      updateProduct({ _id: urlParamsData, body: inputValues })
        .then((res: any) => {
          setLoading(false);
          if (res.responseCode === "1") {
            toast.success(res.data[0].message)
            router.push(ORGANISATION + PRODUCT)
          }
        })
        .catch((err) => {
          toast.error(errorCode(err)); setLoading(false);
          console.log("login errrorr", err);
        });
    } else {
      createProduct({ body: values })
        .then((res: any) => {
          setLoading(false);
          if (res.responseCode === "1") {
            toast.success(res.data[0].message)
            router.push(ORGANISATION + PRODUCT)
          }
        })
        .catch((err) => {
          toast.error(errorCode(err)); setLoading(false);
          console.log("login errrorr", err);
        });
    }
    // } else {
    //   toast.warning("Please upload the product image")
    // }

  }

  const getSelectedProductById = () => {
    setLoading(true);
    getProductById({ _id: urlParamsData }).
      then((res: any) => {
        setLoading(false);
        let response = res.body
        response.thumbFiles = []
        response.imageAttachment = []
        response.imageUrl = response.productImageUrl
        setValues(response);

      })
  }

  const handleOnDrop = (files: any) => {
    if (files[0].size <= 1024000) {
      setValues({
        ...values,
        imageUrl: "",
        imageAttachment: files,
        thumbFiles: files.map((file: any) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      })
    } else {
      toast.warning("Maximum file size is 1MB")
    }

  }

  const removeAuthorizedImage = () => {
    setValues({
      ...values,
      imageAttachment: [],
      thumbFiles: [],
      imageUrl: "",
      productImageUrl: ""
    })
  }

  const getDropdownCategoryListData = () => {
    setLoading(true);
    let inputs = {
      paginate: {}
    }
    getDropdownCategoryList(inputs).
      then((res) => {
        setLoading(false);
        setDropdownCategoryList(res.body)
      })
  };

  return (
    <MDBox py={3}>{loading ? <Spinner /> : ""}
      <Card>
        <MDBox p={3} component="form" role="form" onSubmit={handleSubmit}>
          <MDBox mb={1}>
            <MDTypography className="create-page-title">{pageTitle} Product</MDTypography>
          </MDBox>
          <Divider light={darkMode} />
          <Grid container spacing={3} mt={1} mb={2}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={2}>
                <MDBox mb={2}>
                  <MDInput type="text" label="Name" fullWidth
                    value={values.name}
                    onChange={handleChange}
                    onKeyDown={() => setOnKeyDownState(true)}
                    name="name"
                  />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </MDBox>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={2}>
                <MDInput type="text" label="Code" fullWidth
                  value={values.code}
                  onChange={handleChange}
                  onKeyDown={() => setOnKeyDownState(true)}
                  name="code"
                />
                {errors.code && <span className="error-msg">{errors.code}</span>}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={2}>
                <FormControl fullWidth size="medium">
                  <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                  <Select
                    onChange={(e) => { handleSelectDefault(e, 'categoryId'); setOnKeyDownState(true) }}
                    value={values.categoryId}
                    name="categoryId"
                    label="Select category"
                    fullWidth
                    sx={{ minHeight: 44.13 }}
                  >
                    {
                      dropdownCategoryList.map((k: any, v: any) => {
                        return (
                          <MenuItem key={v} value={k._id}>{k.categoryName} - {k.categoryCode}</MenuItem>
                        )
                      })
                    }
                  </Select>
                  {errors.categoryId && <span className="error-msg">{errors.categoryId}</span>}
                </FormControl>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
              <MDBox mb={2}>
                <DatePicker value={values.createdFrom}
                  onChange={(e: any) => {
                    setMinStartDate(e)
                    setValues(values => ({ ...values, "createdFrom": moment(new Date(e)).format('MM/DD/YYYY') }))
                    setOnKeyDownState(true)
                  }}
                  minDate={new Date()}
                  className="periodic-certificate-from"
                />
                {errors.createdFrom && <span className="error-msg">{errors.createdFrom}</span>}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
              <MDBox mb={2}>
                <DatePicker value={values.expiryTo}
                  onChange={(e: any) => {
                    setMinStartDate(e)
                    setValues(values => ({ ...values, "expiryTo": moment(new Date(e)).format('MM/DD/YYYY') }))
                    setOnKeyDownState(true)
                  }}
                  minDate={new Date()}
                  className="periodic-certificate-to"
                />
                {errors.expiryTo && <span className="error-msg">{errors.expiryTo}</span>}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={2}>
                <MDInput type="number" label="Purchased Amount" fullWidth
                  value={values.purchasedAmount}
                  onChange={handleChange}
                  onKeyDown={() => setOnKeyDownState(true)}
                  name="purchasedAmount"
                />
                {errors.purchasedAmount && <span className="error-msg">{errors.purchasedAmount}</span>}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={2}>
                <MDInput type="number" label="MRP" fullWidth
                  value={values.mrp}
                  onChange={handleChange}
                  onKeyDown={() => setOnKeyDownState(true)}
                  name="mrp"
                />
                {errors.mrp && <span className="error-msg">{errors.mrp}</span>}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={2}>
                <MDInput type="number" label="Sale Amount" fullWidth
                  value={values.saleAmount}
                  onChange={handleChange}
                  onKeyDown={() => setOnKeyDownState(true)}
                  name="saleAmount"
                />
                {errors.saleAmount && <span className="error-msg">{errors.saleAmount}</span>}
              </MDBox>
            </Grid>
            {
              urlParamsData ?
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth size="medium">
                      <InputLabel id="demo-simple-select-helper-label">
                        Status
                      </InputLabel>
                      <Select
                        onChange={(e) => { handleSelectDefault(e, 'status'); setOnKeyDownState(true) }}
                        value={values.status}
                        label="Status"
                        name="status"
                        fullWidth
                        sx={{ minHeight: 44.13 }}
                      >
                        {
                          inputStatusList.map((k: any, v: any) => {
                            return (
                              <MenuItem key={v} value={k.value}>{k.key}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid> : ""}
            <Grid item xs={12} md={6} lg={4}>
              <Grid container item spacing={3} xs={12} lg={8}>
                <Grid item xs={12}>
                  <Dropzone onDrop={files => { handleOnDrop(files); setOnKeyDownState(true) }}
                    accept={{
                      'image/*': ['.png']
                    }}>
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone-container test-size">
                        {
                          (values.thumbFiles.length > 0 || values.imageUrl != "") && (<CloseIcon className="close-btn" onClick={() => {
                            removeAuthorizedImage()
                            setOnKeyDownState(true)
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
                                      <div color="default" className="sign-upload-btn"><FileUploadIcon />Upload</div>
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
                                        <div color="default" className="sign-upload-btn"><FileUploadIcon />Upload</div>
                                      </div>
                                    </div>
                                }
                              </aside>
                          }
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <span className="note-msg"><b>Note:</b> Preferred image size is 150px × 150px, and in PNG format.File size is 1MB</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider light={darkMode} />
          <MDBox mt={3} mb={2} display="flex" gap={3}>
            <MDButton variant="gradient" color="info" size="large" type="submit">
              Submit
            </MDButton>
            <MDButton variant="outlined" color="secondary" size="large" onClick={() => {
              if (onKeyDownState) {
                Swal.fire({
                  html:
                    "Are you sure to cancel the changes that you made now?",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Continue'
                }).then((result) => {
                  if (result.isConfirmed) {
                    router.push(ORGANISATION + PRODUCT)
                  } else if (result.isDenied) {
                  }
                });
              } else {
                router.push(ORGANISATION + PRODUCT)
              }
            }}>
              Cancel
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  )
}

export default AddEditProduct