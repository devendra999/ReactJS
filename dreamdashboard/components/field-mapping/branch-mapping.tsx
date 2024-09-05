"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../../app/layout-with-sidebar";
import CommonMappingTable from "@root/components/CommonMappingTable";
import MultipleSelectPlaceholder from "@root/components/FilterDropdown";
import {
  useBranchControllerBranchName,
  useBranchControllerBrandWiseFilterBranch,
  useBranchControllerMapping,
  useGetManyBaseBranchControllerBranch,
} from "../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../Modal";

export const Branchmapping: React.FC = ({userId, brandId}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMapped, setIsMapped] = useState<boolean>(false);
  const bucketId = searchParams.get("bucketId");
  const fileId = searchParams.get("fileId");
  const dynamicHeaders = ["Branch Name", "Mapping"];
  const { mutateAsync: submitBranchMapping, isLoading: submitLoader } =
    useBranchControllerMapping();
  const [Branchmapping, setBranchMaipping] = useState({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  const {
    data: branchData,
    refetch: fetchBranchOptions,
    isLoading,
    error,
  } = useBranchControllerBrandWiseFilterBranch({
    queryParams: { brand_id: brandId },
  });
  

  const { data: branchNames, refetch: fetchBrandNames } = useBranchControllerBranchName({
    queryParams: { p_import_file_id: fileId ? parseInt(fileId) : 2 },
  });

  let options: any[] = [];

  if (Array.isArray(branchData?.data)) {
    options = branchData?.data?.map((items: any) => ({
      label: items.name,
      value: items.id,
    }));
    options.sort((a, b) => (a.label > b.label ? 1 : -1));
    //options.unshift({ label: "New", value: "New" });
  }

  const handleBranchMapping = (value: number, branchName: string) => {
    let obj = {
      ...Branchmapping,
      [branchName]: value.value,
    };
    setBranchMaipping(obj);
  };

  const handleConfirmationCloseModal = () => {
    
    setIsConfirmationModalOpen(false)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dynamicData = Array.from(
    { length: branchNames?.data?.length },
    (_, index) => ({
      Model: `${branchNames?.data?.[index].v_branch_value}`,
      Mapping: (
        <MultipleSelectPlaceholder
          key={index}
          className="dropdownComponent"
          dropdownTitle="Select Branch"
          options={options}
          handleBranchMapping={handleBranchMapping}
          branch={`${branchNames?.data?.[index].v_branch_value}`}
          isMapped={isMapped}
          setIsMapped={setIsMapped}
        />
      ),
    })
  );

  const onSubmit = async () => {
    let reqArr = [];

    for (const key in Branchmapping) {
      if (Branchmapping.hasOwnProperty(key)) {
        let eachReqObj = {};

        if (Branchmapping[key] === "New") {
          eachReqObj = {
            // "id": Branchmapping[key],
            name: key,
          };
        } else {
          eachReqObj = {
            id: Branchmapping[key],
            name: key,
          };
        }

        reqArr.push(eachReqObj);
      }
    }
    const requestObj = {
      user_id: userId,
      brand_id: brandId,
      branch: reqArr
    }

    // if (reqArr.length === branchNames?.data?.length) {
      const mappingRes =  await submitBranchMapping({
        body: requestObj,
      });
      if(mappingRes?.statusCode  === 201 || 200){
        fetchBrandNames()
        fetchBranchOptions()
        setIsConfirmationModalOpen(true)
        setIsMapped(true)
      }
    // } else {
    //   setIsModalOpen(true);
    // }
  };

  return (
    <Box className="tab-panel-item-nav">
      <CommonMappingTable
        tableData={dynamicData}
        tableHeaders={dynamicHeaders}
      />
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationCloseModal}
        modalextraclass="modal-small"
      >
        <Box className="modal-main-data">
          <Typography
            variant="h6"
            className="note-description text-center"
          >
            Data mapped successfully.
          </Typography>

          <Box>
            <Box className="w-100 flex justify-center button-group-data">
              <ButtonItem
                className="outlineBtn mx-1"
                ButtonTitle="Close"
                type="button"
                onClick={handleConfirmationCloseModal}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalextraclass="modal-small"
      >
        <Box className="modal-main-data">
          <Typography
            variant="h6"
            className="note-description text-center"
          >
            Please map all duplicate branch names.
          </Typography>

          <Box>
            <Box className="w-100 flex justify-center button-group-data">
              <ButtonItem
                className="outlineBtn mx-1"
                ButtonTitle="Close"
                type="button"
                onClick={handleCloseModal}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
      {dynamicData.length > 0 ? (
        <Box className="w-100 my-5 flex justify-center">
          <ButtonItem
            className="outlineBtn mx-1"
            ButtonTitle="Cancel"
            type="button"
            onClick={() =>
              router.push(`/bucket-management/list?bucketId=${bucketId}`)
            }
          />
          <ButtonItem
            className="containBtn mx-1"
            ButtonTitle="Save"
            type="button"
            onClick={onSubmit}
          />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Branchmapping;
