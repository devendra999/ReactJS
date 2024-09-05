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
  useCreateOneBaseBrandControllerBrand,
  useReplaceOneBaseBrandControllerBrand,
} from "../../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { brandSchema } from "../schema/schema";
import { getFromLocalStorage } from "@root/utils/common";
import dayjs from "dayjs";

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
  logoUrl?: string;
  logoUrlTwo?: string;
  subScriptionStartDate?: Date | null;
  subScriptionEndDate?: Date | null;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: number;
  updatedBy?: number;
}

const ManageUser: React.FC<ManageUserProps> = ({
  isEdit,
  initialUserData,
  refetchUserDetails,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [editUserId, setEditUserId] = useState(searchParams.get("id"));

  const [fieldValues, setFieldValues] = useState<FormFields>(
    isEdit
      ? {
          name: initialUserData?.name || "",
          logoUrl: initialUserData?.logoUrl || "",
          logoUrlTwo: initialUserData?.logoUrlTwo || "",
          isActive: initialUserData?.isActive,
          subScriptionStartDate: initialUserData?.subScriptionStartDate || null,
          subScriptionEndDate: initialUserData?.subScriptionEndDate || null,
        }
      : {
          name: "",
          logoUrl: "",
          logoUrlTwo: "",
          isActive: true,
          subScriptionStartDate: null,
          subScriptionEndDate: null,
        }
  );

  const currentUser = getFromLocalStorage("@user-details")
    ? JSON.parse(getFromLocalStorage("@user-details") as string)
    : {};

  const [infoMsg, setInfoMsg] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { mutateAsync: createBrand } = useCreateOneBaseBrandControllerBrand();
  const { mutateAsync: updateBrand } = useReplaceOneBaseBrandControllerBrand();

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
      logoUrl: data?.logoUrl,
      logoUrlTwo: data?.logoUrlTwo,
      // logoUrl: data?.name ? `${data.name.toLowerCase()}-logo` : undefined,
      // logoUrlTwo: data?.name ? `${data.name.toLowerCase()}-car` : undefined,
      isActive: data?.isActive,
      subScriptionStartDate: fieldValues?.subScriptionStartDate
        ? fieldValues?.subScriptionStartDate
        : null,
      subScriptionEndDate:
        new Date(fieldValues?.subScriptionStartDate) >
        new Date(fieldValues?.subScriptionEndDate)
          ? null
          : fieldValues?.subScriptionEndDate ?? null,
      isDeleted: false,
      createdBy: (currentUser?.id as number) || 1,
    };
    let brandResponse: any;

    if (isEdit) {
      brandResponse = await updateBrand({
        pathParams: {
          id: parseInt(editUserId as unknown as string),
        },
        body: requestBody,
      });
    } else {
      brandResponse = await createBrand({
        body: requestBody,
      });
    }
    if (!isEdit || (isEdit && brandResponse?.id)) {
      setSuccess(true);
      await refetchUserDetails();
      setIsConfirmationModalOpen(true);
      setInfoMsg(`Brand successfully ${isEdit ? "updated" : "created"} `);
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
    router.push("/brand-list");
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    if (success) router.push("/brand-list");
  };

  const handleDateChange = (name: string, date: Date) => {
    const formattedDate = date ? dayjs(date) : null;
    setFieldValues({ ...fieldValues, [name]: formattedDate });
  };

  const startDate = fieldValues?.subScriptionStartDate
    ? new Date(fieldValues.subScriptionStartDate)
    : null;
  if (startDate) {
    startDate.setDate(startDate.getDate() + 1);
  }

  return (
    <>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 res-title-height flex flex-wrap justify-between items-center">
          {/* <Box className="flex justify-between items-center sm:block"> */}
            <PanelHeading
              firstHeading={`${isEdit ? "Edit Brand" : " Create Brand"}`}
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
                      lg={4}
                      xl={4}
                      className="mb-0"
                    >
                      <label className="form-custom-label">
                        Brand Name
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <TextField
                        {...register("name")}
                        name="name"
                        placeholder="Enter Brand Name"
                        inputProps={{ maxLength: 64 }}
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
                      lg={4}
                      xl={4}
                      className="mb-0 small-date-field"
                    >
                      <CustomDatePicker
                        name="subScriptionStartDate"
                        selectedDate={
                          fieldValues?.subScriptionStartDate || null
                        }
                        onChange={handleDateChange}
                        labelname="Subscription Start Date"
                        placeholder="Start Date"
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={4}
                      className="mb-0 small-date-field"
                    >
                      {fieldValues?.subScriptionStartDate && (
                        <CustomDatePicker
                          name="subScriptionEndDate"
                          selectedDate={
                            fieldValues?.subScriptionEndDate || null
                          }
                          onChange={handleDateChange}
                          labelname="Subscription End Date"
                          placeholder="End Date"
                          minDate={startDate}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className="logo-grid">
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={4}
                      className="mb-0"
                    >
                      <label className="form-custom-label">Brand Logo </label>
                      <TextField
                        {...register("logoUrl")}
                        name="logoUrl"
                        placeholder="Enter Brand Logo"
                        inputProps={{ maxLength: 64 }}
                        type="text"
                        defaultValue={fieldValues?.logoUrl}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={4}
                      className="mb-0"
                    >
                      <label className="form-custom-label">Car Logo </label>
                      <TextField
                        {...register("logoUrlTwo")}
                        name="logoUrlTwo"
                        placeholder="Enter Car Logo"
                        inputProps={{ maxLength: 64 }}
                        type="text"
                        defaultValue={fieldValues?.logoUrlTwo}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={4}
                      className="mb-0 flex"
                      alignItems="center"
                    >
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

                <Box className="w-100  mb-2 mt-4 flex justify-center animate__animated animate__fadeIn animate__delay-800ms">
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
export default ManageUser;
