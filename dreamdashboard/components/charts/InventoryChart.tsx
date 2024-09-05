import React, { useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface InventoryChartProps {
  // Add any additional props needed for the chart
  currentData: any;
}

const InventoryChart: React.FC<InventoryChartProps> = (props: any) => {
  const series: any[] = [
    props?.currentData?.find((data: any) => data.kpi_code == "open_inventory")
      ?.kpi_result === null
      ? "NDF"
      : Math.round(
          props?.currentData?.find(
            (data: any) => data.kpi_code == "open_inventory"
          )?.kpi_result
        ),
    props?.currentData?.find((data: any) => data.kpi_code == "booked_inventory")
      ?.kpi_result === null
      ? "NDF"
      : Math.round(
          props?.currentData?.find(
            (data: any) => data.kpi_code == "booked_inventory"
          )?.kpi_result
        ),
  ];

  const options: ApexCharts.ApexOptions = {
    dataLabels: { enabled: false },
    fill: { type: "gradient" },
    legend: { show: false },
    labels: ["Open", "Booked"],
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
              label: "Total",
              formatter: function () {
                return props?.currentData?.find(
                  (data: any) => data.kpi_code == "total_inventory"
                )?.kpi_result === null
                  ? "NDF"
                  : Math.round(
                      props?.currentData?.find(
                        (data: any) => data.kpi_code == "total_inventory"
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
  return (
    // {
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
    // }
  );
};

export default InventoryChart;
