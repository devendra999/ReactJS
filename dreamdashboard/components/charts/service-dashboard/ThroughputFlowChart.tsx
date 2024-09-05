import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ThroughputFlowChartProps {
  // Add any additional props needed for the chart
  currentData: any;
}

const ThroughputFlowChart: React.FC<ThroughputFlowChartProps> = (
  props: any
) => {
  const [throughtputFlowHeadings, setThroughtputFlowHeadings] = useState([]);
  const [throughtputFlowSeries, setThroughtputFlowSeries] = useState([]);
  // useEffect(() => {
  // if(currentData.length > 0){

  // var LeadSourceSeries = [466,294,144,135,442];
  var LeadSourceLabels = [
    "Referral",
    "Walk-In",
    "IB Call - Dealer",
    "EMH",
    "Others",
  ];

  useEffect(() => {
    if (props?.currentData) {
      const labels: any = [];
      const series: any = [];
      for (let i = 0; i < props?.currentData?.length; i++) {
        if (props?.currentData[i]?.kpi_code !== "total_throughput") {
          labels.push(props?.currentData[i]?.kpi_name);
          series.push(Math.round(props?.currentData[i]?.kpi_result));
        }
      }

      setThroughtputFlowHeadings(labels);
      setThroughtputFlowSeries(series);
    }
  }, [props?.currentData]);

  // const series =  [
  //   // currentData?.find((data) => data.kpi_name=="PM")?.kpi_result === null ? 'NDF' : Math.round(currentData?.find((data) => data.kpi_name=="PM")?.kpi_result),
  //   // currentData?.find((data) => data.kpi_name=="GR")?.kpi_result === null ? 'NDF' : Math.round(currentData?.find((data) => data.kpi_name=="GR")?.kpi_result),
  //   // currentData?.find((data) => data.kpi_name=="B&P")?.kpi_result === null ? 'NDF' : Math.round(currentData?.find((data) => data.kpi_name=="B&P")?.kpi_result),
  // ];
  // const labels=[]
  // for(let i = 0; i< currentData?.length; i++){
  //   labels.push(currentData[i]?.kpi_name);
  //   // series.push(currentData?.find((data) => data?.kpi_display_name==currentData[i]?.kpi_display_name)?.kpi_result === null ? 'NDF' : Math.round(currentData?.find((data) => data?.kpi_display_name ==currentData[i]?.kpi_display_name)?.kpi_result));
  //   series.push(currentData[i]?.kpi_result);
  //   // seriesSum = seriesSum + currentData?.find((data) => data?.kpi_display_name==currentData[i]?.kpi_display_name)?.kpi_result === null ? 'NDF' : Math.round(currentData?.find((data) => data?.kpi_display_name ==currentData[i]?.kpi_display_name)?.kpi_result)

  // }
  const series = throughtputFlowSeries;
  const labels = throughtputFlowHeadings;

  const options: ApexCharts.ApexOptions = {
    // series: [
    //   currentData?.find((data) => data.kpi_name=="PM").kpi_result === null ? 'NDF' : Math.round(currentData?.find((data) => data.kpi_name=="PM").kpi_result),
    //   currentData?.find((data) => data.kpi_name=="GR").kpi_result === null ? 'NDF' : Math.round(currentData?.find((data) => data.kpi_name=="GR").kpi_result),
    //   currentData?.find((data) => data.kpi_name=="B&P").kpi_result === null ? 'NDF' : Math.round(currentData?.find((data) => data.kpi_name=="B&P").kpi_result),
    // ],
    // series: throughtputFlowSeries,
    dataLabels: { enabled: false },
    fill: { type: "gradient" },
    legend: { show: false },
    labels: labels,
    colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
    chart: {
      type: "donut",
      height: "30rem",
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
            lineHeight: "1.5",
            fontSize: "30px",
            total: {
              show: true,
              showAlways: true,
              label: "Throughput",
              fontSize: "30px",
              lineHeight: "1.5",
              fontWeight: 650,
              formatter: function () {
                return props?.currentData?.find(
                  (data: any) => data.kpi_code == "total_throughput"
                )?.kpi_result === null
                  ? "NDF"
                  : Math.round(
                      props?.currentData?.find(
                        (data: any) => data.kpi_code == "total_throughput"
                      )?.kpi_result
                    );
              },
            },
            value: {
              fontSize: "30px",
            },
          },
        },
      },
    },

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

  // const renderChart = () => {
  //   if (typeof window !== "undefined") {
  //     const ApexCharts = require("apexcharts");
  //     new ApexCharts(
  //       document.querySelector("#ThroughputFlowChart"),
  //       options
  //     ).render();
  //   }
  // };

  // renderChart();

  // }
  // }, [currentData]);

  // return <div id="ThroughputFlowChart" style={{ width: "100%" }} />;
  return (
    props?.currentData.length > 0 && (
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

export default ThroughputFlowChart;
