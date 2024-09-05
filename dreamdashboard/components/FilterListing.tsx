import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export const FilterListing = (props: any) => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const searchParams = useSearchParams();
  // const pageCode = searchParams.get("page");
  let dynamicSC;

  // if (pageCode === "compare") {
  if (_globalFilter.global_filter.p_master_page_code === "sr_dashboard") {
    dynamicSC = "Service Advisor:";
  } else {
    dynamicSC = "Sales Consultant:";
  }
  // } else {
  //   if (pageCode === "sr_dashboard") {
  //     dynamicSC = "Service Advisor:";
  //   } else {
  //     dynamicSC = "Sales Consultant:";
  //   }
  // }

  const modelData =
    // pageCode == "compare"
    //   ?
    props.cellnum == 1
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
      : _globalFilter.global_filter.p_model != ""
      ? _globalFilter.global_filter.p_model
      : null;

  const locationData =
    // pageCode == "compare"
    // ?
    props.cellnum == 1
      ? _globalFilter.compare_filter.first_column.p_location != ""
        ? _globalFilter.compare_filter.first_column.p_location
        : null
      : props.cellnum == 2
      ? _globalFilter.compare_filter.second_column.p_location != ""
        ? _globalFilter.compare_filter.second_column.p_location
        : null
      : props.cellnum == 3
      ? _globalFilter.compare_filter.third_column.p_location != ""
        ? _globalFilter.compare_filter.third_column.p_location
        : null
      : props.cellnum == 4
      ? _globalFilter.compare_filter.fourth_column.p_location != ""
        ? _globalFilter.compare_filter.fourth_column.p_location
        : null
      : _globalFilter.global_filter.p_location != ""
      ? _globalFilter.global_filter.p_location
      : null;

  const userData =
    // pageCode == "compare"
    //   ?
    props.cellnum == 1
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
      : _globalFilter.global_filter.p_sc != ""
      ? _globalFilter.global_filter.p_sc
      : null;

  return (
    <>
      {window.location.pathname !== "/vahan" ? (
        <List
          component="nav"
          className="select-option withoutMarquee flex items-center justify-start mb-2 pb-0 overflow-y-auto"
        >
          <ListItem className="p-0 w-auto mr-3">
            <ListItemText>
              <Typography
                component="p"
                className="text-blacklight flex items-center font-bold whitespace-nowrap"
              >
                Model:
                <Typography
                  component="span"
                  className="service-year font-medium ml-1.5 text-black"
                >
                  {modelData && modelData.length > 0
                    ? modelData.map((obj: any) => obj.label).join(", ")
                    : "All"}
                </Typography>
              </Typography>
            </ListItemText>
          </ListItem>
          {window.location.pathname !== "/inventory" && (
            <>
              <ListItem className="p-0 w-auto mr-3">
                <ListItemText>
                  <Typography
                    component="p"
                    className="text-blacklight flex items-center font-bold whitespace-nowrap"
                  >
                    Location:
                    <Typography
                      component="span"
                      className="service-year font-medium ml-1.5 text-black "
                    >
                      {locationData && locationData.length > 0
                        ? locationData.map((obj: any) => obj.label).join(", ")
                        : "All"}
                    </Typography>
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem className="p-0 w-auto mr-3">
                <ListItemText>
                  <Typography
                    component="p"
                    className=" text-blacklight flex items-center font-bold whitespace-nowrap"
                  >
                    {dynamicSC}
                    <Typography
                      component={"span"}
                      className="service-year font-medium ml-1.5 text-black "
                    >
                      {userData && userData.length > 0
                        ? userData.map((obj: any) => obj.label).join(", ")
                        : "All"}
                    </Typography>
                  </Typography>
                </ListItemText>
              </ListItem>
            </>
          )}
        </List>
      ) : (
        <List
          component="nav"
          className="select-option withoutMarquee flex items-center justify-start mb-2 pb-0 overflow-y-auto"
        >
          <ListItem className="p-0 w-auto mr-3">
            <ListItemText>
              <Typography
                component="p"
                className="text-blacklight flex items-center font-bold whitespace-nowrap"
              >
                State:
                <Typography
                  component="span"
                  className="service-year font-medium ml-1.5 text-black "
                >
                  {_globalFilter.vahan_filter.p_state_id
                    ? _globalFilter.vahan_filter.p_state_id
                        .map((obj: any) => obj.label)
                        .join(", ")
                    : "All"}
                </Typography>
              </Typography>
            </ListItemText>
          </ListItem>

          {_globalFilter.vahan_filter.p_city_id !== null &&

          <ListItem className="p-0 w-auto mr-3">
            <ListItemText>
              <Typography
                component="p"
                className="text-blacklight flex items-center font-bold whitespace-nowrap"
              >
                City:
                <Typography
                  component="span"
                  className="service-year font-medium ml-1.5 text-black "
                >
                  {_globalFilter.vahan_filter.p_city_id
                    ? _globalFilter.vahan_filter.p_city_id
                        .map((obj: any) => obj.label)
                        .join(", ")
                    : "All"}
                </Typography>
              </Typography>
            </ListItemText>
          </ListItem>}

          {_globalFilter.vahan_filter.p_rto_id !== null &&

          <ListItem className="p-0 w-auto mr-3">
            <ListItemText>
              <Typography
                component="p"
                className="text-blacklight flex items-center font-bold whitespace-nowrap"
              >
                RTO:
                <Typography
                  component="span"
                  className="service-year font-medium ml-1.5 text-black "
                >
                  {_globalFilter.vahan_filter.p_rto_id
                    ? _globalFilter.vahan_filter.p_rto_id
                        .map((obj: any) => obj.label)
                        .join(", ")
                    : "All"}
                </Typography>
              </Typography>
            </ListItemText>
          </ListItem>}

          <ListItem className="p-0 w-auto mr-3">
            <ListItemText>
              <Typography
                component="p"
                className=" text-blacklight flex items-center font-bold whitespace-nowrap"
              >
                Maker:
                <Typography
                  component={"span"}
                  className="service-year font-medium ml-1.5 text-black "
                >
                  {_globalFilter.vahan_filter.p_maker_id
                    ? _globalFilter.vahan_filter.p_maker_id
                        .map((obj: any) => obj.label)
                        .join(", ")
                    : "All"}
                </Typography>
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      )}
    </>
  );
};
