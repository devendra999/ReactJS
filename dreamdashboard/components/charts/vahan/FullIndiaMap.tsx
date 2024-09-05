import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tooltip,
} from "@mui/material";
import Loading from "@root/components/Loading";
import {
  NumberFormat_2,
  NumberFormat_3,
  NumberFormat_4,
} from "@root/utils/globalFunction";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import DatamapsIndia from "react-datamaps-india";
import IndiaMap from "./IndiaMap";
import IconButtonSingle from "@root/components/IconButtonSingle";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Modal from "@root/components/Modal";

interface MapChartDataItem {
  state_name: string;
  result: string;
  scalTitle?: string;
}

interface FullIndiaMapProps {
  data: MapChartDataItem[];
  loader: boolean;
}

const FullIndiaMap: React.FC<FullIndiaMapProps> = ({
  data,
  loader,
  scalTitle,
}: any) => {
  const [mapData, setMapData] = useState(null);
  let StateDividedBy: number = 0;
  let stateLbls: string[] = [];
  let stateLblseries1: Number[] = [];
  let stateLblseries2: Number[] = [];

  const sumOfArray = data?.reduce(
    (n: any, { result }: any) => n + Number(result),
    0
  );
  const averageOfArray = sumOfArray / data?.length;
  StateDividedBy = Number(NumberFormat_2(averageOfArray));
  const chartTitle = NumberFormat_4(StateDividedBy);

  for (let i = 0; i < data?.length; i++) {
    data[i]?.grp_value && stateLbls?.push(data[i]?.grp_value);
    (data[i]?.result || data[i]?.result === 0 || data[i]?.result === null) &&
      stateLblseries1.push(
        Number(`${Math.round(data[i]?.result === null ? 0 : data[i]?.result)}`)
      );
    stateLblseries2.push(
      Number(
        `${data[i].per_result === null ? 0 : data[i].per_result?.toFixed(2)}`
      )
    );
  }

  useEffect(() => {
    if (data && data?.length > 0) {
      const indiaMapData = data?.map((list: any) => ({
        id: list?.grp_id,
        code: list?.code?.trim(),
        state: list?.grp_value,
        value: list?.result,
        // value: NumberFormat_3(list?.result, StateDividedBy),
        per_result: "(" + list?.per_result?.toFixed(2) + "%)",
      }));

      setMapData(indiaMapData);
    }
  }, [data]);

  return (
    <Box className="main-wrapper inline-block w-full h-full max-h-full fit-content vahanBox relative">
      <Box className="dashboard-sales-items compare-filter chartcard-overflow flex items-center justify-center h-full">
        {mapData && (mapData as any)?.length > 0 && !loader ? (
          <Box className="animate__animated animate__fadeIn animate__delay-800ms w-full h-full">
            <Box className="card-body chartcard-overflow sc-chart  flex items-center justify-center fullChart">
              <IndiaMap
                stateData={mapData && (mapData as any)?.length > 0 && mapData}
                scalTitle={chartTitle}
              />
            </Box>
          </Box>
        ) : loader ? (
          <Box className="flex align-middle justify-center">
            <Loading className={!loader ? "hide" : "insideChart"} />
          </Box>
        ) : (
          <Box className="flex align-middle justify-center norecordbody norecord ">
            <Image
              height={470}
              width={329}
              src="/assets/images/no records found.png"
              alt="No Records Found"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FullIndiaMap;
