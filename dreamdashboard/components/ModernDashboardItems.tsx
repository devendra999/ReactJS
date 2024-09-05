import React from "react";
import { TableRow, Typography, Grid, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import dynamic from "next/dynamic";
import Image from "next/image";
import SuccessImage from "@root/assets/images/Success.png";
import { indicatorFunction } from "@root/utils/globalFunction";
import { useSelector } from "react-redux";

const ModernDashboardCard = dynamic(() => import("./ModernDashboardCard"));

const filteredkpiDashboard = (
  kpiDashboard: any,
  banchMarkValue: any,
  flags: any,
  pageName: any
) => {
  var myKPIs: any = [];

  kpiDashboard?.map((lists: any) => {
    const indicatorFunctionValue: any[] = indicatorFunction(
      lists,
      banchMarkValue,
      flags,
      pageName
    );
    let finalIndicatorFunctionValue = null;

    if (indicatorFunctionValue.length >= 1) {
      finalIndicatorFunctionValue = indicatorFunctionValue[0];
    }

    if (finalIndicatorFunctionValue === true) {
      myKPIs.push(lists);
    }
  });

  return myKPIs;
};

const ModernDashboardItems = ({
  kpiDashboardSection,
  kpiDashboard,
  pageCode,
  handleOpen,
  dashboardKpiLogic,
  popOverDisplay,
  chartTypeSwitch,
  gridClassName,
  pageName,
  flags,
}: any) => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);

  const finalKPIs =
    kpiDashboard &&
    kpiDashboard.severity !== "ERROR" &&
    pageName == "dpdashboard" &&
    pageCode == _globalFilter.global_filter.p_master_page_code
      ? filteredkpiDashboard(
          kpiDashboard,
          // .filter((obj: any) => obj.v_result !== "0"),
          _globalFilter.benchmark_toggle,
          flags,
          pageName
        )
      : kpiDashboard &&
        kpiDashboard.severity !== "ERROR" &&
        pageName == "inventory"
      ? filteredkpiDashboard(
          kpiDashboard,
          // .filter(
          //   (obj: any) => obj.v_result !== null && obj.v_result !== "0"
          // ),
          _globalFilter.benchmark_toggle,
          flags,
          pageName
        )
      : kpiDashboard;
      

  const masterSectionData =
    kpiDashboard &&
    kpiDashboardSection.sort(
      (a: any, b: any) => (a.orderBy as number) - (b.orderBy as number)
    );

  const distinctSectionName = finalKPIs && [
    ...new Set(
      finalKPIs
        .filter((kpi: any) => kpi.v_group_parent_kpi_id == null)
        .map((obj: any) => obj.v_section_name)
    ),
  ];

  const finalSectionData =
    masterSectionData &&
    masterSectionData.filter((section: any) => {
      return pageName == "inventory"
        ? section.master.pageCode === pageCode &&
            distinctSectionName.includes(section.name) &&
            (section.sectionCode === "InvfuelWise" ||
              section.sectionCode === "InvColorWise" ||
              section.sectionCode === "InvModelWise")
        : section.master.pageCode === pageCode &&
            distinctSectionName.includes(section.name) &&
            section.sectionCode !== "InvfuelWise" &&
            section.sectionCode !== "InvColorWise" &&
            section.sectionCode !== "InvModelWise";
    });

  return (
    <Grid
      container
      rowSpacing={3}
      columnSpacing={{ md: 3, sm: 2 }}
      className={
        chartTypeSwitch === "classic" ? gridClassName : "mordern-row mt-0"
      }
    >
      {finalKPIs && finalSectionData.length > 0
        ? finalSectionData.map((section: any) => (
            <ModernDashboardCard
              chartTypeSwitch={chartTypeSwitch}
              cardIcon={section.iconUrl}
              allKpiData={[finalKPIs, finalKPIs]}
              key={section.id}
              pageCode={pageCode}
              charttitle={section?.name}
              pageName={pageName}
              gridCount={section.noOfBlock}
              groupingChildSection={masterSectionData?.filter(
                (obj: any) => obj.groupParentSectionId === section.id
              )}
              flags={flags}
              seeMore={
                finalKPIs.filter(
                  (lists: any) => section.name === lists.v_section_name
                ).length > 8 && (
                  <Typography
                    component={"span"}
                    className="seeMoreText"
                    onClick={() => handleOpen(section)}
                  >
                    <AddIcon />
                  </Typography>
                )
              }
              displayValues={finalKPIs
                .filter((lists: any) => section.name === lists.v_section_name)
                .slice(0, 8)}
              kpiList={finalKPIs
                .filter(
                  (lists: any) =>
                    section.name === lists.v_section_name
                  //  &&
                  //   lists.v_result !== "0" &&
                  //   lists.v_group_parent_kpi_id === null
                )
                .slice(0, 8)
                ?.map((lists: any) => [
                  <TableRow
                    key={lists.v_kpiid}
                    className={`listItemCard-modern relative px-0 cursor-pointer ${
                      flags == "redflags"
                        ? "redflags"
                        : flags == "greenflags"
                        ? "greenflags"
                        : ""
                    }`}
                  >
                    {dashboardKpiLogic(
                      lists,
                      pageName,
                      kpiDashboard.filter(
                        (kpi: any) =>
                          kpi.v_group_parent_kpi_id === lists.v_kpiid
                      )
                    )}
                  </TableRow>,
                ])}
              kpiListPopover={finalKPIs
                .filter((lists: any) => section.name === lists.v_section_name)
                // .slice(0, 8)
                ?.map((lists: any) => [
                  <TableRow
                    key={lists.v_kpiid}
                    className={`listItemCard-modern relative px-0 cursor-pointer ${
                      flags == "redflags"
                        ? "redflags"
                        : flags == "greenflags"
                        ? "greenflags"
                        : ""
                    }`}
                  >
                    {popOverDisplay(
                      lists,
                      pageName,
                      finalKPIs.filter(
                        (kpi: any) =>
                          kpi.v_group_parent_kpi_id === lists.v_kpiid
                      )
                    )}
                  </TableRow>,
                ])}
            />
          ))
        : pageName === "dpdashboard" &&
          finalSectionData?.length == 0 && (
            <Box className="excellenceContainer">
              <Typography
                component={"h2"}
                className="titleExcellence w-full animate__animated animate__pulse"
                align="center"
              >
                Congratulations! Everything Looks Great!
              </Typography>
              <Box className="excellence bg-contain bg-center bg-no-repeat h-full rounded-[10px] w-full flex items-center justify-center">
                <Image
                  src={SuccessImage}
                  className="absolute bottom-0 w-auto animate__animated animate__fadeIn"
                  alt="edit"
                />
              </Box>
            </Box>
          )}
    </Grid>
  );
};

export default ModernDashboardItems;
