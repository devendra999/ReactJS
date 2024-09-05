"use client";
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { PanelHeading } from '@root/components/PanelHeading';
import ButtonItem from '@root/components/ButtonItem';
import SidebarWithLayout from '../layout-with-sidebar';
import CommonMappingTable from '@root/components/CommonMappingTable';
import MultipleSelectPlaceholder from "@root/components/FilterDropdown";
import { useRouter, useSearchParams } from 'next/navigation';
import { useCreateOneBaseTableColumnsControllerTableColumns, useGetManyBaseTableColumnsControllerTableColumns, useSheetConfigControllerMapping, useReplaceOneBaseTableColumnsControllerTableColumns, useUpdateOneBaseTableColumnsControllerTableColumns, useImportBucketControllerCreateCustomTableForBucket } from '@root/backend/backendComponents';
import { Sheet, SheetConfig, TableColumns } from '@root/backend/backendSchemas';

type DropdownValues = {
  Mapping: string;
  Branch: string;
  Consultant: string;
  Date: string[];
};

type SheetValues = {
  sheetName: string;
  dropdownValues: DropdownValues;
};

const Sheetmapping: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const bucketId = searchParams.get('bucketId')

  const fileId = searchParams.get('fileId')

  const { data: sheetConfigData, isLoading: loadingSheets } = useSheetConfigControllerMapping({ pathParams: { id: parseInt(bucketId as string) } });
  const { data: tableColumnsData, isLoading: loadingTableColumnsData } = useGetManyBaseTableColumnsControllerTableColumns({});
  const { mutateAsync: mutateTableColumns, isLoading: loadingTableColumns } = useCreateOneBaseTableColumnsControllerTableColumns();
  const { mutateAsync: patchTableColumns } = useUpdateOneBaseTableColumnsControllerTableColumns();
  const { mutateAsync: putTableColumns } = useReplaceOneBaseTableColumnsControllerTableColumns();

  const { mutateAsync: createCustomTables } = useImportBucketControllerCreateCustomTableForBucket();
  const sheetData: any = sheetConfigData;

  const initialSheetData: SheetValues[] = [];
  const [sheetValues, setSheetValues] = useState<SheetValues[]>(initialSheetData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSheetMappingChange = (dropdown: keyof DropdownValues, value: any, sheetName: string) => {
    setError(null);
    setSheetValues((prevSheetData) => {
      const sheetIndex = prevSheetData.findIndex((sheet) => sheet.sheetName === sheetName);
      if (sheetIndex === -1) {
        // Add a new sheet if the sheetName doesn't exist
        const newSheetData: SheetValues = {
          sheetName,
          dropdownValues: { [dropdown]: value },
          key: Math.random().toString(36).substring(7), // Generating a unique key
        };

        return [...prevSheetData, newSheetData];
      } else {
        // Update the specified dropdown value if the sheetName already exists
        const updatedSheetData = [...prevSheetData];
        updatedSheetData[sheetIndex].dropdownValues[dropdown] = value;
        return updatedSheetData;
      }
    });
  };

  // const handleSheetMappingChange = (dropdown: keyof DropdownValues, value: any, sheetName: string) => {
  //   setError(null);
  //   setSheetValues((prevSheetData) => {
  //     const sheetIndex = prevSheetData.findIndex((sheet) => sheet.sheetName === sheetName);
  //     if (sheetIndex === -1) {
  //       // Add a new sheet if the sheetName doesn't exist
  //       const defaultDropdownValue = {
  //         Mapping: '',
  //         Branch: '',
  //         Consultant: '',
  //         Date: [],
  //       };
  //       const newSheetData: SheetValues = {
  //         sheetName,
  //         dropdownValues: { ...defaultDropdownValue, [dropdown]: value },
  //       };

  //       return [...prevSheetData, newSheetData];
  //     } else {
  //       // Update the dropdown value if the sheetName already exists
  //       const updatedSheetData = [...prevSheetData];
  //       updatedSheetData[sheetIndex].dropdownValues[dropdown] = value;
  //       return updatedSheetData;
  //     }
  //   });
  // };

  const dynamicData = sheetData?.data.map((sheet: any) => ({
    Model: `${sheet?.sheetName}`,
    Mapping: <MultipleSelectPlaceholder
      className="dropdownComponent col-sheet"
      dropdownTitle="Select"
      currentDropdown='Mapping'
      enableDeselect={true}
      defaultValue={sheet?.tableColumns[0]?.modelColumn}
      handleSheetMappingChange={handleSheetMappingChange}
      options={sheet?.fieldDetail?.arr?.map((field: any) => {
        if (field.name !== 'sheet_id' && field.name !== 'sheet_status') {
          return { label: field.name, value: field.name }
        }
      }).filter((ele: any) => ele !== undefined)}
      model={`${sheet.sheetName}`}
    />
    ,
    Branch: <MultipleSelectPlaceholder
      className="dropdownComponent"
      dropdownTitle="Select"
      currentDropdown='Branch'
      enableDeselect={true}
      defaultValue={sheet?.tableColumns[0]?.branchColumn}
      handleSheetMappingChange={handleSheetMappingChange}
      options={sheet?.fieldDetail?.arr?.map((field: any) => {
        if (field.name !== 'sheet_id' && field.name !== 'sheet_status') {
          return { label: field.name, value: field.name }
        }
      }).filter((ele: any) => ele !== undefined)}
      model={`${sheet.sheetName}`}
    />
    ,
    Consultant: <MultipleSelectPlaceholder
      className="dropdownComponent"
      dropdownTitle="Select"
      currentDropdown='Consultant'
      enableDeselect={true}
      defaultValue={sheet?.tableColumns[0]?.consultantColumn}
      handleSheetMappingChange={handleSheetMappingChange}
      options={sheet?.fieldDetail?.arr?.map((field: any) => {
        if (field.name !== 'sheet_id' && field.name !== 'sheet_status') {
          return { label: field.name, value: field.name }
        }
      }).filter((ele: any) => ele !== undefined)}
      model={`${sheet.sheetName}`}
    />
    ,
    Date: <MultipleSelectPlaceholder
      className="dropdownComponent"
      dropdownTitle="Select"
      multiple={true}
      currentDropdown='Date'
      enableDeselect={true}
      defaultValue={sheet?.tableColumns[0]?.dateColumn}
      handleSheetMappingChange={handleSheetMappingChange}
      options={sheet?.fieldDetail?.arr?.map((field: any) => {
        if (field.name !== 'sheet_id' && field.name !== 'sheet_status') {
          return { label: field.name, value: field.name }
        }
      }).filter((ele: any) => ele !== undefined)}
      model={`${sheet.sheetName}`}
    />
    ,
  })) ?? [];

  const dynamicHeaders = ["Sheets", "Model", "Branch", "Consultant", "Date"];

  const updateTableColumns = async (sheetValues: SheetValues[], currentSheet: Sheet, index: number) => {
    try {
      const existingColumnData: TableColumns[] = [];
      (tableColumnsData as any).map((row: TableColumns) => {
        if (row.sheetId === currentSheet?.id as number) {
          existingColumnData.push(row);
        }
      });
      const sheetName = sheetValues.find(sheet => sheet.sheetName === currentSheet.sheetName);
      
      if (existingColumnData.length == 0) {       
        const resp = await mutateTableColumns({
          body: {
            tableName: currentSheet.tableName,
            branchColumn: sheetName.dropdownValues.hasOwnProperty("Branch") ? 
            sheetName.dropdownValues["Branch"] : 
            "",
            modelColumn: sheetName.dropdownValues.hasOwnProperty("Mapping") ? 
            sheetName.dropdownValues["Mapping"] : 
            "",
            consultantColumn: sheetName.dropdownValues.hasOwnProperty("Consultant") ? 
            sheetName.dropdownValues["Consultant"] : 
            "",
            dateColumn: sheetName.dropdownValues.hasOwnProperty("Date") ? 
            sheetName.dropdownValues["Date"] : 
            [],
            sheetId: currentSheet?.id as number,
            sheet: sheetData?.data[index]
          }
        });
        return resp;
      } else {
        const resp = await patchTableColumns({
          pathParams: {
            id: existingColumnData[0].id!! as unknown as number,
          },
          body: {
            tableName: currentSheet.tableName,
            modelColumn: sheetValues[index].dropdownValues?.["Mapping"],
            branchColumn: sheetValues[index].dropdownValues?.["Branch"],
            consultantColumn: sheetValues[index].dropdownValues?.["Consultant"],
            dateColumn: sheetValues[index].dropdownValues?.["Date"],
            sheetId: currentSheet?.id as number,
            sheet: sheetData?.data[index]
          }
        });
        return resp;
      }
    } catch (error: any) {
      setError("Could not update table columns " + error.message);
      throw new Error();
    }
  }


  const handleMappingSubmit = async () => {
    setLoading(true);

    const isEntryValid = sheetValues?.length === sheetData?.data.length;
    let isKeyValid = isEntryValid;
    let isAnyFieldMapped = false; 

    if (sheetData.data.every(data => data.tableColumns.length !== 0)) {

      for (const data of sheetData.data) {
        const sheetValue = sheetValues.find(sheet => sheet?.sheetName === data?.sheetName);
        
        let consultantColumn = null;
        if (sheetValue && sheetValue.dropdownValues && 'Consultant' in sheetValue.dropdownValues) {
          consultantColumn = sheetValue.dropdownValues.Consultant;
        } else if (data && data.tableColumns && data.tableColumns[0] && 'consultantColumn' in data.tableColumns[0]) {
          consultantColumn = data.tableColumns[0].consultantColumn;
        }

        let branchColumn = null;
        if (sheetValue && sheetValue.dropdownValues && 'Branch' in sheetValue.dropdownValues) {
          branchColumn = sheetValue.dropdownValues.Branch;
        } else if (data && data.tableColumns && data.tableColumns[0] && 'branchColumn' in data.tableColumns[0]) {
          branchColumn = data.tableColumns[0].branchColumn;
        }

        let modelColumn = null;
        if (sheetValue && sheetValue.dropdownValues && 'Mapping' in sheetValue.dropdownValues) {
          modelColumn = sheetValue.dropdownValues.Mapping;
        } else if (data && data.tableColumns && data.tableColumns[0] && 'modelColumn' in data.tableColumns[0]) {
          modelColumn = data.tableColumns[0].modelColumn;
        }

        let dateColumns = null;
        if (sheetValue && sheetValue.dropdownValues && 'Date' in sheetValue.dropdownValues) {
          dateColumns = sheetValue.dropdownValues.Date;
        } else if (data && data.tableColumns && data.tableColumns[0] && 'dateColumn' in data.tableColumns[0]) {
          dateColumns = data.tableColumns[0].dateColumn;
        }     
        
        // if (dateColumns && dateColumns.length > 0) { // Check if dateColumns is not null or empty
          const resp = await putTableColumns({
            pathParams: {
              id: data?.tableColumns[0]?.id as unknown as number,
            },
            body: {
              tableName: data.tableName,
              modelColumn: modelColumn,
              branchColumn: branchColumn,
              consultantColumn: consultantColumn,
              dateColumn: dateColumns,
              sheet: data,
              sheetId: data?.id
            }
          });
          setLoading(false);
          router.push(`/bucket-management/list?bucketId=${bucketId}`)
        // } else {
          // setLoading(false);
          // setError('Some of the mapping values are empty. Cannot submit.');
        // }

      }
      return;
    }

    for (const sheet of sheetValues) {
      const isSheetMapped = (
        sheet?.dropdownValues?.Mapping?.toString() !== '' ||
        sheet?.dropdownValues?.Branch?.toString() !== '' ||
        sheet?.dropdownValues?.Consultant?.toString() !== '' ||
        sheet?.dropdownValues?.Date?.length !== 0
      );

      if (isSheetMapped) {
        isAnyFieldMapped = true;
      }

      if (!isSheetMapped && !isEntryValid) {
        isKeyValid = false;
        break;
      }
    }

    if (isKeyValid) {
      setError(null);
      if (isAnyFieldMapped) { // Check if any field is mapped
        // console.log('===> At least one field is mapped. Submitting...');
        try {
          const promises = sheetData?.data.map((sheet: Sheet, index: number) =>
            updateTableColumns(sheetValues, sheet, index)
          );
          await Promise.all(promises);
          const resp = await createCustomTables({
            body: {
              bucketSheetConfigId: bucketId as unknown as number,
            }
          });
          if (resp?.statusCode == 500) {
            setError(resp?.message);
            setLoading(false);
            return;
          } else {
            if (!error) {
              setLoading(false);
              // router.push(`/bucket-management/list/field-mapping?fileId=${fileId}&bucketId=${bucketId}`);
              router.push(`/bucket-management/list?bucketId=${bucketId}`);
            }
          }
        } catch (error: any) {
          console.error(error);
          setError('Something went wrong during API Call');
        }
      } else {
        // Show validation error if no field is mapped
        setLoading(false);
        setError('At least one field must be mapped to proceed.');
      }
    } else {

      // Show validation error if any of the entries are incomplete
      setLoading(false);
      setError('Some of the mapping values are empty. Cannot submit.');
    }
  };

  const handleCancel = () => {
    // Go back to the previous page
    window.history.back();
  };
  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 flex flex-wrap justify-between items-center">
          {/* <Box className="flex justify-between items-center sm:block"> */}
            <PanelHeading firstHeading={"Sheet Mapping"} />
          {/* </Box> */}
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 my-4">
          <Box className="dashboard-sales-items sheet-table">
            <CommonMappingTable
              tableData={dynamicData}
              tableHeaders={dynamicHeaders}
            />
            <Box className="w-100 my-5 flex justify-center animate__animated animate__fadeIn animate__delay-1s">
              <ButtonItem
                className="outlineBtn mx-1"
                ButtonTitle="Cancel"
                type="button"
                onClick={handleCancel}
              />
              <ButtonItem
                className="containBtn mx-1"
                ButtonTitle="Save"
                type="button"
                onClick={handleMappingSubmit}
                loading={loading}
              />
            </Box>
            <Box className="w-100 my-5 flex justify-center">
              {error && <Typography variant="body2" className="w-100 align-center text-red my-5">{error}</Typography>}
            </Box>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
};

export default Sheetmapping;
