"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../../app/layout-with-sidebar";
import CommonMappingTable from "@root/components/CommonMappingTable";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  useGetManyBaseModelControllerModel,
  useModelControllerBrandWiseFilterModel,
  useModelControllerMapping,
  useModelControllerModelName,
} from "@root/backend/backendComponents";
import MultipleSelectPlaceholder from "@root/components/FilterDropdown";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../Modal";

const Modelmapping: React.FC = ({userId, brandId}) => {
  const router = useRouter();
  const [modelMapping, setModelMapping] = useState({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [isMapped, setIsMapped] = useState<boolean>(false);
  const bucketId = searchParams.get("bucketId");
  const fileId = searchParams.get("fileId");

  const { data: modelData, refetch: fetchModelData } = useModelControllerBrandWiseFilterModel({
    queryParams: { brand_id: brandId },
  });
  const { data: modelNames, refetch: fetchModelNames } = useModelControllerModelName({
    queryParams: { p_import_file_id: fileId ? parseInt(fileId) : 2 },
  });
  
  const { mutateAsync: submitModelMapping } = useModelControllerMapping({
    queryParams: { p_import_file_id: fileId ? parseInt(fileId) : 2 },
  });

  let options: any[] = [];

  if (Array.isArray(modelData?.data)) {
    options = modelData?.data?.map((items: any) => ({
      label: items.name,
      value: items.id,
    }));
    options?.sort((a, b) => (a.label > b.label ? 1 : -1));
    options?.unshift({ label: "New", value: "New" });
  }

  const handleModelMapping = (value: number, modelName: string) => {
    let obj = {
      ...modelMapping,
      [modelName]: value.value,
    };
    setModelMapping(obj);
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dynamicData = Array.from(
    { length: modelNames?.data?.length },
    (_, index) => ({
      Model: `${modelNames?.data?.[index].v_model_value}`,
      Mapping: (
        <MultipleSelectPlaceholder
          key={index}
          className="dropdownComponent"
          dropdownTitle="Select Model"
          options={options}
          handleModelMapping={handleModelMapping}
          model={`${modelNames?.data?.[index].v_model_value}`}
          isMapped={isMapped}
          setIsMapped={setIsMapped}
        />
      ),
    })
  );

  const onSubmit = async () => {
    let reqArr = [];

    for (const key in modelMapping) {
      if (modelMapping.hasOwnProperty(key)) {
        let eachReqObj = {};

        if (modelMapping[key] === "New") {
          eachReqObj = {
            name: key,
          };
        } else {
          eachReqObj = {
            id: modelMapping[key],
            name: key,
          };
        }

        reqArr.push(eachReqObj);
      }
    }
    const requestObj = {
      user_id: userId,
      brand_id: brandId,
      model: reqArr
    }
    // if (reqArr.length === modelNames?.data?.length) {
      const mappingRes = await submitModelMapping({
        body: requestObj,
      });
      if(mappingRes?.statusCode === 201 || 200){
        setIsConfirmationModalOpen(true)
        fetchModelData();
        fetchModelNames();
        setIsMapped(true)
      }
      // else {
      //   setIsModalOpen(true)
      // }
      
      // window.location.href = `/bucket-management/list/field-mapping?fileId=${fileId}&bucketId=${bucketId}`
    // } else {
    //   setIsModalOpen(true);
    // }
  };

  const dynamicHeaders = ["Model", "Mapping"];

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
            Please map all duplicate model names.
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

export default Modelmapping;
