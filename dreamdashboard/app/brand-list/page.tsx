"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../layout-with-sidebar";
import BrandListing from "../../components/BrandListing";
import {
  useGetManyBaseBrandControllerBrand,
  useBrandControllerAllBrandsGetForCrud,
} from "@root/backend/backendComponents";
import Image from "next/image";
import editicon from "../../assets/icons/edit.svg";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

export default function UserManagement() {
  const router = useRouter();
  const { data: brandsList, refetch: fetchBrand } =
    useBrandControllerAllBrandsGetForCrud({}, { enabled: false });

  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);

  const handleCreateBrand = () => {
    router.push(`/brand-list/brand-form`);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Brand Name",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "logoUrl",
      headerName: "Logo-1",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "logoUrlTwo",
      headerName: "Logo-2",
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
    router.push(`/brand-list/brand-form?id=${id}`);
  };

  return (
    <>
      <SidebarWithLayout>
        <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative list-page">
          <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 res-title-height flex flex-wrap justify-between items-center">
            {/* <Box className="flex justify-between items-center"> */}
              <PanelHeading firstHeading={"Brand List"} />
              <ButtonItem
                className="containBtn create-btn mx-1 order-2"
                ButtonTitle="Create Brand"
                type="button"
                onClick={handleCreateBrand}
              />
            {/* </Box> */}
          </Box>

          <Box className="main-wrapper system-management-page inline-block w-full h-full max-h-full pb-4 brand-table-wrapper">
            <Box className="dashboard-sales-items">
              <BrandListing brandsList={brandsList?.data} columns={columns} />
            </Box>
          </Box>
        </Box>
      </SidebarWithLayout>
    </>
  );
}
