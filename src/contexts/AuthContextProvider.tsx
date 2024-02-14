"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { getItem, setItem } from "@@/utils/CommonUtils";
import { isSuccess } from "@@/utils/ServiceAPIUtil";
import { useMutation, useApolloClient } from "@apollo/client";
import {
  LOGIN_QUERY,
  MFA_LOGIN_QUERY,
  UPDATE_LAST_LOGIN_AS,
  REFRESH_TOKEN_QUERY,
  VERIFY_TOKEN_QUERY,
  FORGOT_PASSWORD_QUERY,
  RESET_PASSWORD_QUERY,
  SETTINGS_RESET_PASSWORD_QUERY,
  PASSWORD_RESET_TOKEN_VALID_QUERY,
  EMAIL_CONFIRMATION_TOKEN_VALID_QUERY,
  EMAIL_EXISTS_QUERY
} from "@@/graphql/auth";
import {
  SIGNUP_QUERY,
  ACCOUNT_PROFILE_QUERY,
  PROFILE_UPDATE_QUERY,
  UPLOAD_SIGN_MUTATION
} from "@@/graphql/users";
import {
  GET_CATEGORY_LIST_QUERY,
  GET_DROPDOWN_CATEGORY_LIST_QUERY,
  GET_CATEGORY_ById_QUERY,
  CREATE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,

  GET_PRODUCT_LIST_QUERY,
  GET_DROPDOWN_PRODUCT_LIST_QUERY,
  GET_PRODUCT_ById_QUERY,
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,

  GET_COUNTS_MUTATION

 } from "@@/graphql/others";
import { UserAccessType, USER_TYPE } from "@@/helpers/interfaces";
import { StringMap } from "@@/helpers/interfaces";
import { useRouter } from 'next/navigation';
import { checkAndRedirectUserLogIn } from "@@/utils/CommonUtils";
import { LOGIN } from "@@/utils/routeUtils";

export interface UserState {
  userType: USER_TYPE;
  error?: Error;
  accessToken?: string;
  userAccessType: UserAccessType;
  accountProfile?: StringMap;
  refetchAccountProfile: () => Promise<any>;
  isPasswordResetTokenValid: ({ token }: { token: any }) => Promise<any>;
  isEmailConfTokenValid: ({ token }: { token: any }) => Promise<any>;
  refreshToken: (tokenData: any) => Promise<void>;
  verifyToken: (token: any) => Promise<void>;
  logout: () => Promise<void>;


  signup: (signupValues: any) => Promise<any>;
  updateProfile: (profileValues: any) => Promise<any>;
  isEmailExists: ({ email }: { email: string }) => Promise<any>;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<any>;
  forgotPassword: ({ email }: { email: string }) => Promise<any>;
  resetPassword: ({
    token,
    oldPassword,
    password,
  }: {
    token: any;
    oldPassword?: string;
    password: string;
  }) => Promise<any>;
  settingsResetPassword: ({
    _id,
    newPassword,
    oldPassword
  }: {
    _id: string;
    newPassword: string;
    oldPassword?: string;
  }) => Promise<any>;
  settingsUploadSign: (inputs: any) => Promise<any>;
  doLogin: (token: any) => Promise<void>;

  getCategoryList: (inputs: any) => Promise<any>;
  getDropdownCategoryList: (inputs: any) => Promise<any>;
  getCategoryById: (inputs: any) => Promise<any>;
  createCategory: (inputs: any) => Promise<any>;
  updateCategory: (inputs: any) => Promise<any>;
  deleteCategoryById: (inputs: any) => Promise<any>;

  getProductList: (inputs: any) => Promise<any>;
  getDropdownProductList: (inputs: any) => Promise<any>;
  getProductById: (inputs: any) => Promise<any>;
  createProduct: (inputs: any) => Promise<any>;
  updateProduct: (inputs: any) => Promise<any>;
  deleteProductById: (inputs: any) => Promise<any>;

  getCounts: (inputs: any) => Promise<any>;

}

export const initialState: UserState = {
  userType: "INIT",
  error: undefined,
  accessToken: undefined,
  accountProfile: {},
  userAccessType: "user",
  refetchAccountProfile: async () => { },
  isPasswordResetTokenValid: async () => { },
  isEmailConfTokenValid: async () => { },
  refreshToken: async () => { },
  verifyToken: async () => { },
  logout: async () => { },
  updateProfile: async () => { },
  signup: async () => { },
  login: async () => { },
  forgotPassword: async () => { },
  resetPassword: async () => { },
  settingsResetPassword: async () => { },
  settingsUploadSign: async () => { },
  isEmailExists: async () => { },
  doLogin: async () => { },

  getCategoryList: async () => { },
  getDropdownCategoryList: async () => { },
  getCategoryById: async () => { },
  createCategory: async () => { },
  updateCategory: async () => { },
  deleteCategoryById: async () => { },

  
  getProductList: async () => { },
  getDropdownProductList: async () => { },
  getProductById: async () => { },
  createProduct: async () => { },
  updateProduct: async () => { },
  deleteProductById: async () => { },

  
  getCounts: async () => { },

};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [userSignup] = useMutation(SIGNUP_QUERY);
  const [userUpdateProfile] = useMutation(PROFILE_UPDATE_QUERY);
  const [settingsUploadSign] = useMutation(UPLOAD_SIGN_MUTATION);

  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION);
  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION);
  const [deleteCategoryById] = useMutation(DELETE_CATEGORY_MUTATION);


  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);
  const [deleteProductById] = useMutation(DELETE_PRODUCT_MUTATION);

  
  const [getCounts] = useMutation(GET_COUNTS_MUTATION);

  const controlReducer = (_state: UserState, action: any): UserState => {
    switch (action.name) {
      case "LOG_IN":
        return {
          ..._state,
          userType: "LOGGED_IN",
          error: undefined,
          accessToken: action.accessToken,
          userAccessType: action.userAccessType,
          accountProfile: action.accountProfile,
        };
      case "LOG_IN_ERROR":
        return {
          ..._state,
          userType: "INIT",
          error: action.value,
        };
      case "LOG_OUT": {
        return {
          ..._state,
          userType: "NOT_LOGGED_IN",
          accessToken: "",
          userAccessType: "none",
          accountProfile: {},
          error: undefined,
        };
      }
      case "UPDATE_ACCOUNT_PROFILE": {
        return {
          ..._state,
          accountProfile: action.accountProfile,
        };
      }
      default:
        return {
          ..._state,
        };
    }
  };

  const [state, dispatch] = useReducer(controlReducer, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const authCheck = async () => {
      try {
        const tokenData = await getItem("ckToken");
        if (tokenData) {
          const tokenObj = JSON.parse(tokenData);
          await authActions.refreshToken(tokenObj.accessToken);
          // await doLogin(tokenObj);
        } else {
          dispatch({ name: "LOG_OUT" });
          // await doLogout();
        }
      } catch {
        await doLogout();
      }
    };
    authCheck();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doLogin = async (response: { accessToken: string }) => {
    const accessToken = response.accessToken;
    const payload = JSON.stringify({ accessToken });
    await setItem("ckToken", payload);
    await getAccountProfile(accessToken);
  };

  const doLogout = useCallback(async () => {
    await setItem("ckToken", "");
    router.push(LOGIN)
    await dispatch({ name: "LOG_OUT" });
    await apolloClient.resetStore();
  }, []);

  const getAccountProfile = useCallback(async (accessToken: string) => {
    const { data } = await apolloClient.query({
      query: ACCOUNT_PROFILE_QUERY,
      variables: { input: { accessToken } },
    });
    if (isSuccess("getAccountProfile", data)) {
      await dispatch({
        name: "LOG_IN",
        accessToken: accessToken,
        userAccessType: data.getAccountProfile.data[0].userRole,
        accountProfile: data.getAccountProfile.data[0],
      });
    } else {
      dispatch({ name: "LOG_OUT" });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const authActions = React.useMemo(
    () => ({
      refetchAccountProfile: async () => {
        if (state.accessToken) await getAccountProfile(state.accessToken);
      },
      login: async ({
        username,
        password
      }: {
        username: string;
        password: string;
      }) => {
        const { data } = await apolloClient.query({
          query: LOGIN_QUERY,
          variables: { input: { username, password } },
          fetchPolicy: "no-cache",
        });
        if (isSuccess("login", data)) {
          let loginRole = data.login.data[0]
          router.push(checkAndRedirectUserLogIn(data.login.data[0], "LOGIN"))
          return await doLogin(data.login.data[0]);
        } {
          throw new Error("Invalid credentials");
        }
      },

      isPasswordResetTokenValid: async ({ token }: { token: any }) => {
        const { data } = await apolloClient.query({
          query: PASSWORD_RESET_TOKEN_VALID_QUERY,
          variables: { input: { token } },
        });
        if (isSuccess("passwordResetTokenValid", data)) {
          return data.passwordResetTokenValid.data;
        }
      },
      isEmailConfTokenValid: async ({ token }: { token: any }) => {
        const { data } = await apolloClient.query({
          query: EMAIL_CONFIRMATION_TOKEN_VALID_QUERY,
          variables: { input: { token } },
        });
        if (isSuccess("emailConfTokenValid", data)) {
          return data.emailConfTokenValid.data[0];
        }
      },
      isEmailExists: async ({ email }: { email: string }) => {
        const { data } = await apolloClient.query({
          query: EMAIL_EXISTS_QUERY,
          variables: { input: { email } },
        });
        if (isSuccess("isEmailExists", data)) {
          return data.isEmailExists.data;
        }
      },

      signup: async (formValues: any) => {
        const { data } = await userSignup({
          variables: { input: formValues },
        });

        if (isSuccess("signup", data)) {
          return data.signup.data;
        }
      },

      updateProfile: async (formValues: any) => {
        const { data } = await userUpdateProfile({
          variables: { input: formValues },
        });

        if (isSuccess("updateProfile", data)) {
          return data.updateProfile.data;
        }
      },

      settingsUploadSign: async (formValues: any) => {
        const { data } = await settingsUploadSign({
          variables: { input: formValues }
        });
        if (isSuccess("settingsUploadSign", data)) {
          return data.settingsUploadSign;
        }
      },

      forgotPassword: async ({ email }: { email: string }) => {
        const { data } = await apolloClient.query({
          query: FORGOT_PASSWORD_QUERY,
          variables: { input: { email } },
          fetchPolicy: "no-cache",
        });
        if (isSuccess("forgotPassword", data)) {
          return data.forgotPassword.data;
        }
      },

      resetPassword: async ({
        token,
        oldPassword,
        password,
      }: {
        token: any;
        oldPassword?: string;
        password: string;
      }) => {
        const { data } = await apolloClient.query({
          query: RESET_PASSWORD_QUERY,
          variables: {
            input: { token, password, oldPassword: oldPassword || "" },
          },
        });
        if (isSuccess("resetPassword", data)) {
          return data.resetPassword.data;
        }
      },

      settingsResetPassword: async ({
        _id,
        newPassword,
        oldPassword,
      }: {
        _id: string;
        newPassword: string;
        oldPassword?: string;
      }) => {
        const { data } = await apolloClient.query({
          query: SETTINGS_RESET_PASSWORD_QUERY,
          variables: {
            input: { _id, newPassword, oldPassword },
          },
        });
        if (isSuccess("settingsResetPassword", data)) {
          return data.settingsResetPassword.data;
        }
      },

      refreshToken: async (accessToken: string) => {
        const { data } = await apolloClient.query({
          query: REFRESH_TOKEN_QUERY,
          variables: { input: { accessToken } },
        });
        if (isSuccess("refreshToken", data)) {
          await doLogin(data.refreshToken.data[0]);
        } else {
          authActions.logout();
        }
      },

      // verifyToken: async (token: string) => {
      //   const { data } = await apolloClient.query({
      //     query: VERIFY_TOKEN_QUERY,
      //     variables: { input: { token } },
      //   });
      //   if (isSuccess("verifyToken", data)) {
      //     await doLogin(data.verifyToken.data[0]);
      //   } else {
      //     authActions.logout();
      //   }
      // },

      verifyToken: async ({ token }: { token: any }) => {
        const { data } = await apolloClient.query({
          query: VERIFY_TOKEN_QUERY,
          variables: { input: { token } },
        });
        if (isSuccess("verifyToken", data)) {
          return data.verifyToken.data;
        }
      },

      getCategoryList: async (input: any) => {
        const { data } = await apolloClient.query({
          query: GET_CATEGORY_LIST_QUERY,
          variables: { input },
          fetchPolicy: "no-cache",
        });

        if (isSuccess("getCategoryList", data)) {
          return data.getCategoryList.data[0];
        }
      },

      getDropdownCategoryList: async (input: any) => {
        const { data } = await apolloClient.query({
          query: GET_DROPDOWN_CATEGORY_LIST_QUERY,
          variables: { input },
          fetchPolicy: "no-cache",
        });

        if (isSuccess("getDropdownCategoryList", data)) {
          return data.getDropdownCategoryList.data[0];
        }
      },
      getCategoryById: async (input: any) => {
        const { data } = await apolloClient.query({
          query: GET_CATEGORY_ById_QUERY,
          variables: { input },
          fetchPolicy: "no-cache",
        });

        if (isSuccess("getCategoryById", data)) {
          return data.getCategoryById.data[0];
        }
      },
      createCategory: async (formValues: any) => {
        const { data } = await createCategory({
          variables: { input: formValues }
        });
        if (isSuccess("createCategory", data)) {
          return data.createCategory;
        }
      },
      deleteCategoryById: async (input: any) => {
        const { data } = await apolloClient.query({
          query: DELETE_CATEGORY_MUTATION,
          variables: { input },
          fetchPolicy: "no-cache",
        });

        if (isSuccess("deleteCategoryById", data)) {
          return data.deleteCategoryById.data[0];
        }
      },
      updateCategory: async (formValues: any) => {
        const { data } = await updateCategory({
          variables: { input: formValues }
        });
        if (isSuccess("updateCategory", data)) {
          return data.updateCategory;
        } else {
          return data.updateCategory
        }

      },



      getProductList: async (input: any) => {
        const { data } = await apolloClient.query({
          query: GET_PRODUCT_LIST_QUERY,
          variables: { input },
          fetchPolicy: "no-cache",
        });

        if (isSuccess("getProductList", data)) {
          return data.getProductList.data[0];
        }
      },

      getDropdownProductList: async (input: any) => {
        const { data } = await apolloClient.query({
          query: GET_DROPDOWN_PRODUCT_LIST_QUERY,
          variables: { input },
          fetchPolicy: "no-cache",
        });

        if (isSuccess("getDropdownProductList", data)) {
          return data.getDropdownProductList.data[0];
        }
      },
      getProductById: async (input: any) => {
        const { data } = await apolloClient.query({
          query: GET_PRODUCT_ById_QUERY,
          variables: { input },
          fetchPolicy: "no-cache",
        });

        if (isSuccess("getProductById", data)) {
          return data.getProductById.data[0];
        }
      },
      createProduct: async (formValues: any) => {
        const { data } = await createProduct({
          variables: { input: formValues }
        });
        if (isSuccess("createProduct", data)) {
          return data.createProduct;
        }
      },
      deleteProductById: async (input: any) => {
        const { data } = await apolloClient.query({
          query: DELETE_PRODUCT_MUTATION,
          variables: { input },
          fetchPolicy: "no-cache",
        });

        if (isSuccess("deleteProductById", data)) {
          return data.deleteProductById.data[0];
        }
      },
      updateProduct: async (formValues: any) => {
        const { data } = await updateProduct({
          variables: { input: formValues }
        });
        if (isSuccess("updateProduct", data)) {
          return data.updateProduct;
        }
      },

      getCounts: async (formValues: any) => {
        const { data } = await getCounts({
          variables: { input: formValues }
        });
        if (isSuccess("getCounts", data)) {
          return data.getCounts.data[0];
        }
      },

      logout: async () => {
        await doLogout();
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  let authChildren = children;
  if (state.userType === "LOGGED_IN" && !state.accountProfile) {
    authChildren = null;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        ...authActions,
      }}
    >
      {authChildren}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContext");
  }
  return context;
};
