import {
  ApolloClient,
  InMemoryCache,
  from,
  ApolloLink,
  ApolloProvider as Provider,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { API_URL } from "@@/config/constant";
import { getToken } from "@@/utils/CommonUtils";

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: any) => ({
    headers: {
      authorization: getToken() ? getToken() : "",
      ...headers,
    },
  }));
  
  return forward(operation);
});

const uploadLink = createUploadLink({
  uri: API_URL,
  credentials: "same-origin",
});

export const client = new ApolloClient({
  link: from([authLink.concat(uploadLink)]),
  cache: new InMemoryCache(),
});

export const ApolloProvider = Provider;
