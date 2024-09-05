"use client";
import React, { useEffect, useState } from "react";
import { Box,Typography } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import SidebarWithLayout from "../layout-with-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import FileUploader from "@root/components/FileUploader";
import {useCreateOneBaseUserControllerUser, useCreateManyBaseBranchUserControllerBranchUser} from "../../backend/backendComponents"
import * as XLSX from 'xlsx';
import ButtonItem from "@root/components/ButtonItem";
import Modal from "@root/components/Modal";

export default function UploadUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUploadStatus, setFileUploadStatus] = useState("");
  const [editUserId, setEditUserId] = useState(searchParams.get("id"));
  const { mutateAsync: createUser, isLoading } = useCreateOneBaseUserControllerUser();
  const { mutateAsync: createBulkBranchUser, isLoading: branchUserLoading } =
  useCreateManyBaseBranchUserControllerBranchUser();

  const handleFileUpload = async (file: File) => {
    setIsModalOpen(true);
    setFileUploadStatus("Please wait... Uploading your file");
    setSelectedFile(file);
  };

  const userBulkUploadFileApi = () => {
    const reader = new FileReader();
    reader.onload = async (event: any) => {
      try {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook?.SheetNames[0];
        const excelData = XLSX?.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
        if (selectedFile != null && excelData && excelData.length > 0) {
          for (const dataObject of excelData) {
            const requestBody = {
              fullName: dataObject?.fullname,
              username: dataObject?.username,
              password: dataObject?.password,
              brandId: dataObject?.brand_id,
              dealerId: dataObject?.dealer_id,
              roleId: dataObject?.roleId,
              duplicateFullName: [dataObject?.fullname],
              isDeleted: false
            };
            try {
              const userResponse = await createUser({
                body: requestBody,
              });

              if (userResponse && userResponse?.data?.id) {
                const requestBodyTwo = [{
                  brandId: dataObject?.brand_id,
                  dealerId: dataObject?.dealer_id,
                  roleId: dataObject?.roleId,
                  userId: parseInt(userResponse?.data?.id),
                  branchId: dataObject?.branch,
                  isDeleted: false
                }];
                const createBranchUserResponse = createBulkBranchUser({
                  body: { bulk: requestBodyTwo },
                });  
              }
              if(userResponse && userResponse?.statusCode == 200) {
                setIsModalOpen(true);
                setFileUploadStatus(userResponse?.message);
              } else  {
                setIsModalOpen(true);
                const error = userResponse?.message
                setFileUploadStatus(error);

              }
            } catch (error) {
              console.error("Error creating user:", error);
              setIsModalOpen(true);
              setFileUploadStatus("Error creating user for one of the rows");
            }
          }
        } else {
          setIsModalOpen(true);
          setFileUploadStatus("No valid data found in the file");
        }
      } catch (error) {
        setIsModalOpen(true);
        console.error("Error processing Excel data:", error);
        setFileUploadStatus("Something went wrong during file upload");
      }
    };

    reader.readAsBinaryString(selectedFile);
  };

  const handleConfirmationCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedFile) {
      userBulkUploadFileApi();
    }
  }, [selectedFile]);

 

  return (
    <>
      <SidebarWithLayout>
        <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        
          <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 upload-user-page res-title-height">
            <PanelHeading firstHeading={"User Bulk Upload"} />
          <Modal
          isOpen={isModalOpen}
          onClose={handleConfirmationCloseModal}
          modalextraclass="modal-small"
        >
          <Box className="modal-main-data">
            <Typography variant="h6" className="note-description text-center">
              {fileUploadStatus}
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
            <Box className="flex flex-start file-btn mt-3">
              <FileUploader
                onFileUpload={(file: File) => handleFileUpload(file)}
              />

            </Box>
  
          </Box>

          

          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4"></Box>
        </Box>
      </SidebarWithLayout>
    </>
  );
}
