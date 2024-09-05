import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Box, Card, CardContent, CardHeader, Grid, Tooltip } from "@mui/material";
import Image from "next/image";
import {
  addCommasToNumber,
  NumberFormat_2,
  NumberFormat_3,
  NumberFormat_4,
} from "@root/utils/globalFunction";
import ButtonItem from "@root/components/ButtonItem";
import AddchartIcon from "@mui/icons-material/Addchart";
import Modal from "@root/components/Modal";
import FullPieChart from "./FullPieChart";
import IconButtonSingle from "@root/components/IconButtonSingle";
const Loading = dynamic(() => import("@root/components/Loading"));
import ZoomInIcon from "@mui/icons-material/ZoomIn";

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PieChartProps {
  data: { grp_value: string; result: number }[];
  loader?: React.ReactNode;
  chartTitle?: any;
}

const PieChart: React.FC<PieChartProps> = ({ data, loader, chartTitle }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Ensure data is defined and has elements before mapping
  const pieData = data?.length ? data.map((item) => item.result) : [];
  const labels = data?.length ? data.map((item) => item.grp_value) : [];

  let PieChartDividedBy: number = 0;

  const sumOfArray = data?.reduce(
    (n: any, { result }: any) => n + Number(result),
    0
  );
  const averageOfArray = sumOfArray / data?.length;
  PieChartDividedBy = Number(NumberFormat_2(averageOfArray));
  const chartTitleBracket = NumberFormat_4(PieChartDividedBy);

  const options: ApexOptions = {
    chart: {
      height: "100%",
      width: "100%",
      // width: "100px",
      type: "pie",
      fontFamily: "Poppins",
      parentHeightOffset: 0,
    },
    dataLabels: { enabled: false },
    colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
    labels: labels,
    legend: {
      // width: "250",
      height: "60",
      position: "bottom",
      horizontalAlign: "center",
      // fontSize: "14px",

      formatter: function (val: string, opts: any) {
        // return (
        //   "<td>" +
        //   val +
        //   " : <strong>" +
        //   NumberFormat_3(
        //     opts.w.globals.series[opts.seriesIndex],
        //     PieChartDividedBy
        //   ) +
        //   "</strong> (<strong>" +
        //   opts.w.globals.seriesPercent[opts.seriesIndex][0].toFixed(1) +
        //   "%</strong>)</td>"
        // );
        return (
          "<td>" +
          val +
          " : <strong>" +
          addCommasToNumber(opts.w.globals.series[opts.seriesIndex])
           +
          "</strong> (<strong>" +
          opts.w.globals.seriesPercent[opts.seriesIndex][0].toFixed(1) +
          "%</strong>)</td>"
        );
      },
    },
    tooltip: {
      style: {
        fontSize: "14px",
      },
      y: {
        formatter: function (val: number, opts: any) {
          // return (
          //   NumberFormat_3(val, PieChartDividedBy) +
          //   " (" +
          //   opts.globals.seriesPercent[opts.seriesIndex][0].toFixed(1) +
          //   "%)"
          // );
          return (
            addCommasToNumber(val) +
            " (" +
            opts.globals.seriesPercent[opts.seriesIndex][0].toFixed(1) +
            "%)"
          );
        },
      },
    },
    grid: {
      padding: {
        bottom: 0,
      },
    },
    // responsive: [
    //   {
    //     breakpoint: 2081,
    //     options: {
    //       title: {
    //         style: {
    //           fontSize: "20px",
    //         },
    //       },
    //       legend: {
    //         fontSize: "12px",
    //       },
    //       tooltip: {
    //         style: {
    //           fontSize: "12px",
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 1500,
    //     options: {
    //       chart: {
    //         height: "100%",
    //       },
    //       legend: {
    //         height: "70",
    //         width: "100%",
    //         position: "bottom",
    //         horizontalAlign: "center",
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 1280,
    //     options: {
    //       chart: {
    //         height: "100%",
    //       },
    //       legend: {
    //         height: "68",
    //         width: "100%",
    //         position: "bottom",
    //         horizontalAlign: "center",
    //         fontSize: "10px",
    //       },
    //     },
    //   },
    // ],
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        // modaltitle={`${chartTitle} ${chartTitleBracket !== "" ? ` (${chartTitleBracket})` : ""}`}
        modaltitle={`${chartTitle}`}
        modalextraclass="show-rotate-icon-responsive modal-grid-items fullyDataChart"
        // excelButton={rolewiseDisplay.isChartExportAllowed ? true : false}
        // handleExcelDownloadAllData={handleExcelDownloadAllData}
      >
        {/* <Loading className={`${loading ? "" : "hide"} `} /> */}
        <Grid
          container
          spacing={2}
          id="chartcardview"
          className="chartcardview"
        >
          {/* {handleDataDumpPopup && (
            <ModalDataDump
              isOpen={modalDataDump}
              selectedValue={selectedData}
              handleDataDumpPopup={handleDataDumpPopup}
            />
          )} */}

          <Grid item xs={12} className="right-grid fully">
            <Grid className="chartcard" item xs={12} lg={12}>
              {data?.length > 0 && !loader ? (
                <Box className="card ">
                  <Box className="card-body chartcard-overflow sc-chart">
                    <FullPieChart
                      data={data}
                      chartTitle={chartTitle}
                      loader={loader}
                    />
                  </Box>
                </Box>
              ) : (
                <Box className="card">
                  {data?.length == 0 ? (
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
                    <Loading className="insideChart" />
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Modal>
      <Card className="main-wrapper inline-block w-full h-full max-h-full fit-content vahanBox relative">
        {/* <CardHeader title={`${chartTitle} ${chartTitleBracket !== "" ? ` (${chartTitleBracket})` : ""}`} className="chartTitle" /> */}
        <CardHeader title={`${chartTitle}`} className="chartTitle" />
        <CardContent className="dashboard-sales-items compare-filter vahan-piechart h-full">
          {data?.length > 0 && !loader ? (
            <Box
              id="chartMonth"
              style={{ width: "100%", height: "100%" }}
              className="animate__animated animate__fadeIn animate__delay-800ms"
            >
              <Box className="card-body chartcard-overflow sc-chart">
                <div id="chart">
                  <ReactApexChart
                    options={options}
                    series={pieData}
                    type="pie"
                    // width="100%"
                    // height="100%"
                    style={{
                      width: "100%",
                      height: "300px",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      marginBottom: "20px"
                    }}
                  />
                </div>
           
                <IconButtonSingle
                   onClick={() => setIsModalOpen(true)}
                  icon={
                    <Tooltip title="Zoom" placement="top">
                      <ZoomInIcon />
                    </Tooltip>
                  }
                  className="containBtn chart-see-more-btn flex item-center btn"
                />
              </Box>
            </Box>
          ) : (
            <Box className="flex align-middle justify-center w-full  min-h-[226px] h-calc-100-minus-58">
              {loader ? (
                <Loading className="insideChart" />
              ) : (
                <Image
                  height={226}
                  width={329}
                  src="/assets/images/no records found.png"
                  alt="No Records Found"
                  className="object-contain"
                />
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PieChart;
