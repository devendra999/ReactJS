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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  useCreateOneBaseModelControllerModel,
  // useUpdateOneBaseModelControllerModel,
  useGetManyBaseBrandControllerBrand,
  useReplaceOneBaseModelControllerModel,
} from "../../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFromLocalStorage } from "@root/utils/common";
import OutlinedInput from "@mui/material/OutlinedInput";
import { modelSchema } from "../schema/schema";


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
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  pageCode?: string;
  createdBy?: number;
  updatedBy?: number;
  dupModelName?: string[];
  brandId?: number | null;
}

const ManageModel: React.FC<ManageUserProps> = ({
  isEdit,
  initialUserData,
  refetchUserDetails,
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [brandOptions, setBrandOptions] = useState<Options[]>([]);
  const [editUserId, setEditUserId] = useState(searchParams.get("id"));
  const [fieldValues, setFieldValues] = useState<FormFields>(
    isEdit
      ? {
        name: initialUserData?.name || "",
        dupModelName: initialUserData?.dupModelName || "",
        // dupModelName: [initialUserData?.name] || [""],
        pageCode: initialUserData?.pageCode || null,
        brandId: initialUserData?.brandId || null,
        isActive: initialUserData?.isActive,
      }
      : {
        name: "",
        pageCode: null,
        brandId: null,
        dupModelName: "",
        // dupModelName: [],
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
  const { mutateAsync: createModel, isLoading } = useCreateOneBaseModelControllerModel();
  const { mutateAsync: updateModel } = useReplaceOneBaseModelControllerModel();


  const brandId = JSON.parse(getFromLocalStorage("@brand-id") || "{}");

  const { data: brand, refetch: refetchBrand } =
    useGetManyBaseBrandControllerBrand(
      {},
      {
        enabled: false,
      }
    );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandResponse = await refetchBrand();
        if (brandResponse.isSuccess) {
          const brandsData = brandResponse.data;
          if (Array.isArray(brandsData) && brandsData.length > 0) {
            const options = brandsData
              .map((item) => ({
                value: item.id,
                label: item.name,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));
            setBrandOptions(options);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, [refetchBrand]);



  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(modelSchema(isEdit)),

  });


  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setFieldValues({ ...fieldValues, [name]: value });
  };

  const onSubmit = async (data: FormFields | any) => {

    let modifiedFirstElement = (data?.name || "") + ", " + (data?.dupModelName || "");
    let duplicateNameArray = [];
    
    if (initialUserData && initialUserData.dupModelName) {
      let nameParts = (data?.name || "")    
      let duplicateNameParts = (data?.dupModelName || "").split(",");
      // Check if the first parts of the names match
      if (nameParts && duplicateNameParts.length > 0 && nameParts === duplicateNameParts[0]) {
        duplicateNameArray = [data?.dupModelName];
      } else {
        duplicateNameArray = [
          modifiedFirstElement,
          ...initialUserData.dupModelName.slice(1),
        ];
      }
    } else {
      duplicateNameArray = [modifiedFirstElement];
    }

    let duplicateNameArrayString = duplicateNameArray[0].split(',').map(item => item.trim());
    

    const requestBody: FormFields = {
      name: data?.name,
      dupModelName: duplicateNameArrayString,
      // dupModelName: isEdit ? [initialUserData?.name, data?.name] : [data?.name],
      brandId: data?.brandId as number,
      pageCode: data?.pageCode === "" ? null : data?.pageCode,
      isActive: data?.isActive,
      isDeleted: false,
    };
    let modelResponse: any;

    if (isEdit) {
      modelResponse = await updateModel({
        pathParams: {
          id: parseInt(editUserId as unknown as string),
        },
        body: requestBody,
      });

    } else {
      modelResponse = await createModel({
        body: requestBody,
      });
    }
    if (!isEdit || isEdit && modelResponse?.id) {
      setSuccess(true);
      await refetchUserDetails();
      setIsConfirmationModalOpen(true);
      setInfoMsg(`Model successfully ${isEdit ? "updated" : "created"} `);
    } else {
      setIsConfirmationModalOpen(true);
      const error =
        modelResponse?.message ||
        `Something went wrong while ${isEdit ? "updating" : "creating"
        } user...`;
      setInfoMsg(error);
    }
  };

  const handleBack = () => {
    router.push("/model");
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    if (success) router.push("/model");
  };
  return (
    <>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 mb-4 res-title-height">
          {/* <Box className="flex justify-between items-center sm:block"> */}
            <PanelHeading
              firstHeading={`${isEdit ? "Edit Model" : "Create Model"}`}
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
                        Model Name
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <TextField
                        {...register("name")}
                        placeholder="Enter Model Name"
                        type="text"
                        inputProps={{ maxLength: 64, autoComplete: "off" }}
                        defaultValue={fieldValues?.name}
                        className="dropdownComponent rounded-lg text-blacklight p-0"
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
                        Duplicate Model Name
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <TextField
                        {...register("dupModelName")}
                        placeholder="Enter Duplicate Model Name"
                        name="dupModelName"
                        type="text"
                        inputProps={{ maxLength: 64, autoComplete: "off" }}
                        defaultValue={fieldValues?.dupModelName}
                        className="dropdownComponent rounded-lg bg-white text-blacklight600 h-12 p-0 shadow-[0_2px_24px_0_rgba(0,0,0,.1)]"
                      />
                      {errors.dupModelName && (
                        <Typography color="error">
                          {errors.dupModelName.message}
                        </Typography>
                      )}
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                        className="label-form-input "
                      >
                        <Grid
                          className="dropdownComponent custom-selectitem-main"
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <label
                            className="form-custom-label"
                            style={{ marginBottom: ".25rem" }}
                          >
                            Brand Name
                            <span style={{ color: "red" }}>
                              <sup>*</sup>
                            </span>
                          </label>
                          <Select
                            {...register("brandId")}
                            name="brandId"
                            input={<OutlinedInput />}
                            value={fieldValues?.brandId || ""}
                            className="custom-select-item"
                            onChange={handleSelectChange}
                            displayEmpty
                          >
                            <MenuItem disabled value="">
                              <Box className="opacity-50">
                                Select Brand Name
                              </Box>
                            </MenuItem>
                            {brandOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>

                          {errors.brandId && (
                            <Typography color="error">
                              {errors.brandId.message}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>

 

                      <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          lg={6}
                          xl={6}
                          className="label-form-input "
                        >
                          <Grid
                            className="dropdownComponent custom-selectitem-main"
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <label
                              className="form-custom-label"
                              style={{ marginBottom: ".25rem" }}
                            >
                              Dashboard<span style={{ color: "red" }}></span>
                            </label>
                            <Select
                              {...register("pageCode")}
                              name="pageCode"
                              input={<OutlinedInput />}
                              value={fieldValues?.pageCode || ""}
                              className="custom-select-item"
                              onChange={handleSelectChange}
                              displayEmpty
                            >
                              <MenuItem disabled value="">
                                <Box className="opacity-50">
                                  Select Dashboard
                                </Box>
                              </MenuItem>
                              {[
                                {
                                  value: "sl_dashboard",
                                  label: "Sales Dashboard",
                                },
                                {
                                  value: "sr_dashboard",
                                  label: "Service Dashboard",
                                },
                              ].map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.pageCode && (
                              <Typography color="error">
                                {errors.pageCode.message}
                              </Typography>
                            )}
                          </Grid>
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

                <Box className="w-100  mb-2 mt-2 flex justify-center animate__animated animate__fadeIn animate__delay-800ms">
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
export default ManageModel;
