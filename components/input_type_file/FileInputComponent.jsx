import React from 'react';

const FileInputComponent = ({ onChange }) => {
    const handleFileChange = (event) => {
        const fileList = event.target.files;
        onChange(fileList);
    };

    return (
        <input type="file" onChange={handleFileChange} />
    );
};

export default FileInputComponent;
