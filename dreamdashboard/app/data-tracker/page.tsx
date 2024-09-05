"use client";
import React, { useEffect, useState } from "react";
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
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import {
  useImportFileControllerDataTracker,
  useKpiControllerUpdateMappingKpi,
} from "../../backend/backendComponents";
import { DataGrid } from "@mui/x-data-grid";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  reInitialStates,
  resetAllFiltersWhenPageCodeChange,
} from "@root/utils/globalFunction";
import { updateGlobalFilterKey } from "../layout";
import Image from "next/image";
import EditIconImage from "../../assets/icons/edit.svg";
import FilterIconImage from "../../assets/icons/filter.svg";
import RemoveIconImage from "../../assets/icons/remove.svg";
import SaveIconImage from "../../assets/icons/save-icon-green.svg";
import ArrowUp from "../../assets/icons/arrow-up.svg";

import IconButtonSingle from "@root/components/IconButtonSingle";
import MultipleSelectPlaceholder from "@root/components/FilterDropdown";
import Modal from "@root/components/Modal";
import { Search } from "@mui/icons-material";
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

import { Grid, Snackbar } from "@mui/material";
import ButtonItem from "@root/components/ButtonItem";
import { CustomValueEditor } from "./CustomValueEditor";
import InputField from "@root/components/InputField";
import {
  useKpiControllerKpiFilter,
  useKpiControllerFilterRead,
  useKpiControllerBrandWiseKpiListing,
  useImportBucketControllerBrandWiseImportBucketListing,
  useSheetConfigControllerMapping,
  useKpiControllerMapping,
  useGetManyBaseSectionControllerSection,
  useKpiControllerKpiMappingRemove,
} from "../../backend/backendComponents";
import FilterKpiDropdown from "@root/components/FilterKpiDropdown";
import { getFromLocalStorage } from "@root/utils/common";
// import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const SidebarWithLayout = dynamic(() => import("../layout-with-sidebar"));
const Loading = dynamic(() => import("@root/components/Loading"));
const isSuperAdmin = getFromLocalStorage("@super-admin");
const superAdmin = Boolean(isSuperAdmin); // Convert the string to a boolean
// Filter KPI Start
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

// Filter KPI End
const brandIdString = getFromLocalStorage("@brand-id");
let brand = null;
try {
  brand = brandIdString ? JSON.parse(brandIdString) : null;
} catch (error) {
  console.error("Error parsing JSON:", error);
}
const brandID = brand?.brandId;
const DataTracker: React.FC = () => {
  const [editRow, setEditRow] = useState<number | null>(null);
  const [isModalOpens, setIsModalOpens] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<{
    kpiId: string;
    kpiName: string;
    kpiCode: string;
    value: boolean;
  }>({
    kpiId: "",
    kpiName: "",
    kpiCode: "",
    value: false,
  });
  // const [searchValue, setSearchValue] = useState("");
  const [searchText, setSearchText] = React.useState("");
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const searchParams = useSearchParams();
  const pageCode = searchParams.get("page");
  const router = useRouter();
  const [selectedBucket, setSelectedBucket] = useState(""); // State to store selected bucket name
  const [selectedUnique, setSelectedUnique] = useState(""); // State to store selected bucket name
  const [values, setValues] = useState<any>([]);
  const [newSheetingDropdownList, setNewSheetingDropdownList] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectSheetChange, setSelectSheetChange] = useState<any[]>([]);
  const [dateMapping, setDateMapping] = useState<any[]>([]);
  const [selectedSheetId, setSelectedSheetId] = useState<string | null>(null);
  const [fieldOptions, setFieldOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [bucketListing, setBucketListing] = useState<any[]>([]);
  const [sheetListing, setSheetListing] = useState<
    { label: string; value: string }[]
  >([]);
  const [uniqueListing, setUniqueListing] = useState<
    { label: string; value: string }[]
  >([]);
  const [modelListing, setModelListing] = useState([]);
  const [branchListing, setBranchListing] = useState<
    { label: string; value: string }[]
  >([]);
  const [consultantListing, setConsultantListing] = useState<
    { label: string; value: string }[]
  >([]);
  const [fieldDetailArr, setFieldDetailArr] = useState<
    { label: string; value: string }[]
  >([]);
  const [deleteKpiId, setDeleteKpiId] = useState();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);

  const [isClickOnOk, setIsClickOnOk] = useState<boolean>(false);

  const [message, setMessage] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const qParamsObject = {
    p_start_date: "",
    p_end_date: "",
    p_model: "",
    p_sc: "",
    p_location: "",
    p_master_page_code: "",
    // p_master_page_code: '',
    p_user_id: _globalFilter.global_filter.p_user_id,
    p_brand_id: _globalFilter.global_filter.p_brand_id,
  };

  const { data: countResponse } =
    useImportBucketControllerBrandWiseImportBucketListing({
      pathParams: { brandId: brandID as number },
    });
  let bucketNames: { label: string; value: number }[] = [];
  if (Array.isArray(countResponse?.data)) {
    bucketNames = countResponse?.data.map((bucket) => ({
      label: bucket.name,
      value: bucket.id,
    }));
  }

  // bucket sheet config listing detail
  const { data: bucketSheetConfigList, refetch: sheetConfig } =
    useSheetConfigControllerMapping(
      {
        pathParams: {
          id: parseInt(
            selectedBucket
              ? (selectedBucket as string)
              : (editRow?.row?.v_import_bucket_id as string)
          ),
        },
      },
      {
        enabled: false,
      }
    );

  // importBucket get listing API
  const { data: importBucketData, refetch } = useKpiControllerMapping(
    {
      queryParams: {
        id: parseInt(
          selectedBucket
            ? (selectedBucket as string)
            : (editRow?.row?.v_import_bucket_id as string)
        ),
        brand_id: brandID as number,
      },
    },
    {
      enabled: false,
    }
  );

  const { data: kpiDashboardSection, refetch: dashboardSectionFatching } =
    useGetManyBaseSectionControllerSection(
      {},
      {
        enabled: false,
      }
    );

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

  //delete kpi api
  const { data: deleteApi, refetch: deleteApiKpi } =
    useKpiControllerKpiMappingRemove(
      {
        pathParams: { id: deleteKpiId as Number },
      },
      {
        enabled: false,
      }
    );

  useEffect(() => {
    reInitialStates();
    dashboardSectionFatching();
  }, []);

  useEffect(() => {
    dataTrackerRefeching();
  }, [_globalFilter]);

  const handleCloseModal = () => {
    setIsModalOpen({ kpiId: "", kpiName: "", kpiCode: "", value: false });
  };

  // Filter KPI Start

  const [query, setQuery] = useState<RuleGroupTypeIC>({
    rules: [{ rules: [{ field: "", operator: "", value: "" }] }],
  });
  const [value, setValue] = useState<number | undefined>();
  const [fieldValue, setFieldValue] = useState<any>("");
  const [rowId, setRowId] = useState("");
  const [queryValid, setQueryValid] = useState<string>("");
  const [whereValue, setWhereValue] = useState<any>("");
  const [open, setOpen] = React.useState(false);
  const [readQuery, setReadQuery] = useState(false);
  const [readData, setReadData] = useState("");

  const { mutateAsync: filterKpiUpdating /*isLoading: loadingTableColumns*/ } =
    useKpiControllerKpiFilter();

  const { data: kpiFilterKpiRead, refetch: kpiFilterKpiReadFatching } =
    useKpiControllerFilterRead(
      {
        pathParams: { id: isModalOpen?.kpiId as number },
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

  // const selectKpiListing = (kpiListing as any)?.data
  //   ?.filter(
  //     (lists: any) => lists.kpiTypeId !== 3 && lists.sheetConfigId !== null
  //   )
  //   .map((kpiList: any) => ({
  //     label: kpiList.name + " " + "(" + kpiList.code + ")",
  //     value: kpiList.id,
  //   }));
  const selectKpiListing = [
    {
      label: isModalOpen?.kpiName + " " + "(" + isModalOpen?.kpiCode + ")",
      value: isModalOpen?.kpiId,
    },
  ];

  useEffect(() => {
    if (isModalOpen?.kpiId) {
      kpiFilterKpiReadFatching();
    }
  }, [isModalOpen?.kpiId, kpiFilterKpiReadFatching]);

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
    if (isModalOpen?.kpiId && kpiFilterKpiRead) {
      let selectKpiListingFields = [];
      const validateKpiListing = (kpiListing as any)?.data?.filter(
        (lists: any) => lists.kpiTypeId !== 3 && lists.sheetConfigId !== null
      );
      const selectedKpiField = (validateKpiListing as any)?.filter(
        (lists: any) => lists.id === isModalOpen?.kpiId
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
  }, [isModalOpen?.kpiId, kpiFilterKpiRead]);

  // const handleChange = (param: any) => {
  //   setValue(param);
  // };

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
        id: isModalOpen?.kpiId,
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
        id: isModalOpen?.kpiId,
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
      setWhereValue("");
      setTimeout(() => {
        handleCloseModal();
      }, 1000);
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

  // Filter KPI End

  // started kpi logic

  const handleCloseRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };
  const handleCloseSaveModal = () => {
    setIsModalOpens(false);
  };

  const handleSelectedRow = (value: any, rowId: any, fieldName: any) => {
    setRowId(rowId);
    let array = values;
    let found = array.find((arr: any) => arr.row_id === rowId);

    if (found === undefined) {
      array.push({ row_id: rowId, [fieldName]: value.value });
    } else if (found) {
      found = { ...found, [fieldName]: value.value };
      array = [found];
    }
    setValues(array);

    if (fieldName === "v_sheet_name") {
      setSelectedSheetId(value.value);
      const dateOptionsList = newSheetingDropdownList?.filter(
        (data: any) => data?.id == value.value
      );
      setDateMapping(dateOptionsList);
    }
  };

  useEffect(() => {
    const matchingSheet = newSheetingDropdownList?.find(
      (sheet) => sheet?.id === selectedSheetId
    );

    if (matchingSheet) {
      const { tableColumns } = matchingSheet;

      // Update modelListing
      const modelColumn = tableColumns?.[0]?.modelColumn || "";
      const newModelValue = [...modelListing];
      newModelValue[rowId] = [{ label: modelColumn, value: modelColumn }];
      setModelListing(newModelValue);

      // Update branchListing
      const branchColumn = tableColumns?.[0]?.branchColumn || "";
      const newBranchValue = [...branchListing];
      newBranchValue[rowId] = [{ label: branchColumn, value: branchColumn }];
      setBranchListing(newBranchValue);

      // Update consultantListing
      const consultantColumn = tableColumns?.[0]?.consultantColumn || "";
      const newConsultantValue = [...consultantListing];
      newConsultantValue[rowId] = [
        { label: consultantColumn, value: consultantColumn },
      ];
      setConsultantListing(newConsultantValue);
    }
  }, [selectedSheetId]);

  // Call sheetConfig when selectedBucket changes
  useEffect(() => {
    if (selectedBucket !== "") {
      refetch();
      sheetConfig();
    }
  }, [selectedBucket]);

  useEffect(() => {
    const sheetList = (bucketSheetConfigList as any)?.data;
    setNewSheetingDropdownList(sheetList);
    // const matchingList = (importBucketData as any)?.data;
    // setMatchingValue(matchingList)

    if (importBucketData && bucketSheetConfigList) {
      const kpiList = (importBucketData as any)?.data;
      const sheetList = (bucketSheetConfigList as any)?.data;
      setBucketListing(kpiList || []);

      if (kpiList) {
        const kpiOptions: { label: string; value: string }[] = [];
        const sheetOptions: { label: string; value: string }[] = [];
        const uniqueOptions: { label: string; value: string }[] = [];
        kpiList.forEach((kpi: any) => {
          if (kpi.notConfigured === true) {
          } else {
            const {
              id,
              name,
              kpiSheet: { uniqueColumn },
            } = kpi;
            kpiOptions.push({ label: name, value: id === null ? "" : id });
            uniqueOptions.push({
              label: uniqueColumn,
              value: uniqueColumn === null ? "" : uniqueColumn,
            });
          }
        });
        // setkpiListing(kpiOptions);
        setSheetListing(sheetOptions);
        setUniqueListing(uniqueOptions);
      }
      if (sheetList) {
        const sheetOptions: { label: string; value: string }[] = [];
        const fieldDetailOptions: any[] = [];
        sheetList.forEach((kpi: any) => {
          const { id, sheetName } = kpi;

          sheetOptions.push({
            label: sheetName,
            value: sheetName === null ? "" : sheetName,
          });

          if (kpi.fieldDetail && Array.isArray(kpi.fieldDetail.arr)) {
            kpi.fieldDetail.arr.forEach((item: any) => {
              const fieldValue = item.name === null ? "" : item.name;
              if (
                !fieldDetailOptions.some(
                  (option) => option.value === fieldValue
                )
              ) {
                fieldDetailOptions.push({
                  value: fieldValue,
                  label: sheetName === null ? "" : sheetName,
                });
              }
            });
          }
        });
        setSheetListing(sheetOptions);
        setFieldDetailArr(fieldDetailOptions);
      }
    }
  }, [
    importBucketData,
    bucketSheetConfigList,
    selectedBucket,
    editRow?.row?.v_import_bucket_id,
  ]);

  let sheetNames: { label: string; value: number }[] = [];
  if (Array.isArray(bucketSheetConfigList?.data)) {
    sheetNames = bucketSheetConfigList?.data.map((sheet) => ({
      label: sheet.sheetName,
      value: sheet.id,
    }));
  }

  useEffect(() => {
    const newAddFieldOptions: { label: string; value: string }[] = [];

    const fieldOptionsList = newSheetingDropdownList?.filter(
      (data: any) =>
        data?.id ===
        (selectedSheetId === null ? editRow?.row?.v_sheet_id : selectedSheetId)
    );
    setSelectSheetChange(fieldOptionsList);
    if (fieldOptionsList?.length > 0) {
      const fieldDetailArray = fieldOptionsList[0]?.fieldDetail?.arr;
      if (fieldDetailArray && fieldDetailArray.length > 0) {
        fieldDetailArray.forEach((field: any) => {
          newAddFieldOptions.push({
            label: field.name,
            value: field.name,
          });
        });
        setFieldOptions(newAddFieldOptions);
      }
    }
  }, [selectedSheetId, newSheetingDropdownList, editRow?.row?.v_sheet_id]);

  useEffect(() => {
    if (
      editRow?.row?.v_import_bucket_id !== undefined &&
      editRow?.row?.v_import_bucket_id !== null
    ) {
      sheetConfig();
      refetch();
    }
  }, [editRow?.row?.v_import_bucket_id]);

  // remove kpi
  const onRemove = async (kpiId: any) => {
    setIsRemoveModalOpen(true);
    setDeleteKpiId(kpiId);
  };

  const deleteModalKpi = async () => {
    setIsClickOnOk(true);
  };
  const addModalKpi = async () => {
    saveData();
  };
  useEffect(() => {
    async function fetchData() {
      if (deleteKpiId && isClickOnOk) {
        await deleteApiKpi();
        if (deleteApi && deleteApi?.statusCode == 201) {
          setIsClickOnOk(false);
          handleCloseRemoveModal();
          dataTrackerRefeching();
          setReadData('')
          setEditRow('')
        }
      }
    }

    fetchData();
  }, [deleteKpiId, isClickOnOk, handleCloseRemoveModal]);

  const dynamicColumns = [
    {
      field: "v_kpi_name",
      headerName: "KPI",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 150,
      maxWidth: 150,
      renderCell: (params) => {
        const isSuperAdmin = superAdmin === true || superAdmin === "true";
        return (
          <Box
          className={`text-ellipsis overflow-hidden ${ params.row.v_kpi_code === "" ? 'text-darkblue font-semibold' : ''}`}
            title={
              isSuperAdmin ? params.row.v_kpi_name : params.row.v_display_column
            }
          >
            {isSuperAdmin
              ? `${params.row.v_kpi_name} ${params.row.v_kpi_code}`
              : params.row.v_kpi_code != ""
              ? params.row.v_display_column
              : params.row.v_kpi_name}
          </Box>
        );
      },
      sortable: false
    },
    {
      field: "v_bucket_name",
      headerName: "Bucket",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
      renderCell: (params: GridCellParams) => {
        const isSuperAdmin = superAdmin === true || superAdmin === "true";
        const isEditableRow =
          editRow?.v_kpiid === (params.row?.v_kpi_code =="" ?null : params.row?.v_kpiid)

        if (isSuperAdmin && isEditableRow) {
          return (
            <MultipleSelectPlaceholder
              className="dropdownComponent"
              dropdownTitle="Select Bucket Name"
              enableDeselect={true}
              options={bucketNames}
              fieldName="bucketName"
              defaultValue={params.row.v_bucket_name}
              handleChange={handleBucketChange}
              rowId={params.row.v_kpiid}
            />
          );
        } else {
          return (
            <Box
              className="text-ellipsis overflow-hidden"
              title={params.row.v_bucket_name}
            >
              {
               params.row.v_bucket_name
                }
            </Box>
          );
        }
      },
      sortable: false
    },
    {
      field: "v_sheet_name",
      headerName: "Sheet",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 190,
      renderCell: (params: GridCellParams) => {
        const isSuperAdmin = superAdmin === true || superAdmin === "true";
        const isEditableRow = editRow?.v_kpiid === (params.row?.v_kpi_code =="" ?null : params.row?.v_kpiid)
        if (isSuperAdmin && isEditableRow) {
          return (
            // ) : editRow?.v_kpiid === params.row.v_kpiid ? (
            <MultipleSelectPlaceholder
              className="dropdownComponent"
              dropdownTitle="Select Sheet Name"
              enableDeselect={true}
              options={sheetNames}
              defaultValue={
                values?.find((item) => item?.v_sheet_id === selectedSheetId)
                  ?.selectSheetChange?.[0]?.sheetName ||
                readData[0]?.label === params?.row.v_bucket_name ||
                readData === ""
                  ? params?.row.v_sheet_name
                  : ""
              }
              handleSelectedRow={handleSelectedRow}
              rowId={params.row.v_kpiid}
              fieldName="v_sheet_name"
            />
          );
        } else {
          return (
            <Box
              className=" text-ellipsis  overflow-hidden"
              title={params.row.v_sheet_name}
            >
              {params.row.v_sheet_name}
            </Box>
          );
        }
      },
      sortable: false
    },
    {
      field: "v_unique_value",
      headerName: "Unique",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 180,
      renderCell: (params: GridCellParams) => {
        const isSuperAdmin = superAdmin === true || superAdmin === "true";
        const isEditableRow = editRow?.v_kpiid === (params.row?.v_kpi_code =="" ?null : params.row?.v_kpiid)
 
        if (isSuperAdmin && isEditableRow) {
          return (
            // ) : editRow?.v_kpiid === params.row.v_kpiid ? (
            <MultipleSelectPlaceholder
              className="dropdownComponent"
              dropdownTitle="SelectUnique Column"
              enableDeselect={true}
              options={fieldOptions}
              handleSelectedRow={handleSelectedRow}
              rowId={params.row.v_kpiid}
              fieldName="v_unique_value"
              defaultValue={
                values.find((item) => item.row_id === params.row.v_kpiid)
                  ? values.find((item) => item.row_id === params.row.v_kpiid)
                      .v_unique_value
                  : readData[0]?.label === params.row.v_bucket_name ||
                    readData == ""
                  ? params.row.v_unique_column
                  : ""
              }
            />
          );
        } else {
          return (
            <Box
              className=" text-ellipsis  overflow-hidden"
              title={params.row.v_unique_column}
            >
              {params.row.v_unique_column}
            </Box>
          );
        }
      },
      sortable: false
    },
    {
      field: "v_model_column",
      headerName: "Model",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 180,
      renderCell: (params: GridCellParams) => {
        const isSuperAdmin = superAdmin === true || superAdmin === "true";
        const isEditableRow = editRow?.v_kpiid === (params.row?.v_kpi_code =="" ?null : params.row?.v_kpiid)

        if (isSuperAdmin && isEditableRow) {
          return (
            // ) : editRow?.v_kpiid === params.row.v_kpiid ? (
            <MultipleSelectPlaceholder
              className="dropdownComponent"
              dropdownTitle="Select Model Column"
              enableDeselect={true}
              options={modelListing}
              handleSelectedRow={handleSelectedRow}
              rowId={params.row.v_kpiid}
              fieldName="v_model_column"
              defaultValue={
                modelListing?.[params?.row?.v_kpiid]?.[0]?.value == ""
                  ? modelListing?.[params?.row?.v_kpiid]?.[0]?.value
                  : modelListing?.[params?.row?.v_kpiid]?.[0]?.value
                  ? modelListing?.[params?.row?.v_kpiid]?.[0]?.value
                  : params.row.v_model_column
              }
              disabled={true}
            />
          );
        } else {
          return (
            <Box
              className=" text-ellipsis  overflow-hidden"
              title={params.row.v_model_column}
            >
              {params.row.v_model_column}
            </Box>
          );
        }
      },
      sortable: false
    },
    {
      field: "v_branch_column",
      headerName: "Branch",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
      renderCell: (params: GridCellParams) => {
        const isSuperAdmin = superAdmin === true || superAdmin === "true";
        const isEditableRow = editRow?.v_kpiid === (params.row?.v_kpi_code =="" ?null : params.row?.v_kpiid)

        if (isSuperAdmin && isEditableRow) {
          return (
            // ) : editRow?.v_kpiid === params.row.v_kpiid ? (
            <MultipleSelectPlaceholder
              className="dropdownComponent"
              dropdownTitle="Select Branch Column"
              enableDeselect={true}
              options={branchListing}
              handleSelectedRow={handleSelectedRow}
              rowId={params.row.v_kpiid}
              fieldName="v_branch_column"
              defaultValue={
                branchListing?.[params?.row?.v_kpiid]?.[0]?.value == ""
                  ? branchListing?.[params?.row?.v_kpiid]?.[0]?.value
                  : branchListing?.[params?.row?.v_kpiid]?.[0]?.value
                  ? branchListing?.[params?.row?.v_kpiid]?.[0]?.value
                  : params.row.v_branch_column
              }
              disabled={true}
            />
          );
        } else {
          return (
            <Box
              className=" text-ellipsis  overflow-hidden"
              title={params.row.v_branch_column}
            >
              {params.row.v_branch_column}
            </Box>
          );
        }
      },
      sortable: false
    },
    {
      field: "v_sales_consultant_value",
      headerName: "SC/SA",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 180,
      renderCell: (params: GridCellParams) => {
        const isSuperAdmin = superAdmin === true || superAdmin === "true";
        const isEditableRow = editRow?.v_kpiid === (params.row?.v_kpi_code =="" ?null : params.row?.v_kpiid)

        if (isSuperAdmin && isEditableRow) {
          return (
            // ) : editRow?.v_kpiid === params.row.v_kpiid ? (
            <MultipleSelectPlaceholder
              className="dropdownComponent"
              dropdownTitle="Select Consultant Column"
              enableDeselect={true}
              options={consultantListing}
              handleSelectedRow={handleSelectedRow}
              rowId={params.row.v_kpiid}
              fieldName="v_sales_consultant_value"
              defaultValue={
                consultantListing?.[params?.row?.v_kpiid]?.[0]?.value == ""
                  ? consultantListing?.[params?.row?.v_kpiid]?.[0]?.value
                  : consultantListing?.[params?.row?.v_kpiid]?.[0]?.value
                  ? consultantListing?.[params?.row?.v_kpiid]?.[0]?.value
                  : params.row.v_sales_consultant_column
              }
              disabled={true}
            />
          );
        } else {
          return (
            <Box
              className=" text-ellipsis  overflow-hidden"
              title={params.row.v_sales_consultant_column}
            >
              {params.row.v_sales_consultant_column}
            </Box>
          );
        }
      },
      sortable: false
    },
    {
      field: "v_date_column",
      headerName: "Date",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 150,
      renderCell: (params: GridCellParams) => {
        const isSuperAdmin = superAdmin === true || superAdmin === "true";
        const isEditableRow = editRow?.v_kpiid === (params.row?.v_kpi_code =="" ?null : params.row?.v_kpiid)

        if (isSuperAdmin && isEditableRow) {
          return (
            // ) : editRow?.v_kpiid === params.row.v_kpiid ? (
            <MultipleSelectPlaceholder
              className="dropdownComponent"
              dropdownTitle="Select Date Column"
              options={
                dateMapping.length > 0
                  ? dateMapping?.[0]?.tableColumns[0]?.dateColumn?.map(
                      (date: any) => ({
                        label: date,
                        value: date,
                      })
                    )
                  : selectSheetChange?.[0]?.tableColumns[0]?.dateColumn?.map(
                      (date: any) => ({
                        label: date,
                        value: date,
                      })
                    )
              }
              handleSelectedRow={handleSelectedRow}
              rowId={params.row.v_kpiid}
              fieldName="v_date_column"
              defaultValue={
                values.find((item) => item.row_id === params.row.v_kpiid)
                  ? values.find((item) => item.row_id === params.row.v_kpiid)
                      .v_date_column
                  : readData[0]?.label === params.row.v_date_column ||
                    readData == ""
                  ? params.row.v_date_column
                  : ""
              }
            />
          );
        } else {
          return (
            <Box
              className=" text-ellipsis  overflow-hidden"
              title={params.row.v_date_column}
            >
              {params.row.v_date_column}
            </Box>
          );
        }
      },
      sortable: false
    },
    {
      field: "v_value_column_1",
      headerName: "Value 1",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 140,
      renderCell: (params: GridCellParams) => {
        if (
          params.row.v_no_of_input_req === 1 ||
          params.row.v_no_of_input_req === 2
        ) {
          const isSuperAdmin = superAdmin === true || superAdmin === "true";
          const isEditableRow = editRow?.v_kpiid === (params.row?.v_kpi_code =="" ?null : params.row?.v_kpiid)

          if (isSuperAdmin && isEditableRow) {
            return (
              // ) : editRow?.v_kpiid === params.row.v_kpiid ? (
              <MultipleSelectPlaceholder
                className="dropdownComponent"
                dropdownTitle="Select Value Column 1"
                options={fieldOptions}
                handleSelectedRow={handleSelectedRow}
                rowId={params.row.v_kpiid}
                fieldName="v_value_column_1"
                defaultValue={
                  values.find((item) => item.row_id === params.row.v_kpiid)
                    ? values.find((item) => item.row_id === params.row.v_kpiid)
                        .v_value_column_1
                    : readData[0]?.label === params.row.v_value_column_1 ||
                      readData == ""
                    ? params.row.v_value_column_1
                    : ""
                }
              />
            );
          } else {
            return (
              <Box
                className=" text-ellipsis  overflow-hidden"
                title={params.row.v_value_column_1}
              >
                {params.row.v_value_column_1}
              </Box>
            );
          }
        } else {
          return null;
        }
      },
      sortable: false
    },
    {
      field: "v_value_column_2",
      headerName: "Value 2",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 140,
      renderCell: (params: GridCellParams) => {
        if (params.row.v_no_of_input_req === 2) {
          const isSuperAdmin = superAdmin === true || superAdmin === "true";
          const isEditableRow = editRow?.v_kpiid === (params.row?.v_kpi_code =="" ?null : params.row?.v_kpiid)

          if (isSuperAdmin && isEditableRow) {
            return (
              // ) : editRow?.v_kpiid === params.row.v_kpiid ? (
              <MultipleSelectPlaceholder
                className="dropdownComponent"
                dropdownTitle="Select Value Column 2"
                options={fieldOptions}
                handleSelectedRow={handleSelectedRow}
                rowId={params.row.v_kpiid}
                fieldName="v_value_column_2"
                defaultValue={
                  values.find((item) => item.row_id === params.row.v_kpiid)
                    ? values.find((item) => item.row_id === params.row.v_kpiid)
                        .v_value_column_2
                    : readData[0]?.label === params.row.v_value_column_2 ||
                      readData == ""
                    ? params.row.v_value_column_2
                    : ""
                }
              />
            );
          }
          // else if (params.row.v_value_column_2 > 0 ) {
          // return (
          //   <Box className="data-problem">
          //   {<WarningAmberRoundedIcon />} {params.row.v_value_column_2}
          //   {params.row.v_value_column_2 > 0 && (
          //     <Box>{`(${params.row.v_value_column_2} Missing)`}</Box>
          //   )}
          // </Box>
          // )
          // }
          else {
            return (
              <Box
                className=" text-ellipsis  overflow-hidden"
                title={params.row.v_value_column_2}
              >
                {params.row.v_value_column_2}
              </Box>
            );
          }
        } else {
          return null;
        }
      },
      sortable: false
    },
  ];
  superAdmin
    ? dynamicColumns.push({
        field: "action",
        headerName: "Action",
        flex: 1,
        cellClassName: "py-3.5 px-2.5 centered-cell",
        headerClassName: "py-3 px-2.5 text-white centered-cell",
        minWidth: 122,
        maxWidth: 122,
        renderCell: (params) => (
          <TableCell
            className={clsx("custom-cell p-0  border-none", {
              danger: params.row.v_value_column_2,
            })}
            align="center"
          >      
          {params.row.v_kpi_code !== "" && 
              <Box className="filter-icons-action flex items-center justify-center">
                {editRow?.v_kpiid === params.row.v_kpiid ? (
                  <IconButtonSingle
                    onClick={() => setEditRow(null)} // Cancel edit
                    className="opacity-0 pointer-events-none"
                    iconImage={
                      <Image
                        src={EditIconImage}
                        height={20}
                        width={20}
                        alt="edit icon"
                      />
                    }
                  />
                ) : (
                  <div>

                    <IconButtonSingle
                      // onClick={() => setEditRow(params.row.v_kpiid)}
                      onClick={() =>
                        setEditRow({
                          row: params.row,
                          v_kpiid: params.row.v_kpiid,
                        })
                      }
                      iconImage={
                        <Image
                          src={EditIconImage}
                          height={20}
                          width={20}
                          alt="edit icon"
                        />
                      }
                    />
                    {/* )} */}
                  </div>
                )}

                {editRow?.v_kpiid === params.row.v_kpiid ? (
                  <IconButtonSingle
                    onClick={() => setIsModalOpens(!isModalOpens)}
                    iconImage={
                      <Image
                        src={SaveIconImage}
                        height={20}
                        width={20}
                        alt="edit icon"
                      />
                    }
                  />
                ) : (
                  <IconButtonSingle
                    onClick={() =>
                      setIsModalOpen({
                        kpiId: params.row.v_kpiid,
                        kpiName: params.row.v_kpi_name,
                        kpiCode: params.row.v_kpi_code,
                        value: true,
                      })
                    }
                    iconImage={
                      <Image
                        src={FilterIconImage}
                        height={20}
                        width={20}
                        alt="Filter kpi icon"
                      />
                    }
                  />
                )}

                <IconButtonSingle
                  onClick={() => onRemove(params.row.v_kpiid)}
                  iconImage={
                    <Image
                      src={RemoveIconImage}
                      height={20}
                      width={20}
                      alt="Remove icon"
                    />
                  }
                />
              </Box>
          } 
              
          </TableCell>
        ),
        sortable: false
      })
    : [];

  const { mutateAsync } = useKpiControllerUpdateMappingKpi();

  const saveData = async () => {
    const data = values[0];

    const response: any = await mutateAsync({
      body: [
        {
          id: data?.hasOwnProperty("row_id")
            ? data?.row_id
            : editRow?.row?.v_kpiid,
          sheet_id: data?.hasOwnProperty("v_sheet_name")
            // ? data?.v_sheet_name
            // : editRow?.row?.v_sheet_id,
            ? data.v_sheet_name !== undefined
              ? data.v_sheet_name
              : null
            : editRow?.row?.v_sheet_id !== undefined
            ? editRow?.row?.v_sheet_id
            : null,
          unique_column: data?.hasOwnProperty("v_unique_value")
            ? data.v_unique_value !== undefined
              ? data.v_unique_value
              : null
            : editRow?.row?.v_unique_column !== undefined
            ? editRow?.row?.v_unique_column
            : null,
          date_column: data?.hasOwnProperty("v_date_column")
            ? data.v_date_column !== undefined
              ? data.v_date_column
              : null
            : editRow?.row?.v_date_column !== undefined
            ? editRow?.row?.v_date_column
            : null,

          branch_column:
            branchListing?.[data?.row_id]?.[0]?.value ||
            branchListing?.[data?.row_id]?.[0]?.value == ""
              ? branchListing?.[data?.row_id]?.[0]?.value == ""
                ? null
                : branchListing?.[data?.row_id]?.[0]?.value
              : editRow?.row?.v_branch_column,

          model_column:
            modelListing?.[data?.row_id]?.[0]?.value ||
            modelListing?.[data?.row_id]?.[0]?.value == ""
              ? modelListing?.[data?.row_id]?.[0]?.value == ""
                ? null
                : modelListing?.[data?.row_id]?.[0]?.value
              : editRow?.row?.v_model_column,

          consultant_column:
            consultantListing?.[data?.row_id]?.[0]?.value ||
            consultantListing?.[data?.row_id]?.[0]?.value == ""
              ? consultantListing?.[data?.row_id]?.[0]?.value == ""
                ? null
                : consultantListing?.[data?.row_id]?.[0]?.value
              : editRow?.row?.v_sales_consultant_column,

          // branchListing?.[data?.row_id]?.[0]?.value || editRow?.row?.v_branch_column || null,
          // modelListing?.[data?.row_id]?.[0]?.value || editRow?.row?.v_model_column || null,
          // consultantListing?.[data?.row_id]?.[0]?.value || editRow?.row?.v_sales_consultant_column || null,

          value_column_1: data?.hasOwnProperty("v_value_column_1")
            ? data?.v_value_column_1 !== undefined
              ? data.v_value_column_1
              : null
            : editRow?.row?.v_value_column_1 !== undefined
            ? editRow?.row?.v_value_column_1
            : null,
          value_column_2: data?.hasOwnProperty("v_value_column_2")
            ? data?.v_value_column_2 !== undefined
              ? data.v_value_column_2
              : null
            : editRow?.row?.v_value_column_2 !== undefined
            ? editRow?.row?.v_value_column_2
            : null,
          where_content: data?.hasOwnProperty("v_sheet_name")
            ? editRow?.row.v_sheet_id === data?.v_sheet_name
              ? editRow?.row.v_where_content
              : null
            : editRow?.row.v_where_content,
          where_content_json: data?.hasOwnProperty("v_sheet_name")
            ? editRow?.row.v_sheet_id === data?.v_sheet_name
              ? editRow?.row.v_where_content_josn
              : null
            : editRow?.row.v_where_content_josn,
          value_column_3: null,
          value_column_4: null,
          value_column_5: null,
        },
      ],
    });
    setMessage(response);
    handleCloseAddModal();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    dataTrackerRefeching()
    setReadData('')
    setValues([])
    router.push(`/data-tracker`)
    setEditRow(null);
  };
  const handleCloseAddModal = () => {
    setIsModalOpens(false);
  };

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const filteredRows = dataTrackerData?.data?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Handler for the onChange event of the bucket selection
  const handleBucketChange = (value: any, rowId: any, fieldName: any) => {
    const name = bucketNames.filter((unique) => unique.value === value?.value);
    setReadData(name);
    const selectedBucketName = value?.value;
    setSelectedBucket(selectedBucketName);
    if (fieldName === undefined) {
      setValues([]);
      setSelectedSheetId(null);
      setSelectSheetChange([]);
      setBranchListing([]);
      setConsultantListing([]);
      setModelListing([]);
    }
  };

  const distinctSectionName = filteredRows && [
    ...new Set(filteredRows?.map((obj: any) => obj.v_section_id)),
  ];
  const newData: any = [];

  for (let i = 0; i < distinctSectionName?.length; i++) {
    const sectionId = distinctSectionName[i];
    const filteredKpiItems = kpiDashboardSection?.filter(
      (kpiItem: any) => kpiItem.id === sectionId
    );

    filteredKpiItems?.forEach((kpiItem: any) => {
      const response = {
        id: kpiItem.id,
        v_kpi_name: kpiItem.name,
        v_kpi_code: "",
      };
      newData.push(response);
      const matchingRows = filteredRows.filter(
        (row: any) => row.v_section_id === sectionId
      );
      newData.push(...matchingRows);
    });
  }

  return (
    <SidebarWithLayout>
      <Loading className={`${loading ? "" : "hide"} `} />
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative data-tracker-v1 mui-datatable-main">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 data-tracker-head">
          <PanelHeading
            firstHeading={"Data Tracker"}
            // secondHeading={_globalFilter.formatted_date}

            // filterOption={true}
          />
          <Box className={`search-data-tracker`}>
            <TextField
              type="search"
              value={searchText}
              // onChange={(e) => setSearchValue(e.target.value)}
              onChange={handleSearchTextChange}
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="medium" className="mb-[0px]" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box className="dashboard-sales-items">
            <Box className="MuiDataGrid-resizableContainer table-main-wrapper new-data-track">
              <DataGrid
                columns={dynamicColumns}
                getRowHeight={() => "auto"}
                rows={
                  newData?.map((item, index) => ({
                    id: index,
                    v_kpiid: item.v_kpiid,
                    v_kpi_name: item.v_kpi_name,
                    v_kpi_code: item.v_kpi_code,
                    v_sheet_id: item.v_sheet_id,
                    v_bucket_name: item.v_bucket_name,
                    v_sheet_name: item.v_sheet_name,
                    v_unique_value: item.v_unique_value,
                    v_model_value: item.v_model_value,
                    v_branch_value: item.v_branch_value,
                    v_sales_consultant_value: item.v_sales_consultant_value,
                    v_date_value: item.v_date_value,
                    v_unique_column: item.v_unique_column,
                    v_model_column: item.v_model_column,
                    v_branch_column: item.v_branch_column,
                    v_sales_consultant_column: item.v_sales_consultant_column,
                    v_date_column: item.v_date_column,
                    v_master_page_id: item.v_master_page_id,
                    v_master_page_name: item.v_master_page_name,
                    v_section_id: item.v_section_id,
                    v_order_by: item.v_order_by,
                    v_value_column_1: item.v_value_column_1,
                    v_value_column_2: item.v_value_column_2,
                    v_value_column_result_1: item.v_value_column_result_1,
                    v_value_column_result_2: item.v_value_column_result_2,
                    v_no_of_input_req: item.v_no_of_input_req,
                    v_where_content: item.v_where_content,
                    v_where_content_josn: item.v_where_content_json,
                    v_import_bucket_id: item.v_import_bucket_id,
                    v_display_column: item.v_display_column,
                  })) || []
                }
                checkboxSelection={false}
                pagination
                // sortingMode="server"
                // filterMode="server"
                paginationMode="server"
                disableRowSelectionOnClick
                hideFooterPagination={true}
                disableColumnMenu 
              />
            </Box>

            <Modal
              isOpen={isModalOpen.value}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              modalextraclass=" text-center data-tracker-modal"
              modaltitle="Filter KPI"
            >
              <Box>
                <Grid container spacing={2} className="mt-4">
                  {queryValid === "notValid" && (
                    <Grid item xs={12}>
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Snackbar
                          open={open}
                          autoHideDuration={6000}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <Alert severity="error">
                            Query is not valid. Some fields, operators, or
                            values are empty.
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
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <Alert severity="success">
                            KPI&apos;s Are Mapped Successfully
                          </Alert>
                        </Snackbar>
                      </Stack>
                    </Grid>
                  )}
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <FilterKpiDropdown
                      className="dropdownComponent rounded-lg bg-white text-blacklight h-12 p-0 shadow-[0_2px_24px_0_rgba(0,0,0,.1)]"
                      // dropdownTitle="Select Kpi"
                      dropdownTitle={selectKpiListing?.[0]?.label == "" ? 'Select KPI' : selectKpiListing?.[0]?.label}
                      // options={
                      //   selectKpiListing &&
                      //   selectKpiListing.sort((a: any, b: any) =>
                      //     a.label.localeCompare(b.label, "en", {
                      //       sensitivity: "base",
                      //     })
                      //   )
                      // }
                      options={selectKpiListing}
                      value={selectKpiListing?.[0]?.label}
                      // onChange={handleChange}
                      // sendChildToParent={handleChange}
                    />
                  </Grid>
                </Grid>

                {isModalOpen?.kpiId ? (
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
                        className="outlineBtn mx-1"
                        ButtonTitle="Cancel"
                        type="button"
                        onClick={handleCancelOnClick}
                      />
                      <ButtonItem
                        className="containBtn mx-1"
                        ButtonTitle="Save"
                        type="button"
                        onClick={handleSaveOnClick}
                      />
                      <ButtonItem
                        className="outlineBtn mx-1"
                        ButtonTitle="Clear Filters"
                        type="button"
                        onClick={handleClearOnClick}
                      />
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Modal>
            <Modal
              isOpen={isRemoveModalOpen}
              onClose={handleCloseRemoveModal}
              modalextraclass="modal-small kpi-modal"
            >
              <PanelHeading
                firstHeading="Are You sure to Remove the KPI"
                className="title-pop-kpi"
              />
              <Button onClick={deleteModalKpi} variant="contained">
                Ok
              </Button>
              <Button onClick={handleCloseRemoveModal} variant="contained">
                cancel
              </Button>
            </Modal>

            <Modal
              isOpen={isModalOpens}
              onClose={handleCloseSaveModal}
              modalextraclass="modal-small kpi-modal"
            >
              <PanelHeading
                firstHeading="Do You Really Want to Save the KPI"
                className="title-pop-kpi"
              />
              <Button onClick={addModalKpi} variant="contained">
                Ok
              </Button>
              <Button onClick={handleCloseSaveModal} variant="contained">
                cancel
              </Button>
            </Modal>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
};

export default DataTracker;
