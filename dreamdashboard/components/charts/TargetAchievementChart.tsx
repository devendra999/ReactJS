import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
import { useKpiControllerKpiChart } from "@root/backend/backendComponents";
import { useAuthStore } from "@root/store/auth-store";
import { useSelector } from "react-redux";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TargetAchievementChartProps {
  currentData: any;
  achievementChartBody: any;
  targetChartBody: any;
}

const TargetAchievementChart: React.FC<TargetAchievementChartProps> = (
  props: any
) => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const [labels, setLabels] = useState([]);
  const [achievementSeries, setAchievementSeries] = useState([]);
  const [targetSeries, setTargetSeries] = useState([]);
  const currentUser = useAuthStore((state) => state.loginData)?.user;

  let targetQueryParams = {
    p_kpi_id: props?.targetChartBody?.v_kpiid,
    p_kpi_name: props?.targetChartBody?.v_display_column,
    p_start_date: _globalFilter.global_filter.p_start_date,
    p_end_date: _globalFilter.global_filter.p_end_date,
    p_model:
      _globalFilter.global_filter.p_model != ""
        ? `ARRAY[${_globalFilter.global_filter.p_model
            .map((model: any) => `'${model.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_model,
    p_sc:
      _globalFilter.global_filter.p_sc != ""
        ? `ARRAY[${_globalFilter.global_filter.p_sc
            .map((sc: any) => `'${sc.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_sc,
    p_location:
      _globalFilter.global_filter.p_location != ""
        ? `ARRAY[${_globalFilter.global_filter.p_location
            .map((location: any) => `'${location.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_location,
    p_user_id: _globalFilter.global_filter.p_user_id,
  };

  const {
    data: targetKpiChartData,
    refetch: targetKpiChartDataFatching,
    isLoading: targetLoading,
  } = useKpiControllerKpiChart(
    {
      queryParams: targetQueryParams,
    },
    {
      enabled: false,
    }
  );

  let achievementQueryParams = {
    p_kpi_id: props?.achievementChartBody?.v_kpiid,
    p_kpi_name: props?.achievementChartBody?.v_display_column,
    p_start_date: _globalFilter.global_filter.p_start_date,
    p_end_date: _globalFilter.global_filter.p_end_date,
    p_model:
      _globalFilter.global_filter.p_model != ""
        ? `ARRAY[${_globalFilter.global_filter.p_model
            .map((model: any) => `'${model.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_model,
    p_sc:
      _globalFilter.global_filter.p_sc != ""
        ? `ARRAY[${_globalFilter.global_filter.p_sc
            .map((sc: any) => `'${sc.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_sc,
    p_location:
      _globalFilter.global_filter.p_location != ""
        ? `ARRAY[${_globalFilter.global_filter.p_location
            .map((location: any) => `'${location.label}'`)
            .join(",")}]`
        : _globalFilter.global_filter.p_location,
    p_user_id: _globalFilter.global_filter.p_user_id,
  };

  const {
    data: achievementKpiChartData,
    refetch: achievementKpiChartDataFatching,
    isLoading: achievementLoading,
  } = useKpiControllerKpiChart(
    {
      queryParams: achievementQueryParams,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    achievementKpiChartDataFatching();
    targetKpiChartDataFatching();
  }, []);

  useEffect(() => {
    if (achievementKpiChartData && targetKpiChartData) {
      const targetLocationWiseData = (targetKpiChartData as any)?.data?.[0]
        ?.return_location;
      const achievementLocationWiseData = (achievementKpiChartData as any)
        ?.data?.[0]?.return_location;
      const tarAchLabels: any = [];
      const achievementSeries: any = [];
      const targetSeries: any = [];

      if (
        achievementLocationWiseData?.length > targetLocationWiseData?.length
      ) {
        for (let i = 0; i < achievementLocationWiseData?.length; i++) {
          tarAchLabels.push(achievementLocationWiseData?.[i]?.location);
          achievementSeries.push(achievementLocationWiseData?.[i]?.result || 0);
          targetSeries.push(targetLocationWiseData?.[i]?.result || 0);
        }
      } else if (
        achievementLocationWiseData?.length < targetLocationWiseData?.length
      ) {
        for (let i = 0; i < targetLocationWiseData?.length; i++) {
          tarAchLabels.push(targetLocationWiseData?.[i]?.location);
          achievementSeries.push(achievementLocationWiseData?.[i]?.result || 0);
          targetSeries.push(targetLocationWiseData?.[i]?.result || 0);
        }
      } else if (
        achievementLocationWiseData?.length == targetLocationWiseData?.length
      ) {
        for (let i = 0; i < targetLocationWiseData?.length; i++) {
          tarAchLabels.push(targetLocationWiseData?.[i]?.location);
          achievementSeries.push(achievementLocationWiseData?.[i]?.result || 0);
          targetSeries.push(targetLocationWiseData?.[i]?.result || 0);
        }
      }
      setLabels(tarAchLabels.slice(0, 10));
      setAchievementSeries(achievementSeries);
      setTargetSeries(targetSeries);
    }
  }, [achievementKpiChartData, targetKpiChartData]);
  // var TargetAchievementSeries1 = [189.0, 85.0];
  // var TargetAchievementSeries2 = [143, 57];
  // var TargetAchievementlabels = ["Ahm", "Sur"];

  const series = [
    {
      name: "Target",
      data: targetSeries.slice(0, 10),
    },
    {
      name: "Achievement",
      data: achievementSeries.slice(0, 10),
    },
  ];
  const options: ApexCharts.ApexOptions = {
    // series: [
    //   {
    //     name: "Target",
    //     data: TargetAchievementSeries1,
    //   },
    //   {
    //     name: "Achievement",
    //     data: TargetAchievementSeries2,
    //   },
    // ],
    chart: {
      type: "bar",
      height: "420px",
      fontFamily: "Poppins",
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
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
      categories: labels,
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
          if (labels?.includes(selected)) {
            return selected;
          }
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

  //   const renderChart = () => {
  //     if (typeof window !== "undefined") {
  //       const ApexCharts = require("apexcharts");
  //       new ApexCharts(
  //         document.querySelector("#TargetAchievementChart"),
  //         options
  //       ).render();
  //     }
  //   };

  //   renderChart();
  // }, []);

  // return <div id="TargetAchievementChart" style={{ width: "100%" }} />;
  return (
    <Box id="chartModel" style={{ width: "100%", height: "100%" }}>
      {(targetKpiChartData as any)?.data?.[0]?.return_location === null ||
      (achievementKpiChartData as any)?.data?.[0]?.return_location === null ? (
        <p className=" text-center">NDF</p>
      ) : (
        <Chart
          options={options}
          series={series}
          type="bar"
          // width="100%"
          height="100%"
        />
      )}
    </Box>
  );
};

export default TargetAchievementChart;
