"use client";
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { PanelHeading } from '@root/components/PanelHeading';
import ButtonItem from '@root/components/ButtonItem';
import SidebarWithLayout from '../layout-with-sidebar';
import CommonMappingTable from '@root/components/CommonMappingTable';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useGetManyBaseModelControllerModel, useModelControllerMapping, useModelControllerModelName } from '@root/backend/backendComponents';
import MultipleSelectPlaceholder from '@root/components/FilterDropdown';

const Modelmapping: React.FC = () => {
  const [modelMapping, setModelMapping] = useState({})

  const { data: modelData } = useGetManyBaseModelControllerModel({
    queryParams: {
      join: ["brand"],
    }
  })
  const { data: modelNames } = useModelControllerModelName({ queryParams: { p_import_file_id: 2 } })
  const { mutateAsync: submitModelMapping } = useModelControllerMapping({ queryParams: { p_import_file_id: 2 } })


  let options: any[] = [];

  if (Array.isArray(modelData)) {
    options = modelData.map((items: any) => ({
      label: items.name,
      value: items.id,
    }));
    options.push({ label: 'New', value: 'New' })
  }

  const handleModelMapping = (value: number, modelName: string) => {
    let obj = {
      ...modelMapping,
      [modelName]: value.value,
    }
    setModelMapping(obj)
  }

  const dynamicData = Array.from({ length: modelNames?.data?.length }, (_, index) => ({
    Model: `${modelNames?.data?.[index].v_model_value}`,
    Mapping: (
      <MultipleSelectPlaceholder
        className="dropdownComponent"
        dropdownTitle="Select Model"
        options={options}
        handleModelMapping={handleModelMapping}
        model={`${modelNames?.data?.[index].v_model_value}`}
      />
    ),
  }));

  const onSubmit = async () => {

    let reqArr = [];

    for (const key in modelMapping) {
      if (modelMapping.hasOwnProperty(key)) {

        let eachReqObj = {}

        if (modelMapping[key] === 'New') {
          eachReqObj = {
            "name": key
          }
        } else {
          eachReqObj = {
            "id": modelMapping[key],
            "name": key
          }
        }

        reqArr.push(eachReqObj)
      }
    }

    await submitModelMapping({
      body: reqArr
    })
  }

  const dynamicHeaders = ['Model', 'Mapping'];

  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4">
          <Box className="flex justify-between items-center sm:block">
            <PanelHeading firstHeading={'Model Mapping'} />
          </Box>
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box className="dashboard-sales-items">
            <CommonMappingTable tableData={dynamicData} tableHeaders={dynamicHeaders} />
            <Box className="w-100 my-5 flex justify-center">
              <ButtonItem className="outlineBtn mx-1" ButtonTitle="Cancel" type="button" />
              <ButtonItem className="containBtn mx-1" ButtonTitle="Save" type="button" onClick={onSubmit} />
            </Box>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
};

export default Modelmapping;
