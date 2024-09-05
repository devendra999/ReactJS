"use client";
import React, { use, useState } from "react";
import { Box, Typography, TextField, FormControl } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import InputField from "../../components/InputField";
import ButtonItem from "../../components/ButtonItem";
import Grid from "@mui/material/Grid";
import carimg from "../../assets/images/car.png";
import logomain from "../../assets/images/logo-main.png";
import { useForm, Controller } from "react-hook-form";
import { useYupValidationResolver } from "../../components/hooks/yup-validation-resolver";
import { forgetSchema } from "./schema/schema";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../../components/Modal";
import { useUserControllerForgotPassword } from "../../backend/backendComponents";

interface FormFields {
  email?: string;
}

export default function ForgetPassword() {
  const router = useRouter();
  const [fieldValues, setFieldValues] = useState<FormFields>({
    email: "",
  });
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const { mutateAsync: sendEmail } = useUserControllerForgotPassword();

  const resolver = useYupValidationResolver(forgetSchema);

  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    register,
    control,
  } = useForm<FormFields>({ resolver });

  const onSubmit = async (data: FormFields | any) => {
    const requestBody: FormFields = {
      email: data?.email,
    };
    let sendResponse: any;
    sendResponse = await sendEmail({
      body: requestBody,
    });
    if (sendResponse.statusCode === 200) {
      setSuccess(true);
      setIsConfirmationModalOpen(true);
      setInfoMsg(`Email sent successfully.`);
    } else if (sendResponse.statusCode === 404) {
      setIsConfirmationModalOpen(true);
      const error = "This User is not Found.";
      setInfoMsg(error);
    }
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    if (success) router.push(`/forget-password-confirmation`);
  };

  return (
    <>
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
                        <Typography component="h4" className="welcome-text text-[#0a9ee2] leading-[1.5] font-semibold">Forgot Password!</Typography>
                        <Typography component="p" className="font-normal">
                          Please enter your Email.
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

                        <Modal
                          isOpen={isConfirmationModalOpen}
                          onClose={handleConfirmationCloseModal}
                          modalextraclass="modal-small"
                        >
                          <Box className="modal-main-data">
                            <Typography
                              variant="h6"
                              className="note-description text-center text-[1.125rem]"
                            >
                              {infoMsg}
                            </Typography>

                            <Box>
                              <Box className="w-100 flex justify-center button-group-data">
                                <ButtonItem
                                  className="outlineBtn mx-1"
                                  ButtonTitle="Close"
                                  type="button"
                                  onClick={handleConfirmationCloseModal}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Box className="box-input-items">
                            <FormControl className="form-control w-full form-control-text-field">
                              <TextField
                                {...register("email")}
                                variant="standard"
                                fullWidth
                                placeholder="email"
                                name="email"
                                type="text"
                                error={errors?.email?.message ? true : false}
                                helperText={errors?.email?.message?.toString()}
                              />
                            </FormControl>

                            <Box className="flex justify-end items-center">
                              <Box className="flex justify-end items-center">
                                <button
                                  className="text-base"
                                  onClick={() => router.push("/")}
                                >
                                  Login?
                                </button>
                              </Box>
                            </Box>
                          </Box>

                          <Box className="forgetpassword-button animate__animated animate__fadeIn animate__delay-1s">
                            <ButtonItem ButtonTitle="Send Link" type="submit" />
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
    </>
  );
}
