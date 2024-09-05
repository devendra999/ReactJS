"use client";
import React, { useEffect, useState } from "react";
import SidebarWithLayout from "../../layout-with-sidebar";
import { useUserControllerLoginInformationForView } from "../../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import LoginView from "../components/login-view";
import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import Button from "@mui/material/Button";
import leftarrow from "../../../assets/images/arrow-left.png";
import Image from "next/image";
import Loading from "@root/components/Loading";
interface UserFormProps {
  isEdit: boolean;
  initialLoginViewData: any;
}

const UserForm: React.FC<UserFormProps> = () => {
  const [isEdit, setIsView] = useState(false);
  const searchParams = useSearchParams();
  const [viewId, setViewId] = useState(searchParams.get("id"));

  const {
    data: loginInformationForViewData,
    refetch: refetchLoginInformationForView,
    isLoading: loading,
  } = useUserControllerLoginInformationForView(
    {
      pathParams: {
        id: viewId as unknown as number,
      },
    },
    { enabled: false }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetchLoginInformationForView();
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (viewId && viewId !== null) {
      setIsView(true);
      fetchData();
    }
  }, [viewId, refetchLoginInformationForView]);

  const router = useRouter();
  const handleBackClick = () => {
    // router.back(); // Use router.back() to navigate to the previous page
    router.push(`/user-management?id=3`);
  };
  const columns: GridColDef[] = [
    {
      field: "startLogin",
      headerName: "Login",
      flex: 1,
      cellClassName: "centered-cell ",
      headerClassName: "centered-cell",
      minWidth: 170,
    },
    {
      field: "lastLogin",
      headerName: "Logout",
      flex: 1,
      cellClassName: "centered-cell",
      headerClassName: "centered-cell",
      minWidth: 170,
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
      cellClassName: "centered-cell",
      headerClassName: "centered-cell",
      minWidth: 170,
    },
  ];
  return (
    <>
      <SidebarWithLayout>
        <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
          <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 login-view flex flex-wrap justify-between items-center">
            {/* <Box className="flex justify-between items-center"> */}
            <PanelHeading firstHeading={`Login Activity View - ${loading ? "" : loginInformationForViewData?.userName}`} />

              <Button className="back-left-arrow -translate-y-1 pr-[0] justify-end absolute right-0 order-2">
                <Image
                  src={leftarrow}
                  width={26}
                  height={26}
                  alt="left-arrow"
                  onClick={handleBackClick}
                />
              </Button>
            {/* </Box> */}
          </Box>
          <Loading className={`${loading ? "" : "hide"} `} />
          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 mt-3 sm:mt-0">
            <Box className="dashboard-sales-items">
              <LoginView
                viewData={loginInformationForViewData}
                columns={columns}
              />
            </Box>
          </Box>
        </Box>
      </SidebarWithLayout>
    </>
  );
};
export default UserForm;

