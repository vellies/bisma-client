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
import AddIcon from "@mui/icons-material/Add";
import { useRouter, usePathname } from "next/navigation";
import DataTableBodyCell from "@@/components/mui/DataTable/DataTableBodyCell";
import ActionButtons from "@@/components/ActionButtons";
import MDPagination from "@@/components/mui/MDPagination";
import { canAccess, toastStyle } from "@@/utils/CommonUtils";
import { useMaterialUIController } from "@@/contexts/MuiContext";
import { useAuth } from "@@/contexts/AuthContextProvider";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_OFFSET,
  DEFAULT_PAGE_LENGTH,
} from "@@/config/constant";
import { statusView, serialNo, pageLengthList } from "@@/utils/CommonUtils";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Spinner from "@@/components/Spinner";
import { ADD, EDIT, ORGANISATION, CATEGORY, LOGIN } from "@@/utils/routeUtils";

const CategoryPage = () => {
  const router = useRouter();
  const pathname = usePathname()
  const { getCategoryList, deleteCategoryById, accountProfile, accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showingFrom, setShowingFrom] = useState(0);
  const [showingTo, setShowingTo] = useState(0);
  const [sortKey, setSortKey] = useState("");
  const [sortType, setSortType] = useState(false);
  const [Icon, setIcon] = useState(<></>);
  const [categoryListCount, setCategoryListCount] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
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

  const getCategoryListData = (data: any) => {
    setLoading(true);
    let inputs = {
      paginate: { ...data }
    }
    getCategoryList(inputs).then((res: any) => {
      setLoading(false);
      let showingFrom = (data.offset) + 1
      let showingTo = (data.offset) + res.body.data.length;
      setShowingFrom(showingFrom);
      setShowingTo(showingTo);
      setCategoryListCount(Math.ceil(res.body.totalCount / pageLength));
      setTotalCount(res.body.totalCount);
      setCategoryList(res.body.data);
    });
  };

  useEffect(() => {
    if (accountProfile?._id && !canAccess(accountProfile, pathname)) router.push(LOGIN);
  }, [accountProfile]);

  const deleteSelectedCategoryById = (id: any, name: any) => {
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
        deleteCategoryById({ _id: id }).then((res: any) => {
          let data = {
            offset: 0,
            limit: pageLength,
            sort: { key: defaultSort, sortKey: sortKey, sortType: !sortType },
            search: { key: defaultSearch, searchKey: searchKey, searchValue: searchValue }
          }
          getCategoryListData(data)
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
    getCategoryListData(data);

  }
  if (typeof accessToken === 'string' && accessToken === "") router.push(LOGIN);

  return (
    <React.Fragment>
      {loading ? <Spinner /> : ""}
      <MDBox py={3}>
        <MDBox mt={1.5}>
          <Card>
            <MDTypography className="table-title">Category</MDTypography>
            <MDBox p={3} display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={3} >
              <MDBox display="flex">
                <MDBox className="search-container">
                  <FormControl className="filter-dropdown">
                    <InputLabel id="filter-label">Filter</InputLabel>
                    <Select labelId="filter-label" id="filter" label="filter" defaultValue={searchKey} value={searchKey}
                      onChange={(e: any) => {
                        setSearchKey(e.target.value);
                      }}
                    >
                      <MenuItem key={0} value="all">All</MenuItem>
                      <MenuItem key={1} value="categoryName">Name</MenuItem>
                      <MenuItem key={2} value="categoryCode">Code</MenuItem>
                      <MenuItem key={2} value="regNo">Registration No</MenuItem>
                      <MenuItem key={2} value="email">Email</MenuItem>
                      <MenuItem key={3} value="location">Location</MenuItem>
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
                onClick={() => router.push(ORGANISATION + CATEGORY + ADD)}
              >
                <AddIcon />
                &nbsp; Add Category{" "}
              </MDButton>
            </MDBox>
            <TableContainer sx={{ boxShadow: "none" }}>
              <Table className="custom-table">
                <MDBox component="thead">
                  <TableRow>
                    <th className="table_header"><MDBox className="table-filter">S.No</MDBox></th>
                    <th className="table_header" onClick={(e) => { headerSorting("categoryName", ""); }} >
                      <MDBox className="table-filter"><span>Name</span><span>{sortKey == "categoryName" ? Icon : defaultIcon}</span></MDBox>
                    </th>
                    <th className="table_header" onClick={(e) => { headerSorting("categoryCode", ""); }}  >
                      <MDBox className="table-filter"><span>Code</span><span>{sortKey == "categoryCode" ? Icon : defaultIcon}</span></MDBox>
                    </th>
                    <th className="table_header"><MDBox className="table-filter">Status</MDBox></th>
                    <th className="table_header"><MDBox className="table-filter">Action</MDBox></th>
                  </TableRow>
                </MDBox>
                <TableBody>
                  {categoryList.map((k: any, v: any) => {
                    return (
                      <TableRow key={v}>
                        <DataTableBodyCell>
                          {serialNo(v, page, pageLength)}{" "}
                        </DataTableBodyCell>
                        <DataTableBodyCell> {k.categoryName} </DataTableBodyCell>
                        <DataTableBodyCell> {k.categoryCode} </DataTableBodyCell>
                        <DataTableBodyCell> {statusView(k.status)}{" "}
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          <MDBox display="flex" flexDirection="row" gap={3}>
                            <ActionButtons type="edit" status={k.status == 3}
                              onClick={() => router.push(ORGANISATION + CATEGORY + EDIT + k._id)}
                            />
                            <ActionButtons type="delete" status={k.status == 3} onClick={() => {
                              if (k.primary == 1) {
                                toast.warning("This organisation is primary")
                              } else {
                                deleteSelectedCategoryById(k._id, k.categoryName);
                              }
                            }} />
                          </MDBox>
                        </DataTableBodyCell>
                      </TableRow>
                    );
                  })}{" "}
                </TableBody>
              </Table>
              {categoryList.length == 0 && <MDTypography className="no-data">No data</MDTypography>}
            </TableContainer>
            {
              categoryList.length !== 0 && (
                <MDBox
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  justifyContent="flex-end"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  p={3}
                  gap={2}
                >
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
                  <MDBox mb={{ xs: 3, sm: 0 }}>
                    <MDTypography
                      variant="button"
                      color="secondary"
                      fontWeight="regular"
                    >
                      Showing {showingFrom} to {showingTo} of {totalCount} entries
                    </MDTypography>
                  </MDBox>
                  <MDPagination variant="gradient" color="info">
                    <Stack spacing={2}>
                      <Pagination
                        count={categoryListCount}
                        page={page}
                        onChange={(_, page) => {
                          setPage(page);
                          let data = {
                            offset: (page - 1) * pageLength,
                            limit: pageLength,
                            sort: { key: defaultSort, sortKey: sortKey, sortType: !sortType },
                            search: { key: defaultSearch, searchKey: searchKey, searchValue: searchValue }
                          }
                          getCategoryListData(data)
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
    </React.Fragment>
  );
};

export default CategoryPage;
