import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
    query($input: LoginRequest) {
      login(input: $input) {
          responseCode
          data
      }
    }
`;

export const MFA_LOGIN_QUERY = gql`
    query($input: MfaLoginRequest) {
      mfaLogin(input: $input) {
          responseCode
          data
      }
    }
`;

export const EMAIL_CONFIRMATION_TOKEN_VALID_QUERY = gql`
  query ($input: EmailConfTokenValidRequest) {
    emailConfTokenValid(input: $input) {
      responseCode
      data
    }
  }
`;
export const EMAIL_EXISTS_QUERY = gql`
  query ($input: isEmailExistsRequest) {
    isEmailExists(input: $input) {
      responseCode
      data
    }
  }
`;

export const FORGOT_PASSWORD_QUERY = gql`
    query($input: ForgotPasswordRequest) {
      forgotPassword(input: $input) {
          responseCode
          data
      }
    }
`;

export const RESET_PASSWORD_QUERY = gql`
    query($input: ResetPasswordRequest) {
      resetPassword(input: $input) {
          responseCode
          data
      }
    }
`;

export const SETTINGS_RESET_PASSWORD_QUERY = gql`
    query($input: SettingsResetPasswordRequest) {
      settingsResetPassword(input: $input) {
          responseCode
          data
      }
    }
`;

export const PASSWORD_RESET_TOKEN_VALID_QUERY = gql`
    query($input: PasswordResetTokenValidRequest) {
      passwordResetTokenValid(input: $input) {
          responseCode
          data
      }
    }
`;

export const REFRESH_TOKEN_QUERY = gql`
    query($input: RefreshTokenRequest) {
      refreshToken(input: $input) {
          responseCode
          data
      }
    }
`;

export const VERIFY_TOKEN_QUERY = gql`
    query($input: VerifyTokenRequest) {
      verifyToken(input: $input) {
          responseCode
          data
      }
    }
`;

export const UPDATE_LAST_LOGIN_AS = gql`
mutation ($input: UpdateLastLoginAsRequest) {
  updateLastLoginAs(input: $input) {
          responseCode
          data
      }
    }
`;