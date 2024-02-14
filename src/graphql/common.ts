import gql from "graphql-tag";

export const GET_LIFECYCLE_LOGS_QUERY = gql`
  query {
    getLifecycleLogs {
      responseCode
      data
    }
  }
`;

export const GET_DATE_FROM_LOGS_QUERY = gql`
  query {
    getDateFromLogs {
      responseCode
      data
    }
  }
`;

export const GET_TOKEN_VAL_BY_MATIC_QUERY = gql`
  query ($input: GetTokenValByMaticRequest) {
    getTokenValByMatic(input: $input) {
        responseCode
        data
      }
    }
`;

export const CREATE_LIFECYCLE_LOG_MUTATION = gql`
mutation ($input: CreateLifecycleLogInput) {
  createLifecycleLog(input: $input) {
      responseCode
      data
    }
  }
`;