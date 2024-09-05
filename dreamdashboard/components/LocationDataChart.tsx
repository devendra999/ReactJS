import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { getFromLocalStorage } from "@root/utils/common";
import Loading from "./Loading";
import { useSelector } from "react-redux";

interface LocationChartProps {
  modalToChart: string;
  kpiData: string;
  handleDataDumpPopup: any;
  queryParams: any;
}

const LocationChart: React.FC<LocationChartProps> = (props: any) => {
  const [locationChartData, setLocationChartData] = useState(
    props.modalToChart
  );
  const [kpiData, setKpiData] = useState(props.kpiData);
  const [queryParams, setQueryParams] = useState(props.queryParams);
  const [isLocationChartLoading, setLocationChartLoading] = useState(true);
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );

  useEffect(() => {
    if (
      props.kpiData &&
      props.modalToChart &&
      props.queryParams &&
      isLocationChartLoading === true
    ) {
      setLocationChartData(props.modalToChart);
      setKpiData(props.kpiData);
      setQueryParams(props.queryParams);
      setLocationChartLoading(false);
    }
  }, [
    props.kpiData,
    props.modalToChart,
    props.queryParams,
    isLocationChartLoading,
  ]);

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

  let LocationDividedBy: number = 0;
  let locationLbls: string[] = [];
  let LocationLabelsShort: string[] = [];
  let locationSeries1: Number[] = [];
  let locationSeries2: Number[] = [];

  for (let i = 0; i < locationChartData?.length; i++) {
    locationLbls.push(`${locationChartData[i].location}`);
    LocationLabelsShort.push(
      `${locationChartData[i].location.substring(0, 3) + "..."}`
    );
    (locationChartData[i]?.result || locationChartData[i]?.result === 0) &&
      locationSeries1.push(
        Number(`${Math.round(locationChartData[i].result)}`)
      );

    (locationChartData[i]?.sec_result ||
      locationChartData[i]?.sec_result === 0) &&
      locationSeries2.push(
        Number(`${Math.round(locationChartData[i].sec_result)}`)
      );
  }

  var chartTitle = "";

  if (KPIDataType !== "TIME") {
    // Convert the array elements to numbers
    const numbersArray = locationSeries1.map(Number);

    // Calculate the sum of all numbers
    const sum = numbersArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    // Calculate the average
    const average = sum / numbersArray.length;

    LocationDividedBy = Number(NumberFormat_2(average));
    chartTitle = NumberFormat_4(LocationDividedBy);
  }

  const LocationSeries1 = locationSeries1;
  const LocationSeries2 = locationSeries2;
  const LocationLabels = locationLbls;
  const LocationChartTitle = chartTitle
    ? "Location wise" + " " + "(" + chartTitle + ")"
    : "Location wise";

  const series: any[] = [
    {
      name: KPIName,
      type: "bar",
      data: LocationSeries1,
    },
  ];

  const yaxis: any[] = [];

  if (LocationSeries1.length > 0 && LocationSeries2.length > 0) {
    NoOfSeries = 2;
  } else if (LocationSeries1.length > 0) {
    NoOfSeries = 1;
  } else if (LocationSeries2.length > 0) {
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
      type: "bar",
      data: LocationSeries2,
    });

    yaxis.push(
      {
        labels: {
          formatter: (val: number) => NumberFormat_3(val, LocationDividedBy),
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
            return NumberFormat_3(val, LocationDividedBy);
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
            filename: KPIName + "-" + LocationChartTitle,
          },
        },
      },
      events: {
        dataPointSelection: function (
          event: any,
          chartContext: any,
          config: any
        ) {
          const chartSelectedValue = LocationLabels[config.dataPointIndex];

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
              p_data_dump_filter: "'" + "location" + "'",
              p_data_dump_filter_value: "'" + chartSelectedValue + "'",
              // p_data_dump_start_date:
              //   "'" + props.queryParams.p_start_date + "'",
              // p_data_dump_end_date: "'" + props.queryParams.p_end_date + "'",
              p_user_id: queryParams.p_user_id,
            };
            props.handleDataDumpPopup(true, locationChartData);
          }
        },
      },
      zoom: { enabled: false },
    },
    title: {
      text: LocationChartTitle,
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
      offsetY: 0,
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
            return NumberFormat_3(val, LocationDividedBy);
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
      categories: locationLbls,
      tooltip: {
        enabled: false,
      },
      labels: {
        formatter: (val: any) => NumberFormat_3(val, LocationDividedBy),
        style: {
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      // categories: LocationLabels,
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
    // yaxis: yaxis,
    tooltip: {
      style: {
        fontSize: "16px",
      },
      shared: true,
      intersect: false,
      x: {
        formatter: function (value, { series, seriesIndex, dataPointIndex }) {
          // Customize the x-axis (category) label in the tooltip
          // You can use data from the SPLabels array
          return LocationLabels[dataPointIndex];
        },
      },

      // fixed: {
      //   enabled: false,
      //   position: "topRight",
      //   offsetX: 0,
      //   offsetY: 100,
      // },
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
              fontSize: "10px",
            },
          },
        },
      },
    ],
    // ... (rest of the options)
  };

  return (
    <Box style={{ position: "relative" }}>
      {isLocationChartLoading ? (
        <Loading
          className={`${
            isLocationChartLoading ? "insideChartLineChart" : "hide"
          } `}
        />
      ) : (
        <>
          <Box
            id="chartLocations"
            style={
              window.innerWidth > 1023 && locationLbls.length > 4
                ? {
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                    position: "relative",
                  }
                : {
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    overflow: "auto",
                  }
            }
          >
            <Chart
              options={options}
              series={series}
              type="bar"
              height={
                window.innerWidth > 1023 && locationLbls.length > 4
                  ? locationLbls.length * 60
                  : window.innerWidth < 1024 && locationLbls.length > 4
                  ? locationLbls.length * 60
                  : "100%"
              }
              width="100%"
            />
          </Box>

          <Box id="stickyXaxisDuplicateL">
            <Chart
              options={options}
              series={series}
              type="bar"
              width="100%"
              height="50"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default LocationChart;
