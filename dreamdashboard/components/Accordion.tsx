import React, { useState, SyntheticEvent, useEffect, use, useRef } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionTable from "./AccordionTable";
import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MultipleSelectPlaceholder from "@root/components/FilterDropdown";
import {
  useKpiControllerMapping,
  useSheetConfigControllerMapping,
  useKpiControllerUpdateMappingKpi,
  useKpiControllerKpiMappingRemove,
} from "../backend/backendComponents";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { getFromLocalStorage } from "@root/utils";
import {  useRouter,useSearchParams } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import Router from 'next/router'
// import { useRouter } from "next/router";
import Modal from '../components/Modal'
import { PanelHeading } from "./PanelHeading";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `.0625rem solid ${theme.palette.divider}`,

  "&:not(:last-child)": {
    borderBottom: 0,
  },

  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",

  flexDirection: "row-reverse",

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },

  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),

  borderTop: ".0625rem solid rgba(0, 0, 0, .125)",
}));

interface AccordionsProps {
  name: string;
  bucketId: any;
}

interface FieldOption {
  id: string;
  value: string;
  label: string;
}

interface Kpi {
  id: string;
  kpiSheet: { [key: string]: string };
  sheetConfig: { id: string };
  name: string;
}

const Accordions: React.FC<AccordionsProps> = ({ name, bucketId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const searchParams = new URLSearchParams(router.asPath?.split("?")[1]);
  const importBucketId = searchParams.get("bucketId");
  const [expanded, setExpanded] = useState<string | false>(false);
  const [bucketListing, setBucketListing] = useState<any[]>([]);
  const [kpiListing, setkpiListing] = useState<
    { label: string; value: string }[]
  >([]);
  const [sheetListing, setSheetListing] = useState<
    { label: string; value: string }[]
  >([]);
  const [uniqueListing, setUniqueListing] = useState<{ label: string; value: string }[]>([]);
  const [modelListing, setModelListing] = useState<{ label: string; value: string }[]>([]);
  const [fieldDetailArr, setFieldDetailArr] = useState<
    { label: string; value: string }[]
  >([]);

  const [selectedSheet, setSelectedSheet] = useState("");
  const [values, setValues] = useState<any>([]);
  const [newKpiListing, setNewkpiListing] = useState<
    { label: string; value: string }[]
  >([]);
  const [newSheetConfigListing, setNewSheetConfigListing] = useState<
    { label: string; value: string }[]
  >([]);
  const [newFieldSheetConfigListing, setNewFieldSheetConfigListing] = useState<any[]
  >([]);
  const [showNewKpi, setShowNewKpi] = useState(false);
  const [fieldOptions, setFieldOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [newSheetingDropdownList, setNewSheetingDropdownList] = useState<
    { label: string; value: string }[]
  >([]);
  const [deleteKpi, setDeleteKpi] = useState("");
  const [deletedKpi, setDeletedKpi] = useState("");
  const [kpiId, setKpiId] = useState(null);
  const [selectedSheetId, setSelectedSheetId] = useState<string | null>(null);
  const [dropdownTitle, setDropdownTitle] = useState(false);
  const [sheetsValue, setSheetsValue] = useState<any>([]);
  const [modelValue, setModelValue] = useState("");
  const [selectSheetChange, setSelectSheetChange] = useState<any[]>([]);
  const [matchingValue, setMatchingValue] = useState<any[]>([]);
  const [collectedData, setCollectedData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const [showErrorModal, setshowErrorModal] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [deleteKpiId, setDeleteKpiId] = useState();
  const [sheetDataPopulate, setSheetDataPopulate] = useState<any>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [sheetMapping, setSheetMapping] = useState<any[]>([]);
  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [rowiddata, setrowiddata] = useState<any[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const brandIdString = getFromLocalStorage("@brand-id");
  let brand = null;
  try {
    brand = brandIdString ? JSON.parse(brandIdString) : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  const id = brand?.brandId;

  // importBucket get listing API
  const { data: importBucketData, refetch } = useKpiControllerMapping(
    {
      queryParams: { id: parseInt(bucketId as string), brand_id: id as number },
    },
    {
      enabled: false,
    }
  );

  // bucket sheet config listing detail
  const { data: bucketSheetConfigList, refetch: sheetConfig } =
    useSheetConfigControllerMapping(
      { pathParams: { id: parseInt(bucketId as string) } },
      {
        enabled: false,
      }
    );

  useEffect(() => {
    refetch();
    sheetConfig();
  }, []);

  useEffect(() => {
    const sheetList = (bucketSheetConfigList as any)?.data;
    setNewSheetingDropdownList(sheetList);
    const matchingList = (importBucketData as any)?.data;
    setMatchingValue(matchingList)

    if (importBucketData && bucketSheetConfigList) {
      const kpiList = (importBucketData as any)?.data;
      const sheetList = (bucketSheetConfigList as any)?.data;
      setBucketListing(kpiList || []);

      if (kpiList) {
        const kpiOptions: { label: string; value: string }[] = [];
        const sheetOptions: { label: string; value: string }[] = [];
        const uniqueOptions: { label: string; value: string }[] = [];
        const modelOptions: { label: string; value: string }[] = [];
        kpiList.forEach((kpi: any) => {
          if (kpi.notConfigured === true) {
          } else {
            const {
              id,
              name,
              kpiSheet: { uniqueColumn, modelColumn },
            } = kpi;
            kpiOptions.push({ label: name, value: id === null ? "null" : id });
            uniqueOptions.push({
              label: uniqueColumn,
              value: uniqueColumn === null ? "null" : uniqueColumn,
            });
            modelOptions.push({
              label: modelColumn,
              value: modelColumn === null ? "null" : modelColumn,
            });
          }
        });
        setkpiListing(kpiOptions);
        setSheetListing(sheetOptions);
        setUniqueListing(uniqueOptions);
        setModelListing(modelOptions)
      }
      if (sheetList) {
        const sheetOptions: { label: string; value: string }[] = [];
        const fieldDetailOptions: any[] = [];
        sheetList.forEach((kpi: any) => {
          const { id, sheetName } = kpi;

          sheetOptions.push({
            label: sheetName,
            value: id === null ? "null" : id,
          });

          if (kpi.fieldDetail && Array.isArray(kpi.fieldDetail.arr)) {
            kpi.fieldDetail.arr.forEach((item: any) => {
              const fieldValue = item.name === null ? "null" : item.name;
              if (
                !fieldDetailOptions.some(
                  (option) => option.value === fieldValue
                )
              ) {
                fieldDetailOptions.push({
                  value: fieldValue,
                  label: id === null ? "null" : id,
                });
              }
            });
          }
        });
        setSheetListing(sheetOptions);
        setFieldDetailArr(fieldDetailOptions);
      
      }
    }
  }, [importBucketData, bucketSheetConfigList, bucketId]);

  useEffect(() =>{

    const kpiUniqueId = bucketListing.filter((kpi: any) => kpi && kpi.notConfigured === undefined);
      const matchedOptionsForEachKpiId = bucketListing.map((kpi: Kpi) => {
        const matchedOptions = kpiUniqueId.filter((fieldOption: FieldOption) => fieldOption.id === kpi.id);
      
        const result: any = [];    
      
        matchedOptions.forEach((matchedOption) => {
          const kpiUniqueColumn = matchedOption?.kpiSheet?.uniqueColumn;
          const kpiModelColumn = matchedOption?.kpiSheet?.modelColumn;
          const kpiBranchColumn = matchedOption?.kpiSheet?.branchColumn;
          const kpiConsultantColumn = matchedOption?.kpiSheet?.consultantColumn;
          const kpiDateColumn = matchedOption?.kpiSheet?.dateColumn;
          const kpiValue1Column = matchedOption?.kpiSheet?.valueColumn1;
          const kpiValue2Column = matchedOption?.kpiSheet?.valueColumn2;
          const sheetFieldDetailName = matchedOption?.sheetConfig?.fieldDetail?.arr;

          const matchedData = {
            id: kpi.id,
            uniqueColumn: null,
            modelColumn: null,
            branchColumn: null,
            consultantColumn: null,
            dateColumn: null,
            valueColumn1: null,
            valueColumn2: null,
          };
    
          matchedData.uniqueColumn = sheetFieldDetailName?.find((field: any) => field.name === kpiUniqueColumn)?.name;
          matchedData.modelColumn = sheetFieldDetailName?.find((field: any) => field.name === kpiModelColumn)?.name;
          matchedData.branchColumn = sheetFieldDetailName?.find((field: any) => field.name === kpiBranchColumn)?.name;
          matchedData.consultantColumn = sheetFieldDetailName?.find((field: any) => field.name === kpiConsultantColumn)?.name;
          matchedData.dateColumn = sheetFieldDetailName?.find((field: any) => field.name === kpiDateColumn)?.name;
          matchedData.valueColumn1 = sheetFieldDetailName?.find((field: any) => field.name === kpiValue1Column)?.name;
          matchedData.valueColumn2 = sheetFieldDetailName?.find((field: any) => field.name === kpiValue2Column)?.name;
          if (
            matchedData.uniqueColumn ||
            matchedData.modelColumn ||
            matchedData.branchColumn ||
            matchedData.consultantColumn ||
            matchedData.dateColumn ||
            matchedData.valueColumn1 ||
            matchedData.valueColumn2
          ) {
            result.push(matchedData);
          }
        }); 
        return result;
      });

      setCollectedData(matchedOptionsForEachKpiId);

  },[bucketListing, bucketId])


  const handleChange =
    (panel: string) =>
    (
      event: SyntheticEvent,

      newExpanded: boolean
    ) => {
      
      setExpanded(newExpanded ? panel : 'false');
    };

    useEffect(() => {
      if (importBucketId == bucketId) {
        setExpanded(bucketId);
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setExpanded(false);
      }
    }, [bucketId]);

    const handleOpenModal = (message: any) => {
      setModalMessage(message);
      setIsModalOpen(true);
  
    };

    const handleCloseModal = () => {
      setModalMessage('');
      setIsModalOpen(false);
      setshowErrorModal(false);
    };

    const handleCloseRemoveModal = () => {
      // setModalMessage('');
      setIsRemoveModalOpen(false);
      // setshowErrorModal(false);
    };



  const { mutateAsync } = useKpiControllerUpdateMappingKpi();

  const { data: deleteApi, refetch: deleteApiKpi } =
    useKpiControllerKpiMappingRemove(
      {
        pathParams: { id: deleteKpi as Number },
      },
      {
        enabled: false,
      }
    );

  const onSubmit = async (index: any) => {
   
    // const message = response?.message
    setIsModalOpen(true)
    // navigateToMapKpi(bucketId);
  };

  const addModalKpi = async () => {
    //  const selected = dynamicData[index];

    const data = values[0];
    const isNewKpi = data?.hasOwnProperty("kpi");

    const response: any  = await mutateAsync({
      body: [
        {
          
          id: data?.kpi === undefined ? data?.row_id : data?.kpi,
          sheet_id: data?.sheet,
          unique_column : data?.hasOwnProperty("unique") ? (data?.unique !== undefined ? data?.unique : null ): sheetDataPopulate?.kpiSheet?.uniqueColumn,
          date_column : data?.hasOwnProperty("date1") ? (data?.date1 !== undefined ? data?.date1 : null ): sheetDataPopulate?.kpiSheet?.dateColumn,
          branch_column : data?.hasOwnProperty("branch") ? (data?.branch !== undefined ? data?.branch : null ): sheetMapping[0]?.tableColumns[0]?.branchColumn ? sheetMapping[0]?.tableColumns[0]?.branchColumn : sheetDataPopulate?.kpiSheet?.branchColumn,
          consultant_column : data?.hasOwnProperty("consultant") ? (data?.consultant !== undefined ? data?.consultant : null ):sheetMapping[0]?.tableColumns[0]?.consultantColumn ? sheetMapping[0]?.tableColumns[0]?.consultantColumn : sheetDataPopulate?.kpiSheet?.consultantColumn,
          model_column : data?.hasOwnProperty("model") ? (data?.model !== undefined ? data?.model : null ): sheetMapping[0]?.tableColumns[0]?.modelColumn ? sheetMapping[0]?.tableColumns[0]?.modelColumn : sheetDataPopulate?.kpiSheet?.modelColumn,
          value_column_1: data?.value1,
          value_column_2: data?.value2,
          // value_column_1 : data?.hasOwnProperty("value1") ? (data?.value1 !== undefined ? data?.value1 : null ): sheetDataPopulate?.kpiSheet?.valueColumn1 ? sheetDataPopulate?.kpiSheet?.valueColumn1: null,
          // value_column_2 : data?.hasOwnProperty("value2") ? (data?.value2 !== undefined ? data?.value2 : null ): sheetDataPopulate?.kpiSheet?.valueColumn2 ? sheetDataPopulate?.kpiSheet?.valueColumn2: null,
          value_column_3: null,
          value_column_4: null,
          value_column_5: null,
        },
      ],
    });
    setMessage(response)
    navigateToMapKpi(bucketId);
    handleCloseAddModal();
  }

  const handleCloseAddModal = () => {
    setIsModalOpen(false);
    // window.location.reload();
  };

  const navigateToMapKpi = (bucketId: any) => {
    const newUrl = `/mapkpi?bucketId=${bucketId}`;
    handleOpenModal(message)
    router.push(newUrl);
    setTimeout(() => {
      window.location.href = newUrl;
    }, 1000);
  };

  const handleSelectedRow = (value: any, rowId: any, fieldName: any) => {

    setSelectedSheet(value.value);
    setKpiId(rowId);
    let array = values;
    // arr.push({row_id: rowId}
    let found = array.find((arr: any) => arr.row_id === rowId);

    if (found === undefined) {
      array.push({ row_id: rowId, [fieldName]: value.value });
    } else if (found) {
      found = { ...found, [fieldName]: value.value };
      // console.log(found, "found objjj");
      array = [found];
    }
    setValues(array)
    

    if (fieldName === "sheet") {
      setSelectedSheetId(value.value);
      setDropdownTitle(true);
      const fieldOptionsList = newSheetingDropdownList?.filter(
        (data: any) => data?.id == value.value
      );
      setSheetMapping(fieldOptionsList)

    const matchedSheeting = bucketListing.filter((kpi) => kpi && kpi.notConfigured === undefined)
    const dropdownPopulate = matchedSheeting.filter(sheetId =>sheetId?.sheetConfig?.id === value.value)
    setSheetDataPopulate(dropdownPopulate[0])
    const matchedSheets = matchedSheeting?.filter(kpi => kpi?.id === rowId)
    const matchedIds = matchedSheets.map(matchedSheet => matchedSheet.id);
    
    let array = [...sheetsValue];
    if (matchedIds.length > 0) {
      const newValue = matchedIds[0];
      if(!array.includes(newValue)) {
        array.push(newValue)
      } 
    } else {
      setSheetsValue([]); 
    }
     setSheetsValue(array);
    }
    setSaveButtonEnabled(true);
    // Initialize an empty array to store row_ids
    const rowIds = [];

    // Loop through each object and push the row_id to the array
    for (const item of array) {
      rowIds.push(item.row_id);
    }

    setrowiddata(rowIds);

    

  };

  const onAdd = (e: any) => {
    e.stopPropagation();

    const newKpi = bucketListing.filter(
      (kpi) => kpi && kpi.notConfigured === true
    );
    const newKpiOptions: { label: string; value: string }[] = [];
    const newSheetConfigOptions: { label: string; value: string }[] = [];
    const newFieldSheetConfigOptions = new Set();
    const uniqueIds = new Set();
    newKpi.forEach((kpi: any) => {
      const { id, name, noOfInputReq, code } = kpi;

      newKpiOptions.push({ label: name, value: id === null ? "null" : id, noOfInputReq: noOfInputReq, code: code  });
      if (kpi.sheetConfig?.sheetName && kpi.sheetConfig?.id) {
        if (!uniqueIds.has(kpi.sheetConfig.id)) {
          newSheetConfigOptions.push({
            label: kpi.sheetConfig?.sheetName,
            value: kpi.sheetConfig?.id === null ? "null" : kpi.sheetConfig?.id,
          });
          uniqueIds.add(kpi.sheetConfig.id);
        }
      }

      if (kpi.sheetConfig?.fieldDetail?.arr) {
        kpi.sheetConfig?.fieldDetail?.arr.forEach((item: any) => {
          newFieldSheetConfigOptions.add(item.name);
        });
      }
    });
    const newFieldSheetConfigOptionsArray = Array.from(
      newFieldSheetConfigOptions
    ).map((label) => ({ label }));
    setNewkpiListing(newKpiOptions);
    setNewSheetConfigListing(newSheetConfigOptions);
    setNewFieldSheetConfigListing(newFieldSheetConfigOptionsArray);
    setShowNewKpi(true);
    setBucketListing((prevBucketListing) => [...prevBucketListing, newKpi]);


    setIsVisible(false);

  };

  useEffect(() => {
    const newAddFieldOptions: { label: string; value: string }[] = [];
    const fieldOptionsList = newSheetingDropdownList?.filter(
      (data:any) => data?.id == selectedSheet
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
  }, [selectedSheet, selectedSheetId]);

  const onRemove = async (index: number) => {
    setIsRemoveModalOpen(true)
    setDeleteKpiId(index)
  };

  const deleteModalKpi = () => {
    let bucketListingCopy = bucketListing;
    const filteredBucketList = bucketListingCopy.filter(
      (kpi) => kpi.notConfigured === undefined
    );
    
    const kpitoremove = filteredBucketList[deleteKpiId];
    const currentDeleteId = kpitoremove?.id;
        if (currentDeleteId) {
      setDeleteKpi(currentDeleteId);
      bucketListingCopy.splice(deleteKpiId, 1);
      setBucketListing(bucketListingCopy)
    } else if (deleteKpiId && currentDeleteId==undefined) {
      filteredBucketList.splice(deleteKpiId, 1);
      setBucketListing(filteredBucketList)
    }
    handleCloseRemoveModal();
    const importBucketData = Number(importBucketId) 
    
    if (bucketId === importBucketData) {
      const newUrl=`/mapkpi?bucketId=${bucketId}`;
      router.push(newUrl)
      setTimeout(() => {
        window.location.href = newUrl;
      }, 1000)
    } 
    else if (bucketId !== importBucketData) {
     const newUrl1= `/mapkpi?bucketId=${bucketId}`
    //  router.push(newUrl1, undefined, { shallow: false });
    router.push(newUrl1)
    setTimeout(() => {
      window.location.href = newUrl1;
    }, 1000)
  }}
  

  useEffect(() => {
    const removeKpi = async () => {
      if (deleteApi && deleteApi.isSuccess) {
        setDeletedKpi(deleteKpi);
      }
    };
  
    if (deleteKpi !== "") {
      deleteApiKpi();
      removeKpi();
    }
  }, [deleteKpi]);

  function getModelData(kpi: any, kpiId: any, sheetMapping: any, selectedSheet: any, sheetsValue: any, sheetDataPopulate: any, values: any, matchedModelValues: any) {
    if (dropdownTitle === true && kpiId === kpi?.id) {
      if (kpiId === kpi?.id && sheetMapping[0]?.id === selectedSheet && sheetsValue.includes(kpiId)) {
        return sheetMapping[0]?.tableColumns[0]?.modelColumn ? sheetMapping[0]?.tableColumns[0]?.modelColumn : sheetDataPopulate?.kpiSheet?.modelColumn
      } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
        return sheetMapping[0]?.tableColumns[0]?.modelColumn ? sheetMapping[0]?.tableColumns[0]?.modelColumn : sheetDataPopulate?.kpiSheet?.modelColumn
      } else {
        return values?.model || sheetMapping[0]?.tableColumns[0]?.modelColumn ? sheetMapping[0]?.tableColumns[0]?.modelColumn : sheetDataPopulate?.kpiSheet?.modelColumn
      }
    } else if (sheetMapping[0]?.id === selectedSheet && kpiId === kpi?.id && sheetsValue.includes(kpiId)) {
      return sheetMapping[0]?.tableColumns[0]?.modelColumn ? sheetMapping[0]?.tableColumns[0]?.modelColumn : sheetDataPopulate?.kpiSheet?.modelColumn
    } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
      return sheetMapping[0]?.tableColumns[0]?.modelColumn ? sheetMapping[0]?.tableColumns[0]?.modelColumn : sheetDataPopulate?.kpiSheet?.modelColumn
    } else {
      const foundValue = (matchedModelValues.find((subArray: any) => subArray !== null) || [])[0]?.value;
      return foundValue || values?.model || "Select Model Value";
    }
  }
  


  const dynamicData = bucketListing
    .filter((kpi) => kpi && kpi.notConfigured === undefined)
    .map((kpi, index) => {
      const options = showNewKpi && kpi?.id === undefined ? newKpiListing : [];
      const defaultValue =
        showNewKpi && kpi?.id === undefined
          ? "Select KPI"
          : [`${kpi.name} - ${kpi.code}`];

          
          const getColumnValues = (columnName: any) => {
            return collectedData?.map((subArray) => {
              const matchedElements = subArray?.filter((element: any) => element?.id === kpi?.id);
              if (matchedElements.length > 0) {
                return matchedElements.map((element: any) => ({
                  id: element?.id,
                  value: element?.[columnName]
                }));;
              }
              return null;
            })
            .filter(values => values !== null && values.length > 0); 
          };
          
          const matchedUniqueValues = getColumnValues("uniqueColumn");
          const matchedModelValues = getColumnValues("modelColumn");
          const matchedBranchValues = getColumnValues("branchColumn");
          const matchedConsultantValues = getColumnValues("consultantColumn");
          const matchedDateValues = getColumnValues("dateColumn");
          const matchedValueOne = getColumnValues("valueColumn1");
          const matchedValueTwo = getColumnValues("valueColumn2");
  
          


          let modelData = getModelData(kpi, kpiId, sheetMapping, selectedSheet, sheetsValue, sheetDataPopulate, values, matchedModelValues);  


          let uniqueData = sheetDataPopulate?.kpiSheet?.uniqueColumn=== null ? "Select Unique Value" : sheetDataPopulate?.kpiSheet?.uniqueColumn;
          if(dropdownTitle === true && kpiId === kpi?.id) {
            if(kpiId === kpi?.id  && selectSheetChange[0]?.id === selectedSheet && sheetsValue.includes(kpiId)) {
              uniqueData = sheetDataPopulate?.kpiSheet?.uniqueColumn=== null ? "Select Unique Value" : sheetDataPopulate?.kpiSheet?.uniqueColumn

            } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
              uniqueData = sheetDataPopulate?.kpiSheet?.uniqueColumn=== null ? "Select Unique Value" : sheetDataPopulate?.kpiSheet?.uniqueColumn;
            } else {
              values?.unique || sheetDataPopulate?.kpiSheet?.uniqueColumn=== null ? "Select Unique Value" : sheetDataPopulate?.kpiSheet?.uniqueColumn
            }
          } else if (selectSheetChange[0]?.id === selectedSheet && kpiId === kpi?.id && sheetsValue.includes(kpiId)) {
            uniqueData =  sheetDataPopulate?.kpiSheet?.uniqueColumn=== null ? "Select Unique Value" : sheetDataPopulate?.kpiSheet?.uniqueColumn
          } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
            uniqueData =  sheetDataPopulate?.kpiSheet?.uniqueColumn=== null ? "Select Unique Value" : sheetDataPopulate?.kpiSheet?.uniqueColumn;
          } else {
            const foundValue = (matchedUniqueValues.find((subArray) => subArray !== null) || [])[0]?.value;
            uniqueData = foundValue || values?.unique || "Select Unique Value";
          }


          let branchData = sheetMapping[0]?.tableColumns[0]?.branchColumn  ?sheetMapping[0]?.tableColumns[0]?.branchColumn : sheetDataPopulate?.kpiSheet?.branchColumn

          if(dropdownTitle === true && kpiId === kpi?.id) {
            if(kpiId === kpi?.id  && selectSheetChange[0]?.id === selectedSheet && sheetsValue.includes(kpiId)) {
              branchData =  sheetMapping[0]?.tableColumns[0]?.branchColumn ? sheetMapping[0]?.tableColumns[0]?.branchColumn : sheetDataPopulate?.kpiSheet?.branchColumn
            } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
              branchData =  sheetMapping[0]?.tableColumns[0]?.branchColumn ? sheetMapping[0]?.tableColumns[0]?.branchColumn : sheetDataPopulate?.kpiSheet?.branchColumn
            } else {
              values?.branch ||  sheetMapping[0]?.tableColumns[0]?.branchColumn ? sheetMapping[0]?.tableColumns[0]?.branchColumn : sheetDataPopulate?.kpiSheet?.branchColumn
            }
          } else if (selectSheetChange[0]?.id === selectedSheet && kpiId === kpi?.id && sheetsValue.includes(kpiId)) {
            branchData =  sheetMapping[0]?.tableColumns[0]?.branchColumn ? sheetMapping[0]?.tableColumns[0]?.branchColumn : sheetDataPopulate?.kpiSheet?.branchColumn
          } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
            branchData = sheetMapping[0]?.tableColumns[0]?.branchColumn ? sheetMapping[0]?.tableColumns[0]?.branchColumn : sheetDataPopulate?.kpiSheet?.branchColumn
          } else {
            const foundValue = (matchedBranchValues.find((subArray) => subArray !== null) || [])[0]?.value;
            branchData = foundValue || values?.branch || "Select Branch Value";
          }

          let consultantData = sheetMapping[0]?.tableColumns[0]?.consultantColumn  ? sheetMapping[0]?.tableColumns[0]?.consultantColumn : sheetDataPopulate?.kpiSheet?.consultantColumn  
          if(dropdownTitle === true && kpiId === kpi?.id) {
            if(kpiId === kpi?.id  && selectSheetChange[0]?.id === selectedSheet && sheetsValue.includes(kpiId)) {
              consultantData= sheetMapping[0]?.tableColumns[0]?.consultantColumn ? sheetMapping[0]?.tableColumns[0]?.consultantColumn : sheetDataPopulate?.kpiSheet?.consultantColumn
            } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
              consultantData= sheetMapping[0]?.tableColumns[0]?.consultantColumn ? sheetMapping[0]?.tableColumns[0]?.consultantColumn : sheetDataPopulate?.kpiSheet?.consultantColumn
            } else {
              values?.consultant || sheetMapping[0]?.tableColumns[0]?.consultantColumn ? sheetMapping[0]?.tableColumns[0]?.consultantColumn : sheetDataPopulate?.kpiSheet?.consultantColumn
            }
          } else if (selectSheetChange[0]?.id === selectedSheet && kpiId === kpi?.id && sheetsValue.includes(kpiId)) {
            consultantData= sheetMapping[0]?.tableColumns[0]?.consultantColumn ? sheetMapping[0]?.tableColumns[0]?.consultantColumn : sheetDataPopulate?.kpiSheet?.consultantColumn
          } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
            consultantData= sheetMapping[0]?.tableColumns[0]?.consultantColumn ? sheetMapping[0]?.tableColumns[0]?.consultantColumn : sheetDataPopulate?.kpiSheet?.consultantColumn
          } else {
            const foundValue = (matchedConsultantValues.find((subArray) => subArray !== null) || [])[0]?.value;
            consultantData = foundValue || values?.consultant || "Select Consultant Value";
          }


          let dateData = sheetDataPopulate?.kpiSheet?.dateColumn=== null ? "Select Date Value" : sheetDataPopulate?.kpiSheet?.dateColumn
          if(dropdownTitle === true && kpiId === kpi?.id) {
            if(kpiId === kpi?.id  && selectSheetChange[0]?.id === selectedSheet && sheetsValue.includes(kpiId)) {
              dateData = sheetDataPopulate?.kpiSheet?.dateColumn=== null ? "Select Date Value" : sheetDataPopulate?.kpiSheet?.dateColumn
            } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
              dateData = sheetDataPopulate?.kpiSheet?.dateColumn=== null ? "Select Date Value" : sheetDataPopulate?.kpiSheet?.dateColumn
            } else {
              values?.date1 || sheetDataPopulate?.kpiSheet?.dateColumn=== null ? "Select Date Value" : sheetDataPopulate?.kpiSheet?.dateColumn;
            }
          } else if (selectSheetChange[0]?.id === selectedSheet && kpiId === kpi?.id && sheetsValue.includes(kpiId)) {
            dateData = sheetDataPopulate?.kpiSheet?.dateColumn=== null ? "Select Date Value" : sheetDataPopulate?.kpiSheet?.dateColumn
          } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
            dateData = sheetDataPopulate?.kpiSheet?.dateColumn=== null ? "Select Date Value" : sheetDataPopulate?.kpiSheet?.dateColumn
          } else {
            const foundValue = (matchedDateValues.find((subArray) => subArray !== null) || [])[0]?.value;
            dateData = foundValue || values?.date1 || "Select Date Value";
          }


          let valueOneData =  sheetDataPopulate?.kpiSheet?.valueColumn1=== null ? "Select Value One" : values[0]?.value1
          if(dropdownTitle === true && kpiId === kpi?.id) {
            if(kpiId === kpi?.id  && selectSheetChange[0]?.id === selectedSheet && sheetsValue.includes(kpiId)) {
              valueOneData = sheetDataPopulate?.kpiSheet?.valueColumn1=== null ? "Select Value One" : "Select Value Column1"
            } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
              valueOneData =  sheetDataPopulate?.kpiSheet?.valueColumn1=== null ? "Select Value One" : sheetDataPopulate?.kpiSheet?.valueColumn1
            } else {
              values?.value1 || sheetDataPopulate?.kpiSheet?.valueColumn1=== null ? "Select Value One" : sheetDataPopulate?.kpiSheet?.valueColumn
            }
          } else if (selectSheetChange[0]?.id === selectedSheet && kpiId === kpi?.id && sheetsValue.includes(kpiId)) {
            valueOneData =  sheetDataPopulate?.kpiSheet?.valueColumn1=== null ? "Select Value One" : sheetDataPopulate?.kpiSheet?.valueColumn1
          } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
            valueOneData =  sheetDataPopulate?.kpiSheet?.valueColumn1=== null ? "Select Value One" : sheetDataPopulate?.kpiSheet?.valueColumn1
          } else {
            const foundValue = (matchedValueOne.find((subArray) => subArray !== null) || [])[0]?.value;
            valueOneData = foundValue || values?.value1 || "Select Value One";
          }


          let valueTwoData = sheetDataPopulate?.kpiSheet?.valueColumn2=== null ? "Select Value Two" : values[0]?.value2
          if(dropdownTitle === true && kpiId === kpi?.id) {
            if(kpiId === kpi?.id  && selectSheetChange[0]?.id === selectedSheet && sheetsValue.includes(kpiId)) {
              valueTwoData = sheetDataPopulate?.kpiSheet?.valueColumn2=== null ? "Select Value Two" : "Select Value Column2";
            } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
              valueTwoData = sheetDataPopulate?.kpiSheet?.valueColumn2=== null ? "Select Value Two" : sheetDataPopulate?.kpiSheet?.valueColumn2;
            } else {
              values?.value2 || sheetDataPopulate?.kpiSheet?.valueColumn2=== null ? "Select Value Two" : sheetDataPopulate?.kpiSheet?.valueColumn2;
            }
          } else if (selectSheetChange[0]?.id === selectedSheet && kpiId === kpi?.id && sheetsValue.includes(kpiId)) {
            valueTwoData = sheetDataPopulate?.kpiSheet?.valueColumn2=== null ? "Select Value Two" : sheetDataPopulate?.kpiSheet?.valueColumn2
          } else if (kpiId !== kpi?.id && sheetsValue.includes(kpi?.id)) {
            valueTwoData = sheetDataPopulate?.kpiSheet?.valueColumn2=== null ? "Select Value Two" : sheetDataPopulate?.kpiSheet?.valueColumn2
          } else {
            const foundValue = (matchedValueTwo.find((subArray) => subArray !== null) || [])[0]?.value;
            valueTwoData = foundValue || values?.value2 || "Select Value Two";
          }
          

          const matchedObject: any = newKpiListing.find(obj => obj.value === values[0]?.kpi );
          
          let noOfInputReqValue = null;
          if (matchedObject) {

            noOfInputReqValue = matchedObject?.noOfInputReq;
          } 

          let isValueEnabled = false;
          let isValue1Enabled = false;
          let isValue2Enabled = false;


          if (matchedObject?.value !== kpi?.id) {
            // console.log(kpi,'=====inside 1 if');
            isValueEnabled = (kpi?.noOfInputReq >= 1 );
            isValue1Enabled = (kpi?.noOfInputReq >= 1);
            isValue2Enabled = (kpi?.noOfInputReq >= 2);
            if (Array.isArray(kpi)) {
              const matchedValueColumn = kpi?.find(obj => obj.id === matchedObject?.value)
              if(matchedValueColumn){
               isValueEnabled = (kpi?.noOfInputReq >= 1 || noOfInputReqValue >= 1);
               isValue1Enabled = (kpi?.noOfInputReq >= 1 || noOfInputReqValue >= 1);
               isValue2Enabled = (kpi?.noOfInputReq >= 2 || noOfInputReqValue >= 2);
              }       
            }
          }    
        
          const value1Column =  isValue1Enabled ? (
            <MultipleSelectPlaceholder
              className="dropdownComponent"
              dropdownTitle="Select Value Column1"
              options={fieldOptions}
              enableDeselect={true}
              defaultValue={valueOneData}
              handleSelectedRow={handleSelectedRow}
              rowId={kpi.id}
              fieldName="value1"
            />
          ):  null;
          
          const value2Column = isValue2Enabled ? (
            <MultipleSelectPlaceholder
              className="dropdownComponent"
              dropdownTitle="Select Value Column2"
              options={fieldOptions}
              enableDeselect={true}
              defaultValue={valueTwoData}
              handleSelectedRow={handleSelectedRow}
              rowId={kpi.id}
              fieldName="value2"
            />
          ) : null;    
          
      return {
        kpi: (
          <MultipleSelectPlaceholder
            className="dropdownComponent"
            dropdownTitle={kpi?.id === undefined ? "Select KPI" : ""}
            options={options}
            defaultValue={defaultValue}
            handleSelectedRow={handleSelectedRow}
            rowId={kpi.id}
            fieldName="kpi"
          />
        ),
        sheets_value: (
          <MultipleSelectPlaceholder
            className="dropdownComponent"
            dropdownTitle="Select Sheet"
            options={sheetListing}
            handleSelectedRow={handleSelectedRow}
            defaultValue={
              // sheetsValue
              //   ? sheetsValue
              //   : 
                kpi.sheetConfig === null
                ? "Select Sheet"
                : kpi.sheetConfig?.sheetName
              //   showNewKpi ? "Select sheets" :
              // [
              //   kpi.sheetConfig === null
              //     ? "Select Sheet"
              //     : kpi.sheetConfig?.sheetName,
              // ]
            }
            rowId={kpi.id}
            fieldName="sheet"
          />
        ),
        unique_value: (
          <MultipleSelectPlaceholder
            className="dropdownComponent"
            dropdownTitle="Select Unique Column"
            options={fieldOptions}
            enableDeselect={true}
            defaultValue={uniqueData}
            handleSelectedRow={handleSelectedRow}
            rowId={kpi.id}
            fieldName="unique"
          />
        ),
        model: (
          <MultipleSelectPlaceholder
            className="dropdownComponent"
            dropdownTitle="Select Model Column"
            options={[{ label: sheetDataPopulate?.kpiSheet?.modelColumn, value: sheetDataPopulate?.kpiSheet?.modelColumn}]}
            enableDeselect={true}
            defaultValue={modelData}
            handleSelectedRow={handleSelectedRow}
            rowId={kpi.id}
            fieldName="model"
            disabled={true}
          />
        ),
        branch: (
          <MultipleSelectPlaceholder
            className="dropdownComponent"
            dropdownTitle="Select Branch Column"
            options={[{ label: sheetDataPopulate?.kpiSheet?.branchColumn, value: sheetDataPopulate?.kpiSheet?.branchColumn}]}
            enableDeselect={true}
            defaultValue={branchData}
            handleSelectedRow={handleSelectedRow}
            rowId={kpi.id}
            disabled={true}
            fieldName="branch"
          />
        ),
        consultant_advisor: (
          <MultipleSelectPlaceholder
            className="dropdownComponent"
            dropdownTitle="Select Consultant Column"
            options={[{ label: sheetDataPopulate?.kpiSheet?.consultantColumn, value: sheetDataPopulate?.kpiSheet?.consultantColumn}]}
            enableDeselect={true}
            defaultValue={consultantData}
            handleSelectedRow={handleSelectedRow}
            rowId={kpi.id}
            disabled={true}
            fieldName="consultant"
          />
        ),
        date1: (
          <MultipleSelectPlaceholder
            className="dropdownComponent"
            dropdownTitle="Select Date Column"
            options={sheetMapping[0]?.tableColumns[0]?.dateColumn.map((date: any) => {
              return {
                label: date,
                value: date
              };
            })}
            enableDeselect={true}
            defaultValue={dateData}
            handleSelectedRow={handleSelectedRow}
            rowId={kpi.id}
            fieldName="date1"
          />
        ),
        value1: isValueEnabled  ? value1Column : null ,
        value2: isValueEnabled  ? value2Column : null ,
        remove: (
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            className="accordion-button-group"
          >

            <Button onClick={() => onRemove(index)}>
              <RemoveIcon />
            </Button>
          </ButtonGroup>
        ),
        save: (
          <Button onClick={() => onSubmit(index)} disabled={!rowiddata.includes(kpi.id)}>
            <BookmarkAddedIcon />
          </Button>
        ),
      };
    });

  const dynamicHeaders = [
    "KPI",
    "Sheets",
    "Unique Value",
    "Model",
    "Branch",
    "Consultant Advisor",
    " Date",
    "Value-1",
    " Value-2",
    "Remove",
    "Save",
  ];

  return (
    <>
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} modalextraclass='modal-small kpi-modal' >
    
       <PanelHeading
                firstHeading= "Do You Really Want to Save the KPI"
                className="title-pop-kpi"
        />
        <Button onClick={addModalKpi} variant="contained">
                Ok
              </Button>
              <Button onClick={handleCloseAddModal} variant="contained">
                cancel
              </Button>
    </Modal>
    <Modal isOpen={isRemoveModalOpen} onClose={handleCloseRemoveModal} modalextraclass='modal-small kpi-modal' >
    <PanelHeading
                firstHeading='Are You sure to Remove the KPI'
                className="title-pop-kpi"
              />
              <Button onClick={deleteModalKpi} variant="contained">
                Ok
              </Button>
              <Button onClick={handleCloseRemoveModal} variant="contained">
                cancel
              </Button>
    </Modal>
    <Box className="w-full pt-5 animate__animated animate__fadeInDown animate__delay-1s" id={`/mapkpi?bucketId=${bucketId}`} ref={formRef}>
      <Accordion
        expanded={expanded === bucketId}
        onChange={handleChange(bucketId)}
        className="accordion-wrapper mb-[1.875rem] border-0 bg-white rounded-2xl py-0 px-4 "
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          className="accordion-header flex text-black w-full p-[1.25rem]"
        >
          <Box className="flex justify-between items-center w-full">
            <Typography className="mr-2">{name}</Typography>

            {expanded ? (
              isVisible && <IconButton
                aria-label="add"
                className="mr-3 p-1"
                onClick={(e) => onAdd(e)}
              >
                <AddIcon />
              </IconButton>
            ) : (
              ""
            )}
          </Box>
        </AccordionSummary>

        <AccordionDetails className="accordion-details border-0">
          <Typography>
            <AccordionTable
              tableData={dynamicData}
              tableHeaders={dynamicHeaders}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
    </>
  );
};

export default Accordions;