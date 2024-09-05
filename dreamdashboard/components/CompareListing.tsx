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
  Popover,
  TextField,
  Grid,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { PanelHeading } from "./PanelHeading";
import { useAuthStore } from "../store/auth-store";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
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
import {
  useKpiControllerMappingDashboard,
  useGetManyBaseUserFiltersControllerUserFilters,
  useGetOneBaseUserFiltersControllerUserFilters,
  useUserFiltersControllerSaveUserFilters,
  // useUserFiltersControllerGetFiltersUsingUId,
} from "@root/backend/backendComponents";
// import Loading from "./Loading";

import dynamic from "next/dynamic";
import IconButtonSingle from "./IconButtonSingle";
import ButtonItem from "./ButtonItem";
import { useSelector } from "react-redux";
import { updateGlobalFilterKey } from "@root/app/layout";

const Loading = dynamic(() => import("./Loading"));
interface CompareListingProps {
  selectUserFilter: any;
}

const CompareListing: React.FC<CompareListingProps> = (props: any) => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const searchParams = useSearchParams();
  const pageCode = searchParams.get("page");
  const [filterName, setFilterName] = useState("");
  const [filterMsg, setFilterMsg] = useState("");
  const [userFilterData, setUserFilterData] = useState([]);

  const [dropdownKey, setDropdownKey] = React.useState(0);
  const [compareFiltrs, setCompareFiltrs] = useState<any>("");

  const [kpiName, setKpiName] = useState<any[]>([]);

  const [compareData, setCompareData] = useState<any>({
    firstData: [],
    secondData: [],
    thirdData: [],
    fourthData: [],
  });
  const currentUser = useAuthStore((state) => state.loginData)?.user;
  const [dropdownValue, setDropdownValue] = useState<number | undefined>(0);
  const [swapAB, setSwapAB] = useState<boolean>(false);
  const [swapBC, setSwapBC] = useState<boolean>(false);
  const [swapCD, setSwapCD] = useState<boolean>(false);
  const [toggleCCheck, setToggleCCheck] = useState<boolean>(true);
  const [toggleDCheck, setToggleDCheck] = useState<boolean>(true);
  const [showPopover, setShowPopover] = useState(false);

  const {
    data: kpiDashboard,
    isLoading: loading,
    refetch: dashboardFatching1,
  } = useKpiControllerMappingDashboard(
    {
      queryParams: {
        p_start_date: _globalFilter.compare_filter.first_column.p_start_date,
        p_end_date: _globalFilter.compare_filter.first_column.p_end_date,
        p_model:
          _globalFilter.compare_filter.first_column.p_model != ""
            ? `ARRAY[${_globalFilter.compare_filter.first_column.p_model
                .map((model: any) => `'${model.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.first_column.p_model,
        p_sc:
          _globalFilter.compare_filter.first_column.p_sc != ""
            ? `ARRAY[${_globalFilter.compare_filter.first_column.p_sc
                .map((sc: any) => `'${sc.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.first_column.p_sc,
        p_location:
          _globalFilter.compare_filter.first_column.p_location != ""
            ? `ARRAY[${_globalFilter.compare_filter.first_column.p_location
                .map((location: any) => `'${location.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.first_column.p_location,
        p_master_page_code:
          _globalFilter.compare_filter.first_column.p_master_page_code,
        date_unit: _globalFilter.compare_filter.first_column.date_unit,
        select_year: _globalFilter.compare_filter.first_column.select_year,
        p_user_id: _globalFilter.compare_filter.first_column.p_user_id,
        p_brand_id: _globalFilter.compare_filter.first_column.p_brand_id,
        is_compare: _globalFilter.compare_filter.first_column.is_compare,
      },
    },
    {
      enabled: false,
    }
  );

  const {
    data: kpiDashboard2,
    isLoading: loading1,
    refetch: dashboardFatching2,
  } = useKpiControllerMappingDashboard(
    {
      queryParams: {
        p_start_date: _globalFilter.compare_filter.second_column.p_start_date,
        p_end_date: _globalFilter.compare_filter.second_column.p_end_date,
        p_model:
          _globalFilter.compare_filter.second_column.p_model != ""
            ? `ARRAY[${_globalFilter.compare_filter.second_column.p_model
                .map((model: any) => `'${model.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.second_column.p_model,
        p_sc:
          _globalFilter.compare_filter.second_column.p_sc != ""
            ? `ARRAY[${_globalFilter.compare_filter.second_column.p_sc
                .map((sc: any) => `'${sc.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.second_column.p_sc,
        p_location:
          _globalFilter.compare_filter.second_column.p_location != ""
            ? `ARRAY[${_globalFilter.compare_filter.second_column.p_location
                .map((location: any) => `'${location.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.second_column.p_location,
        p_master_page_code:
          _globalFilter.compare_filter.second_column.p_master_page_code,
        date_unit: _globalFilter.compare_filter.second_column.date_unit,
        select_year: _globalFilter.compare_filter.second_column.select_year,
        p_user_id: _globalFilter.compare_filter.second_column.p_user_id,
        p_brand_id: _globalFilter.compare_filter.second_column.p_brand_id,
        is_compare: _globalFilter.compare_filter.second_column.is_compare,
      },
    },
    {
      enabled: false,
    }
  );

  const {
    data: kpiDashboard3,
    isLoading: loading2,
    refetch: dashboardFatching3,
  } = useKpiControllerMappingDashboard(
    {
      queryParams: {
        p_start_date: _globalFilter.compare_filter.third_column.p_start_date,
        p_end_date: _globalFilter.compare_filter.third_column.p_end_date,
        p_model:
          _globalFilter.compare_filter.third_column.p_model != ""
            ? `ARRAY[${_globalFilter.compare_filter.third_column.p_model
                .map((model: any) => `'${model.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.third_column.p_model,
        p_sc:
          _globalFilter.compare_filter.third_column.p_sc != ""
            ? `ARRAY[${_globalFilter.compare_filter.third_column.p_sc
                .map((sc: any) => `'${sc.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.third_column.p_sc,
        p_location:
          _globalFilter.compare_filter.third_column.p_location != ""
            ? `ARRAY[${_globalFilter.compare_filter.third_column.p_location
                .map((location: any) => `'${location.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.third_column.p_location,
        p_master_page_code:
          _globalFilter.compare_filter.third_column.p_master_page_code,
        date_unit: _globalFilter.compare_filter.third_column.date_unit,
        select_year: _globalFilter.compare_filter.third_column.select_year,
        p_user_id: _globalFilter.compare_filter.third_column.p_user_id,
        p_brand_id: _globalFilter.compare_filter.third_column.p_brand_id,
        is_compare: _globalFilter.compare_filter.third_column.is_compare,
      },
    },
    {
      enabled: false,
    }
  );

  const {
    data: kpiDashboard4,
    isLoading: loading3,
    refetch: dashboardFatching4,
  } = useKpiControllerMappingDashboard(
    {
      queryParams: {
        p_start_date: _globalFilter.compare_filter.fourth_column.p_start_date,
        p_end_date: _globalFilter.compare_filter.fourth_column.p_end_date,
        p_model:
          _globalFilter.compare_filter.fourth_column.p_model != ""
            ? `ARRAY[${_globalFilter.compare_filter.fourth_column.p_model
                .map((model: any) => `'${model.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.fourth_column.p_model,
        p_sc:
          _globalFilter.compare_filter.fourth_column.p_sc != ""
            ? `ARRAY[${_globalFilter.compare_filter.fourth_column.p_sc
                .map((sc: any) => `'${sc.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.fourth_column.p_sc,
        p_location:
          _globalFilter.compare_filter.fourth_column.p_location != ""
            ? `ARRAY[${_globalFilter.compare_filter.fourth_column.p_location
                .map((location: any) => `'${location.label}'`)
                .join(",")}]`
            : _globalFilter.compare_filter.fourth_column.p_location,
        p_master_page_code:
          _globalFilter.compare_filter.fourth_column.p_master_page_code,
        date_unit: _globalFilter.compare_filter.fourth_column.date_unit,
        select_year: _globalFilter.compare_filter.fourth_column.select_year,
        p_user_id: _globalFilter.compare_filter.fourth_column.p_user_id,
        p_brand_id: _globalFilter.compare_filter.fourth_column.p_brand_id,
        is_compare: _globalFilter.compare_filter.fourth_column.is_compare,
      },
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    reInitialStates();
    setKpiName([]);
    setCompareData({
      firstData: [],
      secondData: [],
      thirdData: [],
      fourthData: [],
    });
  }, []);

  useEffect(() => {
    setKpiName([]);
    setCompareData({
      firstData: [],
      secondData: [],
      thirdData: [],
      fourthData: [],
    });
    dashboardFatching1();
    dashboardFatching2();
    dashboardFatching3();
    dashboardFatching4();
  }, [_globalFilter]);

  useEffect(() => {
    setCompareData((prevCompareData: any) => ({
      ...prevCompareData,
      firstData: kpiDashboard as any,
      secondData: kpiDashboard2 as any,
      thirdData: kpiDashboard3 as any,
      fourthData: kpiDashboard4 as any,
    }));
  }, [
    kpiDashboard,
    kpiDashboard2,
    kpiDashboard3,
    kpiDashboard4,
    _globalFilter,
  ]);

  const selectNewFilter = (params: any) => {
    const selectFiltr = {
      first_column: params.filter1,
      second_column: params.filter2,
      third_column:
        params.filter3 != null
          ? _globalFilter.global_filter
          : _globalFilter.compare_filter.third_column,
      fourth_column:
        params.filter4 != null
          ? _globalFilter.global_filter
          : _globalFilter.compare_filter.fourth_column,
    };
    updateGlobalFilterKey(
      "global_filter.select_year",
      params.isCy == true ? "cy" : "ly"
    );
    updateGlobalFilterKey(
      "global_filter.p_master_page_code",
      params.isSaleDashboard == true ? "sl_dashboard" : "sr_dashboard"
    );
    updateGlobalFilterKey("compare_filter", selectFiltr);
    updateGlobalFilterKey(
      "benchmark_toggle",
      params.isSecondaryData == true ? false : true
    );
    setSwapAB(params?.toggleAb);
    setSwapBC(params?.toggleBc);
    setSwapCD(params?.toggleCd);
    params?.filter3 == null ? setToggleCCheck(true) : setToggleCCheck(false);
    params?.filter4 == null ? setToggleDCheck(true) : setToggleDCheck(false);
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
    const allObjects = compareData?.firstData?.data?.concat(
      compareData.secondData?.data || [],
      compareData.thirdData?.data || [],
      compareData.fourthData?.data || []
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

  const getCompareDiff = (
    value1: any,
    value2: any,
    v_unit: any,
    v_is_neg_performance: any
  ) => {
    let classname = null;

    if (!parseFloat(value1)) {
      return "NDF";
    } else {
      if (!parseFloat(value2)) {
        return "NDF";
      } else {
        if (value1 - value2 > 0) {
          classname = v_is_neg_performance ? "redflags" : "greenflags";
        } else if (value1 - value2 < 0) {
          classname = v_is_neg_performance ? "greenflags" : "redflags";
        } else {
          return "NDF";
        }

        return (
          <>
            <TableCell
              className="hidden"
              style={{ width: "0", maxWidth: "0", minWidth: "0" }}
            ></TableCell>
            <TableCell
              style={{ width: "50%", maxWidth: "50%", minWidth: "50%" }}
              className={classname}
            >
              <Typography className="banchmark" component={"span"}>
                {ddformatString(
                  ((parseFloat(value1) - parseFloat(value2)) * 100) /
                    parseFloat(value2),
                  "PERC"
                )}
              </Typography>
            </TableCell>
            <TableCell
              style={{ width: "50%", maxWidth: "50%", minWidth: "50%" }}
              className={classname}
            >
              <Typography className="inverseVresult" component={"span"}>
                {ddformatString(
                  parseFloat(value1) - parseFloat(value2),
                  v_unit
                )}
              </Typography>
            </TableCell>
          </>
        );
      }
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

  useEffect(() => {
    if (_globalFilter.custom_filter == "openmodal") {
      setShowPopover(true);
      // resetDropdown();
    } else {
      // console.log(props.selectUserFilter, "- props.selectUserFilter");
      // setDropdownValue(0);
      // setDropdownValue(parseInt(_globalFilter.custom_filter));
      scrollTopFunction();
    }
  }, [_globalFilter.custom_filter]);

  const handleClosePopover = () => {
    setShowPopover(false);
    resetDropdown();
    setFilterName("");
    setFilterMsg("");
    reInitialStates();
    updateGlobalFilterKey("custom_filter", 0);
  };

  const { mutateAsync: addFilter } = useUserFiltersControllerSaveUserFilters();

  const { data: selectFilterData, refetch: fetchSelectFilterData } =
    useGetOneBaseUserFiltersControllerUserFilters(
      {
        pathParams: {
          id:
            _globalFilter.custom_filter != "openmodal" &&
            (_globalFilter.custom_filter as number),
        },
      },
      {
        enabled: false,
      }
    );

  useEffect(() => {
    if (
      _globalFilter.custom_filter != 0 &&
      _globalFilter.custom_filter != "openmodal"
    ) {
      setKpiName([]);
      setCompareData({
        firstData: [],
        secondData: [],
        thirdData: [],
        fourthData: [],
      });

      if (_globalFilter.custom_filter == 1) {
        const getDateObject = new Date(
          _globalFilter.global_filter.p_start_date
        );
        const gettingYear = getDateObject.getFullYear();
        updateGlobalFilterKey(
          "compare_filter.first_column.p_start_date",
          gettingYear + "-01-01"
        );
        updateGlobalFilterKey(
          "compare_filter.first_column.p_end_date",
          gettingYear + "-03-31"
        );
        updateGlobalFilterKey(
          "compare_filter.first_column.date_unit",
          "quarter"
        );
        updateGlobalFilterKey(
          "compare_filter.first_column.formatted_date",
          "Q1 " + gettingYear
        );

        updateGlobalFilterKey(
          "compare_filter.second_column.p_start_date",
          gettingYear + "-04-01"
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.p_end_date",
          gettingYear + "-06-30"
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.date_unit",
          "quarter"
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.formatted_date",
          "Q2 " + gettingYear
        );

        updateGlobalFilterKey(
          "compare_filter.third_column.p_start_date",
          gettingYear + "-07-01"
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.p_end_date",
          gettingYear + "-09-30"
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.date_unit",
          "quarter"
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.formatted_date",
          "Q3 " + gettingYear
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.p_start_date",
          gettingYear + "-10-01"
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.p_end_date",
          gettingYear + "-12-31"
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.date_unit",
          "quarter"
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.formatted_date",
          "Q4 " + gettingYear
        );
        updateGlobalFilterKey("benchmark_toggle", false);
        updateGlobalFilterKey("global_filter.select_year", "cy");
        updateGlobalFilterKey("compare_filter.first_column.select_year", "cy");
        updateGlobalFilterKey("compare_filter.second_column.select_year", "cy");
        updateGlobalFilterKey("compare_filter.third_column.select_year", "cy");
        updateGlobalFilterKey("compare_filter.fourth_column.select_year", "cy");
        setToggleCCheck(true);
        setToggleDCheck(true);
        setSwapAB(false);
        setSwapBC(false);
        setSwapCD(false);
      } else {
        fetchSelectFilterData();
      }
    }
  }, [fetchSelectFilterData, _globalFilter.custom_filter]);

  useEffect(() => {
    if (_globalFilter.custom_filter == selectFilterData?.id) {
      setKpiName([]);
      setCompareData({
        firstData: [],
        secondData: [],
        thirdData: [],
        fourthData: [],
      });
      selectNewFilter(selectFilterData);
    }
  }, [selectFilterData]);

  const handleClickAB = () => {
    setSwapAB(!swapAB);
  };
  const handleClickBC = () => {
    setSwapBC(!swapBC);
  };
  const handleClickCD = () => {
    setSwapCD(!swapCD);
  };

  const handleToggleOnOffCClick = () => {
    setToggleCCheck(!toggleCCheck);
  };
  const handleToggleOnOffDClick = () => {
    setToggleDCheck(!toggleDCheck);
  };

  // When you want to reset the dropdown, update the key
  const resetDropdown = () => {
    setDropdownKey((prevKey) => prevKey + 1);
    setDropdownValue(0);
  };

  const { data: userFilterCompareData, refetch: fetchUsers } =
    useGetManyBaseUserFiltersControllerUserFilters(
      {},
      {
        enabled: false,
      }
    );

  useEffect(() => {
    if (userFilterCompareData) {
      const userFilterOptions = (userFilterCompareData as any)?.data?.map(
        (user: any) => ({
          label: user.filterName,
          value: user.id,
        })
      );
      setUserFilterData(userFilterOptions);
    }
  }, [userFilterCompareData]);

  useEffect(() => {
    fetchUsers();
  }, [_globalFilter]);

  const saveFilter = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filterName != "") {
      const bodyData: any = {
        filterName: filterName,
        filter1: _globalFilter.compare_filter.first_column,
        filter2: _globalFilter.compare_filter.second_column,
        filter3:
          toggleCCheck == true
            ? null
            : _globalFilter.compare_filter.third_column,
        filter4:
          toggleDCheck == true
            ? null
            : _globalFilter.compare_filter.fourth_column,
        toggleAb: swapAB == true ? true : false,
        toggleBc: swapBC == true ? true : false,
        toggleCd: swapCD == true ? true : false,
        isSaleDashboard:
          _globalFilter.global_filter.p_master_page_code == "sl_dashboard"
            ? true
            : false,
        isCy: _globalFilter.global_filter.select_year == "cy" ? true : false,
        isSecondaryData: _globalFilter.benchmark_toggle == true ? false : true,
        created_by: (currentUser as any)?.userId,
        updated_by: null,
      };
      const response: any = await addFilter({
        body: bodyData,
      });

      if (response?.statusCode == 400) {
        setFilterMsg(response.message);
      } else {
        const userFilterOptions = (userFilterCompareData as any)?.data?.map(
          (user: any) => ({
            label: user.filterName,
            value: user.id,
          })
        );
        setUserFilterData(userFilterOptions);
        handleClosePopover();
        // fetchUsers();
        setFilterName("");
        setToggleCCheck(true);
        setToggleDCheck(true);
        // resetDropdown();
      }
      resetCustomFilter();
    } else {
      setFilterMsg("Filter name can not be blank");
    }
  };

  const handleFilterNameChange = (event: any) => {
    setFilterName(event.target.value);
    setFilterMsg("");
  };

  const distinctSectionName = compareData.firstData?.data && [
    ...new Set(
      compareData.firstData?.data.map((obj: any) => obj.v_section_name)
    ),
  ];

  return (
    <>
      <Popover
        open={showPopover}
        onClose={handleClosePopover}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          ".MuiBackdrop-root": {
            backgroundColor: "rgba(0,0,0,0.5)", // Adjust the color and opacity as needed
          },
          ".MuiPaper-rounded": {
            borderRadius: 0,
            minWidth: 0,
            minHeight: 0,
          },
        }}
      >
        <form onSubmit={saveFilter} className="form-NewCategory-main">
          <Box className=" small-form-control">
            <Typography variant="h3" className="title-main">
              Create User Filter
            </Typography>

            <Grid container className="two-field-group-item">
              <Grid item xs={12} className="mb-0">
                <label className="form-custom-label mb-1">
                  Filter Name
                  <span style={{ color: "red" }}>
                    <sup>*</sup>
                  </span>
                </label>
                <TextField
                  name="name"
                  placeholder="Enter Filter Name"
                  type="text"
                  className="dropdownComponent"
                  value={filterName}
                  onChange={handleFilterNameChange}
                />
                <Box className={"filtr-Error-msg"}>{filterMsg}</Box>
              </Grid>
            </Grid>

            <Box className="w-100   mt-4 flex ">
              <ButtonItem
                className=" mx-1 w-full clear-button"
                ButtonTitle="Cancel"
                onClick={handleClosePopover}
              />

              <ButtonItem
                type="submit"
                className=" mx-1 w-full"
                ButtonTitle="Save"
                // onClick={saveFilter}
              />
            </Box>
          </Box>
        </form>
      </Popover>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 4 }}
        className="compare-page shadow-none overflow-auto"
      >
        <Loading
          className={`${
            loading ||
            loading1 ||
            loading2 ||
            loading3 ||
            kpiName.length === 0 ||
            compareData?.firstData?.data.length === 0 ||
            compareData?.secondData?.data.length === 0 ||
            compareData?.thirdData?.data.length === 0 ||
            compareData?.fourthData?.data.length === 0
              ? ""
              : "hide"
          } `}
        />

        <Table
          style={{ borderSpacing: "0 8px" }}
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="simple-table"
        >
          <TableHead className="card-header sticky top-[-2px] left-0 right-0 z-[5] p-2 bg-gradient-blue">
            <TableRow>
              <TableCell align="center"> KPI</TableCell>
              <TableCell align="center" className="compare-select-td no-switch">
                <Box className="col-title">A</Box>
                <PanelHeading
                  firstHeading={""}
                  className="text-white"
                  secondHeading={
                    _globalFilter.compare_filter.first_column.formatted_date
                  }
                  filterOption={true}
                  cellnum={1}
                  sendComprFiltrParentToChild={compareFiltrs}
                />
              </TableCell>
              <TableCell align="center" className="compare-select-td no-switch">
                <Box className="col-title">B</Box>
                <PanelHeading
                  firstHeading={""}
                  className="text-white"
                  secondHeading={
                    _globalFilter.compare_filter.second_column.formatted_date
                  }
                  filterOption={true}
                  cellnum={2}
                  sendComprFiltrParentToChild={compareFiltrs}
                />
              </TableCell>

              <TableCell
                align="center"
                className={
                  toggleCCheck
                    ? "disable-cellitem width-small compare-select-td"
                    : "compareToggleColumn compare-select-td"
                }
              >
                <Box className="toggleOnOff">
                  {toggleCCheck ? (
                    <ToggleOffIcon
                      style={{ cursor: "pointer", color: "#fff" }}
                      onClick={handleToggleOnOffCClick}
                    />
                  ) : (
                    <ToggleOnIcon
                      style={{ cursor: "pointer", color: "#fff" }}
                      onClick={handleToggleOnOffCClick}
                    />
                  )}
                </Box>
                <Box className="col-title">C</Box>
                <PanelHeading
                  firstHeading={""}
                  className="text-white"
                  secondHeading={
                    _globalFilter.compare_filter.third_column.formatted_date
                  }
                  filterOption={true}
                  cellnum={3}
                  sendComprFiltrParentToChild={compareFiltrs}
                />
              </TableCell>

              <TableCell
                align="center"
                className={
                  toggleDCheck
                    ? "disable-cellitem width-small compare-select-td"
                    : "compareToggleColumn compare-select-td"
                }
              >
                <Box className="toggleOnOff">
                  {toggleDCheck ? (
                    <ToggleOffIcon
                      style={{ cursor: "pointer", color: "#fff" }}
                      onClick={handleToggleOnOffDClick}
                    />
                  ) : (
                    <ToggleOnIcon
                      style={{ cursor: "pointer", color: "#fff" }}
                      onClick={handleToggleOnOffDClick}
                    />
                  )}
                </Box>
                <Box className="col-title">D</Box>
                <PanelHeading
                  firstHeading={""}
                  className="text-white"
                  secondHeading={
                    _globalFilter.compare_filter.fourth_column.formatted_date
                  }
                  filterOption={true}
                  cellnum={4}
                  sendComprFiltrParentToChild={compareFiltrs}
                />
              </TableCell>

              <TableCell align="center" className="compare-col-item">
                <Box className="flex items-center justify-between">
                  <Box className="title-heading flex whitespace-nowrap items-center justify-center text-blue font-normal leading-none bg-white rounded-[12px] h-[26px] mr-[10px] tex-tbody py-[6px] px-[10px]">
                    {swapAB ? "B - A" : "A - B"}
                  </Box>

                  <IconButtonSingle
                    onClick={handleClickAB}
                    className="swap-button-compare"
                    icon={<SwapHorizIcon style={{ color: "#fff" }} />}
                  />
                </Box>
              </TableCell>

              <TableCell
                align="center"
                className={
                  toggleCCheck
                    ? "hide-cellitem compare-col-item"
                    : "compare-col-item"
                }
              >
                <Box className="flex items-center justify-between">
                  <Box className="title-heading flex whitespace-nowrap items-center justify-center text-blue font-normal leading-none bg-white rounded-[12px] h-[26px] mr-[10px] tex-tbody py-[6px] px-[10px]">
                    {swapBC ? "C - B" : "B - C"}
                  </Box>

                  <IconButtonSingle
                    onClick={handleClickBC}
                    className="swap-button-compare"
                    icon={<SwapHorizIcon style={{ color: "#fff" }} />}
                  />
                </Box>
              </TableCell>

              <TableCell
                align="center"
                className={
                  toggleCCheck || toggleDCheck
                    ? "hide-cellitem compare-col-item"
                    : "compare-col-item"
                }
              >
                <Box className="flex items-center justify-between">
                  <Box className="title-heading flex whitespace-nowrap items-center justify-center text-blue font-normal leading-none bg-white rounded-[12px] h-[26px] mr-[10px] text-body py-[6px] px-[10px]">
                    {swapCD ? "D - C" : "C - D"}
                  </Box>

                  <IconButtonSingle
                    onClick={handleClickCD}
                    className="swap-button-compare"
                    icon={<SwapHorizIcon style={{ color: "#fff" }} />}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          {compareData?.firstData?.data &&
            compareData?.secondData?.data &&
            compareData?.thirdData?.data &&
            compareData?.fourthData?.data && (
              <TableBody className="table-body">
                {distinctSectionName.map((section: any, index: any) => (
                  <>
                    <TableRow
                      key={index}
                      className="dashboard-item inside_shadow"
                    >
                      <TableCell
                        align="center"
                        className="commonSizeFonts sectionTitle classic-main-box"
                      >
                        {section}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="commonSizeFonts sectionTitle classic-main-box"
                      >
                        <Table className="list-view overflowHidden">
                          <TableRow className="listItemCard-modern"></TableRow>
                          <TableRow className="listItemCard-modern"></TableRow>
                          <TableRow className="listItemCard-modern">
                            <TableCell></TableCell>
                            {/* {_globalFilter.benchmark_toggle == true && (
                              <TableCell className={`sm-value text-center`}>
                                <span>Target</span>
                              </TableCell>
                            )}
                            {_globalFilter.benchmark_toggle == false && (
                              <TableCell className="sm-value">
                                <Box>
                                  <span>
                                    {formattedCyLyDate(
                                      compareData?.firstData?.data[0]
                                        ?.p_start_date,
                                      compareData?.firstData?.data[0]
                                        ?.p_end_date,
                                      _globalFilter.compare_filter.first_column
                                        .date_unit
                                    )}
                                  </span>
                                </Box>
                              </TableCell>
                            )} */}
                            <TableCell className="sm-value">
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
                            <TableCell className="sm-value">
                              {_globalFilter.benchmark_toggle == true ? (
                                <span>Achmt.</span>
                              ) : (
                                <span>
                                  {formattedCyLyDate(
                                    _globalFilter.compare_filter.first_column
                                      .p_start_date,
                                    _globalFilter.compare_filter.first_column
                                      .p_end_date,
                                    _globalFilter.compare_filter.first_column
                                      .date_unit
                                  )}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        </Table>
                      </TableCell>
                      <TableCell
                        align="left"
                        className="commonSizeFonts sectionTitle classic-main-box"
                      >
                        <Table className="list-view overflowHidden">
                          <TableRow className="listItemCard-modern"></TableRow>
                          <TableRow className="listItemCard-modern"></TableRow>
                          <TableRow className="listItemCard-modern">
                            <TableCell></TableCell>
                            {/* {_globalFilter.benchmark_toggle == true && (
                              <TableCell className={`sm-value text-center`}>
                                <span>Target</span>
                              </TableCell>
                            )}
                            {_globalFilter.benchmark_toggle == false && (
                              <TableCell className="sm-value">
                                <Box>
                                  <span>
                                    {formattedCyLyDate(
                                      compareData?.secondData?.data[0]
                                        .p_start_date,
                                      compareData?.secondData?.data[0]
                                        .p_end_date,
                                      _globalFilter.compare_filter.second_column
                                        .date_unit
                                    )}
                                  </span>
                                </Box>
                              </TableCell>
                            )} */}
                            <TableCell className="sm-value">
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
                            <TableCell className="sm-value">
                              {_globalFilter.benchmark_toggle == true ? (
                                <span>Achmt.</span>
                              ) : (
                                <span>
                                  {formattedCyLyDate(
                                    _globalFilter.compare_filter.second_column
                                      .p_start_date,
                                    _globalFilter.compare_filter.second_column
                                      .p_end_date,
                                    _globalFilter.compare_filter.second_column
                                      .date_unit
                                  )}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        </Table>
                      </TableCell>
                      <TableCell
                        align="left"
                        className={
                          toggleCCheck
                            ? "disable-cellitem commonSizeFonts width-small classic-main-box"
                            : "commonSizeFonts sectionTitle classic-main-box"
                        }
                      >
                        {!toggleCCheck && (
                          <Table className="list-view overflowHidden">
                            <TableRow className="listItemCard-modern"></TableRow>
                            <TableRow className="listItemCard-modern"></TableRow>
                            <TableRow className="listItemCard-modern">
                              <TableCell></TableCell>
                              {/* {_globalFilter.benchmark_toggle == true && (
                                <TableCell className={`sm-value text-center`}>
                                  <span>Target</span>
                                </TableCell>
                              )}
                              {_globalFilter.benchmark_toggle == false && (
                                <TableCell className="sm-value">
                                  <Box>
                                    <span>
                                      {formattedCyLyDate(
                                        compareData?.thirdData?.data[0]
                                          .p_start_date,
                                        compareData?.thirdData?.data[0]
                                          .p_end_date,
                                        _globalFilter.compare_filter
                                          .third_column.date_unit
                                      )}
                                    </span>
                                  </Box>
                                </TableCell>
                              )} */}
                              <TableCell className="sm-value">
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
                              <TableCell className="sm-value">
                                {_globalFilter.benchmark_toggle == true ? (
                                  <span>Achmt.</span>
                                ) : (
                                  <span>
                                    {formattedCyLyDate(
                                      _globalFilter.compare_filter.third_column
                                        .p_start_date,
                                      _globalFilter.compare_filter.third_column
                                        .p_end_date,
                                      _globalFilter.compare_filter.third_column
                                        .date_unit
                                    )}
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          </Table>
                        )}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={
                          toggleDCheck
                            ? "disable-cellitem commonSizeFonts width-small classic-main-box"
                            : "commonSizeFonts sectionTitle classic-main-box"
                        }
                      >
                        {!toggleDCheck && (
                          <Table className="list-view overflowHidden">
                            <TableRow className="listItemCard-modern"></TableRow>
                            <TableRow className="listItemCard-modern"></TableRow>
                            <TableRow className="listItemCard-modern">
                              <TableCell></TableCell>
                              {/* {_globalFilter.benchmark_toggle == true && (
                                <TableCell className={`sm-value text-center`}>
                                  <span>Target</span>
                                </TableCell>
                              )}
                              {_globalFilter.benchmark_toggle == false && (
                                <TableCell className="sm-value">
                                  <Box>
                                    <span>
                                      {formattedCyLyDate(
                                        compareData?.fourthData?.data[0]
                                          .p_start_date,
                                        compareData?.fourthData?.data[0]
                                          .p_end_date,
                                        _globalFilter.compare_filter
                                          .fourth_column.date_unit
                                      )}
                                    </span>
                                  </Box>
                                </TableCell>
                              )} */}
                              <TableCell className="sm-value">
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
                              <TableCell className="sm-value">
                                {_globalFilter.benchmark_toggle == true ? (
                                  <span>Achmt.</span>
                                ) : (
                                  <span>
                                    {formattedCyLyDate(
                                      _globalFilter.compare_filter.fourth_column
                                        .p_start_date,
                                      _globalFilter.compare_filter.fourth_column
                                        .p_end_date,
                                      _globalFilter.compare_filter.fourth_column
                                        .date_unit
                                    )}
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          </Table>
                        )}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="commonSizeFonts sectionTitle classic-main-box"
                      ></TableCell>
                      <TableCell
                        align="center"
                        className="commonSizeFonts sectionTitle classic-main-box"
                      ></TableCell>
                      <TableCell
                        align="center"
                        className="commonSizeFonts sectionTitle classic-main-box"
                      ></TableCell>
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
                            <TableCell
                              align="center"
                              className="commonSizeFonts classic-main-box"
                            >
                              <Table className="list-view overflowHidden">
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern">
                                  {compareData &&
                                    compareData.firstData?.data &&
                                    compareData.firstData?.data
                                      .filter(
                                        (firstKpi: any) =>
                                          kpiname.split(":")[0] ==
                                            firstKpi.v_kpiid &&
                                          kpiname.split(":")[1] ==
                                            firstKpi.v_kpi_code &&
                                          kpiname.split(":")[2] ==
                                            firstKpi.v_display_column &&
                                          firstKpi.v_kpiid &&
                                          firstKpi.v_section_name == section
                                      )
                                      .map((lists: any) => {
                                        return ddDashboardLogic(lists, "");
                                      })}
                                </TableRow>
                              </Table>
                            </TableCell>
                            <TableCell
                              align="center"
                              className="commonSizeFonts classic-main-box"
                            >
                              <Table className="list-view overflowHidden">
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern">
                                  {compareData &&
                                    compareData.secondData?.data &&
                                    compareData.secondData?.data
                                      .filter(
                                        (firstKpi: any) =>
                                          kpiname.split(":")[0] ==
                                            firstKpi.v_kpiid &&
                                          kpiname.split(":")[1] ==
                                            firstKpi.v_kpi_code &&
                                          kpiname.split(":")[2] ==
                                            firstKpi.v_display_column &&
                                          firstKpi.v_kpiid &&
                                          firstKpi.v_section_name == section
                                      )
                                      .map((lists: any) => {
                                        return ddDashboardLogic(lists, "");
                                      })}
                                </TableRow>
                              </Table>
                            </TableCell>
                            <TableCell
                              align="center"
                              className={
                                toggleCCheck
                                  ? "disable-cellitem commonSizeFonts width-small classic-main-box"
                                  : "commonSizeFonts classic-main-box"
                              }
                            >
                              <Table className="list-view overflowHidden">
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern justify-center">
                                  {toggleCCheck ? (
                                    <TableCell
                                      align="center"
                                      className="justify-center"
                                    >
                                      NDF
                                    </TableCell>
                                  ) : (
                                    compareData &&
                                    compareData.thirdData?.data &&
                                    compareData.thirdData?.data
                                      .filter(
                                        (firstKpi: any) =>
                                          kpiname.split(":")[0] ==
                                            firstKpi.v_kpiid &&
                                          kpiname.split(":")[1] ==
                                            firstKpi.v_kpi_code &&
                                          kpiname.split(":")[2] ==
                                            firstKpi.v_display_column &&
                                          firstKpi.v_kpiid &&
                                          firstKpi.v_section_name == section
                                      )
                                      .map((lists: any) => {
                                        return ddDashboardLogic(lists, "");
                                      })
                                  )}
                                </TableRow>
                              </Table>
                            </TableCell>
                            <TableCell
                              align="center"
                              className={
                                toggleDCheck
                                  ? "disable-cellitem commonSizeFonts width-small classic-main-box"
                                  : "commonSizeFonts classic-main-box"
                              }
                            >
                              <Table className="list-view overflowHidden">
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern justify-center">
                                  {toggleDCheck ? (
                                    <TableCell
                                      align="center"
                                      className="justify-center"
                                    >
                                      NDF
                                    </TableCell>
                                  ) : (
                                    compareData &&
                                    compareData.fourthData?.data &&
                                    compareData.fourthData?.data
                                      .filter(
                                        (firstKpi: any) =>
                                          kpiname.split(":")[0] ==
                                            firstKpi.v_kpiid &&
                                          kpiname.split(":")[1] ==
                                            firstKpi.v_kpi_code &&
                                          kpiname.split(":")[2] ==
                                            firstKpi.v_display_column &&
                                          firstKpi.v_kpiid &&
                                          firstKpi.v_section_name == section
                                      )
                                      .map((lists: any) => {
                                        return ddDashboardLogic(lists, "");
                                      })
                                  )}
                                </TableRow>
                              </Table>
                            </TableCell>

                            <TableCell
                              align="center"
                              className="commonSizeFonts classic-main-box"
                            >
                              <Table className="list-view overflowHidden">
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern justify-center">
                                  {compareData &&
                                    compareData.firstData?.data &&
                                    compareData.secondData?.data &&
                                    compareData.firstData?.data
                                      .filter(
                                        (firstKpi: any) =>
                                          kpiname.split(":")[0] ==
                                            firstKpi.v_kpiid &&
                                          kpiname.split(":")[1] ==
                                            firstKpi.v_kpi_code &&
                                          kpiname.split(":")[2] ==
                                            firstKpi.v_display_column &&
                                          firstKpi.v_kpiid &&
                                          firstKpi.v_section_name == section
                                      )
                                      .map((firstLists: any) => {
                                        const secondList =
                                          compareData.secondData?.data.find(
                                            (secondKpi: any) =>
                                              kpiname.split(":")[0] ==
                                                secondKpi.v_kpiid &&
                                              kpiname.split(":")[1] ==
                                                secondKpi.v_kpi_code &&
                                              kpiname.split(":")[2] ==
                                                secondKpi.v_display_column &&
                                              secondKpi.v_kpiid
                                          );
                                        const firstValue = parseFloat(
                                          firstLists?.v_result
                                        );
                                        const secondValue = parseFloat(
                                          secondList?.v_result
                                        );

                                        return getCompareDiff(
                                          swapAB ? secondValue : firstValue,
                                          swapAB ? firstValue : secondValue,
                                          firstLists?.v_value_unit,
                                          firstLists?.v_is_neg_performance
                                        );
                                      })}
                                </TableRow>
                              </Table>
                            </TableCell>
                            <TableCell
                              align="center"
                              className={
                                toggleCCheck
                                  ? "hide-cellitem commonSizeFonts classic-main-box"
                                  : "commonSizeFonts classic-main-box"
                              }
                            >
                              <Table className="list-view overflowHidden">
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern justify-center">
                                  {toggleCCheck
                                    ? "NDF"
                                    : compareData &&
                                      compareData.secondData?.data &&
                                      compareData.thirdData?.data &&
                                      compareData.secondData?.data
                                        .filter(
                                          (secondKpi: any) =>
                                            kpiname.split(":")[0] ==
                                              secondKpi.v_kpiid &&
                                            kpiname.split(":")[1] ==
                                              secondKpi.v_kpi_code &&
                                            kpiname.split(":")[2] ==
                                              secondKpi.v_display_column &&
                                            secondKpi.v_kpiid &&
                                            secondKpi.v_section_name == section
                                        )
                                        .map((secondLists: any) => {
                                          const thirdList =
                                            compareData.thirdData?.data.find(
                                              (thirdKpi: any) =>
                                                kpiname.split(":")[0] ==
                                                  thirdKpi.v_kpiid &&
                                                kpiname.split(":")[1] ==
                                                  thirdKpi.v_kpi_code &&
                                                kpiname.split(":")[2] ==
                                                  thirdKpi.v_display_column &&
                                                thirdKpi.v_kpiid
                                            );

                                          const secondValue = parseFloat(
                                            secondLists?.v_result
                                          );
                                          const thirdValue = parseFloat(
                                            thirdList?.v_result
                                          );

                                          return getCompareDiff(
                                            swapBC ? thirdValue : secondValue,
                                            swapBC ? secondValue : thirdValue,
                                            secondLists?.v_value_unit,
                                            secondLists?.v_is_neg_performance
                                          );

                                          // return null; // Handle if no corresponding secondList is found
                                        })}
                                </TableRow>
                              </Table>
                            </TableCell>
                            <TableCell
                              align="center"
                              className={
                                toggleCCheck || toggleDCheck
                                  ? "hide-cellitem commonSizeFonts classic-main-box"
                                  : "commonSizeFonts classic-main-box"
                              }
                            >
                              <Table className="list-view overflowHidden">
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern"></TableRow>
                                <TableRow className="listItemCard-modern justify-center">
                                  {toggleCCheck || toggleDCheck
                                    ? "NDF"
                                    : compareData &&
                                      compareData.thirdData?.data &&
                                      compareData.fourthData?.data &&
                                      compareData.thirdData?.data
                                        .filter(
                                          (thirdKpi: any) =>
                                            kpiname.split(":")[0] ==
                                              thirdKpi.v_kpiid &&
                                            kpiname.split(":")[1] ==
                                              thirdKpi.v_kpi_code &&
                                            kpiname.split(":")[2] ==
                                              thirdKpi.v_display_column &&
                                            thirdKpi.v_kpiid &&
                                            thirdKpi.v_section_name == section
                                        )
                                        .map((thirdLists: any) => {
                                          const fourthList =
                                            compareData.fourthData?.data.find(
                                              (secondKpi: any) =>
                                                kpiname.split(":")[0] ==
                                                  secondKpi.v_kpiid &&
                                                kpiname.split(":")[1] ==
                                                  secondKpi.v_kpi_code &&
                                                kpiname.split(":")[2] ==
                                                  secondKpi.v_display_column &&
                                                secondKpi.v_kpiid
                                            );

                                          const thirdValue = parseFloat(
                                            thirdLists?.v_result
                                          );
                                          const fourthValue = parseFloat(
                                            fourthList?.v_result
                                          );

                                          return getCompareDiff(
                                            swapCD ? fourthValue : thirdValue,
                                            swapCD ? thirdValue : fourthValue,
                                            thirdLists?.v_value_unit,
                                            thirdLists?.v_is_neg_performance
                                          );

                                          // return null; // Handle if no corresponding secondList is found
                                        })}
                                </TableRow>
                              </Table>
                            </TableCell>
                          </TableRow>
                        ))}
                  </>
                ))}
              </TableBody>
            )}
        </Table>
      </TableContainer>
    </>
  );
};

export default CompareListing;
