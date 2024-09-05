"use client";
import React, { useState, useRef } from "react";
import { PanelHeading } from "@root/components/PanelHeading";
import dynamic from "next/dynamic";
import { Box, Button, Tooltip } from "@mui/material";
import ButtonItem from "@root/components/ButtonItem";
import { Input, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useImportFileControllerUploadMultipleFiles } from "../../backend/backendComponents";
import { useRouter } from "next/navigation";
import { useFileStore } from "@root/store/file-store";
import Modal from "../../components/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SidebarWithLayout from "../layout-with-sidebar";
import IconButtonSingle from "@root/components/IconButtonSingle";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Loading from "@root/components/Loading";
import { getFromLocalStorage } from "@root/utils";

export default function UploadFile(props: any) {
  const router = useRouter();
  const [fileNames, setFileNames] = useState([]);
  const [files, setFiles] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const [showUploadButton, setShowUploadButton] = useState<boolean>(false);
  const { mutateAsync: uploadMultiFile, isLoading: loading } =
    useImportFileControllerUploadMultipleFiles();
  const setFileResponseData = useFileStore(
    (state) => state.setFileResponseData
  );
  const setFileArrayData = useFileStore((state) => state.setFileArrayData);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles: any = Array.from(event.dataTransfer.files);
    handleFileChange(event.dataTransfer.files)
    setFiles(droppedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const brandId = JSON.parse(getFromLocalStorage("@brand-id") || "{}");


  const handleFileChange = async (event: any) => {
    let files = event.target == undefined ? event : event.target.files;

    // let filesArray = event
    let filesArray: any = [...files];

    let data: any = [];
    let exceedingFiles: string[] = [];

    filesArray.forEach((file: { name: any }) => {
      data.push({ fileName: file?.name });

      // Check if file size exceeds 10MB
      if (file.size > 10 * 1024 * 1024) {
        exceedingFiles.push(file.name);
      }
    });

    const maxFileCount = 9;

    let isFileSizeDirectValid = filesArray?.every(
      (file) => file.size <= 10 * 1024 * 1024
    );

    if (filesArray.length > 0) {
      let formData: any = new FormData();
      if (!isFileSizeDirectValid) {
        setIsConfirmationModalOpen(true);
        setInfoMsg(
          exceedingFiles.length > 0
            ? `File sizes of "${exceedingFiles.join(', ')}" should be 10 MB or less`
            : "File size should be 10 MB or less"
        );
        event.target.value = null;
        // Update filesArray after clearing the input
        let { files } = event.target;
        filesArray = [...files];
        formData.delete("files");
        return null;
      }
      if (filesArray.length > maxFileCount) {
        setIsConfirmationModalOpen(true);
        setInfoMsg(
          `You can only upload a maximum of ${maxFileCount} files.`
        );
        event.target.value = null;
        // Update filesArray after clearing the input
        let { files } = event.target;
        filesArray = [...files];
        formData.delete("files");
        return null;
      }
      filesArray.forEach((file: any) => {
        formData.append("files", file);
      });
      formData.append("brandId", brandId?.brandId);
      try {
        const result = await uploadMultiFile({
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (result.status == "200") {
          setFileResponseData(result);
          setFileArrayData(filesArray);
          router.push(`/upload-file/list`);
        } else {
          setIsConfirmationModalOpen(true);
          const error = result.errorMessage;
          setInfoMsg(error);
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      setInfoMsg("File Upload Failed as no file was selected");
      setIsConfirmationModalOpen(true);
    }
    setShowUploadButton(true);
    setFiles(filesArray);
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    if (success) router.push("/upload-file");
  };

  const handleUpload = async () => {
    const maxFileCount = 9;
    const isFileSizeValid = files?.every((file) => file.size <= 10 * 1024 * 1024);
    if (files.length > 0) {
      const formData: any = new FormData();
      if (!isFileSizeValid) {
        setIsConfirmationModalOpen(true);
        setInfoMsg("File size should be 10 MB or less");
        return;
      }
      if (files.length > maxFileCount) {
        setIsConfirmationModalOpen(true);
        setInfoMsg(`You can only upload a maximum of ${maxFileCount} files.`);
        return;
      }
      files.forEach((file: any) => {
        formData.append("files", file);
      });
      formData.append("brandId", brandId?.brandId);
      try {
        const result = await uploadMultiFile({
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (result.status == "200") {
          setFileResponseData(result);
          setFileArrayData(files);
          setIsConfirmationModalOpen(true);
          setInfoMsg("File Successfully Uploaded");
          router.push(`/upload-file/list`);
        } else {
          setIsConfirmationModalOpen(true);
          const error = result.errorMessage;
          setInfoMsg(error);
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      setInfoMsg("File Upload Failed as no file was selected");
      setIsConfirmationModalOpen(true);
    }
  };

  const handleFileRemove = (file: any) => {
    const isExist = files?.some((item) => item === file);
    if (isExist === false) {
      setFiles((prevFileNames) =>
        prevFileNames.filter((fileName) => fileName.name !== file)
      );
    } else {
      console.log("File not found in fileNames");
    }
  };

  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 compare-header rm-space-icon-responsive res-title-height remove-border-title">
          <PanelHeading
            firstHeading={"Drop your files here"}

          />
        </Box>

        <Modal
          isOpen={isConfirmationModalOpen}
          onClose={handleConfirmationCloseModal}
          modalextraclass="modal-small"
        >
          <Box className="modal-main-data">
            <Typography variant="h6" className="note-description text-center">
              {infoMsg}
            </Typography>

            <Box>
              <Box className="w-100 flex justify-center button-group-data">
                <ButtonItem
                  className="outlineBtn mx-1 animate__animated animate__fadeIn animate__delay-600ms"
                  ButtonTitle="Close"
                  type="button"
                  onClick={handleConfirmationCloseModal}
                />
              </Box>
            </Box>
          </Box>
        </Modal>
        {loading && <Loading />}
        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box className="dashboard-sales-items main-view animate__animated animate__fadeIn animate__fast">
            <Box
              className="custom-file flex items-center justify-center min-h-[200px] rounded-[10px] relative overflow-hidden p-[15px] flex-wrap cursor-pointer text-[15px] font-normal text-[#8194aa] bg-[#ebebeb] border border-solid border-[#b6bed1]"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Typography variant="h5" className='text-center w-full' gutterBottom>
                {files.length === 0 ? (
                  <>
                    <CloudUploadIcon className=' text-[96px]' />
                    <Typography variant="h5" component="h5">
                      Select a file or drag and drop here
                    </Typography>
                    <Box className="file-note mt-[12px] mb-[24px] text-xs text-opacity-40">
                      .xls and .xlsx , file size no more than 10MB
                    </Box>
                  </>
                ) : files.length === 1 ? (
                  <span>{files[0].name}</span>
                ) : (
                  <span>{files.length} Files Selected</span>
                )}
              </Typography>
              <Input
                type="file"
                inputProps={{ multiple: true }}
                onChange={handleFileChange}
                title={files?.map((file) => file?.name).join('\n')}
              />
            </Box>

            {/* <Box style={{ marginTop: "30px" }}>
              <ButtonItem
                className="containBtn create-btn mx-1"
                ButtonTitle="Upload"
                type="button"
                onClick={() => handleUpload(files)}

              />
            </Box> */}

            {files && files.length > 0 && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  className='mt-8 base-font-t animate__animated animate__fadeIn'
                >
                  File Name :
                </Typography>

                <ul className="uploaded-files inline-block w-full max-h-[36vh] overflow-y-auto pr-[15px]">
                  {files.map((file: any) => (
                    <li
                      key={file.name}
                      style={{
                        color:
                          file.name.endsWith(".xls") ||
                            file.name.endsWith(".xlsx")
                            ? "#2B2B2B"
                            : "red",
                      }}
                      className=" pl-[35px] pt-[10px] pr-0 pb-[10px] flex  items-center relative break-all justify-between border-b border-solid border-lightgrey_100 animate__animated animate__fadeInUp"
                    >
                      <Box>
                        {file.name.endsWith(".xls") ||
                          file.name.endsWith(".xlsx") ? (
                          <Box className='icon-list absolute left-0 top-1/2 transform -translate-y-1/2'><CheckCircleIcon className="p-[.125rem] text-lightgreen mr-2 min-w-[2rem]" />
                          </Box>


                        ) : (

                          <Box className='icon-list absolute left-0 top-1/2 transform -translate-y-1/2'>
                            <IconButtonSingle
                              onClick={() => handleFileRemove(file.name)}
                              className="swap-button-compare p-1 mr-2"
                              icon={
                                <Tooltip title="Remove" placement="right">
                                  <DeleteForeverRoundedIcon
                                    style={{ color: "red" }}
                                    className="p-[.125rem]"
                                  />
                                </Tooltip>
                              }
                            />
                          </Box>


                        )}

                        <span>{file.name}</span>
                      </Box>
                      {/* {file.name.endsWith('.xls') || file.name.endsWith('.xlsx') ? (
                       <CheckCircleIcon className="ml-1 text-lightgreen" />              
                    ) : (
                      <IconButtonSingle
                      onClick={() => handleFileRemove(file.name)}
                      className="swap-button-compare p-0 ml-2"
                      icon={<HighlightOffIcon style={{ color: "red" }} />}
                    />
                    )} */}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {showUploadButton && (
              <Box className='mt-[20px] mb-[20px]'>
                <ButtonItem
                  className="containBtn create-btn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                  ButtonTitle="Upload"
                  type="button"
                  onClick={() => handleUpload()}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
}
