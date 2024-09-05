"use client";
import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import Sidebar from "@root/components/Sidebar";
import BucketCard from "@root/components/BucketCard";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import { FooterItem } from "./Footer";

function BucketManagement() {
  const cardData = [
    { title: "Bucket Name 1", list: [['Azure Data sheet'], ['Azure Database sheet'], ['Azure network sheet']] },
    { title: "Bucket Name 2", list: [['Azure Database sheet'], ['Azure Data sheet'], ['Azure network sheet']] },
    { title: "Bucket Name 3", list: [['Azure Data sheet'], ['Azure Database sheet'], ['Azure network sheet'], ['Azure Database sheet'],] },
    { title: "Bucket Name 4", list: [['Azure Data sheet'], ['Azure Database sheet'], ['Azure network sheet'], ['Azure Database sheet'],] },
  ];
  return (
    <>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="c-wrapper">
          <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4">
            <Box className="flex justify-between items-center sm:block">
              <PanelHeading
                firstHeading={"Bucket Management"}
              />
              <ButtonItem className="containBtn create-btn mx-1" ButtonTitle="Create Bucket" type="button" />
            </Box>
          </Box>

          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
            <Box className="dashboard-sales-items">
              <Box>
                <BucketCard data={cardData} />
              </Box>
            </Box>
          </Box>
          <Box className="footer-bottom">
            <FooterItem />
          </Box>
        </Box>
      </Box>

    </>
  );
}
export default BucketManagement;