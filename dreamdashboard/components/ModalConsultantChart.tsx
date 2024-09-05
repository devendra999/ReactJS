"use client";
import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { useKpiControllerKpiChart } from "@root/backend/backendComponents";
import { useAuthStore } from "../store/auth-store";
// import ModalDataDump from "./ModalDataDump";
// import Loading from "./Loading";
import * as XLSX from "xlsx";
// import SalesConsultantChart from "./SalesConsultantChart";
import { getFromLocalStorage } from "@root/utils";

import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
const Modal = dynamic(() => import("./Modal"));
const Loading = dynamic(() => import("./Loading"));
const ModalDataDump = dynamic(() => import("./ModalDataDump"));
const SalesConsultantChart = dynamic(() => import("./SalesConsultantChart"));

interface ModalConsultantChartProps {
  openModal: boolean;
  closeModal: () => void;
  dashboardToModal: string;
  queryParams: any;
}

const ModalConsultantChart: React.FC<ModalConsultantChartProps> = (
  props: any
) => {
  const [modalToChart, setModalToChart] = useState(props.dashboardToModal);
  const currentUser = useAuthStore((state) => state.loginData)?.user;
  const [modalDataDump, setModalDataDump] = useState(false);
  const [selectedData, setSelectedData] = useState(false);
  const [renderOrder, setRenderOrder] = useState(0);
  const [chart4, setChart4] = useState(false);
  const globalFilterSelector = (state: any) => state.globalFilter;
const _globalFilter = useSelector(globalFilterSelector);
  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );

  const getResultFunction = (lists: any) => {
    const res =
      lists.v_value_unit === "CURRENCY"
        ? "₹" +
          " " +
          (lists.v_result >= 10000000
            ? `${(lists.v_result / 10000000).toFixed(2)} Cr`
            : lists.v_result >= 100000
            ? `${(lists.v_result / 100000).toFixed(2)} L`
            : lists.v_result >= 10000
            ? `${Number(Math.round(lists.v_result)).toLocaleString("en-IN")}`
            : lists.v_result < 10000
            ? Math.round(lists.v_result).toLocaleString("en-IN")
            : Number(lists.v_result).toFixed(2))
        : lists.v_value_unit === "TIME"
        ? parseInt((lists.v_result / 24).toString()) +
          "d" +
          " : " +
          parseInt((lists.v_result % 24).toString()) +
          "h"
        : lists.v_value_unit === "INT"
        ? parseInt(lists.v_result).toLocaleString("en-IN")
        : lists.v_value_unit === "PERC"
        ? Math.round(lists.v_result) + " " + "%"
        : lists.v_value_unit === "DECIMAL"
        ? Number(lists.v_result).toFixed(2)
        : "NDF";
    const secondaryResult =
      lists.v_secondary_result !== null && lists.v_is_seconday_result === true
        ? lists.v_sec_value_unit === "CURRENCY"
          ? "₹" +
            " " +
            (lists.v_secondary_result >= 10000000
              ? `${(lists.v_secondary_result / 10000000).toFixed(2)} Cr`
              : lists.v_secondary_result >= 100000
              ? `${(lists.v_secondary_result / 100000).toFixed(2)} L`
              : lists.v_secondary_result >= 10000
              ? `${Number(Math.round(lists.v_secondary_result)).toLocaleString(
                  "en-IN"
                )}`
              : lists.v_secondary_result < 10000
              ? Math.round(lists.v_secondary_result).toLocaleString("en-IN")
              : Number(lists.v_secondary_result).toFixed(2))
          : lists.v_sec_value_unit === "TIME"
          ? parseInt((lists.v_secondary_result / 24).toString()) +
            "d" +
            " : " +
            parseInt((lists.v_secondary_result % 24).toString()) +
            "h"
          : lists.v_sec_value_unit === "INT"
          ? parseInt(lists.v_secondary_result).toLocaleString("en-IN")
          : lists.v_sec_value_unit === "PERC"
          ? Number(lists.v_secondary_result).toFixed(2) + " " + "%"
          : lists.v_sec_value_unit === "DECIMAL"
          ? Number(lists.v_secondary_result).toFixed(2)
          : "NDF"
        : "";
    return secondaryResult ? res + " " + "(" + secondaryResult + ")" : res;
  };

  const vResults = getResultFunction(modalToChart);

  const queryParams = {
    p_kpi_id: modalToChart?.v_kpiid,
    p_kpi_name: modalToChart?.v_display_column,
    p_start_date: _globalFilter.global_filter.p_start_date,
    p_end_date: _globalFilter.global_filter.p_end_date,
    p_model:
      _globalFilter.global_filter.p_model != ""
        ? `ARRAY[${_globalFilter.global_filter.p_model
            .map((model: any) => `'${model.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_model,
    p_sc:
      _globalFilter.global_filter.p_sc != ""
        ? `ARRAY[${_globalFilter.global_filter.p_sc
            .map((sc: any) => `'${sc.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_sc,
    p_location:
      _globalFilter.global_filter.p_location != ""
        ? `ARRAY[${_globalFilter.global_filter.p_location
            .map((location: any) => `'${location.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_location,
    p_user_id: _globalFilter.global_filter.p_user_id,
  };

  const {
    data: kpiChartData,
    refetch: kpiChartDataFatching,
    isLoading: loading,
  } = useKpiControllerKpiChart(
    {
      queryParams: queryParams,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (modalToChart) {
      kpiChartDataFatching();
    }
  }, [modalToChart, kpiChartDataFatching]);

  useEffect(() => {
    if (props.dashboardToModal) {
      kpiChartData;
      setModalToChart({ ...props.dashboardToModal, ...currentUser });
    }
  }, [props.dashboardToModal]);

  const handleDataDumpPopup = (isOpen: boolean, selectedValue: any) => {
    setSelectedData(selectedValue);
    setModalDataDump(isOpen);
  };

  const consultantChartData = (kpiChartData as any)?.data[0]?.return_sc;

  const handleExcelDownloadAllData = () => {
    const workbook = XLSX.utils.book_new();

    const createSheet = (sheetData: any, sheetName: string) => {
      const sheet = XLSX.utils.json_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
    };

    const chartResponse = (kpiChartData as any)?.data[0];

    if (
      chartResponse?.hasOwnProperty("return_date") &&
      chartResponse?.return_date !== null
    ) {
      createSheet(chartResponse?.return_date, "Date");
    }
    if (
      chartResponse?.hasOwnProperty("return_location") &&
      chartResponse?.return_location !== null
    ) {
      createSheet(chartResponse?.return_location, "Location");
    }
    if (
      chartResponse?.hasOwnProperty("return_model") &&
      chartResponse?.return_model !== null
    ) {
      createSheet(chartResponse?.return_model, "Model");
    }
    if (
      chartResponse?.hasOwnProperty("return_sc") &&
      chartResponse?.return_sc !== null
    ) {
      createSheet(chartResponse?.return_sc, "Sales Consultant");
    }

    XLSX.writeFile(
      workbook,
      `${props.dashboardToModal.v_display_column}_kpi_data.xlsx`
    );
  };

  useEffect(() => {
    // Define the rendering order based on your requirements
    const order = ["ConsultantChart"];

    // Simulate a delay (you can replace this with actual data fetching)
    const delay = 1000;

    // Load and render components in the specified order with a delay
    const loadComponentsInOrder = async () => {
      for (const chart of order) {
        switch (chart) {
          case "ConsultantChart":
            setChart4(true);
            break;
          default:
            break;
        }

        // Simulate a delay before rendering the next chart
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    };

    loadComponentsInOrder();
  }, [renderOrder]);

  return (
    <>
      <Modal
        isOpen={props.openModal}
        onClose={props.closeModal}
        modaltitle={props.dashboardToModal.v_display_column + " - " + vResults}
        modalextraclass="show-rotate-icon-responsive modal-grid-items fullyDataChart"
        excelButton={rolewiseDisplay.isChartExportAllowed ? true : false}
        handleExcelDownloadAllData={handleExcelDownloadAllData}
      >
        {/* <Loading className={`${loading ? "" : "hide"} `} /> */}
        <Grid
          container
          spacing={2}
          id="chartcardview"
          className="chartcardview"
        >
          {handleDataDumpPopup && (
            <ModalDataDump
              isOpen={modalDataDump}
              selectedValue={selectedData}
              handleDataDumpPopup={handleDataDumpPopup}
            />
          )}

          <Grid item xs={12} className="right-grid fully">
            <Grid className="chartcard" item xs={12} lg={12}>
              {chart4 && consultantChartData ? (
                <Box className="card ">
                  <Box className="card-body chartcard-overflow sc-chart">
                    <SalesConsultantChart
                      kpiData={props.dashboardToModal}
                      modalToChart={consultantChartData}
                      handleDataDumpPopup={handleDataDumpPopup}
                      queryParams={queryParams}
                    />
                  </Box>
                </Box>
              ) : (
                <Box className="card ">
                  {chart4 && consultantChartData === null ? (
                    <>
                      <Box className="card-title">
                        {modalToChart.p_master_page_code === "sl_dashboard"
                          ? "Sales Consultant wise"
                          : "Service Advisor wise"}
                      </Box>
                      <Box className="card-body norecordbody norecord">
                        <Image
                          height={226}
                          width={329}
                          src="/assets/images/no records found.png"
                          alt="No Records Found"
                        />
                      </Box>
                    </>
                  ) : (
                    <Loading
                      className={`${
                        chart4 && consultantChartData ? "hide" : "insideChart"
                      } `}
                    />
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};
export default ModalConsultantChart;
