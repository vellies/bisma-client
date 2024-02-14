export interface AccountProfile {
  id: number;
  firstName: string;
  email: string;
  phoneNumber: string;
}

export const isSuccess = (
  endpoint: string,
  payload: { [key: string]: any } | undefined | null
) => {
  return payload && payload[endpoint] && payload[endpoint].responseCode === "1";
};

export const errorCode = (err: { [key: string]: any }) => {
  let errorCode = "";
  if (err.networkError) {
    errorCode = err.networkError;
  } else if (err.graphQLErrors) {
    err.graphQLErrors.forEach((err: any) => {
      errorCode = err.message;
    });
  }
  return errorCode;
};
