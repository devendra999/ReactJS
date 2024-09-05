// import React, { useState, useEffect } from "react";
// import { Box, Card, CardContent, CardHeader } from "@mui/material";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import {
//   addCommasToNumber,
//   NumberFormat_2,
//   NumberFormat_3,
//   NumberFormat_4,
// } from "@root/utils/globalFunction";
// import { useSelector } from "react-redux";
// import { getFromLocalStorage } from "@root/utils";
// // Dynamically import ReactApexChart with no SSR
// const ReactApexChart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

// // Ensure Loading is a valid component
// const Loading = dynamic(() => import("@root/components/Loading"));

// interface StatewiseChartDataItem {
//   state_name: string;
//   sum: string;
// }

// interface StatewiseChartProps {
//   data: StatewiseChartDataItem[];
//   loader: boolean;
//   handleDataDumpPopup: any;
// }

// const StatewiseChart: React.FC<StatewiseChartProps> = ({
//   data,
//   loader,
//   handleDataDumpPopup,
// }: any) => {
//   const rolewiseDisplay: any = JSON.parse(
//     getFromLocalStorage("@rolewise-display") || "{}"
//   );
//   const globalFilterSelector = (state: any) => state.globalFilter;
//   const _globalFilter = useSelector(globalFilterSelector);

//   let StateDividedBy: number = 0;
//   let stateLbls: string[] = [];
//   let stateLblseries1: number[] = [];
//   let stateLblseries2: number[] = [];

//   const sumOfArray = data?.reduce(
//     (n: any, { result }: any) => n + Number(result),
//     0
//   );
//   const averageOfArray = sumOfArray / data?.length;
//   StateDividedBy = Number(NumberFormat_2(averageOfArray));
//   const chartTitle = NumberFormat_4(StateDividedBy);

//   for (let i = 0; i < data?.length; i++) {
//     data[i]?.grp_value && stateLbls.push(data[i]?.grp_value);
//     (data[i]?.result || data[i]?.result === 0 || data[i]?.result === null) &&
//       stateLblseries1.push(
//         Number(`${Math.round(data[i].result === null ? 0 : data[i].result)}`)
//       );
//     stateLblseries2.push(
//       Number(
//         `${data[i].per_result === null ? 0 : data[i].per_result?.toFixed(2)}`
//       )
//     );
//   }

//   const minValue = Math.min(...stateLblseries2);
//   const maxValue = Math.max(...stateLblseries2);

//   const series: any[] = [
//     {
//       name: "Result",
//       type: "bar",
//       data: stateLblseries1.map(
//         (val: any) =>
//           // NumberFormat_3(val, StateDividedBy)
//           val
//       ),
//     },
//     {
//       name: "Result %",
//       type: "bar",
//       data: stateLblseries2,
//       yaxis: 1,
//     },
//   ];

//   console.log(series,"series");
  

//   const options: ApexCharts.ApexOptions = {
//     chart: {
//       type: "bar",
//       height: "100%",
//       parentHeightOffset: 0,
//       fontFamily: "Poppins",
//       selection: {
//         enabled: false,
//         type: "xy",
//       },
//       toolbar: {
//         show: rolewiseDisplay?.isChartExportAllowed ? true : false,
//         export: {
//           png: {
//             filename: "Maker Wise",
//           },
//         },
//       },
//       // events: {
//       //   dataPointSelection: function (
//       //     event: any,
//       //     chartContext: any,
//       //     config: any
//       //   ) {
//       //     var chartSelectedValue = data[config.dataPointIndex];

//       //     if (chartSelectedValue) {
//       //       const makerChartData = {
//       //         p_start_date: _globalFilter.vahan_filter.p_start_date,
//       //         p_end_date: _globalFilter.vahan_filter.p_end_date,
//       //         p_state_id: _globalFilter.vahan_filter.p_state_id
//       //           ? `ARRAY[${_globalFilter.vahan_filter.p_state_id
//       //               .map((obj: any) => obj.value + "::smallint")
//       //               .join(",")}]`
//       //           : null,
//       //         p_city_id: _globalFilter.vahan_filter.p_city_id
//       //           ? `ARRAY[${_globalFilter.vahan_filter.p_city_id
//       //               .map((obj: any) => obj.value)
//       //               .join(",")}]`
//       //           : null,
//       //         p_rto_id: _globalFilter.vahan_filter.p_rto_id
//       //           ? `ARRAY[${_globalFilter.vahan_filter.p_rto_id
//       //               .map((obj: any) => obj.value)
//       //               .join(",")}]`
//       //           : null,
//       //         p_maker_id: _globalFilter.vahan_filter.p_maker_id
//       //           ? `ARRAY[${_globalFilter.vahan_filter.p_maker_id
//       //               .map((obj: any) => obj.value)
//       //               .join(",")}]`
//       //           : null,
//       //         p_data_dump_filter: "state",
//       //         p_data_dump_filter_value: chartSelectedValue.grp_id,
//       //       };
//       //       handleDataDumpPopup(true, makerChartData);
//       //     }
//       //   },
//       // },
//       zoom: { enabled: false },
//     },
//     plotOptions: {
//       bar: {
//         dataLabels: {
//           position: "top",
//           orientation: "vertical",
//         },
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       offsetX: 0,
//       offsetY: 10,
//       textAnchor: "start",
//       style: {
//         colors: ["#000"],
//       },
//       formatter: function (val: number, opt: any) {
//         if (opt.seriesIndex === 1) {
//           return val + "%";
//         } else {
//           return addCommasToNumber(val);
//         }
//       },
//     },
//     legend: { show: false },
//     colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
//     xaxis: {
//       categories: stateLbls,
//       labels: {
//         trim: true,
//         maxHeight: 150,
//         rotate: -90,
//       },
//     },
//     yaxis: [
//       {
//         // title: {
//         //   text: 'Absolute Value',
//         // },
//       },
//       {
//         opposite: true,
//         tooltip: {
//           enabled: false,
//         },
//         min: minValue,
//         max: maxValue,
//       },
//     ],
//     tooltip: {
//       shared: true,
//       intersect: false,
//     },
//     grid: {
//       padding: {
//         top: 30,  // Provide extra space at the bottom for long labels
//       }
//     },
//   };

//   return (
//     <Card className="main-wrapper inline-block w-full h-full max-h-full fit-content vahanBox relative">
//       <CardHeader
//         title={`State Wise Retail`}
//         // title={`State Wise Retail${
//         //   chartTitle !== "" ? ` (${chartTitle})` : ""
//         // }`}
//         className="chartTitle"
//       />
//       <CardContent className="dashboard-sales-items compare-filter chartcard-overflow">
//         {data?.length > 0 && !loader ? (
//           <Box
//             id="chartMonth"
//             style={{ width: "100%", height: "100%" }}
//             className="animate__animated animate__fadeIn animate__delay-800ms"
//           >
//             <Box className="card-body chartcard-overflow sc-chart">
//               <div id="stateChart">
//                 <ReactApexChart
//                   options={options}
//                   series={series}
//                   type="bar"
//                   height={500}
//                   width="100%"
//                   // height="100%"
//                 />
//               </div>
//             </Box>
//           </Box>
//         ) : loader ? (
//           <Box className="flex align-middle justify-center">
//             <Loading className={!loader ? "hide" : "insideChart"} />
//           </Box>
//         ) : (
//           <Box className="flex align-middle justify-center norecordbody norecord">
//             <Image
//               height={226}
//               width={329}
//               src="/assets/images/no records found.png"
//               alt="No Records Found"
//             />
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default StatewiseChart;

import React from "react";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  addCommasToNumber,
  NumberFormat_2,
  NumberFormat_4,
} from "@root/utils/globalFunction";
import { useSelector } from "react-redux";
import { getFromLocalStorage } from "@root/utils";

// Dynamically import ReactApexChart with no SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Ensure Loading is a valid component
const Loading = dynamic(() => import("@root/components/Loading"));

interface StatewiseChartDataItem {
  state_name: string;
  sum: string;
}

interface StatewiseChartProps {
  data: StatewiseChartDataItem[];
  loader: boolean;
  handleDataDumpPopup: any;
}

const StatewiseChart: React.FC<StatewiseChartProps> = ({
  data,
  loader,
  handleDataDumpPopup,
}: any) => {
  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);

  let StateDividedBy: number = 0;
  let stateLbls: string[] = [];
  let stateLblseries1: number[] = [];
  let stateLblseries2: number[] = [];

  const sumOfArray = data?.reduce(
    (n: any, { result }: any) => n + Number(result),
    0
  );

  const averageOfArray = sumOfArray / data?.length;

  StateDividedBy = Number.isFinite(averageOfArray)
    ? Number(NumberFormat_2(averageOfArray))
    : 0;

  const chartTitle = NumberFormat_4(StateDividedBy);

  for (let i = 0; i < data?.length; i++) {
    const result = data[i]?.result;
    const per_result = data[i]?.per_result;

    if (data[i]?.grp_value) {
      stateLbls.push(data[i]?.grp_value);
    }

    // Validate and push result values
    const resultValue = Number.isFinite(result) ? Math.round(result || 0) : 0;
    stateLblseries1.push(resultValue);

    // Validate and push percentage result values
    const perResultValue = Number.isFinite(per_result) ? per_result : 0;
    stateLblseries2.push(Number(perResultValue?.toFixed(2)));
  }

  // Check for valid min and max values to avoid Infinity issues
  // const minValue = Math.min(...stateLblseries2);
  // const maxValue = Math.max(...stateLblseries2);

  const series: any[] = [
    {
      name: "Result",
      type: "bar",
      data: stateLblseries1,
    },
    {
      name: "Result %",
      type: "bar",
      data: stateLblseries2,
      yaxis: 1,
    },
  ];

  // console.log("Series Data:", series); // Debugging line to check series data

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
            filename: "Maker Wise",
          },
        },
      },
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
          return `${val}%`;
        } else {
          return addCommasToNumber(val);
        }
      },
    },
    legend: { show: false },
    colors: ["#5B97D5", "#245BBB", "#C94E5E", "#F96464", "#FF8386"],
    xaxis: {
      categories: stateLbls,
      labels: {
        trim: true,
        maxHeight: 150,
        rotate: -90,
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
        max: 100, // Default max if no valid value found
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
    grid: {
      padding: {
        top: 30, // Provide extra space at the bottom for long labels
      },
    },
  };

  return (
    <Card className="main-wrapper inline-block w-full h-full max-h-full fit-content vahanBox relative">
      <CardHeader
        title={`State Wise Retail`}
        className="chartTitle"
      />
      <CardContent className="dashboard-sales-items compare-filter chartcard-overflow">
        {data?.length > 0 && !loader ? (
          <Box
            id="chartMonth"
            style={{ width: "100%", height: "100%" }}
            className="animate__animated animate__fadeIn animate__delay-800ms"
          >
            <Box className="card-body chartcard-overflow sc-chart">
              <div id="stateChart">
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
        ) : loader ? (
          <Box className="flex align-middle justify-center min-h-[226px]">
            <Loading className={!loader ? "hide" : "insideChart"} />
          </Box>
        ) : (
          <Box className="flex align-middle justify-center norecordbody norecord">
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

export default StatewiseChart;
