'use client'
import React from 'react'
import { useState, useEffect } from "react";
import MDBox from "@@/components/mui/MDBox";
import MDInput from "@@/components/mui/MDInput";
import MDTypography from "@@/components/mui/MDTypography";
import {
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import MDButton from "@@/components/mui/MDButton";
import SearchIcon from "@mui/icons-material/Search";
import DataTableBodyCell from "@@/components/mui/DataTable/DataTableBodyCell";
import MDPagination from "@@/components/mui/MDPagination";
import ActionButtons from "@@/components/ActionButtons";
import { useAuth } from "@@/contexts/AuthContextProvider";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LENGTH,
} from "@@/config/constant";
import { statusView, serialNo, pageLengthList } from "@@/utils/CommonUtils";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Spinner from "@@/components/Spinner";
import { useRouter, usePathname } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { ADD, EDIT, ORGANISATION, PRODUCT, LOGIN } from "@@/utils/routeUtils";
import { canAccess } from "@@/utils/CommonUtils";
import moment from 'moment';

const ProductPage = () => {

  const router = useRouter();
  const pathname = usePathname()
  const { getProductList, deleteProductById, accessToken, accountProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showingFrom, setShowingFrom] = useState(0);
  const [showingTo, setShowingTo] = useState(0);
  const [sortKey, setSortKey] = useState("");
  const [sortType, setSortType] = useState(false);
  const [Icon, setIcon] = useState(<></>);
  const [productListCount, setProductListCount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageLength, setPageLength] = useState(DEFAULT_PAGE_LENGTH);
  const [searchKey, setSearchKey] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [defaultSearch, setDefaultSearch] = useState(false);
  const [defaultSort, setDefaultSort] = useState(false);
  const [pageLengthListData, setPageLengthListData] = useState(pageLengthList);
  const [defaultIcon, setDefaultIcon] = useState(
    <MDBox position="absolute">
      <MDBox position="absolute" top={-6} color={"secondary"} opacity={0.5}><KeyboardArrowUpSharpIcon /></MDBox>
      <MDBox position="absolute" top={0} color={"secondary"} opacity={0.5}><KeyboardArrowDownSharpIcon /></MDBox>
    </MDBox>
  );

  useEffect(() => {
    headerSorting("", "default")
  }, [pageLength]);

  useEffect(() => {
    if (accountProfile?._id && !canAccess(accountProfile, pathname)) router.push(LOGIN);
  }, [accountProfile]);

  const getProductListData = (data: any) => {
    setLoading(true);
    let inputs = {
      paginate: { ...data }
    }
    getProductList(inputs).then((res) => {
      setLoading(false);
      let showingFrom = (data.offset) + 1
      let showingTo = (data.offset) + res.body.data.length;
      setShowingFrom(showingFrom);
      setShowingTo(showingTo);
      setProductListCount(Math.ceil(res.body.totalCount / pageLength));
      setTotalCount(res.body.totalCount);
      setProductList(res.body.data);
    });
  };

  const deleteSelectedProductById = (id: any, name: any) => {
    Swal.fire({
      html:
        "Confirm to delete <br /><span class='swal-name'>" +
        name +
        "</span>?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        deleteProductById({ _id: id }).then((res) => {
          let data = {
            offset: 0,
            limit: pageLength,
            sort: { key: defaultSort, sortKey: sortKey, sortType: !sortType },
            search: { key: defaultSearch, searchKey: searchKey, searchValue: searchValue }
          }
          getProductListData(data)
          toast.success(res.message);
          setLoading(false);
        });
      } else if (result.isDenied) {
      }
    });
  };

  const headerSorting = (sortKey: any, type: String) => {
    let data = {}
    if (type === 'search') {
      setDefaultSearch(true)
      setDefaultSort(false)
      data = {
        offset: 0,
        limit: pageLength,
        sort: { key: false, sortKey: sortKey, sortType: !sortType },
        search: { key: true, searchKey: searchKey, searchValue: searchValue }
      }
    } else if (type === 'default') {
      setDefaultSearch(false)
      setDefaultSort(false)
      data = {
        offset: 0,
        limit: pageLength,
        sort: { key: false, sortKey: sortKey, sortType: !sortType },
        search: { key: false, searchKey: searchKey, searchValue: "" }
      }
    } else {
      setSortKey(sortKey)
      setSortType(!sortType)
      setDefaultSearch(false)
      setDefaultSort(true)
      setIcon(
        <MDBox position="absolute" >
          <MDBox position="absolute" top={-6} color={!sortType ? "text" : "secondary"} opacity={!sortType ? 1 : 0.5} > <KeyboardArrowUpSharpIcon /> </MDBox>
          <MDBox position="absolute" top={0} color={sortType ? "text" : "secondary"} opacity={sortType ? 1 : 0.5} > <KeyboardArrowDownSharpIcon /> </MDBox>
        </MDBox>
      )

      data = {
        offset: 0,
        limit: pageLength,
        sort: { key: true, sortKey: sortKey, sortType: !sortType },
        search: { key: false, searchKey: searchKey, searchValue: searchValue }
      }
    }
    getProductListData(data);
  }
  if (typeof accessToken === 'string' && accessToken === "") router.push(LOGIN);

  return (
    <React.Fragment>{loading ? <Spinner /> : ""}
      <MDBox py={3}>
        <MDBox mt={1.5}>
          <Card>
            <MDTypography className="table-title">Product</MDTypography>
            <MDBox p={3} display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={3} >
              <MDBox display="flex" gap={3}>
                <MDBox className="search-container">
                  <FormControl className="filter-dropdown">
                    <InputLabel id="filter-label">Filter</InputLabel>
                    <Select labelId="filter-label" id="filter" label="filter" defaultValue={searchKey} value={searchKey}
                      onChange={(e: any) => {
                        setSearchKey(e.target.value);
                      }}
                    >
                      <MenuItem key={0} value="all">All</MenuItem>
                      <MenuItem key={1} value="name">Name</MenuItem>
                      <MenuItem key={2} value="code">Code</MenuItem>
                    </Select>
                  </FormControl>
                  <MDInput type="text" name="search" placeholder="Search" className="search" value={searchValue}
                    onChange={(e: any) => {
                      setSearchValue(e.target.value);
                    }}
                    onKeyPress={(e: any) => {
                      if (e.key === 'Enter') {
                        setDefaultSearch(true); headerSorting("", "search");
                      }
                    }
                    }
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          sx={{ visibility: searchValue ? "visible" : "hidden", fontSize: ".5rem", padding: 0 }}
                          onClick={() => {
                            setSearchValue("")
                            setDefaultSearch(false);
                            headerSorting("", "default")
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      ),
                    }}
                  />
                  <MDButton variant="outlined" size="large"
                    onClick={() => {
                      setDefaultSearch(true);
                      headerSorting("", "search");
                    }}
                    className="search-icon"
                  >
                    <SearchIcon />
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDButton
                variant="gradient"
                color="info"
                size="large"
                onClick={() => router.push(ORGANISATION + PRODUCT + ADD)}
              >
                <AddIcon />
                &nbsp; Add Product
              </MDButton>
            </MDBox>
            <TableContainer sx={{ boxShadow: "none" }}>
              <Table className="custom-table">
                <MDBox component="thead">
                  <TableRow>
                    <th className="table_header"><MDBox className="table-filter">S.No</MDBox></th>
                    <th className="table_header" onClick={(e) => { headerSorting("name", ""); }} > <MDBox className="table-filter"><span>Name</span><span>{sortKey == "name" ? Icon : defaultIcon}</span></MDBox> </th>
                    <th className="table_header" onClick={(e) => { headerSorting("code", ""); }} > <MDBox className="table-filter"><span>Code</span><span>{sortKey == "code" ? Icon : defaultIcon}</span></MDBox> </th>
                    <th className="table_header"><MDBox className="table-filter">Category</MDBox></th>
                    <th className="table_header"><MDBox className="table-filter">Created From</MDBox></th>
                    <th className="table_header"><MDBox className="table-filter">Expiry To</MDBox></th>
                    <th className="table_header"><MDBox className="table-filter">Amount</MDBox></th>
                    <th className="table_header"><MDBox className="table-filter">Status</MDBox></th>
                    <th className="table_header"><MDBox className="table-filter">Action</MDBox></th>
                  </TableRow>
                </MDBox>
                <TableBody>
                  {productList.map((k: any, v: any) => {
                    return (
                      <TableRow key={v}>
                        <DataTableBodyCell>{serialNo(v, page, pageLength)} </DataTableBodyCell>
                        <DataTableBodyCell>{k.name} </DataTableBodyCell>
                        <DataTableBodyCell>{k.code} </DataTableBodyCell>
                        <DataTableBodyCell>{k.category.length > 0 ? k.category[0].categoryName : ""} </DataTableBodyCell>
                        <DataTableBodyCell>{moment(new Date(k.createdFrom)).format('MM/DD/YYYY')} </DataTableBodyCell>
                        <DataTableBodyCell>{moment(new Date(k.expiryTo)).format('MM/DD/YYYY')} </DataTableBodyCell>
                        <td>
                          <span className='amount purchase-amount'>{k.purchasedAmount} </span> -
                          <span className='amount mrp'>{k.mrp} </span> -
                          <span className='amount salemAmount'>{k.saleAmount} </span>
                        </td>
                        {/* <DataTableBodyCell><img src={k.productImageUrl} width="50px" /> </DataTableBodyCell> */}
                        <DataTableBodyCell>
                          <span className={k.status == 1 ? "active" : k.status == 2 ? "inactive" : k.status == 3 ? "deleted" : ""}>
                            {statusView(k.status)}
                          </span>
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          <MDBox display="flex" flexDirection="row" gap={3}>
                            <ActionButtons type="edit" status={k.status == 3} onClick={() => { router.push(ORGANISATION + PRODUCT + EDIT + k._id) }} />
                            <ActionButtons type="delete" status={k.status == 3} onClick={() => { deleteSelectedProductById(k._id, k.name); }} />
                          </MDBox>
                        </DataTableBodyCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {productList.length == 0 && <MDTypography className="no-data">No data</MDTypography>}
            </TableContainer>
            {
              productList.length !== 0 && (
                <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="flex-end" alignItems={{ xs: "flex-start", sm: "center" }} p={3} gap={2} >
                  <MDBox display="flex" flexDirection="row" alignItems="center" gap={1} >
                    <MDTypography variant="caption" color="secondary">Entries per page </MDTypography>
                    <Select value={pageLength}
                      onChange={(e: any) => {
                        setSearchKey("");
                        setSearchValue("");
                        setPageLength(e.target.value);
                      }}
                      size="small" fullWidth sx={{ width: "6rem", minHeight: 44.13, }}
                    >
                      {pageLengthListData.map((k: any, v: any) => {
                        return (
                          <MenuItem key={v} value={k.value} sx={{ minWidth: "1rem", maxWidth: "5rem" }} >
                            {k.key}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </MDBox>
                  <MDBox mb={{ xs: 3, sm: 0 }}> <MDTypography variant="button" color="secondary" fontWeight="regular" > Showing {showingFrom} to {showingTo} of {totalCount} entries </MDTypography> </MDBox>
                  <MDPagination variant="gradient" color="info">
                    <Stack spacing={2}>
                      <Pagination
                        count={productListCount}
                        page={page}
                        onChange={(_, page) => {
                          setPage(page);
                          let data = {
                            offset: (page - 1) * pageLength,
                            limit: pageLength,
                            sort: { key: defaultSort, sortKey: sortKey, sortType: !sortType },
                            search: { key: defaultSearch, searchKey: searchKey, searchValue: searchValue }
                          }
                          getProductListData(data)
                        }}
                      />
                    </Stack>
                  </MDPagination>
                </MDBox>
              )
            }
          </Card>
        </MDBox>
      </MDBox>
    </React.Fragment >
  )
}

export default ProductPage;