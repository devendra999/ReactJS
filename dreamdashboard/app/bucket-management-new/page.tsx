"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material"; 
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../layout-with-sidebar";
import Modal from "../../components/Modal";
import InputField from "@root/components/InputField";
import FileUpload from "@root/components/FileUploadComponent";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";
import {
  useImportBucketControllerUploadFile,
  // useGetManyBaseImportBucketControllerImportBucket,
  useImportBucketControllerBrandWiseImportBucketListing,
  useGetManyBaseSheetControllerSheet,
  useGetManyBaseSheetConfigControllerSheetConfig,
} from "@root/backend/backendComponents";
import { Sheet, SheetConfig } from "@root/backend/backendSchemas";
import { getFromLocalStorage } from "@root/utils/common";
import BucketCardNew from "@root/components/BucketCardNew";

export default function BucketManagement(props: any) {
  const router = useRouter();

  const isSuperAdmin = getFromLocalStorage("@super-admin");
  const superAdmin = Boolean(isSuperAdmin); // Convert the string to a boolean

  // let brand = null;
  // try {
  //   brand = brandIdString ? JSON.parse(super-admin) : null;
  // } catch (error) {
  //   console.error("Error parsing JSON:", error);
  // }
  // const id = brand?.brandId;

  let cardData: any[] = [];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bucketName, setBucketName] = useState("");
  const [showErrorModal, setshowErrorModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flag, setFlag] = useState(false);
  const maxBucketNameLength = 255;

  const brandId = JSON.parse(getFromLocalStorage("@brand-id") || "{}");
  const { data: allBuckets, refetch: refetchBuckets } =
    useImportBucketControllerBrandWiseImportBucketListing({
      pathParams: { brandId: brandId.brandId as number },
    });
  const { mutateAsync: uploadFileOnS3 } = useImportBucketControllerUploadFile();
  // const {data: sheetData} = useGetManyBaseSheetControllerSheet({queryParams: {}});
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const { data: configSheetData } =
    useGetManyBaseSheetConfigControllerSheetConfig({ queryParams: {} });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setshowErrorModal(false);
    setSelectedFile(null);
    setError(null);
    setBucketName("");
  };

  const handleFileUpload = (file: File | null) => {
    // Handle the uploaded file here
    setError(null);
    setSelectedFile(file);
  };

  const handleErrorModal = () => {
    setshowErrorModal(true);
  };

  const handleSaveBucketFile = async () => {
    setLoading(true);
    setError(null);
    try {
      if (bucketName.trim().length < 8) {
        throw new Error("Bucket name must be at least 8 characters");
      }
      if (selectedFile != null) {
        const formData: any = new FormData();
        formData.append("file", selectedFile);
        formData.append("bucketName", bucketName);
        formData.append("brandId", brandId.brandId as number);
        const bucketResponse: any = await uploadFileOnS3({
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (bucketResponse?.status == 200) {
          setLoading(false);
          // if (bucketResponse?.fileId && bucketResponse?.bucketId) {
          if (bucketResponse?.bucketId) {
            handleCloseModal();
            // router.push(`/sheet-mapping?bucketId=${bucketResponse?.bucketId}&fileId=${bucketResponse?.fileId}`);
            router.push(`/sheet-mapping?bucketId=${bucketResponse?.bucketId}`);
          } else {
            setError("Could not fetch bucket information");
          }
        } else {
          setLoading(false);
          setError(bucketResponse?.errorMessage);
        }
      }
    } catch (error: any) {
      setError("Something went wrong while creating bucket, Please try again");
      setLoading(false);
    }
  };

  const handleBucketNameChange = (bucket: any) => {
    setError(null);
    const value = bucket["bucketname"].trim();
    if (value.length <= maxBucketNameLength) {
      setBucketName(value);
    }
  };

  const buckets: any = allBuckets?.data;
  buckets?.map((bucket: any) => {
    const sheets: string[] = [];
    (configSheetData as any)?.map((sheet: SheetConfig) => {
      if (sheet.importBucketId == bucket?.id) {
        sheets.push(sheet.sheetName);
      }
      return;
    });
    cardData.push({
      title: bucket?.name,
      list: sheets || [],
      bucketId: bucket?.id,
      noOfSheets: bucket?.noOfSheet,
      updatedAt:bucket?.updatedAt,
      createdAt: bucket?.createdAt
    });
  });

  useEffect(() => {
    if (flag) {
      refetchBuckets();
      setFlag(false);
    }
  }, [flag]);

  const flagFunction = (param:any) => {
    setFlag(param);
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalextraclass="modal-small"
      >
        <Box className="modal-wrap-item">
          {showErrorModal ? (
            <Box className="modal-error ">
              <Box className="modal-error-in">
                <Box className="icondata">
                  <CancelIcon className="text-red" />
                </Box>

                <PanelHeading
                  firstHeading={"something went wrong"}
                  className="text-red"
                />

                <Typography variant="body1" className="note-description">
                  Lorem ipsum dolor sit amet consectetur. Viverra egestas cras a
                  pulvinar sodales faucibus non. Nulla tempor tempor egestas
                  enim tincidunt vitae.
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
            </Box>
          ) : (
            <Box className="modal-main-data">
              <PanelHeading firstHeading={" Create Bucket"} />
              <InputField
                value={bucketName}
                name="bucketname"
                handleChange={handleBucketNameChange}
                placeholder="Enter Bucket Name (Should not be less than 8 letters)"
                type="text"
                className="dropdowncomponent-fc"
                variant=""
                labelname="Bucket Name"
                maxLength={maxBucketNameLength}
              />
              <Box>
                <FileUpload
                  accept="xls, xlsx"
                  buttonText="Select File"
                  onFileUpload={handleFileUpload}
                />
              </Box>
              {error && (
                <Box className="w-100 flex justify-center text-red">
                  {error}
                </Box>
              )}
              <Box>
                <Box className="w-100 flex justify-center button-group-data">
                  <ButtonItem
                    className="outlineBtn mx-1"
                    ButtonTitle="Cancel"
                    type="button"
                    onClick={handleCloseModal}
                  />
                  <ButtonItem
                    className="containBtn mx-1"
                    ButtonTitle="Save"
                    type="button"
                    disabled={
                      bucketName.length < 8 ||
                      selectedFile == null ||
                      bucketName.length > maxBucketNameLength ||
                      error != null
                    }
                    loading={loading}
                    onClick={handleSaveBucketFile}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>

      <SidebarWithLayout>
        <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
          <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4">
            <Box className="flex justify-between items-center sm:block">
              <PanelHeading firstHeading={"Bucket Management V2"} />
              {superAdmin === true ? (
                <ButtonItem
                  className="containBtn create-btn mx-1"
                  ButtonTitle="Create Bucket"
                  type="button"
                  onClick={handleOpenModal}
                />
              ) : null}
            </Box>
          </Box>

          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
            <Box className="dashboard-sales-items main-view">
              <Box>
                <BucketCardNew data={cardData} flagFunction={flagFunction} />
              </Box>
            </Box>
          </Box>
        </Box>
      </SidebarWithLayout>
    </>
  );
}
