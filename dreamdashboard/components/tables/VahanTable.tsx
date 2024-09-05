import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import Image from "next/image";
import {
  addCommasToNumber,
  NumberFormat_2,
  NumberFormat_3,
  NumberFormat_4,
} from "@root/utils/globalFunction";
import CommanTable from "../CommanTable";
const Loading = dynamic(() => import("@root/components/Loading"));

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface VahanTableProps {
  data: { grp_value: string; result: number }[];
  loader?: React.ReactNode;
  chartTitle?: any;
}

const VahanTable: React.FC<VahanTableProps> = ({
  data,
  loader,
  chartTitle,
}) => {
  
  let vahanTblDividedBy: number = 0;

  const sumOfArray = data?.reduce(
    (n: any, { result }: any) => n + Number(result),
    0
  );
  const averageOfArray = sumOfArray / data?.length;
  vahanTblDividedBy = Number(NumberFormat_2(averageOfArray));
  const chartTitleBracket = NumberFormat_4(vahanTblDividedBy);

  const dynamicRows = (data as any)?.map((item: any) => ({
    sheetname: item.grp_value,
    // emptyrows: NumberFormat_3(item.result, vahanTblDividedBy),
    emptyrows: addCommasToNumber(item.result),
  }));

  const columns = ["State", "Sales"];

  return (
    <Card className="main-wrapper inline-block w-full h-full max-h-full fit-content vahanBox relative vahan-box-table">
      <CardHeader
        title={`${chartTitle}`}
        // title={`${chartTitle} ${
        //   chartTitleBracket !== "" ? ` (${chartTitleBracket})` : ""
        // }`}
        className="chartTitle"
      />
      <CardContent className="dashboard-sales-items compare-filter p-0 vahan-box-in">
        {data?.length > 0 && !loader ? (
          <Box className="animate__animated animate__fadeIn animate__delay-800ms">
            <Box className="card-body chartcard-overflow sc-chart">
              <Box className="state-table-component">
                <CommanTable columns={columns} rows={dynamicRows} />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box className="flex align-middle justify-center w-full">
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
  );
};

export default VahanTable;
