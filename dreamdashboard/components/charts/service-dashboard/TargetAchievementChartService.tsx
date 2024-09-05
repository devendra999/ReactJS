import React, { useEffect } from "react";
import ApexCharts from "react-apexcharts";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TargetAchievementChartServiceProps {
  currentData: any;
}

const TargetAchievementChartService: React.FC<
  TargetAchievementChartServiceProps
> = (props: any) => {
  // useEffect(() => {
  //   if(currentData.length > 0){
  // console.log(currentData,'props in target achieve');
  //   var TargetAchievementSeries1 = [189.0];
  // var TargetAchievementSeries2 = [143];
  // var TargetAchievementlabels = ["Ahm"];

  // var TargetAchievementSeries1 = [
  //   currentData?.find((data) => data.kpi_name=="Parts tgt").kpi_result === null ? 'NDF' : Number(currentData?.find((data) => data.kpi_name=="Parts tgt").kpi_result) >= 10000000 ? `${(Number(currentData?.find((data) => data.kpi_name=="Parts tgt").kpi_result)).toFixed(2)} Cr` : Number(currentData?.find((data) => data.kpi_name=="Parts tgt").kpi_result) >= 100000 ? `${(Number(currentData?.find((data) => data.kpi_name=="Parts tgt").kpi_result)).toFixed(2)} L` : Number(currentData?.find((data) => data.kpi_name=="Parts tgt").kpi_result)
  // ];
  var TargetAchievementSeries1 = [
    props?.currentData?.find((data: any) => data.kpi_code == "parts_target")
      ?.kpi_result === null
      ? "NDF"
      : Math.round(
          props?.currentData?.find(
            (data: any) => data.kpi_code == "parts_target"
          )?.kpi_result
        ),
  ];
  var TargetAchievementSeries2 = [
    props?.currentData?.find(
      (data: any) => data.kpi_code == "parts_achievement"
    )?.kpi_result === null
      ? "NDF"
      : Math.round(
          props?.currentData?.find(
            (data: any) => data.kpi_code == "parts_achievement"
          )?.kpi_result
        ),
  ];
  var TargetAchievementlabels = ["Parts"];

  const series: any[] = [
    {
      name: "Target",
      data: TargetAchievementSeries1,
    },
    {
      name: "Achievement",
      data: TargetAchievementSeries2,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: "420px",
      fontFamily: "Poppins",
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        // borderRadius: 4,
        horizontal: false,
        columnWidth: "40%",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    legend: { show: false },
    colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
    xaxis: {
      categories: TargetAchievementlabels,
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
        fontSize: ".875rem", // Update the font size of the tooltip here
      },
      shared: true,
      intersect: false,
      x: {
        show: true,
        formatter: (seriesName: string) => {
          var selected = seriesName;
          return selected;
          // if (selected == "Parts") {
          //   return "Parts: ";
          // }
          // else if (selected == "Sur") {
          //   return "Surat: ";
          // } else if (selected == "Raj") {
          //   return "Rajkot: ";
          // }
        },
      },
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetX: 0,
        offsetY: -80,
      },
    },

    grid: {
      padding: {
        //   top: -20,
        //   right: 0,
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
    //             fontSize: "22px",
    //           },
    //         },
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //             fontSize: "22px",
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 2500,
    //     options: {
    //       chart: {
    //         height: 240,
    //       },
    //       xaxis: {
    //         labels: {
    //           style: {
    //             fontSize: "16px",
    //           },
    //         },
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //             fontSize: "16px",
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
    //       xaxis: {
    //         labels: {
    //           style: {
    //             fontSize: "14px",
    //           },
    //         },
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //             fontSize: "14px",
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 1280,
    //     options: {
    //       chart: {
    //         height: 200,
    //         width: "100%",
    //       },
    //       xaxis: {
    //         labels: {
    //           style: {
    //             fontSize: "12px",
    //           },
    //         },
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //             fontSize: "12px",
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 580,
    //     options: {
    //       chart: {
    //         height: 200,
    //       },
    //       xaxis: {
    //         labels: {
    //           style: {
    //             fontSize: "14px",
    //           },
    //         },
    //       },
    //       yaxis: {
    //         labels: {
    //           style: {
    //             fontSize: "14px",
    //           },
    //         },
    //       },
    //     },
    //   },
    // ],
  };

  // const renderChart = () => {
  //   if (typeof window !== "undefined") {
  //     const ApexCharts = require("apexcharts");
  //     new ApexCharts(
  //       document.querySelector("#TargetAchievementChartService"),
  //       options
  //     ).render();
  //   }
  // };

  // renderChart();
  //   }
  // }, [currentData]);

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

export default TargetAchievementChartService;
