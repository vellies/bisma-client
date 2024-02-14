import gql from "graphql-tag";

export const ACCOUNT_PROFILE_QUERY = gql`
  query ($input: AccountProfileRequest) {
    getAccountProfile(input: $input) {
      responseCode
      data
    }
  }
`;

export const SIGNUP_QUERY = gql`
  mutation ($input: SignupRequest) {
    signup(input: $input) {
      responseCode
      data
    }
  }
`;

export const PROFILE_UPDATE_QUERY = gql`
  mutation ($input: UpdateProfileRequest) {
    updateProfile(input: $input) {
      responseCode
      data
    }
  }
`;

export const UPDATE_ACCOUNT_PROFILE_QUERY = gql`
mutation ($input: UpdateAccountProfileRequest) {
    updateAccountProfile(input: $input) {
      responseCode
      data
    }
  }
`;

export const UPLOAD_SIGN_MUTATION = gql`
mutation ($input: UploadSignRequest) {
  uploadSignProfile(input: $input) {
          responseCode
          data
      }
    }
`;