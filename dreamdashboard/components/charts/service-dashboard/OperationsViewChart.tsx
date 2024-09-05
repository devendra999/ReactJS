import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "apexcharts/dist/apexcharts.css";
import { Box } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface OperationsViewChartProps {
  currentData: any;
}

const OperationsViewChart: React.FC<OperationsViewChartProps> = (
  props: any
) => {
  const [operationsViewHeadings, setOperationsViewHeadings] = useState([]);
  const [operationsViewSeries, setOperationsViewSeries] = useState([]);
  // useEffect(() => {
  //   if(currentData.length > 0){

  useEffect(() => {
    if (props?.currentData) {
      const labels: any = [];
      const series: any = [];
      for (let i = 0; i < props?.currentData?.length; i++) {
        if (props?.currentData[i].kpi_code.includes("tat")) {
          labels.push(props?.currentData[i].kpi_name);
          series.push(Math.round(props?.currentData[i].kpi_result));
        }
      }
      setOperationsViewHeadings(labels);
      setOperationsViewSeries(series);
    }
  }, [props?.currentData]);

  const oopLabels = operationsViewHeadings;
  const oopSeries = operationsViewSeries;

  const series = [
    {
      data: oopSeries,
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
        horizontal: false,
        columnWidth: "40%",
      },
    },
    dataLabels: { enabled: false },
    colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
    xaxis: {
      categories: oopLabels,
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
            const selected = opt.w.globals.labels[opt.dataPointIndex];
            return `${selected}:`;
            // if (selected === 'B') {
            //   return 'Bookings: ';
            // } else if (selected === 'D') {
            //   return 'Dlr. Retail: ';
            // } else if (selected === 'P') {
            //   return 'POC Sales: ';
            // } else {
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
  //             document.querySelector("#OperationsViewChart"),
  //             options
  //           ).render();
  //         }
  //       };

  //       renderChart();

  //   }

  // }, [currentData]);

  // return <div id="OperationsViewChart" style={{ width: "100%" }} />;
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

export default OperationsViewChart;
