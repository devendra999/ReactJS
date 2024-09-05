"use client";
import React from "react";
import { Box } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../layout-with-sidebar";
import CommonMappingTable from "@root/components/CommonMappingTable";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const Consultantmapping: React.FC = () => {
  const dynamicData = Array.from({ length: 9 }, (_, index) => ({
    Model: `Consultant name ${index + 1}`,
    Mapping: <TextareaAutosize placeholder="placeholder" />,
  }));

  const dynamicHeaders = ["Consultant", "Mapping"];

  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4">
          <Box className="flex justify-between items-center sm:block">
            <PanelHeading firstHeading={"Consultant Mapping"} />
          </Box>
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box className="dashboard-sales-items">
            <CommonMappingTable
              tableData={dynamicData}
              tableHeaders={dynamicHeaders}
            />
            <Box className="w-100 my-5 flex justify-center">
              <ButtonItem
                className="outlineBtn mx-1"
                ButtonTitle="Cancel"
                type="button"
              />
              <ButtonItem
                className="containBtn mx-1"
                ButtonTitle="Save"
                type="button"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
};

export default Consultantmapping;
