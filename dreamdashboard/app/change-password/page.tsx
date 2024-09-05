"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import InputField from "../../components/InputField";
import ButtonItem from "../../components/ButtonItem";
import Grid from "@mui/material/Grid";
import carimg from "../../assets/images/car.png";
import logomain from "../../assets/images/logo-main.png";
import Modal from "@root/components/Modal";
import { PanelHeading } from "@root/components/PanelHeading";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "./schema/schema";

interface FormFields {
  password?: string;
  confirmPassword?: string;
}

export default function ChangePassword() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldValues, setFieldValues] = useState<FormFields>({
    password: "",
  });
  const [isError, setIsError] = useState({ error: false, message: "" });

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(changePasswordSchema()) });

  const handleTogglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const onSubmit = async (data: FormFields | any) => {
    const requestBody: FormFields = {
      password: data?.password,
    };
    // console.log("request change password===>", requestBody);
    setIsModalOpen(true);
  };

  const handleInput = (data: any) => {
    setFieldValues({ ...fieldValues, ...data });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          modalextraclass="modal-small modal-customitem"
        >
          <Box className="modal-wrap-item">
            <Box className="modal-error modal-wrap-in">
              <Box className="icondata">
                <div className="success-animation">
                  <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      className="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      className="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                </div>
              </Box>

              <PanelHeading
                firstHeading={"Password Changed!"}
                className="text-blue"
              />

              <Typography component="p" className="subtitle">
                Your Password has been Changed Successfully.
              </Typography>

              <Box>
                <Box className="w-100 flex justify-center button-group-data">
                  <ButtonItem
                    className="mx-1"
                    ButtonTitle="Login"
                    type="button"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>

        <Box className="form-common-page bg-[#E0F5FF] box-border h-screen h-dvh flex items-center relative log-page">
          <Box className="container-login w-full mx-auto xl:p-[0] landscape:xl:p-[0] p-[.9375rem] ipad-l:p-[0] sm:p-[0] max-w-[75rem] after:absolute after:h-screen after:h-dvh after:w-full after:top-0 after:right-0 after:z-0 after:bg-[url('/assets/images/car-bg.png')] after:bg-no-repeat after:opacity-[.2] after:inline-block after:bg-bottom">
            <Box className="bg-login-image relative px-[5rem] pt-[2.5rem] pb-[3.75rem] xl:pt-[2.1875rem] xl:pb-[2.5rem] xl:pl-[2.5rem] xl:pr-[3.75rem] ipad-l:p-[0rem] lg:p-[0] before:w-full before:h-full before:bg-[url('/assets/images/behind-bg.png')] before:bg-no-repeat before:absolute  before:z-0 before:top-0 before:right-0 before:bg-cover before:max-w-[78%] before:rounded-[5%] before:rounded-t-none ipad-l:before:hidden">
              <Box className="login-inner-details relative z-[11] shadow-[.125rem_.125rem_1.625rem_rgba(0,0,0,.169)]">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container>
                    <Grid item md={6} sm={12} className="grid-item-data w-full">
                      <Box className="w-full h-full bg-[#bee6fa] p-[3.125rem] xl:p-[2.1875rem] lg:p-[2.1875rem] md:p-[.9375rem] min-h-[38.25rem] ipad-l:min-h-[34.5rem] lg:min-h-[34.5rem] md:min-h-[0]">
                        <Image
                          src={carimg}
                          width={1285}
                          height={571}
                          alt="car-behinds-bg"
                          className="car-behinds-bg absolute left-0 bottom-0 w-full sm:w-auto landscape:ipad-l:min-h-[405px] landscape:ipad-l:object-contain landscape:ipad-l:object-left"
                          style={{ width: 'calc(100% - 30px)' }}
                        />

                        <Box className="welcome-login text-center animate__animated animate__fadeIn animate__fast">
                          <Typography component="h4" className="welcome-text text-[#0a9ee2] leading-[1.5] font-semibold">
                            Forgot Password!
                          </Typography>
                          <Typography component="p" className="font-normal">
                            Please enter your new password.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={6} sm={12} className="grid-item-data w-full">
                      <Box className="bg-white-login bg-white p-[3.125rem] sm:p-[.9375rem]  md:p-[.9375rem] ipad-l:p-[2.1875rem] lg:p-[2.1875rem] xl:p-[2.1875rem] relative h-full min-h-[38.25rem] ipad-l:min-h-[34.5rem] lg:min-h-[0] sm:min-h-[unset]">
                        <Box className="welcome-logins flex flex-col h-full justify-between">
                          <Link
                            href="/"
                            className="flex justify-center logo-item"
                          >
                            <Image
                              src={logomain}
                              width={240}
                              height={132}
                              alt="logomain"
                              className="lg:max-w-[200px] md:max-w-[8.75rem] min-w-[15rem] mb-[10px] lg:min-w-[auto] animate__animated animate__fadeIn animate__fast"
                            />
                          </Link>

                          <form onSubmit={handleSubmit(onSubmit)} className="">
                            {isError && isError?.error === true && (
                              <Chip
                                className="error-box-note  mx-auto text-danger text-sm rounded-3xl py-7 flex mb-8 border-red text-red bg-redlight"
                                label={isError?.message}
                                variant="outlined"
                              />
                            )}
                            <Box className="box-input-items animate__animated animate__fadeIn animate__faster">
                              <FormControl className="form-control w-full form-control-text-field">
                                <TextField
                                  {...register("password")}
                                  placeholder="Enter Password"
                                  name="password"
                                  id="password"
                                  type={showPassword ? "text" : "password"}
                                  defaultValue={fieldValues?.password}
                                  // className="dropdownComponent"
                                  variant="standard"
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment
                                        position="end"
                                        className="button-fix-position"
                                      >
                                        <IconButton
                                          onClick={() =>
                                            handleTogglePasswordVisibility(
                                              "password"
                                            )
                                          }
                                        >
                                          {showPassword ? (
                                            <VisibilityOff />
                                          ) : (
                                            <Visibility />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />

                                {errors.password && (
                                  <Typography color="error">
                                    {errors.password.message}
                                  </Typography>
                                )}
                              </FormControl>

                              <FormControl className="form-control w-full form-control-text-field">
                                <TextField
                                  {...register("confirmPassword")}
                                  placeholder="Enter Confirm Password"
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  defaultValue={fieldValues?.confirmPassword}
                                  // className="dropdownComponent"
                                  variant="standard"
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment
                                        position="end"
                                        className="button-fix-position"
                                      >
                                        <IconButton
                                          onClick={() =>
                                            handleTogglePasswordVisibility(
                                              "confirmPassword"
                                            )
                                          }
                                        >
                                          {showConfirmPassword ? (
                                            <VisibilityOff />
                                          ) : (
                                            <Visibility />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {errors.confirmPassword && (
                                  <Typography color="error">
                                    {errors.confirmPassword.message}
                                  </Typography>
                                )}
                              </FormControl>
                            </Box>

                            <Box className="save-button animate__animated animate__fadeIn">
                              <ButtonItem ButtonTitle="Save" type="submit" />
                            </Box>
                          </form>

                          <Typography
                            component="p"
                            className="dark-gray-color text-base text-center fw-normal copy-note copy-text animate__animated animate__fadeIn animate__delay-500ms"
                          >
                            {"Copyright ©" +
                              new Date().getFullYear() +
                              " Azure Autoverse, All Rights Reserved."}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
