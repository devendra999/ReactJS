import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getFromLocalStorage, addToLocalStorage } from "@root/utils/common";
import Modal from "../components/Modal";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import CustomModel from "./CustomModel";
import { set } from "date-fns";
import ButtonItem from "./ButtonItem";
import { updateGlobalFilterKey } from "@root/app/layout";
import { useSelector } from "react-redux";
import { resetAllFiltersWhenPageCodeChange } from "@root/utils/globalFunction";
const ShareData = dynamic(() => import("./ShareData"));
const CalanderFilter = dynamic(() => import("./CalanderFilter"));
const FilterOptions = dynamic(() => import("./FilterOptions"));
const SwitchSmall = dynamic(() => import("./SwitchSmall"));

interface FilterIconsProps {
  handleCaptureClick: () => void;
  cellnum?: any;
  dropdownVal?: (param: any) => void;
}

export const FilterIcons: React.FC<FilterIconsProps> = (props: any) => {
  const globalFilterSelector = (state: any) => state.globalFilter; // Replace 'globalFilter' with the correct slice name from your Redux store
  const _globalFilter = useSelector(globalFilterSelector);
  const searchParams = useSearchParams();
  const pageCode = searchParams.get("page");
  const sidebarOptions = getFromLocalStorage("@sidebar-options")
    ? JSON.parse(getFromLocalStorage("@sidebar-options") as string)
    : {};

  const [isModalOpenError, setIsModalOpenError] = useState<boolean>(false);

  const [isFilter, setIsFilter] = useState(false);

  const handleDashboardSwitchChange = (event: any) => {
    if (event.target.checked) {
      updateGlobalFilterKey("global_filter.p_master_page_code", "sr_dashboard");
      updateGlobalFilterKey(
        "compare_filter.first_column.p_master_page_code",
        "sr_dashboard"
      );
      updateGlobalFilterKey(
        "compare_filter.second_column.p_master_page_code",
        "sr_dashboard"
      );
      updateGlobalFilterKey(
        "compare_filter.third_column.p_master_page_code",
        "sr_dashboard"
      );
      updateGlobalFilterKey(
        "compare_filter.fourth_column.p_master_page_code",
        "sr_dashboard"
      );
    } else {
      updateGlobalFilterKey("global_filter.p_master_page_code", "sl_dashboard");
      updateGlobalFilterKey(
        "compare_filter.first_column.p_master_page_code",
        "sl_dashboard"
      );
      updateGlobalFilterKey(
        "compare_filter.second_column.p_master_page_code",
        "sl_dashboard"
      );
      updateGlobalFilterKey(
        "compare_filter.third_column.p_master_page_code",
        "sl_dashboard"
      );
      updateGlobalFilterKey(
        "compare_filter.fourth_column.p_master_page_code",
        "sl_dashboard"
      );
    }
    resetAllFiltersWhenPageCodeChange();
  };

  const handleSwitchChange = (event: any) => {
    if (event.target.checked) {
      updateGlobalFilterKey("global_filter.select_year", "ly");
      updateGlobalFilterKey("compare_filter.first_column.select_year", "ly");
      updateGlobalFilterKey("compare_filter.second_column.select_year", "ly");
      updateGlobalFilterKey("compare_filter.third_column.select_year", "ly");
      updateGlobalFilterKey("compare_filter.fourth_column.select_year", "ly");
    } else {
      updateGlobalFilterKey("global_filter.select_year", "cy");
      updateGlobalFilterKey("compare_filter.first_column.select_year", "cy");
      updateGlobalFilterKey("compare_filter.second_column.select_year", "cy");
      updateGlobalFilterKey("compare_filter.third_column.select_year", "cy");
      updateGlobalFilterKey("compare_filter.fourth_column.select_year", "cy");
    }
  };
  const handleBanchMarkChange = (event: any) => {
    if (event.target.checked) {
      if (
        ((_globalFilter.global_filter.date_unit == "custom" ||
          _globalFilter.global_filter.p_model != "" ||
          _globalFilter.global_filter?.p_sc != "") &&
          pageCode != "compare") ||
        ((_globalFilter.compare_filter.first_column.dateUnit == "custom" ||
          _globalFilter.compare_filter.first_column.p_model != "" ||
          _globalFilter.compare_filter.first_column.p_sc != "" ||
          _globalFilter.compare_filter.second_column.date_unit == "custom" ||
          _globalFilter.compare_filter.second_column.p_model != "" ||
          _globalFilter.compare_filter.second_column.p_sc != "" ||
          _globalFilter.compare_filter.third_column.date_unit == "custom" ||
          _globalFilter.compare_filter.third_column.p_model != "" ||
          _globalFilter.compare_filter.third_column.p_sc != "" ||
          _globalFilter.compare_filter.fourth_column.date_unit == "custom" ||
          _globalFilter.compare_filter.fourth_column.p_model != "" ||
          _globalFilter.compare_filter.fourth_column.p_sc != "") &&
          pageCode == "compare")
      ) {
        setIsModalOpenError(true);
        updateGlobalFilterKey("benchmark_toggle", false);
      } else {
        updateGlobalFilterKey("benchmark_toggle", true);
      }
    } else {
      updateGlobalFilterKey("benchmark_toggle", false);
    }
  };

  const handleScreenshotClick = (email: any, remarks: any) => {
    props.handleCaptureClick(email, remarks);
  };

  const sendDropdownVal = (param: any) => {
    props.dropdownValToPnlHeading(param);
  };

  const handleCloseModalError = () => {
    setIsModalOpenError(false);
  };

  const sendModelData = (param: any) => {
    props.modelDataToPanlHeading(param);
  };

  const sendLocationData = (param: any) => {
    props.locationDataToPanlHeading(param);
  };

  const sendUserData = (param: any) => {
    props.userDataToPanlHeading(param);
  };

  return (
    <Box className="filter-area compare-filt inline-block relative pt-1 ml-auto">
      {/* <Box className="more-icon sm:block hidden" onClick={handleClick}>
          <MoreVertIcon />sm:w-full
        </Box> */}

      <Box
        className={`${
          isFilter ? "active" : ""
        } all-icons relative flex items-baseline flex-wrap`}
      >
        {/* <SwitchSmall
            leftLabel="AOC"
            rightLabel="All"
            className="mr-5 sm:mr-0 switch-small-item"
            onChange={handleFirstSwitchChange}
            checked={switchFValue}
          /> */}

        {Object.keys(sidebarOptions).includes("sl_dashboard") &&
          Object.keys(sidebarOptions).includes("sr_dashboard") &&
          window.location.pathname != "/inventory" &&
          window.location.pathname != "/vahan" && (
            <SwitchSmall
              leftLabel="Sales"
              rightLabel="Service"
              className="mx-3 sm:mr-2 switch-small-item ss-switch ml-0 mr-2.5"
              onChange={handleDashboardSwitchChange}
              checked={
                _globalFilter.global_filter.p_master_page_code == "sl_dashboard"
                  ? false
                  : true
              }
            />
          )}
        <Box className="compareDiv flex flex-wrap">
          {_globalFilter.benchmark_toggle == false &&
            window.location.pathname != "/inventory" &&
            window.location.pathname != "/vahan" && (
              <SwitchSmall
                leftLabel="CY"
                rightLabel="LY"
                className="mx-3 sm:mr-2 switch-small-item ml-0 mr-2.5"
                onChange={handleSwitchChange}
                checked={
                  _globalFilter.global_filter.select_year == "cy" ? false : true
                }
              />
            )}
          {_globalFilter.global_filter.date_unit != "custom" &&
            _globalFilter.compare_filter.first_column.date_unit != "custom" &&
            _globalFilter.compare_filter.second_column.date_unit != "custom" &&
            _globalFilter.compare_filter.third_column.date_unit != "custom" &&
            _globalFilter.compare_filter.fourth_column.date_unit != "custom" &&
            window.location.pathname != "/inventory" &&
            window.location.pathname != "/vahan" && (
              <SwitchSmall
                leftLabel="Ratio"
                rightLabel="Benchmark"
                className="mx-3 sm:mr-2 switch-small-item ml-0 mr-2.5"
                onChange={handleBanchMarkChange}
                checked={_globalFilter.benchmark_toggle == true ? true : false}
              />
            )}

          <CalanderFilter cellnum={props.cellnum} />

          <FilterOptions
            cellnum={props.cellnum}
            sendModelData={sendModelData}
            sendLocationData={sendLocationData}
            sendUserData={sendUserData}
          />
          {pageCode == "compare" && (
            <CustomModel dropdownVal={sendDropdownVal} />
          )}

          <ShareData handleCaptureClick={handleScreenshotClick} />
        </Box>
      </Box>
      <Modal
        isOpen={isModalOpenError}
        onClose={handleCloseModalError}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        modalextraclass="modal-small text-center"
      >
        <Box>
          <Typography className="text-center" variant="h6">
            This operation is not allowed when Model and/or SC/SA filters are
            applied or Custom Date Range is selected.
          </Typography>
          <ButtonItem
            className="containBtn mt-5"
            ButtonTitle="Close"
            type="button"
            onClick={handleCloseModalError}
          />
        </Box>
      </Modal>
    </Box>
  );
};
