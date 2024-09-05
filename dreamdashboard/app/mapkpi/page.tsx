"use client";
import React from "react";
import { Box } from "@mui/material";

import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../layout-with-sidebar";
import { PanelHeading } from "@root/components/PanelHeading";
import Accordions from "@root/components/Accordion";
import { useImportBucketControllerBrandWiseImportBucketListing } from "../../backend/backendComponents";
import { getFromLocalStorage } from "@root/utils";
import Loading from "@root/components/Loading";

const Servicedashboard: React.FC = () => {

  const brandIdString = getFromLocalStorage('@brand-id');
  let brand = null;
  try {
    brand = brandIdString ? JSON.parse(brandIdString) : null;
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
  const id = brand?.brandId;


  const { data: countResponse, isLoading: loading } = useImportBucketControllerBrandWiseImportBucketListing({
    pathParams: { brandId: id as number },
  });
  let bucketNames: { label: string; value: number }[] = [];
  if (Array.isArray(countResponse?.data)) {
    bucketNames = countResponse?.data.map((bucket) => ({
      label: bucket.name,
      value: bucket.id,

    }));
  }

  return (
    <>
      <SidebarWithLayout>
        <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
          <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 res-title-height flex flex-wrap justify-between items-center">
            {/* <Box className="flex justify-between items-center sm:block"> */}
              <PanelHeading firstHeading={"Map KPIs"} />
            {/* </Box> */}
          </Box>

          {loading ? (<Loading />) : (
            <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 mapkpi-page">
              <Box className="dashboard-sales-items">
                {bucketNames.map((bucket, index) => (
                  <Accordions key={index} name={bucket.label} bucketId={bucket.value} />
                ))}
                {/* <Box className="w-100 my-5 flex justify-center">
            <ButtonItem className="outlineBtn mx-1" ButtonTitle="Cancel" type="button" />
            <ButtonItem className="containBtn mx-1" ButtonTitle="Save" type="button" />
            </Box> */}
              </Box>
            </Box>
          )}
        </Box>
      </SidebarWithLayout>
    </>
  );
};

export default Servicedashboard;
