"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Box, Grid } from "@mui/material";
import UserList from "@root/components/UserList";
import ButtonItem from "@root/components/ButtonItem";
import { TextField, Typography } from "@mui/material";
import { MUIDataTableOptions } from "mui-datatables";
import Link from "next/link";
import { useKpiControllerKpiDataDump } from "@root/backend/backendComponents";
import * as XLSX from "xlsx";
import Loading from "./Loading";
import { getFromLocalStorage } from "@root/utils";
import axios from "axios";

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

export default function ModalDataDump(props: any) {
  const [gridColumns, setGridColumns] = useState<any>([]);
  const [gridRows, setGridRows] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [vahanDumpData, setVahanDumpData] = useState<any>([]);
  const [vahanLoading, setVahanLoading] = useState<boolean>(true);
  //   const handleOpenModal = () => {
  //     setIsModalOpen(true);
  //   };
  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );

  const handleCloseModal = () => {
    setGridColumns([]);
    setGridRows([]);
    props.handleDataDumpPopup(false);
  };

  const vahanDataDump = (param: any) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
      process.env.NEXT_PUBLIC_API_DEV_BASE_URL +
        `/vahan/graph/dump?p_start_date=${param?.p_start_date}&p_end_date=${param?.p_end_date}&p_state_id=${param?.p_state_id}&p_city_id=${param.p_city_id}&p_rto_id=${param.p_rto_id}&p_maker_id=${param?.p_maker_id}&p_data_dump_filter=${param?.p_data_dump_filter}&p_data_dump_filter_value=${param?.p_data_dump_filter_value}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        if (response?.data?.statusCode === 200) {
          setVahanLoading(false);
          setVahanDumpData(response?.data?.data);
        } else {
          setVahanLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const queryParamsInventory = {
    p_kpi_id: props?.selectedValue?.p_kpi_id,
    p_kpi_name: props?.selectedValue?.p_display_column,
    p_start_date: props?.selectedValue?.p_start_date,
    p_end_date: props?.selectedValue?.p_end_date,
    p_model: "",
    p_sc: "",
    p_location: "",
    // p_data_dump_filter: "'" + "model" + "'",
    p_data_dump_filter_value:
      "'" + props?.selectedValue?.p_display_column + "'",
    p_user_id: props?.selectedValue?.p_user_id,
  };

  const {
    data: kpiDumpData,
    refetch: kpiDumpDataFetching,
    isLoading: loading,
  } = useKpiControllerKpiDataDump(
    {
      queryParams:
        window.location.pathname === "/inventory"
          ? queryParamsInventory
          : window.location.pathname === "/vahan"
          ? ""
          : props?.selectedValue,
    },
    {
      enabled: false,
    }
  );

  // Custom cell renderer for the "Productivity" column
  const productivityCellRenderer = (
    value: string,
    tableMeta: any,
    updateValue: (newValue: string) => void
  ) => {
    const cellClassName =
      parseFloat(
        tableMeta.rowData[
          gridColumns.findIndex((col: any) => col.name === "Productivity")
        ]
      ) >= 3
        ? "high-productivity"
        : parseFloat(
            tableMeta.rowData[
              gridColumns.findIndex((col: any) => col.name === "Productivity")
            ]
          ) > 2 &&
          parseFloat(
            tableMeta.rowData[
              gridColumns.findIndex((col: any) => col.name === "Productivity")
            ]
          ) < 3
        ? "normal-productivity"
        : "less-productivity";
    // const cellClassName =
    //   parseFloat(value) > 3
    //     ? "high-productivity"
    //     : parseFloat(value) > 2 && parseFloat(value) < 3
    //     ? "normal-productivity"
    //     : "less-productivity";
    return <Typography className={cellClassName}>{value}</Typography>;
  };

  useEffect(() => {
    if (kpiDumpData) {
      const responseData = (kpiDumpData as any)?.data?.[0]?.fn_kpi_data_dump;

      if (props.selectedValue && responseData) {
        const columnNames = [];

        if (props.selectedValue.p_kpi_name === "SC Productivity") {
          // Add a "#" field to each row
          // responseData.forEach((row: any, index: number) => {
          //   row["#"] = (index + 1).toString();
          // });

          responseData.forEach((row: any) => {
            let total = 0;
            let monthsCount = 0;
            for (const month in row) {
              if (month !== "full_name" && month !== "#") {
                total += parseInt(row[month] === null ? 0 : row[month], 10);
                row[month] !== null ? monthsCount++ : 0;
              }
            }
            // console.log(monthsCount + row["full_name"]);
            row["Total"] = total.toString();
            row["Productivity"] = (total / monthsCount).toFixed(2).toString();
          });
          // Push "#" as the first column
          columnNames.push({
            name: "#",
            label: "#",
            options: {
              filter: false,
              sort: true,
            },
          });
        }

        responseData.sort((a: any, b: any) => {
          const productivityA = parseFloat(a.Productivity);
          const productivityB = parseFloat(b.Productivity);

          if (productivityA > productivityB) {
            return -1; // a should come before b in the sorted order
          } else if (productivityA < productivityB) {
            return 1; // b should come before a in the sorted order
          } else {
            return 0; // both items have the same Productivity value
          }
        });

        if (props.selectedValue.p_kpi_name === "SC Productivity") {
          // Add a "#" field to each row
          responseData.forEach((row: any, index: number) => {
            row["#"] = (index + 1).toString();
          });
        }

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
          setGridColumns(columnNames);
          setGridRows(responseData);
        } else {
        }
      }
    }
  }, [kpiDumpData]);

  useEffect(() => {
    if (vahanDumpData?.length > 0) {
      const responseData = vahanDumpData;

      if (props.selectedValue && responseData) {
        const columnNames = [];

        if (responseData !== null) {
          for (const key in responseData[0]) {
            if (key !== "#") {
              columnNames.push({
                name: `${key}`,
                label:
                  `${key}` === "makername"
                    ? "Maker"
                    : `${key}` === "statename"
                    ? "State"
                    : `${key}` === "rtoname"
                    ? "Rto"
                    : `${key}` === "cityname"
                    ? "City"
                    : `${key}` === "date"
                    ? "Date"
                    : `${key}` === "value"
                    ? "Value"
                    : "",
                options: {
                  filter: false,
                  sort: true,
                },
              });
            }
          }

          setGridColumns(columnNames);
          setGridRows(responseData);
        } else {
        }
      }
    }
  }, [vahanDumpData]);

  useEffect(() => {
    if (props.selectedValue) {
      if (window.location.pathname === "/vahan") {
        vahanDataDump(props?.selectedValue);
      } else {
        kpiDumpDataFetching();
      }
    }
  }, [props.selectedValue]);

  const handleDownloadExcel = () => {
    const filteredRows = gridRows?.filter((row: any) => {
      // Customize the condition based on your search requirements
      return Object.values(row).some(
        (value) =>
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data_dump.xlsx");
  };

  const options: MUIDataTableOptions = {
    pagination: true,
    rowsPerPage: 50, // Number of rows per page
    rowsPerPageOptions: [50, 100, 200], // Options for rows per page selection
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
      <Box
        className={`modal-data-toptool flex w-full ${
          rolewiseDisplay.isDumpExportAllowed
            ? `justify-between`
            : `justify-end`
        }`}
      >
        {rolewiseDisplay.isDumpExportAllowed && (
          <ButtonItem ButtonTitle="Excel" onClick={handleDownloadExcel} />
        )}

        <TextField
          className="search-box"
          variant="outlined"
          fullWidth
          placeholder="Search..."
          value={searchText}
          // onChange={(event) => handleSearch(event.target.value)}
          onChange={(event) => {
            setSearchText(event.target.value);
            handleSearch(event.target.value);
          }}
          autoFocus // Automatically focus on the search input
        />
      </Box>
    ),
  };

  return (
    <>
      <Modal
        isOpen={props?.isOpen}
        onClose={handleCloseModal}
        modalextraclass="data-modal"
        modaltitle={
          window.location.pathname !== "/inventory"
            ? props.selectedValue && props.selectedValue.p_kpi_name
            : props.selectedValue && props.selectedValue.p_display_column
        }
      >
        <Box className="data-content">
          {window.location.pathname !== "/vahan" && loading ? (
            <Loading className={`${loading === true ? "" : "hide"} `} />
          ) : window.location.pathname === "/vahan" && vahanLoading ? (
            <Loading className={`${vahanLoading === true ? "" : "hide"} `} />
          ) : (
            <Box className="data-content-in">
              <UserList
                // columns={gridColumns}
                data={gridRows}
                options={options}
                columns={[
                  ...gridColumns.map((col: any) =>
                    col.name === "Productivity" || col.name === "full_name"
                      ? {
                          ...col,
                          options: {
                            ...col.options,
                            customBodyRender: productivityCellRenderer,
                          },
                        }
                      : col
                  ),
                ]}
                className="modalgrid-popup-data"
              />
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
