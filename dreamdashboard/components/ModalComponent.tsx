"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Tooltip } from "@mui/material";
import Image from "next/image";
import { useKpiControllerKpiChart } from "@root/backend/backendComponents";
import { useAuthStore } from "../store/auth-store";
import * as XLSX from "xlsx";
import axios from "axios";
import DOMPurify from "dompurify";
import { addToLocalStorage, getFromLocalStorage } from "@root/utils";
import AddchartIcon from "@mui/icons-material/Addchart";
import dynamic from "next/dynamic";
import { ddformatString } from "@root/utils/globalFunction";

import { _baseUrl } from "../../src/backend/backendFetcher";
import { useSelector } from "react-redux";
import IconButtonSingle from "./IconButtonSingle";
// import LineChart from "./LineChart";
const Modal = dynamic(() => import("./Modal"));
const ConsultantChart = dynamic(() => import("./ConsultantChart"));
const ModelChart = dynamic(() => import("./ModelChart"));
const MonthChart = dynamic(() => import("./MonthChart"));
const LocationChart = dynamic(() => import("./LocationChart"));
const ModalDataDump = dynamic(() => import("./ModalDataDump"));
const Loading = dynamic(() => import("./Loading"));
const ButtonItem = dynamic(() => import("./ButtonItem"));
const ModalConsultantChart = dynamic(() => import("./ModalConsultantChart"));
const ModalLocationChart = dynamic(() => import("./ModalLocationChart"));
const ModalModelChart = dynamic(() => import("./ModalModelChart"));
import ZoomInIcon from "@mui/icons-material/ZoomIn";

interface ModalComponentProps {
  openModal: boolean;
  closeModal: () => void;
  dashboardToModal: string;
  queryParams: any;
}

const ModalComponent: React.FC<ModalComponentProps> = (props: any) => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);

  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [locationChartToModal, setLocationChartToModal] = useState<any>("");
  const [consultantChartToModal, setConsultantChartToModal] = useState<any>("");
  const [modelChartToModal, setModelChartToModal] = useState<any>("");
  const [modalToChart, setModalToChart] = useState(props.dashboardToModal);
  const currentUser = useAuthStore((state) => state.loginData)?.user;
  const [modalDataDump, setModalDataDump] = useState(false);
  const [aiData, setAiData] = useState<string | null>(null);
  const [predictionData, setPredictionData] = useState<any>(null);
  // const [ isLoading, setIsLoading] = useState(true)
  const [selectedData, setSelectedData] = useState(false);
  const [renderOrder, setRenderOrder] = useState(0);
  const [chart1, setChart1] = useState(false);
  const [chart2, setChart2] = useState(false);
  const [chart3, setChart3] = useState(false);
  const [chart4, setChart4] = useState(false);
  const [filtr, setFiltr] = useState(false);
  const [queryParams, setQueryParams] = useState<any>({
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
  });

  let vResults: any = ddformatString(
    props?.dashboardToModal.v_result,
    props?.dashboardToModal.v_value_unit
  );
  if (modalToChart.v_is_seconday_result) {
    vResults +=
      "(" +
      ddformatString(
        modalToChart.v_secondary_result,
        modalToChart.v_sec_value_unit
      ) +
      ")";
  }

  const {
    data: kpiChartData,
    refetch: kpiChartDataFatching,
    isLoading: loading,
  } = useKpiControllerKpiChart(
    {
      queryParams: props.dashboardToModal && queryParams,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (modalToChart && queryParams) {
      kpiChartDataFatching();
    }
  }, [modalToChart, queryParams]);

  useEffect(() => {
    if (props.dashboardToModal) {
      setPredictionData(null);
      setQueryParams({
        p_kpi_id: props.dashboardToModal?.v_kpiid,
        p_kpi_name: props.dashboardToModal?.v_display_column,
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
      });
      kpiChartData;
      setModalToChart({ ...props.dashboardToModal, ...currentUser });
      setFiltr(false);
    }
  }, [props.dashboardToModal]);

  const handleDataDumpPopup = (isOpen: boolean, selectedValue: any) => {
    setSelectedData(selectedValue);
    setModalDataDump(isOpen);
  };

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
    const order = [
      "MonthChart",
      "ModalChart",
      "LocationChart",
      "ConsultantChart",
    ];

    // Simulate a delay (you can replace this with actual data fetching)
    const delay = 1000;

    // Load and render components in the specified order with a delay
    const loadComponentsInOrder = async () => {
      for (const chart of order) {
        switch (chart) {
          case "MonthChart":
            setChart1(true);
            break;
          case "ModalChart":
            setChart2(true);
            break;
          case "LocationChart":
            setChart3(true);
            break;
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
    kpiChartDataFatching();
    loadComponentsInOrder();
  }, [queryParams]);

  const openConsultantModalWithData = (param: any) => {
    setIsModalOpen(true);
    setLocationChartToModal("");
    setModelChartToModal("");

    setConsultantChartToModal({
      ...param,
      ..._globalFilter.global_filter,
    });
  };

  const openLocationModalWithData = (param: any) => {
    setIsModalOpen(true);
    setConsultantChartToModal("");
    setModelChartToModal("");
    setLocationChartToModal({
      ...param,
      ..._globalFilter.global_filter,
    });
  };

  const openModelModalWithData = (param: any) => {
    setIsModalOpen(true);
    setConsultantChartToModal("");
    setLocationChartToModal("");
    setModelChartToModal({
      ...param,
      ..._globalFilter.global_filter,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setConsultantChartToModal("");
    setLocationChartToModal("");
    setModelChartToModal("");
  };

  const [valueTab, setValueTab] = useState(0);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValueTab(newValue);
  };

  const converHtml = (htmlString: string) => {
    // Sanitize the HTML string before rendering
    const cleanHTML = DOMPurify.sanitize(htmlString);

    // Render the sanitized HTML
    return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
  };

  const sendPrediction = () => {
    axios
      .post(_baseUrl + "/forecast/prediction", {
        KPI: modalToChart?.v_kpiid,
        model: _globalFilter.global_filter.p_model,
        branch: _globalFilter.global_filter.p_location,
        consultant: _globalFilter.global_filter.p_sc,
        data: kpiChartData,
        userId: _globalFilter.global_filter.p_user_id,
      })
      .then((response) => {
        // console.log(response,response.data,"predictionData Response")

        setPredictionData(response.data);
        // console.log(response.data, "prediction data");
      });
  };

  // sendPrediction();

  const sendAIData = () => {
    axios
      .post(
        "https://j4su6yicq5qowudtdzdws5wvie0mjtkk.lambda-url.ap-south-1.on.aws/",
        kpiChartData
      )
      .then((response) => {
        const responseData = response?.data?.completion;
        setAiData(responseData);
      });
  };

  // sendChartData();
  useEffect(() => {
    if (valueTab == 1) {
      if (aiData == null) {
        sendAIData();
      }
    }
    // else {
    //   // setAiData(null);
    //   if ((kpiChartData as any)?.statusCode == 200) {
    //     sendPrediction();
    //     // const obj = {
    //     //   KPI: modalToChart?.v_kpiid,
    //     //   model: _globalFilter.global_filter.p_model,
    //     //   branch: _globalFilter.global_filter.p_location,
    //     //   consultant: _globalFilter.global_filter.p_sc,
    //     //   data: kpiChartData,
    //     // };
    //   }
    // }
  }, [valueTab]);

  useEffect(() => {
    if ((kpiChartData as any)?.statusCode == 200) {
      modalToChart.v_is_prediction && sendPrediction();
    }
  }, [kpiChartData]);

  useEffect(() => {
    setAiData(null);
    setValueTab(0);
  }, [_globalFilter]);

  useEffect(() => {
    if (aiData != null) {
      // Create a temporary container element
      const tempContainer = document.createElement("div");

      // Set the innerHTML of the container to the HTML string
      tempContainer.innerHTML = aiData;

      // Retrieve the content of the <body> tag safely
      const bodyContent = tempContainer.querySelector("body")?.innerHTML; // Optional chaining

      if (bodyContent) {
        setAiData(bodyContent);
      } else {
        console.error("Body content not found.");
      }
    }
  }, [aiData]);

  const monthData =
    predictionData === null
      ? (kpiChartData as any)?.data[0]?.return_date
      : (predictionData as any)?.data[0]?.return_date;

  return (
    <Modal
      isOpen={props.openModal}
      onClose={props.closeModal}
      modaltitle={props?.dashboardToModal.v_display_column + ` - ${vResults}`}
      modaltitle1={
        (kpiChartData as any)?.data[0]?.chatgpt_prompt != null
          ? "Autoverse AI"
          : ""
      }
      modalextraclass="show-rotate-icon-responsive modal-grid-items modal-chart"
      excelButton={
        rolewiseDisplay.isChartExportAllowed &&
        ((kpiChartData as any)?.data[0]?.return_date ||
          (kpiChartData as any)?.data[0]?.return_model ||
          (kpiChartData as any)?.data[0]?.return_location ||
          (kpiChartData as any)?.data[0]?.return_sc)
          ? true
          : false
      }
      filterFunctionality={true}
      handleExcelDownloadAllData={handleExcelDownloadAllData}
      valueTab={valueTab}
      setValueTab={setValueTab}
      handleChangeTab={handleChangeTab}
      tabModal={
        (kpiChartData as any)?.data[0]?.chatgpt_prompt != null ? true : false
      }
    >
      {valueTab === 0 ? (
        <Grid
          container
          spacing={1}
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

          <Grid item xs={12} lg={8} className="left-grid">
            <Grid item xs={12} className={"left-in-grid"}>
              <Grid className="chartcard" item xs={12} lg={12}>
                {chart1 && monthData ? (
                  <Box className="card">
                    {/* <Box className="card-title">Month wise</Box> */}
                    <Box className="card-body chartcard-overflow">
                      {/* <LineChart
                        data={monthData}
                        kpiData={modalToChart}
                        handleDataDumpPopup={handleDataDumpPopup}
                      ></LineChart> */}
                      <MonthChart
                        kpiData={modalToChart}
                        modalToChart={monthData}
                        handleDataDumpPopup={handleDataDumpPopup}
                        queryParams={queryParams}
                        prediction={
                          predictionData === null
                            ? false
                            : predictionData.data[0].prediction
                        }
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box className="card">
                    {chart1 &&
                    (kpiChartData as any)?.data[0]?.return_date === null ? (
                      <>
                        <Box className="card-title">Month wise</Box>
                        <Box className="card-body norecordbody norecord month-wise">
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
                          chart1 && (kpiChartData as any)?.data[0]?.return_date
                            ? "hide"
                            : "insideChart"
                        } `}
                      />
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              className="left-in-grid two-item"
              container
              spacing={1}
            >
              <Grid item lg={6} xs={12}>
                <Grid className="chartcard" item xs={12} lg={12}>
                  {chart1 &&
                  chart2 &&
                  (kpiChartData as any)?.data[0]?.return_model ? (
                    <Box className="card">
                      <Box className="card-body">
                        <ModelChart
                          kpiData={modalToChart}
                          modalToChart={
                            (kpiChartData as any)?.data[0]?.return_model
                          }
                          handleDataDumpPopup={handleDataDumpPopup}
                          queryParams={queryParams}
                        />
                        {(kpiChartData as any)?.data[0]?.return_model &&
                          (kpiChartData as any)?.data[0]?.return_model.length >
                            8 && (
                            <IconButtonSingle
                              onClick={() =>
                                openModelModalWithData(props.dashboardToModal)
                              }
                              icon={
                                <Tooltip title="Zoom" placement="top">
                                  <ZoomInIcon />
                                </Tooltip>
                              }
                              className="containBtn chart-see-more-btn flex item-center btn"
                            />
                          )}
                        {modelChartToModal && (
                          <ModalModelChart
                            openModal={isModalOpen}
                            closeModal={handleCloseModal}
                            dashboardToModal={modelChartToModal}
                            queryParams={_globalFilter.global_filter}
                          />
                        )}
                      </Box>
                    </Box>
                  ) : (
                    <Box className="card">
                      {chart1 &&
                      chart2 &&
                      (kpiChartData as any)?.data[0]?.return_model === null ? (
                        <>
                          <Box className="card-title">Model wise</Box>
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
                            chart1 &&
                            chart2 &&
                            (kpiChartData as any)?.data[0]?.return_model
                              ? "hide"
                              : "insideChart"
                          } `}
                        />
                      )}
                    </Box>
                  )}
                </Grid>
              </Grid>

              <Grid item lg={6} xs={12}>
                <Grid className="chartcard" item xs={12} lg={12}>
                  {chart1 &&
                  chart2 &&
                  chart3 &&
                  (kpiChartData as any)?.data[0]?.return_location ? (
                    <Box className="card">
                      <Box className="card-body chartcard-overflow">
                        <LocationChart
                          kpiData={modalToChart}
                          modalToChart={
                            (kpiChartData as any)?.data[0]?.return_location
                          }
                          handleDataDumpPopup={handleDataDumpPopup}
                          queryParams={queryParams}
                        />
                        {(kpiChartData as any)?.data[0]?.return_location &&
                          (kpiChartData as any)?.data[0]?.return_location
                            .length > 8 && (
                            <IconButtonSingle
                              onClick={() =>
                                openLocationModalWithData(
                                  props.dashboardToModal
                                )
                              }
                              icon={
                                <Tooltip title="Zoom" placement="top">
                                  <ZoomInIcon />
                                </Tooltip>
                              }
                              className="containBtn chart-see-more-btn flex item-center btn"
                            />
                          )}
                        {locationChartToModal && (
                          <ModalLocationChart
                            openModal={isModalOpen}
                            closeModal={handleCloseModal}
                            dashboardToModal={locationChartToModal}
                            queryParams={_globalFilter.global_filter}
                          />
                        )}
                      </Box>
                    </Box>
                  ) : (
                    <Box className="card">
                      {chart1 &&
                      chart2 &&
                      chart3 &&
                      (kpiChartData as any)?.data[0]?.return_location ===
                        null ? (
                        <>
                          <Box className="card-title">Location wise</Box>
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
                            chart1 &&
                            chart2 &&
                            chart3 &&
                            (kpiChartData as any)?.data[0]?.return_location
                              ? "hide"
                              : "insideChart"
                          } `}
                        />
                      )}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4} className="right-grid">
            <Grid className="chartcard" item xs={12} lg={12}>
              {chart1 &&
              chart2 &&
              chart3 &&
              chart4 &&
              (kpiChartData as any)?.data[0]?.return_sc ? (
                <Box className="card ">
                  <Box className="card-body chartcard-overflow sc-chart">
                    <ConsultantChart
                      kpiData={modalToChart}
                      modalToChart={(kpiChartData as any)?.data[0]?.return_sc}
                      handleDataDumpPopup={handleDataDumpPopup}
                      queryParams={queryParams}
                    />
                    {(kpiChartData as any)?.data[0]?.return_sc &&
                      (kpiChartData as any)?.data[0]?.return_sc.length > 27 && (
                        <IconButtonSingle
                          onClick={() =>
                            openConsultantModalWithData(props.dashboardToModal)
                          }
                          icon={
                            <Tooltip title="Zoom" placement="top">
                              <ZoomInIcon />
                            </Tooltip>
                          }
                          className="containBtn chart-see-more-btn flex item-center btn"
                        />
                      )}
                    {consultantChartToModal && (
                      <ModalConsultantChart
                        openModal={isModalOpen}
                        closeModal={handleCloseModal}
                        dashboardToModal={consultantChartToModal}
                        queryParams={_globalFilter.global_filter}
                      />
                    )}
                  </Box>
                </Box>
              ) : (
                <Box className="card ">
                  {chart1 &&
                  chart2 &&
                  chart3 &&
                  chart4 &&
                  (kpiChartData as any)?.data[0]?.return_sc === null ? (
                    <>
                      <Box className="card-title">
                        {_globalFilter.global_filter.p_master_page_code ===
                        "sl_dashboard"
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
                        chart1 &&
                        chart2 &&
                        chart3 &&
                        chart4 &&
                        (kpiChartData as any)?.data[0]?.return_sc
                          ? "hide"
                          : "insideChart"
                      } `}
                    />
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={1}
          id="chartcardview"
          className="chartcardview"
        >
          <Grid item xs={12}>
            <Box className="chart-AI p-4">
              {aiData == null ? (
                <Loading className={`${aiData ? "hide" : "insideChart"} `} />
              ) : (
                converHtml(aiData as any)
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Modal>
  );
};
export default ModalComponent;
