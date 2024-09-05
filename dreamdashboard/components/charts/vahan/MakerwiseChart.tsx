import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  addCommasToNumber,
  NumberFormat_2,
  NumberFormat_3,
  NumberFormat_4,
} from "@root/utils/globalFunction";
import { getFromLocalStorage } from "@root/utils";
import { useSelector } from "react-redux";

const Loading = dynamic(() => import("@root/components/Loading"));
// Dynamically import ReactApexChart with no SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface MakerwiseChartDataItem {
  maker: string;
  sum: string;
}

interface MakerwiseChartProps {
  data: MakerwiseChartDataItem[];
  loader: boolean;
  handleDataDumpPopup: any;
}

const MakerwiseChart: React.FC<MakerwiseChartProps> = ({
  data,
  loader,
  handleDataDumpPopup,
}: any) => {
  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);

  let MakerDividedBy: number = 0;
  let makerLbls: string[] = [];
  let makerLblseries1: number[] = [];
  let makerLblseries2: number[] = [];

  // const sumOfArray = data?.reduce(
  //   (n: any, { result }: any) => n + Number(result),
  //   0
  // );
  // const averageOfArray = sumOfArray / data?.length;
  // MakerDividedBy = Number(NumberFormat_2(averageOfArray));
  // const chartTitle = NumberFormat_4(MakerDividedBy);

  for (let i = 0; i < data?.length; i++) {
    data[i]?.grp_value && makerLbls.push(data[i]?.grp_value);
    (data[i]?.result || data[i]?.result === 0 || data[i]?.result === null) &&
      makerLblseries1.push(
        Number(`${Math.round(data[i].result === null ? 0 : data[i].result)}`)
      );
    makerLblseries2.push(
      Number(
        `${data[i].per_result === null ? 0 : data[i].per_result?.toFixed(2)}`
      )
    );
  }

  // const minValue = Math.min(...makerLblseries2);
  // const maxValue = Math.max(...makerLblseries2);

  // console.log(minValue,maxValue);
  

  const series: any[] = [
    {
      name: "Result",
      type: "bar",
      data: makerLblseries1.map(
        (val: any) =>
          // NumberFormat_3(val, MakerDividedBy)
          val
      ),
    },
    {
      name: "Result %",
      type: "bar",
      data: makerLblseries2,
      yaxis: 1, // Map this series to the second Y-axis
    },
  ];

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
        show: rolewiseDisplay?.isChartExportAllowed ? true : false,
        export: {
          png: {
            filename: "State Wise",
          },
        },
      },
      // events: {
      //   dataPointSelection: function (
      //     event: any,
      //     chartContext: any,
      //     config: any
      //   ) {
      //     var chartSelectedValue = data[config.dataPointIndex];

      //     if (chartSelectedValue) {
      //       const makerChartData = {
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
      //         p_data_dump_filter: "maker",
      //         p_data_dump_filter_value: chartSelectedValue.grp_id,
      //       };
      //       handleDataDumpPopup(true, makerChartData);
      //     }
      //   },
      // },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top",
          orientation: "vertical",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 0,
      offsetY: 10,
      textAnchor: "start",
      style: {
        colors: ["#000"],
      },
      formatter: function (val: number, opt: any) {
        if (opt.seriesIndex === 1) {
          return val + "%";
        } else {
          return addCommasToNumber(val);
        }
      },
    },
    legend: { show: false },
    colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
    xaxis: {
      categories: makerLbls,

      labels: {
        rotate: -90,
        trim: true,
        maxHeight: 150,
        // formatter: (val: any) => NumberFormat_3(val, MakerDividedBy),
      },
    },
    yaxis: [
      {
        // title: {
        //   text: 'Absolute Value',
        // },
      },
      {
        opposite: true,
        tooltip: {
          enabled: false,
        },
        min: 0,
        max: 100,
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
    grid: {
      padding: {
        top: 30,  // Provide extra space at the bottom for long labels
      }
    },
  };

  return (
    <>
      <Box>
        <style>{`
        .apexcharts-xaxis .apexcharts-xaxis-label {
          white-space: normal !important;
          overflow: visible !important;
          text-align: center !important;
          max-width: 50px !important;
        }
      `}</style>
      </Box>
      <Card className="main-wrapper inline-block w-full h-full max-h-full fit-content vahanBox relative">
        {/* <CardHeader
        title={`OEM Wise Market Share ${
          chartTitle !== "" ? ` (${chartTitle})` : ""
        }`}
        className="chartTitle"
      /> */}
        <CardHeader title={`OEM Wise Market Share`} className="chartTitle" />
        <CardContent className="dashboard-sales-items compare-filter chartcard-overflow">
          {data?.length > 0 && !loader ? (
            <Box
              id="chartMonth"
              style={{ width: "100%", height: "100%" }}
              className="animate__animated animate__fadeIn animate__delay-800ms"
            >
              <Box className="card-body chartcard-overflow sc-chart">
                <div id="chart">
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={500}
                    width="100%"
                  />
                </div>
              </Box>
            </Box>
          ) : (
            <Box className="flex align-middle justify-center w-full min-h-[226px]">
              {loader ? (
                <Loading className="insideChart" />
              ) : (
                <Image
                  height={226}
                  width={329}
                  src="/assets/images/no records found.png"
                  alt="No Records Found"
                />
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MakerwiseChart;
