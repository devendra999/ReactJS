import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Tooltip,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "../store/auth-store";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CodeIcon from "@mui/icons-material/Code";
import {
  indicatorFunction,
  ddformatString,
  reInitialStates,
  formattedCyLyDate,
  resetCustomFilter,
} from "@root/utils/globalFunction";
import { useKpiControllerCompareNewPage } from "@root/backend/backendComponents";
import dynamic from "next/dynamic";
import ButtonItem from "./ButtonItem";
import { useSelector } from "react-redux";
import { updateGlobalFilterKey } from "@root/app/layout";

const Loading = dynamic(() => import("./Loading"));
interface SummaryProps {
  modelData: any;
  locationData: any;
  userData: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Summary: React.FC<SummaryProps> = (props: any) => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const searchParams = useSearchParams();
  // const pageCode = searchParams.get("page");
  const [kpiName, setKpiName] = useState<any[]>([]);

  const currentUser = useAuthStore((state) => state.loginData)?.user;
  const [allModel, setAllModel] = useState<any>([]);
  const [allLocation, setAllLocation] = useState<any>([]);
  const [allUser, setAllUser] = useState<any>([]);
  const [columnCount, setColumnCount] = useState<number>(5);
  // const [startIndex, setStartIndex] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [paginationCount, setPaginationCount] = useState<number>(
    parseInt(props?.modelData.length % columnCount) < columnCount
      ? parseInt(props?.modelData.length / columnCount) +
          (props?.modelData.length % columnCount === 0 ? 0 : 1)
      : parseInt(props?.modelData.length / columnCount)
  );

  const {
    data: kpiDashboard,
    isLoading: loading,
    refetch: dashboardFatching,
  } = useKpiControllerCompareNewPage(
    {
      queryParams: {
        p_start_date: _globalFilter.global_filter.p_start_date,
        p_end_date: _globalFilter.global_filter.p_end_date,
        p_count: columnCount,
        p_filter:
          selectedTab == 1 ? "location" : selectedTab == 2 ? "sc" : "model",
        p_value:
          selectedTab == 1
            ? allLocation?.length > 0 && `[${allLocation}]`
            : selectedTab == 2
            ? allUser?.length > 0 && `[${allUser}]`
            : allModel?.length > 0 && `[${allModel}]`,
        p_master_page_code: _globalFilter.global_filter.p_master_page_code,
        date_unit: _globalFilter.global_filter.date_unit,
        select_year: _globalFilter.global_filter.select_year,
        p_user_id: _globalFilter.global_filter.p_user_id,
        p_brand_id: _globalFilter.global_filter.p_brand_id,
        is_compare: _globalFilter.global_filter.is_compare,
      },
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    reInitialStates();
    setKpiName([]);
  }, []);

  useEffect(() => {
    if (selectedTab == 2 && props?.userData.length > 0) {
      if (props?.userData?.length > 0) {
        const endUserIndex = Math.min(
          page > 1 ? page * columnCount - columnCount : columnCount,
          props?.userData?.length
        );
        let userArray = [];
        for (
          let i = page > 1 ? endUserIndex : 0;
          i <
          (page > 1 && endUserIndex + columnCount <= props?.userData.length
            ? endUserIndex + columnCount
            : endUserIndex + columnCount > props?.userData.length
            ? props?.userData.length
            : columnCount);
          i++
        ) {
          userArray.push("'" + props?.userData[i].label + "'");
        }
        setAllUser(userArray);
        setPaginationCount(
          parseInt(props?.userData.length / columnCount) < columnCount
            ? parseInt(props?.userData.length / columnCount) +
                (props?.userData.length % columnCount === 0 ? 0 : 1)
            : parseInt(props?.userData.length / columnCount)
        );
      }
    } else if (selectedTab == 1 && props?.locationData.length > 0) {
      if (props?.locationData?.length > 0) {
        const endLocationIndex = Math.min(
          page > 1 ? page * columnCount - columnCount : columnCount,
          props?.locationData?.length
        );
        let locationArray = [];
        for (
          let i = page > 1 ? endLocationIndex : 0;
          i <
          (page > 1 &&
          endLocationIndex + columnCount <= props?.locationData.length
            ? endLocationIndex + columnCount
            : endLocationIndex + columnCount > props?.locationData.length
            ? props?.locationData.length
            : columnCount);
          i++
        ) {
          locationArray.push("'" + props?.locationData[i].label + "'");
        }
        setAllLocation(locationArray);
        setPaginationCount(
          parseInt(props?.locationData.length % columnCount) < columnCount
            ? parseInt(props?.locationData.length / columnCount) +
                (props?.locationData.length % columnCount === 0 ? 0 : 1)
            : parseInt(props?.locationData.length / columnCount)
        );
      }
    } else {
      if (props?.modelData?.length > 0) {
        const endModelIndex = Math.min(
          page > 1 ? page * columnCount - columnCount : columnCount,
          props?.modelData?.length
        );

        let modelArray = [];
        for (
          let i = page > 1 ? endModelIndex : 0;
          i <
          (page > 1 && endModelIndex + columnCount <= props?.modelData.length
            ? endModelIndex + columnCount
            : endModelIndex + columnCount > props?.modelData.length
            ? props?.modelData.length
            : columnCount);
          i++
        ) {
          modelArray.push("'" + props?.modelData[i].label + "'");
        }
        setAllModel(modelArray);
        setPaginationCount(
          parseInt(props?.modelData.length % columnCount) < columnCount
            ? parseInt(props?.modelData.length / columnCount) +
                (props?.modelData.length % columnCount === 0 ? 0 : 1)
            : parseInt(props?.modelData.length / columnCount)
        );
      }
    }
  }, [
    props?.modelData,
    props?.locationData,
    props?.userData,
    // startIndex,
    selectedTab,
    page,
  ]);

  useEffect(() => {
    if (
      allModel?.length > 0 ||
      allLocation?.length > 0 ||
      allUser?.length > 0
    ) {
      dashboardFatching();
    }
  }, [allModel, allLocation, allUser]);

  useEffect(() => {
    setKpiName([]);
  }, [_globalFilter]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    // setStartIndex(0);
    setPage(1);
  };

  // const onPrevClick = () => {
  //   if (startIndex > 0) {
  //     setStartIndex(startIndex - columnCount);
  //   }
  // };

  // // Get currCards
  // const indexOfLastCard = currentPage * cardsPerPage;
  // const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  // const currentCards = movieCard.slice(indexOfFirstCard, indexOfLastCard);

  // // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onNextClick = (event: any, value: any) => {
    setPage(value);

    // const indexOfLastCard = value * columnCount;
    // const indexOfFirstCard = indexOfLastCard - columnCount;
    // const currentCards = props.model.slice(indexOfFirstCard, indexOfLastCard);

    // if (
    //   startIndex < props?.modelData?.length ||
    //   startIndex < props?.locationData?.length ||
    //   startIndex < props?.userData?.length
    // ) {
    //   if (startIndex > 0) {
    //     setStartIndex(startIndex - columnCount);
    //   } else {
    //     setStartIndex(startIndex + columnCount);
    //   }
    // }
  };

  const scrollTopFunction = () => {
    // Assuming you have a reference to the element with the class .compare-page
    const comparePageElement = document.querySelector(".compare-page");

    // Check if the element is found before attempting to access its properties
    if (comparePageElement) {
      // Set the scrollTop property to 0
      comparePageElement.scrollTop = 0;
    }
  };

  const compareLogic = () => {
    const allObjects = (kpiDashboard as any)?.data.flatMap(
      (item: any) => Object.values(item)[0]
    );

    // Extract distinct values for the key 'v_display_column'
    const distinctValuesSet = new Set(
      allObjects?.map(
        (item: any) =>
          item.v_kpiid +
          ":" +
          item.v_kpi_code +
          ":" +
          item.v_display_column +
          ":" +
          item.v_section_name +
          ":" +
          (item.v_master_page_id == 2 ? "sr_dashboard" : "sl_dashboard")
      )
    );

    // Convert the set to an array
    const distinctValuesArray = Array.from(distinctValuesSet);

    return distinctValuesArray;
  };

  // Call the compareLogic function and capture the result
  const resultArray = compareLogic();

  useEffect(() => {
    if (kpiName.length === 0) {
      // Prevent infinite loop
      if (resultArray.length > 0) {
        setKpiName(resultArray as any);
      }
    }
  }, [kpiName, resultArray]);

  const returnFlagComponent = (
    code: any,
    type: any,
    tooltipResult: any,
    is_indent: any
  ) => {
    switch (code) {
      case "code": {
        return (
          <Box className={is_indent === "1" ? "mx-3" : "mr-3"}>
            <Tooltip title={tooltipResult} arrow placement="right">
              <CodeIcon style={{ color: "#0000ff" }} />
            </Tooltip>
          </Box>
        );
        break;
      }
      case "red_up": {
        if (type == "arrow") {
          return (
            <Box className={is_indent === "1" ? "mx-3" : "mr-3"}>
              <Tooltip title={tooltipResult} arrow placement="right">
                <ArrowUpwardIcon style={{ color: "#ff0000" }} />
              </Tooltip>
            </Box>
          );
        } else {
          return (
            <Box className={is_indent === "1" ? "mx-3" : "mr-3"}>
              <Tooltip title={tooltipResult} arrow placement="right">
                <ThumbUpIcon style={{ color: "#ff0000" }} />
              </Tooltip>
            </Box>
          );
        }
        break;
      }
      case "red_down": {
        if (type == "arrow") {
          return (
            <Box className={is_indent === "1" ? "mx-3" : "mr-3"}>
              <Tooltip title={tooltipResult} arrow placement="right">
                <ArrowDownwardIcon style={{ color: "#ff0000" }} />
              </Tooltip>
            </Box>
          );
        } else {
          return (
            <Box className={is_indent === "1" ? "mx-3" : "mr-3"}>
              <Tooltip title={tooltipResult} arrow placement="right">
                <ThumbDownIcon style={{ color: "#ff0000" }} />
              </Tooltip>
            </Box>
          );
        }
        break;
      }
      case "green_up": {
        if (type == "arrow") {
          return (
            <Box className={is_indent === "1" ? "mx-3" : "mr-3"}>
              <Tooltip title={tooltipResult} arrow placement="right">
                <ArrowUpwardIcon style={{ color: "#25ab71" }} />
              </Tooltip>
            </Box>
          );
        } else {
          return (
            <Box className={is_indent === "1" ? "mx-3" : "mr-3"}>
              <Tooltip title={tooltipResult} arrow placement="right">
                <ThumbUpIcon style={{ color: "#25ab71" }} />
              </Tooltip>
            </Box>
          );
        }
        break;
      }
      case "green_down": {
        return (
          <Box className={is_indent === "1" ? "mx-3" : "mr-3"}>
            <Tooltip title={tooltipResult} arrow placement="right">
              <ArrowDownwardIcon style={{ color: "#25ab71" }} />
            </Tooltip>
          </Box>
        );
        break;
      }
      default: {
        return (
          <Box className={is_indent === "1" ? "mx-3" : "mr-3"}>
            <Tooltip title={tooltipResult} arrow placement="right">
              <CodeIcon style={{ color: "#0000ff" }} />
            </Tooltip>
          </Box>
        );
        break;
      }
    }
  };

  const getToolTipValue = (lists: any) => {
    if (_globalFilter.benchmark_toggle == false) {
      if (!parseFloat(lists.old_v_result)) {
        return null;
      } else {
        if (!parseFloat(lists.v_result)) {
          return null;
        } else {
          return lists.difference_percentage + "%";
          // return ddformatString(
          //   ((parseFloat(lists.v_result) - parseFloat(lists.old_v_result)) *
          //     100) /
          //     parseFloat(lists.old_v_result),
          //   "PERC"
          // );
        }
      }
    } else {
      return null;
    }
  };

  const dd_indicator = (lists: any, pageName: any) => {
    const flagChecker = indicatorFunction(
      lists,
      _globalFilter.benchmark_toggle,
      "",
      pageName
    );

    let flagComponent = null;

    if (flagChecker.length > 1) {
      flagComponent = returnFlagComponent(
        flagChecker[1],
        _globalFilter.benchmark_toggle == false ? "arrow" : "thumb",
        getToolTipValue(lists),
        lists.v_is_indent
      );
    } else {
      flagComponent = returnFlagComponent("code", "", null, lists.v_is_indent);
    }

    return flagComponent ? flagComponent : null;
  };

  const ddDashboardLogic = (lists: any, pageName: any) => {
    return (
      <>
        <TableCell>
          <Box className={"flex item-center"}>
            <Typography
              component={"span"}
              style={{ textOverflow: "ellipsis" }}
              className={"flex items-center"}
            >
              {dd_indicator(lists, pageName)}
            </Typography>
          </Box>
        </TableCell>
        {/* {_globalFilter.benchmark_toggle == false ? (
          <TableCell className="text-right">
            {ddformatString(parseFloat(lists.old_v_result), lists.v_value_unit)}
          </TableCell>
        ) : (
          <TableCell>
            <Typography className="banchmark" component={"span"}>
              {ddformatString(lists.v_benchmark, lists.v_value_unit)}
            </Typography>
          </TableCell>
        )} */}
        <TableCell>
          <Typography className="banchmark" component={"span"}>
            {_globalFilter.benchmark_toggle == false
              ? ddformatString(
                  lists.v_is_result_inverse
                    ? lists.v_result
                    : lists.v_secondary_result,
                  lists.v_is_result_inverse
                    ? lists.v_value_unit
                    : lists.v_sec_value_unit
                )
              : ddformatString(lists.v_benchmark_per_result, "PERC")}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className="inverseVresult" component={"span"}>
            {ddformatString(
              lists.v_is_result_inverse
                ? lists.v_secondary_result
                : lists.v_result,
              lists.v_is_result_inverse
                ? lists.v_sec_value_unit
                : lists.v_value_unit
            ) || "NDF"}
          </Typography>
        </TableCell>
      </>
    );
  };

  const distinctSectionName = (kpiDashboard as any)?.data && [
    ...new Set(
      (kpiDashboard as any)?.data
        .flatMap((item: any) => Object.values(item)[0])
        .map((obj: any) => obj.v_section_name)
    ),
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Loading
        className={`${
          loading ||
          kpiName.length === 0 ||
          (kpiDashboard as any)?.data.length === 0
            ? ""
            : "hide"
        } `}
      />
      <Box className="relative ml-auto flex z-[1] ">
        <Box className="page-indicator">
          <Pagination
            className="summaryPagination"
            page={page}
            count={paginationCount}
            showFirstButton
            showLastButton
            // onPageChange={handleChangePage}
            // rowsPerPage={rowsPerPage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
            onChange={onNextClick}
          />
        </Box>
      </Box>
      <Box>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="summary-Tabs"
        >
          <Tab label="Model" {...a11yProps(0)} />
          <Tab label="Branch" {...a11yProps(1)} />
          <Tab
            label={
              _globalFilter.global_filter.p_master_page_code == "sl_dashboard"
                ? "Sales Consultant"
                : "Service Advisor"
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTab} index={0}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 4,
            maxHeight: "calc(100vh - 14.5rem) !important",
          }}
          className="compare-page shadow-none overflow-auto summary-table"
        >
          <Table
            style={{ borderSpacing: "0 8px" }}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="simple-table"
          >
            <TableHead className="card-header sticky top-[-2px] left-0 right-0 z-[5] p-2 bg-gradient-blue">
              <TableRow>
                <TableCell align="center"> KPI</TableCell>
                {props?.modelData
                  .slice(page * columnCount - columnCount, page * columnCount)
                  .map((modelObj: any, modelIndex: any) => (
                    <TableCell
                      key={modelIndex}
                      align="center"
                      className="compare-select-td no-switch"
                    >
                      <Box className="text-center">{modelObj.label}</Box>
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {distinctSectionName?.map(
                (section: any, sectionIndex: number) => (
                  <>
                    <TableRow
                      key={sectionIndex}
                      className="dashboard-item inside_shadow"
                    >
                      <TableCell
                        align="center"
                        className="commonSizeFonts sectionTitle classic-main-box"
                      >
                        {section}
                      </TableCell>
                      {props?.modelData
                        .slice(
                          page * columnCount - columnCount,
                          page * columnCount
                        )
                        .map((modelObj: any, objIndex: any) =>
                          (kpiDashboard as any)?.data?.map(
                            (kpiData: any, kpiIndex: any) =>
                              kpiIndex == objIndex && (
                                <TableCell
                                  key={kpiIndex}
                                  align="left"
                                  className="commonSizeFonts sectionTitle classic-main-box"
                                >
                                  <Table className="list-view overflowHidden">
                                    <TableRow className="listItemCard-modern"></TableRow>
                                    <TableRow className="listItemCard-modern"></TableRow>
                                    <TableRow className="listItemCard-modern">
                                      <TableCell></TableCell>
                                      {/* {_globalFilter.benchmark_toggle ==
                                        true && (
                                        <TableCell
                                          className={`sm-value text-center`}
                                        >
                                          <span>Target</span>
                                        </TableCell>
                                      )}
                                      {_globalFilter.benchmark_toggle ==
                                        false && (
                                        <TableCell className="sm-value">
                                          <Box>
                                            <span>
                                              {formattedCyLyDate(
                                                (
                                                  Object.values(
                                                    kpiData
                                                  )[0] as any
                                                )[0]?.p_start_date,
                                                (
                                                  Object.values(
                                                    kpiData
                                                  )[0] as any
                                                )[0]?.p_end_date,
                                                _globalFilter.global_filter
                                                  .date_unit
                                              )}
                                            </span>
                                          </Box>
                                        </TableCell>
                                      )} */}
                                      <TableCell className="sm-value">
                                        <Box>
                                          {_globalFilter.benchmark_toggle ==
                                          true ? (
                                            <span className="whitespace-nowrap">
                                              % Achmt.
                                            </span>
                                          ) : (
                                            <span className="whitespace-nowrap">
                                              Ratio (%)
                                            </span>
                                          )}
                                        </Box>
                                      </TableCell>
                                      <TableCell className="sm-value">
                                        {_globalFilter.benchmark_toggle ==
                                        true ? (
                                          <span>Achmt.</span>
                                        ) : (
                                          <span>
                                            {formattedCyLyDate(
                                              _globalFilter.global_filter
                                                .p_start_date,
                                              _globalFilter.global_filter
                                                .p_end_date,
                                              _globalFilter.global_filter
                                                .date_unit
                                            )}
                                          </span>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  </Table>
                                </TableCell>
                              )
                          )
                        )}
                    </TableRow>
                    {kpiName.length > 0 &&
                      (kpiName as any)
                        ?.filter(
                          (sectionname: any) =>
                            sectionname.split(":")[3] == section &&
                            sectionname.split(":")[4] ==
                              _globalFilter.global_filter.p_master_page_code
                        )
                        .map((kpiname: any, index: number) => (
                          <TableRow key={index} className="dashboard-item">
                            <TableCell
                              align="center"
                              className="commonSizeFonts"
                            >
                              {kpiname.split(":")[2]}
                            </TableCell>

                            {props?.modelData
                              .slice(
                                page * columnCount - columnCount,
                                page * columnCount
                              )
                              .map((modelObj: any, objIndex: any) =>
                                (kpiDashboard as any)?.data.map(
                                  (kpiData: any, kpiIndex: any) =>
                                    kpiIndex == objIndex && (
                                      <TableCell
                                        key={kpiIndex}
                                        align="center"
                                        className="commonSizeFonts classic-main-box"
                                      >
                                        <Table className="list-view overflowHidden">
                                          <TableRow className="listItemCard-modern"></TableRow>
                                          <TableRow className="listItemCard-modern"></TableRow>
                                          <TableRow className="listItemCard-modern">
                                            {(Object.values(kpiData)[0] as any)
                                              ?.filter(
                                                (firstKpi: any) =>
                                                  kpiname.split(":")[0] ==
                                                    firstKpi.v_kpiid &&
                                                  kpiname.split(":")[1] ==
                                                    firstKpi.v_kpi_code &&
                                                  kpiname.split(":")[2] ==
                                                    firstKpi.v_display_column &&
                                                  firstKpi.v_kpiid &&
                                                  firstKpi.v_section_name ==
                                                    section
                                              )
                                              .map((lists: any) => {
                                                return ddDashboardLogic(
                                                  lists,
                                                  ""
                                                );
                                              })}
                                          </TableRow>
                                        </Table>
                                      </TableCell>
                                    )
                                )
                              )}
                          </TableRow>
                        ))}
                  </>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 4,
            maxHeight: "calc(100vh - 14.5rem) !important",
          }}
          className="compare-page shadow-none overflow-auto"
        >
          <Table
            style={{ borderSpacing: "0 8px" }}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="simple-table"
          >
            <TableHead className="card-header sticky top-[-2px] left-0 right-0 z-[5] p-2 bg-gradient-blue">
              <TableRow>
                <TableCell align="center"> KPI</TableCell>
                {props?.locationData
                  .slice(page * columnCount - columnCount, page * columnCount)
                  .map((modelObj: any, modelIndex: any) => (
                    <TableCell
                      key={modelIndex}
                      align="center"
                      className="compare-select-td no-switch"
                    >
                      <Box className="text-center">{modelObj.label}</Box>
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {distinctSectionName?.map(
                (section: any, sectionIndex: number) => (
                  <>
                    <TableRow
                      key={sectionIndex}
                      className="dashboard-item inside_shadow"
                    >
                      <TableCell
                        align="center"
                        className="commonSizeFonts sectionTitle classic-main-box"
                      >
                        {section}
                      </TableCell>
                      {props?.locationData
                        .slice(
                          page * columnCount - columnCount,
                          page * columnCount
                        )
                        .map((modelObj: any, objIndex: any) =>
                          (kpiDashboard as any)?.data?.map(
                            (kpiData: any, kpiIndex: any) =>
                              kpiIndex == objIndex && (
                                <TableCell
                                  key={kpiIndex}
                                  align="left"
                                  className="commonSizeFonts sectionTitle classic-main-box"
                                >
                                  <Table className="list-view overflowHidden">
                                    <TableRow className="listItemCard-modern"></TableRow>
                                    <TableRow className="listItemCard-modern"></TableRow>
                                    <TableRow className="listItemCard-modern">
                                      <TableCell></TableCell>
                                      {/* {_globalFilter.benchmark_toggle ==
                                        true && (
                                        <TableCell
                                          className={`sm-value text-center`}
                                        >
                                          <span>Target</span>
                                        </TableCell>
                                      )}
                                      {_globalFilter.benchmark_toggle ==
                                        false && (
                                        <TableCell className="sm-value">
                                          <Box>
                                            <span>
                                              {formattedCyLyDate(
                                                (
                                                  Object.values(
                                                    kpiData
                                                  )[0] as any
                                                )[0]?.p_start_date,
                                                (
                                                  Object.values(
                                                    kpiData
                                                  )[0] as any
                                                )[0]?.p_end_date,
                                                _globalFilter.global_filter
                                                  .date_unit
                                              )}
                                            </span>
                                          </Box>
                                        </TableCell>
                                      )} */}
                                      <TableCell className="sm-value">
                                        <Box>
                                          {_globalFilter.benchmark_toggle ==
                                          true ? (
                                            <span className="whitespace-nowrap">
                                              % Achmt.
                                            </span>
                                          ) : (
                                            <span className="whitespace-nowrap">
                                              Ratio (%)
                                            </span>
                                          )}
                                        </Box>
                                      </TableCell>
                                      <TableCell className="sm-value">
                                        {_globalFilter.benchmark_toggle ==
                                        true ? (
                                          <span>Achmt.</span>
                                        ) : (
                                          <span>
                                            {formattedCyLyDate(
                                              _globalFilter.global_filter
                                                .p_start_date,
                                              _globalFilter.global_filter
                                                .p_end_date,
                                              _globalFilter.global_filter
                                                .date_unit
                                            )}
                                          </span>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  </Table>
                                </TableCell>
                              )
                          )
                        )}
                    </TableRow>
                    {kpiName.length > 0 &&
                      (kpiName as any)
                        ?.filter(
                          (sectionname: any) =>
                            sectionname.split(":")[3] == section &&
                            sectionname.split(":")[4] ==
                              _globalFilter.global_filter.p_master_page_code
                        )
                        .map((kpiname: any, index: number) => (
                          <TableRow key={index} className="dashboard-item">
                            <TableCell
                              align="center"
                              className="commonSizeFonts"
                            >
                              {kpiname.split(":")[2]}
                            </TableCell>

                            {props?.locationData
                              .slice(
                                page * columnCount - columnCount,
                                page * columnCount
                              )
                              .map((modelObj: any, objIndex: any) =>
                                (kpiDashboard as any)?.data.map(
                                  (kpiData: any, kpiIndex: any) =>
                                    kpiIndex == objIndex && (
                                      <TableCell
                                        key={kpiIndex}
                                        align="center"
                                        className="commonSizeFonts classic-main-box"
                                      >
                                        <Table className="list-view overflowHidden">
                                          <TableRow className="listItemCard-modern"></TableRow>
                                          <TableRow className="listItemCard-modern"></TableRow>
                                          <TableRow className="listItemCard-modern">
                                            {(Object.values(kpiData)[0] as any)
                                              ?.filter(
                                                (firstKpi: any) =>
                                                  kpiname.split(":")[0] ==
                                                    firstKpi.v_kpiid &&
                                                  kpiname.split(":")[1] ==
                                                    firstKpi.v_kpi_code &&
                                                  kpiname.split(":")[2] ==
                                                    firstKpi.v_display_column &&
                                                  firstKpi.v_kpiid &&
                                                  firstKpi.v_section_name ==
                                                    section
                                              )
                                              .map((lists: any) => {
                                                return ddDashboardLogic(
                                                  lists,
                                                  ""
                                                );
                                              })}
                                          </TableRow>
                                        </Table>
                                      </TableCell>
                                    )
                                )
                              )}
                          </TableRow>
                        ))}
                  </>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={2}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 4,
            maxHeight: "calc(100vh - 14.5rem) !important",
          }}
          className="compare-page shadow-none overflow-auto"
        >
          <Table
            style={{ borderSpacing: "0 8px" }}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="simple-table"
          >
            <TableHead className="card-header sticky top-[-2px] left-0 right-0 z-[5] p-2 bg-gradient-blue">
              <TableRow>
                <TableCell align="center"> KPI</TableCell>
                {props?.userData
                  .slice(page * columnCount - columnCount, page * columnCount)
                  .map((userObj: any, userIndex: any) => (
                    <TableCell
                      key={userIndex}
                      align="center"
                      className="compare-select-td no-switch"
                    >
                      <Box className="text-center">{userObj.label}</Box>
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {distinctSectionName?.map(
                (section: any, sectionIndex: number) => (
                  <>
                    <TableRow
                      key={sectionIndex}
                      className="dashboard-item inside_shadow"
                    >
                      <TableCell
                        align="center"
                        className="commonSizeFonts sectionTitle classic-main-box"
                      >
                        {section}
                      </TableCell>
                      {props?.userData
                        .slice(
                          page * columnCount - columnCount,
                          page * columnCount
                        )
                        .map((userObj: any, objIndex: any) =>
                          (kpiDashboard as any)?.data?.map(
                            (kpiData: any, kpiIndex: any) =>
                              kpiIndex == objIndex && (
                                <TableCell
                                  key={kpiIndex}
                                  align="left"
                                  className="commonSizeFonts sectionTitle classic-main-box"
                                >
                                  <Table className="list-view overflowHidden">
                                    <TableRow className="listItemCard-modern"></TableRow>
                                    <TableRow className="listItemCard-modern"></TableRow>
                                    <TableRow className="listItemCard-modern">
                                      <TableCell></TableCell>
                                      {/* {_globalFilter.benchmark_toggle ==
                                        true && (
                                        <TableCell
                                          className={`sm-value text-center`}
                                        >
                                          <span>Target</span>
                                        </TableCell>
                                      )}
                                      {_globalFilter.benchmark_toggle ==
                                        false && (
                                        <TableCell className="sm-value">
                                          <Box>
                                            <span>
                                              {formattedCyLyDate(
                                                (
                                                  Object.values(
                                                    kpiData
                                                  )[0] as any
                                                )[0]?.p_start_date,
                                                (
                                                  Object.values(
                                                    kpiData
                                                  )[0] as any
                                                )[0]?.p_end_date,
                                                _globalFilter.global_filter
                                                  .date_unit
                                              )}
                                            </span>
                                          </Box>
                                        </TableCell>
                                      )} */}
                                      <TableCell className="sm-value">
                                        <Box>
                                          {_globalFilter.benchmark_toggle ==
                                          true ? (
                                            <span className="whitespace-nowrap">
                                              % Achmt.
                                            </span>
                                          ) : (
                                            <span className="whitespace-nowrap">
                                              Ratio (%)
                                            </span>
                                          )}
                                        </Box>
                                      </TableCell>
                                      <TableCell className="sm-value">
                                        {_globalFilter.benchmark_toggle ==
                                        true ? (
                                          <span>Achmt.</span>
                                        ) : (
                                          <span>
                                            {formattedCyLyDate(
                                              _globalFilter.global_filter
                                                .p_start_date,
                                              _globalFilter.global_filter
                                                .p_end_date,
                                              _globalFilter.global_filter
                                                .date_unit
                                            )}
                                          </span>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  </Table>
                                </TableCell>
                              )
                          )
                        )}
                    </TableRow>
                    {kpiName.length > 0 &&
                      (kpiName as any)
                        ?.filter(
                          (sectionname: any) =>
                            sectionname.split(":")[3] == section &&
                            sectionname.split(":")[4] ==
                              _globalFilter.global_filter.p_master_page_code
                        )
                        .map((kpiname: any, index: number) => (
                          <TableRow key={index} className="dashboard-item">
                            <TableCell
                              align="center"
                              className="commonSizeFonts"
                            >
                              {kpiname.split(":")[2]}
                            </TableCell>

                            {props?.userData
                              .slice(
                                page * columnCount - columnCount,
                                page * columnCount
                              )
                              .map((userrObj: any, userIndex: any) =>
                                (kpiDashboard as any)?.data.map(
                                  (kpiData: any, kpiIndex: any) =>
                                    // console.log(kpiData,kpiIndex,userIndex,userrObj)

                                    kpiIndex == userIndex && (
                                      <TableCell
                                        key={kpiIndex}
                                        align="center"
                                        className="commonSizeFonts classic-main-box"
                                      >
                                        <Table className="list-view overflowHidden">
                                          <TableRow className="listItemCard-modern"></TableRow>
                                          <TableRow className="listItemCard-modern"></TableRow>
                                          <TableRow className="listItemCard-modern">
                                            {(Object.values(kpiData)[0] as any)
                                              ?.filter(
                                                (firstKpi: any) =>
                                                  kpiname.split(":")[0] ==
                                                    firstKpi.v_kpiid &&
                                                  kpiname.split(":")[1] ==
                                                    firstKpi.v_kpi_code &&
                                                  kpiname.split(":")[2] ==
                                                    firstKpi.v_display_column &&
                                                  firstKpi.v_kpiid &&
                                                  firstKpi.v_section_name ==
                                                    section
                                              )
                                              .map((lists: any) => {
                                                return ddDashboardLogic(
                                                  lists,
                                                  ""
                                                );
                                              })}
                                          </TableRow>
                                        </Table>
                                      </TableCell>
                                    )
                                )
                              )}
                          </TableRow>
                        ))}
                  </>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
    </Box>
  );
};

export default Summary;
