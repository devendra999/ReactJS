"use client";
import React, { useEffect, useState, useRef, use } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  ListItemText,
  ListItemIcon,
  SelectChangeEvent,
} from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import Checkbox from "@mui/material/Checkbox";
import { UserData } from "../user-management/user-interface";
import {
  useBranchControllerFilterBranch,
  useBranchControllerFilterBranchForLandmark,
  useBrandControllerAllBrandsGetForLandmarkCrud,
  useCreateManyBaseBranchUserControllerBranchUser,
  useCreateOneBaseUserControllerUser,
  useGetManyBaseBranchUserControllerBranchUser,
  useGetManyBaseBrandControllerBrand,
  useGetManyBaseRolesControllerRoles,
  useRolesControllerAllRolesGetForLandmark,
  useUpdateOneBaseUserControllerUser,
  useUserControllerCreateUserLandmark,
  useUserControllerEmailDuplicationCheck,
} from "../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "./schema/schema";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getFromLocalStorage } from "@root/utils/common";
import dayjs from "dayjs";
import OutlinedInput from "@mui/material/OutlinedInput";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

interface Options {
  value: number;
  label: string;
}

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [roleOptions, setRoleOptions] = useState<Options[]>([]);
  const [brandOptions, setBrandOptions] = useState<Options[]>([]);
  const [branchOptions, setBranchOptions] = useState<Options[]>([]);
  const [infoMsg, setInfoMsg] = useState("");

  const [fieldValues, setFieldValues] = useState<UserData>({
    fullName: "",
    username: "",
    password: "",
    roleId: null,
    branches: [],
    duplicateFullName: [],
  });

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const branchListContainerRef = useRef(null);

  const { mutateAsync: createUser, isLoading } =
    useUserControllerCreateUserLandmark();

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(signUpSchema),
    // defaultValues: fieldValues,
  });

  const { data: allBrands, refetch: refetchBrands } =
    useBrandControllerAllBrandsGetForLandmarkCrud(
      {},
      {
        enabled: false,
      }
    );

  const { data: allRoles, refetch: refetchAllRoles } =
    useRolesControllerAllRolesGetForLandmark(
      {},
      {
        enabled: false,
      }
    );

  const {
    data: branches,
    refetch: refetchBranches,
    isLoading: branchesLoading,
  } = useBranchControllerFilterBranchForLandmark(
    {
      queryParams: {
        brand_id: fieldValues?.brandId,
      },
    },
    {
      enabled: false,
    }
  );

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    if (name === "branches") {
      if (Array.isArray(value) && value.includes("selectAll")) {
        // If "Select All" is checked, toggle between selecting all and deselecting all
        const allSelected =
          fieldValues?.branches.length === branchOptions.length;

        const updatedBranches = allSelected
          ? []
          : branchOptions.map((option) => option.value);

        setFieldValues({ ...fieldValues, branches: updatedBranches });
      } else {
        // Remove "selectAll" from the selected branches if it was previously selected
        const updatedValue = value.filter((val) => val !== "selectAll");

        // Otherwise, update the selected branches normally
        setFieldValues({ ...fieldValues, [name]: updatedValue });
      }
    } else {
      setFieldValues({ ...fieldValues, [name]: value });
    }

    setTimeout(() => {
      if (branchListContainerRef.current) {
        branchListContainerRef.current.scrollTop =
          branchListContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const isAllSelected =
    fieldValues?.branches?.length === branchOptions.length &&
    fieldValues?.branches?.every((branch) =>
      branchOptions.some((option) => option.value === branch)
    );

  const handleTogglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  useEffect(() => {
    refetchAllRoles();
    refetchBrands();
  }, []);

  useEffect(() => {
    if (branchListContainerRef.current) {
      branchListContainerRef.current.scrollTop =
        branchListContainerRef.current.scrollHeight;
    }
  }, [fieldValues?.branches]);

  useEffect(() => {
    if (fieldValues?.brandId !== null) {
      refetchBranches();
    }
  }, [fieldValues?.brandId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse: any = await refetchAllRoles();
        if (rolesResponse.isSuccess) {
          const rolesData = rolesResponse.data.data;
          if (Array.isArray(rolesData) && rolesData.length > 0) {
            const options = rolesData
              .filter((item: any) => !item.isSuperAdmin)
              .map((item: any) => ({
                value: item.id,
                label: item.name,
                code: item.roleCode,
                superAmin: item.isSuperAdmin,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));
            setRoleOptions(options);
          }
        } else {
          console.error("API call error");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, [refetchAllRoles]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsResponse: any = await refetchBrands();
        const branchesResponse = await refetchBranches();
        if (brandsResponse.isSuccess) {
          const brandsData: any = brandsResponse?.data.data;
          const branchesData = (branchesResponse as any)?.data?.data;
          if (Array.isArray(brandsData) && brandsData.length > 0) {
            const options = brandsData
              ?.map((item: any) => ({
                value: item.id,
                label: item.name,
                code: item.roleCode,
                superAmin: item.isSuperAdmin,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));
            setBrandOptions(options);
          }

          if (
            branchesData !== undefined &&
            Array.isArray(branchesData) &&
            branchesData.length > 0
          ) {
            const options = branchesData
              .map((item) => ({
                value: item.id,
                label: item.name,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));
            setBranchOptions(options);
          }
        } else {
          console.error("API call error");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, [refetchBrands, fieldValues?.brandId]);

  const clearForm = () => {
    clearErrors();
    reset();
    setFieldValues({
      roleId: null,
      branches: [],
      dateOfJoining: null,
      dateOfLeaving: null,
      isActive: true,
    });
  };

  const onSubmit = async (data: UserData | any) => {
    const requestBody: any = {
      username: data?.username,
      fullName: data?.fullName,
      roleId: data?.roleId as number,
      password: data?.password,
      duplicateFullName: [data?.fullName],
      brandId: (data.brandId as number) || null,
      branchId: data?.branches,
      isDeleted: false,
    };

    let userResponse: any;

    userResponse = await createUser({
      body: requestBody,
    });

    if (userResponse?.statusCode == 200) {
      setSuccess(true);
      setIsConfirmationModalOpen(true);
      setInfoMsg(`User successfully created`);
      clearForm();
    } else {
      setIsConfirmationModalOpen(true);
      const error =
        userResponse?.message || `Something went wrong while creating user...`;
      setInfoMsg(error);
    }
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative signup-page">
      <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 mb-2 res-title-height flex flex-wrap justify-between items-center">
        <PanelHeading firstHeading={`Sign Up`} />
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
                className="outlineBtn mx-1 animate__animated animate__fadeIn animate__delay-600ms"
                ButtonTitle="Close"
                type="button"
                onClick={handleConfirmationCloseModal}
              />
            </Box>
          </Box>
        </Box>
      </Modal>

      <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 edit-user">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      Full Name{" "}
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("fullName")}
                      placeholder="Enter Full Name"
                      type="text"
                      defaultValue={fieldValues?.fullName}
                      className="dropdownComponent rounded-lg text-blacklight p-0"
                      error={errors?.fullName ? true : false}
                      helperText={errors?.fullName?.message}
                      inputProps={{ maxLength: 64 }}
                    />
                    {/* {errors.fullName && (
                        <Typography color="error">
                          {errors.fullName.message}
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
                      User Name{" "}
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("username")}
                      placeholder="Enter Username"
                      name="username"
                      type="text"
                      defaultValue={fieldValues?.username}
                      className="dropdownComponent rounded-lg text-blacklight p-0"
                      inputProps={{ maxLength: 64, minLength: 3 }}
                    />
                    {errors.username && (
                      <Typography color="error">
                        {errors.username.message}
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
                    <label className="form-custom-label">
                      Password{" "}
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>

                    <Tooltip
                      title={
                        <Typography className="tooltip-points-content text-[0.6563rem]">
                          <Box className="title-points-content flex items-center justify-between text-[0.75rem] mb-[0.1875rem] pb-[0.1875rem]">
                            <Box>Password must contain the following:</Box>
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
                              Password must contain at least 1 special character{" "}
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
                        {...register("password")}
                        placeholder="Enter Password"
                        name="password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        defaultValue={fieldValues?.password}
                        className="dropdownComponent rounded-lg text-blacklight p-0"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              className="button-fix-position"
                            >
                              <IconButton
                                onClick={() =>
                                  handleTogglePasswordVisibility("password")
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
                        onBlur={() => setShowTooltip(false)}
                        onFocus={() => setShowTooltip(true)}
                        onKeyDown={() => setShowTooltip(false)}
                        onClick={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      />
                    </Tooltip>
                    {errors.password && (
                      <Typography color="error">
                        {errors.password.message}
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
                    <label className="form-custom-label">
                      Confirm Password{" "}
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("confirmPassword")}
                      placeholder="Enter Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      defaultValue={fieldValues?.confirmPassword}
                      className="dropdownComponent rounded-lg text-blacklight p-0"
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

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className="mb-0"
                    container
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={4}
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
                          Role{" "}
                          <span style={{ color: "red" }}>
                            <sup>*</sup>
                          </span>
                        </label>
                        <Select
                          {...register("roleId")}
                          name="roleId"
                          displayEmpty
                          input={<OutlinedInput />}
                          value={fieldValues?.roleId || ""}
                          className="custom-select-item"
                          onChange={handleSelectChange}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "300px", // Set your desired max height here
                                overflowY: "auto", // Add scrolling if content exceeds maxHeight
                              },
                            },
                          }}
                          renderValue={(selected) => {
                            if (selected.length == 0) {
                              return <em>Select Role</em>;
                            }

                            const selectedOption = roleOptions?.find(
                              (option: any) => option?.value == selected
                            );
                            return (
                              <div>
                                {selectedOption
                                  ? selectedOption.label || selectedOption.value
                                  : selected}
                              </div>
                            );
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem disabled value="">
                            Select Role
                          </MenuItem>
                          {roleOptions?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>

                        {errors.roleId && (
                          <Typography color="error">
                            {errors.roleId.message}
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
                      xl={4}
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
                          Brands{" "}
                          <span style={{ color: "red" }}>
                            <sup>*</sup>
                          </span>
                        </label>
                        <Select
                          {...register("brandId")}
                          name="brandId"
                          displayEmpty
                          input={<OutlinedInput />}
                          value={fieldValues?.brandId || ""}
                          className="custom-select-item"
                          onChange={handleSelectChange}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "300px", // Set your desired max height here
                                overflowY: "auto", // Add scrolling if content exceeds maxHeight
                              },
                            },
                          }}
                          renderValue={(selected) => {
                            if (selected.length == 0) {
                              return <em>Select Role</em>;
                            }

                            const selectedOption = brandOptions?.find(
                              (option: any) => option?.value == selected
                            );
                            return (
                              <div>
                                {selectedOption
                                  ? selectedOption.label || selectedOption.value
                                  : selected}
                              </div>
                            );
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem disabled value="">
                            Select Role
                          </MenuItem>
                          {brandOptions?.map((option) => (
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
                      xl={4}
                      className="label-form-input"
                    >
                      {fieldValues?.brandId && (
                        <Grid
                          className="dropdownComponent custom-selectitem-main"
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <label
                            id="branches-label"
                            className="form-custom-label"
                            style={{ marginBottom: ".25rem" }}
                          >
                            Branches{" "}
                            <span style={{ color: "red" }}>
                              <sup>*</sup>
                            </span>
                          </label>
                          <Select
                            {...register("branches")}
                            labelId="branches-label"
                            id="branches"
                            name="branches"
                            className="custom-select-item"
                            multiple
                            // multiple={fieldValues?.roleCode !== "sales_dashboard" || fieldValues?.roleCode !== "service_dashboard"}
                            value={
                              fieldValues?.branches ? fieldValues?.branches : []
                            }
                            onChange={handleSelectChange}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: "200px", // Set your desired max height here
                                  overflowY: "auto", // Add scrolling if content exceeds maxHeight
                                },
                              },
                            }}
                            displayEmpty
                            renderValue={(selected: any) => {
                              if (selected?.length === 0) {
                                return <em>Select Branches</em>;
                              }
                              if (Array.isArray(selected)) {
                                return (
                                  <div ref={branchListContainerRef}>
                                    {selected &&
                                      selected?.map((value, index: number) => {
                                        const selectedOption =
                                          branchOptions.find(
                                            (option) => option.value == value
                                          );

                                        return (
                                          <div key={index}>
                                            {selectedOption
                                              ? selectedOption.label ||
                                                selectedOption.value
                                              : value}
                                          </div>
                                        );
                                      })}
                                  </div>
                                );
                              }
                            }}
                          >
                            <MenuItem disabled value="">
                              Select Branches
                            </MenuItem>
                            <MenuItem
                              value="selectAll"
                              className="sm-checkbox-list"
                            >
                              <ListItemIcon>
                                <Checkbox checked={isAllSelected} />
                              </ListItemIcon>
                              <ListItemText primary="Select All" />
                            </MenuItem>

                            {branchOptions.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                                className="sm-checkbox-list"
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    checked={fieldValues?.branches.includes(
                                      option.value
                                    )}
                                  />
                                </ListItemIcon>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.branches && (
                            <Typography color="error">
                              {errors.branches.message}
                            </Typography>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              <Box className="w-100 mb-2 mt-3 flex justify-center manage-btn">
                <ButtonItem
                  className="containBtn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                  ButtonTitle="Cancel"
                  type="submit"
                />
                <ButtonItem
                  className="containBtn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                  ButtonTitle="Save"
                  type="submit"
                />
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default SignUp;
