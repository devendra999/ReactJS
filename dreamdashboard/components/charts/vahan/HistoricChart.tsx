import React from "react";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  NumberFormat_2,
  NumberFormat_3,
  NumberFormat_4,
} from "@root/utils/globalFunction";
const Loading = dynamic(() => import("@root/components/Loading"));
import { useSelector } from "react-redux";
import { getFromLocalStorage } from "@root/utils";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface YearWiseChartDataItem {
  month_value: number;
  year_value: number;
  result: number | null;
}

interface YearWiseChartProps {
  data: { return_date: YearWiseChartDataItem[] }[];
  loader: boolean;
  handleDataDumpPopup: any;
  chartTitle?: any;
}

const HistoricChart: React.FC<YearWiseChartProps> = ({
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

  const getYear = (monthYear: string) => {
    const [, year] = monthYear.split("-");
    return `${year}`;
  };

  const convertMonthYearToDates = (monthYear: any) => {
    const [monthAbbreviation, year] = monthYear?.split("-");

    const currentYear = new Date().getFullYear();
    const yearPrefix = currentYear.toString().slice(0, 2);
    const fullYear = parseInt(yearPrefix + year, 10);

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

  const aggregateDataByYear = (data: YearWiseChartDataItem[]) => {
    const yearlyData: { [key: string]: number } = {};

    data?.forEach((item) => {
      const year = item.year_value;
      const result = item.result !== null ? item.result : 0; // Convert null to 0
      if (!yearlyData[year]) {
        yearlyData[year] = 0;
      }
      yearlyData[year] += result;
    });

    return Object.entries(yearlyData).map(([year, result]) => ({
      year,
      result,
    }));
  };

  const aggregatedData = aggregateDataByYear(data);

  const yearLbls: string[] = [];
  const yearLblseries1: number[] = [];

  aggregatedData?.forEach((item) => {
    yearLbls.push(item?.year);
    yearLblseries1.push(item?.result);
  });

  const sumOfArray = yearLblseries1.reduce(
    (n: any, result: number) => n + result,
    0
  );
  const averageOfArray = sumOfArray / yearLblseries1.length;
  const MonthDividedBy = Number(NumberFormat_2(averageOfArray));
  const chartTitleBracket = NumberFormat_4(MonthDividedBy);

  const series: any[] = [
    {
      name: "Result",
      type: "line",
      data: yearLblseries1,
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
      //       const dateRange = convertMonthYearToDatesMain(chartSelectedValue);

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
      //         p_data_dump_filter_value: (dateRange as any)?.startDate,
      //       };
            
      //       handleDataDumpPopup(true, monthChartData);
      //     }
      //   },
      // },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        return NumberFormat_3(val, MonthDividedBy);
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
      categories: yearLbls,
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
          return NumberFormat_3(val, MonthDividedBy);
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  // Example implementation of convertMonthYearToDates
  function convertMonthYearToDatesMain(monthYear: string) {
    const [month, year] = monthYear.split(" ");
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);

    const dateRange = {
      startDate: formatDateToYyyyMmDd(startDate),
      endDate: formatDateToYyyyMmDd(endDate),
    };
    return dateRange;
  }

  function formatDateToYyyyMmDd(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const hasData = aggregatedData.some((item) => item.result > 0);

  return (
    <Card className="main-wrapper inline-block w-full h-full max-h-full fit-content vahanBox relative">
      <CardHeader
        title={`${chartTitle} ${
          chartTitleBracket !== "" ? ` (${chartTitleBracket})` : ""
        }`}
        className="chartTitle"
      />
      <CardContent className="dashboard-sales-items compare-filter">
        {hasData && !loader ? (
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

export default HistoricChart;
