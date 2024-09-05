import React, { useState, useRef, useEffect } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "../../public/assets/icons/trash.svg";
import Image from "next/image";
import axios from "axios";
import { useGetManyBaseDealersControllerDealers } from "@root/backend/backendComponents";

interface FileUploadProps {
  accept?: string;
  buttonText: string;
  onFileUpload: (file: File | null) => void;
  allowedExtensions?: string[];
  type: string;
  imagePath?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  buttonText,
  onFileUpload,
  type,
  imagePath,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorFile, setErrorFile] = useState(false);
  const [fileImage, setFileImage] = useState<string | null>(null);
  const [fileImageMenu, setFileImageMenu] = useState<string | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0] || null;
    setFileName(file?.name || null);
    onFileUpload(file);
    validateFile(file);
    if (imagePath == "homePageLogo") {
      setFileImage(
        file && file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null
      );
    } else {
      setFileImageMenu(
        file && file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null
      );
    }
    setIsFileUploaded(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
      validateFile(file);
      if (file && file.type.startsWith("image/")) {
        if (imagePath == "homePageLogo") {
          setFileImage(URL.createObjectURL(file));
        } else {
          setFileImageMenu(URL.createObjectURL(file));
        }
      } else {
        setFileImage(null);
        setFileImageMenu(null);
      }
      setIsFileUploaded(true);
    } else {
      setFileName(null);
      onFileUpload(null);
      setFileImageMenu(null);
      setFileImage(null);
      setIsFileUploaded(false);
    }
  };

  const validateFile = (file: File | null) => {
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const allowedExtensions =
        accept?.split(",").map((ext) => ext.trim().toLowerCase()) || [];

      if (
        type === "xls" &&
        !allowedExtensions.includes(fileExtension as string)
      ) {
        setErrorFile(true);
        setFileName(
          "Invalid file type. Only .xls and .xlsx files are allowed."
        );
      } else if (
        type === "image" &&
        !allowedExtensions.includes(fileExtension as string)
      ) {
        setErrorFile(true);
        setFileName("Invalid file type. Only PNG and JPEG files are allowed.");
      } else if (type === "image" && file.size > 2 * 1024 * 1024 ) { // Check if file size is more than 2MB
        setErrorFile(true);
        setFileName("File size exceeds the maximum allowed size of 2MB.");
      } 
      else {
        setErrorFile(false);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteButtonClick = () => {
    if (imagePath == "menubarlogo" && fileImageMenu) {
      setFileImageMenu(null);
    }
    if (imagePath == "homePageLogo" && fileImage) {
      setFileImage(null);
    }
    setFileName(null);
    onFileUpload(null);
    setIsFileUploaded(false);
  };

  const { data: dealers, refetch: fetchDealers } =
    useGetManyBaseDealersControllerDealers(
      {
        queryParams: {},
      },
      {
        enabled: false,
      }
    );

  // const deleteMenuLogo = async (param: any, imagePath: any) => {
  //   const formData = new FormData();
  //   formData.append("remove_file_path", imagePath);
  //   try {
  //     const response = await fetch("/api/delete?flag=" + param, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     console.log(JSON.stringify(data));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const sendMenubarLogo = (param: any) => {
    if (param) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `/api/${param}?flag=menu`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          setIsFileUploaded(true);
          setFileImageMenu(`/api/${param}?flag=menu`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sendHomePageLogo = (param: any) => {
    if (param) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `/api/${param}?flag=brand`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          setIsFileUploaded(true);
          setFileImage(`/api/${param}?flag=brand`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname === "/management-new" &&
      Array.isArray(dealers) &&
      dealers.length > 0
    ) {
      if (dealers[0]?.logoUrl !== null) {
        sendMenubarLogo(dealers[0]?.logoUrl);
      }
      if (dealers[0]?.brandPageLogo !== null) {
        sendHomePageLogo(dealers[0]?.brandPageLogo);
      }
    }
  }, [dealers]);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: "inline-block",
        position: "relative",
        border: isDragOver
          ? ".0625rem dashed blue"
          : ".0625rem dashed rgba(0,0,0,0.2)",
        borderRadius: ".625rem",
        cursor: "pointer",
      }}
      className="drag-box-content w-full text-center"
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      {isFileUploaded &&
      imagePath &&
      !errorFile &&
      fileImage &&
      imagePath == "homePageLogo" ? (
        <Box className="upload-img">
          <img
            src={fileImage}
            alt="Uploaded Image"
            style={{
              maxWidth: "100%",
              width: "100%",
              maxHeight: "156px",
              objectFit: "contain",
            }}
          />

          <IconButton
            onClick={handleDeleteButtonClick}
            size="small"
            style={{ position: "absolute", bottom: "-36px", right: "-7px" }}
          >
            <Image src={DeleteIcon} width={24} height={24} alt="Delete" />
          </IconButton>
        </Box>
      ) : isFileUploaded &&
        imagePath &&
        !errorFile &&
        fileImageMenu &&
        imagePath == "menubarlogo" ? (
        <Box className="upload-img">
          <img
            src={fileImageMenu}
            alt="Uploaded Image"
            style={{
              maxWidth: "100%",
              width: "100%",
              maxHeight: "156px",
              objectFit: "contain",
            }}
          />

          <IconButton
            onClick={handleDeleteButtonClick}
            size="small"
            style={{ position: "absolute", bottom: "-36px", right: "-7px" }}
          >
            <Image src={DeleteIcon} width={24} height={24} alt="Delete" />
          </IconButton>
        </Box>
      ) : (
        <>
          <Box className="icon-upload mb-2 text-center">
            <Box className="upload-image-iconbg h-[64px] w-[64px] inline-block bg-contain z-[-1]"></Box>
          </Box>
          <Typography
            component="span"
            className="select-label text-sm text-black"
          >
            Select a file or drag and drop here
          </Typography>

          {accept && type === "xls" ? (
            <Typography
              variant="caption"
              component="div"
              className="file-note text-xs mt-[12px] mb-[24px]"
            >
              .xls and .xlsx, file size no more than 10MB
            </Typography>
          ) : null}

          {accept && type === "image" && (
            <>
              <Typography
                variant="caption"
                component="div"
                className="file-note text-xs mt-[12px] mb-[24px]"
              >
                {/* Custom message for image type */}
                PNG, JPEG and JPG, file size no more than 2MB
              </Typography>
              <Button
                variant="contained"
                component="label"
                className="btn outlineBtn mx-1 outline-small-blue"
                onClick={handleButtonClick}
              >
                {buttonText}
              </Button>
            </>
          )}
        </>
      )}

      {window.location.pathname == "/bucket-management" &&
        (!errorFile || errorFile || !isFileUploaded) && (
          <Button
            variant="contained"
            component="label"
            className="btn outlineBtn mx-1 outline-small-blue"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button>
        )}

      {isDragOver && <Box>{/* Drop file here */}</Box>}

      {fileName !== null && (
        <Typography
          variant="body2"
          className={`selected-file-name break-words text-xs mt-[20px] ${
            errorFile ? "text-red" : ""
          }`}
        >
          {fileName}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
