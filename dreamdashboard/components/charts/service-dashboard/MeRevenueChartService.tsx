import React, { useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MeRevenueChartServiceProps {
  // Add any additional props needed for the chart
  currentData: any;
}

const MeRevenueChartService: React.FC<MeRevenueChartServiceProps> = (
  props: any
) => {
  // useEffect(() => {
  //   if(currentData.length > 0){

  var LeadSourceLabels = [
    "Referral",
    "Walk-In",
    "IB Call - Dealer",
    "EMH",
    "Others",
  ];

  const series = [
    props?.currentData?.find((data: any) => data.kpi_code == "pm_parts")
      ?.kpi_result === null
      ? 0
      : Number(
          props?.currentData?.find((data: any) => data.kpi_code == "pm_parts")
            ?.kpi_result
        ),
    props?.currentData?.find((data: any) => data.kpi_code == "pm_labour")
      ?.kpi_result === null
      ? 0
      : Number(
          props?.currentData?.find((data: any) => data.kpi_code == "pm_labour")
            ?.kpi_result
        ),
  ];
  const options: ApexCharts.ApexOptions = {
    // series: [
    //   currentData?.find((data) => data.kpi_name=="Parts BP").kpi_result === null ? 'NDF' : Number(currentData?.find((data) => data.kpi_name=="Parts BP").kpi_result),
    //   currentData?.find((data) => data.kpi_name=="Labour bp").kpi_result === null ? 'NDF' : Number(currentData?.find((data) => data.kpi_name=="Labour bp").kpi_result)
    // ],
    dataLabels: { enabled: false },
    fill: { type: "gradient" },
    legend: { show: false },
    labels: ["Parts", "Labour"],
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
            total: {
              show: true,
              showAlways: true,
              label: "ME",
              fontSize: "30px",
              fontWeight: 650,
              formatter: function () {
                const parts_bp_value =
                  props?.currentData?.find(
                    (data: any) => data.kpi_code == "pm_parts"
                  )?.kpi_result === null
                    ? "NDF"
                    : Number(
                        props?.currentData?.find(
                          (data: any) => data.kpi_code == "pm_parts"
                        )?.kpi_result
                      );
                const labour_bp_value =
                  props?.currentData?.find(
                    (data: any) => data.kpi_code == "pm_labour"
                  )?.kpi_result === null
                    ? "NDF"
                    : Number(
                        props?.currentData?.find(
                          (data: any) => data.kpi_code == "pm_labour"
                        )?.kpi_result
                      );
                const total_value =
                  parts_bp_value === "NDF" || labour_bp_value === "NDF"
                    ? "NDF"
                    : parts_bp_value + labour_bp_value;
                return total_value !== "NDF"
                  ? total_value >= 10000000
                    ? `${(total_value / 10000000).toFixed(2)} Cr`
                    : total_value >= 100000
                    ? `${(total_value / 100000).toFixed(2)} L`
                    : total_value >= 10000
                    ? `${Number(Math.round(total_value)).toLocaleString(
                        "en-IN"
                      )}`
                    : total_value < 10000
                    ? Math.round(total_value).toLocaleString("en-IN")
                    : Number(total_value).toFixed(2)
                  : "NDF";
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

export default MeRevenueChartService;
