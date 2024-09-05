"use client";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import SimpleTable from "@root/components/SimpleTable";
import SidebarWithLayout from "../../layout-with-sidebar";
import FileUploader from "@root/components/FileUploader";
import FileUpload from "@root/components/FileUploadComponent";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetOneBaseImportBucketControllerImportBucket,
  useImportFileControllerImportBucketWiseFilesSheets,
  useImportFileControllerUploadFileData,
  useSheetControllerSheetHealthData,
  useSheetControllerSheetValidate,
} from "@root/backend/backendComponents";
import { ImportBucket } from "@root/backend/backendSchemas";
import { Checkbox, FormControlLabel, Typography, Tooltip, IconButton } from "@mui/material";
import ButtonItem from "@root/components/ButtonItem";
import Modal from "../../../components/Modal";
import SheetInfoModal from "@root/components/SheetInfoModal";
import Loading from "@root/components/Loading";
import { PanelHeading } from "@root/components/PanelHeading";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const columns = ["File", "Uploaded Status", "Sheet", "Uploaded On"];

const List = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bucketId = searchParams.get("bucketId");

  const [fileSheetData, setFileSheetData] = useState([]);
  const [sheetId, setSheetId] = useState();
  const [sheetFlag, setSheetFlag] = useState();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fileUploadStatus, setFileUploadStatus] = useState<string | null>(null);
  const [isSheetInfoModalOpen, setIsSheetInfoModalOpen] =
    useState<boolean>(false);
  const [infoSheetId, setInfoSheetId] = useState();
  const [includeInvalidate, setIncludeInvalidate] = useState(false);

  const handleCheckboxChange = (event) => {
    setIncludeInvalidate(event.target.checked);
  };
  let queryParams = {
    id: sheetId,
    is_validate: sheetFlag,
  };

  const { data: currentBucket, refetch: fetchCurrentBucket } =
    useGetOneBaseImportBucketControllerImportBucket(
      {
        pathParams: {
          id: bucketId as unknown as number,
        },
      },
      { enabled: false }
    );
  const {
    data: bucketFileData,
    refetch: fetchBucketData,
    isLoading: loadingBucketFileData,
  } = useImportFileControllerImportBucketWiseFilesSheets(
    {
      pathParams: { id: parseInt(bucketId as string) },
      queryParams: {
        isIncludeInvalidate: includeInvalidate,
      },
    },
    { enabled: false }
  );
  const {
    data: sheetValidate,
    refetch: handleSheetValidate,
    isLoading: loadingSheetValidate,
  } = useSheetControllerSheetValidate(
    {
      queryParams: queryParams,
    },
    {
      enabled: false,
    }
  );
  const { mutateAsync: apiImportFile } =
    useImportFileControllerUploadFileData();

  const { data: sheetHealthData, refetch: getSheetHealthData } =
    useSheetControllerSheetHealthData(
      {
        queryParams: { p_sheet_id: infoSheetId as unknown as number },
      },
      {
        enabled: false,
      }
    );

  const sheetValidationToggle = (sheetId: number, sheetFlag: boolean) => {
    setSheetId(sheetId);
    setSheetFlag(sheetFlag);
  };

  useEffect(() => {
    if (sheetId || sheetFlag) {
      handleSheetValidate();
    }
  }, [sheetFlag, sheetId]);

  useEffect(() => {
    setFileSheetData([]);
    fetchBucketData();
  }, [sheetValidate]);

  useEffect(() => {
    if (infoSheetId) {
      getSheetHealthData();
    }
  }, [infoSheetId]);
  //new function
  const myFunction = () => {
    const apiData = bucketFileData?.data;
    let fileSheetDataCopy = {};

    for (let i = 0; i < apiData.length; i++) {
      let singleFileData = apiData[i];
      let fileId = singleFileData?.importedFileId;

      if (fileSheetDataCopy.hasOwnProperty(fileId)) {
        // File entry already exists, push the sheet info
        fileSheetDataCopy[fileId].sheetInfo.push({
          sheetId: singleFileData?.id,
          inValidate: singleFileData?.isInvalidated,
          sheetName: singleFileData?.configSheetId.sheetName,
          action: singleFileData.isInvalidated ? "Validate" : "Invalidate",
          mapping: "Mapping",
          tooltipData: "Sheet Health Data",
          uploadStatus: singleFileData?.importFile?.uploadStatus,
          errorReason: singleFileData?.importFile?.errorReason,
        });
      } else {
        // Create a new file entry
        fileSheetDataCopy[fileId] = {
          fileName: singleFileData?.importFile?.name,
          fileId: fileId,
          updloadedDate: singleFileData?.importFile?.createdAt,
          sheetInfo: [
            {
              sheetId: singleFileData?.id,
              inValidate: singleFileData?.isInvalidated,
              sheetName: singleFileData?.configSheetId.sheetName,
              action: singleFileData.isInvalidated ? "Validate" : "Invalidate",
              mapping: "Mapping",
              tooltipData: "Sheet Health Data",
              uploadStatus: singleFileData?.importFile?.uploadStatus,
              errorReason: singleFileData?.importFile?.errorReason,
            },
          ],
        };
      }
    }

    // Convert the object to an array of values
    const fileSheetDataArray = Object.values(fileSheetDataCopy).sort((a, b) => b.fileId - a.fileId);

    return fileSheetDataArray;
  };

  const handleFileUpload = async (file: File) => {
    // Handle the uploaded file here
    setIsModalOpen(true);
    setFileUploadStatus("Please wait... Uploading your file");
    setSelectedFile(file);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const callUploadFileApi = async () => {
    // console.warn("Uploading file", selectedFile);
    if (selectedFile != null && currentBucket) {
      try {
        const formData: any = new FormData();
        formData.append("file", selectedFile);
        formData.append("bucketName", currentBucket?.name);
        formData.append("bucketId", currentBucket?.id);
        formData.append("bucket", JSON.stringify(currentBucket));
        const fileResponse: any = await apiImportFile({
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log("File Response", fileResponse);
        if (fileResponse?.status == "200") {
          setFileUploadStatus("File uploaded successfully");
          setIsModalOpen(true);
          fetchBucketData();
        } else if (
          fileResponse?.status == "500" ||
          fileResponse?.errorMessage
        ) {
          setFileUploadStatus(fileResponse?.errorMessage);
        } else {
          setFileUploadStatus(
            `File upload Failed : ${fileResponse?.response[0]?.errorMessage}`
          );
        }
      } catch (error) {
        setIsModalOpen(true);
        // console.error(error);
        setFileUploadStatus("Something went wrong during file upload");
      }
    } else {
      setIsModalOpen(true);
      setFileUploadStatus("File Upload Failed as no file was selected");
    }
  };

  const HandleSheetInfoPopup = (flag, sheetId) => {
    setIsSheetInfoModalOpen(flag);
    setInfoSheetId(sheetId);
  };

  useEffect(() => {
    if (selectedFile) {
      callUploadFileApi();
    }
  }, [selectedFile]);

  useEffect(() => {
    if (bucketFileData) {
      // console.log('use effect: bucketFileData', bucketFileData);
      const fileSheetDataCopy = myFunction();
      setFileSheetData([...fileSheetDataCopy]);
      fetchBucketData();
    }
  }, [bucketFileData]);

  useEffect(() => {
    // console.log('use effect: currentBucket', currentBucket);

    fetchCurrentBucket();
    // console.log("Fetching current bucket");
    fetchBucketData();
  }, [currentBucket]);

  //for the checkbox
  useEffect(() => {
    fetchBucketData();
  }, [includeInvalidate]);

  return (
    <>
      <SidebarWithLayout>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          modalextraclass="modal-small text-center"
        >
          <Box>
            <Typography className="text-center" variant="h6">
              {fileUploadStatus}
            </Typography>
            <ButtonItem
              className="containBtn mt-5"
              ButtonTitle="Close"
              type="button"
              onClick={handleCloseModal}
            />
          </Box>
        </Modal>
        {infoSheetId && (
          <SheetInfoModal
            isSheetInfoModalOpen={isSheetInfoModalOpen}
            HandleSheetInfoPopup={HandleSheetInfoPopup}
            sheetHealthData={sheetHealthData?.data?.[0]}
          />
        )}

        <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative file-upload-page">
          {loadingBucketFileData ? (
            <Loading />
          ) : (
            <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 file-upload">
              <PanelHeading
                firstHeading={`Upload Files - ${currentBucket?.name}`}
              />

              <Box className="flex flex-start file-btn order-2">
                <Box>
                  <Box className="checkbox-item small-checkbox-item">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={includeInvalidate}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Include Invalidate Sheet"
                    />
                  </Box>
                </Box>
                <FileUploader
                  bucket={currentBucket as ImportBucket}
                  onFileUpload={(file: File) => handleFileUpload(file)}
                />
                <Box className="backarrow-set user-back cust-back order-2">
                  <Tooltip title="Back To Bucket Management">
                    <IconButton onClick={() => router.push(`/bucket-management`)} className='p-1'>
                      <ArrowBackIcon className="text-skyblue text-lg " />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

            </Box>

          )}

          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
            <Box className="dashboard-sales-items bck-upload">
              <SimpleTable
                columns={columns}
                rows={fileSheetData}
                sheetValidationToggle={sheetValidationToggle}
                bucketId={bucketId}
                HandleSheetInfoPopup={HandleSheetInfoPopup}
              />
            </Box>
          </Box>
        </Box>
      </SidebarWithLayout>
    </>
  );
};
export default List;
