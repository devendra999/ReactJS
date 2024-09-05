import React, { useState, useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import Image from 'next/image';
import UploadImage from '../assets/images/feather_upload-cloud.svg';

interface FileUploadProps {
    accept?: string;
    buttonText: string;
    message?: string;
    onFileUpload: (file: File | null) => void;
    allowedExtensions?: string[];
}

const AllFileUpload: React.FC<FileUploadProps> = ({ message, accept, buttonText, onFileUpload }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errorFile, setErrorFile] = useState(false);

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

        const droppedFile = event.dataTransfer.files?.[0] || null;
        setFile(droppedFile);
        onFileUpload(droppedFile);
        validateFile(droppedFile);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        onFileUpload(selectedFile);
        validateFile(selectedFile);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const validateFile = (file: File | null) => {
        if (file) {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            const allowedExtensions = accept?.split(',').map((ext) => ext.trim().toLowerCase()) || [];

            if (!allowedExtensions.includes(fileExtension as string)) {
                setErrorFile(true);
            } else {
                setErrorFile(false);
            }
        }
    };

    return (
        <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                display: 'inline-block',
                position: 'relative',
                border: isDragOver ? '.0625rem dashed blue' : '.0625rem dashed rgba(0,0,0,0.2)',
                borderRadius: '.625rem',
                cursor: 'pointer',
            }}
            className="drag-box-content w-full text-center"
        >
            <input type="file" accept={accept} onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />

            <Box>
                {file && file.type.startsWith('image') ? (
                    <img src={URL.createObjectURL(file)} alt="uploaded-image" style={{ width: '100%' }} />
                ) : (
                    <Box className="icon-upload mb-2 text-center">
                        <Image src={UploadImage} width={62} height={62} alt="upload-image" className="mx-auto" />
                    </Box>
                )}
                <Typography component="span" className="select-label text-sm text-black">
                   {message ? message : "Select an image or drag and drop here"}
                </Typography>

                {accept && (
                    <Typography variant="caption" component="div" className="file-note text-xs mt-[12px] mb-[24px]">
                       Allowed file types: {accept}, maximum file size: 10MB
                    </Typography>
                )}
            </Box>

            <Box>
                <Button
                    variant="contained"
                    component="label"
                    className="btn outlineBtn mx-1 outline-small-blue"
                    onClick={handleButtonClick}
                >
                    {buttonText}
                </Button>
                <input type="file" accept={accept} onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
            </Box>

            {isDragOver && (
                <Box>
                    {/* Drop file here */}
                </Box>
            )}
        </Box>
    );
};

export default AllFileUpload;
