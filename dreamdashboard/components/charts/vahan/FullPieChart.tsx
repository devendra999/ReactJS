import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import Image from "next/image";
import { addCommasToNumber, NumberFormat_2, NumberFormat_3 } from "@root/utils/globalFunction";
const Loading = dynamic(() => import("@root/components/Loading"));

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface FullPieChartProps {
  data: { grp_value: string; result: number }[];
  loader?: React.ReactNode;
  chartTitle?: any;
}

const FullPieChart: React.FC<FullPieChartProps> = ({
  data,
  loader,
  chartTitle,
}) => {
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
    //   width: "250",
      position: "right",
      horizontalAlign: "center",
      fontSize: "14px",

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
            val +
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
    //         // height: "70",
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
    //         // height: "68",
    //         width: "100%",
    //         position: "bottom",
    //         horizontalAlign: "center",
    //         fontSize: "10px",
    //       },
    //     },
    //   },
    // ],
  };

  return (
    <Box className="main-wrapper inline-block w-full h-full max-h-full fit-content vahanBox relative">
      {/* <CardHeader title={chartTitle} className="chartTitle" /> */}
      <Box className="dashboard-sales-items compare-filter vahan-piechart h-full">
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
                  width="100%"
                  height="100%"
                  //   style={{ minHeight: "300px", maxHeight: "auto" }}
                />
              </div>
            </Box>
          </Box>
        ) : (
          <Box className="flex align-middle justify-center w-full">
            {loader ? (
              <Loading className="insideChart" />
            ) : (
              <Image
                height={226}
                width={329}
                src="/assets/images/no records found.png"
                alt="No Records Found"
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FullPieChart;
