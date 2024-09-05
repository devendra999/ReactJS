"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { reInitialStates } from "@root/utils/globalFunction";

const SidebarWithLayout = dynamic(() => import("../layout-with-sidebar"));
const CompareListing = dynamic(() => import("@root/components/CompareListing"));

function Compare() {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const [userFilter, setUserFilter] = useState(0);

  const sendUserFilterValue = (param: any) => {
    setUserFilter(param);
  };

  useEffect(() => {
    reInitialStates();
  }, []);

  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 compare-header rm-space-icon-responsive filt-comp res-title-height">
          <PanelHeading
            firstHeading={
              _globalFilter.global_filter.p_master_page_code ==
              "sl_dashboard"
                ? "Compare Tool - Sales - "
                : "Compare Tool - Service - "
            }
            secondHeading={_globalFilter.formatted_date}
            filterOption={true}
            sendDropdownToPage={sendUserFilterValue}
          />
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 fit-content compare-page-main">
          <Box className="dashboard-sales-items compare-filter">
            <CompareListing selectUserFilter={userFilter} />
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
}
export default Compare;
