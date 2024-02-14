"use client";
import React from "react";
import { useState, useEffect } from "react";
import useForm from "@@/helpers/useForm";
import { signupValidate } from "@@/helpers/validateRules";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { errorCode } from "@@/utils/ServiceAPIUtil";
import OrganisationStep1 from "@@/containers/auth/signup/OrganisationStep1";
import OrganisationStep2 from "@@/containers/auth/signup/OrganisationStep2";
import FinalStep from "@@/containers/auth/signup/FinalStep";
import EmailVerification from "@@/containers/auth/signup/EmailVerification";
import { Card, Grid } from "@mui/material";
import MDBox from "@@/components/mui/MDBox";
import MDTypography from "@@/components/mui/MDTypography";
import { string } from "yup";
import { useRouter, useParams, usePathname } from "next/navigation";
import Spinner from "@@/components/Spinner";
import { toast } from "react-toastify";

const initialValues = {
  userType: "Organisation",

  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  address: "",
  password: "",
  confirmPassword: "",

  profession: "",

  organisationName: "",
  organisationType: "",
  // organisationSector: "",
  organisationCode: "",
  // regType: "",
  regNo: "",
  website: "",
  designation: "",
};

const OrganisationSignUpPage = () => {
  const router = useRouter();
  const { token } = useParams();
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    setUpdateValue,
    handleSelectDefault,
  } = useForm(initialValues, handleSubmitCB, signupValidate);
  const { signup, isEmailExists } = useAuth();
  const [loading, setLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");
  const [currentState, setCurrentState] = useState("form");
  const [currentStep, setCurrentStep] = useState("step1");
  const [isInviteUser, setIsInviteUser] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function handleSubmitCB() {
    setLoading(true);
    let signupValues = {
      userType: values.userType,
      organisationName: values.organisationName,
      organisationCode: values.organisationCode,
      organisationType: values.organisationType,
      // organisationSector: values.organisationSector,
      // regType: values.regType,
      regNo: values.regNo,
      address: values.address,
      website: values.website,
      firstName: values.firstName,
      lastName: values.lastName,
      mobile: values.mobile,
      designation: values.designation,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    signup(signupValues)
      .then((res) => {
        setLoading(false);
        if (res._id) {
          setCurrentState("emailVerification");
          setGlobalErrMsg("");
        }
      })
      .catch((err) => {
        setGlobalErrMsg(errorCode(err));
        setLoading(false);
      });
  }

  const checkEmail = () => {
    setIsClicked(true);
    let emailSchema = string().email();
    let isValid = emailSchema.isValidSync(values.email);
    if (
      values.firstName != "" &&
      values.lastName != "" &&
      values.mobile != ""
    ) {
      if (values.email && isValid) {
        setLoading(true);
        isEmailExists({ email: values.email })
          .then((res: any) => {
            setLoading(false);
            if (res && res.length > 0) {
              if (res[0].isEmailExists) {
                toast.error("Email already exists!")
                // handleSubmit({
                //   customError: { email: "Email already exists!" },
                // });
              } else {
                setCurrentStep("step2");
              }
            }
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setCurrentStep("step2");
      }
    }
  };

  useEffect(() => {
    if (errors !== false) {
      if (values.userType === "Organisation") {
        if (
          !errors.firstName &&
          !errors.lastName &&
          !errors.email &&
          !errors.mobile &&
          currentStep === "step1"
        ) {
          checkEmail();
        } else if (
          !errors.organisationName &&
          !errors.organisationType &&
          // !errors.organisationSector &&
          // !errors.regType &&
          !errors.regNo &&
          !errors.address &&
          !errors.organisationCode &&
          currentStep === "step2"
        ) {
          setCurrentStep("stepFinal");
        }
      }
    }
  }, [errors]);

  useEffect(() => {
    if (token) {
      getUserData();
      setUpdateValue("goback", false);
    } else {
      setUpdateValue("goback", true);
    }
  }, [token]);


  const goTo = (gotoStep: string) => {
    if (gotoStep === "init") {
      setCurrentState(gotoStep);
      setCurrentStep("");
    } else {
      setCurrentStep(gotoStep);
    }
  };

  const handleNumberChange = (phoneNo: string) => {
    setUpdateValue("mobile", phoneNo);
  };
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Grid item xs={11} sm={9} md={6} lg={5} xl={3}>
        {loading ? <Spinner /> : ""}
        <Card className="form-container">
          <MDBox bgColor="transparent" textAlign="center">
            <MDBox
              component="img"
              src="/images/bisma.svg"
              my={0}
              className="brand"
            />
            <MDTypography fontSize="20px" fontWeight="light" color="light">
              Create your account
            </MDTypography>
            <MDTypography fontSize="16px" fontWeight="light" color="light">
              {currentStep === "step1"
                ? "Contact person details"
                : currentStep === "step2"
                  ? "Organisation Details"
                  : ""}
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={2}>
            <MDBox>
              {globalErrMsg !== "" && (
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <MDTypography color="error" textGradient>
                    {globalErrMsg}
                  </MDTypography>
                </MDBox>
              )}
              {currentState === "form" && (
                <div>
                  {values.userType === "Organisation" &&
                    currentStep === "step1" && (
                      <OrganisationStep1
                        errors={errors}
                        handleSubmit={handleSubmit}
                        values={values}
                        handleChange={handleChange}
                        handleSelectDefault={handleSelectDefault}
                        handleNumberChange={handleNumberChange}
                        goTo={goTo}
                      />
                    )}
                  {values.userType === "Organisation" &&
                    currentStep === "step2" && (
                      <OrganisationStep2
                        errors={errors}
                        handleSubmit={handleSubmit}
                        values={values}
                        handleChange={handleChange}
                        goTo={goTo}
                        handleNumberChange={handleNumberChange}
                        handleSelectDefault={handleSelectDefault}
                        isInviteUser={isInviteUser}
                      />
                    )}
                  {currentStep === "stepFinal" && (
                    <FinalStep
                      loading={loading}
                      errors={errors}
                      handleSubmit={handleSubmit}
                      values={values}
                      handleChange={handleChange}
                      goTo={goTo}
                    />
                  )}
                </div>
              )}
              {currentState === "emailVerification" && (
                <EmailVerification values={values} />
              )}
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OrganisationSignUpPage;
