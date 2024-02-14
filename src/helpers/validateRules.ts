import { object, string, mixed, addMethod, ref, array, number, } from "yup";
import { validateFileExt } from "@@/utils/CommonUtils";
import { SITE_URL } from "@@/config/constant";

addMethod(mixed, "isDateValid", isDateValid);

const WEBSITE_URL =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const EXT_TYPE = ["doc", "docx", "pdf", "xlsx", "csv", "msg", "jpeg"];

function getErrorsFromValidationError(validationError: any) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors: any, error: any) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
}

function handleErrorMeg(msg: string, schema: any) {
  try {
    schema.validateSync(msg, { abortEarly: false });
    return {}
  } catch (error: any) {
    return getErrorsFromValidationError(error);
  }
}

function isDateValid(msg: string) {
  return mixed().test("isDateValid", msg, function (value: any) {
    value = parseInt(value, 10);
    if (!value || isNaN(value)) return false;
    var isValid = new Date(value).getTime() > 0;
    return isValid;
  });
}

// Validation section

// Login Validation
export function loginValidate(values: any) {
  return handleErrorMeg(values, loginSchema);
}

const loginSchema = object().shape({
  username: string().required("User name cannot be empty"),
  password: string().required("Password cannot be empty"),
});

// Forgot Password Validation
export function forgotPasswordValidate(values: any) {
  return handleErrorMeg(values, forgotPasswordSchema);
}

const forgotPasswordSchema = object().shape({
  email: string().email("Invalid e-mail").required("E-mail cannot be empty"),
});

// Reset Password Validation
export function resetPasswordValidate(values: any) {
  return handleErrorMeg(values, resetPasswordSchema);
}

const resetPasswordSchema = object().shape({
  password: string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*+-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password format incorrect"
    )
    .required("Password cannot be empty"),
  confirmPassword: string()
    .required("Confirm Password cannot be empty")
    .oneOf([ref("password")], "Passwords must match"),
});

// Signup Validation
export function signupValidate(values: any) {
  return handleErrorMeg(values, signupSchema);
}

const signupSchema = object().shape({
  firstName: mixed()
    .test("nameValidate", "First name cannot be empty", function (value) {
      if (value !== "") return true;
      return false;
    }),
  lastName: mixed()
    .test("nameValidate", " Last name cannot be empty", function (value) {
      if (value !== "") return true;
      return false;
    }),
  email: string()
    .email("Invalid email")
    .required("Email cannot be empty"),
  mobile: string()
    .test("mobileValidate", "Mobile number cannot be empty", function (value) {
      if (value !== "") return true;
      return false;
    }),
  address: mixed()
    .test("addressValidate", "Address cannot be empty", function (value) {
      if (value !== "") return true;
      return false;
    }),

  //Organisation Validation
  organisationName: mixed()
    .test("organisationNameValidate", "Organization name cannot be empty", function (value) {
      if (value !== "" || this.parent.userType === "Individual") return true;
      return false;
    }),
  organisationCode: mixed()
    .test("organisationCodeValidate", "Organization code cannot be empty", function (value) {
      if (value !== "" || this.parent.userType === "Individual") return true;
      return false;
    }),
  organisationType: mixed()
    .test("organisationTypeValidate", "Organization type cannot be empty", function (value) {
      if (value !== "" || this.parent.userType === "Individual") return true;
      return false;
    }),
  regNo: mixed()
    .test("regNoValidate", " Reg. No. cannot be empty", function (value) {
      if (value !== "" || this.parent.userType === "Individual") return true;
      return false;
    }),

  password: string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      " Password must contain at least 8 characters, which include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
    )
    .required("Password cannot be empty"),
  confirmPassword: string()
    .required("Confirm Password cannot be empty")
    .oneOf([ref("password")], "Passwords must match"),
});
// Profile Individual Validation
export function profileIndividualValidate(values: any) {
  return handleErrorMeg(values, profileIndividualSchema);
}

const profileIndividualSchema = object().shape({
  firstName: string().required("First Name cannot be empty"),
  lastName: string().required("Last Name cannot be empty"),
  email: string().email("Invalid email").required("Email cannot be empty"),
  mobile: string().required("Mobile number cannot be empty"),
  address: string().required("Address cannot be empty"),
});

// Profile Individual Validation
export function profileOrganisationValidate(values: any) {
  return handleErrorMeg(values, profileOrganisationSchema);
}

const profileOrganisationSchema = object().shape({
  firstName: string().required("First Name cannot be empty"),
  lastName: string().required("Last Name cannot be empty"),
  mobile: string().required("Mobile number cannot be empty"),
  designation: string().required("Designation cannot be empty"),
  email: string().email("Invalid email").required("E-mail cannot be empty"),
});


// Settings Reset Password Validation
export function settingsResetPasswordValidate(values: any) {
  return handleErrorMeg(values, settingsResetPasswordSchema);
}

const settingsResetPasswordSchema = object().shape({
  oldPassword: string().required("Password cannot be empty"),
  newPassword: string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password format is incorrect"
    )
    .required("Enter a new password")
    .notOneOf([ref("oldPassword")], "Must be not eqal to old password."),
  confirmPassword: string()
    .required(" Password needs to be confirmed")
    .oneOf([ref("newPassword")], "Please enter the same password."),
});


export function settingsUploadSignValidate(values: any) {
  return handleErrorMeg(values, settingsUploadSignSchema);
}

//category Validation
export function categoryValidate(values: any) {
  return handleErrorMeg(values, categorySchema);
}

const categorySchema = object().shape({
  categoryName: string().required("Please enter a valid name"),
  categoryCode: string().required("Please enter a valid code"),
});


//Product Validation
export function productValidate(values: any) {
  return handleErrorMeg(values, productSchema);
}

const productSchema = object().shape({
  name: string().required("Please enter a valid name"),
  code: string().required("Please enter a valid code"),
  categoryId: string().required("Please select category"),
  createdFrom: string().required("Please select created from"),
  expiryTo: string().required("Please select expiry to"),
  purchasedAmount: number().required()
    .positive("Must be a positive value") // Validates against negative values
    .required("Please enter a purchased Amount. The field cannot be left blank.") // Sets it as a compulsory field
    .min(1, "Hey! Your duration must be greater than or equal to 1!"), // Sets a minimum value});
  mrp: number().required()
    .positive("Must be a positive value") // Validates against negative values
    .required("Please enter a original Amount. The field cannot be left blank.") // Sets it as a compulsory field
    .min(1, "Hey! Your duration must be greater than or equal to 1!"), // Sets a minimum value});
  saleAmount: number().required()
    .positive("Must be a positive value") // Validates against negative values
    .required("Please enter a original Amount. The field cannot be left blank.") // Sets it as a compulsory field
    .min(1, "Hey! Your duration must be greater than or equal to 1!"), // Sets a minimum value});

});

const settingsUploadSignSchema = object().shape({

});

// Send email verification
export function shareEmailValidate(values: any) {
  return handleErrorMeg(values, shareEmailSchema);
}

const shareEmailSchema = object().shape({
  sendEmail: string().email("Invalid Email").required("Email cannot be empty"),
});
