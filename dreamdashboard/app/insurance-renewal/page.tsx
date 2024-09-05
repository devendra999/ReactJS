"use client";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { Box, Grid } from "@mui/material";
import UserList from "@root/components/UserList";
import ButtonItem from "@root/components/ButtonItem";
import { TextField, Typography } from "@mui/material";
import { MUIDataTableOptions } from "mui-datatables";
import Link from "next/link";
import { useKpiControllerKpiDataDump } from "@root/backend/backendComponents";
import * as XLSX from "xlsx";
import SidebarWithLayout from "../layout-with-sidebar";
import Loading from "@root/components/Loading";
import { PanelHeading } from "@root/components/PanelHeading";
import { getFromLocalStorage } from "@root/utils";

export default function InsuranceData() {
  const [gridColumns, setGridColumns] = useState([]);
  const [gridRows, setGridRows] = useState([]);

  const kpiWiseDisplay: any = JSON.parse(
    getFromLocalStorage("@kpi-ins-renewal") || "{}"
  );
  const userWiseDisplay: any = JSON.parse(
    getFromLocalStorage("@user-details") || "{}"
  );

  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 30);

  const yearStart = currentDate.getFullYear();
  const monthStart = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const dayStart = String(currentDate.getDate()).padStart(2, "0");

  const yearEnd = endDate.getFullYear();
  const monthEnd = String(endDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const dayEnd = String(endDate.getDate()).padStart(2, "0");

  const p_data_dump_start_date =
    `${yearStart}-${monthStart}-${dayStart}`.toString();
  const p_data_dump_end_date = `${yearEnd}-${monthEnd}-${dayEnd}`.toString();

  const queryParams = {
    p_kpi_id: kpiWiseDisplay?.id,
    p_kpi_name: kpiWiseDisplay?.kpi_name,
    p_start_date: `${yearStart}-${monthStart}-${dayStart}`,
    p_end_date: `${yearEnd}-${monthEnd}-${dayEnd}`,
    p_model: "",
    p_sc: "",
    p_location: "",
    p_data_dump_filter: "'" + "date" + "'",
    p_data_dump_filter_value: "",
    p_data_dump_start_date: "'" + p_data_dump_start_date + "'",
    p_data_dump_end_date: "'" + p_data_dump_end_date + "'",
    p_user_id: userWiseDisplay?.id,
  };

  const { data: kpiDumpData } = useKpiControllerKpiDataDump({
    queryParams: queryParams,
  } as any);

  useEffect(() => {
    if (kpiDumpData) {
      const responseData = (kpiDumpData as any)?.data?.[0]?.fn_kpi_data_dump;
      const columnNames: any = [];

      if (responseData && responseData.length > 0) {
        for (const key in responseData[0]) {
          columnNames.push({
            name: `${key}`,
            label: `${key}`,
            options: {
              filter: false,
              sort: true,
            },
          });
        }
        setGridColumns(columnNames);
        setGridRows(responseData);
      } else {
        console.log("responseData is empty or undefined");
      }
    }
  }, [kpiDumpData]);

  const handleDownloadExcel = () => {
    // console.log("inside download excel fn  ", XLSX);

    const worksheet = XLSX.utils.json_to_sheet(gridRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "insurance_data.xlsx");
  };

  const options: MUIDataTableOptions = {
    pagination: true,
    rowsPerPage: 20, // Number of rows per page
    rowsPerPageOptions: [5, 10, 20], // Options for rows per page selection
    filter: false,
    print: false,
    searchOpen: true,
    viewColumns: false,
    download: false,
    search: false,
    selectableRows: "none",
    responsive: "standard",
    customSearchRender: (
      searchText: string,
      handleSearch: (text: string) => void,
      hideSearch: () => void,
      options: MUIDataTableOptions
    ) => (
      <Box className="modal-data-toptool flex w-full justify-between items-center">
        {gridRows.length > 0 && (
          <ButtonItem ButtonTitle="Excel" onClick={handleDownloadExcel} className='animate__animated animate__fadeIn animate__faster'/>
        )}

        <TextField
          className="search-box animate__animated animate__fadeIn animate__faster"
          variant="outlined"
          fullWidth
          placeholder="search"
          value={searchText}
          onChange={(event) => handleSearch(event.target.value)}
          autoFocus // Automatically focus on the search input
        />
      </Box>
    ),
  };

  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 res-title-height insurance-page">
          <PanelHeading
            firstHeading={"Insurance Data"}
            // className="pb-2"

            // filterOption={true}
            // handleChange={handleChange}
            // sendFilterDataToPage={sendFilterData}
            // sendSelectedDateToPage={sendSelectedDate}
            // sendPageCodeToPage={sendPageCode}
            // sendTabDataToPage={sendDateUnit}
          />
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box className="dashboard-sales-items">
            <Box className="data-content data-page-layout bg-lightsky100 rounded-2xl h-full py-4 px-0  animate__animated animate__fadeIn animate__faster ">
              <Box className="data-content-in insurance-data">
                <UserList
                  columns={gridColumns}
                  data={gridRows}
                  options={options}
                  className="modalgrid-popup-data "
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
}
