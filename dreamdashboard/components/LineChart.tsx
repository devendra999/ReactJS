// Import React and ApexCharts components
import ApexCharts from "apexcharts";
import React, { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { getFromLocalStorage } from "@root/utils";
import { useSelector } from "react-redux";

// Import only on the client-side due to SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Define TypeScript interfaces for the data and the component props
interface IData {
  month_value: number;
  year_value: number;
  result: number;
  sec_result?: number;
}

interface ILineChartProps {
  data: IData[];
  kpiData: any;
  handleDataDumpPopup: any;
}

const LineChart: React.FC<ILineChartProps> = ({
  data,
  kpiData,
  handleDataDumpPopup,
}) => {
  const [chartOptions, setChartOptions] = useState({});
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  // Convert month number to name and append year
  const formatMonth = (monthIndex: number, year: number): string => {
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
    return `${monthNames[monthIndex - 1]}-${year.toString().slice(-2)}`;
  };

  const convertMonthYearToDates = (monthYear: any) => {
    const [monthAbbreviation, year] = monthYear.split("-");

    const currentYear = new Date().getFullYear(); // Get the current year
    const yearPrefix = currentYear.toString().slice(0, 2); // Extract the first two digits of the current year
    const fullYear = parseInt(yearPrefix + year, 10); // Combine the year prefix and two-digit year

    const formatDumpDate = (date: any) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
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

  const hasSecondaryResult = data.some((item) => item.sec_result !== undefined);

  const series: ApexAxisChartSeries = [
    {
      name: kpiData.v_display_column,
      data: data.map((item) => item.result),
    },
    // Include a second series if 'sec_result' is present in the data
    ...(hasSecondaryResult
      ? [
          {
            name: kpiData.v_display_column + "%",
            data: data.map((item) => item.sec_result ?? 0),
          },
        ]
      : []),
  ];
  const initializeChartOptions = useCallback(() => {
    // Define the chart options
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: "line",
        height: "auto",
        toolbar: {
          show: false,
        },
        events: {
          markerClick: (
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config }
          ) => {
            const chartSelectedValue =
              chartContext.w.globals.categoryLabels[dataPointIndex];
            if (chartSelectedValue) {
              const dateRange = convertMonthYearToDates(chartSelectedValue);
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
                p_data_dump_start_date:
                  "'" + (dateRange as any).startDate + "'",
                p_data_dump_end_date: "'" + (dateRange as any).endDate + "'",
                p_user_id: _globalFilter.global_filter.p_user_id,
              };
              handleDataDumpPopup(true, monthChartData);
            }
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: data.map((item) =>
          formatMonth(item.month_value, item.year_value)
        ),
      },
      yaxis: hasSecondaryResult
        ? [
            {
              //   title: {
              //     text: "Result",
              //   },
              labels: {
                formatter: (value): string => value.toFixed(2),
              },
            },
            {
              //   title: {
              //     text: "Secondary Result",
              //   },
              opposite: true,
              labels: {
                formatter: (value): string => `${value.toFixed(0)}`,
              },
            },
          ]
        : [
            {
              title: {
                text: kpiData.v_display_column,
              },
              labels: {
                formatter: (value): string => value.toFixed(2),
              },
            },
          ],
      tooltip: {
        shared: true,
        y: {
          formatter: (value, { seriesIndex }): string => {
            return seriesIndex === 0
              ? `${value.toFixed(2)}`
              : `${value.toFixed(0)}`;
          },
        },
      },
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      // responsive: [
      //   {
      //     breakpoint: 1000,
      //     options: {
      //       chart: {
      //         width: '100%',
      //         height: 350,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      // ],
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
    };
    setChartOptions({ series, ...options });
  }, [data, kpiData, handleDataDumpPopup, hasSecondaryResult]);

  useEffect(() => {
    initializeChartOptions();
  }, [initializeChartOptions]);

  return Object.keys(chartOptions as any).length > 0 ? (
    <ReactApexChart
      options={chartOptions}
      series={series}
      type="line"
      height="100%"
    />
  ) : null;
};

export default LineChart;
