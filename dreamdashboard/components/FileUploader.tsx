import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { ImportBucket } from "@root/backend/backendSchemas";
import { getFromLocalStorage } from "@root/utils";

interface FileUploaderProps {
  bucket: ImportBucket;
  onFileUpload: (file: File | null) => void;
}

const FileUploader = (props: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const rolewiseDisplay = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    // Clear previous error message
    setErrorMessage(null);

    // Validate file type
    if (file != null) {
      const allowedFileTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];

      if (!allowedFileTypes.includes(file.type)) {
        setErrorMessage(
          "Invalid file type. Please upload a .xls or .xlsx file."
        );
        return;
      }
      props.onFileUpload(file);
      // Handle the valid file
      event.target.value = "";
    }
  };

  return (
    rolewiseDisplay.canImport && (
      <div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".xls, .xlsx"
        />
        <Button
          className="common-btn shadow-2 bg-white flex text-black capitalize rounded-lg py-2.5 px-[13px]"
          onClick={handleButtonClick}
          startIcon={<UploadFileOutlinedIcon />}
        >
          Upload File
        </Button>
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
      </div>
    )
  );
};

export default FileUploader;
