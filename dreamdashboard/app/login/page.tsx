"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import InputField from "../../components/InputField";
import CheckboxItem from "../../components/Checkbox";
import ButtonItem from "../../components/ButtonItem";
import Grid from "@mui/material/Grid";
import carimg from "../../assets/images/car.png";
import logomain from "../../assets/images/logo-main.png";
import { useAuthControllerGetToken } from "../../backend/backendComponents";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/auth-store";
import { LoginSuccessResponse } from "../../utils/auth/Auth";
import { getFromLocalStorage, addToLocalStorage } from "@root/utils/common";

interface UserData {
  username: string;
  password: string;
}

export default function Login() {
  const [fieldValues, setFieldValues] = useState<UserData>();
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const setLoginData = useAuthStore((state) => state.setLoginData);

  const loginOptions = getFromLocalStorage("@login-response")
    ? JSON.parse(getFromLocalStorage("@login-response") as string)
    : {};

  useEffect(() => {
    if (loginOptions.accessToken) {
      router.push("/landing");
    } else if (loginOptions) {
      router.push("/login");
    }
  }, [loginOptions]);

  const { mutateAsync: authenticateUser, data: authData } =
    useAuthControllerGetToken();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsError({ error: false, message: "" });
    if (!fieldValues?.username || !fieldValues?.password) {
      setIsError({ error: true, message: "Please fill username & password" });
      return;
    }
    const bodyData = {
      username: fieldValues?.username,
      password: fieldValues?.password,
    };
    const authResponse: any = await authenticateUser({
      body: bodyData,
    });

    if (authResponse?.statusCode !== 200 && authResponse?.error) {
      setIsError({ error: true, message: "Invalid username and/or password" });
    }

    if (authResponse?.statusCode == 404 && authResponse?.error) {
      setIsError({ error: true, message: "Invalid username and/or password" });
    }
    if (authResponse?.statusCode == 403 && authResponse?.error) {
      setIsError({ error: true, message: "This user is inactive" });
    }

    if (authResponse?.statusCode === 200 && !authResponse?.error) {
      const userInfo = authResponse?.userInfo || "";
      const localData = {
        user: userInfo,
        accessToken: authResponse?.accessToken,
        accessTokenExpireIn: authResponse?.accessTokenExpireIn,
        refreshToken: authResponse?.refreshToken,
        refreshTokenExpireIn: authResponse?.refreshTokenExpireIn,
      };
      setLoginData(localData as LoginSuccessResponse);
      addToLocalStorage("@rememberMe", rememberMe);
      router.push(`/landing`);
    }
  };

  const handleInput = (data: any) => {
    setFieldValues({ ...fieldValues, ...data });
  };

  return (
    <>
      <Box className="bg-[#E0F5FF] p-[.9375rem] ipad-l:p-[1.875rem] md:p-[.9375rem] sm:p-[.9375rem] flex items-center relative landscape:md:h-auto h-screen  h-dvh box-border before:w-full before:h-full before:bg-[url('/assets/images/pattern.png')] before:bg-no-repeat before:absolute before:inline-block before:z-0 before:opacity-[.8] before:top-0 before:right-0 before:bg-scroll before:bg-right landscape:lg:items-start landscape:md:p-[0.9375rem] landscape:lg:p-[.9375rem] log-page">
        <Box className="w-full mx-auto xl:p-[0] landscape:xl:p-[0] p-[.9375rem] ipad-l:p-[0] sm:p-[0] max-w-[75rem] after:absolute after:h-screen after:h-dvh after:w-full after:top-0 after:right-0 after:z-0 after:bg-[url('/assets/images/car-bg.png')] after:bg-no-repeat after:opacity-[.2] after:inline-block after:bg-bottom ">
          <Box className="relative px-[5rem] pt-[2.5rem] pb-[3.75rem] xl:pt-[2.1875rem] xl:pb-[2.5rem] xl:pl-[2.5rem] xl:pr-[3.75rem] ipad-l:p-[0rem] lg:p-[0] before:w-full before:h-full before:bg-[url('/assets/images/behind-bg.png')] before:bg-no-repeat before:absolute  before:z-0 before:top-0 before:right-0 before:bg-cover before:max-w-[78%] before:rounded-[5%] before:rounded-t-none ipad-l:before:hidden" >
          <Box className="relative z-[11] shadow-[.125rem_.125rem_1.625rem_rgba(0,0,0,.169)]">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                  <Grid item md={6} sm={12} className="w-full">
                    <Box className="w-full h-full bg-[#bee6fa] p-[3.125rem] xl:p-[2.1875rem] lg:p-[2.1875rem] md:p-[.9375rem] min-h-[38.25rem] ipad-l:min-h-[34.5rem] lg:min-h-[34.5rem] md:min-h-[0]">
                      <Image
                        src={carimg}
                        width={1285}
                        height={571}
                        alt="car-behinds-bg"
                        className="absolute left-0 bottom-0 w-full sm:w-auto landscape:ipad-l:min-h-[405px] landscape:ipad-l:object-contain landscape:ipad-l:object-left"
                        style={{ width: 'calc(100% - 30px)' }}
                      />

                      <Box className="text-center animate__animated animate__fadeIn animate__fast">
                        <Typography component="h4" className="welcome-text text-[#0a9ee2] leading-[1.5] font-semibold">Welcome!</Typography>
                        <Typography component="p" className="font-normal">
                          Please login to your account.
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <Box className="bg-white p-[3.125rem] sm:p-[.9375rem]  md:p-[.9375rem] ipad-l:p-[2.1875rem] lg:p-[2.1875rem] xl:p-[2.1875rem] relative h-full min-h-[38.25rem] ipad-l:min-h-[34.5rem] lg:min-h-[0] sm:min-h-[unset]">
                      <Box className="flex flex-col h-full justify-between">
                        <Link
                          href="/"
                          className="flex justify-center"
                        >
                          <Image
                            src={logomain}
                            width={240}
                            height={132}
                            alt="logomain"
                            className="lg:max-w-[200px] md:max-w-[8.75rem] min-w-[15rem] mb-[10px] lg:min-w-[auto] animate__animated animate__fadeIn animate__fast"
                          />
                        </Link>

                        <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn animate__animate-faster">
                          {isError && isError?.error === true && (
                            <Chip
                              className="error-box-note  mx-auto text-danger text-sm rounded-3xl py-7 flex mb-8 border-red text-red bg-redlight"
                              label={isError?.message}
                              variant="outlined"
                            />
                          )}
                          <Box className="mb-[1.875rem]">
                            <InputField
                              placeholder="User Name"
                              name="username"
                              type="username"
                              defaultValue=""
                              handleChange={handleInput}
                              className="animate__animated animate__fadeIn animate__delay-800ms user"
                            />

                            <InputField
                              placeholder="Password"
                              type="password"
                              name="password"
                              defaultValue=""
                              handleChange={handleInput}
                              className="mb-[0rem] animate__animated animate__fadeIn animate__delay-800ms"
                            />

                            {/* <Box className="flex justify-between items-center">
                              <FormGroup>
                                <FormControlLabel
                                  label="Remember me"
                                  className="text-base"
                                  control={
                                    <Checkbox
                                      checked={rememberMe}
                                      onChange={() =>
                                        setRememberMe(!rememberMe)
                                      }
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                  }
                                />
                              </FormGroup>
                              <Link
                                href="/forget-password"
                                className="text-base"
                              >
                                Forget Password
                              </Link>
                            </Box> */}
                          </Box>

                          <Box className="animate__animated animate__fadeIn ">
                            <ButtonItem ButtonTitle="Login" type="submit" />
                          </Box>
                        </form>

                        <Typography
                          component="p"
                          className="dark-gray-color text-base text-center fw-normal mt-[3.125rem] lg:mt-[1.25rem] lg:p-[.9375rem] copy-text animate__animated animate__fadeIn animate__delay-500ms"
                        >
                          {"Copyright © " +
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
