"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import carimg from "../../assets/images/car.png";
import logomain from "../../assets/images/logo-main.png";

export default function ForgetPassword() {
  return (
    <>
      <Box className="form-common-page">
        <Box className="container-login">
          <Box className="bg-login-image">
            <Box className="row login-inner-details">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                  <Grid item md={6} sm={12} className="grid-item-data">
                    <Box className=" bg-blue-login">
                      <Image
                        src={carimg}
                        width={1285}
                        height={571}
                        alt="car-behinds-bg"
                        className="car-behinds-bg"
                      />

                      <Box className="welcome-login text-center">
                        <Typography component="h4">Welcome!</Typography>
                        <Typography component="p">
                          Please login to your account.
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={6} sm={12} className="grid-item-data">
                    <Box className="bg-white-login">
                      <Box className="welcome-logins">
                        <Link
                          href="/"
                          className="flex justify-center logo-item"
                        >
                          <Image
                            src={logomain}
                            width={240}
                            height={132}
                            alt="logomain"
                          />
                        </Link>

                        <Box className="text-center forget-password-text">
                          <Typography
                            component="h2"
                            className="title-main text-center  mb-5"
                          >
                            Forgot Password Confirmation!
                          </Typography>

                          <Typography component="p" className="sub-title">
                            Please check your email to reset your Password.
                          </Typography>
                        </Box>

                        <Typography
                          component="p"
                          className="dark-gray-color text-base text-center fw-normal copy-note"
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
