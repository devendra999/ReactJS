import React, { useRef, useState } from 'react'
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const EitherImageOrText = () => {
    const value = useRef();
    const [item, setitem] = useState(false);
    const [textValue, settextValue] = useState('');
    const [file, setFile] = useState();

    const handleChange = (e) => {
        console.log(e);
        let text = document.getElementById('text');
        let avtar = document.getElementById('avtar');
        if(e.target.checked == false) {
            text.style.display = 'block';
            avtar.style.display = 'none';
            setitem(false);
        } else {
            text.style.display = 'none';
            avtar.style.display = 'block';
            setitem(true);
        }
        
    }

    const getValue = (e) => {
        let textItem =  e.target.value;
        settextValue(textItem)
    }

    const imagePreview = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }


  return (
    <>
        <div className="eitherimageortext">
            <div className="container">
                <div className="row">
                    <div className="" style={{ width: '50%' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className="text">Text</div>
                              <Switch {...label} ref={value} onChange={handleChange} />
                                <div className="avtar">Image</div>
                          </div>
                    </div>

                    <div className="" style={{ marginTop: '100px', width: '50%' }}>
                        <div id="preview" style={{ width: '100px', height: '100px', borderRadius: '100%', border: '2px solid #000',
                              display: 'flex',
                              alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          textTransform: 'uppercase',
                    }}>
                              {!item ? textValue : <img style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                              objectPosition: 'center',
                                  borderRadius: '100%',
                              }} src={file} /> }
                        </div>
                    </div>
                    
                    <div className="" style={{ width: '50%' }}>
                          <div id="text">
                              <input type="text" onChange={getValue} maxLength={2} style={{ border: '1px solid #000' }} />
                          </div>
                          <div id="avtar" style={{display: 'none'}}>
                              <input type="file" onChange={imagePreview} />
                          </div>  
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EitherImageOrText