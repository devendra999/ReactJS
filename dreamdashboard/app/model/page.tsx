"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../layout-with-sidebar";
import {
  useGetManyBaseModelControllerModel,
  useModelControllerAllModelGetForCrud,
} from "@root/backend/backendComponents";
import Image from "next/image";
import editicon from "../../assets/icons/edit.svg";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import ModelListing from "@root/components/ModelList";

export default function UserManagement() {
  const router = useRouter();
  const { data: modelsList, refetch: fetchModel } =
    useModelControllerAllModelGetForCrud(
      {
        // queryParams: {
        //   join: ["brand"],
        // }
      },
      { enabled: false }
    );

  useEffect(() => {
    fetchModel();
  }, [fetchModel]);

  const handleCreateModel = () => {
    router.push(`/model/model-form`);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Model Name",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "brand",
      headerName: "Brand Name",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "pageCode",
      headerName: "Dashboard",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
      renderCell: (params) => (
        <Typography
          className={params.value === "Active" ? "text-darkgreen" : "text-red"}
          // style={{
          //   color: params.value === "Active" ? "green" : "red",
          // }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditClick(params.row.id)}>
          <Box
            className="bg-blue2 justify-center min-w-[5.75rem] hover:bg-darkblue inline-flex rounded-md text-blacklight hover:text-white py-2.5 px-4 text-[.8125rem] cursor-pointer group hover:opacity-80  badge badge-primary items-center badge-icon"
            tabIndex={0}
            title="Edit Brand"
          >
            <Image
              src={editicon}
              alt="edit"
              // width={20}
              // height={20}
              className="w-5 h-5 mr-2 group-hover:brightness-0 group-hover:invert"
            />
            Edit
          </Box>
        </IconButton>
      ),
    },
  ];

  const handleEditClick = (id: number) => {
    router.push(`/model/model-form?id=${id}`);
  };

  return (
    <>
      <SidebarWithLayout>
        <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative list-page">
          <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 flex flex-wrap justify-between items-center">
            {/* <Box className="flex justify-between items-center"> */}
              <PanelHeading firstHeading={"Model List"} />
              <ButtonItem
                className="containBtn create-btn mx-1"
                ButtonTitle="Create Model"
                type="button"
                onClick={handleCreateModel}
              />
            {/* </Box> */}
          </Box>

          <Box className="main-wrapper model-page inline-block w-full h-full max-h-full pb-4 mod-wrap">
            <Box className="dashboard-sales-items">
              <ModelListing modelsList={modelsList} columns={columns} />
            </Box>
          </Box>
        </Box>
      </SidebarWithLayout>
    </>
  );
}
