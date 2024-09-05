import React, { useState, useRef, useEffect } from "react";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";

import { Card, Typography, Box, Popover } from "@mui/material";
// import ButtonItem from "./ButtonItem";
// import InputField from "./InputField";
import { useForm, SubmitHandler } from "react-hook-form";

import dynamic from "next/dynamic";

const ButtonItem = dynamic(() => import("./ButtonItem"));
const InputField = dynamic(() => import("./InputField"));

type FormData = {
  email: string;
  remarks: string;
};

interface ShareDataProps {
  handleCaptureClick: (param1: any, param2: any) => void;
}

const ShareData: React.FC<ShareDataProps> = (props: any) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [remarks, setRemarks] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
        setEmail("");
        setRemarks("");
        setIsError(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        setToggle(false);
        setEmail("");
        setRemarks("");
        setIsError(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // const openModal = () => {
  //   setToggle(!toggle);
  // };

  // const closeModal = () => {
  //   setToggle(false);
  //   setEmail("");
  //   setRemarks("");
  //   setIsError(false);
  // };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
    setEmail("");
    setRemarks("");
    setIsError(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleEmailChange = (event: any) => {
    setEmail(event?.email);
  };
  const handleRemarkChange = (event: any) => {
    setRemarks(event?.remarks);
  };

  function validateEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  // const validateMobileNumber = (number) => {
  //   // Regular expression to validate mobile numbers (can be adjusted for specific formats)
  //   const regex = /^(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  
  //   // Test the input number against the regex
  //   return regex.test(number);
  // };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const emailArray = email?.split(",").map((email) => email.trim());

    const validatedEmails = emailArray?.filter((email) => {
      return email !== "" && validateEmail(email);
    });

    if (
      (validatedEmails as any)?.length > 0 &&
      validatedEmails !== undefined &&
      remarks !== "" &&
      remarks !== undefined
    ) {
      // closeModal();
      handlePopoverClose();
      props?.handleCaptureClick(validatedEmails, remarks);
      setEmail("");
      setRemarks("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.classList.add("html-line-height");

      //document.documentElement.classList.remove('list-wrapper');
    } else {
      // console.log('errrorrrrrr');
      setIsError(true);
    }
  };

  return (
    <>
      <Box className="filter-icons share-email ml-1.5">
        <ShareIcon onClick={handlePopoverOpen} />
        <Popover
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          disableScrollLock={true}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className={popoverOpen ? "animate__animated animate__fadeIn" : "animate__animated animate__fadeIn"}
        >
          <Card className="share-data share-email-popup " ref={targetRef}>
            <form onSubmit={handleSubmit(onSubmit)} className="sharesMail">
              <Box className="header flex justify-end">
                {/* <Typography gutterBottom variant="h5" component="h5">
                  Share to email
                </Typography> */}
                <CloseIcon
                  className="cursor-pointer close-icon-main"
                  onClick={handlePopoverClose}
                />
              </Box>
              <Box className="">
                {isError && (
                  <Typography className={`text-red text-sm`}>
                    Please enter valid details.
                  </Typography>
                )}
                {/* <Box className="single">
                  <label className="mt-0">Share with mobile:</label>
                  <InputField
                    type="number"
                    placeholder=" "
                    handleChange={(event: any) => handleEmailChange(event)}
                    defaultValue={email}
                    name="email"
                  />
                </Box> */}
                <Box className="single">
                  <label className="mt-0">Share with email:</label>
                  <InputField
                    type="text"
                    placeholder=" "
                    handleChange={(event: any) => handleEmailChange(event)}
                    defaultValue={email}
                    // {...register('email', {
                    //     // required: true,
                    //     pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    // })}
                    name="email"
                  />
                </Box>
                <Box className="single">
                  <label>Remarks for recipient:</label>
                  <InputField
                    type="text"
                    placeholder=" "
                    handleChange={(event: any) => handleRemarkChange(event)}
                    defaultValue={remarks}
                    // {...register('remarks', {
                    //     // required: true,
                    //     minLength: 4 })}
                    name="remarks"
                  />
                  {/* {errors.remarks?.type === 'required' && (
                                        <small className="form-text text-danger">This field is required</small>
                                    )}
                                    {errors.remarks?.type === 'minLength' && (
                                        <small className="form-text text-danger">Minimum 4 characters are required</small>
                                    )} */}
                </Box>
              </Box>
              <ButtonItem type="submit" ButtonTitle="Share" />
            </form>
          </Card>
        </Popover>
      </Box>
    </>
  );
};

export default ShareData;
