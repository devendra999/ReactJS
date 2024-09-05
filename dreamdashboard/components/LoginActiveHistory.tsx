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
import ButtonItem from "@root/components/ButtonItem";
import * as XLSX from "xlsx";

interface LoginActiveHistoryProps {
  loginData: any;
  columns: GridColDef[];
}

interface ActivityData {
  lastName: string;
  fullName: string;
  id: number | string;
  name: string;
  roleName: string;
  loginCount: number | string;
  lastLogin: string;
  loginFrequency: string;
  action: string;
  isActive: boolean;
}

const LoginActiveHistory: React.FC<LoginActiveHistoryProps> = ({
  loginData,
  columns,
}) => {
  const router = useRouter();
  const [tableData, setTableData] = useState<ActivityData[]>([]);
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    if (loginData && loginData?.length > 0) {
      const data = loginData?.map((activity: ActivityData) => ({
        id: activity?.id,
        name: activity?.fullName,
        roleName: activity?.roleName,
        loginCount: activity?.loginCount,
        lastLogin: activity?.lastLogin,
        loginFrequency: activity?.loginFrequency,
        isActive: activity?.isActive,
        action: activity?.id,
      }));
      setTableData(data);
    }
  }, [loginData]);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const filteredRows = tableData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleDownloadExcel = () => {
    // Assuming filteredRows is your data array
  const modifiedRows = filteredRows?.map((row, index) => ({
    // Modify the keys as needed
    'Sr No': index + 1,
    'User': row.name,
    'Role': row.roleName,
    'Status': row.isActive,
    'Last Logged In': row.lastLogin,
    'No. of Login': row.loginCount,
    'Frequency': row.loginFrequency,
  }));
    const worksheet = XLSX.utils.json_to_sheet(modifiedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Login Activity History.xlsx");
  };

  return (
    <div>
      <Grid
        item
        xs={12}
        md={12}
        className="mui-datatable-main login-view-wrapper sm:pt-[0.9375rem;]"
      >
        <Box className="text-right search-data" mb={3}>
          <TextField
            type="search"
            value={searchText}
            onChange={handleSearchTextChange}
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="medium" className="mb-[7px]" />
                </InputAdornment>
              ),
            }}
          />
          <ButtonItem
            ButtonTitle="Excel"
            className="excel-btn"
            onClick={handleDownloadExcel}
          />
        </Box>
        <Box className="MuiDataGrid-resizableContainer table-main-wrapper">
          <DataGrid
            className="MuiDataGrid-cellCenter"
            rows={filteredRows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              sorting: {
                sortModel: [{ field: "lastLogin", sort: "desc" }],
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </Box>
      </Grid>
    </div>
  );
};

export default LoginActiveHistory;
