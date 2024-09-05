import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { Box } from "@mui/material";
import { getFromLocalStorage } from "@root/utils/common";
import { useSelector } from "react-redux";
// import Loading from "./Loading";
const Loading = dynamic(() => import("@root/components/Loading"));
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MonthChartProps {
  modalToChart: string;
  kpiData: string;
  handleDataDumpPopup: any;
  queryParams: any;
  prediction: any;
}

const MonthChart: React.FC<MonthChartProps> = (props: any) => {
  const [monthChartData, setMonthChartData] = useState(props.modalToChart);
  const [kpiData, setKpiData] = useState(props.kpiData);
  const [queryParams, setQueryParams] = useState(props.queryParams);
  const [isMonthChartLoading, setMonthChartLoading] = useState(true);
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );

  useEffect(() => {
    if (props.kpiData && props.modalToChart && props.queryParams) {
      setMonthChartData(props.modalToChart);
      setKpiData(props.kpiData);
      setQueryParams(props.queryParams);
      setMonthChartLoading(false);
    }
  }, [props.kpiData, props.modalToChart, props.queryParams]);

  const IsPer: boolean = kpiData.v_value_unit === "PERC" ? true : false;
  const KPIDataType: string = kpiData.v_value_unit;
  const KPICode: string = kpiData.v_display_column;
  let KPIName: string = kpiData.v_display_column;
  if (KPICode == "lead_source") {
    KPIName = "";
  }

  // const decimalPointScreenCodes = ["ServiceCSATScore"];
  var TATScreenCodes = ["TATB&P", "TATPM", "TATGR"];
  var decimalPointScreenCodes = [
    "TATB&P",
    "TATPM",
    "TATGR",
    "ServiceCSATScore",
  ];

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

  // Add this function to your existing code
  const getMonthAbbreviation = (monthValue: number) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthValue - 1] || "";
  };

  const formatDate = (inputDate: any) => {
    // Split the input string into month and year parts
    const [month, year] = inputDate.split("-");

    // Create a Date object with the year and month
    const dateObject = new Date(`${month}-1-${year}`);
    // console.log(dateObject, "dateobject");
    // Get the abbreviated month name (e.g., "Jan")
    // const monthName = dateObject.toLocaleString("default", { month: "short" });
    const monthName = getMonthAbbreviation(month);

    // Get the last two digits of the year (e.g., "22" from "2022")
    const lastTwoDigitsOfYear = year.slice(-2);

    // Combine the month name and year to get the desired format
    const formattedDate = `${monthName}-${lastTwoDigitsOfYear}`;

    return formattedDate;
  };

  let MonthDividedBy: number = 0;
  let NoOfSeries: number = 0;
  let monthLbls: string[] = [];
  let monthLblseries1: Number[] = [];
  let monthLblseries2: Number[] = [];

  for (let i = 0; i < monthChartData?.length; i++) {
    monthChartData[i]?.month_value &&
      monthChartData[i]?.year_value &&
      monthLbls.push(
        `${formatDate(
          monthChartData[i].month_value + "-" + monthChartData[i].year_value
        )}`
      );
    (monthChartData[i]?.result ||
      monthChartData[i]?.result === 0 ||
      monthChartData[i]?.result === null) &&
      monthLblseries1.push(
        Number(
          `${Math.round(
            monthChartData[i].result === null ? 0 : monthChartData[i].result
          )}`
        )
      );

    (monthChartData[i]?.sec_result ||
      monthChartData[i]?.sec_result === 0 ||
      monthChartData[i]?.sec_result === null) &&
      monthLblseries2.push(
        Number(
          `${Math.round(
            monthChartData[i].sec_result === null
              ? 0
              : monthChartData[i].sec_result
          )}`
        )
      );
  }

  var chartTitle = "";

  if (KPIDataType !== "TIME") {
    // Convert the array elements to numbers
    const numbersArray = monthLblseries1.map(Number);

    // Calculate the sum of all numbers
    const sum = numbersArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    // Calculate the average
    const average = sum / numbersArray.length;
    MonthDividedBy = Number(NumberFormat_2(average));
    chartTitle = NumberFormat_4(MonthDividedBy);
  }

  const MonthLabels = monthLbls;
  const Monthseries1: number[] = monthLblseries1.map((str) => Number(str));
  const Monthseries2: number[] = monthLblseries2.map((str) => Number(str));

  const MonthChartTitle = chartTitle
    ? "Month wise" + " " + "(" + chartTitle + ")"
    : "Month wise";

  const series: any[] = [
    {
      name: KPIName,
      type: "line",
      data: Monthseries1,
    },
  ];

  const yaxis: any[] = [];

  if (monthLblseries1.length > 0 && monthLblseries2.length > 0) {
    NoOfSeries = 2;
  } else if (monthLblseries1.length > 0) {
    NoOfSeries = 1;
  } else if (monthLblseries2.length > 0) {
    NoOfSeries = 1;
  }
  if (NoOfSeries > 1) {
    let YTitle = "Percentage";
    if (KPICode === "SalesCSATScore") {
      YTitle = "No of Customer";
    } else {
      YTitle = `${KPIName} %`;
    }
    series.push({
      name: YTitle,
      type: "line",
      data: Monthseries2.map((value) => value.toString()),
    });

    yaxis.push(
      {
        labels: {
          formatter: (val: any) => NumberFormat_3(val, MonthDividedBy),
        },
        style: {
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      {
        opposite: true,
        labels: {
          formatter: function (val: number) {
            if (decimalPointScreenCodes.indexOf(KPICode) !== -1) {
              return Number(val);
            } else {
              return Math.round(val) + "%";
            }
          },
          style: {
            fontSize: "12px",
            fontWeight: 500,
          },
        },
      }
    );
  } else {
    yaxis.push({
      labels: {
        formatter: function (val: number) {
          if (NoOfSeries === 1 && IsPer) {
            if (decimalPointScreenCodes.indexOf(KPICode) !== -1) {
              return val;
            } else {
              return Math.round(val) + "%";
            }
          } else {
            return NumberFormat_3(val, MonthDividedBy);
          }
        },
        style: {
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    });
  }

  const convertMonthYearToDates = (monthYear: any) => {
    const [monthAbbreviation, year] = monthYear.split("-");

    const currentYear = new Date().getFullYear(); // Get the current year
    const yearPrefix = currentYear.toString().slice(0, 2); // Extract the first two digits of the current year
    const fullYear = parseInt(yearPrefix + year, 10); // Combine the year prefix and two-digit year

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthIndex = monthNames.indexOf(monthAbbreviation);
    if (monthIndex !== -1) {
      const startDate = new Date(fullYear, monthIndex, 1);
      const endDate = new Date(fullYear, monthIndex + 1, 0);

      const startDateFormatted = formatDumpDate(startDate);
      const endDateFormatted = formatDumpDate(endDate);
      return {
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      };
    }
    return null;
  };

  const formatDumpDate = (date: any) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: "100%",
      parentHeightOffset: 0,
      type: "line",
      fontFamily: "Poppins",
      zoom: { enabled: false },
      selection: {
        enabled: false,
        type: "xy",
      },
      toolbar: {
        show: rolewiseDisplay.isChartExportAllowed ? true : false,
        export: {
          png: {
            filename: KPIName + "-" + MonthChartTitle,
          },
        },
      },
      events: {
        markerClick: function (
          event: any,
          chartContext: any,
          { seriesIndex, dataPointIndex, config }: any
        ) {
          const chartSelectedValue =
            chartContext.w.globals.categoryLabels[dataPointIndex];
          if (chartSelectedValue) {
            // drillDownRows("Month", chartSelectedValue);

            const dateRange = convertMonthYearToDates(chartSelectedValue);
            // if (dateRange) {
            //   console.log("start date:", dateRange.startDate);
            //   console.log("end date:", dateRange.endDate);
            // } else {
            //   console.log("Invalid month-year format.");
            // }

            const monthChartData = {
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
              p_data_dump_filter: "'" + "date" + "'",
              p_data_dump_filter_value: "'" + chartSelectedValue + "'",
              p_data_dump_start_date: "'" + (dateRange as any).startDate + "'",
              p_data_dump_end_date: "'" + (dateRange as any).endDate + "'",
              p_user_id: _globalFilter.global_filter.p_user_id,
            };
            {rolewiseDisplay.isDumpViewAllowed  && props.handleDataDumpPopup(true, monthChartData);}
            
          }
        },
      },
    },
    title: {
      text: MonthChartTitle,
      style: {
        fontSize: "30px",
        fontWeight: "bold",
        color: "#263238",
      },
    },
    dataLabels: {
      enabled: true,
      // style: {
      //   fontSize: "16px",
      // },

      formatter: (val: number, opt: any) => {
        if (opt.seriesIndex === 0) {
          if (NoOfSeries === 1 && IsPer) {
            if (decimalPointScreenCodes.indexOf(KPICode) !== -1) {
              return val;
            } else {
              return Math.round(val) + "%";
            }
          } else {
            return NumberFormat_3(val, MonthDividedBy);
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
    forecastDataPoints: {
      count: props.prediction
        ? Monthseries1.filter((item) => item == 0).length + 1
        : 0,
      fillOpacity: 0.5,
      strokeWidth: undefined,
      dashArray: 4,
    },
    colors: ["#245BBB", "#C94E5E"],
    stroke: { curve: "straight" },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: MonthLabels,
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          // fontSize: "16px",
          fontWeight: 500,
        },
      },
    },
    yaxis: yaxis,
    tooltip: {
      // style: {
      //   fontSize: "16px",
      // },
      shared: true,
      intersect: false,
      // fixed: {
      //   enabled: true,
      //   position: "topLeft",
      //   offsetX: 130,
      //   offsetY: -70,
      // },
    },
    // responsive: [
    //   {
    //     breakpoint: 2081,
    //     options: {
    //       dataLabels: {
    //         style: {
    //           fontSize: "12px",
    //         },
    //       },
    //       xaxis: {
    //         labels: {
    //           style: {
    //             fontSize: "13px",
    //           },
    //         },
    //       },
    //       title: {
    //         style: {
    //           fontSize: "20px",
    //         },
    //       },
    //       tooltip: {
    //         style: {
    //           fontSize: "14px",
    //         },
    //       },
    //     },
    //   },
    // ],
    // ... (rest of the options)
  };
  return (
    <Box id="chartMonth" style={{ width: "100%", height: "100%" }}>
      {isMonthChartLoading ? (
        <Loading
          className={`${isMonthChartLoading ? "insideChart" : "hide"} `}
        />
      ) : (
        <Chart
          options={options}
          series={series}
          type="line"
          width="100%"
          height="100%"
        />
      )}
    </Box>
  );
};

export default MonthChart;
