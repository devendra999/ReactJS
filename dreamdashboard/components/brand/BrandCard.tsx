import React, { useState } from "react";

import EditIconImage from "../../assets/icons/edit.svg";
import SaveIconImage from "../../assets/icons/save-icon.svg";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";

const BrandCard = ({ brand }) => {
  const [brandId, setbrandId] = useState(null);
  const [title, setTitle] = useState('');
  const [isError, setIsError] = useState('');

  const editBrand = (brand) => {
    setbrandId(brand.id);
    setTitle(brand.title);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const saveBrand = (brand) => {
    if(title.length < 8 && title !== '') {
        setIsError('Brand Name should be at least 8 characters long');
    } else if(title === '') {
        setIsError('Please fill your Brand Name');

    } else {
        brand.title = title;
        setTitle('');
        setbrandId(null);
    }
  }

  const clearTitle = () => {
    setTitle('');
    setbrandId(null);
  }


  return (
    <>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Box className="single-brand-card" >
          <Box className="bg-white shadow-md p-[15px] rounded-xl">
            <Box className="flex items-center justify-between">
              <Box className='title'>
                {brandId === null ? (
                  <Typography variant="h5" className="leading-7 font-semibold text-blue">
                      {brand.title}
                  </Typography>
                ) : (
                  <Box>
                      <input value={title} onChange={titleChange} className='border-b outline-none w-full' type="text" />
                      { isError && <Box className='text-red mt-1 error-message w-full leading-3'>{isError}</Box> }
                  </Box>
                )}
              </Box>
              <Box className='right-btn'>
              {brandId === null ? (
                <button
                  onClick={() => editBrand(brand)}
                  className="text-white btn flex items-center text-xs rounded-md"
                >
                  <Image
                    className="filter brightness-0 invert mr-1"
                    src={EditIconImage}
                    width={18}
                    height={18}
                    alt="edit"
                  />{" "}
                  Edit
                </button>
              ) : (
                  <Box className='flex items-center'>
                      <Box onClick={() => clearTitle()}>
                          <HighlightOffOutlinedIcon  className=" text-blue close-icon mr-1 cursor-pointer" />
                      </Box>
                      
                <button
                
                  onClick={() => saveBrand(brand)}
                  className="text-white btn flex items-center text-xs rounded-md"
                >
                  <Image
                    className="filter brightness-0 invert mr-1"
                    src={SaveIconImage}
                    width={18}
                    height={18}
                    alt="edit"
                  />{" "}
                  Save
                </button>
                  </Box>
              )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default BrandCard;
