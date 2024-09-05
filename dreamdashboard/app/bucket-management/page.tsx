"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import BucketCard from "@root/components/BucketCard";
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
  useImportBucketControllerBrandWiseImportBucketListing,
  useGetManyBaseSheetConfigControllerSheetConfig,
} from "@root/backend/backendComponents";
import { Sheet, SheetConfig } from "@root/backend/backendSchemas";
import { getFromLocalStorage } from "@root/utils/common";
import DifferenceOutlinedIcon from "@mui/icons-material/DifferenceOutlined";
import { useSelector } from "react-redux";
import { reInitialStates } from "@root/utils/globalFunction";
import Loading from "@root/components/Loading";

export default function BucketManagement(props: any) {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const router = useRouter();

  const isSuperAdmin = getFromLocalStorage("@super-admin");
  const superAdmin = Boolean(isSuperAdmin); // Convert the string to a boolean

  let cardData: any[] = [];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bucketName, setBucketName] = useState("");
  const [showErrorModal, setshowErrorModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flag, setFlag] = useState(false);
  const maxBucketNameLength = 255;

  const {
    data: allBuckets,
    refetch: refetchBuckets,
    isLoading: loading1,
  } = useImportBucketControllerBrandWiseImportBucketListing(
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
      refetchBuckets();
    }
  }, [_globalFilter.global_filter.p_brand_id]);

  const rolewiseDisplay = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );

  const { mutateAsync: uploadFileOnS3 } = useImportBucketControllerUploadFile();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleFileModal = () => {
    router.push(`/upload-file`);
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
        formData.append("brandId", _globalFilter.global_filter.p_brand_id);
        const bucketResponse: any = await uploadFileOnS3({
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (bucketResponse?.status == 200) {
          setLoading(false);
          if (bucketResponse?.bucketId) {
            handleCloseModal();
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

  // const buckets: any = (allBuckets as any)?.data;
  (allBuckets as any)?.data?.map((bucket: any) => {
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
      updatedAt: bucket?.updatedAt,
      createdAt: bucket?.createdAt,
      maxCreatedAt: bucket?.maxCreatedAt
    });
  });

  useEffect(() => {
    if (flag) {
      refetchBuckets();
      setFlag(false);
    }
  }, [flag]);

  const flagFunction = (param: any) => {
    setFlag(param);
  };

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
              <PanelHeading className="animate__animated animate__fadeIn" firstHeading={" Create Bucket"} />
              <Box className="mb-3 lg:mb-2 sm:mb-2 animate__animated animate__fadeIn animate__delay-500ms">
                <InputField
                  value={bucketName}
                  name="bucketname"
                  handleChange={handleBucketNameChange}
                  placeholder="Enter Bucket Name (Should not be less than 8 letters)"
                  type="text"
                  className="dropdownComponent-fc rounded-lg bg-white text-blacklight h-12 p-0 shadow-[0_2px_24px_0_rgba(0,0,0,.1)]"
                  variant=""
                  labelname="Bucket Name"
                  maxLength={maxBucketNameLength}
                />
              </Box>
              <Box className="animate__animated animate__fadeIn animate__delay-500ms">
                <FileUpload
                  accept="xls, xlsx"
                  buttonText="Select File"
                  onFileUpload={handleFileUpload}
                  type={"xls"}
                />
              </Box>
              {error && (
                <Box className="w-100 flex justify-center text-red">
                  {error}
                </Box>
              )}
              <Box>
                <Box className="w-100 flex justify-center button-group-data animate__animated animate__fadeIn animate__delay-1s">
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
          <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 flex flex-wrap justify-between items-center">
            {/* <Box className="flex justify-between items-center sm:block"> */}
              <PanelHeading firstHeading={"Bucket Management"} />
              <Box className="btn-list flex item-center justify-end order-2">
                {superAdmin === true ? (
                  <ButtonItem
                    className="containBtn create-btn mx-1"
                    ButtonTitle="Create Bucket"
                    type="button"
                    onClick={handleOpenModal}
                  />
                ) : null}

                {rolewiseDisplay.canImport ? (
                  <ButtonItem
                    className="containBtn create-btn mx-1"
                    ButtonTitle="File Bulk Upload"
                    type="button"
                    onClick={handleFileModal}
                    startIcon={<DifferenceOutlinedIcon />}
                  />
                ) : null}
              </Box>
            {/* </Box> */}
          </Box>

          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
            <Box className="dashboard-sales-items main-view">
              <Box>
                <BucketCard data={cardData} flagFunction={flagFunction} />
              </Box>
            </Box>
          </Box>
        </Box>
      </SidebarWithLayout>
    </>
  );
}
