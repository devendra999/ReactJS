import React, { useRef, useState } from 'react'

const UploadImagePreview = () => {
    const [file, setFile] = useState();
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

  return (
    <div className="upload">
        <div className="container">
              <h2>Add Image:</h2>
              <input type="file" onChange={handleChange} />
              <img src={file} style={{ width: '100px', height: '100px', border: '2px solid #000', borderRadius: '100%' }} />
        </div>
    </div>
  )
}

export default UploadImagePreview