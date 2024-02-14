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
import { categoryValidate } from "@@/helpers/validateRules";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { inputStatus } from "@@/utils/CommonUtils";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { errorCode } from "@@/utils/ServiceAPIUtil";
import MenuItem from '@mui/material/MenuItem';
import { ORGANISATION, CATEGORY } from "@@/utils/routeUtils";
import { canAccess } from "@@/utils/CommonUtils";
import Spinner from "@@/components/Spinner";

const initialValues = {
    categoryName: "",
    categoryCode: "",
    status: 1,
    description: "",
};

const AddEditCategory = () => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [urlParamsData] = useState(searchParams.get('id'))
    const { errors, values, setValues, handleChange, handleSubmit, handleSelectDefault } = useForm(
        initialValues,
        handleSubmitCB,
        categoryValidate
    );
    const { createCategory, updateCategory, getCategoryById, updateProfile, accountProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [onKeyDownState, setOnKeyDownState] = useState(false);
    const [inputStatusList, setInputStatusList] = useState(inputStatus);
    const [pageTitle, setPageTitle] = useState("Add")

    useEffect(() => {
        if (urlParamsData) {
            getSelectedCategoryById()
            setPageTitle("Edit")
        }
    }, []);
    useEffect(() => {
        if (accountProfile?._id && !canAccess(accountProfile, pathname)) router.push('/');
    }, [accountProfile]);

    function handleSubmitCB() {
        setLoading(true);
        let inputValues = {
            ...values
        }
        if (urlParamsData) {
            updateCategory({ _id: urlParamsData, body: inputValues })
                .then((res) => {
                    setLoading(false);
                    if (res.responseCode === "1") {
                        if (res.data[0].body.primary == 1) {
                            updatePrimaryUser(res)
                        } else {
                            toast.success(res.data[0].message)
                            router.push(ORGANISATION + CATEGORY)
                        }
                    }
                })
                .catch((err) => {
                    toast.error(errorCode(err)); setLoading(false);
                    console.log("login errrorr", err);
                });
        } else {
            createCategory({ body: values })
                .then((res) => {
                    setLoading(false);
                    if (res.responseCode === "1") {
                        toast.success(res.data[0].message)
                        router.push(ORGANISATION + CATEGORY)
                    }
                })
                .catch((err) => {
                    toast.error(errorCode(err)); setLoading(false);
                    console.log("login errrorr", err);
                });
        }
    }

    const updatePrimaryUser = (data: any) => {
        let userData = data.data[0].userRow
        let userDetails = data.data[0].userRow

        let userValues = {
            "_id": userData._id,
            "userType": userDetails.userType,
            "organisationName": userDetails.organisationName,
            "organisationCode": userDetails.organisationCode,
            "organisationType": userDetails.organisationType,
            "regNo": userDetails.regNo,
            "address": userDetails.address,
            "website": userDetails.website,
            "firstName": userDetails.firstName,
            "lastName": userDetails.lastName,
            "mobile": userDetails.mobile,
            "designation": userDetails.designation,
            "email": userDetails.email,
            "thumbFiles": [],
            "imageAttachment": [],
            "profileImageUrl": ""
        }

        updateProfile(userValues)
            .then((res: any) => {
                if (data.responseCode === "1") {
                    toast.success(data.data[0].message)
                    router.push(ORGANISATION + CATEGORY)
                }
            })
            .catch((err: any) => {
                toast.error(errorCode(err));
                setLoading(false);
            });
    }

    const getSelectedCategoryById = () => {
        setLoading(true);
        getCategoryById({ _id: urlParamsData }).
            then((res) => {
                setLoading(false);
                let response = res.body
                setValues(response);
            })
    }

    return (
        <MDBox py={3}>{loading ? <Spinner /> : ""}
            <Card>
                <MDBox p={3} component="form" role="form" onSubmit={handleSubmit}>
                    <MDBox mb={1}>
                        <MDTypography className="create-page-title">{pageTitle} Category</MDTypography>
                    </MDBox>
                    <Divider light={darkMode} />
                    <Grid container spacing={3} mt={1} mb={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={2}>
                                <MDInput type="text" label="Category name" fullWidth
                                    value={values.categoryName}
                                    onChange={handleChange}
                                    onKeyDown={() => setOnKeyDownState(true)}
                                    name="categoryName"
                                />
                                {errors.categoryName && <span className="error-msg">{errors.categoryName}</span>}
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={2}>
                                <MDInput type="text" label="Category Code" fullWidth
                                    value={values.categoryCode}
                                    onChange={handleChange}
                                    onKeyDown={() => setOnKeyDownState(true)}
                                    name="categoryCode"
                                />
                                {errors.categoryCode && <span className="error-msg">{errors.categoryCode}</span>}
                            </MDBox>
                        </Grid>
                        {
                            urlParamsData ? <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={2}>
                                    <FormControl fullWidth size="medium">
                                        <InputLabel id="demo-simple-select-helper-label">
                                            Status
                                        </InputLabel>
                                        <Select
                                            onChange={(e) => {
                                                handleSelectDefault(e, 'status');
                                                setOnKeyDownState(true)
                                            }}
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
                            </Grid> : ''
                        }
                        <Grid item xs={12} md={8}>
                            <TextEditor value={values.description} onChange={(e: any) => { setValues(values => ({ ...values, "description": e })) }} />
                        </Grid>
                    </Grid>
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
                                        router.push(ORGANISATION + CATEGORY)
                                    } else if (result.isDenied) {
                                    }
                                });
                            } else {
                                router.push(ORGANISATION + CATEGORY)
                            }
                        }}>
                            Cancel
                        </MDButton>
                    </MDBox>
                </MDBox>
            </Card>
        </MDBox>
    );
};

export default AddEditCategory;
