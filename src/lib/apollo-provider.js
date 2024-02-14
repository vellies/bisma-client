"use client";
import { API_URL } from "@@/config/constant";
import { HttpLink, ApolloLink, from } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import {
    NextSSRApolloClient,
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { getToken } from "@@/utils/CommonUtils";

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
        headers: {
            authorization: getToken() ? getToken() : "",
            ...headers,
        },
    }));

    return forward(operation);
});

function makeClient() {
    // const httpLink = new HttpLink({
    //     uri: API_URL,
    // });
    const uploadLink = createUploadLink({
        uri: API_URL,
        credentials: "same-origin",
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: from([authLink.concat(uploadLink)]),
        // cache: new InMemoryCache(),
        // link:
        //     typeof window === "undefined"
        //         ? ApolloLink.from([
        //             new SSRMultipartLink({
        //                 stripDefer: true,
        //             }),
        //             httpLink,
        //         ])
        //         : httpLink,
    });
}

export function ApolloWrapper({ children }) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}