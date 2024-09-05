"use client";
import React, { useEffect, useState } from "react";
import SidebarWithLayout from "../layout-with-sidebar";
import {
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import { UserData } from "../user-management/user-interface";
import { useUserControllerChangePassword, useGetOneBaseUserControllerUser } from "../../backend/backendComponents";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "../user-management/schema/schema";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getFromLocalStorage } from "@root/utils/common";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
interface ChangePasswordProps {
  isEdit: boolean;
  initialUserData: any;
}

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [editUserId, setEditUserId] = useState(searchParams.get("id"));
  const [webUrl, setWebUrl] = useState(pathName);
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const response = JSON.parse(getFromLocalStorage("@login-response") || "{}");

  const [fieldValues, setFieldValues] = useState<UserData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [infoMsg, setInfoMsg] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordSchema()),
  });

  const { mutateAsync: changePassword } = useUserControllerChangePassword();

  const onSubmit = async (data: UserData | any) => {
    const requestBody: UserData = {
      userId: editUserId
        ? (userDetails as any)?.keyCloakId
        : response?.user?.sub,
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
    };
    // console.log(requestBody, "change password data");
    let userResponse: any = await changePassword({
      body: requestBody,
    });

    if (userResponse?.statusCode == 200 || userResponse?.userId) {
      setSuccess(true);
      setIsConfirmationModalOpen(true);
      setInfoMsg(`Password Changed Successfully`);
      clearForm();
    } else {
      setIsConfirmationModalOpen(true);
      const error = userResponse?.message || `Something went wrong`;
      setInfoMsg(error);
    }
  };

  const handleBack = () => {
    router.push("/user-management");
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    editUserId &&
      infoMsg == "Password Changed Successfully" &&
      router.push("/user-management");
  };

  const handleTogglePasswordVisibility = (field: string) => {
    if (field === "oldPassword") {
      setShowOldPassword(!showOldPassword);
    } else if (field === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const clearForm = () => {
    clearErrors();
    reset();
    setFieldValues({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const {
    data: userDetails,
    refetch: refetchUserDetails,
    isLoading,
  } = useGetOneBaseUserControllerUser(
    {
      pathParams: {
        id: editUserId as unknown as number,
      },
    },
    { enabled: false }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetchUserDetails();
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (editUserId && editUserId !== null) {
      fetchData();
    }
  }, [editUserId, refetchUserDetails]);

  useEffect(() => {
    if (searchParams.get("id") == null) {
      clearForm();
    } else {
      clearForm();
    }
  }, [searchParams.get("id")]);

  return (
    <>
      <SidebarWithLayout>
        <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
          <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 mb-4 res-title-height flex flex-wrap justify-between items-center ">
            {/* <Box className="flex justify-between items-center sm:block"> */}
              <PanelHeading firstHeading={"Change Password"} />
            {/* </Box> */}
          </Box>

          <Modal
            isOpen={isConfirmationModalOpen}
            onClose={handleConfirmationCloseModal}
            modalextraclass="modal-small"
          >
            <Box className="modal-main-data">
              <Typography variant="h6" className="note-description text-center">
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

          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className="scroll-content-item-center  h-100vh flex  items-center">
                <Box className="w-[500px] p-[2rem] bg-white max-w-full mx-auto rounded-[1.25rem]">
                  <Box className="max-w-full" key={0}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} className="mb-0 animate__animated animate__fadeInUp">
                        <label className="form-custom-label">
                          Old Password *
                        </label>
                        <TextField
                          {...register("oldPassword")}
                          placeholder="Enter Old Password"
                          name="oldPassword"
                          id="oldPassword"
                          inputProps={{ maxLength: 127, autoComplete: "off" }}
                          type={showOldPassword ? "text" : "password"}
                          defaultValue={fieldValues?.oldPassword}
                          className="dropdownComponent w-full rounded-lg bg-white text-blacklight h-12 p-0 shadow-[0_2px_24px_0_rgba(0,0,0,.1)]"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                className="button-fix-position"
                              >
                                <IconButton
                                  onClick={() =>
                                    handleTogglePasswordVisibility(
                                      "oldPassword"
                                    )
                                  }
                                >
                                  {showOldPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          onFocus={(
                            event: React.FocusEvent<HTMLInputElement>
                          ) => {
                            setInfoMsg("");
                          }}
                        />
                        {errors.oldPassword && (
                          <Typography color="error">
                            {errors.oldPassword.message}
                          </Typography>
                        )}
                        <Typography color="error">
                          {infoMsg !== "Password Changed Successfully" &&
                            infoMsg}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} className="mb-0 animate__animated animate__fadeInUp">
                        <label className="form-custom-label">
                          New Password *
                        </label>

                        <Tooltip
                          title={
                            <Typography className="tooltip-points-content text-[0.6563rem]">
                              <Box className="title-points-content text-[0.75rem] mb-[0.1875rem] pb-[0.1875rem]">
                                Password must contain the following:
                              </Box>
                              <List sx={{ listStyle: "decimal", pl: 2 }}>
                                <ListItem sx={{ display: "list-item" }}>
                                  Password must be at least 8 characters long.
                                </ListItem>
                                <ListItem sx={{ display: "list-item" }}>
                                  Password must contain at least 1 uppercase & 1
                                  lowercase letter.
                                </ListItem>

                                <ListItem sx={{ display: "list-item" }}>
                                  Password must contain at least 1 number.
                                </ListItem>

                                <ListItem sx={{ display: "list-item" }}>
                                  Password must contain at least 1 special
                                  character{" "}
                                  <Box className="symbol-content inline-block py-[0.25rem] pl-[0] pr-[0.25rem]">
                                  {`! @ # $ %  & * ( ) _ + - = { } [ ] | \ : ; " ' < > , . ? /`}
                                  </Box>
                                  .
                                </ListItem>

                                <ListItem sx={{ display: "list-item" }}>
                                  Password must not contain spaces.
                                </ListItem>
                              </List>
                            </Typography>
                          }
                          
                          open={showTooltip}
                          placement="bottom-end"
                        >
                          <TextField
                            {...register("newPassword")}
                            placeholder="Enter New Password"
                            name="newPassword"
                            id="newPassword"
                            inputProps={{ maxLength: 127, autoComplete: "off" }}
                            type={showNewPassword ? "text" : "password"}
                            defaultValue={fieldValues?.newPassword}
                            className="dropdownComponent rounded-lg bg-white text-blacklight h-12 p-0 shadow-[0_2px_24px_0_rgba(0,0,0,.1)]"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className="button-fix-position"
                                >
                                  <IconButton
                                    onClick={() =>
                                      handleTogglePasswordVisibility(
                                        "newPassword"
                                      )
                                    }
                                  >
                                    {showNewPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            onBlur={() => setShowTooltip(false)}
                            onFocus={() => setShowTooltip(true)}
                            onKeyDown={() => setShowTooltip(false)}
                            onClick={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          />
                        </Tooltip>
                        {errors.newPassword && (
                          <Typography color="error">
                            {errors.newPassword.message}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} className="mb-0 animate__animated animate__fadeInUp">
                        <label className="form-custom-label">
                          Confirm Password *
                        </label>
                        <TextField
                          {...register("confirmPassword")}
                          placeholder="Enter Confirm Password"
                          id="confirmPassword"
                          name="confirmPassword"
                          inputProps={{ maxLength: 127, autoComplete: "off" }}
                          type={showConfirmPassword ? "text" : "password"}
                          defaultValue={fieldValues?.confirmPassword}
                          className="dropdownComponent rounded-lg bg-white text-blacklight h-12 p-0 shadow-[0_2px_24px_0_rgba(0,0,0,.1)]"
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
                      </Grid>
                    </Grid>
                  </Box>

                  <Box className="w-100  mb-2 mt-5 flex justify-center">
                    {searchParams.get("id") && (
                      <ButtonItem
                        className="outlineBtn mx-1 animate__animated animate__fadeIn animate__delay-1s "
                        ButtonTitle="Cancel"
                        type="button"
                        onClick={handleBack}
                      />
                    )}
                    <ButtonItem
                      className="containBtn mx-1 animate__animated animate__fadeIn animate__delay-1s "
                      ButtonTitle="Save"
                      type="submit"
                    />
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </SidebarWithLayout>
    </>
  );
};
export default ChangePassword;
