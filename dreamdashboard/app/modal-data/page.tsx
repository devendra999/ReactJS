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

interface ModalUser {
  numbers: string;
  sr_numbers: string;
  ac_first_name: string;
  ac_last_name: string;
  caller_name: string;
  caller_number: string;
  status: string;
  vin: string;
  current_mileage: string;
  onnumbers: string;
  onsr_numbers: string;
  onac_first_name: string;
  onac_last_name: string;
  oncaller_name: string;
  oncaller_number: string;
  onstatus: string;
  onvin: string;
  oncurrent_mileage: string;
  twonumbers: string;
  twosr_numbers: string;
  twoac_first_name: string;
  twoac_last_name: string;
  twocaller_name: string;
  twocaller_number: string;
  twostatus: string;
  twovin: string;
  twocurrent_mileage: string;
  threenumbers: string;
  threesr_numbers: string;
  threeac_first_name: string;
  threeac_last_name: string;
  threecaller_name: string;
  threecaller_number: string;
  threestatus: string;
  threevin: string;
  threecurrent_mileage: string;
}

export default function ModalComponent() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridRows, setGridRows] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const queryParams = {
    p_kpi_id: 15,
    p_kpi_name: "Walk-in",
    p_start_date: "2023-03-01",
    p_end_date: "2023-04-30",
    p_model: null,
    p_sc: null,
    p_location: null,
    p_data_dump_filter: null,
    p_data_dump_filter_value: null,
    p_data_dump_start_date: null,
    p_data_dump_end_date: null,
    p_user_id: 40,
  };

  const { data: kpiDumpData } = useKpiControllerKpiDataDump({
    queryParams: queryParams,
  } as any);

  useEffect(() => {
    if (kpiDumpData) {
      const responseData = (kpiDumpData as any)?.data?.[0]?.fn_kpi_data_dump;
      const columnNames: any = [];

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
    }
  }, [kpiDumpData]);

  // console.log(gridColumns, "sateeee");
  // console.log(gridRows, "sateeee");

  const handleDownloadExcel = () => {
    // console.log("inside download excel fn  ", XLSX);

    const worksheet = XLSX.utils.json_to_sheet(gridRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data_dump.xlsx");
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
      <Box className="modal-data-toptool flex w-full justify-between">
        <ButtonItem ButtonTitle="Excel" onClick={handleDownloadExcel} />

        <TextField
          className="search-box"
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
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalextraclass="data-modal"
        modaltitle="Throughput Total Records"
      >
        <Box className="data-content">
          <Box className="data-content-in">
            <UserList
              columns={gridColumns}
              data={gridRows}
              options={options}
              className="modalgrid-popup-data"
            />
            {/* <Box className='pagination-buttons custom-page-listing  hidden'>
              <button className='pagination-main-button'>
                Previous
              </button>

              <Box className='pagelist'>
                <ul>
                  <li><Link href="/">1</Link></li>
                  <li><Link href="/">2</Link></li>
                  <li className='active'><Link href="/" >3</Link></li>
                  <li><Link href="/">4</Link></li>
                  <li><Link href="/">5</Link></li>
                  <li><Link href="/">6</Link></li>
                </ul>
              </Box>

              <button className='pagination-main-button'>
                Next
              </button>
            </Box> */}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
