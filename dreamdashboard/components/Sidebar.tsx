"use client";
import React, { useState, useEffect, useRef } from "react";
import List from "@mui/material/List";
import {
  Box,
  Collapse,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, Close } from "@mui/icons-material";
// import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import logo from "../assets/images/logo-icon.png";
import logoutIcon from "../assets/images/logout-icon.svg";
import dataTrackerIcon from "../assets/images/data-tracker.png";
// import download from "../assets/images/download-icon.svg";
// import settingicon from "../assets/images/setting-icon.svg";
import compareline from "../assets/images/compare-line-icon.svg";
import vahan from "../assets/images/compare-line-icon.svg";
import customerservice from "../assets/images/customer-service-icon.png";
import dpdashboard from "../assets/images/dpdashboard.png";
import summaryIcon from "../assets/images/summary-icon.png";
import sales from "../assets/images/sales-icon.png";
import filter from "../assets/images/filter.svg";
import shoppingbag from "../assets/images/shopping-bag.svg";
import datamanagementIcon from "../assets/images/data-management-image.png";
import whitelogo from "../assets/images/autoverse logo-white.png";
import colorlogo from "../assets/images/autoverse logo-color.png";
import { useRouter } from "next/navigation";
import { logout } from "../utils/auth";
// import { useAuthStore } from "../store/auth-store";
import userManagement from "../assets/images/user-management.svg";
import brandIcon from "../assets/images/brand.svg";
import userBulk from "../assets/images/icon_User buck.svg";
// import userLoginActivity from "../assets/images/icon_User Login Activity.svg";
// import kpiPermission from "../assets/images/icon_Kpi Permission.svg";
// import masterPagePermission from "../assets/images/icon_Master Page Permission.svg";
import iconRole from "../assets/images/icon_Roles.svg";
import iconBranch from "../assets/images/icon_Branch.svg";
import iconChangePassword from "../assets/images/icon_Change Password.svg";
import iconBenchmark from "../assets/images/icon_Benchmark.svg";
import iconsummary from "../assets/images/summary.svg";
import iconDealerManagement from "../assets/images/Dealer management.svg";
// import editUser from "../assets/images/edit-user.svg";
// import claimdashboardicon from "../assets/images/claim-dashboard.svg";
import InventoryIcon from "../assets/images/inventory.svg";
import InsuranceRenewalIcon from "../assets/images/insurance-icon.svg";
import model from "../assets/images/model.png";
import { getFromLocalStorage } from "@root/utils";
import {
  useAuthControllerLogout,
  useZendeskControllerCreateTicket,
  useGetManyBaseDealersControllerDealers,
  useMasterControllerRoleWiseMasterPage,
} from "@root/backend/backendComponents";
import IconButtonSingle from "./IconButtonSingle";
import ChatIcon from "@mui/icons-material/Chat";
import ButtonItem from "./ButtonItem";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { useYupValidationResolver } from "../components/hooks/yup-validation-resolver";
import { supportSchema } from "@root/app/support-schema/supportSchema";
import Modal from "../components/Modal";
import { messages } from "react-querybuilder";
import MenuIconImage from "../assets/icons/menu-icon-hemburger.svg";
import clientLogo from "../../public/assets/images/Landmark Logo.svg";
import { useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import Link from "next/link";
import { data } from "autoprefixer";
import axios from "axios";
interface OptionType {
  pageCode: string;
  iconUrl: string;
}

interface SubmenuStates {
  [key: string]: boolean;
}

// interface SidebarProps {
//   sidebarOptions
// }
export default function Sidebar({ sidebarOptions, currentUser }: any) {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  let queryParams = {};
  const resolver = useYupValidationResolver(supportSchema);
  const [roleWiseListingData, setRoleWiseListingData] = useState([]);
  const loginData = JSON.parse(getFromLocalStorage("@login-response") || "{}");
  const roleId = JSON.parse(getFromLocalStorage("@user-details") || "{}");
  const role = roleId?.role?.id;
  const { data: logoutData, refetch: refetchLogout } = useAuthControllerLogout(
    {
      pathParams: {
        userId: loginData?.user?.sub as unknown as string,
      },
    },
    { enabled: false }
  );

  const { data: dealers, refetch: dealersFetching } =
    useGetManyBaseDealersControllerDealers(
      {
        queryParams: queryParams,
      },
      {
        enabled: false,
      }
    );
  const { data: roleWiseListing, refetch: roleWiseFetching } =
    useMasterControllerRoleWiseMasterPage(
      {
        queryParams: {
          role_id: role,
        },
      },
      {
        enabled: false,
      }
    );

  useEffect(() => {
    if (roleWiseListing?.data?.masterPages) {
      setRoleWiseListingData(roleWiseListing?.data.masterPages);
    }
  }, [roleWiseListing]);

  useEffect(() => {
    dealersFetching();
    roleWiseFetching();
  }, []);

  // const comparePageCode = JSON.parse(
  //   getFromLocalStorage("@compare-pageCode") || "{}"
  // );

  const [isOpen, setIsOpen] = useState(false);
  const toggle = (e: any) => {
    setIsOpen(!isOpen);
    roleWiseFetching();
    dealersFetching();
    // if (Array.isArray(dealers) && dealers.length > 0) {
    //   if (dealers[0]?.logoUrl !== null) {
    //     sendMenubarLogo(dealers[0]?.logoUrl);
    //   }
    // }
  };
  const router = useRouter();
  // const [close, setClose] = useState(true);
  const [infoMsg, setInfoMsg] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  // const [open, setOpen] = useState(true);
  const sidebarRef = useRef(null);
  const supportformRef = useRef();
  const [fileImageMenu, setFileImageMenu] = useState<string | null>(null);
  const [isSupportFormVisible, setSupportFormVisible] = useState(false);
  const { mutateAsync } = useZendeskControllerCreateTicket();
  const [submenuStates, setSubmenuStates] = useState<SubmenuStates>({});

  const toggleSubmenu = (submenuKey: string) => {
    setSubmenuStates((prevStates) => {
      const newState: SubmenuStates = { [submenuKey]: !prevStates[submenuKey] };

      // Close all other submenus when opening a new one
      Object.keys(prevStates).forEach((key) => {
        if (key !== submenuKey) {
          newState[key] = false;
        }
      });

      return newState;
    });
  };

  const toggleFormVisibility = () => {
    setSupportFormVisible(!isSupportFormVisible);
  };

  // const handleClick = (e: any) => {
  //   setOpen(!open);
  // };
  // const handleClickclose = () => {
  //   setClose(!close);
  // };

  // const logoutAction = () => {
  //   refetchLogout();
  //   // logout(router);
  // };
  const logoutAction = async () => {
    try {
      // Assuming 'refetchLogout' is an asynchronous function that makes the API call
      await refetchLogout();
      // Once the API call is successful, you can perform the logout action here
      logout(router);
    } catch (error) {
      // Handle errors from the API call or the logout action here
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as unknown as HTMLElement).contains(event.target)
      ) {
        setIsOpen(false);
        setSubmenuStates({});
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // onclick outside of support form start
  const handleClickOutsideSupportForm = (event: any) => {
    if (
      supportformRef.current &&
      !supportformRef.current.contains(event.target)
    ) {
      setSupportFormVisible(false);
      clearErrors();
      reset();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSupportForm);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSupportForm);
    };
  }, []);

  // onclick outside of support form end

  const getImage = (obj: OptionType, name: string) => {
    let logo;
    switch (name) {
      case "user_management":
        logo = userManagement;
        break;
      case "dp_dashboard":
        logo = dpdashboard;
        break;
      case "summary-report":
        logo = iconsummary;
        break;
      case "sl_dashboard":
        logo = sales;
        break;
      case "sr_dashboard":
        logo = customerservice;
        break;
      case "inventory":
        logo = InventoryIcon;
        break;
      // case "claim_dashboard":
      //   logo = claimdashboardicon;
      //   break;
      case "compare":
        logo = compareline;
        break;
      case "vahan":
        logo = vahan;
        break;
      case "bucket_management":
        logo = shoppingbag;
        break;
      case "brands":
        logo = brandIcon;
        break;
      case "models":
        logo = model;
        break;
      case "data_tracker":
        logo = dataTrackerIcon;
        break;
      case "insurance_renewal":
        logo = InsuranceRenewalIcon;
        break;
      case "filter_kpi":
        logo = filter;
        break;
      case "data_management":
        logo = datamanagementIcon;
        break;
      // case "usr_login_activity":
      //   logo = userLoginActivity;
      //   break;
      case "benchmark-data":
        logo = iconBenchmark;
        break;
      // case "kpi_permission":
      //   logo = kpiPermission;
      //   break;
      // case "mst_page_permission":
      //   logo = masterPagePermission;
      //   break;
      case "change_passowrd":
        logo = iconChangePassword;
        break;
      case "branch":
        logo = iconBranch;
        break;
      case "roles":
        logo = iconRole;
        break;
      case "user_bulk_upload":
        logo = userBulk;
        break;
      case "management-new":
        logo = iconDealerManagement;
        break;
      default:
        logo = sales;
    }
    return logo;
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    clearErrors,
    reset,
    control,
  } = useForm({ resolver });

  const onSubmit = async (data: any) => {
    try {
      const trackDetails = await mutateAsync({
        body: {
          name: data?.name,
          email: data?.email,
          subject: data?.subject,
          description: data?.description,
        },
      });

      if (trackDetails?.statusCode === 200) {
        setIsConfirmationModalOpen(true);
        setInfoMsg("Ticket Created Successfully");
        clearForm();
      } else {
        setIsConfirmationModalOpen(true);
        setInfoMsg("Ticket Not Created Successfully");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsConfirmationModalOpen(true);
      setInfoMsg("An error occurred while creating the ticket");
    }
  };

  const clearForm = () => {
    clearErrors();
    reset();
    setSupportFormVisible(false);
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleMouseLeave = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      // Scroll to the top when mouse leaves the list-wrapper
      sidebar.scrollTop = 0;
    }
  };

  const isSuperAdmin = getFromLocalStorage("@super-admin");
  const superAdmin = Boolean(isSuperAdmin);

  const sendMenubarLogo = (param: any) => {
    if (param) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `/api/${param}?flag=menu`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          if (response.status !== 404) {
            setFileImageMenu(`/api/${param}?flag=menu`);
          } else {
            setFileImageMenu(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (Array.isArray(dealers) && dealers.length > 0) {
      if (dealers[0]?.logoUrl !== null) {
        sendMenubarLogo(dealers[0]?.logoUrl);
      }
    }
  }, [dealers]);

  return (
    <>
      <Box className="sidebar-wraper z-[22] relative h-[auto]" ref={sidebarRef}>
        <Box className="bars fixed z-[4] cursor-pointer left-[21px]">
          <Box>
            {/* <MenuIcon onClick={toggle} /> */}
            <Image
              src={MenuIconImage}
              height={30}
              width={30}
              onClick={toggle}
              alt="menu-icon"
              className="w-[35px] h-[35px] object-contain"
            />
          </Box>
        </Box>
        <Box
          className={`list-wrapper fixed z-[1111] h-full top-[16px] left-[23px] overflow-x-hidden overflow-hidden pb-0   ${
            isOpen ? "open-menu rounded-[10px] overflow-hidden" : "close-menu"
          }`}
          onMouseLeave={handleMouseLeave}
        >
          <List className="sidebar pt-2 dealerLogo">
            <Box className="closeIcon text-right block absolute right-0 top-0 z-[1] cursor-pointer p-[10px] hover:opacity-[0.7]">
              <Box
                onClick={toggle}
                className={` ${isOpen ? "icon-active" : "icon-none"}`}
              >
                <Close />
              </Box>
            </Box>
            <ListItemButton
              className={`main-icon home-icon-1 only-logo w-full block ml-0 justify-center min-h-[auto] pt-[1rem] pb-[0.5rem] text-center ${
                dealers && dealers?.length > 0 && dealers[0]?.logoUrl
                  ? ""
                  : "only-textlogo"
              }`}
              onClick={() => router.push("/landing")}
            >
              <ListItemIcon>
                {dealers && dealers?.length > 0 ? (
                  dealers[0]?.logoUrl && fileImageMenu ? (
                    <Image
                      src={fileImageMenu}
                      alt="Logo icon"
                      width={70}
                      height={70}
                    />
                  ) : (
                    <Typography
                      variant="h2"
                      className="sidebar-title text-center text-white pr-1"
                    >
                      {dealers[0]?.name}
                    </Typography>
                  )
                ) : null}
              </ListItemIcon>
            </ListItemButton>
          </List>
          <List className="sidebar middleMenu absolute w-full bottom-[115px] top-[115px] overflow-x-auto">
            <Scrollbars
              renderTrackVertical={() => <div className="custom-scroll" />}
            >
              {roleWiseListingData.map((item) => {
                const getPageRoute = (pageCode) => {
                  switch (pageCode) {
                    case "sr_dashboard":
                      return "/dashboard?page=sr_dashboard";
                    case "data_tracker":
                      return "/data-tracker";
                    case "compare":
                      return "/compare?page=compare";
                    case "vahan":
                      return "/vahan?page=vahan";
                    case "dp_dashboard":
                      return (
                        "/dpdashboard?page=" +
                        _globalFilter.global_filter.p_master_page_code
                      );
                    case "insurance_renewal":
                      return "/insurance-renewal";
                    case "models":
                      return "/model";
                    case "benchmark-data":
                      return "/benchmark-data";
                    case "sl_dashboard":
                      return "/dashboard?page=sl_dashboard";
                    case "bucket_management":
                      return "/bucket-management";
                    case "filter_kpi":
                      return "/filter-kpi";
                    case "user_management":
                      return "/user-management";
                    // case "usr_login_activity":
                    //   return "/login-activity-history";
                    // case "kpi_permission":
                    //   return "/kpi-permission";
                    // case "mst_page_permission":
                    //   return "/master-page";
                    case "change_passowrd":
                      return "reset-password";
                    case "inventory":
                      return "/inventory?page=sl_dashboard";
                    case "branch":
                      return "/branch";
                    case "brands":
                      return "/brand-list";
                    case "roles":
                      return "/roles";
                    case "user_bulk_upload":
                      return "/upload-user?page=user_bulk_upload";
                    case "service_dashboard":
                      return "/servicedashboard?page=service_dashboard";
                    case "summary-report":
                      return (
                        "/summary?page=" +
                        _globalFilter.global_filter.p_master_page_code
                      );
                    case "management-new":
                      return "/management-new";

                    default:
                      return `/dpdashboard?page=${pageCode}`;
                  }
                };

                if (item.onlyForSuperAdmin && !superAdmin) {
                  return null;
                } else {
                  return (
                    <ListItemButton
                      key={item.id}
                      className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] mt-0"
                      // onClick={() =>
                      //   router.push(
                      //     `/dpdashboard?page=${_globalFilter.global_filter.p_master_page_code}`
                      //   )
                      // }

                      onClick={() => router.push(getPageRoute(item.pageCode))}
                    >
                      <ListItemIcon>
                        <Image
                          src={getImage(
                            roleWiseListingData[item.pageCode],
                            item.pageCode
                          )}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="w-[1.875rem] h-[auto] object-contain"
                        />
                      </ListItemIcon>
                      <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0 transition-none text-white left-auto blank">
                        {item.name}
                      </ListItemText>
                    </ListItemButton>
                  );
                }
              })}

              {/* {superAdmin == true ? (
                <ListItemButton
                  className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] mt-0"
                  onClick={() =>
                    router.push(
                      "/dpdashboard?page=" +
                        _globalFilter.global_filter.p_master_page_code
                    )
                  }
                >
                  <ListItemIcon>
                    <Image
                      src={getImage(
                        sidebarOptions["dp_dashboard"],
                        "dp_dashboard"
                      )}
                      alt="DP Dashboard"
                      width={50}
                      height={50}
                      className="w-[1.875rem] h-[auto] object-contain"
                    />
                  </ListItemIcon>
                  <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                    Red Flags Red Flags
                  </ListItemText>
                </ListItemButton>
              ) : (
                sidebarOptions?.hasOwnProperty("dp_dashboard") && (
                  <ListItemButton
                    className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] mt-0"
                    onClick={() =>
                      router.push(
                        "/dpdashboard?page=" +
                          _globalFilter.global_filter.p_master_page_code
                      )
                    }
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(
                          sidebarOptions["dp_dashboard"],
                          "dp_dashboard"
                        )}
                        alt="DP Dashboard"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                      Red Flags
                    </ListItemText>
                  </ListItemButton>
                )
              )} */}
              {/* {superAdmin == true ? (
                <ListItemButton
                  className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] mt-0"
                  onClick={() =>
                    router.push(
                      "/summary?page=" +
                        _globalFilter.global_filter.p_master_page_code
                    )
                  }
                >
                  <ListItemIcon>
                    <Image
                      src={getImage(sidebarOptions["summary"], "summary")}
                      alt="Summary"
                      width={50}
                      height={50}
                      className="w-[1.875rem] h-[auto] object-contain"
                    />
                  </ListItemIcon>
                  <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                    Summary
                  </ListItemText>
                </ListItemButton>
              ) : (
                sidebarOptions?.hasOwnProperty("summary") && (
                  <ListItemButton
                    className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] mt-0"
                    onClick={() =>
                      router.push(
                        "/summary?page=" +
                          _globalFilter.global_filter.p_master_page_code
                      )
                    }
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(sidebarOptions["summary"], "summary")}
                        alt="Summary"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                      Summary
                    </ListItemText>
                  </ListItemButton>
                )
              )} */}
              {/* {superAdmin == true ? (
                <ListItemButton
                  className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                  // onClick={() => router.push("/dashboard?page=sl_dashboard")}
                  onClick={() => {
                    router.push("/dashboard?page=sl_dashboard");
                    setIsOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <Image
                      src={getImage(
                        sidebarOptions["Sales Dashboard"],
                        "Sales Dashboard"
                      )}
                      alt="Sales"
                      width={50}
                      height={50}
                      className="w-[1.875rem] h-[auto] object-contain"
                    />
                  </ListItemIcon>
                  <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                    Sales Dashboard
                  </ListItemText>
                </ListItemButton>
              ) : (
                sidebarOptions?.hasOwnProperty("sl_dashboard") && (
                  <ListItemButton
                    className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                    // onClick={() => router.push("/dashboard?page=sl_dashboard")}
                    onClick={() => {
                      router.push("/dashboard?page=sl_dashboard");
                      setIsOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(
                          sidebarOptions["sl_dashboard"],
                          "sl_dashboard"
                        )}
                        alt="Sales"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                      Sales Dashboard
                    </ListItemText>
                  </ListItemButton>
                )
              )} */}
              {/* {superAdmin == true ? (
                <ListItemButton
                  className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                  // onClick={() => router.push("/dashboard?page=sr_dashboard")}
                  onClick={() => {
                    router.push("/dashboard?page=sr_dashboard");
                    setIsOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <Image
                      src={getImage(
                        sidebarOptions["sr_dashboard"],
                        "sr_dashboard"
                      )}
                      alt="Customer Service"
                      width={50}
                      height={50}
                      className="w-[1.875rem] h-[auto] object-contain"
                    />
                  </ListItemIcon>
                  <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                    Service Dashboard
                  </ListItemText>
                </ListItemButton>
              ) : (
                sidebarOptions.hasOwnProperty("sr_dashboard") && (
                  <ListItemButton
                    className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                    // onClick={() => router.push("/dashboard?page=sr_dashboard")}
                    onClick={() => {
                      router.push("/dashboard?page=sr_dashboard");
                      setIsOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(
                          sidebarOptions["sr_dashboard"],
                          "sr_dashboard"
                        )}
                        alt="Customer Service"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                      Service Dashboard
                    </ListItemText>
                  </ListItemButton>
                )
              )} */}
              {/* {superAdmin == true ? (
                <ListItemButton
                  className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] mt-0"
                  onClick={() => router.push("/inventory?page=sl_dashboard")}
                >
                  <ListItemIcon>
                    <Image
                      src={getImage(sidebarOptions["inventory"], "inventory")}
                      alt="Inventory"
                      width={50}
                      height={50}
                      className="w-[1.875rem] h-[auto] object-contain"
                    />
                  </ListItemIcon>
                  <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                    Inventory
                  </ListItemText>
                </ListItemButton>
              ) : (
                sidebarOptions?.hasOwnProperty("inventory") && (
                  <ListItemButton
                    className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] mt-0"
                    onClick={() => router.push("/inventory?page=sl_dashboard")}
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(sidebarOptions["inventory"], "inventory")}
                        alt="Inventory"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                      Inventory
                    </ListItemText>
                  </ListItemButton>
                )
              )} */}

              {/* {superAdmin == true ? (
                <ListItemButton
                  className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                  // onClick={() => router.push(
                  //   Object.keys(comparePageCode).length > 0
                  //     ? "/compare?page=" + comparePageCode
                  //     : "/compare?page=sl_dashboard"
                  // )}
                  onClick={() => router.push("/compare?page=compare")}
                >
                  <ListItemIcon>
                    <Image
                      src={getImage(sidebarOptions["compare"], "compare")}
                      alt="Compare"
                      width={50}
                      height={50}
                      className="w-[1.875rem] h-[auto] object-contain"
                    />
                  </ListItemIcon>
                  <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                    Compare
                  </ListItemText>
                </ListItemButton>
              ) : (
                sidebarOptions.hasOwnProperty("compare") && (
                  <ListItemButton
                    className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                    // onClick={() => router.push(
                    //   Object.keys(comparePageCode).length > 0
                    //     ? "/compare?page=" + comparePageCode
                    //     : "/compare?page=sl_dashboard"
                    // )}
                    onClick={() => router.push("/compare?page=compare")}
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(sidebarOptions["compare"], "compare")}
                        alt="Compare"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                      Compare
                    </ListItemText>
                  </ListItemButton>
                )
              )} */}

              {/* {superAdmin == true ? (
                <ListItemButton
                  className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                  onClick={() => router.push("/insurance-renewal")}
                >
                  <ListItemIcon>
                    <Image
                      src={getImage(
                        sidebarOptions["insurance_renewal"],
                        "insurance_renewal"
                      )}
                      alt="insurance renewal"
                      width={50}
                      height={50}
                      className="w-[1.875rem] h-[auto] object-contain"
                    />
                  </ListItemIcon>
                  <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                    Insurance Renewal
                  </ListItemText>
                </ListItemButton>
              ) : (
                sidebarOptions.hasOwnProperty("insurance_renewal") && (
                  <ListItemButton
                    className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                    onClick={() => router.push("/insurance-renewal")}
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(
                          sidebarOptions["insurace_renewal"],
                          "insurance_renewal"
                        )}
                        alt="insurance renewal"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                      Insurance Renewal
                    </ListItemText>
                  </ListItemButton>
                )
              )} */}

              {/* {superAdmin == true ? (
                <>
                  <ListItemButton
                    onClick={() => toggleSubmenu("data_management")}
                    className={`main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] ${
                      !submenuStates["data_management"] ? "" : "clicked"
                    }`}
                  >
                    <ListItemIcon>
                      <Image
                        // src={microsoftTeams}
                        src={getImage(
                          sidebarOptions["data_management"],
                          "data_management"
                        )}
                        // src={datamanagementIcon}
                        alt="Data Management"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <List className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto">
                      <ListItemText className="title-cursor-heading">
                        Data Management
                      </ListItemText>
                      <ListItemButton onClick={() => router.push("/model")}>
                        <ListItemText>Model</ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => router.push("/benchmark-data")}
                      >
                        <ListItemText>Benchmark</ListItemText>
                      </ListItemButton>
                    </List>
                    {!submenuStates["data_management"] ? (
                      <ExpandMore />
                    ) : (
                      <ExpandLess />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={submenuStates["data_management"]}
                    timeout="auto"
                    unmountOnExit
                    className="submenu block bg-[#004cb0]"
                  >
                    <List
                      component="div"
                      className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto"
                    >
                      <ListItemButton>
                        <ListItemIcon></ListItemIcon>
                        <List className="nav-text p-[0]">
                          <ListItemButton onClick={() => router.push("/model")}>
                            <ListItemText>Model</ListItemText>
                          </ListItemButton>
                          <ListItemButton
                            onClick={() => router.push("/benchmark-data")}
                          >
                            <ListItemText>Benchmark</ListItemText>
                          </ListItemButton>
                        </List>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>
              ) : (
                (sidebarOptions.hasOwnProperty("models") ||
                  sidebarOptions.hasOwnProperty("benchmark-data")) && (
                  <>
                    <ListItemButton
                      // onClick={handleClick}
                      onClick={() => toggleSubmenu("data_management")}
                      className={`main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] ${
                        !submenuStates["data_management"] ? "" : "clicked"
                      }`}
                    >
                      <ListItemIcon>
                        <Image
                          src={getImage(
                            sidebarOptions["data_management"],
                            "data_management"
                          )}
                          alt="Data Management"
                          width={50}
                          height={50}
                          className="w-[1.875rem] h-[auto] object-contain"
                        />
                      </ListItemIcon>
                      <List className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto">
                        <ListItemText className="title-cursor-heading">
                          Data Management
                        </ListItemText>
                        {sidebarOptions.hasOwnProperty("models") && (
                          <ListItemButton onClick={() => router.push("/model")}>
                            <ListItemText>Model</ListItemText>
                          </ListItemButton>
                        )}
                        {sidebarOptions.hasOwnProperty("benchmark-data") && (
                          <ListItemButton
                            onClick={() => router.push("/benchmark-data")}
                          >
                            <ListItemText>Benchmark</ListItemText>
                          </ListItemButton>
                        )}
                      </List>
                      {!submenuStates["data_management"] ? (
                        <ExpandMore />
                      ) : (
                        <ExpandLess />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={submenuStates["data_management"]}
                      timeout="auto"
                      unmountOnExit
                      className="submenu block bg-[#004cb0]"
                    >
                      <List component="div" disablePadding>
                        <ListItemButton>
                          <ListItemIcon></ListItemIcon>
                          <List className="nav-text p-[0]">
                            {sidebarOptions.hasOwnProperty("models") && (
                              <ListItemButton
                                onClick={() => router.push("/model")}
                              >
                                <ListItemText>Model</ListItemText>
                              </ListItemButton>
                            )}
                            {sidebarOptions.hasOwnProperty(
                              "benchmark-data"
                            ) && (
                              <ListItemButton
                                onClick={() => router.push("/benchmark-data")}
                              >
                                <ListItemText>Benchmark</ListItemText>
                              </ListItemButton>
                            )}
                          </List>
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </>
                )
              )} */}

              {/* {superAdmin == true ? (
                <ListItemButton
                  className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                  onClick={() =>
                    router.push(
                      "/data-tracker"
                      // ?page=" +
                      //   _globalFilter.global_filter.p_master_page_code
                    )
                  }
                  // onClick={() => router.push("/data-tracker?page=data_tracker")}
                >
                  <ListItemIcon>
                    <Image
                      src={getImage(
                        sidebarOptions["data_tracker"],
                        "data_tracker"
                      )}
                      alt="Data Tracker"
                      width={50}
                      height={50}
                      className="w-[1.875rem] h-[auto] object-contain"
                    />
                  </ListItemIcon>
                  <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                    Data Tracker
                  </ListItemText>
                </ListItemButton>
              ) : (
                sidebarOptions.hasOwnProperty("data_tracker") && (
                  <ListItemButton
                    className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                    onClick={() =>
                      router.push(
                        "/data-tracker"
                        // ?page=" +
                        //   _globalFilter.global_filter.p_master_page_code
                      )
                    }
                    // onClick={() => router.push("/data-tracker?page=data_tracker")}
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(
                          sidebarOptions["data_tracker"],
                          "data_tracker"
                        )}
                        alt="Data Tracker"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                      Data Tracker
                    </ListItemText>
                  </ListItemButton>
                )
              )} */}

              {/* {superAdmin == true ? (
                <ListItemButton
                  className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                  onClick={() => router.push("/bucket-management")}
                >
                  <ListItemIcon>
                    <Image
                      src={getImage(
                        sidebarOptions["bucket_management"],
                        "bucket_management"
                      )}
                      alt="bucket management"
                      width={50}
                      height={50}
                      className="w-[1.875rem] h-[auto] object-contain"
                    />
                  </ListItemIcon>
                  <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                    Bucket Management
                  </ListItemText>
                </ListItemButton>
              ) : (
                sidebarOptions.hasOwnProperty("bucket_management") && (
                  <ListItemButton
                    className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                    onClick={() => router.push("/bucket-management")}
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(
                          sidebarOptions["bucket_management"],
                          "bucket_management"
                        )}
                        alt="bucket management"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                      Bucket Management
                    </ListItemText>
                  </ListItemButton>
                )
              )} */}

              {/* {superAdmin == true ? (
                <ListItemButton
                  className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                  onClick={() => router.push("/filter-kpi")}
                >
                  <ListItemIcon>
                    <Image
                      src={getImage(sidebarOptions["filter_kpi"], "filter_kpi")}
                      alt="Filter Kpi"
                      width={50}
                      height={50}
                      className="w-[1.875rem] h-[auto] object-contain"
                    />
                  </ListItemIcon>
                  <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                    Filter KPI
                  </ListItemText>
                </ListItemButton>
              ) : (
                sidebarOptions.hasOwnProperty("filter_kpi") && (
                  <ListItemButton
                    className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                    onClick={() => router.push("/filter-kpi")}
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(
                          sidebarOptions["filter_kpi"],
                          "filter_kpi"
                        )}
                        alt="Filter Kpi"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                      Filter KPI
                    </ListItemText>
                  </ListItemButton>
                )
              )} */}
              {/* {superAdmin == true ? (
                <>
                  <ListItemButton
                    onClick={() => toggleSubmenu("user_management")}
                    className={`main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] ${
                      !submenuStates["user_management"] ? "" : "clicked"
                    }`}
                  >
                    <ListItemIcon>
                      <Image
                        src={getImage(
                          sidebarOptions["user_management"],
                          "user_management"
                        )}
                        alt="User Management"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <List className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto">
                      <ListItemText className="title-cursor-heading">
                        Management
                      </ListItemText>
                      {superAdmin == true ? (
                        <ListItemButton
                          onClick={() => router.push("/user-management")}
                        >
                          <ListItemText>User Management</ListItemText>
                        </ListItemButton>
                      ) : (
                        sidebarOptions.hasOwnProperty("user_management") && (
                          <ListItemButton
                            onClick={() => router.push("/user-management")}
                          >
                            <ListItemText>User Management</ListItemText>
                          </ListItemButton>
                        )
                      )}
                      <ListItemButton
                        onClick={() => router.push("/master-page")}
                      >
                        <ListItemText>Master Page Permission</ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => router.push("/kpi-permission")}
                      >
                        <ListItemText>KPI Permission</ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => router.push("/login-activity-history")}
                      >
                        <ListItemText>User login Activity</ListItemText>
                      </ListItemButton>

                      <ListItemButton
                        onClick={() => router.push("/upload-user")}
                      >
                        <ListItemText>User Bulk Upload</ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        onClick={() =>
                          router.push("/user-management/change-password")
                        }
                      >
                        <ListItemText>Change Password</ListItemText>
                      </ListItemButton>
                    </List>
                    {!submenuStates["user_management"] ? (
                      <ExpandMore />
                    ) : (
                      <ExpandLess />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={submenuStates["user_management"]}
                    timeout="auto"
                    unmountOnExit
                    className="submenu block bg-[#004cb0]"
                  >
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon></ListItemIcon>
                        <List className="nav-text p-[0]">
                          {superAdmin == true ? (
                            <ListItemButton
                              onClick={() => router.push("/user-management")}
                            >
                              <ListItemText>User Management</ListItemText>
                            </ListItemButton>
                          ) : (
                            sidebarOptions.hasOwnProperty(
                              "user_management"
                            ) && (
                              <ListItemButton
                                onClick={() => router.push("/user-management")}
                              >
                                <ListItemText>User Management</ListItemText>
                              </ListItemButton>
                            )
                          )}
                          <ListItemButton
                            onClick={() => router.push("/master-page")}
                          >
                            <ListItemText>Master Page Permission</ListItemText>
                          </ListItemButton>
                          <ListItemButton
                            onClick={() => router.push("/kpi-permission")}
                          >
                            <ListItemText>KPI Permission</ListItemText>
                          </ListItemButton>
                          <ListItemButton
                            onClick={() =>
                              router.push("/login-activity-history")
                            }
                          >
                            <ListItemText>User login Activity</ListItemText>
                          </ListItemButton>

                          <ListItemButton
                            onClick={() => router.push("/upload-user")}
                          >
                            <ListItemText>User Bulk Upload</ListItemText>
                          </ListItemButton>
                          <ListItemButton
                            onClick={() =>
                              router.push("/user-management/change-password")
                            }
                          >
                            <ListItemText>Change Password</ListItemText>
                          </ListItemButton>
                        </List>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>
              ) : (
                (sidebarOptions.hasOwnProperty("user_management") ||
                  sidebarOptions.hasOwnProperty("mst_page_permission") ||
                  sidebarOptions.hasOwnProperty("upload_user") ||
                  sidebarOptions.hasOwnProperty("kpi_permission") ||
                  sidebarOptions.hasOwnProperty("change_passowrd") ||
                  sidebarOptions.hasOwnProperty("usr_login_activity")) && (
                  <>
                    <ListItemButton
                      onClick={() => toggleSubmenu("user_management")}
                      className={`main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] ${
                        !submenuStates["user_management"] ? "" : "clicked"
                      }`}
                    >
                      <ListItemIcon>
                        <Image
                          src={getImage(
                            sidebarOptions["user_management"],
                            "user_management"
                          )}
                          alt="User Management"
                          width={50}
                          height={50}
                          className="w-[1.875rem] h-[auto] object-contain"
                        />
                      </ListItemIcon>
                      <List className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto">
                        <ListItemText className="title-cursor-heading">
                          Management
                        </ListItemText>
                        {superAdmin == true ? (
                          <ListItemButton
                            onClick={() => router.push("/user-management")}
                          >
                            <ListItemText>User Management</ListItemText>
                          </ListItemButton>
                        ) : (
                          sidebarOptions.hasOwnProperty("user_management") && (
                            <ListItemButton
                              onClick={() => router.push("/user-management")}
                            >
                              <ListItemText>User Management</ListItemText>
                            </ListItemButton>
                          )
                        )}
                        {sidebarOptions.hasOwnProperty(
                          "mst_page_permission"
                        ) && (
                          <ListItemButton
                            onClick={() => router.push("/master-page")}
                          >
                            <ListItemText>Master Page Permission</ListItemText>
                          </ListItemButton>
                        )}
                        {sidebarOptions.hasOwnProperty("kpi_permission") && (
                          <ListItemButton
                            onClick={() => router.push("/kpi-permission")}
                          >
                            <ListItemText>KPI Permission</ListItemText>
                          </ListItemButton>
                        )}
                        {sidebarOptions.hasOwnProperty(
                          "usr_login_activity"
                        ) && (
                          <ListItemButton
                            onClick={() =>
                              router.push("/login-activity-history")
                            }
                          >
                            <ListItemText>User login Activity</ListItemText>
                          </ListItemButton>
                        )}

                        {sidebarOptions.hasOwnProperty("upload_user") && (
                          <ListItemButton
                            onClick={() => router.push("/upload-user")}
                          >
                            <ListItemText>User Bulk Upload</ListItemText>
                          </ListItemButton>
                        )}
                        {sidebarOptions.hasOwnProperty("change_passowrd") && (
                          <ListItemButton
                            onClick={() =>
                              router.push("/user-management/change-password")
                            }
                          >
                            <ListItemText>Change Password</ListItemText>
                          </ListItemButton>
                        )}
                      </List>
                      {!submenuStates["user_management"] ? (
                        <ExpandMore />
                      ) : (
                        <ExpandLess />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={submenuStates["user_management"]}
                      timeout="auto"
                      unmountOnExit
                      className="submenu block bg-[#004cb0]"
                    >
                      <List component="div" disablePadding>
                        <ListItemButton>
                          <ListItemIcon></ListItemIcon>
                          <List className="nav-text p-[0]">
                            {superAdmin == true ? (
                              <ListItemButton
                                onClick={() => router.push("/user-management")}
                              >
                                <ListItemText>User Management</ListItemText>
                              </ListItemButton>
                            ) : (
                              sidebarOptions.hasOwnProperty(
                                "user_management"
                              ) && (
                                <ListItemButton
                                  onClick={() =>
                                    router.push("/user-management")
                                  }
                                >
                                  <ListItemText>User Management</ListItemText>
                                </ListItemButton>
                              )
                            )}
                            {sidebarOptions.hasOwnProperty(
                              "mst_page_permission"
                            ) && (
                              <ListItemButton
                                onClick={() => router.push("/master-page")}
                              >
                                <ListItemText>
                                  Master Page Permission
                                </ListItemText>
                              </ListItemButton>
                            )}
                            {sidebarOptions.hasOwnProperty(
                              "kpi_permission"
                            ) && (
                              <ListItemButton
                                onClick={() => router.push("/kpi-permission")}
                              >
                                <ListItemText>KPI Permission</ListItemText>
                              </ListItemButton>
                            )}
                            {sidebarOptions.hasOwnProperty(
                              "usr_login_activity"
                            ) && (
                              <ListItemButton
                                onClick={() =>
                                  router.push("/login-activity-history")
                                }
                              >
                                <ListItemText>User login Activity</ListItemText>
                              </ListItemButton>
                            )}

                            {sidebarOptions.hasOwnProperty("upload_user") && (
                              <ListItemButton
                                onClick={() => router.push("/upload-user")}
                              >
                                <ListItemText>User Bulk Upload</ListItemText>
                              </ListItemButton>
                            )}
                            {sidebarOptions.hasOwnProperty(
                              "change_passowrd"
                            ) && (
                              <ListItemButton
                                onClick={() =>
                                  router.push(
                                    "/user-management/change-password"
                                  )
                                }
                              >
                                <ListItemText>Change Password</ListItemText>
                              </ListItemButton>
                            )}
                          </List>
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </>
                )
              )} */}
              {/* {superAdmin == true ? (
                <>
                  <ListItemButton
                    // onClick={handleClick}
                    onClick={() => toggleSubmenu("system_management")}
                    className={`main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]  ${
                      !submenuStates["system_management"] ? "" : "clicked"
                    }`}
                  >
                    <ListItemIcon>
                      <Image
                        src={microsoftTeams}
                        alt="System Management"
                        width={50}
                        height={50}
                        className="w-[1.875rem] h-[auto] object-contain"
                      />
                    </ListItemIcon>
                    <List className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto">
                      <ListItemText className="title-cursor-heading">
                        System Management
                      </ListItemText>
                      <ListItemButton onClick={() => router.push("/branch")}>
                        <ListItemText>Branch</ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => router.push("/brand-list")}
                      >
                        <ListItemText>Brand</ListItemText>
                      </ListItemButton>
                      <ListItemButton onClick={() => router.push("/roles")}>
                        <ListItemText>Roles</ListItemText>
                      </ListItemButton>
                    </List>
                    {!submenuStates["system_management"] ? (
                      <ExpandMore />
                    ) : (
                      <ExpandLess />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={submenuStates["system_management"]}
                    timeout="auto"
                    unmountOnExit
                    className="submenu block bg-[#004cb0]"
                  >
                    <List
                      component="div"
                      className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto"
                    >
                      <ListItemButton>
                        <ListItemIcon></ListItemIcon>
                        <List className="nav-text p-[0]">
                          <ListItemButton
                            onClick={() => router.push("/branch")}
                          >
                            <ListItemText>Branch</ListItemText>
                          </ListItemButton>
                          <ListItemButton
                            onClick={() => router.push("/brand-list")}
                          >
                            <ListItemText>Brand</ListItemText>
                          </ListItemButton>
                          <ListItemButton onClick={() => router.push("/roles")}>
                            <ListItemText>Roles</ListItemText>
                          </ListItemButton>
                        </List>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>
              ) : (
                (sidebarOptions.hasOwnProperty("branch") ||
                  sidebarOptions.hasOwnProperty("brands") ||
                  sidebarOptions.hasOwnProperty("roles")) && (
                  <>
                    <ListItemButton
                      // onClick={handleClick}
                      onClick={() => toggleSubmenu("system_management")}
                      className={`main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto] ${
                        !submenuStates["system_management"] ? "" : "clicked"
                      }`}
                    >
                      <ListItemIcon>
                        <Image
                          src={microsoftTeams}
                          alt="logout"
                          width={50}
                          height={50}
                          className="w-[1.875rem] h-[auto] object-contain"
                        />
                      </ListItemIcon>
                      <List className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto">
                        <ListItemText className="title-cursor-heading">
                          System Management
                        </ListItemText>
                        {sidebarOptions.hasOwnProperty("branch") && (
                          <ListItemButton
                            onClick={() => router.push("/branch")}
                          >
                            <ListItemText>Branch</ListItemText>
                          </ListItemButton>
                        )}
                        {sidebarOptions.hasOwnProperty("brands") && (
                          <ListItemButton
                            onClick={() => router.push("/brand-list")}
                          >
                            <ListItemText>Brand</ListItemText>
                          </ListItemButton>
                        )}
                        {sidebarOptions.hasOwnProperty("roles") && (
                          <ListItemButton onClick={() => router.push("/roles")}>
                            <ListItemText>Roles</ListItemText>
                          </ListItemButton>
                        )}
                      </List>
                      {!submenuStates["system_management"] ? (
                        <ExpandMore />
                      ) : (
                        <ExpandLess />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={submenuStates["system_management"]}
                      timeout="auto"
                      unmountOnExit
                      className="submenu block bg-[#004cb0]"
                    >
                      <List component="div" disablePadding>
                        <ListItemButton>
                          <ListItemIcon></ListItemIcon>
                          <List className="nav-text p-[0]">
                            {sidebarOptions.hasOwnProperty("branch") && (
                              <ListItemButton
                                onClick={() => router.push("/branch")}
                              >
                                <ListItemText>Branch</ListItemText>
                              </ListItemButton>
                            )}
                            {sidebarOptions.hasOwnProperty("brands") && (
                              <ListItemButton
                                onClick={() => router.push("/brand-list")}
                              >
                                <ListItemText>Brand</ListItemText>
                              </ListItemButton>
                            )}
                            {sidebarOptions.hasOwnProperty("roles") && (
                              <ListItemButton
                                onClick={() => router.push("/roles")}
                              >
                                <ListItemText>Roles</ListItemText>
                              </ListItemButton>
                            )}
                          </List>
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </>
                )
              )} */}

              <ListItemButton
                className="main-icon flex flex-start py-[0.75rem] px-[0.625rem] m-0 h-[auto]"
                onClick={() => logoutAction()}
              >
                <ListItemIcon>
                  <Image
                    src={logoutIcon}
                    alt="logout"
                    width={50}
                    height={50}
                    className="w-[1.875rem] h-[auto] object-contain"
                  />
                </ListItemIcon>
                <ListItemText className="nav-text mt-0 block no-pointer-events relative opacity-[1] top-0 py-[0.3125rem] px-0 rounded-tr-[0.375rem] rounded-br-[0.375rem] rounded-tl-0 rounded-bl-0  transition-none text-white left-auto blank">
                  Logout
                </ListItemText>
              </ListItemButton>
            </Scrollbars>
          </List>
          <List className="footer-logo-wrapper p-0 bottom-0 absolute w-full h-[115px]">
            <ListItemButton className="main-icon">
              <ListItemIcon>
                <Link
                  href="https://azureautoverse.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={whitelogo}
                    className="white-logo"
                    alt="white logo"
                    width={50}
                    height={50}
                  />
                  <Image
                    src={colorlogo}
                    className="color-logo block w-[11.25rem] h-[auto] object-scale-down mx-auto"
                    alt="color logo"
                    width={230}
                    height={50}
                  />
                </Link>
              </ListItemIcon>
            </ListItemButton>
          </List>
        </Box>
      </Box>
      <Box>
        <Box className="form-support">
          <Modal
            isOpen={isConfirmationModalOpen}
            onClose={handleConfirmationCloseModal}
            modalextraclass="modal-small"
          >
            <Box className="modal-main-data">
              <Typography variant="h6" className="note-description text-center">
                {infoMsg}
              </Typography>

              <Box>
                <Box className="w-100 flex justify-center button-group-data">
                  <ButtonItem
                    className="outlineBtn mx-1"
                    ButtonTitle="Close"
                    type="button"
                    onClick={handleConfirmationCloseModal}
                  />
                </Box>
              </Box>
            </Box>
          </Modal>
          <Box className="support-item">
            <IconButtonSingle
              onClick={toggleFormVisibility}
              className="icon-button-support w-auto text-white rounded-[8px] mb-[5px] py-[4px] px-[8px] transition-all duration-500 ease-in-out"
              icon={
                <Tooltip
                  title={isSupportFormVisible ? "Close" : "Support"}
                  placement="top"
                >
                  {isSupportFormVisible ? (
                    <CloseIcon
                      style={{ color: "#fff" }}
                      className="icon-support ml-[8px] text-[20px]"
                    />
                  ) : (
                    <ChatIcon
                      style={{ color: "#fff" }}
                      className="icon-support ml-[8px] text-[20px]"
                    />
                  )}
                </Tooltip>
              }
              iconTitle={"Support"}
            />
          </Box>

          {isSupportFormVisible && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-support-main z-[11] bg-white rounded-[15px] fixed animate__animated  animate__fadeInRight animate__faster"
              ref={supportformRef}
            >
              <Box className=" small-form-control">
                <Typography variant="h3" className="title-main">
                  Raise A Ticket
                </Typography>

                <Grid container spacing={2} className="two-field-group-item">
                  <Grid item xs={12} className="mb-0">
                    <label className="form-custom-label">
                      Name
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("name")}
                      name="name"
                      placeholder="Enter Name"
                      type="text"
                      className="dropdownComponent rounded-lg bg-white text-blacklight p-0"
                      inputProps={{ maxLength: 50, autoComplete: "off" }}
                      error={errors?.name?.message ? true : false}
                      helperText={errors?.name?.message?.toString()}
                    />
                  </Grid>
                  <Grid item xs={12} className="mb-0">
                    <label className="form-custom-label">
                      Email
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("email")}
                      name="email"
                      placeholder="Enter Email"
                      type="email"
                      className="dropdownComponent rounded-lg bg-white text-blacklight p-0"
                      inputProps={{ maxLength: 128 }}
                      error={errors?.email?.message ? true : false}
                      helperText={errors?.email?.message?.toString()}
                    />
                    {/* {errors.email && (
                        <Typography color="error">
                          {errors.email.message}
                        </Typography>
                      )} */}
                  </Grid>
                  <Grid item xs={12} className="mb-0">
                    <label className="form-custom-label">
                      Subject
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("subject")}
                      name="subject"
                      placeholder="Enter Subject"
                      type="text"
                      inputProps={{ maxLength: 128, autoComplete: "off" }}
                      error={errors?.subject?.message ? true : false}
                      helperText={errors?.subject?.message?.toString()}
                      className="dropdownComponent rounded-lg bg-white text-blacklight p-0"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="mt-0">
                  <Grid item xs={12} className="mb-0">
                    <label className="form-custom-label">
                      Description
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("description")}
                      name="description"
                      placeholder="Enter Description"
                      type="text"
                      inputProps={{ maxLength: 1000, autoComplete: "off" }}
                      error={errors?.description?.message ? true : false}
                      helperText={errors?.description?.message?.toString()}
                      className="dropdownComponent rounded-lg bg-white text-blacklight p-0"
                      multiline
                      minRows={3}
                      maxRows={4}
                    />
                  </Grid>
                </Grid>

                <Box className="w-100   mt-4 flex ">
                  <ButtonItem
                    className="mx-1 w-full"
                    ButtonTitle="Save"
                    type="submit"
                  />
                </Box>
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </>
  );
}
