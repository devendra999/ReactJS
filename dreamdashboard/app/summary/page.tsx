"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { reInitialStates } from "@root/utils/globalFunction";

const SidebarWithLayout = dynamic(() => import("../layout-with-sidebar"));
const Summary = dynamic(() => import("@root/components/Summary"));

function SummaryPage() {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const [modelData, setModelData] = useState<any[]>([]);
  const [locationData, setLocationData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);

  const sendModelData = (param: any) => {
    setModelData(param);
  };
  const sendLocationData = (param: any) => {
    setLocationData(param);
  };
  const sendUserData = (param: any) => {
    setUserData(param);
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
              _globalFilter.global_filter.p_master_page_code == "sl_dashboard"
                ? "Summary - Sales - "
                : "Summary - Service - "
            }
            secondHeading={_globalFilter.formatted_date}
            filterOption={true}
            modelDataToPage={sendModelData}
            locationDataToPage={sendLocationData}
            userDataToPage={sendUserData}
          />
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 fit-content compare-page-main">
          <Box className="dashboard-sales-items compare-filter">
            <Summary
              modelData={modelData}
              locationData={locationData}
              userData={userData}
            />
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
}
export default SummaryPage;
