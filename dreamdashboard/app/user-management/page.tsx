"use client";
import React, { useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import SidebarWithLayout from "../layout-with-sidebar";
import UserManagement from "./user-management";
import LoginInformation from "../login-activity-history/page";
import Permission from "../kpi-permission/page";
import MasterPage from "../master-page/page";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = React.useState<number>(() => {
    const id = searchParams.get("id");
    return id ? parseInt(id, 10) : 0;
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // Update the URL without the 'id' query parameter
    router.push('/user-management', undefined, { shallow: true });
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setValue(parseInt(id, 10));
    }
  }, [searchParams]);

  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative management-page">
        <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 gap-0 arrow-in flex flex-wrap justify-between items-center">
          <PanelHeading firstHeading={"User Management"} />
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
                <Tab label="User Management" {...a11yProps(0)} />
                <Tab label="KPI Permission" {...a11yProps(1)} />
                <Tab label="Master Page Permission" {...a11yProps(2)} />
                <Tab label="User Login Activity" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <Box className="tab-panel-item-nav">
              <CustomTabPanel key={0} value={value} index={0}>
                <UserManagement />
              </CustomTabPanel>
              <CustomTabPanel key={1} value={value} index={1}>
                <Permission />
              </CustomTabPanel>
              <CustomTabPanel key={2} value={value} index={2}>
                <MasterPage />
              </CustomTabPanel>
              <CustomTabPanel key={3} value={value} index={3}>
                <LoginInformation />
              </CustomTabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
};

export default FieldMapping;
