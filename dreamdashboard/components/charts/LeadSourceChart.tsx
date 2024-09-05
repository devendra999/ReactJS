import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
interface LeadSourceChartProps {
  // Add any additional props needed for the chart
  currentData: any;
  inquires: any;
}

function NumberFormat(val: number | undefined): string {
  if (val !== undefined) {
    const formatter = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    });

    if (val >= 10000000) {
      return (val / 10000000).toFixed(2).replace(".00", "") + " Cr";
    } else if (val >= 100000) {
      return (val / 100000).toFixed(2).replace(".00", "") + " L";
    } else if (val >= 100) {
      return formatter.format(val);
    } else if (val >= -100) {
      return formatter.format(val);
    } else if (val >= -100000) {
      return formatter.format(val);
    } else if (val >= -10000000) {
      return (val / 100000).toLocaleString("en-IN") + " L";
    } else {
      return (val / 10000000).toLocaleString("en-IN") + " Cr";
    }
  } else {
    return "";
  }
}

const LeadSourceChart: React.FC<LeadSourceChartProps> = (props) => {
  const [leadSourceHeadings, setLeadSourceHeadings] = useState([]);
  const [leadSourceSeries, setLeadSourceSeries] = useState([]);

  useEffect(() => {
    if (props?.currentData) {
      const labels: any = [];
      const series: any = [];
      let seriesSum: any = 0;
      for (let i = 0; i < props?.currentData?.length; i++) {
        labels.push(props?.currentData[i]?.kpi_display_name);
        series.push(
          props?.currentData?.find(
            (data: any) =>
              data?.kpi_display_name == props?.currentData[i]?.kpi_display_name
          )?.kpi_result === null
            ? "NDF"
            : Math.round(
              props?.currentData?.find(
                  (data:any) =>
                    data?.kpi_display_name == props?.currentData[i]?.kpi_display_name
                )?.kpi_result
              )
        );
        seriesSum =
          seriesSum +
            props?.currentData?.find(
              (data: any) =>
                data?.kpi_display_name ==
                props?.currentData[i]?.kpi_display_name
            )?.kpi_result ===
          null
            ? "NDF"
            : Math.round(
              props?.currentData?.find(
                  (data:any) =>
                    data?.kpi_display_name == props?.currentData[i]?.kpi_display_name
                )?.kpi_result
              );
      }
      labels.push("Others");
      seriesSum = series.reduce(
        (accumulator:any, currentValue:any) =>
          parseInt(accumulator) + parseInt(currentValue),
        0
      );
      series.push(props?.inquires - seriesSum);
      setLeadSourceHeadings(labels);
      setLeadSourceSeries(series);
    }
  }, [props?.currentData]);
  // useEffect(() => {
  //   if(currentData.length > 0){
  var LeadSourceSeries = leadSourceSeries;
  var LeadSourceLabels = leadSourceHeadings;

  const series = LeadSourceSeries;
  const options: ApexCharts.ApexOptions = {
    // series: LeadSourceSeries,
    chart: {
      type: "donut",
      height: 480,
      parentHeightOffset: 0,
      fontFamily: "Poppins",
    },
    tooltip: {
      style: {
        fontSize: ".875rem", // Update the font size of the tooltip here
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Inquiries",
              fontSize: "30px",
              fontWeight: 650,
              formatter: (w: any) => {
                // const ttl = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                const ttl = props?.inquires;
                // console.log(ttl,'ttl');
                // console.log(w.globals.seriesTotals,'globalssss');

                return NumberFormat(ttl);
              },
            },
            value: {
              fontSize: "30px",
            },
          },
        },
      },
    },
    labels: LeadSourceLabels,
    dataLabels: { enabled: false },
    colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
    fill: { type: "gradient" },
    legend: { show: false },

    // responsive: [
    //   {
    //     breakpoint: 4000,
    //     options: {
    //       chart: {
    //         height: 380,
    //       },
    //       plotOptions: {
    //         pie: {
    //           donut: {
    //             labels: {
    //               fontSize: "30px",
    //               total: {
    //                 label: 'Inquiries',
    //                 fontSize: "30px",
    //               },
    //               value: {
    //                 fontSize: "30px",
    //               }
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
    //         height: 260,
    //       },

    //       plotOptions: {
    //         pie: {
    //           donut: {
    //             labels: {
    //               fontSize: "20px",
    //               total: {

    //                 fontSize: "20px",
    //               },
    //               value: {
    //                 fontSize: "20px",
    //               }
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
    //         height: 220,
    //       },

    //       plotOptions: {
    //         pie: {
    //           donut: {
    //             labels: {
    //               fontSize: "16px",
    //               total: {

    //                 fontSize: "16px",
    //               },
    //               value: {
    //                 fontSize: "16px",
    //               }
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
    //         height: 220,
    //       },

    //       plotOptions: {
    //         pie: {
    //           donut: {
    //             labels: {
    //               fontSize: "15px",
    //               total: {

    //                 fontSize: "15px",
    //               },
    //               value: {
    //                 fontSize: "15px",
    //               }
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 580,
    //     options: {
    //       chart: {
    //         height: 230,
    //       },

    //       plotOptions: {
    //         pie: {
    //           donut: {
    //             labels: {
    //               fontSize: "15px",
    //               total: {

    //                 fontSize: "15px",
    //               },
    //               value: {
    //                 fontSize: "15px",
    //               }
    //             },
    //           },
    //         },
    //       },
    //     },
    //   }
    // ],
  };

  //     const renderChart = () => {
  //       if (typeof window !== "undefined") {
  //         const ApexCharts = require("apexcharts");
  //         new ApexCharts(
  //           document.querySelector("#LeadSourceChart"),
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
          type="donut"
          // width="100%"
          // height="100%"
        />
      </Box>
    )
  );
};

export default LeadSourceChart;
