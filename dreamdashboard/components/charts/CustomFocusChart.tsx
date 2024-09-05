import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
import { useKpiControllerKpiChart } from "@root/backend/backendComponents";
import { useSelector } from "react-redux";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CustomFocusChartProps {
  // Add any additional props needed for the chart
  currentData: any;
  dashboardToModal: any;
}

const CustomFocusChart: React.FC<CustomFocusChartProps> = (props: any) => {
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
      const labelsCopy: any = [];
      const seriesCopy: any = [];

      for (let i = 0; i < ScProdData?.length; i++) {
        labelsCopy.push(ScProdData?.[i]?.location);
        seriesCopy.push(Number((ScProdData?.[i]?.result).toFixed(2)));
      }
      setLabels(labelsCopy);
      setProfitProdSeries(seriesCopy);
    }
  }, [kpiChartData]);
  var ProfitProductivitySeries = profitProdSeries;
  var ProfitProductivityLabels = labels;

  const series: any[] = ProfitProductivitySeries;
  const options: ApexCharts.ApexOptions = {
    dataLabels: { enabled: false },
    fill: { type: "gradient" },
    legend: { show: false },
    labels: ProfitProductivityLabels,
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
              label: "CSAT Score",
              fontSize: "30px",
              lineHeight: "1.5",
              fontWeight: 600,
              formatter: function () {
                return props?.currentData?.find(
                  (data: any) => data.kpi_name == "CSAT Score Sale"
                )?.kpi_result === null
                  ? "NDF"
                  : Math.round(
                      props?.currentData?.find(
                        (data: any) => data.kpi_name == "CSAT Score Sale"
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
    //               },
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
    //               },
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
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // ],
  };
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

export default CustomFocusChart;
