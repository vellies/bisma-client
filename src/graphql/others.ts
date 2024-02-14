import gql from 'graphql-tag';

export const ACCOUNT_PROFILE_CHECK_QUERY = gql`
    query ($input: AccountProfileRequest) {
      getAccountProfile(input: $input) {
        responseCode
        data
      }
    }
`;

export const GET_APP_ACCESS_TOKEN_QUERY = gql`
    query($input: AppAccessTokenRequest) {
      getAppAccessToken(input: $input) {
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

export const UPDATE_LAST_LOGIN_AS = gql`
mutation ($input: UpdateLastLoginAsRequest) {
  updateLastLoginAs(input: $input) {
          responseCode
          data
      }
    }
`;

export const GET_CATEGORY_LIST_QUERY = gql`
    query($input: CategoryListRequest) {
      getCategoryList(input: $input) {
          responseCode
          data
      }
    }
`;

export const GET_DROPDOWN_CATEGORY_LIST_QUERY = gql`
    query($input: DropdownCategoryListRequest) {
      getDropdownCategoryList(input: $input) {
          responseCode
          data
      }
    }
`;

export const GET_CATEGORY_ById_QUERY = gql`
query ($input: GetCategoryByIdRequest) {
  getCategoryById(input: $input) {
          responseCode
          data
      }
    }
`;

export const CREATE_CATEGORY_MUTATION = gql`
mutation ($input: CreateCategoryRequest) {
      createCategory(input: $input) {
          responseCode
          data
      }
    }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
mutation ($input: UpdateCategoryRequest) {
      updateCategory(input: $input) {
          responseCode
          data
      }
    }
`;

export const DELETE_CATEGORY_MUTATION = gql`
mutation ($input: DeleteCategoryByIdRequest) {
  deleteCategoryById(input: $input) {
          responseCode
          data
      }
    }
`;

export const GET_PRODUCT_LIST_QUERY = gql`
    query($input: ProductListRequest) {
      getProductList(input: $input) {
          responseCode
          data
      }
    }
`;

export const GET_DROPDOWN_PRODUCT_LIST_QUERY = gql`
    query($input: DropdownProductListRequest) {
      getDropdownProductList(input: $input) {
          responseCode
          data
      }
    }
`;

export const GET_PRODUCT_ById_QUERY = gql`
query ($input: GetProductByIdRequest) {
  getProductById(input: $input) {
          responseCode
          data
      }
    }
`;

export const CREATE_PRODUCT_MUTATION = gql`
mutation ($input: CreateProductRequest) {
      createProduct(input: $input) {
          responseCode
          data
      }
    }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
mutation ($input: UpdateProductRequest) {
      updateProduct(input: $input) {
          responseCode
          data
      }
    }
`;

export const DELETE_PRODUCT_MUTATION = gql`
mutation ($input: DeleteProductByIdRequest) {
  deleteProductById(input: $input) {
          responseCode
          data
      }
    }
`;

export const GET_COUNTS_MUTATION = gql`
mutation ($input: getCountsRequest) {
  getCounts(input: $input) {
          responseCode
          data
      }
    }
`;