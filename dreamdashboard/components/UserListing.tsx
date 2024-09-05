import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  IconButton,
  Grid,
  InputAdornment,
} from "@mui/material";
import Image from "next/image";
import editicon from "../assets/icons/edit.svg";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { HighlightOff, Search } from "@mui/icons-material";
import dynamic from "next/dynamic";
const SwitchSmall = dynamic(() => import("./SwitchSmall"));

interface UserListingProps {
  usersData: any;
  columns: GridColDef[];
}

interface UserData {
  role: any;
  id: number | string;
  fullName: string;
  emailId: string;
  contactNumber: string;
  roleId: string;
  isActive: boolean;
  action: string;
}

const UserListing: React.FC<UserListingProps> = ({ usersData, columns }) => {
  const router = useRouter();
  // const limitFromRoute = parseInt(router.query.limit as string) || 50;
  // const pageNumberFromRoute = parseInt(router.query.page_number as string) || 1;
  // const offset = (pageNumberFromRoute - 1) * limitFromRoute;
  const [tableData, setTableData] = useState<UserData[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const [switchFlag, setSwitchFlag] = React.useState<boolean>(false);

  // const sortingOrderFromRoute = router.query.sorting_order as string;
  // const sortingPropertyFromRoute = router.query.sorting_property as string;
  // const sortingOrder = sortingOrderFromRoute;
  // const sortingProperty = sortingPropertyFromRoute;

  useEffect(() => {
    if (usersData && usersData?.length > 0) {
      const data = usersData?.map((user: UserData) => ({
        id: user?.id,
        name: user?.fullName,
        email: user?.emailId,
        phone: user?.contactNumber,
        role: user?.role?.name,
        status: user?.isActive == true ? "Active" : "InActive",
      }));
      setTableData(data);
    }
  }, [usersData]);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };
  

  const filteredRows =
    switchFlag === false
      ? usersData.filter(
          (row: any) =>
            row.role != "SERVICE ADVISOR" &&
            row.role != "SALES CONSULTANT" &&
            Object.values(row).some((value) =>
              String(value).toLowerCase().includes(searchText.toLowerCase())
            )
        )
      : usersData.filter((row: any) =>
            (row.role === "SERVICE ADVISOR" || row.role === "SALES CONSULTANT") &&
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
          )
        );          

  const handleSwitchChange = (event: any) => {
    if (event.target.checked) {
      setSwitchFlag(true);
    } else {
      setSwitchFlag(false);
    }
  };

  return (
    <div>
      <Grid item xs={12} md={12} className="mui-datatable-main">
        <Box className="text-right search-data" mb={3}>
          <TextField
            type="search"
            value={searchText}
            onChange={handleSearchTextChange}
            variant="outlined"
            placeholder="Search User..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="medium" className="mb-[7px]" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className="MuiDataGrid-resizableContainer table-main-wrapper">
          <SwitchSmall
            leftLabel=""
            rightLabel="Show SA/SC"
            className="mx-3 sm:mr-2 switch-small-item ml-0 mr-2.5 mb-3 animate__animated animate__fadeIn max-w-max z-20 relative"
            onChange={handleSwitchChange}
            checked={switchFlag ? true : false}
          />
          <DataGrid
            className="MuiDataGrid-cellCenter"
            rows={filteredRows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            // onRowSelectionModelChange={(newSelectionModel) => {
            //   setSelectionModel(newSelectionModel);
            // }}
            // rowSelectionModel={selectionModel}
          />
        </Box>
      </Grid>
    </div>
  );
};

export default UserListing;
