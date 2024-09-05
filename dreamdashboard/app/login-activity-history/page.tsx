"use client";
import React, { useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import SidebarWithLayout from "../layout-with-sidebar";
import { useUserControllerLoginInformation } from "@root/backend/backendComponents";
import Image from "next/image";
import eyeicon from "../../assets/icons/eye.svg";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import LoginActiveHistory from "@root/components/LoginActiveHistory";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { getFromLocalStorage } from "@root/utils";
import Loading from "@root/components/Loading";

export default function LoginInformation() {
  const userDetails = JSON.parse(getFromLocalStorage("@user-details") || "{}");
  const router = useRouter();

  const { data: loginData, refetch: fetchLoginInformation, isLoading: loading } =
    useUserControllerLoginInformation(
      {
        queryParams: {
          isSuperAdmin: userDetails?.role?.isSuperAdmin,
        },
      },
      { enabled: false }
    );

  useEffect(() => {
    fetchLoginInformation();
  }, [fetchLoginInformation]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "User",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 250,
      renderCell: (params) => (
        <Box>
          {params.row.isActive ? (
            <Box className=" flex items-center svg-icontext-sm">
              <Tooltip title={params.row.name}>
                <Box className="mr-1 login-user">{params.row.name}</Box>
              </Tooltip>
              <CheckCircleOutlineIcon className="text-lightgreen text-sm" />
            </Box>
          ) : (
            <Box className=" flex items-center svg-icontext-sm">
              <Tooltip title={params.row.name}>
                <Box className="mr-1 login-user">{params.row.name}</Box>
              </Tooltip>
              <CancelOutlinedIcon className="text-red text-sm" />
            </Box>
          )}
        </Box>
      ),
    },
    {
      field: "roleName",
      headerName: "Role",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "loginCount",
      headerName: "No. of Login",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "lastLogin",
      headerName: "Last Logged In ",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "loginFrequency",
      headerName: "Frequency",
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
        <IconButton onClick={() => handleEditClick(params.row.id)}>
          <Box
            className="bg-blue2 justify-center min-w-[5.75rem] hover:bg-darkblue inline-flex rounded-md text-blacklight hover:text-white py-2.5 px-4 text-[.8125rem] cursor-pointer group hover:opacity-80  badge badge-primary items-center badge-icon"
            tabIndex={0}
            title="View"
          >
            <Image
              src={eyeicon}
              alt="view"
              // width={20}
              // height={20}
              className="w-5 h-5 mr-2 group-hover:brightness-0 group-hover:invert"
            />
            View
          </Box>
        </IconButton>
      ),
    },
  ];

  const handleEditClick = (id: number) => {
    router.push(`/login-activity-history/login-view?id=${id}`);
  };

  return (
    <>
      <SidebarWithLayout>
        <Box className="content-wrapper pb-6 h-full relative">
          {/* <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 res-title-height flex flex-wrap justify-between items-center"> */}
            {/* <Box className="flex justify-between items-center sm:block"> */}
              {/* <PanelHeading
                className="login-heading"
                firstHeading={"Login Activity history"}
              /> */}
            {/* </Box> */}
          {/* </Box> */}


          {loading ? (
            <Loading className={`${loading ? "" : "hide"} `} />
          ) : (
          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
            <Box className="dashboard-sales-items login-act search-item-content">
              <LoginActiveHistory loginData={loginData} columns={columns}  />
            </Box>
          </Box>
          )}

        </Box>
      </SidebarWithLayout>
    </>
  );
}
