import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  addCommasToNumber,
  NumberFormat_2,
  NumberFormat_3,
  NumberFormat_4,
} from "@root/utils/globalFunction";
const Loading = dynamic(() => import("@root/components/Loading"));
import { useSelector } from "react-redux";
import { getFromLocalStorage } from "@root/utils";
// Dynamically import ReactApexChart with no SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface YearWiseChartDataItem {
  month: string;
  sum: string;
}

interface YearWiseChartProps {
  data: YearWiseChartDataItem[];
  loader: boolean;
  handleDataDumpPopup: any;
  chartTitle?: any;
}

const YearWiseChart: React.FC<YearWiseChartProps> = ({
  data,
  loader,
  handleDataDumpPopup,
  chartTitle,
}: any) => {
  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);

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

  const convertMonthYearToDates = (monthYear: any) => {
    const [monthAbbreviation, year] = monthYear?.split("-");

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

  const formatDate = (inputDate: any) => {
    // Split the input string into month and year parts
    const [month, year] = inputDate.split("-");

    // Create a Date object with the year and month
    const monthName = getMonthAbbreviation(month);

    // Get the last two digits of the year (e.g., "22" from "2022")
    const lastTwoDigitsOfYear = year.slice(-2);

    // Combine the month name and year to get the desired format
    const formattedDate = `${monthName}-${lastTwoDigitsOfYear}`;

    return formattedDate;
  };

  const formatDumpDate = (date: any) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  let MonthDividedBy: number = 0;
  let monthLbls: string[] = [];
  let monthLblseries1: Number[] = [];

  const sumOfArray = data?.reduce(
    (n: any, { result }: any) => n + Number(result),
    0
  );
  const averageOfArray = sumOfArray / data?.length;
  MonthDividedBy = Number(NumberFormat_2(averageOfArray));
  const chartTitleBracket = NumberFormat_4(MonthDividedBy);

  for (let i = 0; i < data?.length; i++) {
    data[i]?.month_value &&
      data[i]?.year_value &&
      monthLbls.push(
        `${formatDate(data[i].month_value + "-" + data[i].year_value)}`
      );
    (data[i]?.result || data[i]?.result === 0 || data[i]?.result === null) &&
      monthLblseries1.push(
        Number(`${Math.round(data[i].result === null ? 0 : data[i].result)}`)
      );
  }

  const series: any[] = [
    {
      name: "Result",
      type: "line",
      data: monthLblseries1,
    },
  ];  

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
            filename: "Vahan",
          },
        },
      },
      // events: {
      //   markerClick: function (
      //     event: any,
      //     chartContext: any,
      //     { seriesIndex, dataPointIndex, config }: any
      //   ) {
      //     const chartSelectedValue =
      //       chartContext.w.globals.categoryLabels[dataPointIndex];
      //     if (chartSelectedValue) {
      //       const dateRange = convertMonthYearToDates(chartSelectedValue);

      //       const monthChartData = {
      //         p_start_date: _globalFilter.vahan_filter.p_start_date,
      //         p_end_date: _globalFilter.vahan_filter.p_end_date,
      //         p_state_id: _globalFilter.vahan_filter.p_state_id
      //           ? `ARRAY[${_globalFilter.vahan_filter.p_state_id
      //               .map((obj: any) => obj.value + "::smallint")
      //               .join(",")}]`
      //           : null,
      //         p_city_id: _globalFilter.vahan_filter.p_city_id
      //           ? `ARRAY[${_globalFilter.vahan_filter.p_city_id
      //               .map((obj: any) => obj.value)
      //               .join(",")}]`
      //           : null,
      //         p_rto_id: _globalFilter.vahan_filter.p_rto_id
      //           ? `ARRAY[${_globalFilter.vahan_filter.p_rto_id
      //               .map((obj: any) => obj.value)
      //               .join(",")}]`
      //           : null,
      //         p_maker_id: _globalFilter.vahan_filter.p_maker_id
      //           ? `ARRAY[${_globalFilter.vahan_filter.p_maker_id
      //               .map((obj: any) => obj.value)
      //               .join(",")}]`
      //           : null,
      //         p_data_dump_filter: "date",
      //         p_data_dump_filter_value: (dateRange as any).startDate,
      //       };
      //       handleDataDumpPopup(true, monthChartData);
      //     }
      //   },
      // },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        // return NumberFormat_3(val, MonthDividedBy);
        return addCommasToNumber(val);
      },
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
      categories: monthLbls,
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          // return NumberFormat_3(val, MonthDividedBy);
          return addCommasToNumber(val);
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <Card className="main-wrapper inline-block w-full h-full max-h-full fit-content vahanBox relative">
      <CardHeader
        title={`${chartTitle}`}
        // title={`${chartTitle} ${
        //   chartTitleBracket !== "" ? ` (${chartTitleBracket})` : ""
        // }`}
        className="chartTitle"
      />
      <CardContent className="dashboard-sales-items compare-filter">
        {data?.length > 0 && !loader ? (
          <Box
            id="chartMonth"
            style={{ width: "100%", height: "100%" }}
            className="animate__animated animate__fadeIn animate__delay-800ms chartcard-overflow"
          >
            <Box className="card-body chartcard-overflow sc-chart">
              <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={320}
                width="100%"
              />
            </Box>
          </Box>
        ) : loader ? (
          <Box className="flex align-middle justify-center w-full min-h-[226px]">
            <Loading className={!loader ? "hide" : "insideChart"} />
          </Box>
        ) : (
          <Box className="flex align-middle justify-center">
            <Image
              height={226}
              width={329}
              src="/assets/images/no records found.png"
              alt="No Records Found"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default YearWiseChart;
