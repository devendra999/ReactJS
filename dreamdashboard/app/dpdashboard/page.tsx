"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Modal,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CodeIcon from "@mui/icons-material/Code";
import FlagIcon from "@mui/icons-material/Flag";
import {
  useKpiControllerMappingDashboard,
  useGetManyBaseSectionControllerSection,
  useSendMailControllerSendEmailWithImage,
} from "../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import { PanelHeading } from "@root/components/PanelHeading";
import html2canvas from "html2canvas";
import { getFromLocalStorage } from "@root/utils/common";

import {
  indicatorFunction,
  ddformatString,
  reInitialStates,
  resetCustomFilter,
  resetAllFiltersWhenPageCodeChange,
  convertLastUpdatedDate,
} from "@root/utils/globalFunction";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { updateGlobalFilterKey } from "../layout";

const SidebarWithLayout = dynamic(() => import("../layout-with-sidebar"));
const ModernDashboardCard = dynamic(
  () => import("@root/components/ModernDashboardCard")
);
const ModernDashboardItems = dynamic(
  () => import("@root/components/ModernDashboardItems")
);
const ModalComponent = dynamic(() => import("@root/components/ModalComponent"));
const ModalDataDump = dynamic(() => import("@root/components/ModalDataDump"));
const SharingDashboardModal = dynamic(
  () => import("@root/components/SharingDashboardModal")
);
const SwitchSmall = dynamic(() => import("@root/components/SwitchSmall"));
const Loading = dynamic(() => import("@root/components/Loading"));

export default function Salesdashboard() {
  const globalFilterSelector = (state: any) => state.globalFilter;

  const _globalFilter = useSelector(globalFilterSelector);

  const searchParams = useSearchParams();
  const pageCode = searchParams.get("page");
  const router = useRouter();
  const [subType, setSubType] = useState("classic");
  const [flagValue, setFlagValue] = useState(false);
  const [modalDataDump, setModalDataDump] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dashboardToModal, setDashboardToModal] = useState<any>("");
  const [selectedSectionData, setSelectedSectionData] = useState<any>("");
  const [dumpData, setDumpData] = useState<any>("");
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState(null);
  const [subTypeLoader, setSubTypeLoader] = React.useState(false);
  const [selectedKpiList, setSelectedKpiList] = useState<any>("");
  const [dashboardSharingModal, setDashboardSharingModal] =
    useState<boolean>(false);
  const [dashboardSharingResponse, setDashboardSharingResponse] =
    useState<boolean>(false);
  const screenshotRef = useRef(null);

  const rolewiseDisplay = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );

  const qParamsObject = {
    p_start_date: _globalFilter.global_filter.p_start_date,
    p_end_date: _globalFilter.global_filter.p_end_date,
    p_model:
      _globalFilter.global_filter.p_model != ""
        ? `ARRAY[${_globalFilter.global_filter.p_model
            .map((model: any) => `'${model.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_model,
    p_sc:
      _globalFilter.global_filter.p_sc != ""
        ? `ARRAY[${_globalFilter.global_filter.p_sc
            .map((sc: any) => `'${sc.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_sc,
    p_location:
      _globalFilter.global_filter.p_location != ""
        ? `ARRAY[${_globalFilter.global_filter.p_location
            .map((location: any) => `'${location.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_location,
    p_master_page_code: _globalFilter.global_filter.p_master_page_code,
    date_unit: _globalFilter.global_filter.date_unit,
    select_year: _globalFilter.global_filter.select_year,
    p_user_id: _globalFilter.global_filter.p_user_id,
    p_brand_id: _globalFilter.global_filter.p_brand_id,
    is_compare: _globalFilter.global_filter.is_compare,
    flag: flagValue ? "green" : "red",
  };

  const { mutateAsync: sendEmail, isLoading: submitLoader } =
    useSendMailControllerSendEmailWithImage();

  const handleOpen = (param: any) => {
    setSelectedSectionData(param);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalData(null);
    setSelectedSectionData(null);
  };

  const sendData = (tabName: any) => {
    setSubTypeLoader(true);
    setSubType(tabName);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDashboardToModal("");
    setSelectedKpiList("");
  };
  const handleDashboardSharingModal = () => {
    setDashboardSharingModal(false);
  };

  useEffect(() => {
    if (selectedKpiList) {
      setIsModalOpen(true);
      setDashboardToModal({
        ...selectedKpiList,
        ..._globalFilter.global_filter,
      });
    }
  }, [selectedKpiList]);

  const openModalWithData = (param: any) => {
    setSelectedKpiList(param);
  };

  const openDataDump = (selectedValue: any) => {
    const dump_Data = {
      p_kpi_id: selectedValue.v_kpiid,
      p_kpi_name: selectedValue.v_kpi_name,
      ...qParamsObject,
    };

    handleDataDumpPopup(true, dump_Data);
  };

  const handleDataDumpPopup = (isOpen: boolean, selectedValue: any) => {
    setDumpData(selectedValue);
    setModalDataDump(isOpen);
  };

  const handleCaptureClick = async (email: any, remarks: any) => {
    if (screenshotRef.current) {
      setTimeout(async () => {
        const canvas = await html2canvas((screenshotRef as any).current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });
        const screenshotUrl = canvas.toDataURL("image/png");

        const reqBody = {
          emailto: email,
          remarks: remarks,
          start_date: _globalFilter.global_filter.p_start_date,
          end_date: _globalFilter.global_filter.p_end_date,
          image: screenshotUrl,
          subject_line: "Dream Dashboard Shared - " + subjectLine,
        };

        const response = await sendEmail({
          body: reqBody,
        });

        if ((response as any)?.statusCode === 200 || 201) {
          setDashboardSharingResponse(true);
          setDashboardSharingModal(true);
        } else {
          setDashboardSharingResponse(false);
          setDashboardSharingModal(true);
        }
      }, 1500);
    }
  };

  const { data: kpiDashboardSection, refetch: dashboardSectionFatching } =
    useGetManyBaseSectionControllerSection(
      {},
      {
        enabled: false,
      }
    );

  useEffect(() => {
    reInitialStates();
    if (_globalFilter.global_filter.p_master_page_code != pageCode) {
      updateGlobalFilterKey("global_filter.p_master_page_code", pageCode);
      updateGlobalFilterKey(
        "compare_filter.first_column.p_master_page_code",
        pageCode
      );
      updateGlobalFilterKey(
        "compare_filter.second_column.p_master_page_code",
        pageCode
      );
      updateGlobalFilterKey(
        "compare_filter.third_column.p_master_page_code",
        pageCode
      );
      updateGlobalFilterKey(
        "compare_filter.fourth_column.p_master_page_code",
        pageCode
      );
    }
    dashboardSectionFatching();
  }, []);

  useEffect(() => {
    if (_globalFilter.global_filter.p_master_page_code != pageCode) {
      updateGlobalFilterKey("global_filter.p_master_page_code", pageCode);
      updateGlobalFilterKey(
        "compare_filter.first_column.p_master_page_code",
        pageCode
      );
      updateGlobalFilterKey(
        "compare_filter.second_column.p_master_page_code",
        pageCode
      );
      updateGlobalFilterKey(
        "compare_filter.third_column.p_master_page_code",
        pageCode
      );
      updateGlobalFilterKey(
        "compare_filter.fourth_column.p_master_page_code",
        pageCode
      );
      resetAllFiltersWhenPageCodeChange();
    }
    dashboardSectionFatching();
    dashboardFatching();
    resetCustomFilter();
  }, [pageCode]);

  useEffect(() => {
    if (subTypeLoader === true) {
      setSubTypeLoader(false);
    }
  }, [subTypeLoader]);

  const {
    data: kpiDashboard,
    refetch: dashboardFatching,
    isLoading: loading,
  } = useKpiControllerMappingDashboard(
    {
      queryParams: qParamsObject,
    },
    {
      enabled: false,
    }
  );

  const uniquePageTitle = [
    ...new Map(
      (kpiDashboardSection as any)?.map((m: any) => [m.master.name, m])
    ).values(),
  ];

  const visibleGridCount = (kpiDashboardSection as any)?.filter(
    (section: any) =>
      section.master.pageCode === pageCode &&
      (kpiDashboard as any)?.data?.severity !== "ERROR" &&
      (kpiDashboard as any)?.data?.filter(
        (lists: any) => section.name === lists.v_section_name
      ).length > 0
  ).length;

  const isSingleRow = visibleGridCount < 5;

  // Conditionally set the class name based on the number of visible Grid elements
  const gridClassName = isSingleRow
    ? "dashboard-row h-full w-auto pt-0 min-h-1/2 mt-0 ml-n6 single-row-items flex justify-start"
    : "dashboard-row h-full w-auto pt-0 min-h-1/2 mt-0 ml-n6 flex justify-start";

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
          return lists.difference_percentage + "%"
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
      flagValue ? "greenflags" : "redflags",
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

  const surplus_shortfall = (lists: any) =>
    lists.v_kpi_code !== "surplus_shortfall" ? (
      lists?.v_display_column
    ) : Number(lists.v_result) >= 0 ? (
      <Typography component={"span"}>Surplus</Typography>
    ) : (
      <Typography component={"span"}>Shortfall</Typography>
    );

  const displayKpiname = (lists: any) => {
    return (
      <>
        <Typography
          component="span"
          className="kpi-name block"
          // onClick={() =>
          //   lists.v_is_direct_dump_view === true
          //     ? openDataDump(lists)
          //     : lists.v_kpi_code !== "surplus_shortfall" &&
          //       Math.abs(lists.v_result) > 0 &&
          //       openModalWithData(lists)
          // }
          onClick={() =>
            lists.v_is_direct_dump_view === true
            ? rolewiseDisplay.isChartViewAllowed === false
              ? null 
              : rolewiseDisplay.isDumpViewAllowed === false
                ? null // Do nothing if is_dump_allowed is false
                : openDataDump(lists)
            : rolewiseDisplay.isChartViewAllowed === false
             ? null // Open data dump if allowed
              : lists.v_kpi_code !== "surplus_shortfall" &&
                Math.abs(lists.v_result) > 0 &&
                openModalWithData(lists) // Open modal with data if conditions are met
          } 
        >
          {surplus_shortfall(lists)}
        </Typography>
      </>
    );
  };

  const getIndividualComponent = (
    lists: any,
    pageName: any = null,
    groupRender: boolean = false
  ) => {
    return (
      <>
        {!groupRender && (
          <TableCell>
            <Box className={"flex item-center"}>
              <Typography
                component={"span"}
                style={{ textOverflow: "ellipsis" }}
                className={"flex items-center"}
              >
                {dd_indicator(lists, pageName)}
              </Typography>
              <Typography className="kpi-name w-full" component={"span"}>
                {displayKpiname(lists)}
              </Typography>
            </Box>
          </TableCell>
        )}
        {_globalFilter.benchmark_toggle == false ? (
          <TableCell
            className={`text-right w-auto-important ${
              groupRender && `bg-dashboard-card-second`
            } max-w-none-important`}
          >
            {ddformatString(parseFloat(lists.old_v_result), lists.v_value_unit)}
          </TableCell>
        ) : (
          <TableCell
            className={`w-auto-important max-w-none-important ${
              groupRender && `bg-dashboard-card-second`
            }`}
          >
            <Typography className="banchmark" component={"span"}>
              {ddformatString(lists.v_benchmark, lists.v_value_unit)}
            </Typography>
          </TableCell>
        )}
        {!groupRender && (
          <TableCell
            className={`w-auto-important max-w-none-important ${
              groupRender && `bg-dashboard-card-second`
            }`}
          >
            <Typography
              className="banchmark"
              component={"span"}
              // onClick={() =>
              //   lists.v_is_direct_dump_view === true
              //     ? openDataDump(lists)
              //     : lists.v_kpi_code !== "surplus_shortfall" &&
              //       Math.abs(lists.v_result) > 0 &&
              //       openModalWithData(lists)
              // }
              onClick={() =>
                lists.v_is_direct_dump_view === true
                ? rolewiseDisplay.isChartViewAllowed === false
                  ? null 
                  : rolewiseDisplay.isDumpViewAllowed === false
                    ? null // Do nothing if is_dump_allowed is false
                    : openDataDump(lists)
                : rolewiseDisplay.isChartViewAllowed === false
                 ? null // Open data dump if allowed
                  : lists.v_kpi_code !== "surplus_shortfall" &&
                    Math.abs(lists.v_result) > 0 &&
                    openModalWithData(lists) // Open modal with data if conditions are met
              } 
            >
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
        )}
        <TableCell
          className={`w-auto-important max-w-none-important ${
            groupRender && `bg-dashboard-card-third`
          }`}
        >
          <Box className="flex items-center justify-between">
            <Box className="flex items-center pe-2">
              {groupRender && (
                <Typography
                  component={"span"}
                  style={{ textOverflow: "ellipsis" }}
                  className={"flex items-center"}
                >
                  {dd_indicator(lists, pageName)}
                </Typography>
              )}
              {groupRender && (
                <Typography
                  className="banchmark"
                  component={"span"}
                  // onClick={() =>
                  //   lists.v_is_direct_dump_view === true
                  //     ? openDataDump(lists)
                  //     : lists.v_kpi_code !== "surplus_shortfall" &&
                  //       Math.abs(lists.v_result) > 0 &&
                  //       openModalWithData(lists)
                  // }
                  onClick={() =>
                    lists.v_is_direct_dump_view === true
                    ? rolewiseDisplay.isChartViewAllowed === false
                      ? null 
                      : rolewiseDisplay.isDumpViewAllowed === false
                        ? null // Do nothing if is_dump_allowed is false
                        : openDataDump(lists)
                    : rolewiseDisplay.isChartViewAllowed === false
                     ? null // Open data dump if allowed
                      : lists.v_kpi_code !== "surplus_shortfall" &&
                        Math.abs(lists.v_result) > 0 &&
                        openModalWithData(lists) // Open modal with data if conditions are met
                  } 
                >
                  {_globalFilter.benchmark_toggle == false
                    ? ddformatString(
                        lists.v_is_result_inverse
                          ? lists.v_result
                          : lists.v_secondary_result,
                        lists.v_is_result_inverse
                          ? lists.v_value_unit
                          : lists.v_sec_value_unit
                      ) != ""
                      ? "(" +
                        ddformatString(
                          lists.v_is_result_inverse
                            ? lists.v_result
                            : lists.v_secondary_result,
                          lists.v_is_result_inverse
                            ? lists.v_value_unit
                            : lists.v_sec_value_unit
                        ) +
                        ")"
                      : ""
                    : ddformatString(lists.v_benchmark_per_result, "PERC")
                    ? "(" +
                      ddformatString(lists.v_benchmark_per_result, "PERC") +
                      ")"
                    : ""}
                </Typography>
              )}
            </Box>
            <Typography
              className="inverseVresult"
              component={"span"}
              // onClick={() =>
              //   lists.v_is_direct_dump_view === true
              //     ? openDataDump(lists)
              //     : lists.v_kpi_code !== "surplus_shortfall" &&
              //       Math.abs(lists.v_result) > 0 &&
              //       openModalWithData(lists)
              // }
              onClick={() =>
                lists.v_is_direct_dump_view === true
                ? rolewiseDisplay.isChartViewAllowed === false
                  ? null 
                  : rolewiseDisplay.isDumpViewAllowed === false
                    ? null // Do nothing if is_dump_allowed is false
                    : openDataDump(lists)
                : rolewiseDisplay.isChartViewAllowed === false
                 ? null // Open data dump if allowed
                  : lists.v_kpi_code !== "surplus_shortfall" &&
                    Math.abs(lists.v_result) > 0 &&
                    openModalWithData(lists) // Open modal with data if conditions are met
              } 
            >
              {ddformatString(
                lists.v_is_result_inverse
                  ? lists.v_secondary_result
                  : lists.v_result,
                lists.v_is_result_inverse
                  ? lists.v_sec_value_unit
                  : lists.v_value_unit
              ) || "NDF"}
            </Typography>
          </Box>
        </TableCell>
      </>
    );
  };

  const popOverDisplay = (
    lists: any,
    pageName: any = null,
    groupRender: boolean = false
  ) => {
    return (
      <>
        <TableCell>
          <Box className={"flex item-center"}>
            <Typography className="kpi-name w-full" component={"span"}>
              {lists.v_kpi_code !== "surplus_shortfall"
                ? lists?.v_display_column
                : Number(lists.v_result) >= 0
                ? "Surplus"
                : "Shortfall"}
            </Typography>
          </Box>
        </TableCell>
        <TableCell
          className={`w-auto-important max-w-none-important text-right`}
        >
          <Typography component={"span"} className="v_last_file_upload">
            {lists.v_last_file_upload ? (
              convertLastUpdatedDate(lists.v_last_file_upload)
            ) : (
              <Typography component={"span"} className="data-not-upd">
                Data not updated recently!
              </Typography>
            )}
          </Typography>
        </TableCell>
      </>
    );
  };

  const ddDashboardLogic = (lists: any, pageName: any, group: any = null) => {
    var returnQuery = [];
    returnQuery.push(getIndividualComponent(lists, pageName));
    const subGroup = (kpiDashboardSection as any)?.filter(
      (obj: any) => obj.groupParentSectionId === lists.v_section_id
    );
    if (subGroup?.length > 0 && group.length > 0) {
      for (let i = 0; i < subGroup?.length; i++) {
        let filteredResult =
          group?.length > 0
            ? group?.filter(
                (kpi: any) =>
                  lists.v_display_column === kpi.v_display_column &&
                  kpi.v_section_id === subGroup[i]?.id
              )
            : null;
        filteredResult = filteredResult.sort(
          (a: any, b: any) =>
            (a.v_group_sequence as number) - (b.v_group_sequence as number)
        );

        if (filteredResult.length == 0) {
          returnQuery.push(
            <>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </>
          );
        }
        filteredResult.forEach((element: any) => {
          returnQuery.push(getIndividualComponent(element, pageName, true));
        });
      }
    }else {
      if (subGroup?.length > 0 && group.length == 0) {
        for (let i = 0; i < subGroup?.length; i++) {
          returnQuery.push(
            <>
              <TableCell></TableCell>
              <TableCell
                className={`w-auto-important max-w-none-important bg-dashboard-card-third`}
              >
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center pe-2">
                    <Typography
                      component={"span"}
                      style={{ textOverflow: "ellipsis" }}
                      className={"flex items-center"}
                    >
                      {dd_indicator(lists, pageName)}
                    </Typography>
                  </Box>
                  <Typography className="inverseVresult" component={"span"}>
                    NDF
                  </Typography>
                </Box>
              </TableCell>
            </>
          );
        }
      }
    }
    return returnQuery;
  };

  useEffect(() => {
    if (_globalFilter.global_filter.p_master_page_code != "") {
      router.push(
        "/dpdashboard?page=" + _globalFilter.global_filter.p_master_page_code
      );
    }
    dashboardFatching();
  }, [_globalFilter]);

  useEffect(() => {
    if (dashboardToModal != "") {
      const chartProps = (kpiDashboard as any)?.data?.filter(
        (item: any) => item.v_kpi_code === dashboardToModal.v_kpi_code
      );

      if (chartProps) {
        setSelectedKpiList(chartProps[0]);
      }
    }
  }, [kpiDashboard]);

  const handleFlagSwitchChange = (event: any) => {
    if (event.target.checked) {
      setFlagValue(true);
      updateGlobalFilterKey("global_filter.flag", "green");
    } else {
      setFlagValue(false);
      updateGlobalFilterKey("global_filter.flag", "red");
    }
  };

  useEffect(() => {
    setModalData(selectedSectionData);
  }, [selectedSectionData]);

  const secondHead = _globalFilter.formatted_date;

  const subjectLine =
    uniquePageTitle
      ?.map((title: any) => {
        if (title.master.pageCode == pageCode) {
          return title.master.name;
        }
      })
      .filter((obj: any) => obj != undefined) +
    " - " +
    secondHead;

  const redFlagIcon = (
    <FlagIcon
      style={{
        color: "#ff0000",
      }}
    />
  );
  const greenFlagIcon = (
    <FlagIcon
      style={{
        color: "#7DCEA0",
      }}
    />
  );

  const filteredkpiDashboard = (
    kpiDashboard: any,
    banchMarkValue: any,
    flags: any,
    pageName: any
  ) => {
    var myKPIs: any = [];

    kpiDashboard?.map((lists: any) => {
      const indicatorFunctionValue: any[] = indicatorFunction(
        lists,
        banchMarkValue,
        flags,
        pageName
      );
      let finalIndicatorFunctionValue = null;

      if (indicatorFunctionValue.length >= 1) {
        finalIndicatorFunctionValue = indicatorFunctionValue[0];
      }

      if (finalIndicatorFunctionValue === true) {
        myKPIs.push(lists);
      }
    });

    return myKPIs;
  };

  const finalKPIs =
    _globalFilter &&
    kpiDashboard &&
    (kpiDashboard as any)?.data?.severity !== "ERROR"
      ? filteredkpiDashboard(
          (kpiDashboard as any)?.data,
          _globalFilter.benchmark_toggle,
          flagValue ? "greenflags" : "redflags",
          "dpdashboard"
        )
      : (kpiDashboard as any)?.data;

  return (
    <SidebarWithLayout>
      <Loading
        className={`${
          loading || submitLoader || subTypeLoader === true ? "" : "hide"
        } `}
      />
      <Box
        className="content-wrapper pb-6 pl-6 pr-6 h-full relative"
        ref={screenshotRef}
      >
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 bg-head-dark dp-header-screen red-flag">
          <PanelHeading
            firstHeading={uniquePageTitle?.map(
              (title: any) =>
                title.master.pageCode === pageCode &&
                "Red Flags - " +
                  (title.master.pageCode === "sr_dashboard"
                    ? "Service"
                    : "Sales") +
                  " " +
                  "-"
            )}
            secondHeading={_globalFilter.formatted_date}
            filterOption={true}
            sendData={sendData}
            handleCaptureClick={handleCaptureClick}
          />
        </Box>
        <Box className="flex item-center justify-between mb-3">
          <SwitchSmall
            leftLabel={redFlagIcon}
            rightLabel={greenFlagIcon}
            className="pt-2 sm:pt-0 sm:pb-0 sm:mr-0 switch-small-item  "
            onChange={handleFlagSwitchChange}
            checked={flagValue}
          />
        </Box>
        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box className="dashboard-sales-items h-full">
            <SharingDashboardModal
              isOpen={dashboardSharingModal}
              onClose={handleDashboardSharingModal}
              success={dashboardSharingResponse}
            />

            <Box
              className={
                subType === "classic"
                  ? "classic-view inline-block w-full h-full"
                  : "mordern-view"
              }
            >
              <ModernDashboardItems
                kpiDashboard={(kpiDashboard as any)?.data}
                kpiDashboardSection={kpiDashboardSection}
                pageCode={_globalFilter.global_filter.p_master_page_code}
                openDataDump={openDataDump}
                openModalWithData={openModalWithData}
                handleOpen={handleOpen}
                dashboardKpiLogic={ddDashboardLogic}
                popOverDisplay={popOverDisplay}
                chartTypeSwitch={subType}
                gridClassName={gridClassName}
                pageName={"dpdashboard"}
                flags={flagValue ? "greenflags" : "redflags"}
              />
            </Box>

            {dashboardToModal && (
              <ModalComponent
                openModal={isModalOpen}
                closeModal={handleCloseModal}
                dashboardToModal={dashboardToModal}
                queryParams={qParamsObject}
              />
            )}
            {dumpData && (
              <ModalDataDump
                isOpen={modalDataDump}
                selectedValue={dumpData}
                handleDataDumpPopup={handleDataDumpPopup}
              />
            )}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className={
                subType === "classic"
                  ? "classic-view-modal "
                  : "mordern-view-modal"
              }
            >
              <Box
                className={`insideModal ${
                  subType === "classic"
                    ? "classic-insideModal "
                    : "classic-insideModal"
                }`}
              >
                <Grid
                  className={`dashboard-row flex justify-start ${
                    isSingleRow && subType === "classic"
                      ? "single-row-items"
                      : ""
                  }`}
                  container
                >
                  <Grid
                    className={`single-item min-h-1/2 pt-0-important pb-6`}
                    item
                    xs={12}
                  >
                    <ModernDashboardCard
                      chartTypeSwitch={subType}
                      cardIcon={selectedSectionData?.iconUrl}
                      allKpiData={(kpiDashboard as any)?.data}
                      key={selectedSectionData?.id}
                      pageCode={_globalFilter.global_filter.p_master_page_code}
                      charttitle={selectedSectionData?.name}
                      pageName={"dpdashboard"}
                      flags={flagValue ? "greenflags" : "redflags"}
                      seeMore={""}
                      gridCount={selectedSectionData?.noOfBlock}
                      groupingChildSection={(
                        kpiDashboardSection as any
                      )?.filter(
                        (obj: any) =>
                          obj.groupParentSectionId === selectedSectionData?.id
                      )}
                      singleComponent={true}
                      displayValues={(kpiDashboard as any)?.data}
                      kpiList={finalKPIs
                        ?.filter(
                          (lists: any) =>
                            selectedSectionData?.name === lists.v_section_name
                        )
                        ?.map((lists: any) => [
                          <TableRow
                            key={lists.v_kpiid}
                            className={`listItemCard-modern px-0 cursor-pointer relative ${
                              flagValue
                                ? "greenflags"
                                : !flagValue
                                ? "redflags"
                                : ""
                            }`}
                          >
                            {ddDashboardLogic(
                              lists,
                              "dpdashboard",
                              (kpiDashboard as any)?.data.filter(
                                (kpi: any) =>
                                  kpi.v_group_parent_kpi_id === lists.v_kpiid
                              )
                            )}
                          </TableRow>,
                        ])}
                      kpiListPopover={(kpiDashboard as any)?.data
                        ?.filter(
                          (lists: any) =>
                            selectedSectionData?.name === lists.v_section_name
                        )
                        ?.map((lists: any) => [
                          <TableRow
                            key={lists.v_kpiid}
                            className={`listItemCard-modern relative px-0 cursor-pointer`}
                          >
                            {popOverDisplay(lists, "", undefined)}
                          </TableRow>,
                        ])}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
}
