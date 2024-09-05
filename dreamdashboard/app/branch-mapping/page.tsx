"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../layout-with-sidebar";
import CommonMappingTable from "@root/components/CommonMappingTable";
import MultipleSelectPlaceholder from "@root/components/FilterDropdown";
import { useBranchControllerBranchName, useBranchControllerMapping, useGetManyBaseBranchControllerBranch } from "../../backend/backendComponents";
import { useSearchParams } from "next/navigation";

const Branchmapping: React.FC = () => {
  const searchParams = useSearchParams()
  const fileId = searchParams
  const dynamicHeaders = ["Branch Name", "Mapping"];
  const { mutateAsync: submitBranchMapping, isLoading: submitLoader } = useBranchControllerMapping();
  const [Branchmapping, setBranchMaipping] = useState({});

  const {
    data: branchData,
    isLoading,
    error,
  } = useGetManyBaseBranchControllerBranch({
    queryParams: {
      join: ["brand"],
    },
  });

  const { data: branchNames } = useBranchControllerBranchName({ queryParams: { p_import_file_id: 2 } });


  let options: any[] = [];

  if (Array.isArray(branchData)) {
    options = branchData.map((items: any) => ({
      label: items.name,
      value: items.id,
    }));
    options.push({ label: 'New', value: 'New' })
  }

  const handleBranchMapping = (value: number, branchName: string) => {
    let obj = {
      ...Branchmapping,
      [branchName]: value.value,
    };
    setBranchMaipping(obj);
  };

  const dynamicData = Array.from({ length: branchNames?.data?.length }, (_, index) => ({
    Model: `${branchNames?.data?.[index].v_branch_value}`,
    Mapping: (
      <MultipleSelectPlaceholder
        className="dropdownComponent"
        dropdownTitle="Select Branch"
        options={options}
        handleBranchMapping={handleBranchMapping}
        branch={`${branchNames?.data?.[index].v_branch_value}`}
      />
    ),
  }));



  const onSubmit = async () => {

    let reqArr = [];

    for (const key in Branchmapping) {
      if (Branchmapping.hasOwnProperty(key)) {

        let eachReqObj = {}

        if (Branchmapping[key] === 'New') {
          eachReqObj = {
            // "id": Branchmapping[key],
            "name": key
          }
        } else {
          eachReqObj = {
            "id": Branchmapping[key],
            "name": key
          }
        }

        reqArr.push(eachReqObj)
      }
    }

    await submitBranchMapping({
      body: reqArr
    })
  }

  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
      <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4">
          <Box className="flex justify-between items-center sm:block">
            <PanelHeading firstHeading={"Branch Mapping"} />
          </Box>
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box className="dashboard-sales-items">
            <CommonMappingTable
              tableData={dynamicData}
              tableHeaders={dynamicHeaders}
            />
            <Box className="w-100 my-5 flex justify-center">
              <ButtonItem
                className="outlineBtn mx-1"
                ButtonTitle="Cancel"
                type="button"
              />
              <ButtonItem
                className="containBtn mx-1"
                ButtonTitle="Save"
                type="button"
                onClick={onSubmit}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
};

export default Branchmapping;
