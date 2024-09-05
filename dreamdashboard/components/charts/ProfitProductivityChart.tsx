import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
import { useKpiControllerKpiChart } from "@root/backend/backendComponents";
import { useAuthStore } from "@root/store/auth-store";
import { useSelector } from "react-redux";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ProfitProductivityChartProps {
  // Add any additional props needed for the chart
  currentData: any;
  dashboardToModal: any;
}

const ProfitProductivityChart: React.FC<ProfitProductivityChartProps> = (
  props: any
) => {
  // useEffect(() => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const [labels, setLabels] = useState([]);
  const [profitProdSeries, setProfitProdSeries] = useState([]);

  let queryParams = {
    p_kpi_id: props?.dashboardToModal?.v_kpiid,
    p_kpi_name: props?.dashboardToModal?.v_display_column,
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
    data: kpiChartData,
    refetch: kpiChartDataFatching,
    isLoading: loading,
  } = useKpiControllerKpiChart(
    {
      queryParams: queryParams,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    kpiChartDataFatching();
  }, []);

  useEffect(() => {
    if (kpiChartData) {
      const ScProdData = (kpiChartData as any)?.data?.[0]?.return_location;
      let labelsCopy: any = [];
      let seriesCopy: any = [];

      for (let i = 0; i < ScProdData?.length; i++) {
        labelsCopy.push(ScProdData?.[i]?.location);
        seriesCopy.push(ScProdData?.[i]?.result);
      }
      setLabels(labelsCopy);
      setProfitProdSeries(seriesCopy);
    }
  }, [kpiChartData]);
  var ProfitProductivitySeries = profitProdSeries;
  var ProfitProductivityLabels = labels.slice(0, 10);

  const series = [
    {
      name: "SC Productivity",
      data: ProfitProductivitySeries.slice(0, 10),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    // series: [
    //   {
    //     name: "SC Productivity",
    //     data: ProfitProductivitySeries,
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
    colors: ["#FF8386"],
    xaxis: {
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

    labels: ProfitProductivityLabels,
    dataLabels: { enabled: false },
    fill: { type: "gradient" },
    legend: { show: false },
    tooltip: {
      style: {
        fontSize: "1rem",
      },
      x: {
        show: true,
        formatter: (seriesName: any) => {
          // if (seriesName === "Ahm") {
          //   return "Ahmedabad: ";
          // } else if (seriesName === "Sur") {
          //   return "Surat: ";
          // } else if (seriesName === "Raj") {
          //   return "Rajkot: ";
          // }
          return seriesName;
        },
      },
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetX: 0,
        offsetY: -70,
      },
    },
    // responsive: [
    //   {
    //     breakpoint: 4000,
    //     options: {
    //       chart: {
    //         height: 300,
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
    //         // height: 300,
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
    //         // height: 260,
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
    //         // height: 260,
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
    //         // height: 250,
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

  //   const renderChart = () => {
  //     if (typeof window !== "undefined") {
  //       const ApexCharts = require("apexcharts");
  //       new ApexCharts(
  //         document.querySelector("#ProfitProductivityChart"),
  //         options
  //       ).render();
  //     }
  //   };

  //   renderChart();
  // }, []);

  // return <div id="ProfitProductivityChart" style={{ width: "100%" }} />;
  return (
    <Box id="chartModel" style={{ width: "100%", height: "100%" }}>
      <Chart
        options={options}
        series={series}
        type="bar"
        // width="100%"
        height="100%"
      />
    </Box>
  );
};

export default ProfitProductivityChart;
