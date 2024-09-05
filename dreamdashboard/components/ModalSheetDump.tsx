"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Box } from "@mui/material";
import UserList from "@root/components/UserList";
import { MUIDataTableOptions } from "mui-datatables";
import { useImportFileControllerMappingDashboard } from "@root/backend/backendComponents";

export default function ModalSheetDump(props: any) {
  //   const [isModalOpen, setIsModalOpen] = useState<boolean>(props.isOpen);
  const [gridColumns, setGridColumns] = useState<any>([]);
  const [gridRows, setGridRows] = useState([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(props.page);
  const [numberOfRows, setNumberOfRows] = useState(props.rowPerPage);

  const handleCloseModal = () => {
    setGridColumns([]);
    setGridRows([]);
    props.handleDataDumpPopup(false);
    setNumberOfRows(20);
    setCurrentPage(1);
  };

  const queryParams = {
    p_sheet_id: props?.selectedValue || null,
    p_page_no: currentPage,
    p_page_size: numberOfRows,
  };

  const {
    data: kpiDumpData,
    refetch: kpiDumpDataFetching,
    isLoading: loading,
  } = useImportFileControllerMappingDashboard(
    {
      queryParams,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    setCurrentPage(props.page);
    setNumberOfRows(props.rowPerPage);
  }, [props.rowPerPage, props.page]);

  useEffect(() => {
    if (kpiDumpData) {
      const responseData = (kpiDumpData as any)?.data?.[0]?.v_json;

      if (responseData) {
        const columnNames = [];

        if (responseData !== null) {
          for (const key in responseData[0]) {
            if (key !== "#") {
              columnNames.push({
                name: `${key}`,
                label: `${key}`,
                options: {
                  filter: false,
                  sort: true,
                },
              });
            }
          }
          setTotalCount((kpiDumpData as any)?.data?.[0]?.v_total_record);
          setGridColumns(columnNames);
          setGridRows(responseData);
        } else {
          setTotalCount(0);
        }
      } else {
        setTotalCount(0);
      }
    }
  }, [kpiDumpData]);

  useEffect(() => {
    if (props?.selectedValue) {
      kpiDumpDataFetching();
    }
  }, [props?.selectedValue, currentPage, numberOfRows]);

  const options: MUIDataTableOptions = {
    pagination: true,
    rowsPerPage: numberOfRows, // Number of rows per page
    rowsPerPageOptions: [5, 10, 20, 50, 100], // Options for rows per page selection
    filter: false,
    sort: false,
    print: false,
    searchOpen: true,
    viewColumns: false,
    download: false,
    selectableRows: "none",
    responsive: "standard",
    count: totalCount,
    serverSide: true,
    onChangePage: (currentPage) => {
      setCurrentPage(currentPage + 1);
    },
    onChangeRowsPerPage: (numOfRows: number) => {
      setNumberOfRows(numOfRows);
      setCurrentPage(1);
    },
  };

  return (
    <Modal
      isOpen={props?.isOpen}
      onClose={handleCloseModal}
      modalextraclass="data-modal modal-sheet-dump"
      modaltitle={props?.sheetName}
    >
      <Box className="data-content">
        <Box className="data-content-in">
          <UserList
            columns={gridColumns}
            data={gridRows}
            options={options}
            className="modalgrid-popup-data"
          />
        </Box>
      </Box>
    </Modal>
  );
}
