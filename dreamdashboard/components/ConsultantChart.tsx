import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { getFromLocalStorage } from "@root/utils/common";
import Loading from "./Loading";
import ButtonItem from "./ButtonItem";
import ModalConsultantChart from "./ModalConsultantChart";
import { useSelector } from "react-redux";

interface ConsultantChartProps {
  modalToChart: string;
  kpiData: string;
  handleDataDumpPopup: any;
  queryParams: any;
}

const ConsultantChart: React.FC<ConsultantChartProps> = (props: any) => {
  const [sortedData, setsortedData] = useState(props.modalToChart);
  const [kpiData, setKpiData] = useState(props.kpiData);
  const [queryParams, setQueryParams] = useState(props.queryParams);
  const [isConsultantChartLoading, setConsultantChartLoading] = useState(true);
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  // const globalFilter = JSON.parse(
  //   getFromLocalStorage("@global-filter") || "{}"
  // );
  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );

  useEffect(() => {
    if (props.kpiData && props.modalToChart && props.queryParams) {
      setsortedData(props.modalToChart);
      setKpiData(props.kpiData);
      setQueryParams(props.queryParams);
      setConsultantChartLoading(false);
    }
  }, [props.kpiData, props.modalToChart, props.queryParams]);

  let NoOfSeries: number = 0;
  const IsPer: boolean = props.kpiData.v_value_unit === "PERC" ? true : false;
  const KpiPageCode =
    props.kpiData.p_master_page_code === "sr_dashboard"
      ? "Service Advisor"
      : "Sales Consultant";
  const KPIDataType: string = kpiData.v_value_unit;
  const KPICode: string = kpiData.v_display_column;
  let KPIName: string = kpiData.v_display_column;
  if (KPICode === "lead_source") {
    KPIName = "";
  }
  const decimalPointScreenCodes = ["ServiceCSATScore"];
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

  let SPDividedBy: number = 0;
  let scLbls: string[] = [];
  let scLblsShort: string[] = [];
  let scSeries1: Number[] = [];
  let scSeries2: Number[] = [];

  // function sortDataDescending(data: any) {
  //   return data.sort((a, b) => b.result - a.result);
  // }

  // const sortingData = sortDataDescending(salesConsultantChartData);

  // console.log(sortingData,"sortingdata");

  const salesConsultantChartData = sortedData
    .slice()
    .sort((a: any, b: any) => b.result - a.result);

  for (let i = 0; i < (salesConsultantChartData as any)?.length; i++) {
    scLbls.push(`${salesConsultantChartData[i].sales_consultant}`);
    scLblsShort.push(
      `${salesConsultantChartData[i].sales_consultant.substring(0, 3) + "..."}`
    );
    (salesConsultantChartData[i]?.result ||
      salesConsultantChartData[i]?.result === 0) &&
      scSeries1.push(
        Number(`${Math.round(salesConsultantChartData[i].result)}`)
      );

    (salesConsultantChartData[i]?.sec_result ||
      salesConsultantChartData[i]?.sec_result === 0) &&
      scSeries2.push(
        Number(`${Math.round(salesConsultantChartData[i].sec_result)}`)
      );
  }

  if (scSeries1.length > 0 && scSeries2.length > 0) {
    NoOfSeries = 2;
  } else if (scSeries1.length > 0) {
    NoOfSeries = 1;
  } else if (scSeries2.length > 0) {
    NoOfSeries = 1;
  }

  var chartTitle = "";

  if (KPIDataType !== "TIME") {
    // Convert the array elements to numbers
    const numbersArray = scSeries1.map(Number);

    // Calculate the sum of all numbers
    const sum = numbersArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    // Calculate the average
    const average = sum / numbersArray.length;

    SPDividedBy = Number(NumberFormat_2(average));
    chartTitle = NumberFormat_4(SPDividedBy);
  }

  const SPSeries1 = scSeries1;
  const SPSeries2 = scSeries2;
  // [...scSeries1].sort((a, b) => Number(b) - Number(a));
  // const SPSeries2 = [...scSeries2].sort((a, b) => Number(b) - Number(a));
  const SPLabels = scLbls;

  const SPChartTitle = chartTitle
    ? KpiPageCode + " wise" + " " + "(" + chartTitle + ")"
    : KpiPageCode + " wise";

  const series: any[] = [
    {
      name: KPIName,
      type: "bar",
      data: SPSeries1.slice(0, 27),
    },
  ];

  const yaxis: any[] = [];

  if (NoOfSeries > 1) {
    let YTitle = "Percentage";
    if (KPICode === "SalesCSATScore") {
      YTitle = "No of Customer";
    } else {
      YTitle = `${KPIName} %`;
    }
    series.push({
      name: YTitle,
      type: "bar",
      data: SPSeries2.slice(0, 27),
    });

    yaxis.push(
      {
        labels: {
          formatter: (val: number) => NumberFormat_3(val, SPDividedBy),
        },
      },
      {
        opposite: true,
        labels: {
          formatter: (val: number) => {
            if (decimalPointScreenCodes.indexOf(KPICode) !== -1) {
              return val;
            } else {
              return Math.round(val) + "%";
            }
          },
        },
      }
    );
  } else {
    yaxis.push({
      labels: {
        formatter: (val: number) => {
          if (NoOfSeries === 1 && IsPer) {
            return Math.round(val) + "%";
          } else {
            return NumberFormat_3(val, SPDividedBy);
          }
        },
      },
    });
  }

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: "100%",
      parentHeightOffset: 0,
      fontFamily: "Poppins",
      selection: {
        enabled: false,
        type: "xy",
      },
      toolbar: {
        show: rolewiseDisplay.isChartExportAllowed ? true : false,
        export: {
          png: {
            filename: KPIName + "-" + KpiPageCode,
          },
        },
      },
      events: {
        dataPointSelection: function (
          event: any,
          chartContext: any,
          config: any
        ) {
          var chartSelectedValue =
            salesConsultantChartData[config.dataPointIndex];
          if (chartSelectedValue) {
            const locationChartData = {
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
              p_data_dump_filter: "'" + "sales_consultant" + "'",
              p_data_dump_filter_value:
                "'" + chartSelectedValue.sales_consultant + "'",
              // p_data_dump_start_date:
              //   "'" + props.queryParams.p_start_date + "'",
              // p_data_dump_end_date: "'" + props.queryParams.p_end_date + "'",
              p_user_id: queryParams.p_user_id,
            };
            { rolewiseDisplay.isDumpViewAllowed && props.handleDataDumpPopup(true, locationChartData)};
          }
        },
      },
      zoom: { enabled: false },
    },
    title: {
      text: SPChartTitle,
      style: {
        fontSize: "30px",
        fontWeight: "bold",
        color: "#263238",
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        // hideOverflowingLabels: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 30,
      style: {
        fontSize: "16px",
        colors: ["#000"],
      },
      formatter: function (val: number, opt: any) {
        if (opt.seriesIndex === 0) {
          if (NoOfSeries === 1 && IsPer) {
            return Math.round(val) + "%";
          } else {
            return NumberFormat_3(val, SPDividedBy);
          }
        } else {
          if (decimalPointScreenCodes.indexOf(KPICode) !== -1) {
            return val;
          } else {
            return Math.round(val) + "%";
          }
        }
      },
    },
    legend: { show: false },
    colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
    xaxis: {
      categories: scLbls.slice(0, 27),
      tooltip: {
        enabled: false,
      },
      labels: {
        formatter: (val: any) => NumberFormat_3(val, SPDividedBy),
        style: {
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      opposite: false,
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "16px",
      },
      shared: true,
      intersect: false,
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

          dataLabels: {
            style: {
              fontSize: "12px",
            },
          },

          xaxis: {
            labels: {
              style: {
                fontSize: "13px",
              },
            },
          },

          yaxis: {
            labels: {
              style: {
                fontSize: "13px",
              },
            },
          },

          tooltip: {
            style: {
              fontSize: "14px",
            },
          },
        },
      },
      {
        breakpoint: 1199,
        options: {
          title: {
            style: {
              fontSize: "20px",
            },
          },

          dataLabels: {
            style: {
              fontSize: "10px",
            },
          },

          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },

          yaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
              align: "right",
              minWidth: 0,
              maxWidth: 100,
            },
          },

          tooltip: {
            style: {
              fontSize: "14px",
            },
          },
        },
      },
    ],

    // ... (rest of the options)
  };

  return (
    <Box style={{ position: "relative" }}>
      {isConsultantChartLoading ? (
        <Loading
          className={`${
            isConsultantChartLoading ? "insideChartLineChart" : "hide"
          } `}
        />
      ) : (
        <Box
          id="chartConsultants"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
            height="100%"
          />
        </Box>
      )}
    </Box>
  );
};

export default ConsultantChart;
