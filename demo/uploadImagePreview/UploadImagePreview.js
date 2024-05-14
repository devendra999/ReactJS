'use client'
import React, { useState } from 'react';

const UploadImagePreview = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(e) {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            if (fileExtension === 'jpg' || fileExtension === 'png') {
                if (selectedFile.size <= 300 * 1024) { // Convert KB to bytes
                    setFile(URL.createObjectURL(selectedFile));
                    setErrorMessage('');
                } else {
                    setFile(null);
                    setErrorMessage('File size exceeds 300 KB.');
                }
            } else {
                setFile(null);
                setErrorMessage('Please select a .jpg or .png file.');
            }
        }
    }

    return (
        <div className="upload">
            <div className="container">
                <h2>Add Image:</h2>
                <input type="file" accept=".jpg,.png" onChange={handleChange} />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {file && <img src={file} style={{ width: '100px', height: '100px', border: '2px solid #000', borderRadius: '100%' }} alt="Preview" />}
            </div>
        </div>
    );
};

export default UploadImagePreview;
