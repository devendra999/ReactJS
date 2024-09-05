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

interface BrandListingProps {
  brandsList: any;
  columns: GridColDef[];
}

interface brandList {
  role: any;
  id: number | string;
  name: string;
  logoUrl: string;
  logoUrlTwo: string;
  isActive: boolean;
  image: string;
}

const UserListing: React.FC<BrandListingProps> = ({ brandsList, columns }) => {
  const router = useRouter();
  // const limitFromRoute = parseInt(router.query.limit as string) || 50;
  // const pageNumberFromRoute = parseInt(router.query.page_number as string) || 1;
  // const offset = (pageNumberFromRoute - 1) * limitFromRoute;
  const [tableData, setTableData] = useState<brandList[]>([]);
  const [searchText, setSearchText] = React.useState("");

  // const sortingOrderFromRoute = router.query.sorting_order as string;
  // const sortingPropertyFromRoute = router.query.sorting_property as string;
  // const sortingOrder = sortingOrderFromRoute;
  // const sortingProperty = sortingPropertyFromRoute;

  useEffect(() => {
    if (brandsList && brandsList?.length > 0) {
      const data = brandsList?.map((brand: brandList) => ({
        id: brand?.id,
        name: brand?.name,
        logoUrl: brand?.logoUrl,
        logoUrlTwo: brand?.logoUrlTwo,
        status: brand?.isActive == true ? "Active" : "Inactive",
      }));
      setTableData(data);
    }
  }, [brandsList]);

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

  return (
    <div>
      <Grid item xs={12} md={12} className="mui-datatable-main">
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

