import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
import { useKpiControllerKpiChart } from "@root/backend/backendComponents";
import { useAuthStore } from "@root/store/auth-store";
import { useSelector } from "react-redux";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CrossSellChartServiceProps {
  // Add any additional props needed for the chart
  currentData: any;
  dashboardToModal: any;
}

const CrossSellChartService: React.FC<CrossSellChartServiceProps> = (
  props: any
) => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  var LeadSourceLabels = [
    "Referral",
    "Walk-In",
    "IB Call - Dealer",
    "EMH",
    "Others",
  ];
  const [labels, setLabels] = useState([]);
  const [crossSellSeries, setCrossSellSeries] = useState([]);
  const currentUser = useAuthStore((state) => state.loginData)?.user;

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
      const modelWiseData = (kpiChartData as any)?.data?.[0]?.return_model;

      const labelsCopy: any = [];
      const seriesCopy: any = [];

      for (let i = 0; i < modelWiseData?.length; i++) {
        labelsCopy.push(modelWiseData?.[i]?.model);
        seriesCopy.push(modelWiseData?.[i]?.result);
      }
      setLabels(labelsCopy);
      setCrossSellSeries(seriesCopy);
    }
  }, [kpiChartData]);

  const series: any[] = crossSellSeries;
  const options: ApexCharts.ApexOptions = {
    // series: [2.65, 2.50, 1.43],
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
            total: {
              show: true,
              showAlways: true,
              label: "Cross Sell",
              fontSize: "30px",
              fontWeight: 650,
              formatter: function () {
                const total_value =
                  props?.currentData?.find(
                    (data: any) => data.kpi_name == "Accessories Service"
                  )?.kpi_result === null
                    ? "NDF"
                    : Number(
                        props?.currentData?.find(
                          (data: any) => data.kpi_name == "Accessories Service"
                        )?.kpi_result
                      );
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

  //   const renderChart = () => {
  //     if (typeof window !== "undefined") {
  //       const ApexCharts = require("apexcharts");
  //       new ApexCharts(
  //         document.querySelector("#CrossSellChartService"),
  //         options
  //       ).render();
  //     }
  //   };

  //   renderChart();
  // }, []);

  // return <div id="CrossSellChartService" style={{ width: "100%" }} />;
  return (
    // currentData.length > 0 &&
    <Box id="chartModel" style={{ width: "100%", height: "100%" }}>
      {(kpiChartData as any)?.data?.[0]?.return_model === null ? (
        <p className=" text-center">NDF</p>
      ) : (
        <Chart
          options={options}
          series={series}
          type="donut"
          // width="100%"
          // height="100%"
        />
      )}
    </Box>
  );
};

export default CrossSellChartService;
