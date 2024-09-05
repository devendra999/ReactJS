import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { getFromLocalStorage } from "@root/utils/common";
import { useSelector } from "react-redux";
// import Loading from "./Loading";
const Loading = dynamic(() => import("@root/components/Loading"));

interface ModelChartProps {
  modalToChart: string;
  kpiData: string;
  handleDataDumpPopup: any;
  queryParams: any;
}

const ModelChart: React.FC<ModelChartProps> = (props: any) => {
  const [modelChartData, setModelChartData] = useState(props.modalToChart);
  const [kpiData, setKpiData] = useState(props.kpiData);
  const [queryParams, setQueryParams] = useState(props.queryParams);
  const [isModelChartLoading, setModelChartLoading] = useState(true);
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );

  useEffect(() => {
    if (props.kpiData && props.modalToChart && props.queryParams) {
      setModelChartData(props.modalToChart);
      setKpiData(props.kpiData);
      setQueryParams(props.queryParams);
      setModelChartLoading(false); // Set loading state to false when data is received
      // props.preLoader(false);
    }
  }, [props.kpiData, props.modalToChart, props.queryParams]);

  let NoOfSeries: number = 0;
  const IsPer: boolean = false;
  const KPIDataType: string = kpiData.v_value_unit;
  const KPICode: string = kpiData.v_display_column;
  let KPIName: string = kpiData.v_display_column;
  if (KPICode == "lead_source") {
    KPIName = "";
  }

  const decimalPointScreenCodes: string[] = ["SalesCSATScore"];

  const NumberFormat_3 = (val: number, deviedBy: number) => {
    if (val !== null && val !== undefined) {
      if (deviedBy === 10000000) {
        return (val / 10000000).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) /* + " Cr"*/;
      } else if (deviedBy === 100000) {
        return (val / 100000).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) /* + " L"*/;
      } else if (deviedBy === 1000) {
        return (val / 1000).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        });
      } else {
        if (KPIDataType === "TIME") {
          return (
            parseInt((val / 24).toString()) +
            "d" +
            " : " +
            parseInt((val % 24).toString()) +
            "h"
          );
        } else if (decimalPointScreenCodes.indexOf(KPICode) !== -1) {
          return val.toFixed(2);
        } else {
          return Math.round(val).toLocaleString("en-IN");
        }
      }
    } else {
      return "null";
    }
  };

  const NumberFormat_2 = (val: any) => {
    if (val) {
      if (val >= 10000000) {
        return 10000000;
      } else if (val >= 100000) {
        return 100000;
      } else if (val >= 1000) {
        return 1000;
      } else if (val >= 100) {
        return 100;
      } else if (val >= -100) {
        return -100;
      } else if (val >= -100000) {
        return -100000;
      } else if (val >= -10000000) {
        return -10000000;
      } else {
        return 10000000;
      }
    } else {
      return "";
    }
  };

  const NumberFormat_4 = (val: any) => {
    if (val) {
      if (val >= 10000000) {
        return "in Crore";
      } else if (val >= 100000) {
        return "in Lakh";
      } else if (val >= 1000) {
        return "in Thousand";
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  const drillDownRows = (chartType: string, chartSelectedValue: string) => {
    // Your drillDownRows logic here
  };

  let ModelDividedBy: number = 0;

  let modelLbls: string[] = [];
  let modelSeries1: Number[] = [];
  let modelSeries2: Number[] = [];

  for (let i = 0; i < modelChartData?.length; i++) {
    modelLbls.push(`${modelChartData[i].model}`);

    modelSeries1.push(
      Number(
        `${Math.round(
          modelChartData[i]?.result === null || modelChartData[i]?.result === 0
            ? 0
            : modelChartData[i]?.result
        )}`
      )
    );

    modelSeries2.push(
      Number(
        `${Math.round(
          modelChartData[i]?.sec_result === null ||
            modelChartData[i]?.sec_result === 0
            ? 0
            : modelChartData[i].sec_result
        )}`
      )
    );
  }

  if (modelSeries1.length > 0 && modelSeries2.length > 0) {
    NoOfSeries = 2;
  } else if (modelSeries1.length > 0) {
    NoOfSeries = 1;
  } else if (modelSeries2.length > 0) {
    NoOfSeries = 1;
  }

  var chartTitle = "";

  if (KPIDataType !== "TIME") {
    // Convert the array elements to numbers
    const numbersArray = modelSeries1.map(Number);

    // Calculate the sum of all numbers
    const sum = numbersArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    // Calculate the average
    const average = sum / numbersArray.length;

    ModelDividedBy = Number(NumberFormat_2(average));
    chartTitle = NumberFormat_4(ModelDividedBy);
  }

  const ModelSeries1 = modelSeries1;
  const ModelLebel = modelLbls;
  const ModelChartTitle: string = chartTitle
    ? "Model wise" + " " + "(" + chartTitle + ")"
    : "Model wise";

  const series: any[] = ModelSeries1;

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: "100%",
      width: "100%",
      parentHeightOffset: 0,

      fontFamily: "Poppins",
      type: "pie",
      selection: { enabled: true, type: "xy" },
      toolbar: {
        show: rolewiseDisplay.isChartExportAllowed ? true : false,
        export: {
          png: {
            filename: KPIName + "-" + ModelChartTitle,
          },
        },
      },
      events: {
        dataPointSelection: function (
          event: any,
          chartContext: any,
          config: any
        ) {
          const chartSelectedValue =
            config.w.globals.labels[config.dataPointIndex];
          if (chartSelectedValue) {
            const modelChartData = {
              p_kpi_id: kpiData.v_kpiid,
              p_kpi_name: kpiData.v_display_column,
              p_start_date:
                _globalFilter.global_filter.p_start_date,
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
              p_data_dump_filter: "'" + "model" + "'",
              p_data_dump_filter_value: "'" + chartSelectedValue + "'",
              p_user_id: _globalFilter.global_filter.p_user_id,
            };
            {rolewiseDisplay.isDumpViewAllowed && props.handleDataDumpPopup(true, modelChartData);}
            // drillDownRows("Model", chartSelectedValue);
          }
        },
      },
    },
    dataLabels: { enabled: false },
    title: {
      text: ModelChartTitle,
      style: {
        fontSize: "30px",
        fontWeight: "bold",
        color: "#263238",
      },
    },
    colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
    legend: {
      // height: "100%",
      position: "right",
      horizontalAlign: "center",
      fontSize: "16px",

      formatter: function (val: string, opts: any) {
        if (NoOfSeries === 1 && IsPer) {
          return (
            "<td>" +
            val +
            " : <strong>" +
            NumberFormat_2(opts.w.globals.series[opts.seriesIndex]) +
            "%</strong></td>"
          );
        } else {
          if (KPICode === "SalesCSATScore") {
            return (
              "<td>" +
              val +
              " : <strong>" +
              opts.w.globals.series[opts.seriesIndex].toFixed(2) +
              "</strong> (<strong>" +
              opts.w.globals.seriesPercent[opts.seriesIndex][0].toFixed(1) +
              "%</strong>)</td>"
            );
          } else {
            //     console.log('seriesPercent:', opts);
            //     console.log('seriesPercent:', opts.w.globals.seriesPercent);
            // console.log('seriesIndex:', opts.seriesIndex);
            return (
              "<td>" +
              val +
              " : <strong>" +
              NumberFormat_3(
                opts.w.globals.series[opts.seriesIndex],
                ModelDividedBy
              ) +
              "</strong> (<strong>" +
              opts.w.globals.seriesPercent[opts.seriesIndex][0].toFixed(1) +
              "%</strong>)</td>"
            );
          }
        }
      },
    },
    labels: ModelLebel,
    tooltip: {
      style: {
        fontSize: "16px",
      },
      y: {
        formatter: function (val: number, opts: any) {
          return (
            NumberFormat_3(val, ModelDividedBy) +
            " (" +
            opts.globals.seriesPercent[opts.seriesIndex][0].toFixed(1) +
            "%)"
          );
        },
      },
    },
    grid: {
      padding: {
        bottom: 0,
      },
    },
    responsive: [
      {
        breakpoint: 2081,
        options: {
          title: {
            style: {
              fontSize: "20px",
            },
          },
          legend: {
            fontSize: "12px",
          },
          tooltip: {
            style: {
              fontSize: "12px",
            },
          },
        },
      },
      {
        breakpoint: 1500,
        options: {
          chart: {
            height: "100%",
          },
          legend: {
            height: "70",
            width: "100%",
            position: "bottom",
            horizontalAlign: "center",
          },
        },
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            height: "100%",
          },
          legend: {
            height: "68",
            width: "100%",
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "10px",
          },
        },
      },
    ],
  };
  // return <div id="chartModel" />;
  return (
    <Box id="chartModel" style={{ width: "100%", height: "100%" }}>
      {isModelChartLoading ? (
        <Loading
          className={`${isModelChartLoading ? "insideChart" : "hide"} `}
        />
      ) : (
        <Chart
          options={options}
          series={series}
          type="pie"
          width="100%"
          height="100%"
        />
      )}
    </Box>
  );
};

export default ModelChart;
