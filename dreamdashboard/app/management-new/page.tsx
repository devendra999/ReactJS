"use client";
import React, { useState } from "react";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import SidebarWithLayout from "../layout-with-sidebar";
import DealerManagement from "@root/components/DealerManagement";
import { KPIManagement } from "@root/components/KpiManagement";
import BrandManagement from "@root/components/brand/BrandManagement";
import PageManagement from "@root/components/PageManagement";
import SectionManagement from "@root/components/SectionManagement";
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
        <Box className="mt-4">
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
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleFileUpload = (file: File | null) => {
    setError(null);
    setSelectedFile(file);
  };

  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative management-page">
        <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 gap-0 arrow-in flex flex-wrap justify-between items-center">
          <PanelHeading firstHeading={"All Management"} />
        </Box>
        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box sx={{ width: "100%" }}>
            <Box
              className=" flex items-center flex-wrap justify-between"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Dealer Management" {...a11yProps(0)} />
                <Tab label="Brand Management" {...a11yProps(1)} />
                <Tab label="Page Management" {...a11yProps(2)} />
                <Tab label="Section Management" {...a11yProps(3)} />
                <Tab label="KPI Management" {...a11yProps(4)} />
              </Tabs>
              {/* <Box className=" py-2">
                <Button className="btn w-80 transparent mr-[10px] animate__animated animate__fadeIn animate__delay-1s">
                  Cancel
                </Button>
                <Button className="btn w-80 animate__animated animate__fadeIn animate__delay-1s">
                  Save
                </Button>
              </Box> */}
            </Box>
            <Box className="tab-panel-item-nav">
              <CustomTabPanel key={0} value={value} index={0}>
                <DealerManagement handleFileUpload={handleFileUpload} />
              </CustomTabPanel>
              <CustomTabPanel key={1} value={value} index={1}>
                <BrandManagement />
              </CustomTabPanel>
              <CustomTabPanel key={2} value={value} index={2}>
                <PageManagement />
              </CustomTabPanel>
              <CustomTabPanel key={3} value={value} index={3}>
                <SectionManagement />
              </CustomTabPanel>
              <CustomTabPanel key={4} value={value} index={4}>
                <KPIManagement />
              </CustomTabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
};

export default FieldMapping;
