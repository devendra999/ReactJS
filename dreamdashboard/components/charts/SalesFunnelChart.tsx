import React, { useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SalesFunnelChartProps {
  // Add any additional props needed for the chart
  currentData: any;
}

const SalesFunnelChart: React.FC<SalesFunnelChartProps> = (props: any) => {
  // useEffect(() => {
  //   if(currentData.length > 0){
  // console.log(currentData,'props in sales funnelll');
  // var SalesFunnelSeries = [
  //   100,
  //   currentData?.find((data) => data.kpi_name=="Test-drives").kpi_secondary_result === null ? 'NDF' : Math.round(currentData?.find((data) => data.kpi_name=="Test-drives").kpi_secondary_result)  + "",
  //   currentData?.find((data) => data.kpi_name=="Hot Leads").kpi_secondary_result === null ? 'NDF' : Math.round(currentData?.find((data) => data.kpi_name=="Hot Leads").kpi_secondary_result)  + "",
  // ];
  var SalesFunnelLabels = ["Inquiries", "Test-drives", "Hot Leads"];
  // var SalesFunnelTotalVal = Math.round(currentData?.find((data) => data.kpi_name=="Rtl. Conversion").kpi_result)  + "%";

  const series: any[] = [
    100,
    props?.currentData?.find((data: any) => data.kpi_code == "test_drives")
      ?.kpi_secondary_result === null
      ? "NDF"
      : Math.round(
          props?.currentData?.find(
            (data: any) => data.kpi_code == "test_drives"
          )?.kpi_secondary_result
        ) + "",
    props?.currentData?.find((data: any) => data.kpi_code == "hot_leads")
      ?.kpi_secondary_result === null
      ? "NDF"
      : Math.round(
          props?.currentData?.find((data: any) => data.kpi_code == "hot_leads")
            ?.kpi_secondary_result
        ) + "",
  ];
  const options: ApexCharts.ApexOptions = {
    // series: SalesFunnelSeries,
    chart: {
      height: 480,
      width: "100%",
      parentHeightOffset: 0,
      type: "radialBar",
      fontFamily: "Poppins",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "30px",
          },
          value: {
            fontSize: "30px",
          },
          total: {
            show: true,
            label: "Rtl. Conv.",
            fontSize: "30px",
            formatter: (w: any) => {
              // By default this function returns the average of all series.
              // The below is just an example to show the use of a custom formatter function

              return (
                Math.round(
                  props?.currentData?.find(
                    (data: any) => data.kpi_code == "retail_conversion"
                  ).kpi_secondary_result
                ) + "%"
              );
            },
          },
        },
        hollow: {
          margin: 2,
          size: "40%",
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
          },
        },
        track: {
          background: "#ddd",
        },
      },
    },
    colors: ["#5B97D5", "#245BBB", "#C94E5E"],
    labels: SalesFunnelLabels,
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
    //               label: "Rtl. Conv.",
    //               fontSize: "28px",
    //               formatter: (w: any) => {
    //                 // By default this function returns the average of all series.
    //                 // The below is just an example to show the use of a custom formatter function
    //                 return Math.round(currentData?.find((data) => data.kpi_code=="retail_conversion").kpi_secondary_result)  + "%";
    //               },
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
    //               show: true,
    //               label: "Rtl. Conv.",
    //               fontSize: "18px",
    //               formatter: (w: any) => {
    //                 // By default this function returns the average of all series.
    //                 // The below is just an example to show the use of a custom formatter function
    //                 return Math.round(currentData?.find((data) => data.kpi_code=="retail_conversion").kpi_secondary_result)  + "%";
    //               },
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
  //           document.querySelector("#SalesFunnelChart"),
  //           options
  //         ).render();
  //       }
  //     };

  //     renderChart();
  //   }
  // }, [currentData]);

  // return <div id="SalesFunnelChart" style={{ width: "100%" }} />;
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

export default SalesFunnelChart;
