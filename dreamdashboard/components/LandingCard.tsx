import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToLocalStorage, getFromLocalStorage } from "@root/utils";
import { useKpiControllerGetSlInsRenewal } from "@root/backend/backendComponents";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useSelector } from "react-redux";
import {
  dispatch,
  updateGlobalFilter,
  updateGlobalFilterKey,
} from "@root/app/layout";
import BrandPageLogoDefault from "../../assets/images/brand-page-logo.png";

interface LandingCardProps {
  iconPath: any;
  iconAlt: string;
  bgImgPath: any;
  bgImgAlt: string;
  isActive?: boolean;
  brandId?: number | undefined;
  brandNameCard?: string;
  title: string;
}

// function getPathFromOrderBy(key: string, compareCode: string) {
//   console.log("getPathFromOrderBy")
//   switch (key) {
//     case "dp_dashboard":
//       return Object.keys(compareCode).length > 0
//         ? "/dpdashboard?page=" + compareCode
//         : "/dpdashboard?page=sl_dashboard";
//     case "sr_dashboard":
//       return "/dashboard?page=sr_dashboard";
//     case "sl_dashboard":
//       return "/dashboard?page=sl_dashboard";
//     case "bucket_management":
//       return "/bucket-management";
//     case "data_tracker":
//       return "/data-tracker";
//     // return Object.keys(compareCode).length > 0
//     //   ? "/data-tracker?page=" + compareCode
//     //   : "/data-tracker?page=sl_dashboard";
//     case "filter_kpi":
//       return "/filter-kpi";
//     case "compare":
//       return "/compare?page=compare";
//     case "claim_dashboard":
//       return "/claim-dashboard?page=claim_dashboard";
//     case "models":
//       return "/model";
//     case "branch":
//       return "/branch";
//     case "brands":
//       return "/brand-list";
//     case "mst_page_permission":
//       return "/master-page";
//     case "change_passowrd":
//       return "/user-management/change-password";
//     case "insurance_renewal":
//       return "/insurance-renewal";
//     case "roles":
//       return "/roles";
//     case "benchmark-data":
//       return "/benchmark-data";
//     case "inventory":
//       return "/inventory?page=sl_dashboard";
//     case "vahan":
//       return "/vahan?page=vahan";
//     case "user_management":
//       return "/user-management";
//     case "usr_login_activity":
//       return "/login-activity-history";
//     case "kpi_permission":
//       return "/kpi-permission";
//     case "management-new":
//       return "/management-new";
//     default:
//       return "/landing";
//   }
// }

export const LandingCard: React.FC<LandingCardProps> = ({
  iconPath,
  iconAlt,
  bgImgPath,
  bgImgAlt,
  isActive,
  brandId,
  brandNameCard,
  title,
}) => {
  // const dispatch = useDispatch();

  const router = useRouter();
  //sl_ins_renewal code set in local storage
  const { data: kpidata, refetch: kpiDataFetching } =
    useKpiControllerGetSlInsRenewal(
      {
        pathParams: {
          brandId: brandId as number, // Asserting brandId is of type number
        },
      },
      {
        enabled: false,
      }
    );

  const cardLinkClass = isActive ? "card-link" : "";
  const currentUser = getFromLocalStorage("@user-details")
    ? JSON.parse(getFromLocalStorage("@user-details") as string)
    : {};
  const sidebarOptions = getFromLocalStorage("@sidebar-options")
    ? JSON.parse(getFromLocalStorage("@sidebar-options") as string)
    : {};
  const comparePageCode = JSON.parse(
    getFromLocalStorage("@compare-pageCode") || "{}"
  );
  const handleBrandClick = async () => {
    if (isActive) {
      addToLocalStorage("@brand-id", { brandId: brandId });
      updateGlobalFilterKey("global_filter.p_brand_id", brandId);
      updateGlobalFilterKey("compare_filter.first_column.p_brand_id", brandId);
      updateGlobalFilterKey("compare_filter.second_column.p_brand_id", brandId);
      updateGlobalFilterKey("compare_filter.third_column.p_brand_id", brandId);
      updateGlobalFilterKey("compare_filter.fourth_column.p_brand_id", brandId);
      try {
        const kpiResponse: any = await kpiDataFetching();
        if (kpiResponse?.data?.data && kpiResponse?.data?.statusCode == 200) {
          addToLocalStorage("@kpi-ins-renewal", {
            id: kpiResponse?.data?.data?.id,
            kpi_name: kpiResponse?.data?.data?.name,
          });
        } else {
          addToLocalStorage("@kpi-ins-renewal", {});
        }
      } catch (error) {
        console.error("Error fetching KPI data:", error);
      }
      const keys = Object.keys(sidebarOptions);
      if (keys.length > 0) {
        // Sort the sidebar options based on the "orderby" property
        const sortedOptions = keys
          .map((key) => ({
            key,
            option: sidebarOptions[key],
          }))
          .sort((a, b) => a.option.orderby - b.option.orderby);

        const cPageCode =
          keys?.includes("sl_dashboard") && keys?.includes("sr_dashboard")
            ? "sl_dashboard"
            : keys?.includes("sr_dashboard")
            ? "sr_dashboard"
            : "sl_dashboard";
        // addToLocalStorage("@compare-pageCode", cPageCode);
        updateGlobalFilterKey("global_filter.p_master_page_code", cPageCode);
        updateGlobalFilterKey(
          "compare_filter.first_column.p_master_page_code",
          cPageCode
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.p_master_page_code",
          cPageCode
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.p_master_page_code",
          cPageCode
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.p_master_page_code",
          cPageCode
        );

        const path = getPathFromOrderBy(sortedOptions[0].key, cPageCode);

        router.push(path);
      } else {
        // Handle the case when there are no sidebar options
        router.push("/landing");
      }
    }
  };
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (event: any) => {
    event.stopPropagation();
    setOpen(true);
  };


  function getPathFromOrderBy(key: string, compareCode: string) {
    console.log("getPathFromOrderBy")
    switch (key) {
      case "dp_dashboard":
        return Object.keys(compareCode).length > 0
          ? "/dpdashboard?page=" + compareCode
          : "/dpdashboard?page=sl_dashboard";
      case "sr_dashboard":
        return "/dashboard?page=sr_dashboard";
      case "sl_dashboard":
        return "/dashboard?page=sl_dashboard";
      case "bucket_management":
        return "/bucket-management";
      case "data_tracker":
        return "/data-tracker";
      // return Object.keys(compareCode).length > 0
      //   ? "/data-tracker?page=" + compareCode
      //   : "/data-tracker?page=sl_dashboard";
      case "filter_kpi":
        return "/filter-kpi";
      case "compare":
        return "/compare?page=compare";
      case "claim_dashboard":
        return "/claim-dashboard?page=claim_dashboard";
      case "models":
        return "/model";
      case "branch":
        return "/branch";
      case "brands":
        return "/brand-list";
      case "mst_page_permission":
        return "/master-page";
      case "change_passowrd":
        return "/reset-password";
      case "insurance_renewal":
        return "/insurance-renewal";
      case "roles":
        return "/roles";
      case "benchmark-data":
        return "/benchmark-data";
      case "inventory":
        return "/inventory?page=sl_dashboard";
      case "vahan":
        return "/vahan?page=vahan";
      case "user_management":
        return "/user-management";
      case "usr_login_activity":
        return "/login-activity-history";
      case "kpi_permission":
        return "/kpi-permission";
      case "management-new":
        return "/management-new";
      case "summary-report":
        return (
            "/summary?page=" +
            _globalFilter.global_filter.p_master_page_code
          );
      default:
        return "/landing";
    }
  }

  return (
    <>
      <Box className={cardLinkClass}>
        <Card className={`landing-card relative w-full flex max-w-[97%]  content-center  justify-center overflow-visible border-solid text-center  ${title ? "yellow-bg" : ""} `}>
          <Box className="img-box">
            <Image
              src={iconPath}
              className="company-logo object-contain absolute top-0 flex items-center justify-center bg-white border-solid rounded-full "
              alt={iconAlt}
              width={800}
              height={800}
              unoptimized
              onClick={handleBrandClick}
            />

            {title && (
              <Box className="land-title flex  items-center justify-center bg-white absolute rounded-full animate__animated animate__tada animate__repeat-2	 animate__delay-1s">
                <ClickAwayListener onClickAway={handleTooltipClose}>
                  <Tooltip
                    placement="top"
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={title}
                  >
                    <WarningRoundedIcon onClick={handleTooltipOpen} />
                  </Tooltip>
                </ClickAwayListener>
              </Box>
            )}
          </Box>
          <CardContent className="card-cont flex justify-center p-0">
            <CardMedia
              image={bgImgPath}
              className="px-2 object-fit animate__animated  animate__faster animate__animated  animate__fadeIn animation_fast"
              component="img"
              alt={bgImgAlt}
            />
            <Typography component="span" className="brandname absolute w-full font-medium  whitespace-nowrap text-grey300 animate__animated animate__fadeInUp ">
              {brandNameCard}
            </Typography>
          </CardContent>
          <Box className='click-event-box absolute inset-0 w-full h-full rounded-[12%]'  onClick={handleBrandClick}></Box>
        </Card>
      </Box>
    </>
  );
};
