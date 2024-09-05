"use client";
import React, { useState } from "react";
import { Box, IconButton, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../../../layout-with-sidebar";
import CommonMappingTable from "@root/components/CommonMappingTable";
import MultipleSelectPlaceholder from "@root/components/FilterDropdown";
import {
  useBranchControllerBranchName,
  useBranchControllerMapping,
  useGetManyBaseBranchControllerBranch,
} from "../../../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import Branchmapping from "@root/components/field-mapping/branch-mapping";
import Modelmapping from "@root/components/field-mapping/model-mapping";
import Consultantmapping from "@root/components/field-mapping/consultant-mapping";
import { useAuthStore } from "@root/store/auth-store";
import { getFromLocalStorage } from "@root/utils";
import Loading from "@root/components/Loading";

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
      {value === index && (
        <Box className='mt-4'>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FieldMapping: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bucketId = searchParams.get('bucketId')
  const dynamicHeaders = ["Branch Name", "Mapping"];
  const { mutateAsync: submitBranchMapping, isLoading: submitLoader } =
    useBranchControllerMapping();
  const currentUser = useAuthStore((state) => state.loginData)?.user;
  const storedbrandId = getFromLocalStorage('@brand-id');
  const userId = currentUser?.userId;
  // const brandId = JSON.parse(storedbrandId as unknown as string)?.brandId
  let brandId = null;
  if (storedbrandId) {
    try {
      const parsedData = JSON.parse(storedbrandId);
      brandId = parsedData.brandId;
    } catch (error) {
      console.error("Error parsing storedbrandId:", error);
    }
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 gap-0 arrow-in">
          <Box className="flex justify-between items-center sm:block left-title">
            <PanelHeading firstHeading={"Field Mapping"} />
            <Box className='backarrow-set'>
              <Tooltip title='Back To File Listing'>
                <IconButton onClick={() => router.push(`/bucket-management/list?bucketId=${bucketId}`)} >
                  <ArrowBackIcon className="text-skyblue text-lg " />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          {submitLoader ? (<Loading />) : (
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="mt-4"
                >
                  <Tab label="Branch Mapping" {...a11yProps(0)} />
                  <Tab label="Model Mapping" {...a11yProps(1)} />
                  <Tab label="Consultant Mapping" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <Box className='tab-panel-item-nav'>
                <CustomTabPanel key={0} value={value} index={0} >
                  <Branchmapping userId={userId} brandId={brandId} />
                </CustomTabPanel>
                <CustomTabPanel key={1} value={value} index={1}>
                  <Modelmapping userId={userId} brandId={brandId} />
                </CustomTabPanel>
                <CustomTabPanel key={2} value={value} index={2}>
                  <Consultantmapping userId={userId} brandId={brandId} />
                </CustomTabPanel>

              </Box>

            </Box>
          )}
        </Box>
      </Box>
    </SidebarWithLayout>
  );
};

export default FieldMapping;
