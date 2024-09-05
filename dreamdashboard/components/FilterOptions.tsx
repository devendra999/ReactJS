import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Typography, TextField, Card, Popover } from "@mui/material";
import {
  useModelControllerBrandWiseFilterModel,
  useBranchControllerFilterBranch,
  useUserControllerFilterUser,
  useGetManyBaseMasterControllerMaster,
  // useVahanControllerGetStatesUnique,
  // useVahanControllerGetMakersUnique,
} from "../backend/backendComponents";
import { getFromLocalStorage } from "@root/utils/common";
import { styled, lighten, darken } from "@mui/system";

import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { updateGlobalFilterKey } from "@root/app/layout";
// import { useSearchParams } from "next/navigation";
import axios from "axios";

const ButtonItem = dynamic(() => import("./ButtonItem"));

interface FilterOptionsProps {
  cellnum: any;
  sendModelData: (param: any) => void;
  sendLocationData: (param: any) => void;
  sendUserData: (param: any) => void;
}
interface Master {
  id: number;
  name: string;
  modelLabel: string;
  pageCode: string;
  branchLabel: string;
  consltantLabel: string;
}

interface ScrollTargetRefs {
  modelFilter?: any;
  branchFilter?: any;
  salesConsultantFilter?: any;
  stateFilter?: any;
  cityFilter?: any;
  rtoFilter?: any;
  makerFilter?: any;
}

export const FilterOptions: React.FC<FilterOptionsProps> = (props: any) => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);

  const [vahanFilterVal, setVahanFilterVal] = useState({
    state: _globalFilter.vahan_filter.p_state_id
      ? _globalFilter.vahan_filter.p_state_id
      : null,
    city: _globalFilter.vahan_filter.p_city_id
      ? _globalFilter.vahan_filter.p_city_id
      : null,
    rto: _globalFilter.vahan_filter.p_rto_id
      ? _globalFilter.vahan_filter.p_rto_id
      : null,
    maker: _globalFilter.vahan_filter.p_maker_id
      ? _globalFilter.vahan_filter.p_maker_id
      : null,
  });
  const [commanFilterVal, setCommanFilterVal] = useState({
    model:
      _globalFilter.global_filter.p_model != ""
        ? _globalFilter.global_filter.p_model
        : null,
    location:
      _globalFilter.global_filter.p_location != ""
        ? _globalFilter.global_filter.p_location
        : null,
    user:
      _globalFilter.global_filter.p_sc != ""
        ? _globalFilter.global_filter.p_sc
        : null,
  });
  const [comman1FilterVal, setComman1FilterVal] = useState({
    model:
      _globalFilter.compare_filter.first_column.p_model != ""
        ? _globalFilter.compare_filter.first_column.p_model
        : null,
    location:
      _globalFilter.compare_filter.first_column.p_location != ""
        ? _globalFilter.compare_filter.first_column.p_location
        : null,
    user:
      _globalFilter.compare_filter.first_column.p_sc != ""
        ? _globalFilter.compare_filter.first_column.p_sc
        : null,
  });
  const [comman2FilterVal, setComman2FilterVal] = useState({
    model:
      _globalFilter.compare_filter.second_column.p_model != ""
        ? _globalFilter.compare_filter.second_column.p_model
        : null,
    location:
      _globalFilter.compare_filter.second_column.p_location != ""
        ? _globalFilter.compare_filter.second_column.p_location
        : null,
    user:
      _globalFilter.compare_filter.second_column.p_sc != ""
        ? _globalFilter.compare_filter.second_column.p_sc
        : null,
  });
  const [comman3FilterVal, setComman3FilterVal] = useState({
    model:
      _globalFilter.compare_filter.third_column.p_model != ""
        ? _globalFilter.compare_filter.third_column.p_model
        : null,
    location:
      _globalFilter.compare_filter.third_column.p_location != ""
        ? _globalFilter.compare_filter.third_column.p_location
        : null,
    user:
      _globalFilter.compare_filter.third_column.p_sc != ""
        ? _globalFilter.compare_filter.third_column.p_sc
        : null,
  });
  const [comman4FilterVal, setComman4FilterVal] = useState({
    model:
      _globalFilter.compare_filter.fourth_column.p_model != ""
        ? _globalFilter.compare_filter.fourth_column.p_model
        : null,
    location:
      _globalFilter.compare_filter.fourth_column.p_location != ""
        ? _globalFilter.compare_filter.fourth_column.p_location
        : null,
    user:
      _globalFilter.compare_filter.fourth_column.p_sc != ""
        ? _globalFilter.compare_filter.fourth_column.p_sc
        : null,
  });

  const targetRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const [stateOptionsVal, setStateOptions] = useState([]);
  const [cityOptionsVal, setCityOptions] = useState([]);
  const [rtoOptionsVal, setRtoOptions] = useState([]);
  const [makerOptionsVal, setMakerOptions] = useState([]);
  const [modelOptionsVal, setModelOptions] = useState([]);
  const [locationOptionsVal, setLocationOptions] = useState([]);
  const [userGroupOptions, setUserGroupOptions] = useState<any[]>([]);
  const [userOptionsVal, setUserOptions] = useState([]);
  const [masterLablesVal, setMasterLables] = useState<Master[]>([]);
  const [selectedLocationValues, setSelectedLocationOnChange] = useState<any>(
    []
  );
  const [selected1LocationValues, setSelected1LocationOnChange] = useState<any>(
    []
  );
  const [selected2LocationValues, setSelected2LocationOnChange] = useState<any>(
    []
  );
  const [selected3LocationValues, setSelected3LocationOnChange] = useState<any>(
    []
  );
  const [selected4LocationValues, setSelected4LocationOnChange] = useState<any>(
    []
  );
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const userDetails = JSON.parse(getFromLocalStorage("@user-details") || "{}");

  const scrollTargetRefs = useRef<ScrollTargetRefs>({}); // Create a ref object

  interface Option {
    label: string;
  }

  const getApiData = async (params: any) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: process.env.NEXT_PUBLIC_API_DEV_BASE_URL + params,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      // console.log(response.data.data, "response");
      return response?.data?.data;
    } catch (error) {
      // console.error(error);
      throw error; // rethrow the error after logging it
    }
  };

  // const { data: stateData, refetch: fetchState } =
  //   useVahanControllerGetStatesUnique(
  //     {
  //       queryParams: _globalFilter && {
  //         p_start_date: _globalFilter.global_filter.p_start_date
  //           ? _globalFilter.global_filter.p_start_date
  //           : "",
  //         p_end_date: _globalFilter.global_filter.p_end_date
  //           ? _globalFilter.global_filter.p_end_date
  //           : "",
  //         date_unit: _globalFilter.global_filter.date_unit,
  //         maker: "",
  //         stateName: "",
  //       },
  //     },

  //     {
  //       enabled: false,
  //     }
  //   );

  // const { data: makerData, refetch: fetchMaker } =
  //   useVahanControllerGetMakersUnique(
  //     {
  //       queryParams: _globalFilter && {
  //         p_start_date: _globalFilter.global_filter.p_start_date
  //           ? _globalFilter.global_filter.p_start_date
  //           : "",
  //         p_end_date: _globalFilter.global_filter.p_end_date
  //           ? _globalFilter.global_filter.p_end_date
  //           : "",
  //         date_unit: _globalFilter.global_filter.date_unit,
  //         maker: "",
  //         stateName: "",
  //       },
  //     },

  //     {
  //       enabled: false,
  //     }
  //   );

  const { data: modelData, refetch: fetchModel } =
    useModelControllerBrandWiseFilterModel(
      {
        queryParams: _globalFilter && {
          brand_id:
            _globalFilter.global_filter.p_brand_id != 0
              ? _globalFilter.global_filter.p_brand_id
              : "",
          page_code:
            _globalFilter.global_filter.p_master_page_code != ""
              ? _globalFilter.global_filter.p_master_page_code
              : "",
        },
      },

      {
        enabled: false,
      }
    );

  const { data: locationData, refetch: fetchLocation } =
    useBranchControllerFilterBranch(
      {
        queryParams: {
          user_id: _globalFilter.global_filter.p_user_id,
          brand_id: _globalFilter.global_filter.p_brand_id,
        },
      },

      {
        enabled: false,
      }
    );

  const { data: userData, refetch: fetchUser } = useUserControllerFilterUser(
    {
      queryParams:
        props.cellnum == 1 && selected1LocationValues?.length > 0
          ? {
              user_id: _globalFilter.global_filter.p_user_id,
              brand_id: _globalFilter.global_filter.p_brand_id,
              page_code:
                _globalFilter.compare_filter.first_column.p_master_page_code,
              branch_id: selected1LocationValues,
            }
          : props.cellnum == 2 && selected2LocationValues?.length > 0
          ? {
              user_id: _globalFilter.global_filter.p_user_id,
              brand_id: _globalFilter.global_filter.p_brand_id,
              page_code:
                _globalFilter.compare_filter.second_column.p_master_page_code,
              branch_id: selected2LocationValues,
            }
          : props.cellnum == 3 && selected3LocationValues?.length > 0
          ? {
              user_id: _globalFilter.global_filter.p_user_id,
              brand_id: _globalFilter.global_filter.p_brand_id,
              page_code:
                _globalFilter.compare_filter.third_column.p_master_page_code,
              branch_id: selected3LocationValues,
            }
          : props.cellnum == 4 && selected4LocationValues?.length > 0
          ? {
              user_id: _globalFilter.global_filter.p_user_id,
              brand_id: _globalFilter.global_filter.p_brand_id,
              page_code:
                _globalFilter.compare_filter.fourth_column.p_master_page_code,
              branch_id: selected4LocationValues,
            }
          : selectedLocationValues?.length > 0
          ? {
              user_id: _globalFilter.global_filter.p_user_id,
              brand_id: _globalFilter.global_filter.p_brand_id,
              page_code: _globalFilter.global_filter.p_master_page_code,
              branch_id: selectedLocationValues,
            }
          : {
              user_id: _globalFilter.global_filter.p_user_id,
              brand_id: _globalFilter.global_filter.p_brand_id,
              page_code: _globalFilter.global_filter.p_master_page_code,
            },
    },

    {
      enabled: false,
    }
  );

  const { data: masterData, refetch: fetchMaster } =
    useGetManyBaseMasterControllerMaster(
      {},
      {
        enabled: false,
      }
    );

  useEffect(() => {
    fetchUser();
  }, [
    selectedLocationValues,
    selected1LocationValues,
    selected2LocationValues,
    selected3LocationValues,
    selected4LocationValues,
    fetchUser,
    _globalFilter.global_filter.p_master_page_code,
  ]);

  useEffect(() => {
    fetchModel();
  }, [fetchModel]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    const modelList = (modelData as any)?.data;
    const locationList = (locationData as any)?.data;
    const userList = (userData as any)?.data;
    const masterLists = masterData;

    if (modelList) {
      const modelOptions = (modelList as any)?.map((model: any) => ({
        label: model.name,
        value: model.id,
      }));
      setModelOptions(modelOptions);
      props.sendModelData(modelOptions);
    }

    if (locationList) {
      const locationOptions = (locationList as any)?.map((location: any) => ({
        label: location.name,
        value: location.id,
      }));
      setLocationOptions(locationOptions);
      props.sendLocationData(locationOptions);
    }

    if (userList) {
      const userOptions = (userList as any)?.map((user: any) => ({
        label: user.user.fullName,
        value: user.user.id,
        status: user.user.status,
        branch: user.branches
          .map((assignBranch: any) => assignBranch.name)
          .join(", "),
      }));
      setUserOptions(userOptions);
      props.sendUserData(userOptions);
    }
    if (_globalFilter.global_filter.p_master_page_code && masterLists) {
      const filteredMasterDataLables = (masterLists as any)?.filter(
        (item: { pageCode: string }) =>
          item.pageCode == _globalFilter.global_filter.p_master_page_code
      );
      setMasterLables(filteredMasterDataLables);
    }
  }, [modelData, locationData, userData, masterData, _globalFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityList: any = await getApiData(
          vahanFilterVal?.state === null
            ? `/vahan-cities/filter-city`
            : `/vahan-cities/filter-city?state_id=${vahanFilterVal?.state
                ?.map((obj: any) => obj?.value)
                .join(",")}`
        );

        if (cityList) {
          const cityOptions = cityList?.map((city: any) => ({
            label: city?.name,
            value: city?.id,
          }));

          setCityOptions(cityOptions);
        } else {
          setCityOptions([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (vahanFilterVal?.state !== null) {
      fetchData();
    }
    const fetchRtoData = async () => {
      try {
        const rtoList: any = await getApiData(
          vahanFilterVal?.state === null
            ? `/vahan-rto/filter-rto`
            : `/vahan-rto/filter-rto?state_id=${vahanFilterVal?.state
                ?.map((obj: any) => obj?.value)
                .join(",")}&city_id=${vahanFilterVal?.city
                ?.map((obj: any) => obj?.value)
                .join(",")}`
        );

        if (rtoList) {
          const rtoOptions = rtoList?.map((rto: any) => ({
            label: rto?.name,
            value: rto?.id,
          }));
          setRtoOptions(rtoOptions);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (vahanFilterVal?.city !== null) {
      fetchRtoData();
    }
  }, [vahanFilterVal]);

  useEffect(() => {
    const fetchData = async () => {
      if (window.location.pathname === "/vahan") {
        try {
          const stateList: any = await getApiData("/vahan-states/get-states");
          const makerList: any = await getApiData("/vahan-makers/get-makers");

          if (stateList) {
            const stateOptions = stateList.map((state: any) => ({
              label: state.name,
              value: state.id,
            }));
            setStateOptions(stateOptions);
          }

          if (makerList) {
            const makerOptions = makerList.map((maker: any) => ({
              label: maker.name,
              value: maker.id,
            }));
            setMakerOptions(makerOptions);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
      fetchModel();
      fetchLocation();
      fetchUser();
      fetchMaster();
    };

    fetchData();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node) &&
        !document
          .querySelector(".MuiAutocomplete-popper")
          ?.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm({});

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);

    if (props.cellnum == 1) {
      if (_globalFilter.compare_filter.first_column.p_location == "") {
        setSelected1LocationOnChange([]);
      } else {
        setSelected1LocationOnChange(
          _globalFilter.compare_filter.first_column.p_location.map(
            (item: any) => item.value
          )
        );
      }
      setComman1FilterVal({
        model:
          _globalFilter.compare_filter.first_column.p_model != ""
            ? _globalFilter.compare_filter.first_column.p_model
            : null,
        location:
          _globalFilter.compare_filter.first_column.p_location != ""
            ? _globalFilter.compare_filter.first_column.p_location
            : null,
        user:
          _globalFilter.compare_filter.first_column.p_sc != ""
            ? _globalFilter.compare_filter.first_column.p_sc
            : null,
      });
    } else if (props.cellnum == 2) {
      if (_globalFilter.compare_filter.second_column.p_location == "") {
        setSelected2LocationOnChange([]);
      } else {
        setSelected2LocationOnChange(
          _globalFilter.compare_filter.second_column.p_location.map(
            (item: any) => item.value
          )
        );
      }
      setComman2FilterVal({
        model:
          _globalFilter.compare_filter.second_column.p_model != ""
            ? _globalFilter.compare_filter.second_column.p_model
            : null,
        location:
          _globalFilter.compare_filter.second_column.p_location != ""
            ? _globalFilter.compare_filter.second_column.p_location
            : null,
        user:
          _globalFilter.compare_filter.second_column.p_sc != ""
            ? _globalFilter.compare_filter.second_column.p_sc
            : null,
      });
    } else if (props.cellnum == 3) {
      if (_globalFilter.compare_filter.third_column.p_location == "") {
        setSelected3LocationOnChange([]);
      } else {
        setSelected3LocationOnChange(
          _globalFilter.compare_filter.third_column.p_location.map(
            (item: any) => item.value
          )
        );
      }
      setComman3FilterVal({
        model:
          _globalFilter.compare_filter.third_column.p_model != ""
            ? _globalFilter.compare_filter.third_column.p_model
            : null,
        location:
          _globalFilter.compare_filter.third_column.p_location != ""
            ? _globalFilter.compare_filter.third_column.p_location
            : null,
        user:
          _globalFilter.compare_filter.third_column.p_sc != ""
            ? _globalFilter.compare_filter.third_column.p_sc
            : null,
      });
    } else if (props.cellnum == 4) {
      if (_globalFilter.compare_filter.fourth_column.p_location == "") {
        setSelected4LocationOnChange([]);
      } else {
        setSelected4LocationOnChange(
          _globalFilter.compare_filter.fourth_column.p_location.map(
            (item: any) => item.value
          )
        );
      }
      setComman4FilterVal({
        model:
          _globalFilter.compare_filter.fourth_column.p_model != ""
            ? _globalFilter.compare_filter.fourth_column.p_model
            : null,
        location:
          _globalFilter.compare_filter.fourth_column.p_location != ""
            ? _globalFilter.compare_filter.fourth_column.p_location
            : null,
        user:
          _globalFilter.compare_filter.fourth_column.p_sc != ""
            ? _globalFilter.compare_filter.fourth_column.p_sc
            : null,
      });
    } else {
      if (_globalFilter.global_filter.p_location == "") {
        setSelectedLocationOnChange([]);
      } else {
        setSelectedLocationOnChange(
          _globalFilter.global_filter.p_location.map((item: any) => item.value)
        );
      }
      setCommanFilterVal({
        model:
          _globalFilter.global_filter.p_model != ""
            ? _globalFilter.global_filter.p_model
            : null,
        location:
          _globalFilter.global_filter.p_location != ""
            ? _globalFilter.global_filter.p_location
            : null,
        user:
          _globalFilter.global_filter.p_sc != ""
            ? _globalFilter.global_filter.p_sc
            : null,
      });
    }
    if (_globalFilter.benchmark_toggle == false) {
      userDetails.role.roleCode !== "service_advisor" &&
        userDetails.role.roleCode !== "sales_consultant" &&
        setTimeout(() => {
          if (window.location.pathname == "/inventory") {
            scrollTargetRefs.current.modelFilter.children[0].scrollTop = 1000;
          } else {
            if (window.location.pathname != "/vahan") {
              scrollTargetRefs.current.modelFilter.children[0].scrollTop = 1000;
              scrollTargetRefs.current.branchFilter.children[0].scrollTop = 1000;
              scrollTargetRefs.current.salesConsultantFilter.children[0].scrollTop = 1000;
            } else {
              scrollTargetRefs.current.stateFilter.children[0].scrollTop = 1000;
              if (vahanFilterVal?.city !== null) {
                scrollTargetRefs.current.cityFilter.children[0].scrollTop = 1000;
              } else if (vahanFilterVal?.rto !== null) {
                scrollTargetRefs.current.rtoFilter.children[0].scrollTop = 1000;
              }
              scrollTargetRefs.current.makerFilter.children[0].scrollTop = 1000;
            }
          }
        }, 50);
    }
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const onSubmit = () => {
    if (props.cellnum == 1) {
      updateGlobalFilterKey(
        "compare_filter.first_column.p_model",
        comman1FilterVal.model != null ? comman1FilterVal.model : ""
      );
      updateGlobalFilterKey(
        "compare_filter.first_column.p_location",
        comman1FilterVal.location != null ? comman1FilterVal.location : ""
      );
      updateGlobalFilterKey(
        "compare_filter.first_column.p_sc",
        comman1FilterVal.user != null ? comman1FilterVal.user : ""
      );
    } else if (props.cellnum == 2) {
      updateGlobalFilterKey(
        "compare_filter.second_column.p_model",
        comman2FilterVal.model != null ? comman2FilterVal.model : ""
      );
      updateGlobalFilterKey(
        "compare_filter.second_column.p_location",
        comman2FilterVal.location != null ? comman2FilterVal.location : ""
      );
      updateGlobalFilterKey(
        "compare_filter.second_column.p_sc",
        comman2FilterVal.user != null ? comman2FilterVal.user : ""
      );
    } else if (props.cellnum == 3) {
      updateGlobalFilterKey(
        "compare_filter.third_column.p_model",
        comman3FilterVal.model != null ? comman3FilterVal.model : ""
      );
      updateGlobalFilterKey(
        "compare_filter.third_column.p_location",
        comman3FilterVal.location != null ? comman3FilterVal.location : ""
      );
      updateGlobalFilterKey(
        "compare_filter.third_column.p_sc",
        comman3FilterVal.user != null ? comman3FilterVal.user : ""
      );
    } else if (props.cellnum == 4) {
      updateGlobalFilterKey(
        "compare_filter.fourth_column.p_model",
        comman4FilterVal.model != null ? comman4FilterVal.model : ""
      );
      updateGlobalFilterKey(
        "compare_filter.fourth_column.p_location",
        comman4FilterVal.location != null ? comman4FilterVal.location : ""
      );
      updateGlobalFilterKey(
        "compare_filter.fourth_column.p_sc",
        comman4FilterVal.user != null ? comman4FilterVal.user : ""
      );
    } else {
      if (window.location.pathname != "/vahan") {
        updateGlobalFilterKey(
          "global_filter.p_model",
          commanFilterVal.model != null ? commanFilterVal.model : ""
        );
        updateGlobalFilterKey(
          "global_filter.p_location",
          commanFilterVal.location != null ? commanFilterVal.location : ""
        );
        updateGlobalFilterKey(
          "global_filter.p_sc",
          commanFilterVal.user != null ? commanFilterVal.user : ""
        );
        updateGlobalFilterKey(
          "compare_filter.first_column.p_model",
          commanFilterVal.model != null ? commanFilterVal.model : ""
        );
        updateGlobalFilterKey(
          "compare_filter.first_column.p_location",
          commanFilterVal.location != null ? commanFilterVal.location : ""
        );
        updateGlobalFilterKey(
          "compare_filter.first_column.p_sc",
          commanFilterVal.user != null ? commanFilterVal.user : ""
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.p_model",
          commanFilterVal.model != null ? commanFilterVal.model : ""
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.p_location",
          commanFilterVal.location != null ? commanFilterVal.location : ""
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.p_sc",
          commanFilterVal.user != null ? commanFilterVal.user : ""
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.p_model",
          commanFilterVal.model != null ? commanFilterVal.model : ""
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.p_location",
          commanFilterVal.location != null ? commanFilterVal.location : ""
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.p_sc",
          commanFilterVal.user != null ? commanFilterVal.user : ""
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.p_model",
          commanFilterVal.model != null ? commanFilterVal.model : ""
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.p_location",
          commanFilterVal.location != null ? commanFilterVal.location : ""
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.p_sc",
          commanFilterVal.user != null ? commanFilterVal.user : ""
        );
      } else {
        updateGlobalFilterKey(
          "vahan_filter.p_state_id",
          vahanFilterVal.state != null ? vahanFilterVal.state : ""
        );
        updateGlobalFilterKey(
          "vahan_filter.p_city_id",
          vahanFilterVal.city != null ? vahanFilterVal.city : ""
        );
        updateGlobalFilterKey(
          "vahan_filter.p_rto_id",
          vahanFilterVal.rto != null ? vahanFilterVal.rto : ""
        );
        updateGlobalFilterKey(
          "vahan_filter.p_maker_id",
          vahanFilterVal.maker != null ? vahanFilterVal.maker : ""
        );
      }
    }
    updateGlobalFilterKey("custom_filter", 0);
    handlePopoverClose();
  };

  const resetOnClick = () => {
    if (props.cellnum == 1) {
      setComman1FilterVal({
        model: null,
        location: null,
        user: null,
      });
      updateGlobalFilterKey("compare_filter.first_column.p_model", "");
      updateGlobalFilterKey("compare_filter.first_column.p_location", "");
      updateGlobalFilterKey("compare_filter.first_column.p_sc", "");
    } else if (props.cellnum == 2) {
      setComman2FilterVal({
        model: null,
        location: null,
        user: null,
      });
      updateGlobalFilterKey("compare_filter.second_column.p_model", "");
      updateGlobalFilterKey("compare_filter.second_column.p_location", "");
      updateGlobalFilterKey("compare_filter.second_column.p_sc", "");
    } else if (props.cellnum == 3) {
      setComman3FilterVal({
        model: null,
        location: null,
        user: null,
      });
      updateGlobalFilterKey("compare_filter.third_column.p_model", "");
      updateGlobalFilterKey("compare_filter.third_column.p_location", "");
      updateGlobalFilterKey("compare_filter.third_column.p_sc", "");
    } else if (props.cellnum == 4) {
      setComman4FilterVal({
        model: null,
        location: null,
        user: null,
      });
      updateGlobalFilterKey("compare_filter.fourth_column.p_model", "");
      updateGlobalFilterKey("compare_filter.fourth_column.p_location", "");
      updateGlobalFilterKey("compare_filter.fourth_column.p_sc", "");
    } else {
      setComman1FilterVal({
        model: null,
        location: null,
        user: null,
      });
      setComman2FilterVal({
        model: null,
        location: null,
        user: null,
      });
      setComman3FilterVal({
        model: null,
        location: null,
        user: null,
      });
      setComman4FilterVal({
        model: null,
        location: null,
        user: null,
      });
      setCommanFilterVal({
        model: null,
        location: null,
        user: null,
      });
      setVahanFilterVal({
        state: null,
        city: null,
        rto: null,
        maker: null,
      });

      updateGlobalFilterKey("global_filter.p_model", "");
      updateGlobalFilterKey("global_filter.p_sc", "");
      updateGlobalFilterKey("global_filter.p_location", "");
      updateGlobalFilterKey("compare_filter.first_column.p_model", "");
      updateGlobalFilterKey("compare_filter.first_column.p_location", "");
      updateGlobalFilterKey("compare_filter.first_column.p_sc", "");
      updateGlobalFilterKey("compare_filter.second_column.p_model", "");
      updateGlobalFilterKey("compare_filter.second_column.p_location", "");
      updateGlobalFilterKey("compare_filter.second_column.p_sc", "");
      updateGlobalFilterKey("compare_filter.third_column.p_model", "");
      updateGlobalFilterKey("compare_filter.third_column.p_location", "");
      updateGlobalFilterKey("compare_filter.third_column.p_sc", "");
      updateGlobalFilterKey("compare_filter.fourth_column.p_model", "");
      updateGlobalFilterKey("compare_filter.fourth_column.p_location", "");
      updateGlobalFilterKey("compare_filter.fourth_column.p_sc", "");
      updateGlobalFilterKey("vahan_filter.p_state_id", null);
      updateGlobalFilterKey("vahan_filter.p_city_id", null);
      updateGlobalFilterKey("vahan_filter.p_rto_id", null);
      updateGlobalFilterKey("vahan_filter.p_maker_id", null);
    }
    fetchModel();
    fetchLocation();
    fetchUser();
    fetchMaster();
    updateGlobalFilterKey("custom_filter", 0);
    handlePopoverClose();
  };

  const handleInputState = (
    // event: React.ChangeEvent<{}>,
    event: React.SyntheticEvent<Element, Event>,
    newValue: any | null
  ) => {
    setVahanFilterVal((prevState) => {
      return { ...prevState, state: newValue.length > 0 ? newValue : null };
    });

    if (newValue.length === 0) {
      setVahanFilterVal((prevState) => {
        return { ...prevState, city: null, rto: null };
      });
      updateGlobalFilterKey("vahan_filter.p_city_id", null);
      updateGlobalFilterKey("vahan_filter.p_rto_id", null);
      setCityOptions([]);
      setRtoOptions([]);
    }

    // after adding multiple values in Autocomplete field scroll to bottom
    if (scrollTargetRefs.current.stateFilter.children[0]) {
      setTimeout(() => {
        scrollTargetRefs.current.stateFilter.children[0].scrollTop = 1000;
      }, 100);
    }
  };

  const handleInputCity = (
    // event: React.ChangeEvent<{}>,
    event: React.SyntheticEvent<Element, Event>,
    newValue: any | null
  ) => {
    setVahanFilterVal((prevState) => ({
      ...prevState,
      city: newValue?.length > 0 ? newValue : null,
    }));
    // setVahanFilterVal((prevState) => {
    //   return { ...prevState, city: newValue.length > 0 ? newValue : null };
    // });

    // after adding multiple values in Autocomplete field scroll to bottom
    if (scrollTargetRefs.current.cityFilter.children[0]) {
      setTimeout(() => {
        scrollTargetRefs.current.cityFilter.children[0].scrollTop = 1000;
      }, 100);
    }
  };

  const handleInputRto = (
    // event: React.ChangeEvent<{}>,
    event: React.SyntheticEvent<Element, Event>,
    newValue: any | null
  ) => {
    // setVahanFilterVal((prevState) => {
    //   return { ...prevState, rto: newValue.length > 0 ? newValue : null };
    // });
    setVahanFilterVal((prevState) => ({
      ...prevState,
      rto: newValue?.length > 0 ? newValue : null,
    }));

    // after adding multiple values in Autocomplete field scroll to bottom
    if (scrollTargetRefs.current.rtoFilter.children[0]) {
      setTimeout(() => {
        scrollTargetRefs.current.rtoFilter.children[0].scrollTop = 1000;
      }, 100);
    }
  };

  const handleInputMaker = (
    // event: React.ChangeEvent<{}>,
    event: React.SyntheticEvent<Element, Event>,
    newValue: any | null
  ) => {
    setVahanFilterVal((prevState) => {
      return { ...prevState, maker: newValue.length > 0 ? newValue : null };
    });

    // after adding multiple values in Autocomplete field scroll to bottom
    if (scrollTargetRefs.current.makerFilter.children[0]) {
      setTimeout(() => {
        scrollTargetRefs.current.makerFilter.children[0].scrollTop = 1000;
      }, 100);
    }
  };

  const handleInputModel = (
    // event: React.ChangeEvent<{}>,
    event: React.SyntheticEvent<Element, Event>,
    newValue: any | null
  ) => {
    if (props.cellnum == 1) {
      setComman1FilterVal((prevState) => {
        return { ...prevState, model: newValue.length > 0 ? newValue : null };
      });
    } else if (props.cellnum == 2) {
      setComman2FilterVal((prevState) => {
        return { ...prevState, model: newValue.length > 0 ? newValue : null };
      });
    } else if (props.cellnum == 3) {
      setComman3FilterVal((prevState) => {
        return { ...prevState, model: newValue.length > 0 ? newValue : null };
      });
    } else if (props.cellnum == 4) {
      setComman4FilterVal((prevState) => {
        return { ...prevState, model: newValue.length > 0 ? newValue : null };
      });
    } else {
      setCommanFilterVal((prevState) => {
        return { ...prevState, model: newValue.length > 0 ? newValue : null };
      });
    }

    // after adding multiple values in Autocomplete field scroll to bottom
    if (scrollTargetRefs.current.modelFilter.children[0]) {
      setTimeout(() => {
        scrollTargetRefs.current.modelFilter.children[0].scrollTop = 1000;
      }, 100);
    }
  };

  const handleInputLocation = (
    // event: React.ChangeEvent<{}>,
    event: React.SyntheticEvent<Element, Event>,
    newValue: any | null
  ) => {
    const locationArray: any[] = [];
    if (newValue && newValue.length > 0) {
      (newValue as any[])?.map((singleLocation: any) => {
        locationArray.push(singleLocation.value);
        return singleLocation; // Make sure to return the mapped value
      });
    }

    if (props.cellnum == 1) {
      setSelected1LocationOnChange(locationArray);
      setComman1FilterVal((prevState) => {
        return {
          ...prevState,
          location: newValue.length > 0 ? newValue : null,
        };
      });
    } else if (props.cellnum == 2) {
      setSelected2LocationOnChange(locationArray);
      setComman2FilterVal((prevState) => {
        return {
          ...prevState,
          location: newValue.length > 0 ? newValue : null,
        };
      });
    } else if (props.cellnum == 3) {
      setSelected3LocationOnChange(locationArray);
      setComman3FilterVal((prevState) => {
        return {
          ...prevState,
          location: newValue.length > 0 ? newValue : null,
        };
      });
    } else if (props.cellnum == 4) {
      setSelected4LocationOnChange(locationArray);
      setComman4FilterVal((prevState) => {
        return {
          ...prevState,
          location: newValue.length > 0 ? newValue : null,
        };
      });
    } else {
      setSelectedLocationOnChange(locationArray);
      setCommanFilterVal((prevState) => {
        return {
          ...prevState,
          location: newValue.length > 0 ? newValue : null,
        };
      });
    }

    if (
      scrollTargetRefs.current.branchFilter &&
      scrollTargetRefs.current.branchFilter.children[0]
    ) {
      setTimeout(() => {
        scrollTargetRefs.current.branchFilter.children[0].scrollTop = 1000;
      }, 100);
    }
  };

  const handleInputUser = (
    // event: React.ChangeEvent<{}>,
    event: React.SyntheticEvent<Element, Event>,
    newValue: any | null
  ) => {
    if (props.cellnum == 1) {
      setComman1FilterVal((prevState) => {
        return { ...prevState, user: newValue.length > 0 ? newValue : null };
      });
    } else if (props.cellnum == 2) {
      setComman2FilterVal((prevState) => {
        return { ...prevState, user: newValue.length > 0 ? newValue : null };
      });
    } else if (props.cellnum == 3) {
      setComman3FilterVal((prevState) => {
        return { ...prevState, user: newValue.length > 0 ? newValue : null };
      });
    } else if (props.cellnum == 4) {
      setComman4FilterVal((prevState) => {
        return { ...prevState, user: newValue.length > 0 ? newValue : null };
      });
    } else {
      setCommanFilterVal((prevState) => {
        return { ...prevState, user: newValue.length > 0 ? newValue : null };
      });
    }
    // after adding multiple values in Autocomplete field scroll to bottom
    if (
      scrollTargetRefs.current.salesConsultantFilter &&
      scrollTargetRefs.current.salesConsultantFilter.children[0]
    ) {
      setTimeout(() => {
        scrollTargetRefs.current.salesConsultantFilter.children[0].scrollTop = 1000;
      }, 100);
    }
  };

  useEffect(() => {
    if (userOptionsVal) {
      const userOptionValues = new Set(
        userOptionsVal?.map((user: any) => user.value)
      );

      if (props.cellnum == 1) {
        setComman1FilterVal((prevState) => ({
          ...prevState,
          user:
            _globalFilter.compare_filter.first_column.p_sc != ""
              ? _globalFilter.compare_filter.first_column.p_sc?.filter(
                  (user: any) => userOptionValues.has(user.value)
                )
              : null,
        }));
      } else if (props.cellnum == 2) {
        setComman2FilterVal((prevState) => ({
          ...prevState,
          user:
            _globalFilter.compare_filter.second_column.p_sc != ""
              ? _globalFilter.compare_filter.second_column.p_sc?.filter(
                  (user: any) => userOptionValues.has(user.value)
                )
              : null,
        }));
      } else if (props.cellnum == 3) {
        setComman3FilterVal((prevState) => ({
          ...prevState,
          user:
            _globalFilter.compare_filter.third_column.p_sc != ""
              ? _globalFilter.compare_filter.third_column.p_sc?.filter(
                  (user: any) => userOptionValues.has(user.value)
                )
              : null,
        }));
      } else if (props.cellnum == 4) {
        setComman4FilterVal((prevState) => ({
          ...prevState,
          user:
            _globalFilter.compare_filter.fourth_column.p_sc != ""
              ? _globalFilter.compare_filter.fourth_column.p_sc?.filter(
                  (user: any) => userOptionValues.has(user.value)
                )
              : null,
        }));
      } else {
        setCommanFilterVal((prevState) => ({
          ...prevState,
          user:
            _globalFilter.global_filter.p_sc != ""
              ? _globalFilter.global_filter.p_sc?.filter((user: any) =>
                  userOptionValues.has(user.value)
                )
              : null,
        }));
      }

      const userFilter: any[] = userOptionsVal?.map((option: any) => {
        return {
          branchArray: option.branch,
          ...option,
        };
      });
      setUserGroupOptions(userFilter);
    }
  }, [userOptionsVal]);

  // Custom function to filter options based on selected values
  const filterStateOptions = (options: any, { inputValue }: any) => {
    return options?.filter((option: any) => {
      // Check if the option is not already selected
      if (
        _globalFilter.vahan_filter.p_state_id &&
        _globalFilter.vahan_filter.p_state_id?.some(
          (selected: any) => selected.label === option.label
        )
      ) {
        return false;
      }
      // Check if the input value matches the option's label
      return option.label
        .toLowerCase()
        .includes((inputValue as any).toLowerCase());
    });
  };

  const filterCityOptions = (options: any, { inputValue }: any) => {
    return options?.filter((option: any) => {
      // Check if the option is not already selected
      if (
        _globalFilter.vahan_filter.p_city_id &&
        _globalFilter.vahan_filter.p_city_id?.some(
          (selected: any) => selected.label === option.label
        )
      ) {
        return false;
      }
      // Check if the input value matches the option's label
      return option.label
        .toLowerCase()
        .includes((inputValue as any).toLowerCase());
    });
  };

  const filterRtoOptions = (options: any, { inputValue }: any) => {
    return options?.filter((option: any) => {
      // Check if the option is not already selected
      if (
        _globalFilter.vahan_filter.p_rto_id &&
        _globalFilter.vahan_filter.p_rto_id?.some(
          (selected: any) => selected.label === option.label
        )
      ) {
        return false;
      }
      // Check if the input value matches the option's label
      return option.label
        .toLowerCase()
        .includes((inputValue as any).toLowerCase());
    });
  };

  const filterMakerOptions = (options: any, { inputValue }: any) => {
    return options?.filter((option: any) => {
      // Check if the option is not already selected
      if (
        _globalFilter.vahan_filter.p_maker_id &&
        _globalFilter.vahan_filter.p_maker_id?.some(
          (selected: any) => selected.label === option.label
        )
      ) {
        return false;
      }
      // Check if the input value matches the option's label
      return option.label
        .toLowerCase()
        .includes((inputValue as any).toLowerCase());
    });
  };

  const filterModelOptions = (options: any, { inputValue }: any) => {
    if (props.cellnum == 1) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          _globalFilter.compare_filter.first_column.p_model != "" &&
          _globalFilter.compare_filter.first_column.p_model?.some(
            (selected: any) => selected.label === option.label
          )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else if (props.cellnum == 2) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          _globalFilter.compare_filter.second_column.p_model != "" &&
          _globalFilter.compare_filter.second_column.p_model?.some(
            (selected: any) => selected.label === option.label
          )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else if (props.cellnum == 3) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          _globalFilter.compare_filter.third_column.p_model != "" &&
          _globalFilter.compare_filter.third_column.p_model?.some(
            (selected: any) => selected.label === option.label
          )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else if (props.cellnum == 4) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          _globalFilter.compare_filter.fourth_column.p_model != "" &&
          _globalFilter.compare_filter.fourth_column.p_model?.some(
            (selected: any) => selected.label === option.label
          )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          _globalFilter.global_filter.p_model != "" &&
          _globalFilter.global_filter.p_model?.some(
            (selected: any) => selected.label === option.label
          )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    }
  };

  const filterBranchOptions = (options: any, { inputValue }: any) => {
    if (props.cellnum == 1) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          selected1LocationValues?.length > 0 &&
          selected1LocationValues?.some(
            (selected: any) => selected === option.value
          )
          // _globalFilter.compare_filter.first_column.p_location != "" &&
          // _globalFilter.compare_filter.first_column.p_location?.some(
          //   (selected: any) => selected.label === option.label
          // )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else if (props.cellnum == 2) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          selected2LocationValues?.length > 0 &&
          selected2LocationValues?.some(
            (selected: any) => selected === option.value
          )
          // _globalFilter.compare_filter.second_column.p_location != "" &&
          // _globalFilter.compare_filter.second_column.p_location?.some(
          //   (selected: any) => selected.label === option.label
          // )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else if (props.cellnum == 3) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          selected3LocationValues?.length > 0 &&
          selected3LocationValues?.some(
            (selected: any) => selected === option.value
          )
          // _globalFilter.compare_filter.third_column.p_location != "" &&
          // _globalFilter.compare_filter.third_column.p_location?.some(
          //   (selected: any) => selected.label === option.label
          // )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else if (props.cellnum == 4) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          selected4LocationValues?.length > 0 &&
          selected4LocationValues?.some(
            (selected: any) => selected === option.value
          )
          // _globalFilter.compare_filter.fourth_column.p_location != "" &&
          // _globalFilter.compare_filter.fourth_column.p_location?.some(
          //   (selected: any) => selected.label === option.label
          // )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          selectedLocationValues?.length > 0 &&
          selectedLocationValues?.some(
            (selected: any) => selected === option.value
          )
          // _globalFilter.global_filter.p_location != "" &&
          // _globalFilter.global_filter.p_location?.some(
          //   (selected: any) => selected.label === option.label
          // )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    }
  };

  const filterUserOptions = (options: any, { inputValue }: any) => {
    if (props.cellnum == 1) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          _globalFilter.compare_filter.first_column.p_sc != "" &&
          _globalFilter.compare_filter.first_column.p_sc?.some(
            (selected: any) => selected.label === option.label
          )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option?.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else if (props.cellnum == 2) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          _globalFilter.compare_filter.second_column.p_sc != "" &&
          _globalFilter.compare_filter.second_column.p_sc?.some(
            (selected: any) => selected.label === option.label
          )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option?.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else if (props.cellnum == 3) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          _globalFilter.compare_filter.third_column.p_sc != "" &&
          _globalFilter.compare_filter.third_column.p_sc?.some(
            (selected: any) => selected.label === option.label
          )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option?.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else if (props.cellnum == 4) {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          _globalFilter.compare_filter.fourth_column.p_sc != "" &&
          _globalFilter.compare_filter.fourth_column.p_sc?.some(
            (selected: any) => selected.label === option.label
          )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option?.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    } else {
      return options?.filter((option: any) => {
        // Check if the option is not already selected
        if (
          _globalFilter.global_filter.p_sc != "" &&
          _globalFilter.global_filter.p_sc?.some(
            (selected: any) => selected.label === option.label
          )
        ) {
          return false;
        }
        // Check if the input value matches the option's label
        return option?.label
          .toLowerCase()
          .includes((inputValue as any).toLowerCase());
      });
    }
  };

  // const userOptions = userOptionsVal?.map((option: any) => {
  //   return {
  //     branchArray: option.branch,
  //     ...option,
  //   };
  // });

  const GroupHeader = styled("div")(({ theme }) => ({
    position: "sticky",
    top: "-8px",
    padding: "4px 10px",
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === "light"
        ? lighten(theme.palette.primary.light, 0.85)
        : darken(theme.palette.primary.main, 0.8),
  }));

  const GroupItems = styled("ul")({
    padding: 0,
  });

  return (
    <Box
      className={`filter-icons filter-list mx-1.5 ${
        window.location.pathname !== "/summary" ? "" : "hidden"
      }`}
    >
      <FilterAltOutlinedIcon onClick={handlePopoverOpen} />
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className={
          popoverOpen
            ? "animate__animated animate__fadeIn"
            : "animate__animated animate__fadeIn"
        }
      >
        <Card className="share-data filter-list-popup" ref={targetRef}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="header flex justify-between">
              <CloseIcon
                className="cursor-pointer close-icon-main"
                onClick={handlePopoverClose}
              />
            </Box>
            {window.location.pathname != "/vahan" ? (
              <Box className="">
                {_globalFilter.benchmark_toggle == false && (
                  <Box className="single">
                    <label className="mt-0">
                      {masterLablesVal && masterLablesVal[0]?.modelLabel} :
                    </label>
                    <Autocomplete
                      className="custom_filter"
                      multiple
                      id="tags-outlined1"
                      onChange={handleInputModel}
                      options={modelOptionsVal}
                      getOptionLabel={(option: Option) => option.label}
                      value={
                        props.cellnum == 1
                          ? comman1FilterVal.model != null
                            ? comman1FilterVal.model
                            : []
                          : props.cellnum == 2
                          ? comman2FilterVal.model != null
                            ? comman2FilterVal.model
                            : []
                          : props.cellnum == 3
                          ? comman3FilterVal.model != null
                            ? comman3FilterVal.model
                            : []
                          : props.cellnum == 4
                          ? comman4FilterVal.model != null
                            ? comman4FilterVal.model
                            : []
                          : commanFilterVal.model != null
                          ? commanFilterVal.model
                          : []
                      }
                      filterSelectedOptions={true}
                      filterOptions={filterModelOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder=""
                          className="custom_filter_button"
                          ref={(el) =>
                            (scrollTargetRefs.current.modelFilter = el)
                          } // Assign ref for the user Autocomplete
                        />
                      )}
                    />
                  </Box>
                )}
                {userDetails?.role?.roleCode !== "service_advisor" &&
                  userDetails?.role?.roleCode !== "sales_consultant" &&
                  window.location.pathname != "/inventory" && (
                    <>
                      <Box className="single">
                        <label>
                          {masterLablesVal && masterLablesVal[0]?.branchLabel} :{" "}
                        </label>
                        <Autocomplete
                          className="custom_filter"
                          multiple
                          id="tags-outlined2"
                          onChange={handleInputLocation}
                          options={locationOptionsVal}
                          getOptionLabel={(option: Option) => option.label}
                          value={
                            props.cellnum == 1
                              ? comman1FilterVal.location != null
                                ? comman1FilterVal.location
                                : []
                              : props.cellnum == 2
                              ? comman2FilterVal.location != null
                                ? comman2FilterVal.location
                                : []
                              : props.cellnum == 3
                              ? comman3FilterVal.location != null
                                ? comman3FilterVal.location
                                : []
                              : props.cellnum == 4
                              ? comman4FilterVal.location != null
                                ? comman4FilterVal.location
                                : []
                              : commanFilterVal.location != null
                              ? commanFilterVal.location
                              : []
                          }
                          filterSelectedOptions={true}
                          filterOptions={filterBranchOptions}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              placeholder=""
                              className="custom_filter_button"
                              ref={(el) =>
                                (scrollTargetRefs.current.branchFilter = el)
                              } // Assign ref for the user Autocomplete
                            />
                          )}
                        />
                      </Box>

                      {_globalFilter.benchmark_toggle == false && (
                        <Box className="single">
                          <label>
                            {masterLablesVal &&
                              masterLablesVal[0]?.consltantLabel}{" "}
                            :{" "}
                          </label>
                          <Autocomplete
                            className="custom_filter"
                            multiple
                            id="tags-outlined3"
                            onChange={handleInputUser}
                            options={userGroupOptions.sort((a, b) => {
                              const aFirstLetter = String(a.branchArray);
                              const bFirstLetter = String(b.branchArray);
                              return aFirstLetter.localeCompare(bFirstLetter);
                            })}
                            groupBy={(option: any) => option.branchArray}
                            getOptionLabel={(option: Option) => option.label}
                            value={
                              props.cellnum == 1
                                ? comman1FilterVal.user != null
                                  ? comman1FilterVal.user
                                  : []
                                : props.cellnum == 2
                                ? comman2FilterVal.user != null
                                  ? comman2FilterVal.user
                                  : []
                                : props.cellnum == 3
                                ? comman3FilterVal.user != null
                                  ? comman3FilterVal.user
                                  : []
                                : props.cellnum == 4
                                ? comman4FilterVal.user != null
                                  ? comman4FilterVal.user
                                  : []
                                : commanFilterVal.user != null
                                ? commanFilterVal.user
                                : []
                            }
                            filterSelectedOptions={true}
                            filterOptions={filterUserOptions}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                placeholder=""
                                className="custom_filter_button"
                                ref={(el) =>
                                  (scrollTargetRefs.current.salesConsultantFilter =
                                    el)
                                } // Assign ref for the user Autocomplete
                              />
                            )}
                            renderGroup={(params) => (
                              <li key={params.key}>
                                <GroupHeader>{params.group}</GroupHeader>
                                {params.children.map((subObj) => {
                                  const matchedOption = userOptionsVal.find(
                                    (obj) => obj.label === subObj.key
                                  );

                                  return (
                                    <GroupItems
                                      key={subObj.key}
                                      style={{
                                        color:
                                          matchedOption?.status === "active"
                                            ? "#404040"
                                            : "red",
                                      }}
                                    >
                                      {subObj}
                                    </GroupItems>
                                  );
                                })}
                              </li>
                            )}
                          />
                        </Box>
                      )}
                    </>
                  )}
              </Box>
            ) : (
              <Box className="">
                <Box className="single mb-4">
                  <label className="mt-0">State :</label>
                  <Autocomplete
                    className="custom_filter"
                    multiple
                    id="tags-outlined1"
                    onChange={handleInputState}
                    options={stateOptionsVal}
                    getOptionLabel={(option: Option) => option.label}
                    value={
                      vahanFilterVal.state != null ? vahanFilterVal.state : []
                    }
                    filterSelectedOptions={true}
                    filterOptions={filterStateOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder=""
                        className="custom_filter_button"
                        ref={(el) =>
                          (scrollTargetRefs.current.stateFilter = el)
                        } // Assign ref for the user Autocomplete
                      />
                    )}
                  />
                </Box>
                {vahanFilterVal?.state !== null && (
                  <Box className="single mb-4">
                    <label className="mt-0">City :</label>
                    <Autocomplete
                      className="custom_filter"
                      multiple
                      id="tags-outlined1"
                      onChange={handleInputCity}
                      options={cityOptionsVal?.filter(
                        (option) =>
                          !vahanFilterVal?.city ||
                          !vahanFilterVal?.city.some(
                            (selected: any) => selected?.value === option?.value
                          )
                      )}
                      getOptionLabel={(option: Option) => option.label}
                      value={
                        vahanFilterVal?.city != null ? vahanFilterVal?.city : []
                      }
                      filterSelectedOptions={true}
                      filterOptions={filterCityOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder=""
                          className="custom_filter_button"
                          ref={(el) =>
                            (scrollTargetRefs.current.cityFilter = el)
                          } // Assign ref for the user Autocomplete
                        />
                      )}
                    />
                  </Box>
                )}
                {vahanFilterVal?.state !== null &&
                  vahanFilterVal?.city !== null && (
                    <Box className="single mb-4">
                      <label className="mt-0">RTO :</label>
                      <Autocomplete
                        className="custom_filter"
                        multiple
                        id="tags-outlined1"
                        onChange={handleInputRto}
                        options={rtoOptionsVal?.filter(
                          (option) =>
                            !vahanFilterVal?.rto ||
                            !vahanFilterVal?.rto.some(
                              (selected: any) =>
                                selected?.value === option?.value
                            )
                        )}
                        getOptionLabel={(option: Option) => option.label}
                        value={
                          vahanFilterVal.rto != null ? vahanFilterVal.rto : []
                        }
                        filterSelectedOptions={true}
                        filterOptions={filterRtoOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            placeholder=""
                            className="custom_filter_button"
                            ref={(el) =>
                              (scrollTargetRefs.current.rtoFilter = el)
                            } // Assign ref for the user Autocomplete
                          />
                        )}
                      />
                    </Box>
                  )}
                <Box className="single">
                  <label>Maker : </label>
                  <Autocomplete
                    className="custom_filter"
                    multiple
                    id="tags-outlined2"
                    onChange={handleInputMaker}
                    options={makerOptionsVal}
                    getOptionLabel={(option: Option) => option.label}
                    value={
                      vahanFilterVal.maker != null ? vahanFilterVal.maker : []
                    }
                    filterSelectedOptions={true}
                    filterOptions={filterMakerOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder=""
                        className="custom_filter_button"
                        ref={(el) =>
                          (scrollTargetRefs.current.makerFilter = el)
                        } // Assign ref for the user Autocomplete
                      />
                    )}
                  />
                </Box>
              </Box>
            )}

            <ButtonItem type="submit" ButtonTitle="Apply" />

            <ButtonItem
              className="resetButton"
              type="reset"
              ButtonTitle="Reset"
              onClick={resetOnClick}
            />
          </form>
        </Card>
      </Popover>
    </Box>
  );
};

export default FilterOptions;
