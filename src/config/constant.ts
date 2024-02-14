// Local Environment
export const A_L_SITE_URL = "http://localhost:3000";
export const L_API_URL = "http://localhost:8080/graphql";
export const L_ONE_SIGNAL_APP_ID = "5a0214a5-db68-4c5f-9f6b-36b926f7bc9b";
export const L_ONE_SIGNAL_REST_API_KEY = "N2I4MjQyMjMtOTQ3Yy00MTc4LTg2YjEtZDc0ODljYTVhYWY5";

// Staging Environment
export const A_P_SITE_URL = "https://bisma-client-nextjs-bisma.vercel.app";
export const P_API_URL = "https://api-bisma.bisma.com/graphql";
export const P_ONE_SIGNAL_APP_ID = "0848e4f6-b81e-4596-bfe7-54e27e827705";
export const P_ONE_SIGNAL_REST_API_KEY = "ZTUwNDM4MDQtYjliYy00ZDU4LWJmMmItYWExYjBkNDJlZWJj";
export const FILE_DOMAIN = "https://bisma-bucket.s3.ap-southeast-1.amazonaws.com/"
export const STUDENT_TEMPLATE = "staging/bisma/template/Certificate_Students_List_Template.csv"
export const ONE_SIGNAL_NOTIFICATION_URL = "https://onesignal.com/api/v1/notifications"
// Staging WEB3
export const CONTRACT_ADDRESS = "0xb9c89B89a093C1526c735909dFf35e88e034C12C"
export const CONTRACT_WALLET_ADDRESS = "0x53bf35c5c56F90422695602d410233247633386A"
export const L_BSC_TEST_NETWORK_LINK = "https://testnet.bscscan.com/"

// Production Environment
// export const A_P_SITE_URL = "https://accounts.bisma.com";
// export const P_API_URL = "https://bisma.bisma.com/graphql";
// export const P_ONE_SIGNAL_APP_ID = "0848e4f6-b81e-4596-bfe7-54e27e827705";
// export const P_ONE_SIGNAL_REST_API_KEY = "ZTUwNDM4MDQtYjliYy00ZDU4LWJmMmItYWExYjBkNDJlZWJj";
// export const FILE_DOMAIN = "https://bisma-bucket.s3.ap-southeast-1.amazonaws.com/"
// export const STUDENT_TEMPLATE = "production/bisma/template/Certificate_Students_List_Template.csv"
// export const ONE_SIGNAL_NOTIFICATION_URL = "https://onesignal.com/api/v1/notifications"
//Production WEB3
// export const CONTRACT_ADDRESS = "0xb9c89B89a093C1526c735909dFf35e88e034C12C"
// export const CONTRACT_WALLET_ADDRESS = "0x53bf35c5c56F90422695602d410233247633386A"
// export const L_BSC_TEST_NETWORK_LINK = "https://testnet.bscscan.com/"

export const SITE_URL = process.env.NODE_ENV === "production" ? A_P_SITE_URL : A_L_SITE_URL;
export const API_URL = process.env.NODE_ENV === "production" ? P_API_URL : L_API_URL;
export const ONESIGNAL_APP_ID = process.env.NODE_ENV === "production" ? P_ONE_SIGNAL_APP_ID : L_ONE_SIGNAL_APP_ID;
export const ONESIGNAL_REST_API_KEY = process.env.NODE_ENV === "production" ? P_ONE_SIGNAL_REST_API_KEY : L_ONE_SIGNAL_REST_API_KEY;
export const BSC_NETWORK_LINK = process.env.NODE_ENV === "production" ? L_BSC_TEST_NETWORK_LINK : L_BSC_TEST_NETWORK_LINK;
export const JWTToken = (process.env.REACT_APP_JWTToken || "");

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_OFFSET = 0;
export const DEFAULT_PAGE_LENGTH = 10;
export const DEFAULT_COUNTRY_CODE = "my";

//S3
export const S3_REGION = "";
export const S3_BUCKET = "";
export const S3_ACCESS_KEY_ID = "";
export const S3_SECRET_ACCESS_KEY = "";
export const S3_BASE_URL = "";



