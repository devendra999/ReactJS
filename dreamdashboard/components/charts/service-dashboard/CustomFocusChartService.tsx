import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "apexcharts/dist/apexcharts.css";
import { Box } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CustomFocusChartServiceProps {
  currentData: any;
}

const CustomFocusChartService: React.FC<CustomFocusChartServiceProps> = (
  props: any
) => {
  // useEffect(() => {
  //   if(currentData.length > 0) {
  const [customerFocusHeadings, setCustomerFocusHeadings] = useState([]);
  const [customerFocusSeries, setCustomerFocusSeries] = useState([]);

  useEffect(() => {
    if (props?.currentData) {
      const labels: any = [];
      const series: any = [];
      for (let i = 0; i < props?.currentData.length; i++) {
        if (props?.currentData[i].kpi_secondary_result !== null) {
          labels.push(props?.currentData[i].kpi_name);
          series.push(Math.round(props?.currentData[i].kpi_secondary_result));
        }
      }
      setCustomerFocusHeadings(labels);
      setCustomerFocusSeries(series);
    }
  }, [props?.currentData]);

  var SalesManagementSeries = [
    props?.currentData?.find((data: any) => data.kpi_name == "Repeat Repair")
      ?.kpi_secondary_result === null
      ? 0
      : Math.round(
          props?.currentData?.find(
            (data: any) => data.kpi_name == "Repeat Repair"
          )?.kpi_secondary_result
        ) + "",
    props?.currentData?.find((data: any) => data.kpi_name == "SDD On PM")
      ?.kpi_secondary_result === null
      ? 0
      : Math.round(
          props?.currentData?.find((data: any) => data.kpi_name == "SDD On PM")
            ?.kpi_secondary_result
        ) + "",
    props?.currentData?.find((data: any) => data.kpi_name == "SDD On GR")
      ?.kpi_secondary_result === null
      ? 0
      : Math.round(
          props?.currentData?.find((data: any) => data.kpi_name == "SDD On GR")
            ?.kpi_secondary_result
        ) + "",
  ];
  var SalesManagementLabels = customerFocusHeadings;

  const series = [
    {
      data: customerFocusSeries,
    },
  ];
  const options: ApexCharts.ApexOptions = {
    // series: [
    //   {
    //     data: SalesManagementSeries,
    //   },
    // ],
    chart: {
      type: "bar",
      height: "420px",
      fontFamily: "Poppins",
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        columnWidth: "40%",
      },
    },
    dataLabels: { enabled: false },
    colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
    xaxis: {
      categories: SalesManagementLabels,
      labels: {
        style: {
          fontSize: "22px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "22px",
          fontWeight: 400,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: ".875rem",
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (opt: any) => {
            const selected = opt?.w?.globals?.labels[opt?.dataPointIndex];
            return `${selected}(%)`;
            // if (selected === 'RR') {
            //   return 'Repeat Repair(%): ';
            // } else if (selected === 'PM') {
            //   return 'SDD on PM(%): ';
            // } else if (selected === 'GR') {
            //   return 'SDD on GR(%): ';
            // }
            // else {
            //   return 'OEM Retail: ';
            // }
          },
        },
      },
    },
    // responsive: [
    //   {
    //     breakpoint: 4000,
    //     options: {
    //       chart: {
    //         height: 400,
    //       },
    //       xaxis: {
    //         labels: {
    //           style: {
    //               fontSize: '22px',
    //           },
    //       }
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //               fontSize: '22px',
    //           },
    //       }
    //       },

    //     },
    //   },
    //   {
    //     breakpoint: 2500,
    //     options: {
    //       chart: {
    //         height: 300,
    //       },
    //       xaxis: {
    //         labels: {
    //           style: {
    //               fontSize: '16px',
    //           },
    //       }
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //               fontSize: '16px',
    //           },
    //       }
    //       },

    //     },
    //   },
    //   {
    //     breakpoint: 1600,
    //     options: {
    //       chart: {
    //         height: 260,
    //       },
    //       xaxis: {
    //         labels: {
    //           style: {
    //               fontSize: '14px',
    //           },
    //       }
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //               fontSize: '14px',
    //           },
    //       }
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
    //       xaxis: {
    //         labels: {
    //           style: {
    //               fontSize: '12px',
    //           },
    //       }
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //               fontSize: '12px',
    //           },
    //       }
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 580,
    //     options: {
    //       chart: {
    //         height: 250,
    //       },
    //       xaxis: {
    //         labels: {
    //           style: {
    //               fontSize: '14px',
    //           },
    //       }
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //               fontSize: '14px',
    //           },
    //       }
    //       },
    //     },
    //   },
    // ],
  };

  //       const renderChart = () => {
  //         if (typeof window !== "undefined") {
  //           const ApexCharts = require("apexcharts");
  //           new ApexCharts(
  //             document.querySelector("#CustomFocusChartService"),
  //             options
  //           ).render();
  //         }
  //       };

  //       renderChart();

  //   }

  // }, [currentData]);

  // return <div id="CustomFocusChartService" style={{ width: "100%" }} />;
  return (
    props?.currentData.length > 0 && (
      <Box id="chartModel" style={{ width: "100%", height: "100%" }}>
        <Chart
          options={options}
          series={series}
          type="bar"
          // width="100%"
          // height="100%"
        />
      </Box>
    )
  );
};

export default CustomFocusChartService;
