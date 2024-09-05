"use client";
import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, StyledEngineProvider } from "@mui/material";
// import Sidebar from "@root/components/Sidebar";
// import Loading from "@root/components/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMe } from "../utils/auth/useAuth";
import { getFromLocalStorage } from "@root/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import 'animate.css/animate.min.css';
import { useAuthStore } from "@root/store/auth-store";

import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@root/components/Sidebar"));
const Loading = dynamic(() => import("@root/components/Loading"));

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxl: true;
  }
}

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const queryClient = new QueryClient();
const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1500,
    },
  },
});

export default function SidebarWithLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const dispatch = useDispatch();

  // const updateGlobalFilter = (newState: Partial<GlobalFilterState>) => {
  //   dispatch({ type: SET_GLOBAL_FILTER_STATE, payload: newState });
  // };

  const currentUser = useAuthStore((state) => state.loginData)?.user;
  // const currentUser = getFromLocalStorage("@user-details")
  //   ? JSON.parse(getFromLocalStorage("@user-details") as string)
  //   : {};
  const sidebarOptions = getFromLocalStorage("@sidebar-options")
    ? JSON.parse(getFromLocalStorage("@sidebar-options") as string)
    : {};
  const isLoading = useMe();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = searchParams.get("page");
  // const [dateUnit, setDateUnit] = useState("month");

  // const globalFilter = JSON.parse(
  //   getFromLocalStorage("@global-filter") || "{}"
  // );
  // const filterSelectYear = JSON.parse(
  //   getFromLocalStorage("@filter-selectyear") || "{}"
  // );
  // const filterDate = JSON.parse(getFromLocalStorage("@filter-date") || "{}");
  // const brandId = JSON.parse(getFromLocalStorage("@brand-id") || "{}");

  // const comparePageCode = JSON.parse(
  //   getFromLocalStorage("@compare-pageCode") || "{}"
  // );

  // const banchMarkValue = JSON.parse(
  //   getFromLocalStorage("@banchmark-value") || "{}"
  // );

  // useEffect(() => {
  //   const handleBeforeUnload = async () => {
  //     const isRemembered = JSON.parse(
  //       getFromLocalStorage("@rememberMe") || "{}"
  //     );
  //     if (!isRemembered) {
  //       localStorage.clear();
  //     }
  //   };
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("beforeunload", handleBeforeUnload);
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (!isLoading) {
      const keys = Object.keys(sidebarOptions);
      if (params === null) {
        if (
          !keys.includes("bucket_management") &&
          pathname.includes("bucket")
        ) {
          router.push("/landing");
        } else if (
          !keys.includes("data_tracker") &&
          pathname.includes("tracker")
        ) {
          router.push("/landing");
        } else if (
          !keys.includes("filter_kpi") &&
          pathname.includes("filter-kpi")
        ) {
          router.push("/landing");
        } else if (
          !keys.includes("user_management") &&
          pathname.includes("user-management")
        ) {
          router.push("/landing");
        } else if (!keys.includes("branch") && pathname.includes("branch")) {
          router.push("/landing");
        } else if (!keys.includes("roles") && pathname.includes("roles")) {
          router.push("/landing");
        } else if (!keys.includes("models") && pathname.includes("model")) {
          router.push("/landing");
        } else if (
          !keys.includes("upload") &&
          pathname.includes("upload-user")
        ) {
          router.push("/upload-user");
        } else if (
          !keys.includes("brands") &&
          pathname.includes("brand-list")
        ) {
          router.push("/landing");
        } else if (
          !keys.includes("management-new") &&
          pathname.includes("management-new")
        ) {
          router.push("/landing");
        }
        // else if (
        //   !keys.includes("mst_page_permission") &&
        //   pathname.includes("master-page")
        // ) {
        //   router.push("/landing");
        // } else if (
        //   !keys.includes("kpi_permission") &&
        //   pathname.includes("kpi-permission")
        // ) {
        //   router.push("/landing");
        // } else if (
        //   !keys.includes("usr_login_activity") &&
        //   pathname.includes("login-activity-history")
        // ) {
        //   console.log("red");
          
        //   router.push("/landing");
        // } 
        else if (
          !keys.includes("benchmark-data") &&
          pathname.includes("benchmark-data")
        ) {
          router.push("/landing");
        }
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (params !== null) {
      const keys = Object.keys(sidebarOptions);
      if (
        !keys.includes("sl_dashboard") &&
        pathname === "/dashboard" &&
        params === "sl_dashboard"
      ) {
        router.push("/landing");
      } else if (
        !keys.includes("sr_dashboard") &&
        pathname.includes("dashboard") &&
        params === "sr_dashboard"
      ) {
        router.push("/landing");
      } else if (
        !keys.includes("dp_dashboard") &&
        pathname === "/dpdashboard"
      ) {
        router.push("/landing");
      } else if (!keys.includes("compare") && pathname === "/compare") {
        router.push("/landing");
      } else if (
        !keys.includes("data_tracker") &&
        pathname === "/data-tracker"
        // params === "sr_dashboard"
      ) {
        router.push("/landing");
      } else if (
        !keys.includes("claim_dashboard") &&
        pathname === "/claim-dashboard?page=claim_dashboard"
        // params === "sr_dashboard"
      ) {
        router.push("/landing");
      }
    }
  }, [params]);

  // const formatInitialDate = (date: any) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  // const initialDates = () => {
  //   // Get the current date
  //   const currentDate = new Date();

  //   // Get the first day of the current month
  //   const firstDayOfMonth = new Date(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth(),
  //     1
  //   );

  //   // Get the last day of the current month
  //   const lastDayOfMonth = new Date(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth() + 1,
  //     0
  //   );

  //   // Format the first and last dates as "YYYY-MM-DD" strings
  //   const initialFirstDate = formatInitialDate(firstDayOfMonth);
  //   const initialLastDate = formatInitialDate(lastDayOfMonth);

  //   const initialFilterDate = {
  //     firstDate:
  //       Object.keys(filterDate).length > 0
  //         ? filterDate.firstDate
  //         : initialFirstDate,
  //     secondDate:
  //       Object.keys(filterDate).length > 0
  //         ? filterDate.secondDate
  //         : initialLastDate,
  //     dateUnit:
  //       Object.keys(filterDate).length > 0 ? filterDate.dateUnit : dateUnit,
  //     filterDate:
  //       Object.keys(filterDate).length > 0
  //         ? filterDate.filterDate
  //         : new Date().toLocaleString("default", {
  //             month: "short",
  //             year: "numeric",
  //           }),
  //   };
  //   globalFilter.p_start_date = initialFirstDate;
  //   globalFilter.p_end_date = initialLastDate;
  //   globalFilter.p_model = "";
  //   globalFilter.p_sc = "";
  //   globalFilter.p_location = "";
  //   globalFilter.select_year = "cy";
  //   globalFilter.p_master_page_code =
  //     Object.keys(comparePageCode).length > 0
  //       ? comparePageCode
  //       : "sl_dashboard";
  //   (globalFilter.p_user_id = (currentUser as any)?.userId),
  //     (globalFilter.p_brand_id = brandId?.brandId),
  //     (globalFilter.is_compare = false),
  //     updateGlobalFilter({
  //       global_filter: globalFilter,
  //       formatted_date: new Date().toLocaleString("default", {
  //         month: "short",
  //         year: "numeric",
  //       }),
  //       benchmark_toggle: false,
  //       compare_filter: {
  //         first_column: {
  //           title: {
  //             date_unit: dateUnit,
  //             formatted_date: initialFilterDate.filterDate,
  //             p_start_date: initialFirstDate,
  //             p_end_date: initialLastDate,
  //           },
  //         },
  //         second_column: {
  //           title: {
  //             date_unit: dateUnit,
  //             formatted_date: initialFilterDate.filterDate,
  //             p_start_date: initialFirstDate,
  //             p_end_date: initialLastDate,
  //           },
  //         },
  //         third_column: {
  //           title: {
  //             date_unit: dateUnit,
  //             formatted_date: initialFilterDate.filterDate,
  //             p_start_date: initialFirstDate,
  //             p_end_date: initialLastDate,
  //           },
  //         },
  //         fourth_column: {
  //           title: {
  //             date_unit: dateUnit,
  //             formatted_date: initialFilterDate.filterDate,
  //             p_start_date: initialFirstDate,
  //             p_end_date: initialLastDate,
  //           },
  //         },
  //       },
  //     });

  //   // addToLocalStorage("@global-filter", globalFilter);
  //   // addToLocalStorage(
  //   //   "@filter-date",
  //   //   Object.keys(filterDate).length > 0 ? filterDate : initialFilterDate
  //   // );
  //   // addToLocalStorage(
  //   //   "@filter-FirstKPISelected",
  //   //   Object.keys(filterDate).length > 0 ? filterDate : initialFilterDate
  //   // );
  //   // addToLocalStorage(
  //   //   "@filter-SecondKPISelected",
  //   //   Object.keys(filterDate).length > 0 ? filterDate : initialFilterDate
  //   // );
  //   // addToLocalStorage(
  //   //   "@filter-ThirdKPISelected",
  //   //   Object.keys(filterDate).length > 0 ? filterDate : initialFilterDate
  //   // );
  //   // addToLocalStorage(
  //   //   "@filter-FourthKPISelected",
  //   //   Object.keys(filterDate).length > 0 ? filterDate : initialFilterDate
  //   // );

  //   // const initialYear = "cy";

  //   // addToLocalStorage("@filter-selectyear", initialYear);
  //   // addToLocalStorage(
  //   //   "@banchmark-value",
  //   //   Object.keys(banchMarkValue).length > 0 ? banchMarkValue : "cy"
  //   // );
  // };

  

  if (isLoading) {
    return <Loading className={isLoading ? "" : "hide"} />;
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Sidebar sidebarOptions={sidebarOptions} currentUser={currentUser} />
          <Box className='content-wrap-parent'>
          {children}
          <Box className='footer-fixed-content fixed w-full bg-lightgrey text-grey500 z-[4]  bottom-0 text-left'>Dream Dashboard Version 3.0</Box>
          </Box>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
