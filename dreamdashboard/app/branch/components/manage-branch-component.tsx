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
import { BranchData } from "../branch-interface";
import {
  useGetManyBaseRolesControllerRoles,
  useCreateManyBaseBranchUserControllerBranchUser,
  useGetManyBaseBranchUserControllerBranchUser,
  useCreateOneBaseUserControllerUser,
  useBranchControllerFilterBranch,
  // useUpdateOneBaseBranchControllerBranch,
  useReplaceOneBaseBranchControllerBranch,
  useBranchUserControllerBulkDelete,
  useCreateOneBaseBranchControllerBranch,
  useGetManyBaseBrandControllerBrand,
} from "../../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { branchSchema } from "../schema/schema";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getFromLocalStorage } from "@root/utils/common";
import dayjs from "dayjs";
import OutlinedInput from "@mui/material/OutlinedInput";

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
  email?: string;
  contactPerson?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  contactNumber?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: number;
  updatedBy?: number;
  brandId?: number | null;
  duplicateName?: string[];
  // brand?: Brand;
}

const ManageUser: React.FC<ManageUserProps> = ({
  isEdit,
  initialUserData,
  refetchUserDetails,
}) => {
  const router = useRouter();
  const [brandOptions, setBrandOptions] = useState<Options[]>([]);
  const searchParams = useSearchParams();
  const [editUserId, setEditUserId] = useState(searchParams.get("id"));

  const [fieldValues, setFieldValues] = useState<FormFields>(
    isEdit
      ? {
        name: initialUserData?.name || "",
        email: initialUserData?.email || "",
        contactNumber: initialUserData?.contactNumber || "",
        contactPerson: initialUserData?.contactPerson || "",
        address1: initialUserData?.address1 || "",
        address2: initialUserData?.address2 || "",
        city: initialUserData?.city || "",
        state: initialUserData?.state || "",
        country: initialUserData?.country || "",
        pincode: initialUserData?.pincode || "",
        brandId: initialUserData?.brandId || null,
        duplicateName: initialUserData?.duplicateName || "",
        isActive: initialUserData?.isActive,
      }
      : {
        name: "",
        email: "",
        contactNumber: "",
        contactPerson: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        brandId: null,
        duplicateName: "",
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

  const { mutateAsync: createBranch } =
    useCreateOneBaseBranchControllerBranch();

  const { mutateAsync: updateBranch } =
    useReplaceOneBaseBranchControllerBranch();

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
    formState: { errors },
    clearErrors,
    reset,
    register,
    control,
  } = useForm({
    resolver: yupResolver(branchSchema(isEdit)),
  });

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setFieldValues({ ...fieldValues, [name]: value });
  };

  const onSubmit = async (data: FormFields | any) => {
    let modifiedFirstElement = (data?.name || "") + ", " + (data?.duplicateName || "");
    let duplicateNameArray = [];
    
    if (initialUserData && initialUserData.duplicateName) {
      let nameParts = (data?.name || "")    
      let duplicateNameParts = (data?.duplicateName || "").split(",");
      // Check if the first parts of the names match
      if (nameParts && duplicateNameParts.length > 0 && nameParts === duplicateNameParts[0]) {
        duplicateNameArray = [data?.duplicateName];
      } else {
        duplicateNameArray = [
          modifiedFirstElement,
          ...initialUserData.duplicateName.slice(1),
        ];
      }
    } else {
      duplicateNameArray = [modifiedFirstElement];
    }
    let duplicateNameArrayString = duplicateNameArray[0].split(',').map(item => item.trim());
    

    const requestBody: FormFields = {
      name: data?.name,
      duplicateName: duplicateNameArrayString,
      email: data?.email ? data?.email : null,
      contactNumber: data?.contactNumber ? data?.contactNumber : null,
      contactPerson: data?.contactPerson ? data?.contactPerson : null,
      address1: data?.address1 ? data?.address1 : null,
      address2: data?.address2 ? data?.address2 : null,
      city: data?.city ? data?.city : null,
      state: data?.state ? data?.state : null,
      country: data?.country ? data?.country : null,
      pincode: data?.pincode ? data?.pincode : null,
      brandId: data?.brandId as number,
      isActive: data?.isActive,
      isDeleted: false,
      createdBy: (currentUser?.id as number) || 1,
    };
    let branchResponse: any;
    if (isEdit) {
      branchResponse = await updateBranch({
        pathParams: {
          id: parseInt(editUserId as unknown as string),
        },
        body: requestBody,
      });
    } else {
      branchResponse = await createBranch({
        body: requestBody,
      });
    }
    if (!isEdit || (isEdit && branchResponse?.id)) {
      setSuccess(true);
      await refetchUserDetails();
      setIsConfirmationModalOpen(true);
      setInfoMsg(`Branch successfully ${isEdit ? "updated" : "created"} `);
    } else {
      setIsConfirmationModalOpen(true);
      const error =
        branchResponse?.message ||
        `Something went wrong while ${isEdit ? "updating" : "creating"
        } user...`;
      setInfoMsg(error);
    }

    router.push('/branch')
  };

  const handleBack = () => {
    router.push("/branch");
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    if (success) router.push("/branch");
  };

  return (
    <>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 res-title-height flex flex-wrap justify-between items-center">
          {/* <Box className="flex justify-between items-center sm:block"> */}
          <PanelHeading
            firstHeading={`${isEdit ? "Edit Branch" : "Create Branch"}`}
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
                      lg={3}
                      xl={3}
                      className="mb-0"
                    >
                      <label className="form-custom-label">
                        Branch Name
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <TextField
                        {...register("name")}
                        name="name"
                        placeholder="Enter Branch Name"
                        type="text"
                        inputProps={{ maxLength: 64, autoComplete: "off" }}
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
                      lg={3}
                      xl={3}
                      className="mb-0"
                    >
                      <label className="form-custom-label">
                        Contact Person
                      </label>
                      <TextField
                        {...register("contactPerson")}
                        placeholder="Contact Person"
                        name="contactPerson"
                        inputProps={{ maxLength: 64, autoComplete: "off" }}
                        type="text"
                        defaultValue={fieldValues?.contactPerson}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                      />
                      {errors.contactPerson && (
                        <Typography color="error">
                          {errors.contactPerson.message}
                        </Typography>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={3}
                      className="mb-0"
                    >
                      <label className="form-custom-label">Email </label>
                      <TextField
                        {...register("email")}
                        placeholder="Enter Email"
                        inputProps={{ maxLength: 50, autoComplete: "off" }}
                        name="email"
                        type="emailId"
                        defaultValue={fieldValues?.email}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                      />
                      {errors.email && (
                        <Typography color="error">
                          {errors.email.message}
                        </Typography>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={3}
                      className="mb-0"
                    >
                      <label className="form-custom-label">Phone </label>
                      <TextField
                        {...register("contactNumber")}
                        placeholder="Enter Phone"
                        name="contactNumber"
                        inputProps={{ maxLength: 15, minLength: 10 }}
                        type="text"
                        defaultValue={fieldValues?.contactNumber}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                      />
                      {errors.contactNumber && (
                        <Typography color="error">
                          {errors.contactNumber.message}
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
                      className="mb-0"
                    >
                      <label className="form-custom-label">Address 1</label>
                      <TextField
                        {...register("address1")}
                        placeholder="Enter Address 1"
                        name="address1"
                        inputProps={{ maxLength: 256, autoComplete: "off" }}
                        type="text"
                        defaultValue={fieldValues?.address1}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                      />
                      {errors.address1 && (
                        <Typography color="error">
                          {errors.address1.message}
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
                      className="mb-0"
                    >
                      <label className="form-custom-label">Address 2</label>
                      <TextField
                        {...register("address2")}
                        placeholder="Enter Address 2"
                        name="address2"
                        inputProps={{ maxLength: 256, autoComplete: "off" }}
                        type="text"
                        defaultValue={fieldValues?.address2}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                      />
                      {errors.address2 && (
                        <Typography color="error">
                          {errors.address2.message}
                        </Typography>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={3}
                      xl={3}
                      className="mb-0"
                    >
                      <label className="form-custom-label">City</label>
                      <TextField
                        {...register("city")}
                        placeholder="Enter City"
                        name="city"
                        inputProps={{ maxLength: 64, autoComplete: "off" }}
                        type="text"
                        defaultValue={fieldValues?.city}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                      />
                      {errors.city && (
                        <Typography color="error">
                          {errors.city.message}
                        </Typography>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={3}
                      xl={3}
                      className="mb-0"
                    >
                      <label className="form-custom-label">State</label>
                      <TextField
                        {...register("state")}
                        placeholder="Enter State"
                        name="state"
                        inputProps={{ maxLength: 64, autoComplete: "off" }}
                        type="text"
                        defaultValue={fieldValues?.state}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                      />
                      {errors.state && (
                        <Typography color="error">
                          {errors.state.message}
                        </Typography>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={3}
                      xl={3}
                      className="mb-0"
                    >
                      <label className="form-custom-label">Country</label>
                      <TextField
                        {...register("country")}
                        placeholder="Enter Country"
                        name="country"
                        type="text"
                        inputProps={{ maxLength: 64, autoComplete: "off" }}
                        defaultValue={fieldValues?.country}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0 "
                      />
                      {errors.country && (
                        <Typography color="error">
                          {errors.country.message}
                        </Typography>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={3}
                      xl={3}
                      className="mb-0"
                    >
                      <label className="form-custom-label">Zip Code</label>
                      <TextField
                        {...register("pincode")}
                        placeholder="Enter Zip Code"
                        name="pincode"
                        inputProps={{ maxLength: 10, minLength: 4 }}
                        type="text"
                        defaultValue={fieldValues?.pincode}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                      />
                      {errors.pincode && (
                        <Typography color="error">
                          {errors.pincode.message}
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
                          Select Brand
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
                            <Box className=" opacity-50">Select Brand</Box>
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
                      lg={3}
                      xl={3}
                      className="mb-0"
                    >
                      <label className="form-custom-label">
                        Duplicate Name
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <TextField
                        {...register("duplicateName")}
                        placeholder="Enter Duplicate Name"
                        name="duplicateName"
                        type="text"
                        inputProps={{ maxLength: 64, autoComplete: "off" }}
                        defaultValue={fieldValues?.duplicateName}
                        className="dropdownComponent rounded-lg bg-white text-blacklight600 h-12 p-0 shadow-[0_2px_24px_0_rgba(0,0,0,.1)]"
                      />
                      {errors.duplicateName && (
                        <Typography color="error">
                          {errors.duplicateName.message}
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
export default ManageUser;
