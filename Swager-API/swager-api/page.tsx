"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import {
  useGetManyBaseClaimsControllerClaims,
  useDeleteOneBaseClaimsControllerClaims,
} from "@root/backend/backendComponents";
import Image from "next/image";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import IconButtonSingle from "@root/components/IconButtonSingle";
import EditIconImage from "../../assets/icons/edit.svg";
import ClaimListing from "@root/components/ClaimListing";
import { DeleteForeverRounded } from "@mui/icons-material";

export interface ProductType {
  id: number;
  name: string;
}

export interface ClaimType {
  id?: number;
  name?: string | undefined;
  productId?: any;
  products?: ProductType[];
  productName?: string;
}

export default function UserManagement() {
  const router = useRouter();
  const [allClaimsData, setAllClaimsData] = useState<ClaimType[]>([]);

  const { mutateAsync: deleteClaim } = useDeleteOneBaseClaimsControllerClaims();

  const { data: claimsData, refetch: fetchClaim } =
    useGetManyBaseClaimsControllerClaims(
      {
        queryParams: {
          join: ["products"],
        },
      },
      { enabled: false }
    );

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Claim Name",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
      renderCell: (params) => (
        <>
          <IconButtonSingle
            onClick={() => handleEditClick(params.row.id)}
            className=""
            iconImage={
              <Image
                src={EditIconImage}
                height={20}
                width={20}
                alt="edit icon"
              />
            }
          />
          <IconButtonSingle
            icon={<DeleteForeverRounded className="text-red" />}
            onClick={() => handleDeleteClick(params.row.id)}
          />
        </>
      ),
    },
  ];

  const handleCreateClaim = () => {
    router.push(`/claims/claims-form`);
  };

  const handleEditClick = (id: number) => {
    router.push(`/claims/claims-form?id=${id}`);
  };

  const handleDeleteClick = async (selectedValue: number) => {
    if (selectedValue) {
      try {
        const response = await deleteClaim({
          pathParams: { id: selectedValue },
        });
        console.log("Delete response:", response);
        fetchClaim();
      } catch (error) {
        console.error("Error deleting Claim:", error);
      }
    }
  };

  useEffect(() => {
    fetchClaim();
  }, [fetchClaim]);

  useEffect(() => {
    if (claimsData) {
      setAllClaimsData(
        (claimsData as any).map((e: any) => ({
          ...e,
          productName: e?.products?.name,
        }))
      );
    }
  }, [claimsData]);

  return (
    <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative list-page">
      <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 mb-3 res-title-height flex flex-wrap justify-between items-center">
        <PanelHeading firstHeading={"Claim List"} />
        <ButtonItem
          className="containBtn create-btn mx-1 order-2"
          ButtonTitle="Create Claim"
          type="button"
          onClick={handleCreateClaim}
        />
      </Box>

      <Box className="main-wrapper system-management-page inline-block w-full h-full max-h-full pb-4 role-table-wrapper">
        <Box className="dashboard-sales-items">
          <ClaimListing claimsData={allClaimsData} columns={columns} />
        </Box>
      </Box>
    </Box>
  );
}
