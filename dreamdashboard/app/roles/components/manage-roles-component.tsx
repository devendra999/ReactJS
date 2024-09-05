"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import CustomDatePicker from "../../../components/CustomDatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  useCreateOneBaseRolesControllerRoles,
  useUpdateOneBaseRolesControllerRoles,
  useReplaceOneBaseRolesControllerRoles,
} from "../../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { brandSchema } from "../schema/schema";
import { getFromLocalStorage } from "@root/utils/common";

interface Options {
  value: number;
  label: string;
}

interface ManageUserProps {
  isEdit: boolean;
  initialUserData: any;
  refetchUserDetails: any;
}

interface FormFields {
  name?: string;
  roleCode?: string;
  canImport?: boolean;
  manageDealer?: boolean;
  isSuperAdmin?: boolean;
  isChartExportAllowed?: boolean;
  isDumpExportAllowed?: boolean;
  isFileExportAllowed?: boolean;
  isFileInvalidateAllowed: boolean;
  isDumpViewAllowed : boolean;
  isChartViewAllowed: boolean
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: number;
  updatedBy?: number;
}

const ManageRole: React.FC<ManageUserProps> = ({
  isEdit,
  initialUserData,
  refetchUserDetails,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [editUserId, setEditUserId] = useState(searchParams.get("id"));

  const SuperAdminManage = getFromLocalStorage("@super-admin");
  const superAdminManageRoles = Boolean(SuperAdminManage);

  const [fieldValues, setFieldValues] = useState<FormFields>(
    isEdit
      ? {
          name: initialUserData?.name || "",
          roleCode: initialUserData?.roleCode || "",
          canImport: initialUserData?.canImport || "",
          manageDealer: initialUserData?.manageDealer || "",
          isSuperAdmin: initialUserData?.isSuperAdmin ? initialUserData?.isSuperAdmin : false,
          isFileInvalidateAllowed:
            initialUserData?.isFileInvalidateAllowed || "",
          isChartExportAllowed: initialUserData?.isChartExportAllowed || "",
          isDumpExportAllowed: initialUserData?.isDumpExportAllowed || "",
          isFileExportAllowed: initialUserData?.isFileExportAllowed || "",
          isDumpViewAllowed: initialUserData?.isDumpViewAllowed || "",
          isChartViewAllowed: initialUserData?.isChartViewAllowed || "",
          isActive: initialUserData?.isActive,
        }
      : {
          name: "",
          roleCode: "",
          canImport: "",
          manageDealer: "",
          isSuperAdmin: false,
          isFileInvalidateAllowed: "",
          isChartExportAllowed: "",
          isFileExportAllowed: "",
          isDumpExportAllowed: "",
          isChartViewAllowed:"",
          isDumpViewAllowed:"",
          isActive: true,
        }
  );

  const currentUser = getFromLocalStorage("@user-details")
    ? JSON.parse(getFromLocalStorage("@user-details") as string)
    : {};

  const [infoMsg, setInfoMsg] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { mutateAsync: createRole } = useCreateOneBaseRolesControllerRoles();
  const { mutateAsync: updateRole } = useReplaceOneBaseRolesControllerRoles();

  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    register,
    control,
  } = useForm({
    resolver: yupResolver(brandSchema(isEdit)),
  });

  const onSubmit = async (data: FormFields | any) => {
    const requestBody: FormFields = {
      name: data?.name,
      roleCode: data?.roleCode,
      canImport: data?.canImport,
      manageDealer: superAdminManageRoles == true ? data?.manageDealer : false,
      isSuperAdmin: fieldValues?.isSuperAdmin,
      isDumpExportAllowed: data?.isDumpExportAllowed,
      isChartViewAllowed: data?.isChartViewAllowed,
      isDumpViewAllowed: data?.isDumpViewAllowed,
      isChartExportAllowed: data?.isChartExportAllowed,
      isFileInvalidateAllowed: data?.isFileInvalidateAllowed,
      isFileExportAllowed: data?.isFileExportAllowed,
      isActive: data?.isActive,
      isDeleted: false,
      createdBy: (currentUser?.id as number) || 1,
    };
    let brandResponse: any;
    if (isEdit) {
      brandResponse = await updateRole({
        pathParams: {
          id: parseInt(editUserId as unknown as string),
        },
        body: requestBody,
      });
    } else {
      brandResponse = await createRole({
        body: requestBody,
      });
    }
    if (!isEdit || (isEdit && brandResponse?.id)) {
      setSuccess(true);
      await refetchUserDetails();
      setIsConfirmationModalOpen(true);
      setInfoMsg(`Role successfully ${isEdit ? "updated" : "created"} `);
    } else {
      setIsConfirmationModalOpen(true);
      const error =
        brandResponse?.message ||
        `Something went wrong while ${
          isEdit ? "updating" : "creating"
        } user...`;
      setInfoMsg(error);
    }
  };

  const handleBack = () => {
    router.push("/roles");
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    if (success) router.push("/roles");
  };

  return (
    <>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 mb-4 res-title-height flex flex-wrap justify-between items-center">
          {/* <Box className="flex justify-between items-center sm:block"> */}
            <PanelHeading
              firstHeading={`${isEdit ? "Edit Role" : " Create Role"}`}
            />
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
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <Box className="scroll-content-item">
              <Box className="user-form card-fields small-form-control bg-white max-w-[100%] my-0 mx-auto rounded-[20px]">
                <Box className="user-form-in" key={0}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      className="mb-0"
                    >
                      <label className="form-custom-label">
                        Role Name
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <TextField
                        {...register("name")}
                        name="name"
                        inputProps={{ maxLength: 64 }}
                        placeholder="Enter Role Name"
                        type="text"
                        defaultValue={fieldValues?.name}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                        error={errors?.name ? true : false}
                        helperText={errors?.name?.message}
                      />
                      {/* {errors.name && (
                        <Typography color="error">
                          {errors.name.message}
                        </Typography>
                      )} */}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      className="mb-0"
                    >
                      <label className="form-custom-label">
                        Role Code
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <TextField
                        {...register("roleCode")}
                        name="roleCode"
                        inputProps={{ maxLength: 64, autoComplete: "off" }}
                        placeholder="Enter Role Code"
                        type="text"
                        defaultValue={fieldValues?.roleCode}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                        error={errors?.roleCode ? true : false}
                        helperText={errors?.roleCode?.message}
                      />
                      {/* {errors.roleCode && (
                        <Typography color="error">
                          {errors.roleCode.message}
                        </Typography>
                      )} */}
                    </Grid>
                    <Grid item xs={12} className="flex flex-wrap">
                      {superAdminManageRoles == true ? (
                        <Box>
                          <Grid item className="mb-0 flex" alignItems="center">
                            <Box className="checkbox-item">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    {...register("manageDealer")}
                                    checked={fieldValues?.manageDealer}
                                    onChange={(e) =>
                                      setFieldValues({
                                        ...fieldValues,
                                        ["manageDealer"]: e.target.checked,
                                      })
                                    }
                                  />
                                }
                                label="Manage Dealer user"
                              />
                            </Box>
                          </Grid>
                        </Box>
                      ) : null}

                      <Box className="checkbox-item">
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register("isChartExportAllowed")}
                              checked={fieldValues?.isChartExportAllowed}
                              onChange={(e) =>
                                setFieldValues({
                                  ...fieldValues,
                                  ["isChartExportAllowed"]: e.target.checked,
                                })
                              }
                            />
                          }
                          label="Chart Export Allowed"
                        />
                      </Box>

                      <Box className="checkbox-item">
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register("canImport")}
                              checked={fieldValues?.canImport}
                              onChange={(e) =>
                                setFieldValues({
                                  ...fieldValues,
                                  ["canImport"]: e.target.checked,
                                })
                              }
                            />
                          }
                          label="Can Import"
                        />
                      </Box>

                      <Box className="checkbox-item">
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register("isDumpExportAllowed")}
                              checked={fieldValues?.isDumpExportAllowed}
                              onChange={(e) =>
                                setFieldValues({
                                  ...fieldValues,
                                  ["isDumpExportAllowed"]: e.target.checked,
                                })
                              }
                            />
                          }
                          label="Dump Export Allowed"
                        />
                      </Box>

                      <Box className="checkbox-item">
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register("isFileExportAllowed")}
                              checked={fieldValues?.isFileExportAllowed}
                              onChange={(e) =>
                                setFieldValues({
                                  ...fieldValues,
                                  ["isFileExportAllowed"]: e.target.checked,
                                })
                              }
                            />
                          }
                          label="File Export Allowed"
                        />
                      </Box>

                      <Box className="checkbox-item">
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register("isFileInvalidateAllowed")}
                              checked={fieldValues?.isFileInvalidateAllowed}
                              onChange={(e) =>
                                setFieldValues({
                                  ...fieldValues,
                                  ["isFileInvalidateAllowed"]: e.target.checked,
                                })
                              }
                            />
                          }
                          label="File Invalidate Allowed"
                        />
                      </Box>

                      <Box className="checkbox-item">
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register("isDumpViewAllowed")}
                              checked={fieldValues?.isDumpViewAllowed}
                              onChange={(e) =>
                                setFieldValues({
                                  ...fieldValues,
                                  ["isDumpViewAllowed"]: e.target.checked,
                                })
                              }
                            />
                          }
                          label="Dump View Allowed"
                        />
                      </Box>

                      <Box className="checkbox-item">
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register("isChartViewAllowed")}
                              checked={fieldValues?.isChartViewAllowed}
                              onChange={(e) =>
                                setFieldValues({
                                  ...fieldValues,
                                  ["isChartViewAllowed"]: e.target.checked,
                                })
                              }
                            />
                          }
                          label="Chart View Allowed"
                        />
                      </Box>

                      <Box className="checkbox-item">
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register("isActive")}
                              checked={fieldValues?.isActive}
                              onChange={(e) =>
                                setFieldValues({
                                  ...fieldValues,
                                  ["isActive"]: e.target.checked,
                                })
                              }
                            />
                          }
                          label="Active/Inactive"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="w-100  mb-2 mt-5 pt-5 flex justify-center">
                  <ButtonItem
                    className="outlineBtn mx-1"
                    ButtonTitle="Cancel"
                    type="button"
                    onClick={handleBack}
                  />
                  <ButtonItem
                    className="containBtn mx-1"
                    ButtonTitle="Save"
                    type="submit"
                  />
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};
export default ManageRole;
