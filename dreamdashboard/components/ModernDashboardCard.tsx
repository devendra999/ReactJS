import React, { useEffect, useState } from "react";
import {
  CardActions,
  CardContent,
  Box,
  Grid,
  Typography,
  Table,
  TableRow,
  TableCell,
  Popover,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import { IconButton } from "@mui/material";
import Image from "next/image";
import timerIconImage from "../assets/images/time.png";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux"; 
import {
  convertLastUpdatedDate,
  convertLastUpdatedDateForSection,
  formattedCyLyDate,
} from "@root/utils/globalFunction";
const SalesFunnelChart = dynamic(() => import("./charts/SalesFunnelChart"));
const LeadSourceChart = dynamic(() => import("./charts/LeadSourceChart"));
const InventoryChart = dynamic(() => import("./charts/InventoryChart"));
const CrossSellChart = dynamic(() => import("./charts/CrossSellChart"));
const SalesManagementChart = dynamic(
  () => import("./charts/SalesManagementChart")
);
const ProfitProductivityChart = dynamic(
  () => import("./charts/ProfitProductivityChart")
);
const CustomFocusChart = dynamic(() => import("./charts/CustomFocusChart"));
const TargetAchievementChart = dynamic(
  () => import("./charts/TargetAchievementChart")
);
const ThroughputFlowChart = dynamic(
  () => import("./charts/service-dashboard/ThroughputFlowChart")
);
const OperationsViewChart = dynamic(
  () => import("./charts/service-dashboard/OperationsViewChart")
);
const CustomFocusChartService = dynamic(
  () => import("./charts/service-dashboard/CustomFocusChartService")
);
const TargetAchievementChartService = dynamic(
  () => import("./charts/service-dashboard/TargetAchievementChartService")
);
const CrossSellChartService = dynamic(
  () => import("./charts/service-dashboard/CrossSellChartService")
);
const PmRevenueChartService = dynamic(
  () => import("./charts/service-dashboard/PmRevenueChartService")
);
const GrRevenueChartService = dynamic(
  () => import("./charts/service-dashboard/GrRevenueChartService")
);
const BpRevenueChartService = dynamic(
  () => import("./charts/service-dashboard/B&pRevenueChartService")
);
const TotalRevenueChartService = dynamic(
  () => import("./charts/service-dashboard/TotalRvenueChartService")
);
const MeRevenueChartService = dynamic(
  () => import("./charts/service-dashboard/MeRevenueChartService")
);

function ModernDashboardCard(props: any) {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);

  const [currentData, setCurrentData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {
    let displayValues = props?.displayValues;
    let currentDataCopy: any = [];
    for (let i = 0; i < displayValues?.length; i++) {
      if (props.charttitle === "Lead Source") {
        let obj = {
          kpi_name: displayValues?.[i]?.v_kpi_name,
          kpi_display_name: displayValues?.[i]?.v_display_column,
          kpi_result: displayValues?.[i]?.v_result,
          kpi_secondary_result: displayValues?.[i]?.v_secondary_result,
          kpi_code: displayValues?.[i]?.v_kpi_code,
        };
        currentDataCopy.push(obj);
      } else {
        let obj = {
          kpi_name: displayValues?.[i]?.v_kpi_name,
          kpi_result: displayValues?.[i]?.v_result,
          kpi_secondary_result: displayValues?.[i]?.v_secondary_result,
          kpi_code: displayValues?.[i]?.v_kpi_code,
        };
        currentDataCopy.push(obj);
      }
    }
    setCurrentData(currentDataCopy);
  }, []);

  const renderChart = () => {
    const allKpiData = props.allKpiData[0];
    if (props.pageCode === "sl_dashboard") {
      switch (props.charttitle) {
        case "Sales Funnel":
          return <SalesFunnelChart currentData={currentData} />;
          break;
        case "Lead Source":
          const inquires = allKpiData?.find(
            (item: any) => item.v_kpi_name === "Inquiries"
          );
          return (
            <LeadSourceChart
              currentData={currentData}
              inquires={inquires?.v_result}
            />
          );
          break;
        case "Inventory":
          return <InventoryChart currentData={currentData} />;
          break;
        case "Cross-Sell":
          const deliveries = allKpiData?.find(
            (item: any) => item.v_kpi_name === "Dlr. Retail"
          );
          return (
            <CrossSellChart
              currentData={currentData}
              deliveries={deliveries?.v_result}
            />
          );
          break;
        case "Sales Management":
          return <SalesManagementChart currentData={currentData} />;
        case "Profit & Productivity":
          const profitProductivityData = allKpiData?.find(
            (item: any) => item.v_kpi_code === "sales_consultant_productivity"
          );
          const SCdashboardToModal = {
            ...profitProductivityData,
            ..._globalFilter.global_filter,
          };

          return (
            <ProfitProductivityChart
              currentData={currentData}
              dashboardToModal={SCdashboardToModal}
            />
          );
          break;
        case "Customer Focus":
          const customerFocusData = allKpiData?.find(
            (item: any) => item.v_kpi_code === "csat_score_sales"
          );
          const CFdashboardToModal = {
            ...customerFocusData,
            ..._globalFilter.global_filter,
          };
          return (
            <CustomFocusChart
              currentData={currentData}
              dashboardToModal={CFdashboardToModal}
            />
          );
          break;
        case "Target Achievement":
          const targetData = allKpiData?.find(
            (item: any) => item.v_kpi_name === "Retail Target"
          );
          const achievementData = allKpiData?.find(
            (item: any) => item.v_kpi_name === "Achievement"
          );
          const targetChartBody = {
            ...targetData,
            ..._globalFilter.global_filter,
          };
          const achievementChartBody = {
            ...achievementData,
            ..._globalFilter.global_filter,
          };
          return (
            <TargetAchievementChart
              currentData={currentData}
              targetChartBody={targetChartBody}
              achievementChartBody={achievementChartBody}
            />
          );
          break;
      }
    } else if (props.pageCode === "sr_dashboard") {
      switch (props.charttitle) {
        case "Throughput Flow":
          return <ThroughputFlowChart currentData={currentData} />;
          break;
        case "Operations View":
          return <OperationsViewChart currentData={currentData} />;
          break;
        case "Inventory":
          return <InventoryChart currentData={currentData} />;
          break;
        case "Cross-Sell":
          const accesoriesData = allKpiData?.find(
            (item: any) => item.v_kpi_code === "accessories_service"
          );
          const dashboardToModal = {
            ...accesoriesData,
            ..._globalFilter.global_filter,
          };
          return (
            <CrossSellChartService
              currentData={currentData}
              dashboardToModal={dashboardToModal}
            />
          );
          break;
        case "Sales Management":
          return <SalesManagementChart currentData={currentData} />;
        case "Profit & Productivity":
          return (
            <ProfitProductivityChart
              currentData={currentData}
              dashboardToModal={dashboardToModal}
            />
          );
          break;
        case "Customer Focus":
          return <CustomFocusChartService currentData={currentData} />;
          break;
        case "Target Achievement":
          return <TargetAchievementChartService currentData={currentData} />;
          break;
        case "PM Revenue":
          return <PmRevenueChartService currentData={currentData} />;
          break;
        case "GR Revenue":
          return <GrRevenueChartService currentData={currentData} />;
          break;
        case "B&P Revenue":
          return <BpRevenueChartService currentData={currentData} />;
          break;
        case "ME Revenue":
          return <MeRevenueChartService currentData={currentData} />;
          break;
        case "Total Revenue":
          return <TotalRevenueChartService currentData={currentData} />;
          break;
      }
    }
  };

  const returnLastDate = () => {
    const arrayOfDate: any = [];
    props?.displayValues.forEach((row: any) => {
      row.v_last_file_upload !== null &&
        arrayOfDate.push(row.v_last_file_upload);
    });
    return arrayOfDate.length > 0
      ? convertLastUpdatedDateForSection(arrayOfDate)
      : null;
  };

  return (
    <>
      {props?.kpiList.length > 0 && (
 
   <Grid
          item
          xs={props.singleComponent ? false : 12}
          sm={
            props.singleComponent
              ? false
              : props.chartTypeSwitch === "modern"
              ? 12
              : props.gridCount > 1
              ? 12
              : 6
          }
          md={
            props.singleComponent
              ? false
              : props.chartTypeSwitch === "modern"
              ? 12
              : props.gridCount > 1
              ? 12
              : 6
          }
          lg={
            props.singleComponent
              ? false
              : props.chartTypeSwitch === "modern"
              ? 6
              : props.gridCount > 1
              ? 12
              : 6
          }
          xl={
            props.singleComponent
              ? false
              : props.chartTypeSwitch === "modern"
              ? 6
              : props.gridCount * 4
          }
          xxl={
            props.singleComponent
              ? false
              : props.chartTypeSwitch === "modern"
              ? 6
              : props.gridCount * 4
          }
          className={`single-item min-h-1/2 pt-0-important pb-8 animate__animated animate__fadeInUp animate__faster `}
        >
          <Box className="dashboard-item relative p-0 h-full w-full">
            <CardContent className="card-content-view p-0 pb-0-important h-full mb-[12px]">
              <Box className="classic-main-box bg-lightgrey h-full rounded-t-[10px] overflow-hidden overflow-x-auto bg-dashboard-card shadow-dashboard-card border border-dashboard-card w-full">
                <Grid
                  container
                  className="items-baseline h-full chart-grid-main"
                >
                  {props.chartTypeSwitch === "modern" && (
                    <>
                      <Grid
                        className="grid-item h-full"
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={12}
                        xl={5}
                        xxl={5}
                        // style={{ backgroundColor: "#EBEDEF"}}
                      >
                        <Table className="list-view relative">
                          <TableRow className="listItemCard-modern relative px-0 head-table bg-transparent">
                            <TableCell className="border-small relative">
                              <Typography
                                variant="h5"
                                className="card-heading whitespace-nowrap animate__animated animate__fadeIn animate__delay-600ms"
                              >
                                {props.charttitle}
                                {/* <CardContent className="p-0 card-content-view"></CardContent> */}
                              </Typography>
                            </TableCell>
                          </TableRow>

                          <TableRow className="px-0 head-table">
                            <TableCell className="border-0 chartBgColor p-0 h-full">
                              <Box className="chartContainer">
                                <Box className="dummy-chart">
                                  {renderChart()}
                                </Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </Table>
                      </Grid>
                    </>
                  )}

                  <Grid
                    className="grid-item h-full"
                    item
                    xs={props.chartTypeSwitch === "modern" ? 12 : 12}
                    sm={props.chartTypeSwitch === "modern" ? 6 : 12}
                    md={props.chartTypeSwitch === "modern" ? 6 : 12}
                    lg={props.chartTypeSwitch === "modern" ? 12 : 12}
                    xl={props.chartTypeSwitch === "modern" ? 7 : 12}
                    xxl={props.chartTypeSwitch === "modern" ? 7 : 12}
                  >
                    <CardContent className="content h-full">
                      <Table className="list-view relative h-full">
                        <TableRow className="listItemCard-modern relative px-0 head-table bg-transparent">
                          <TableCell rowSpan={2} className="pl-2 pr-2">
                            <Box className="flex items-center justify-start">
                              <Typography
                                variant="h5"
                                className="card-heading animate__animated animate__fadeIn animate__delay-850ms"
                                style={{
                                  opacity:
                                    props.chartTypeSwitch !== "modern"
                                      ? "1"
                                      : "0",
                                }}
                              >
                                {props.chartTypeSwitch !== "modern"
                                  ? props.charttitle
                                  : "#"}
                              </Typography>
                            </Box>
                          </TableCell>
                          <>
                            {_globalFilter.benchmark_toggle == true && (
                              <TableCell
                                rowSpan={2}
                                className={`sm-value text-center pl-2 pr-2 ${
                                  props.allKpiData?.filter(
                                    (item: any) =>
                                      item.v_section_name ===
                                        props.charttitle &&
                                      item.v_benchmark !== null
                                  ).length > 0
                                    ? ""
                                    : ""
                                }`}
                              >
                                <span>Target</span>
                              </TableCell>
                            )}
                            {_globalFilter.benchmark_toggle == false && (
                              <TableCell
                                rowSpan={2}
                                className="sm-value pl-2 pr-2"
                              >
                                <Box>
                                  <span>
                                    {formattedCyLyDate(
                                      props?.displayValues[0]?.p_start_date,
                                      props?.displayValues[0]?.p_end_date,
                                      _globalFilter.global_filter.date_unit
                                    )}
                                  </span>
                                </Box>
                              </TableCell>
                            )}
                            <TableCell
                              rowSpan={2}
                              className="sm-value pl-2 pr-2"
                            >
                              <Box>
                                {_globalFilter.benchmark_toggle == true ? (
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
                            <TableCell
                              rowSpan={2}
                              className="sm-value pl-2 pr-2"
                            >
                              {_globalFilter.benchmark_toggle == true ? (
                                <span>Achmt.</span>
                              ) : (
                                <span>
                                  {formattedCyLyDate(
                                    _globalFilter.global_filter.p_start_date,
                                    _globalFilter.global_filter.p_end_date,
                                    _globalFilter.global_filter.date_unit
                                  )}
                                </span>
                              )}
                            </TableCell>
                          </>
                          {props.gridCount > 1 &&
                            props?.groupingChildSection?.length > 0 &&
                            props?.groupingChildSection?.map((obj: any) => (
                              <>
                                {_globalFilter.benchmark_toggle == true ? (
                                  <>
                                    <TableCell
                                      colSpan={2}
                                      className="sm-value text-center pl-2 pr-2 border"
                                      style={{
                                        borderBottom:
                                          "1px solid rgba(0, 0, 0, 0.1)",
                                        paddingTop: "3.6px",
                                        borderLeft:
                                          "1px solid rgba(0, 0, 0, 0.1)",
                                      }}
                                    >
                                      <span className="text-blue" style={{"textAlign": "center"}}>
                                        {obj.name}
                                      </span>
                                    </TableCell>
                                    {/* <TableCell className="sm-value text-center pl-2 pr-2"></TableCell> */}
                                  </>
                                ) : (
                                  <>
                                    <TableCell
                                      colSpan={2}
                                      className="sm-value pl-2 pr-2"
                                      style={{
                                        borderBottom:
                                          "1px solid rgba(0, 0, 0, 0.1)",
                                        paddingTop: "3.6px",
                                        borderLeft:
                                          "1px solid rgba(0, 0, 0, 0.1)",
                                      }}
                                    >
                                      <Box>
                                        <span className="text-blue" style={{"textAlign": "center"}}>
                                          {obj.name}
                                        </span>
                                      </Box>
                                    </TableCell>
                                    {/* <TableCell className="sm-value text-center pl-2 pr-2"></TableCell> */}
                                  </>
                                )}
                              </>
                            ))}
                        </TableRow>
                        <TableRow className="listItemCard-modern relative px-0 head-table bg-transparent">
                          {props.gridCount > 1 &&
                            props?.groupingChildSection?.length > 0 &&
                            props?.groupingChildSection?.map((obj: any) => (
                              <>
                                {_globalFilter.benchmark_toggle == true ? (
                                  <TableCell
                                    className="sm-value text-center pl-2 pr-2 py-2"
                                    style={{
                                      paddingBottom: "2px",
                                      paddingTop: "3.6px",
                                      borderLeft:
                                        "1px solid rgba(0, 0, 0, 0.1)",
                                    }}
                                  >
                                    <span>Target</span>
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    className="sm-value pl-2 pr-2"
                                    style={{
                                      paddingBottom: "2px",
                                      paddingTop: "3.6px",
                                      borderLeft:
                                        "1px solid rgba(0, 0, 0, 0.1)",
                                    }}
                                  >
                                    <Box>
                                      <span style={{"textAlign": "center"}}>
                                        {formattedCyLyDate(
                                          props?.displayValues[0]?.p_start_date,
                                          props?.displayValues[0]?.p_end_date,
                                          _globalFilter.global_filter.date_unit
                                        )}
                                      </span>
                                    </Box>
                                  </TableCell>
                                )}
                                <TableCell
                                  className="sm-value text-center pl-2 pr-2 py-2"
                                  style={{
                                    paddingBottom: "2px",
                                    paddingTop: "3.6px",
                                  }}
                                >
                                  {_globalFilter.benchmark_toggle == true ? (
                                    <span>Achmt.</span>
                                  ) : (
                                    <span style={{"textAlign": "center"}}>
                                      {formattedCyLyDate(
                                        _globalFilter.global_filter
                                          .p_start_date,
                                        _globalFilter.global_filter.p_end_date,
                                        _globalFilter.global_filter.date_unit
                                      )}
                                    </span>
                                  )}
                                </TableCell>
                              </>
                            ))}
                        </TableRow>
                        <TableRow
                          className={`listItemCard-modern relative px-0 bg-transparent ${
                            props?.flags == "redflags"
                              ? "redflags"
                              : props?.flags == "greenflags"
                              ? "greenflags"
                              : ""
                          }`}
                        >
                          <TableCell className="w-auto-important max-w-none-important"></TableCell>
                          <TableCell className="w-auto-important max-w-none-important"></TableCell>
                          <TableCell className="w-auto-important max-w-none-important"></TableCell>
                          <TableCell className="w-auto-important max-w-none-important"></TableCell>
                          {props.gridCount > 1 &&
                            props?.groupingChildSection?.length > 0 &&
                            new Array(props?.groupingChildSection?.length)
                              .fill(null)
                              .map((index: any) => (
                                <>
                                  <TableCell className="w-auto-important bg-dashboard-card-second max-w-none-important"></TableCell>
                                  <TableCell className="w-auto-important bg-dashboard-card-third max-w-none-important"></TableCell>
                                </>
                              ))}
                        </TableRow>
                        {props.kpiList}
                        <TableRow className="listItemCard-modern">
                          <TableCell
                            className="dash-updates"
                            colSpan={
                              props?.groupingChildSection?.length > 0
                                ? props?.groupingChildSection?.length * 2 + 4
                                : 4
                            }
                          >
                            <Box className="dash-update">
                              <span className="updInfo">
                                {returnLastDate() != null
                                  ? "Updated on " + returnLastDate()
                                  : "Data not uploaded"}
                              </span>
                              <IconButton onClick={handleClick}>
                                <Image
                                  src={timerIconImage.src}
                                  alt="timer icon"
                                  className="timerIcon"
                                  width={50}
                                  height={50}
                                />
                              </IconButton>
                              <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                                style={{"height": "375px"}}
                              >
                                <TableContainer
                                  component={Paper}
                                  className="dashPopover"
                                >
                                  <Table aria-label="simple table">
                                    <TableBody>
                                      {props.kpiListPopover}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Popover>
                              <span>{}</span>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </Table>
                      {props.seeMore && (
                        <CardActions className="seeMoreContainer">
                          {props.seeMore}
                        </CardActions>
                      )}
                    </CardContent>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Box>
        </Grid>
   
     
      )}
    </>
  );
}

export default ModernDashboardCard;
