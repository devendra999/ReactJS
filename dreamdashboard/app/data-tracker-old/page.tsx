"use client";
import React, { useEffect } from "react";
import { PanelHeading } from "@root/components/PanelHeading";
// import SidebarWithLayout from "../layout-with-sidebar";
import clsx from "clsx";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { useImportFileControllerDataTracker } from "../../backend/backendComponents";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  reInitialStates,
  resetAllFiltersWhenPageCodeChange,
} from "@root/utils/globalFunction";
import { updateGlobalFilterKey } from "../layout";

const SidebarWithLayout = dynamic(() => import("../layout-with-sidebar"));
const Loading = dynamic(() => import("@root/components/Loading"));

const DataTracker: React.FC = () => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const searchParams = useSearchParams();
  const pageCode = searchParams.get("page");
  const router = useRouter();

  const dynamicHeaders = [
    "KPI Name",
    "Bucket Name",
    "Sheet Name",
    "Unique Value",
    "Model",
    "Branch",
    "Consultant / Advisor",
    "Date",
    "Value 1",
    "Value 2",
  ];

  const qParamsObject = {
    p_start_date: _globalFilter.global_filter.p_start_date,
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
    p_master_page_code: _globalFilter.global_filter.p_master_page_code,
    p_user_id: _globalFilter.global_filter.p_user_id,
    p_brand_id: _globalFilter.global_filter.p_brand_id,
  };

  const {
    data: dataTrackerData,
    refetch: dataTrackerRefeching,
    isLoading: loading,
    error,
  } = useImportFileControllerDataTracker(
    {
      queryParams: qParamsObject,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    reInitialStates();
    if (_globalFilter.global_filter.p_master_page_code != pageCode) {
      updateGlobalFilterKey("global_filter.p_master_page_code", pageCode);
      updateGlobalFilterKey(
        "compare_filter.first_column.p_master_page_code",
        pageCode
      );
      updateGlobalFilterKey(
        "compare_filter.second_column.p_master_page_code",
        pageCode
      );
      updateGlobalFilterKey(
        "compare_filter.third_column.p_master_page_code",
        pageCode
      );
      updateGlobalFilterKey(
        "compare_filter.fourth_column.p_master_page_code",
        pageCode
      );
      resetAllFiltersWhenPageCodeChange();
    }
    updateGlobalFilterKey("benchmark_toggle", false);
    dataTrackerRefeching();
  }, []);

  useEffect(() => {
    if (_globalFilter.global_filter.p_master_page_code != "") {
      router.push(
        "/data-tracker?page=" + _globalFilter.global_filter.p_master_page_code
      );
    }
    dataTrackerRefeching();
  }, [_globalFilter]);

  return (
    <SidebarWithLayout>
      <Loading className={`${loading ? "" : "hide"} `} />
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 data-tracker-head">
          <PanelHeading
            firstHeading={"Data Tracker" + " " + "-"}
            secondHeading={_globalFilter.formatted_date}
            filterOption={true}
          />
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box className="dashboard-sales-items">
            <TableContainer
              component={Paper}
              className="accodion-table-wrapper data-tracker rounded-lg"
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="bg-gradient-blue sticky top-0 left-0 z-[2]">
                  <TableRow>
                    {dynamicHeaders.map((item, index) => {
                      return <TableCell key={index}>{item}</TableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(dataTrackerData as any)?.data?.map(
                    (item: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={clsx("custom-cell", {
                            danger: item.v_kpi_name === "",
                          })}
                          align="center"
                        >
                          {item.v_kpi_name === "" ? (
                            <Box className="flex align-center justify-center data-problem">
                              {<WarningAmberRoundedIcon />} Data Problem
                            </Box>
                          ) : (
                            item.v_kpi_name
                          )}
                        </TableCell>

                        <TableCell
                          className={clsx("custom-cell", {
                            danger: item.v_bucket_name === "",
                          })}
                          align="center"
                        >
                          {item.v_bucket_name === "" ? (
                            <Box className="flex align-center justify-center data-problem">
                              {<WarningAmberRoundedIcon />} Data Problem
                            </Box>
                          ) : (
                            item.v_bucket_name
                          )}
                        </TableCell>

                        <TableCell
                          className={clsx("custom-cell", {
                            danger: item.v_sheet_name === "",
                          })}
                          align="center"
                        >
                          {item.v_sheet_name === "" ? (
                            <Box className="flex align-center justify-center data-problem">
                              {<WarningAmberRoundedIcon />} Data Problem
                            </Box>
                          ) : (
                            item.v_sheet_name
                          )}
                        </TableCell>

                        <TableCell
                          className={clsx("custom-cell", {
                            danger: item.v_unique_column,
                          })}
                          align="center"
                        >
                          {item.v_unique_value > 0 ? (
                            <Box className="data-problem">
                              {<WarningAmberRoundedIcon />}{" "}
                              {item.v_unique_column}
                              {item.v_unique_value > 0 && (
                                <Box>{`(${item.v_unique_value} Missing)`}</Box>
                              )}
                            </Box>
                          ) : (
                            item.v_unique_column
                          )}
                        </TableCell>

                        <TableCell
                          className={clsx("custom-cell", {
                            danger: item.v_model_column,
                          })}
                          align="center"
                        >
                          {item.v_model_value > 0 ? (
                            <Box className="data-problem">
                              {<WarningAmberRoundedIcon />}{" "}
                              {item.v_model_column}
                              {item.v_model_value > 0 && (
                                <Box>{`(${item.v_model_value} Missing)`}</Box>
                              )}
                            </Box>
                          ) : (
                            item.v_model_column
                          )}
                        </TableCell>

                        <TableCell
                          className={clsx("custom-cell", {
                            danger: item.v_branch_value,
                          })}
                          align="center"
                        >
                          {item.v_branch_value > 0 ? (
                            <Box className="data-problem">
                              {<WarningAmberRoundedIcon />}{" "}
                              {item.v_branch_column}
                              {item.v_branch_value > 0 && (
                                <Box>{`(${item.v_branch_value} Missing)`}</Box>
                              )}
                            </Box>
                          ) : (
                            item.v_branch_column
                          )}
                        </TableCell>

                        <TableCell
                          className={clsx("custom-cell", {
                            danger: item.v_sales_consultant_value,
                          })}
                          align="center"
                        >
                          {item.v_sales_consultant_value > 0 ? (
                            <Box className="data-problem">
                              {<WarningAmberRoundedIcon />}{" "}
                              {item.v_sales_consultant_column}
                              {item.v_sales_consultant_value > 0 && (
                                <Box>
                                  {`(${item.v_sales_consultant_value} Missing)`}
                                </Box>
                              )}
                            </Box>
                          ) : (
                            item.v_sales_consultant_column
                          )}
                        </TableCell>

                        <TableCell
                          className={clsx("custom-cell", {
                            danger: item.v_date_value,
                          })}
                          align="center"
                        >
                          {item.v_date_value > 0 ? (
                            <Box className="data-problem">
                              {<WarningAmberRoundedIcon />} {item.v_date_column}
                              {item.v_date_value > 0 && (
                                <Box>{`(${item.v_date_value} Missing)`}</Box>
                              )}
                            </Box>
                          ) : (
                            item.v_date_column
                          )}
                        </TableCell>

                        <TableCell
                          className={clsx("custom-cell", {
                            danger: item.v_value_column_1,
                          })}
                          align="center"
                        >
                          {item.v_value_column_1 > 0 ? (
                            <Box className="data-problem">
                              {<WarningAmberRoundedIcon />}{" "}
                              {item.v_value_column_1}
                              {item.v_value_column_1 > 0 && (
                                <Box>{`(${item.v_value_column_1} Missing)`}</Box>
                              )}
                            </Box>
                          ) : (
                            item.v_value_column_1
                          )}
                        </TableCell>

                        <TableCell
                          className={clsx("custom-cell", {
                            danger: item.v_value_column_2,
                          })}
                          align="center"
                        >
                          {item.v_value_column_2 > 0 ? (
                            <Box className="data-problem">
                              {<WarningAmberRoundedIcon />}{" "}
                              {item.v_value_column_2}
                              {item.v_value_column_2 > 0 && (
                                <Box>{`(${item.v_value_column_2} Missing)`}</Box>
                              )}
                            </Box>
                          ) : (
                            item.v_value_column_2
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
};

export default DataTracker;
