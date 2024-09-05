"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import LandingBg from "@root/assets/images/landingbg.png";
import BrandPageLogoDefault from "../../assets/images/brand-page-logo.png";
import DefaulCarLogo from "../../assets/images/default-car.png";
import { FooterItem } from "@root/components/Footer";
import { LandingCard } from "@root/components/LandingCard";
import Sidebar from "@root/components/Sidebar";
import { LandingHeading } from "@root/components/LandingHeading";
import {
  useAuthControllerLogout,
  useBrandControllerBrandGetUserWise,
  useGetManyBaseBrandControllerBrand,
  useGetManyBaseDealersControllerDealers,
  useGetOneBaseUserControllerUser,
  useMasterControllerRoleWiseMasterPage,
} from "@root/backend/backendComponents";
import { useAuthStore } from "../../store/auth-store";
import Image from "next/image";
import logoutIcon from "../../assets/images/logout-icon-black.svg";
import { logout } from "@root/utils/auth";
import { useRouter } from "next/navigation";
import { addToLocalStorage, removeFromLocalStorage } from "@root/utils";
import Loading from "@root/components/Loading";
import { getFromLocalStorage } from "@root/utils";
import Toast from "@root/components/Toast";
import { initialStates } from "@root/utils/globalFunction";
import axios from "axios";

interface BrandType {
  id: number | undefined;
  name: string;
  logoUrl: string;
  logoUrlTwo: string;
  isActive: boolean;
  status?: boolean;
}

declare const require: {
  context(directory: string, useSubdirectories?: boolean, regExp?: RegExp): any;
};

const imageContext = require.context(
  "../../../public/assets/images/brandImages",
  true
);

export default function Landing() {
  let queryParams = {};
  const [visibleOptions, setVisibleOptions] = useState({});
  // TODO: this is for get current user details
  const currentUser = useAuthStore((state) => state.loginData)?.user;
  const [roleId, setRoleID] = useState<number>();
  const [roleCode, setRoleCode] = useState<number>();
  const router = useRouter();
  const [pendingDays, setPendingDays] = useState({});
  const [toastDays, setToastDays] = useState({});
  const [fileImageHome, setFileImageHome] = useState<string | null>(null);

  const isSuperAdmin = getFromLocalStorage("@super-admin");

  const { data: dealers, refetch: dealersFetching } =
    useGetManyBaseDealersControllerDealers(
      {
        queryParams: queryParams,
      },
      {
        enabled: false,
      }
    );

  const { data: brands, refetch: brandFetching } =
    useGetManyBaseBrandControllerBrand(
      {
        queryParams: queryParams,
      },
      {
        enabled: false,
      }
    );

  const {
    data: userBrands,
    isLoading: loading,
    refetch: getUserWiseBrands,
  } = useBrandControllerBrandGetUserWise(
    {
      queryParams: { user_id: (currentUser as any)?.userId },
    },
    {
      enabled: false,
    }
  );
  const { data: userDetails, refetch: getUserDetails } =
    useGetOneBaseUserControllerUser(
      {
        pathParams: { id: (currentUser as any)?.userId },
        queryParams: { join: ["role"] },
      },
      {
        enabled: false,
      }
    );

  const { data: roleWisePages, refetch: getSidebarOptions } =
    useMasterControllerRoleWiseMasterPage(
      {
        queryParams: {
          role_id: roleId as unknown as number,
          // role_id: parseInt(currentUser?.roleId as unknown as string),
        },
      },
      {
        enabled: false,
      }
    );

  useEffect(() => {
    if (roleWisePages !== undefined) {
      if ((roleWisePages as any)?.data?.isSuperAdmin) {
        const resData = (roleWisePages as any)?.data?.masterPages;
        let visibleOptionsCopy = visibleOptions;
        for (let i = 0; i < resData.length; i++) {
          (visibleOptionsCopy as any)[resData?.[i]?.pageCode] = {
            name: resData?.[i]?.name,
            iconUrl: resData?.[i]?.iconUrl,
            orderby: resData?.[i]?.orderby,
          };
        }
        addToLocalStorage("@sidebar-options", visibleOptionsCopy);
        addToLocalStorage(
          "@super-admin",
          (roleWisePages as any)?.data?.isSuperAdmin
        );

        setVisibleOptions(visibleOptionsCopy);
      } else {
        // const resData = (roleWisePages as any)?.data;
        const resData = (roleWisePages as any)?.data?.masterPages;
        let visibleOptionsCopy = visibleOptions;
        for (let i = 0; i < resData?.length; i++) {
          (visibleOptionsCopy as any)[resData?.[i]?.pageCode] = {
            name: resData?.[i]?.name,
            iconUrl: resData?.[i]?.iconUrl,
            orderby: resData?.[i]?.orderby,
          };
        }
        addToLocalStorage("@sidebar-options", visibleOptionsCopy);
        setVisibleOptions(visibleOptionsCopy);
      }
      addToLocalStorage("@rolewise-display", {
        canImport: (roleWisePages as any)?.data?.canImport,
        isChartExportAllowed: (roleWisePages as any)?.data
          ?.isChartExportAllowed,
        manageDealer: (roleWisePages as any)?.data?.manageDealer,
        manageBranch: (roleWisePages as any)?.data?.manageBranch,
        isDumpExportAllowed: (roleWisePages as any)?.data?.isDumpExportAllowed,
        isFileExportAllowed: (roleWisePages as any)?.data?.isFileExportAllowed,
        isDumpViewAllowed: (roleWisePages as any)?.data?.isDumpViewAllowed,
        isChartViewAllowed: (roleWisePages as any)?.data?.isChartViewAllowed,
        isFileInvalidateAllowed: (roleWisePages as any)?.data
          ?.isFileInvalidateAllowed,
      });
    }
  }, [roleWisePages]);

  useEffect(() => {
    if (userDetails !== undefined) {
      setRoleID(userDetails?.roleId);
      addToLocalStorage("@user-details", userDetails);
    }
    if (userDetails !== undefined) {
      setRoleCode(userDetails?.role?.roleCode);
      addToLocalStorage("@user-details", userDetails);
    }
  }, [userDetails]);

  useEffect(() => {
    if (roleId) {
      getSidebarOptions();
    }
  }, [roleId]);

  useEffect(() => {
    getUserWiseBrands();
    brandFetching();
    dealersFetching();
    getUserDetails();
    removeFromLocalStorage("@sidebar-options");
    removeFromLocalStorage("@filter-data");
    removeFromLocalStorage("@filter-FourthFilterSelected");
    removeFromLocalStorage("@filter-FirstFilterSelected");
    removeFromLocalStorage("@filter-4KPISelected");
    removeFromLocalStorage("@filter-3KPISelected");
    removeFromLocalStorage("@brand-id");
    removeFromLocalStorage("@filter-date");
    removeFromLocalStorage("@filter-FirstKPISelected");
    removeFromLocalStorage("@filter-FourthKPISelected");
    removeFromLocalStorage("@banchmark-value");
    removeFromLocalStorage("@filter-selectyear");
    removeFromLocalStorage("@filter-ThirdFilterSelected");
    removeFromLocalStorage("@filter-1KPISelected");
    removeFromLocalStorage("@filter-dateUnit");
    removeFromLocalStorage("@filter-ThirdKPISelected");
    removeFromLocalStorage("@filter-2KPISelected");
    removeFromLocalStorage("@filter-SecondFilterSelected");
    removeFromLocalStorage("@compare-pageCode");
    removeFromLocalStorage("@filter-SecondKPISelected");
    removeFromLocalStorage("@global-filter");
    initialStates();
  }, []);

  const loginData = JSON.parse(getFromLocalStorage("@login-response") || "{}");
  const { data: logoutData, refetch: refetchLogout } = useAuthControllerLogout(
    {
      pathParams: {
        userId: loginData?.user?.sub as unknown as string,
      },
    },
    { enabled: false }
  );

  // For logout action
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

  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information
    const date1 = new Date(a.getFullYear(), a.getMonth(), a.getDate());
    const date2 = new Date(b.getFullYear(), b.getMonth(), b.getDate());

    // Calculate the difference in milliseconds
    const diffInMs = date2 - date1;

    // Convert the difference to days
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  // Get today's date
  const today = new Date();

  useEffect(() => {
    if (Array.isArray(userBrands?.data)) {
      // const pendingThreshold = 45;
      // const toastThreshold = 15;
      userBrands?.data?.forEach((obj) => {
        if (!obj.b_subscription_end_date) {
          setPendingDays((prevState) => ({
            ...prevState,
            [obj.b_id]: true,
          }));
          return;
        }

        const pendingThreshold = obj.b_grace_days + 30;
        const toastThreshold = obj.b_grace_days + 15;
        const endDate = new Date(obj.b_subscription_end_date);
        endDate.setDate(endDate.getDate() + obj.b_grace_days);
        const diffDays = dateDiffInDays(today, endDate);
        if (diffDays >= 0) {
          if (diffDays <= pendingThreshold) {
            setPendingDays((prevState) => ({
              ...prevState,
              [obj.b_id]: diffDays,
            }));
          } else {
            setPendingDays((prevState) => ({
              ...prevState,
              [obj.b_id]: diffDays >= pendingThreshold,
            }));
          }
          if (diffDays <= toastThreshold) {
            setToastDays((prevState) => ({
              ...prevState,
              // [obj.b_id]: diffDays
              [obj.b_id]: { days: diffDays, name: obj.b_name },
            }));
          }
        } else {
          // console.error("Difference in days is negative.");
        }
      });
    } else {
      // console.error('userBrands data is not an array or is undefined');
    }
  }, [userBrands]);

  const names = Object.values(toastDays).map((item) => item?.name);
  const dynamicMessage = names.join(", ");
  const message =
    names.length > 0
      ? ` You dashboard access will be revoked soon for ${dynamicMessage}`
      : "";

  //

  // const getRandomImage = (brandCode: any) => {
  //   if (brandCode && Object.keys(images).includes(brandCode)) {
  //     const brandImages = images[brandCode];
  //     const randomImage = brandImages[Math.floor(Math.random() * brandImages.length)];
  //     return `/assets/images/${brandCode}/${randomImage}`;
  //   } else {
  //     return DefaulCarLogo;
  //   }
  // };

  const getRandomImage = (brandCode: any) => {
    const brandImages = imageContext
      .keys()
      .filter((path) => path.includes(`${brandCode}/`));

    if (brandImages.length > 0) {
      const randomImage =
        brandImages[Math.floor(Math.random() * brandImages.length)];
      const imageName = randomImage.substring(2);
      return `/assets/images/brandImages/${imageName}`;
    } else {
      return DefaulCarLogo;
    }
  };

  const sendHomePageLogo = (param: any) => {
    if (param) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `/api/${param}?flag=brand`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          if(response.status !== 404) {
            setFileImageHome(`/api/${param}?flag=brand`);
          }
          else {
            setFileImageHome(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (Array.isArray(dealers) && dealers.length > 0) {
      if (dealers[0]?.brandPageLogo !== null) {
        sendHomePageLogo(dealers[0]?.brandPageLogo);
      }
    }
  }, [dealers]);

  return (
    <>
      <Box
        maxWidth="100%"
        className="main-flex-container header-title flex flex-col overflow-hidden relative justify-around bg-top bg-no-repeat bg-fixed bg-cover"
        style={{ backgroundImage: `url(${LandingBg})` }}
      >
        {/* <Sidebar /> */}
        {/* {!isSuperAdmin && message && <Toast message={message} />} */}
        <LandingHeading
          topHeading={(dealers as any)?.[0]?.name ?? ""}
          bottomHeading={(dealers as any)?.[0]?.name ?? ""}
          brandPageLogo={fileImageHome || null}
          BrandPageLogoDefault={BrandPageLogoDefault}
        />
        <Box
          className="cursor-pointer absolute logout-button"
          onClick={() => logoutAction()}
        >
          <Image src={logoutIcon} alt="logout" width={50} height={50} />
        </Box>
        {/* {Object.entries(toastDays).map(([brandId, { days, name }]) => (
          <Toast key={brandId} message={`Subscription will expire soon for ${name}, ${days} days left`} />
        ))} */}

        <Box className="main-box w-full  inline-block max-h-[75vh] overflow-y-auto pl-0">
          {loading ? (
            <Loading className={`${loading ? "" : "hide"} `} />
          ) : (
            <Grid container spacing={4} className="main-grid">
              {(userBrands as any)?.data &&
                ((userBrands as any)?.data as any)?.map(
                  (brand: BrandType, index: number) => {
                    const logo =
                      brand && brand?.b_logo_url && brand?.b_logo_url !== null
                        ? `/assets/images/${brand?.b_logo_url}`
                        : "/assets/images/brand-page-logo.png";

                    // const img = (brand && brand?.b_oem_code && brand?.b_oem_code !== null &&
                    //   Object.keys(images).filter((oem:any)=>oem === brand?.b_oem_code).includes(brand?.b_oem_code)) ?
                    //   `/assets/images/${brand.b_oem_code}/${
                    //   Object.values(images[brand.b_oem_code])[Math.floor(Math.random() *
                    //   Object.values(images).length)]}`
                    //   : DefaulCarLogo;

                    const img = getRandomImage(brand?.b_oem_code);

                    const brandName = String((brand as any)?.b_id);
                    const b_grace_days = (brand as any)?.b_grace_days;
                    const grace_days_plus_30 = b_grace_days + 30;
                    let title = null;

                    for (const [key, value] of Object.entries(pendingDays)) {
                      if (brandName === key) {
                        if (value === true) {
                          title = "";
                          break;
                        }

                        if (typeof value === "number") {
                          if (
                            value >= 0 &&
                            value <= (brand as any)?.b_grace_days
                          ) {
                            title = `Subscription Expired. Access will be revoked soon.`;
                          } else if (
                            value >= (brand as any)?.b_grace_days &&
                            value <= grace_days_plus_30
                          ) {
                            title = `Subscription will expire in ${
                              value - (brand as any)?.b_grace_days
                            } days.`;
                          }
                        }
                        break;
                      }
                    }

                    if (title === null) {
                      title = "Subscription is expired";
                    }

                    // let brandStatus;

                    // if (brand && brand.status === false) {
                    //   // console.log(brandStatus, "-------one---1");

                    //   brandStatus = false;
                    // } else {

                    //   brandStatus = pendingDays[brand?.b_id] || (pendingDays[brand?.b_id] === true && brand?.status);
                    // }

                    let brandStatus;

                    if (brand && brand.status === false) {
                      brandStatus = false;
                    } else {
                      if (pendingDays.hasOwnProperty(brand?.b_id)) {
                        if (pendingDays[brand?.b_id] === true) {
                          brandStatus = true; // If value is true, consider it eligible
                        } else if (pendingDays[brand?.b_id] === 0) {
                          brandStatus = true; // If value is 0, consider it eligible
                        } else if (
                          typeof pendingDays[brand?.b_id] === "number"
                        ) {
                          brandStatus = true; // If value is a number, consider it eligible
                        } else {
                          brandStatus = false; // For other cases, consider it ineligible
                        }
                      } else {
                        brandStatus = false; // If brand ID not found in pendingDays, consider it disabled
                      }
                    }

                    return (
                      <Grid
                        key={index}
                        item
                        xs={6}
                        sm={3}
                        md={4}
                        lg={3}
                        className="main-card  animate__animated animate__fadeIn "
                      >
                        {isSuperAdmin ? (
                          <LandingCard
                            iconPath={img}
                            iconAlt="company icon"
                            bgImgPath={logo}
                            bgImgAlt="company logo"
                            isActive={(brand as any)?.status}
                            brandId={(brand as any)?.b_id}
                            title={title}
                            brandNameCard={(brand as any)?.b_name}
                          />
                        ) : (
                          <LandingCard
                            iconPath={img}
                            iconAlt="comapny icon"
                            bgImgPath={logo}
                            bgImgAlt="comapny logo"
                            isActive={brandStatus}
                            brandId={(brand as any)?.b_id}
                            brandNameCard={(brand as any)?.b_name}
                            title={title}
                          />
                        )}
                      </Grid>
                    );
                  }
                )}
            </Grid>
          )}
        </Box>

        <FooterItem
          firstHeading="Powered By Azure Autoverse"
          secondHeading={
            "Copyright ©" +
            new Date().getFullYear() +
            " Azure Autoverse, All Rights Reserved."
          }
        />
      </Box>
    </>
  );
}
