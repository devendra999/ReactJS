import React, { useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CrossSellChartProps {
  // Add any additional props needed for the chart
  currentData: any;
  deliveries: any;
}

const CrossSellChart: React.FC<CrossSellChartProps> = (props: any) => {
  // useEffect(() => {
  //   if(currentData.length > 0){

  var CrossSellLabels = ["Car Finance", "Insurance", "Exchange"]; // Replace with your actual labels.
  var CrossSellTotalVal = Number(props?.deliveries); // Replace with your actual total value.

  const series: any[] = [
    props?.currentData?.find((data: any) => data.kpi_code == "car_finance")
      ?.kpi_secondary_result === null
      ? "NDF"
      : Math.round(
          props?.currentData?.find(
            (data: any) => data.kpi_code == "car_finance"
          )?.kpi_secondary_result
        ) + "",
    props?.currentData?.find((data: any) => data.kpi_code == "insurance")
      ?.kpi_secondary_result === null
      ? "NDF"
      : Math.round(
          props?.currentData?.find((data: any) => data.kpi_code == "insurance")
            ?.kpi_secondary_result
        ) + "",
    props?.currentData?.find((data: any) => data.kpi_code == "exchange")
      ?.kpi_secondary_result === null
      ? "NDF"
      : Math.round(
          props?.currentData?.find((data: any) => data.kpi_code == "exchange")
            ?.kpi_secondary_result
        ) + "",
  ];
  const options: ApexCharts.ApexOptions = {
    // series: CrossSellSeries,
    chart: {
      // height: 480,
      // width: "100%",
      parentHeightOffset: 0,
      type: "radialBar",
      fontFamily: "Poppins",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            // fontSize: "30px",
          },
          value: {
            // fontSize: "30px",
          },
          total: {
            show: true,
            label: "Delivered",
            // fontSize: "30px",
            formatter: function () {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return CrossSellTotalVal;
            },
          },
        },
        track: {
          background: "#ddd",
        },
        hollow: {
          margin: 2,
          size: "50%",
          background: "transparent",
          image: undefined,
          imageWidth: 100,
          imageHeight: 100,
          imageOffsetX: 0,
          imageOffsetY: 0,
          imageClipped: true,
          position: "front",
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
          },
        },
      },
    },
    colors: ["#5B97D5", "#245BBB", "#C94E5E"],
    labels: CrossSellLabels,
    grid: {
      padding: {
        top: -20,
        bottom: -20,
      },
    },
    // responsive: [
    //   {
    //     breakpoint: 4000,
    //     options: {
    //       chart: {
    //         height: 450,
    //       },
    //       plotOptions: {
    //         radialBar: {
    //           dataLabels: {
    //             name: {
    //               fontSize: "28px",
    //             },
    //             value: {
    //               fontSize: "28px",
    //             },
    //             total: {
    //               show: true,

    //               fontSize: "28px",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 2500,
    //     options: {
    //       chart: {
    //         height: 300,
    //       },
    //       plotOptions: {
    //         radialBar: {
    //           dataLabels: {
    //             name: {
    //               fontSize: "18px",
    //             },
    //             value: {
    //               fontSize: "18px",
    //             },
    //             total: {

    //               fontSize: "18px",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 1600,
    //     options: {
    //       chart: {
    //         height: 260,
    //       },
    //       plotOptions: {
    //         radialBar: {
    //           dataLabels: {
    //             name: {
    //               fontSize: "16px",
    //             },
    //             value: {
    //               fontSize: "16px",
    //             },
    //             total: {
    //               fontSize: "16px",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 1280,
    //     options: {
    //       chart: {
    //         height: 260,
    //         width: "100%",
    //       },
    //       plotOptions: {
    //         radialBar: {
    //           hollow: {
    //             margin: 5,
    //             size: "33%",
    //           },

    //           dataLabels: {
    //             name: {
    //               fontSize: "14px",
    //             },
    //             value: {
    //               fontSize: "14px",
    //             },
    //             total: {
    //               fontSize: "14px",
    //             },
    //           },
    //         },
    //       },
    //       grid: {
    //         padding: {
    //           // top: -15,
    //           // bottom: -30,
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 580,
    //     options: {
    //       chart: {
    //         height: 300,
    //       },
    //       plotOptions: {
    //         radialBar: {
    //           hollow: {
    //             margin: 5,
    //             size: "30%",
    //           },
    //         },
    //       },
    //       grid: {
    //         padding: {
    //           // top: -30,
    //           // bottom: -30,
    //         },
    //       },
    //     },
    //   },
    // ],
  };

  //     const renderChart = () => {
  //       if (typeof window !== "undefined") {
  //         const ApexCharts = require("apexcharts");
  //         new ApexCharts(
  //           document.querySelector("#CrossSellChart"),
  //           options
  //         ).render();
  //       }
  //     };

  //     renderChart();

  //   }
  // }, [currentData]);

  return (
    props?.currentData?.length > 0 && (
      <Box id="chartModel" style={{ width: "100%", height: "100%" }}>
        <Chart
          options={options}
          series={series}
          type="radialBar"
          // width="100%"
          // height="100%"
        />
      </Box>
    )
  );
};

export default CrossSellChart;
