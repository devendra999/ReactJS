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
import FullIndiaMap from "./FullIndiaMap";

interface MapChartDataItem {
  state_name: string;
  result: string;
}

interface MapChartProps {
  data: MapChartDataItem[];
  loader: boolean;
}

const MapChart: React.FC<MapChartProps> = ({ data, loader }: any) => {
  const [mapData, setMapData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        // modaltitle={`${chartTitle} ${chartTitleBracket !== "" ? ` (${chartTitleBracket})` : ""}`}
        modaltitle={`State Wise Retail`}
        modalextraclass="show-rotate-icon-responsive modal-grid-items fullyDataChart"
        // excelButton={rolewiseDisplay.isChartExportAllowed ? true : false}
        // handleExcelDownloadAllData={handleExcelDownloadAllData}
      >
        <Grid
          container
          spacing={2}
          id="chartcardview"
          className="chartcardview"
        >
          <Grid item xs={12} className="right-grid fully">
            <Grid className="chartcard" item xs={12} lg={12}>
              {data && (data as any)?.length > 0 && !loader ? (
                <Box className="card ">
                  <Box className="card-body chartcard-overflow sc-chart">
                    <FullIndiaMap
                      data={data && (data as any)?.length > 0 && data}
                      loader={loader}
                    />
                  </Box>
                </Box>
              ) : (
                <Box className="card">
                  {data?.length == 0 ? (
                    <>
                      <Box className="card-title">Model wise</Box>
                      <Box className="card-body norecordbody norecord">
                        <Image
                          height={226}
                          width={329}
                          src="/assets/images/no records found.png"
                          alt="No Records Found"
                        />
                      </Box>
                    </>
                  ) : (
                    <Loading className="insideChart" />
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Modal>
      <Card className="main-wrapper inline-block w-full h-full max-h-full fit-content vahanBox relative">
        <CardHeader title={`State Wise Retail`} className="chartTitle" />
        <CardContent className="dashboard-sales-items compare-filter chartcard-overflow flex items-center justify-center h-calc-100-minus-58">
          {mapData && (mapData as any)?.length > 0 && !loader ? (
            <Box className="animate__animated animate__fadeIn animate__delay-800ms w-full h-full">
              <Box className="card-body chartcard-overflow sc-chart  flex items-center justify-center ">
                <IndiaMap
                  stateData={mapData && (mapData as any)?.length > 0 && mapData}
                  scalTitle={chartTitle}
                />
                <IconButtonSingle
                  onClick={() => setIsModalOpen(true)}
                  icon={
                    <Tooltip title="Zoom" placement="top">
                      <ZoomInIcon />
                    </Tooltip>
                  }
                  className="containBtn chart-see-more-btn flex item-center btn"
                />
              </Box>
            </Box>
          ) : loader ? (
            <Box className="flex align-middle justify-center min-h-[226px]">
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
        </CardContent>
      </Card>
    </>
  );
};

export default MapChart;
