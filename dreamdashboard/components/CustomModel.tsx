import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Card, Typography, Box, Popover } from "@mui/material";

import FilterKpiDropdown from "./FilterKpiDropdown";
import {
  useDeleteOneBaseUserFiltersControllerUserFilters,
  useUserFiltersControllerGetFiltersUsingUId,
} from "@root/backend/backendComponents";
import { getFromLocalStorage } from "@root/utils/common";
import { useSelector } from "react-redux";
import { resetCustomFilter } from "@root/utils/globalFunction";
import { updateGlobalFilterKey } from "@root/app/layout";

interface CustomModelProps {
  dropdownVal: any;
}

const CustomModel: React.FC<CustomModelProps> = (props) => {
  const globalFilterSelector = (state: any) => state.globalFilter; // Replace 'globalFilter' with the correct slice name from your Redux store
  const _globalFilter = useSelector(globalFilterSelector);
  const currentUser = getFromLocalStorage("@user-details")
    ? JSON.parse(getFromLocalStorage("@user-details") as string)
    : {};
  // const targetRef = useRef<HTMLDivElement>(null);
  const [userFilterData, setUserFilterData] = useState([]);

  const [dropdownKey, setDropdownKey] = React.useState(0);
  const [dropdownValue, setDropdownValue] = useState<number | undefined>(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
    setDropdownValue(_globalFilter.custom_filter);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const { mutateAsync: deleteFilter } =
    useDeleteOneBaseUserFiltersControllerUserFilters();

  const queryParams = {
    userId: (currentUser as any)?.id,
  };
  const userId = queryParams.userId;

  const { data: userFilterCompareData, refetch: fetchUsers } =
    useUserFiltersControllerGetFiltersUsingUId(
      { pathParams: { userId } },
      {
        enabled: false,
      }
    );

  useEffect(() => {
    if (userFilterCompareData) {
      const userFilterOptions = (userFilterCompareData as any)?.data?.map(
        (user: any) => ({
          label: user.filterName,
          value: String(user.id),
        })
      );
      setUserFilterData(userFilterOptions);
    }
  }, [userFilterCompareData]);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUsers();
  }, [_globalFilter, fetchUsers]);

  const resetDropdown = () => {
    setDropdownKey((prevKey) => prevKey + 1);
    setDropdownValue(0);
  };

  const handleChange = (param: any) => {
    updateGlobalFilterKey("custom_filter", param[0] == "openmodal" ? param[0] : parseInt(param[0]));
    // props.dropdownVal(param);
    // closeModal();
    setDropdownValue(parseInt(param[0]));
    handlePopoverClose();
  };

  const handleSelect = async (selectedValue: number) => {
    // Call the delete API using the deleteFilter hook
    if (selectedValue) {
      try {
        await deleteFilter({
          pathParams: { id: selectedValue },
        });
      } catch (error) {
        console.error("Error deleting filter:", error);
        // Handle error as needed
      }
      const userFilterOptions = (userFilterCompareData as any)?.data?.map(
        (user: any) => ({
          label: user.filterName,
          value: user.id,
        })
      );
      setUserFilterData(userFilterOptions);
      resetDropdown();
      fetchUsers();
      props.dropdownVal(0);
      setDropdownValue(0);
      resetCustomFilter();
    }
  };

  return (
    <Box className="filter-icons userFilter">
      <FilterListIcon onClick={handlePopoverOpen} />

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
      >
        <Card className="share-data">
          <Box className="header flex justify-between">
            <Typography gutterBottom variant="h5" component="h5">
              User Filter :
            </Typography>
            <CloseIcon onClick={handlePopoverClose} />
          </Box>
          <FilterKpiDropdown
            // key={dropdownKey}
            value={dropdownValue}
            className="my-3 small-dropdown-compare"
            dropdownTitle="Select Filters"
            placeholder="Select Filters"
            options={[
              {
                label: "New",
                value: "openmodal",
                className: "new-option-popup-title",
              },
              {
                label: "Quarterly Analysis",
                value: "1",
              },
              ...userFilterData,
            ]}
            sendChildToParent={handleChange}
            onSelect={handleSelect}
          />
        </Card>
      </Popover>
    </Box>
  );
};

export default CustomModel;
