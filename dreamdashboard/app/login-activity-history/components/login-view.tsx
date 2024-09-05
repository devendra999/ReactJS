import React, { useEffect, useState } from "react";
import { Box, TextField, Grid, InputAdornment } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { Search } from "@mui/icons-material";
import * as XLSX from "xlsx";
import ButtonItem from "@root/components/ButtonItem";

interface LoginActiveHistoryProps {
  viewData: any;
  columns: GridColDef[];
}

interface ActivityViewData {
  id: number | string;
  startLogin: string;
  lastLogin: any;
  duration: string;
}

const LoginView: React.FC<LoginActiveHistoryProps> = ({
  viewData,
  columns,
}) => {
  const router = useRouter();
  const [tableData, setTableData] = useState<ActivityViewData[]>([]);
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    if (viewData && viewData?.data && viewData?.data?.length > 0) {
      const data = viewData?.data?.map((activityView: ActivityViewData) => ({
        id: activityView?.id,
        startLogin: activityView?.startLogin,
        lastLogin: activityView?.lastLogin,
        duration: activityView?.duration,
      }));
      setTableData(data);
    }
  }, [viewData]);

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
    const modifiedRows = filteredRows?.map((row, index) => ({
      // Modify the keys as needed
      'Sr No': index + 1,
      'Login': row?.startLogin,
      'Logout': row?.lastLogin,
      'Duration': row?.duration,
    }));
    const userName = viewData?.userName;

    // Use a template string for the dynamic part of the file name
    const dynamicFileName = `Login View-${userName}.xlsx`;
    const worksheet = XLSX.utils.json_to_sheet(modifiedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `Login View-${userName}.xlsx`);
  };

  return (
    <div>
      <Grid item xs={12} md={12} className="mui-datatable-main login-view-main">
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
            }}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </Box>
      </Grid>
    </div>
  );
};
export default LoginView;
