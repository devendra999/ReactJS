import React from 'react';
import FileInputComponent from './FileInputComponent';

const ParentComponent = () => {
    const handleFileChange = (fileList) => {
        // handle the selected file list
    };

    return (
        <div>
            <FileInputComponent onChange={handleFileChange} />
        </div>
    );
};

export default ParentComponent;
