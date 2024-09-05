"use client";
import React, { useEffect, useState } from "react";
import { PanelHeading } from "@root/components/PanelHeading";
import dynamic from "next/dynamic";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ButtonItem from "@root/components/ButtonItem";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFileStore } from "@root/store/file-store";
import { useImportFileControllerUploadFileData } from "../../../backend/backendComponents";
import Modal from "../../../components/Modal";
import { useRouter } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ClearIcon from "@mui/icons-material/Clear";
const SidebarWithLayout = dynamic(() => import("../../layout-with-sidebar"));
import CancelIcon from "@mui/icons-material/Cancel";
import Loading from "@root/components/Loading";

export default function List() {
  const router = useRouter();

  const [selectedValues, setSelectedValues] = useState({});
  // let fileResponseData = useFileStore((state) => state.fileResponseData);
  const { fileResponseData, setFileResponseData } = useFileStore((state) => ({
    fileResponseData: state.fileResponseData,
    setFileResponseData: state.setFileResponseData, // Replace this with the actual name in your hook
  }));
  const fileArrayData = useFileStore((state) => state.fileArrayData);
  const [fileUploadStatus, setFileUploadStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState([]);
  const [isError, setIsError] = useState([]);
  const [isFileSuccess, setIsFileSuccess] = useState([]);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const [isAllValue, setIsAllValue] = useState<boolean>(false);

  const { mutateAsync: apiImportFile, isLoading: loading } =
    useImportFileControllerUploadFileData();

  const handleDropdownChange = (
    event: SelectChangeEvent<number>,
    index: any,
    rowIndex: any
  ) => {
    const selectedId = event.target.value;
    let selectedBucket = null;
    fileResponseData.response.some((responseItem: any) => {
      selectedBucket = responseItem.bucketInfo.bucket.find(
        (option: any) => option.id === selectedId
      );
      return selectedBucket;
    });

    if (selectedBucket) {
      if (selectedValues.hasOwnProperty(index)) {
        const stateCopy = { ...selectedValues };
        stateCopy[`${index}`] = {
          id: selectedBucket.id,
          name: selectedBucket.name,
          fileIndex: index,
          bucketFullData: selectedBucket.bucketFullData,
        };
        setSelectedValues(stateCopy);
      } else {
        setSelectedValues({
          ...selectedValues,
          [`${index}`]: {
            id: selectedBucket.id,
            name: selectedBucket.name,
            fileIndex: index,
            bucketFullData: selectedBucket.bucketFullData,
          },
        });
      }
    }
    setButtonDisable(true)
  };



  useEffect(()=>{
    if(Object.keys(fileResponseData).length <= 0) {
      router.push(`/upload-file`)
    }
  },[])

  const callUploadFileApi = async () => {
    let selectedValueArray = Object.values(selectedValues) as any[];
    let success = [];
    let error = [];
    if (fileArrayData.length > 0) {
      const filteredArray = selectedValueArray.filter(
        (item) => !isFileSuccess.flat()?.includes(item?.id)
      );
      selectedValueArray = filteredArray;
      for (let i = 0; i < selectedValueArray.length; i++) {
        const formData: any = new FormData();
        formData.append("file", fileArrayData[selectedValueArray[i].fileIndex]);
        formData.append("bucketName", selectedValueArray[i]?.name);
        formData.append("bucketId", selectedValueArray[i]?.id);
        formData.append(
          "bucket",
          JSON.stringify(selectedValueArray[i].bucketFullData)
        );

        try {
          const fileResponse: any = await apiImportFile({
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (fileResponse?.status == "200") {
            success.push(selectedValueArray[i]?.id);
          } else if (
            fileResponse?.status == "500" ||
            fileResponse?.errorMessage
          ) {
            error.push(selectedValueArray[i]?.id);
          } else if (
            fileResponse?.status == "400" ||
            fileResponse?.errorMessage
          ) {
            error.push(selectedValueArray[i]?.id);
          }
           else {
            setFileUploadStatus(
              `File upload Failed : ${fileResponse?.response[0]?.errorMessage}`
            );
          }
        } catch (error) {
          setIsModalOpen(true);
          setFileUploadStatus("Something went wrong during file upload");
        }
      }
    } else {
      setFileUploadStatus("File Upload Failed as no file was selected");
      setIsModalOpen(true);
    }

    if (success.length > 0 && error.length > 0) {
      setFileUploadStatus("Some Files have error in Uploading.");
      setIsModalOpen(true);
      router.push(`/upload-file/list`);
    } else if (success.length > 0) {
      setFileUploadStatus("This File uploaded successfully");
      setIsModalOpen(true);
      router.push(`/upload-file/list`);
    } else if (error.length > 0) {
      setFileUploadStatus("This File is not uploaded successfully");
      setIsModalOpen(true);
      router.push(`/upload-file/list`);
    }

    setIsSuccess(success);
    setIsFileSuccess((prevValues) => {
      if (Array.isArray(success) && success.length > 0) {
        const newValues = [...prevValues, ...success];
        return newValues;
      } else {
        return prevValues;
      }
    });
    setIsError(error);
  };

  useEffect(() => {
    if (
      Object.keys(selectedValues).length ===
        fileResponseData?.response?.length &&
      isFileSuccess?.length === fileResponseData?.response?.length
    ) {
      console.log("hello enter handle file upload");
      setFileUploadStatus("File uploaded successfully");
      setIsModalOpen(true);
      setIsAllValue(true)
    }
  }, [isFileSuccess]);


  const handleClearSelection = (event: any, index: any) => {
    const updatedValues = { ...selectedValues };
    delete updatedValues[index];

    setSelectedValues(updatedValues);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if(isAllValue) {
      router.push(`/bucket-management`);
      setFileResponseData('');
    }
  };

  return (
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
            className="containBtn mt-5 animate__animated animate__fadeIn animate__delay-1s"
            ButtonTitle="Close"
            type="button"
            onClick={handleCloseModal}
          />
        </Box>
      </Modal>
      {loading && <Loading />} 
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 filt-kpi res-title-height flex flex-wrap items-center">
          {/* <Box className="flex items-center sm:block"> */}
            <PanelHeading firstHeading={"Drop files data"} />
          {/* </Box> */}
        </Box>
        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box className="dashboard-sales-items main-view ">
            <TableContainer
              component={Paper}
              className="upload-page sm-scroll-table bg-white overflow-y-auto shadow-none w-full select-common "
              style={{ borderRadius: "16px" }}
            >
              <Table
                className="simple-table upload-table animation-table-item"
                aria-label="simple table"
              >
                <TableHead className="card-header bg-gradient-blue">
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell>Sheet Name</TableCell>
                    <TableCell>Bucket Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-body">
                  {fileResponseData?.response?.map((row: any, index: any) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.bucketInfo.excelName}</TableCell>
                      <TableCell>
                        {row.bucketInfo.sheetNames.map(
                          (sheetName: any, sheetIndex: any) => (
                            <span key={sheetIndex}>{sheetName} </span>
                          )
                        )}
                      </TableCell>

                      <TableCell>
                        <Box className="flex items-center">
                          <FormControl fullWidth>
                            <InputLabel
                              size="small"
                              id="demo-simple-select-label"
                            >
                              select bucket
                            </InputLabel>
                            <Select
                              className='min-w-[110px]'
                              size="small"
                              label="select bucket"
                              defaultValue={selectedValues[row.id] || ""}
                              onChange={(event) =>
                                handleDropdownChange(event, index, row.id)
                              }
                              disabled={
                                isFileSuccess
                                  .flat()
                                  .includes(selectedValues[`${index}`]?.id) ||
                                row.bucketInfo?.bucket?.length === 0
                              }
                            >
                              <MenuItem
                                value=""
                                className="cross-icon-select light-bg bg-grey100 opacity-[0.4]"
                                onClick={(event) =>
                                  handleClearSelection(event, index)
                                }
                              >
                                <Box
                                  onClick={(event) =>
                                    handleClearSelection(event, index)
                                  }
                                >
                                  <Box className="flex items-center">
                                    <CancelIcon
                                      className="text-greylight mr-1"
                                      sx={{ fontSize: "1.1rem" }}
                                    />{" "}
                                    Clear
                                  </Box>
                                </Box>
                              </MenuItem>

                              {row.bucketInfo.bucket.map((option: any) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>

                            {row.bucketInfo?.bucket?.length === 0 && (
                              <Box className="error-msg pl-1">
                                0 bucket matched
                              </Box>
                            )}
                          </FormControl>

                          {isFileSuccess
                            .flat()
                            .includes(selectedValues[`${index}`]?.id) && (
                            <CheckCircleIcon className="ml-1 text-lightgreen" />
                          )}
                          {isError.includes(selectedValues[`${index}`]?.id) && (
                            <HighlightOffIcon className="ml-1 text-red" />
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box style={{ marginTop: "30px" }}>
              <ButtonItem
                className="containBtn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                ButtonTitle="Submit"
                type="button"
                onClick={() => callUploadFileApi()}
                disabled={buttonDisable ? false : true}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
}
