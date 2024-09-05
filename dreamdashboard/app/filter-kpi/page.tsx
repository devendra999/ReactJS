"use client";
import React, { useEffect, useState } from "react";
import type { RuleGroupTypeIC } from "react-querybuilder";
import {
  QueryBuilder,
  RuleType,
  Field,
  defaultValidator,
  formatQuery,
} from "react-querybuilder";
import { QueryBuilderDnD } from "@react-querybuilder/dnd";
import * as ReactDnD from "react-dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import "react-querybuilder/dist/query-builder.css";
import SidebarWithLayout from "../layout-with-sidebar";
import { Box, Grid, Snackbar } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import { CustomValueEditor } from "./CustomValueEditor";
import InputField from "@root/components/InputField";
import {
  useKpiControllerKpiFilter,
  useKpiControllerFilterRead,
  useKpiControllerBrandWiseKpiListing,
} from "../../backend/backendComponents";
import FilterKpiDropdown from "@root/components/FilterKpiDropdown";
import { getFromLocalStorage } from "@root/utils/common";
// import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { reInitialStates } from "@root/utils/globalFunction";

// const initialFields: Field[] = [
//   { name: "", label: "Select Columns" },
//   { name: "firstName", label: "First Name" },
//   { name: "lastName", label: "Last Name" },
//   {
//     name: "dateRange",
//     label: "Date Range",
//     operators: [{ name: "between", label: "between" }],
//     datatype: "dateRange",
//   },
// ];

const combinators: Field[] = [
  // { name: "", label: "And | Or" },
  { name: "and", label: "AND" },
  { name: "or", label: "OR" },
];

const operators: Field[] = [
  { name: "", label: "Select Operator" },
  {
    name: "=",
    label: "=",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "!=",
    label: "!=",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "<",
    label: "<",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: ">",
    label: ">",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "<=",
    label: "<=",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: ">=",
    label: ">=",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "contains",
    label: "contains",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "beginsWith",
    label: "begins with",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "endsWith",
    label: "ends with",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "doesNotContain",
    label: "does not contain",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "doesNotBeginWith",
    label: "does not begin with",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "doesNotEndWith",
    label: "does not end with",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "null",
    label: "is null",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "notNull",
    label: "is not null",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "in",
    label: "in",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "notIn",
    label: "not in",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "between",
    label: "between",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "notBetween",
    label: "not between",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  // Add custom operators for lowercase and uppercase comparisons
  {
    name: "lowercase",
    label: "Lowercase",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  {
    name: "uppercase",
    label: "Uppercase",
    comparator: "groupNumber",
    groupNumber: "group1",
    valueSources: ["field", "value"],
  },
  // Other operators...
];

export const validator = (r: RuleType) => !!r.value;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TestFilterKpi() {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);

  const [query, setQuery] = useState<RuleGroupTypeIC>({
    rules: [{ rules: [{ field: "", operator: "", value: "" }] }],
  });
  const [value, setValue] = useState<number | undefined>();
  const [fieldValue, setFieldValue] = useState<any>("");
  const [queryValid, setQueryValid] = useState<string>("");
  const [whereValue, setWhereValue] = useState<any>("");
  const [open, setOpen] = React.useState(false);
  const [readQuery, setReadQuery] = useState(false);

  const { mutateAsync: filterKpiUpdating /*isLoading: loadingTableColumns*/ } =
    useKpiControllerKpiFilter();

  const { data: kpiFilterKpiRead, refetch: kpiFilterKpiReadFatching } =
    useKpiControllerFilterRead(
      {
        pathParams: { id: value as number },
      },
      { enabled: false }
    );

  const { data: kpiListing, refetch: fetchKpiListing } =
    useKpiControllerBrandWiseKpiListing(
      {
        pathParams: {
          brandId: _globalFilter && _globalFilter.global_filter.p_brand_id,
        },
      },
      { enabled: false }
    );

  useEffect(() => {
    reInitialStates();
  }, []);

  useEffect(() => {
    if (_globalFilter.global_filter.p_brand_id != 0) {
      fetchKpiListing();
    }
  }, [_globalFilter.global_filter.p_brand_id]);


  const selectKpiListing = (kpiListing as any)?.data
    ?.filter(
      (lists: any) => lists.kpiTypeId !== 3 && lists.sheetConfigId !== null
    )
    .map((kpiList: any) => ({
      label: kpiList.name + " " + "(" + kpiList.code + ")",
      value: kpiList.id,
    }));

  // useEffect(() => {
  //   // Function to hide the Alert after 5 seconds
  //   const hideAlert = () => {
  //     setQueryValid(""); // Set to null to hide the Alert
  //   };

  //   if (queryValid !== null) {
  //     // If queryValid is not null (i.e., a message is shown), start a timer to hide it after 5 seconds
  //     const timer = setTimeout(hideAlert, 3000);

  //     // Clean up the timer when the component unmounts or when queryValid changes
  //     return () => clearTimeout(timer);
  //   }
  // }, [queryValid]);

  useEffect(() => {
    if (value) {
      kpiFilterKpiReadFatching();
    }
  }, [value, kpiFilterKpiReadFatching]);

  useEffect(() => {
    if (query && !readQuery) {
      setWhereValue(
        formatQuery(query, {
          format: "sql",
          quoteFieldNamesWith: '"',
        })
      );
    }
  }, [query]);

  useEffect(() => {
    if (whereValue) {
      const elements: any = document.getElementsByName("whereContentTxtBox")[0];
      if (elements) {
        elements.value = whereValue;
      }
    }
  }, [whereValue]);

  useEffect(() => {
    if (value && kpiFilterKpiRead) {
      let selectKpiListingFields = [];
      const validateKpiListing = (kpiListing as any)?.data?.filter(
        (lists: any) => lists.kpiTypeId !== 3 && lists.sheetConfigId !== null
      );
      const selectedKpiField = (validateKpiListing as any)?.filter(
        (lists: any) => lists.id === value
      );

      for (let i = 0; i < selectedKpiField?.length; i++) {
        for (
          let j = 0;
          j < selectedKpiField[i].sheetConfig.fieldDetail.arr.length;
          j++
        ) {
          selectKpiListingFields.push({
            label: selectedKpiField[i].sheetConfig.fieldDetail.arr[j].name,
            name: selectedKpiField[i].sheetConfig.fieldDetail.arr[j].name,
            placeholder:
              "Enter" +
              " " +
              selectedKpiField[i].sheetConfig.fieldDetail.arr[j].name,
            validator,
            //       comparator: "groupNumber", // Add comparator property
            // groupNumber: "group1", // Add groupNumber property
            valueSources: ["field", "value"], // Add valueSources property
          });
        }
      }

      // Add the "Select Field" option at the 0th position in the fieldValue array
      const selectFieldOption = {
        label: "Select Field",
        name: "", // Set the appropriate value for the name property if needed
      };

      // Create a new array with the "Select Field" option at the 0th position
      const newFieldValue = [selectFieldOption, ...selectKpiListingFields];

      setFieldValue(newFieldValue);

      // setFieldValue(
      //   selectKpiListingFields.sort((a: any, b: any) =>
      //     a.label.localeCompare(b.label, "en", {
      //       sensitivity: "base",
      //     })
      //   )
      // );
      let kpiDataJson = (kpiFilterKpiRead as any)?.data?.whereContentJson;
      let kpiDataSql = (kpiFilterKpiRead as any)?.data?.whereContent;

      if (kpiDataJson) {
        setQuery(kpiDataJson);
        setReadQuery(true);
      } else {
        setQuery({
          rules: [{ rules: [{ field: "", operator: "", value: "" }] }],
        });
      }

      if (kpiDataSql) {
        setWhereValue(kpiDataSql);
      } else {
        setWhereValue(`((""  ''))`);
      }
    }
  }, [value, kpiFilterKpiRead]);

  const handleChange = (param: any) => {
    setValue(param);
  };

  const queryValidator = (q: any) => {
    // Check if there are rules
    if (q.rules.length === 0) {
      return false;
    }
    // Check each rule
    for (const rule of q.rules) {
      // If rule.rules is not an array, it means there are no nested rules,
      // so you can skip this iteration
      if (!Array.isArray(rule.rules)) {
        continue;
      }

      for (const subRule of rule.rules) {
        // Check if field, operator, and value are selected
        if (subRule !== "and" || subRule !== "or") {
          if (
            subRule?.field === "" ||
            subRule?.operator === "" ||
            (subRule.operator !== "null" &&
              subRule.operator !== "notNull" &&
              subRule?.value === "")
            // subRule?.value === ""
          ) {
            return false;
          }
          // For "between" operator, check if the values are provided
          if (subRule.operator === "between") {
            // Check if all values in the "value" array are non-null
            if (
              subRule.value[0] === "" ||
              subRule.value[0] === undefined ||
              subRule.value[0] === null ||
              subRule.value[1] === "" ||
              subRule.value[1] === undefined ||
              subRule.value[1] === null
            ) {
              return false;
            }
          }
        }
      }
    }
    // All validation checks passed
    return true;
  };

  const handleCancelOnClick = () => {
    const elements: any = document.getElementsByName("whereContentTxtBox")[0];
    if (elements) {
      elements.value = "";
    }
    setWhereValue("");
    setQuery({
      rules: [{ rules: [{ field: "", operator: "", value: "" }] }],
    });
  };

  const handleClearOnClick = async () => {
    handleCancelOnClick();
    setOpen(true);
    const qryValidator = queryValidator(query);
    if (qryValidator) {
      const filterKpiRequest = [];

      filterKpiRequest.push({
        id: value,
        where_content: null,
        where_content_json: null,
      });

      setQueryValid("valid");
      await filterKpiUpdating({
        body: filterKpiRequest,
      });
      // alert("save");
      setWhereValue("");
    } else {
      setQueryValid("notValid");
    }
  };

  const handleSaveOnClick = async () => {
    setOpen(true);
    const qryValidator = queryValidator(query);
    if (qryValidator) {
      const filterKpiRequest = [];

      filterKpiRequest.push({
        id: value,
        where_content: whereValue
          ? whereValue
          : formatQuery(query, {
              format: "sql",
              quoteFieldNamesWith: '"',
            }),
        where_content_json: query,
      });

      setQueryValid("valid");
      await filterKpiUpdating({
        body: filterKpiRequest,
      });
      // alert("save");
      setWhereValue("");
    } else {
      setQueryValid("notValid");
    }
  };

  const handleChangeWhereContent = (param: any) => {
    setWhereValue(param.whereContentTxtBox);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const queryChange = (param: any) => {
    setReadQuery(false);
    setQuery(param);
  };

  return (
    <>
      <SidebarWithLayout>
        <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
          <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 filt-kpi res-title-height flex flex-wrap items-center ">
          {/* <Box className="flex items-center sm:block"> */}
            <PanelHeading firstHeading={"Filter KPI"} filterOption={false} />
            </Box>
          {/* </Box> */}
          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
            <Grid container spacing={2}>
              {queryValid === "notValid" && (
                <Grid item xs={12}>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <Alert severity="error">
                        Query is not valid. Some fields, operators, or values
                        are empty.
                      </Alert>
                    </Snackbar>
                  </Stack>
                </Grid>
              )}
              {queryValid === "valid" && (
                <Grid item xs={12}>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <Alert severity="success">
                        KPI&apos;s Are Mapped Successfully
                      </Alert>
                    </Snackbar>
                  </Stack>
                </Grid>
              )}
              <Grid item xs={12} className='animate__animated animate__fadeInUp animate__faster'>
                <InputField
                  name="whereContentTxtBox"
                  // readonly
                  handleChange={handleChangeWhereContent}
                  placeholder="Placeholder"
                  type="text"
                  className="dropdowncomponent-fc mb-0 bg-white rounded-lg text-blacklight h-12 p-0 shadow-[0_2px_24px_0_rgba(0,0,0,.1)]"
                  style={{ resize: "vertical" }}
                  defaultValue={
                    whereValue
                      ? whereValue
                      : formatQuery(query, {
                          format: "sql",
                          quoteFieldNamesWith: '"',
                        })
                  }
                />
              </Grid>
              <Grid item xs={12} className='animate__animated animate__fadeInUp animate__faster'>
                <FilterKpiDropdown
                  className="dropdownComponent rounded-lg bg-white text-blacklight h-12 p-0 shadow-[0_2px_24px_0_rgba(0,0,0,.1)]"
                  dropdownTitle="Select KPI"
                  options={
                    selectKpiListing &&
                    selectKpiListing.sort((a: any, b: any) =>
                      a.label.localeCompare(b.label, "en", {
                        sensitivity: "base",
                      })
                    )
                  }
                  // onChange={handleChange}
                  sendChildToParent={handleChange}
                />
              </Grid>
            </Grid>

            {value ? (
              <>
                <QueryBuilderDnD
                  key="query-builder"
                  dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}
                 
                >
                  <QueryBuilder
                    showCombinatorsBetweenRules
                    addRuleToNewGroups
                    fields={fieldValue}
                    operators={operators}
                    combinators={combinators}
                    query={query}
                    independentCombinators
                    validator={defaultValidator}
                    listsAsArrays
                    onQueryChange={(q) => queryChange(q)}
                    controlElements={{ valueEditor: CustomValueEditor }}
                  />
                </QueryBuilderDnD>
                <Box className="w-100 mt-5 mb-8 flex justify-center">
                  <ButtonItem
                    className="outlineBtn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                    ButtonTitle="Cancel"
                    type="button"
                    onClick={handleCancelOnClick}
                  />
                  <ButtonItem
                    className="containBtn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                    ButtonTitle="Save"
                    type="button"
                    onClick={handleSaveOnClick}
                  />
                  <ButtonItem
                    className="outlineBtn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                    ButtonTitle="Clear Filters"
                    type="button"
                    onClick={handleClearOnClick}
                  />
                </Box>
              </>
            ) : (
              ""
            )}

            {/* <Box>
            <h4>SQL as result of Json :</h4>
            <pre>{formatQuery(query, "json")}</pre>
            <pre>{formatQuery(query, "sql")}</pre>
          </Box> */}
          </Box>
        </Box>
      </SidebarWithLayout>
    </>
  );
}
