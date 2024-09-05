import React, { useState } from "react";
import { Typography, Divider, Box, Modal, Popover } from "@mui/material";
import { FilterListing } from "./FilterListing";
import { FilterListingMarquee } from "./FilterListingMarquee";

import { FilterIcons } from "./FilterIcons";
// import SwitchButton from "./SwitchButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { getFromLocalStorage } from "@root/utils";
import { useSelector } from "react-redux";

const SwitchButton = dynamic(() => import("./SwitchButton"));

interface PanelHeadingProps {
  firstHeading: string | any[];
  secondHeading?: string;
  swtichBtn?: boolean;
  sendData?: any;
  filterOption?: boolean;
  className?: string;
  handleChange?: any;
  sendFilterDataToPage?: (param: any) => void;
  sendSelectedDateToPage?: (param: any) => void;
  sendTabDataToPage?: (param: any) => void;
  sendSwitchDataToPage?: (param: any) => void;
  sendBanchMarkDataToPage?: (param: any) => void;
  sendFirstSwitchDataToPage?: (param: any) => void;
  sendDashboardSwitchDataToPage?: (param: any) => void;
  handleCaptureClick?: (param1: any, param2: any) => void;
  sendPageCodeToPage?: (param: any) => void;
  sendDropdownToPage?: (param: any) => void;
  refs?: string;
  cellnum?: any;
  selectedDate?: any;
  sendSwitchValueParentToChild?: any;
  sendSelectYearParentToChild?: any;
  sendBenchmarkParentToChild?: any;
  sendComprFiltrParentToChild?: any;
  modelDataToPage?: (param: any) => void;
  locationDataToPage?: (param: any) => void;
  userDataToPage?: (param: any) => void;
}

export const PanelHeading: React.FC<PanelHeadingProps> = (props) => {
  const globalFilterSelector = (state: any) => state.globalFilter;

  const _globalFilter = useSelector(globalFilterSelector);

  const [parentToChild, setParentToChild] = useState("");

  // const sendSelectedDateToPnlHeading = (param: any) => {
  //   props.sendSelectedDateToPage && props.sendSelectedDateToPage(param);
  // };
  const searchParams = useSearchParams();
  const pageCode = searchParams.get("page");

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleScreenshotClick = (email: any, remarks: any) => {
    props?.handleCaptureClick(email, remarks);
  };

  const dropdownValToPnlHeading = (param: any) => {
    props?.sendDropdownToPage(param);
  };

  const modelDataToPanlHeading = (param: any) => {
    props?.modelDataToPage && props?.modelDataToPage(param);
  };

  const locationDataToPanlHeading = (param: any) => {
    props?.locationDataToPage && props?.locationDataToPage(param);
  };

  const userDataToPanlHeading = (param: any) => {
    props?.userDataToPage && props?.userDataToPage(param);
  };

  return (
    <>
      <Box className="flex justify-between items-center sm:block title-reverse-responsive">
        <Typography
          variant="h1"
          component="h2"
          className={`title-main flex flex-wrap items-center pl-10 text-darkblue w-100 ${
            props.className ? props.className : ""
          }`}
          ref={props.refs}
        >
          {props.firstHeading}
          <Typography
            component="span"
            className="flex flex-wrap items-center pl-2 service-year text-greylight"
          >
            {props.secondHeading}
          </Typography>
        </Typography>
        {props.swtichBtn === true && <SwitchButton sendData={props.sendData} />}
      </Box>
      {props.filterOption === true && (
        <Box className="flex justify-between items-center compareColumn flex-wrap">
          {window.location.pathname !== "/summary" && (
            <FilterListing
              parentToChild={parentToChild}
              ref={props.refs}
              cellnum={props.cellnum}
            />
          )}
          <FilterIcons
            handleCaptureClick={handleScreenshotClick}
            cellnum={props.cellnum}
            sendComprFiltrHeaderToSwitch={props.sendComprFiltrParentToChild}
            dropdownValToPnlHeading={dropdownValToPnlHeading}
            modelDataToPanlHeading={modelDataToPanlHeading}
            locationDataToPanlHeading={locationDataToPanlHeading}
            userDataToPanlHeading={userDataToPanlHeading}
          />
          {pageCode == "compare" && (
            <>
              <InfoOutlinedIcon
                onClick={handleClick}
                className="infoIcon text-white cursor-pointer my-1"
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock={true}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box className="compareInfoIconModel">
                  <Typography variant={"h5"}>
                    {props.cellnum == 1
                      ? _globalFilter.compare_filter.first_column.formatted_date
                      : props.cellnum == 2
                      ? _globalFilter.compare_filter.second_column
                          .formatted_date
                      : props.cellnum == 3
                      ? _globalFilter.compare_filter.third_column.formatted_date
                      : props.cellnum == 4
                      ? _globalFilter.compare_filter.fourth_column
                          .formatted_date
                      : ""}
                  </Typography>
                  <FilterListing
                    parentToChild={parentToChild}
                    ref={props.refs}
                    cellnum={props.cellnum}
                  />
                </Box>
              </Popover>

              <Box className="marquee-data hidden">
                <Typography variant={"h5"}>
                  {props.cellnum == 1
                    ? _globalFilter.compare_filter.first_column.formatted_date
                    : props.cellnum == 2
                    ? _globalFilter.compare_filter.second_column.formatted_date
                    : props.cellnum == 3
                    ? _globalFilter.compare_filter.third_column.formatted_date
                    : props.cellnum == 4
                    ? _globalFilter.compare_filter.fourth_column.formatted_date
                    : ""}
                </Typography>
                <FilterListingMarquee
                  parentToChild={parentToChild}
                  ref={props.refs}
                  cellnum={props.cellnum}
                />
              </Box>
            </>
          )}
        </Box>
      )}
      <Divider className="mt-2 w-full" />
    </>
  );
};
