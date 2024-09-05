import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

export const FilterListingMarquee = (props: any) => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const searchParams = useSearchParams();
  const pageCode = searchParams.get("page");
  let dynamicSC;

  if (pageCode === "compare") {
    if (
      _globalFilter.global_filter.p_master_page_code ===
      "sr_dashboard"
    ) {
      dynamicSC = "SA:";
    } else {
      dynamicSC = "SC:";
    }
  } else {
    if (pageCode === "sr_dashboard") {
      dynamicSC = "Service Advisor:";
    } else {
      dynamicSC = "Sales Consultant:";
    }
  }

  const modelData =
    pageCode == "compare"
      ? props.cellnum == 1
        ? _globalFilter.compare_filter.first_column.p_model != ""
          ? _globalFilter.compare_filter.first_column.p_model
          : null
        : props.cellnum == 2
        ? _globalFilter.compare_filter.second_column.p_model != ""
          ? _globalFilter.compare_filter.second_column.p_model
          : null
        : props.cellnum == 3
        ? _globalFilter.compare_filter.third_column.p_model != ""
          ? _globalFilter.compare_filter.third_column.p_model
          : null
        : props.cellnum == 4
        ? _globalFilter.compare_filter.fourth_column.p_model != ""
          ? _globalFilter.compare_filter.fourth_column.p_model
          : null
        : ""
      : _globalFilter.global_filter.p_model != ""
      ? _globalFilter.global_filter.p_model
      : null;

  const locationData =
    pageCode == "compare"
      ? props.cellnum == 1
        ? _globalFilter.compare_filter.first_column.p_location !=
          ""
          ? _globalFilter.compare_filter.first_column.p_location
          : null
        : props.cellnum == 2
        ? _globalFilter.compare_filter.second_column.p_location !=
          ""
          ? _globalFilter.compare_filter.second_column.p_location
          : null
        : props.cellnum == 3
        ? _globalFilter.compare_filter.third_column.p_location !=
          ""
          ? _globalFilter.compare_filter.third_column.p_location
          : null
        : props.cellnum == 4
        ? _globalFilter.compare_filter.fourth_column.p_location !=
          ""
          ? _globalFilter.compare_filter.fourth_column.p_location
          : null
        : ""
      : _globalFilter.global_filter.p_location != ""
      ? _globalFilter.global_filter.p_location
      : null;

  const userData =
    pageCode == "compare"
      ? props.cellnum == 1
        ? _globalFilter.compare_filter.first_column.p_sc != ""
          ? _globalFilter.compare_filter.first_column.p_sc
          : null
        : props.cellnum == 2
        ? _globalFilter.compare_filter.second_column.p_sc != ""
          ? _globalFilter.compare_filter.second_column.p_sc
          : null
        : props.cellnum == 3
        ? _globalFilter.compare_filter.third_column.p_sc != ""
          ? _globalFilter.compare_filter.third_column.p_sc
          : null
        : props.cellnum == 4
        ? _globalFilter.compare_filter.fourth_column.p_sc != ""
          ? _globalFilter.compare_filter.fourth_column.p_sc
          : null
        : ""
      : _globalFilter.global_filter.p_sc != ""
      ? _globalFilter.global_filter.p_sc
      : null;

  return (
    <List
      component="nav"
      className="select-option flex items-center justify-start"
    >
      <ListItem className="p-0 w-auto mr-3">
        <ListItemText>
          <Typography component="p" className=" text-blacklight">
            {pageCode == "compare" ? (
              <Box className="titletd">Model:</Box>
            ) : (
              "Model:"
            )}

            <Typography
              component="span"
              className="service-year  font-semibold ml-2 text-black "
            >
              {pageCode == "compare" ? (
                modelData && modelData.length > 0 ? (
                  <Marquee
                    pauseOnHover={true}
                    style={{ textAlign: "left" }}
                    speed={30}
                  >
                    {modelData.map((obj: any) => obj.label).join(", ")}
                  </Marquee>
                ) : (
                  "All"
                )
              ) : _globalFilter.global_filter.p_model != "" ? (
                _globalFilter.global_filter.p_model
                  .map((obj: any) => obj.label)
                  .join(", ")
              ) : (
                "All"
              )}
            </Typography>
          </Typography>
        </ListItemText>
      </ListItem>

      <ListItem className="p-0 w-auto mr-3">
        <ListItemText>
          <Typography component="p" className=" text-blacklight">
            {pageCode == "compare" ? (
              <Box className="titletd">Location:</Box>
            ) : (
              "Location:"
            )}

            <Typography
              component="span"
              className="service-year  font-semibold ml-2 text-black "
            >
              {pageCode == "compare" ? (
                locationData && locationData.length > 0 ? (
                  <Marquee
                    pauseOnHover={true}
                    style={{ textAlign: "left" }}
                    speed={30}
                  >
                    {locationData.map((obj: any) => obj.label).join(", ")}
                  </Marquee>
                ) : (
                  "All"
                )
              ) : _globalFilter.global_filter.p_location != "" ? (
                _globalFilter.global_filter.p_location
                  .map((obj: any) => obj.label)
                  .join(", ")
              ) : (
                "All"
              )}
            </Typography>
          </Typography>
        </ListItemText>
      </ListItem>

      <ListItem className="p-0 w-auto mr-3">
        <ListItemText>
          <Typography component="p" className=" text-blacklight">
            {pageCode == "compare" ? (
              <Box className="titletd"> {dynamicSC}</Box>
            ) : (
              dynamicSC
            )}

            <Typography
              component={"span"}
              className="service-year  font-semibold ml-2 text-black "
            >
              {pageCode == "compare" ? (
                userData && userData.length > 0 ? (
                  <Marquee
                    pauseOnHover={true}
                    style={{ textAlign: "left" }}
                    speed={30}
                  >
                    {userData.map((obj: any) => obj.label).join(", ")}
                  </Marquee>
                ) : (
                  "All"
                )
              ) : _globalFilter.global_filter.p_sc != "" ? (
                _globalFilter.global_filter.p_sc
                  .map((obj: any) => obj.label)
                  .join(", ")
              ) : (
                "All"
              )}
            </Typography>
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};
