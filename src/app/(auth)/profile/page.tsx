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
import { authorizedValidate } from "@@/helpers/validateRules";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { inputStatus } from "@@/utils/CommonUtils";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { errorCode } from "@@/utils/ServiceAPIUtil";
import MenuItem from '@mui/material/MenuItem';
import Dropzone from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { ORGANISATION, AUTHORIZED_BISMA } from "@@/utils/routeUtils";
import { canAccess } from "@@/utils/CommonUtils";
import Spinner from "@@/components/Spinner";


import IndividualBasicInfo from "@@/containers/settings/IndividualBasicInfo";
import OrganisationBasicInfo from "@@/containers/settings/OrganisationBasicInfo";
import ChangePassword from "@@/containers/settings/ChangePassword";
import MDAvatar from "@@/components/mui/MDAvatar";
import ProfileImg from "@@/assets/images/profile.png";

import WestIcon from '@mui/icons-material/West';
import Header from "@@/containers/layout/HomeNav";
import { Theme } from "@mui/material/styles";

const initialValues = {
    thumbFiles: []
}

const ProfilePage = () => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [urlParamsData] = useState(searchParams.get('id'))
    const { errors, values, setValues, handleChange, handleSubmit, handleSelectDefault, setUpdateValue } = useForm(
        initialValues,
        handleSubmitCB,
        authorizedValidate
    );
    const { updateProfile, accountProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [onKeyDownState, setOnKeyDownState] = useState(false);
    const [inputStatusList, setInputStatusList] = useState(inputStatus)

    const [pageTitle, setPageTitle] = useState("Add");
    const [profileImage, setProfileImage] = useState(ProfileImg);
    const [organisationName, setOrganisationName] = useState();
    const [userFullName, setUserFullName] = useState("");

    const sidenavItems = [
        { icon: "person", label: "profile", href: "profile" },
        { icon: "receipt_long", label: "basic info", href: "basic-info" },
        { icon: "lock", label: "change password", href: "change-password" },
        // { icon: "lock", label: "upload sign", href: "upload-sign" },
    ];


    useEffect(() => {
        if (accountProfile && accountProfile._id) {
            let userFullName = accountProfile.firstName + " " + accountProfile.lastName
            setUpdateValue('_id', accountProfile._id);
            setUpdateValue('firstName', accountProfile.firstName);
            setUpdateValue('lastName', accountProfile.lastName);
            setUpdateValue('email', accountProfile.email);
            setUpdateValue('mobile', accountProfile.mobile);
            setUpdateValue('address', accountProfile.address);
            setUpdateValue('userType', accountProfile.userType);
            setUpdateValue('organisationName', accountProfile.organisationName);
            setUpdateValue('organisationType', accountProfile.organisationType);
            setUpdateValue('regNo', accountProfile.regNo);
            setUpdateValue('website', accountProfile.website);
            setUpdateValue('designation', accountProfile.designation);
            setUpdateValue('profileImageUrl', accountProfile.profileImageUrl);
            setUpdateValue('imageAttachment', []);
            setUpdateValue('thumbFiles', []);
            setOrganisationName(accountProfile.organisationName)
            setUserFullName(userFullName)
        }
    }, [accountProfile]);

    function handleSubmitCB() {  }

    const handleOnDrop = (files: any) => {
        if (files[0].size <= 1024000) {

            let inputValues = {
                ...values,
                profileImageUrl: "",
                imageAttachment: files,
                thumbFiles: files.map((file: any) => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            }
            setValues({
                ...inputValues
            })

            updateProfile(inputValues)
                .then((res: any) => {
                    setLoading(false);
                    toast.success('Profile has been updated.');
                    //   let data = {
                    //     key: 'updateProfileData',
                    //     updateProfile: res?.firstName + " " + res?.lastName,
                    //     userImage: res?.profileImageUrl
                    //   }
                    //   messageService.sendMessage(data)
                })
                .catch((err: any) => {
                    toast.error(errorCode(err))
                    setLoading(false);
                });

        } else {
            toast.warning("Maximum file size is 1MB")
        }

    }

    const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
        const itemKey = `item-${key}`;

        return (
            <MDBox key={itemKey} component="li" pt={key === 0 ? 0 : 1}>
                <MDTypography
                    component="a"
                    href={`#${href}`}
                    variant="button"
                    fontWeight="regular"
                    textTransform="capitalize"
                    sx={({
                        borders: { borderRadius },
                        functions: { pxToRem },
                        palette: { light },
                        transitions,
                    }: Theme) => ({
                        display: "flex",
                        alignItems: "center",
                        borderRadius: borderRadius.md,
                        padding: `${pxToRem(10)} ${pxToRem(16)}`,
                        transition: transitions.create("background-color", {
                            easing: transitions.easing.easeInOut,
                            duration: transitions.duration.shorter,
                        }),
                        color: "#ffffff",

                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(10px)",
                        },
                    })}
                >
                    {label}
                </MDTypography>
            </MDBox>
        );
    });

    return (
        <>
            <Header />
            <Grid container justifyContent="center" pt={10}>
                <Grid container item xs={12} lg={8} spacing={3}>
                    <Grid item xs={12} lg={3}>
                        <Card
                            sx={{
                                // borderRadius: ({ borders: { borderRadius } }) =>
                                //     borderRadius.lg,
                                position: "sticky",
                                top: "1%",
                            }}
                            className="blur-effect"
                        >
                            <MDTypography onClick={() => window.history.back()} px={4} pt={3} className="cursor-pointer" sx={{ color: "#ffffff", fontSize: 14 }}> <WestIcon /> Go back</MDTypography>
                            <MDTypography component="a" onClick={() => router.push('/')} px={4} pt={3} className="cursor-pointer" sx={{ color: "#ffffff", fontSize: 14 }}> Go Home</MDTypography>
                            <MDBox
                                component="ul"
                                display="flex"
                                flexDirection="column"
                                p={2}
                                m={0}
                                sx={{ listStyle: "none" }}
                            >
                                {renderSidenavItems}
                            </MDBox>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={9}>
                        <MDBox mb={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Card id="profile" className="blur-effect">
                                        <MDBox p={2}>
                                            <Grid container spacing={3} alignItems="center">
                                                <Grid item>
                                                    <Dropzone onDrop={files => { handleOnDrop(files); setOnKeyDownState(true) }}
                                                        accept={{
                                                            'image/*': ['.png']
                                                        }}>
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div className="dropzone-container profile-pic">
                                                                <div
                                                                    {...getRootProps({
                                                                        className: 'dropzone',
                                                                        onDrop: event => event.stopPropagation()
                                                                    })}
                                                                >
                                                                    <input {...getInputProps()} />
                                                                    {
                                                                        (values._id && (values.profileImageUrl != "")) ?
                                                                            <div className="dropzone.thumb" key={values.profileImageUrl}>
                                                                                <div className="dropzone.thumb-inner">
                                                                                    {
                                                                                        values.profileImageUrl != "" ?
                                                                                            <Grid item>
                                                                                                <MDAvatar
                                                                                                    src={values.profileImageUrl}
                                                                                                    alt="profile-image"
                                                                                                    size="lg"
                                                                                                    shadow="sm"
                                                                                                    className="cursor-pointer"
                                                                                                />
                                                                                            </Grid>
                                                                                            :
                                                                                            <div color="default" className="sign-upload-btn"><FileUploadIcon />Upload</div>
                                                                                    }

                                                                                </div>
                                                                            </div> :
                                                                            <aside >
                                                                                {
                                                                                    values.thumbFiles.length > 0 ?
                                                                                        values.thumbFiles.map((file: any) => {
                                                                                            return (
                                                                                                <Grid item key={1}>
                                                                                                    <MDAvatar
                                                                                                        src={file.preview}
                                                                                                        alt="profile-image"
                                                                                                        size="lg"
                                                                                                        shadow="sm"
                                                                                                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                                                                                    />
                                                                                                </Grid>
                                                                                            )
                                                                                        })
                                                                                        :
                                                                                        <Grid item>
                                                                                        </Grid>
                                                                                }
                                                                            </aside>
                                                                    }
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Dropzone>
                                                </Grid>
                                                <Grid item>
                                                    <MDBox height="100%" mt={0.5} lineHeight={1}>
                                                        <MDTypography variant="h5" fontWeight="medium" color="light">
                                                            {accountProfile?.firstName}   {accountProfile?.lastName}
                                                        </MDTypography>
                                                        <MDTypography
                                                            variant="button"
                                                            color="text"
                                                            fontWeight="medium"
                                                        ></MDTypography>
                                                    </MDBox>
                                                </Grid>
                                            </Grid>
                                        </MDBox>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    {accountProfile?.userType === "Organisation" ? (
                                        <OrganisationBasicInfo />
                                    ) : (
                                        <IndividualBasicInfo />
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <ChangePassword />
                                </Grid>
                            </Grid>
                        </MDBox>
                    </Grid>
                </Grid>
            </Grid>
        </>

    )
}

export default ProfilePage