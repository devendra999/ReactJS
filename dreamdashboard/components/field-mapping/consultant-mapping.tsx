"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../../app/layout-with-sidebar";
import CommonMappingTable from "@root/components/CommonMappingTable";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  useGetManyBaseUserControllerUser,
  useUserControllerBrandWiseFilterUser,
  useUserControllerMappingForUser,
  useUserControllerUserName,
} from "@root/backend/backendComponents";
import MultipleSelectPlaceholder from "../FilterDropdown";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../Modal";

const Consultantmapping: React.FC = ({userId, brandId}) => {
  const router = useRouter();
  const [consultantMapping, setConsultantMapping] = useState({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [isMapped, setIsMapped] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const bucketId = searchParams.get("bucketId");
  const fileId = searchParams.get("fileId");
  const { data: consultantNames, refetch: fetchConsultantNames } = useUserControllerUserName({
    queryParams: { p_import_file_id: fileId ? parseInt(fileId) : 2 },
  });
  const { data: consultantData, refetch: fetchConsultantData } = useUserControllerBrandWiseFilterUser({
    queryParams: { brand_id: brandId },
  });
  
  const { mutateAsync: submitConsultantMapping } =
    useUserControllerMappingForUser({
      queryParams: { p_import_file_id: fileId ? parseInt(fileId) : 2 },
    });

  let options: any[] = [];

  if (Array.isArray(consultantData?.data)) {
    options = consultantData?.data?.map((items: any) => ({
      label: items.fullName,
      value: items.id,
    }));

    options.sort((a, b) => (a.label > b.label ? 1 : -1));
    // options.unshift({ label: "New", value: "New" });
  }

  const handleConsultantMapping = (value: number, modelName: string) => {
    let obj = {
      ...consultantMapping,
      [modelName]: value.value,
    };
    setConsultantMapping(obj);
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    let reqArr = [];

    for (const key in consultantMapping) {
      if (consultantMapping.hasOwnProperty(key)) {
        let eachReqObj = {};

        if (consultantMapping[key] === "New") {
          eachReqObj = {
            name: key,
          };
        } else {
          eachReqObj = {
            id: consultantMapping[key],
            name: key,
          };
        }

        reqArr.push(eachReqObj);
      }
    }

    const requestObj = {
      user_id: userId,
      brand_id: brandId,
      user: reqArr
    }

    // if (reqArr.length === consultantNames?.data?.length) {
      const mappingRes = await submitConsultantMapping({
        body: requestObj,
      });
      if(mappingRes?.statusCode === 201 || 200){        
        fetchConsultantData()
        fetchConsultantNames()
        setIsConfirmationModalOpen(true)
        setIsMapped(true)
      }
    // } else {
    //   setIsModalOpen(true);
    // }
  };

  const dynamicData = Array.from(
    { length: consultantNames?.data?.length },
    (_, index) => ({
      Model: `${consultantNames?.data?.[index].v_consultant_value}`,
      Mapping: (
        <MultipleSelectPlaceholder
          key={index}
          className="dropdownComponent"
          dropdownTitle="Select Consultant"
          options={options}
          handleConsultantMapping={handleConsultantMapping}
          model={`${consultantNames?.data?.[index].v_consultant_value}`}
          isMapped={isMapped}
          setIsMapped={setIsMapped}
        />
      ),
    })
  );

  const dynamicHeaders = ["Consultant", "Mapping"];

  return (
    <Box className="tab-panel-item-nav">
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
            Please map all duplicate consultant names.
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
      <CommonMappingTable
        tableData={dynamicData}
        tableHeaders={dynamicHeaders}
      />
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

export default Consultantmapping;
