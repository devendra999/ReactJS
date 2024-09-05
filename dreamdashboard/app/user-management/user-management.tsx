"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Autocomplete,
  ListItem,
  Grid,
} from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import SidebarWithLayout from "../layout-with-sidebar";
import UserListing from "../../components/UserListing";
import {
  useGetManyBaseUserControllerUser,
  useGetOneBaseUserControllerUser,
  useBranchControllerFilterBranch,
  useUserControllerFilterBranchUser,
  useUserControllerChangePassword
} from "@root/backend/backendComponents";
import Image from "next/image";
import editicon from "../../assets/icons/edit.svg";
import changePassword from "../../assets/icons/change-password.png";
import LockResetIcon from "@mui/icons-material/LockReset";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getFromLocalStorage } from "@root/utils/common";
import { useAuthStore } from "../../store/auth-store";
import Loading from "@root/components/Loading";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@root/components/Modal";
import { changePasswordModelSchema } from "./schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UserData } from "./user-interface";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

interface ScrollTargetRefs {
  branchFilter?: any;
}

export default function UserManagement() {
  const router = useRouter();
  // const filterData = JSON.parse(getFromLocalStorage("@filter-data") || "{}");
  const [locationOptionsVal, setLocationOptions] = useState([]);
  const currentUser = useAuthStore((state) => state.loginData)?.user;
  const brandId = JSON.parse(getFromLocalStorage("@brand-id") || "{}");
  const [userOptionsVal, setUserOptions] = useState([]);
  const [commanFilterVal, setCommanFilterVal] = useState({
    location: null,
  });
  const [selectedLocation, setSelectedLocation] = useState(null || []);
  const [selectedLocationValues, setSelectedLocationOnChange] = useState<any>(
    []
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
  useState<boolean>(false);
 const [success, setSuccess] = useState<boolean>(false);   
 const [showNewPassword, setShowNewPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [showTooltip, setShowTooltip] = useState(false);
 const [infoMsg, setInfoMsg] = useState("");
 const [editUserId, setEditUserId] = useState('');
 const response = JSON.parse(getFromLocalStorage("@login-response") || "{}");
  const [changeLocationValue, setchangeLocation] = useState(false);
  const scrollTargetRefs = useRef<ScrollTargetRefs>({});
  const isSuperAdmin = getFromLocalStorage("@super-admin");
  const superAdmin = Boolean(isSuperAdmin);
  const {
    data: usersData,
    refetch: fetchUsers,
    isLoading: loading,
  } = useGetManyBaseUserControllerUser(
    {
      queryParams: {
        join: ["role"],
      },
    },
    { enabled: false }
  );

  const queryParams = {
    user_id: (currentUser as any)?.userId,
    brand_id: brandId.brandId,
  };
  const queryParamsUser = {
    user_id: (currentUser as any)?.userId,
    brand_id: brandId.brandId,
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const { data: locationData, refetch: fetchLocation } =
    useBranchControllerFilterBranch(
      { queryParams: queryParams },

      {
        enabled: false,
      }
    );

  const { data: userData, refetch: fetchUser } =
    useUserControllerFilterBranchUser(
      { queryParams: queryParamsUser },

      {
        enabled: false,
      }
    );

  useEffect(() => {
    fetchLocation();
    fetchUser();
  }, []);

  useEffect(() => {
    const locationList = (locationData as any)?.data;
    const userList = (userData as any)?.data;
    // const masterLists = masterData;

    if (locationList) {
      const locationOptions = (locationList as any)?.map((location: any) => ({
        label: location.name,

        value: location.id,
      }));

      // locationOptions.splice(0, 0,  { lable: "All", value: 'All' });

      setLocationOptions(locationOptions);
    }
    if (userList) {
      const userOptions = (userList as any)?.map((user: any) => ({
        label: user.user.fullName,

        value: user.user.id,
      }));
      setUserOptions(userOptions);
    }
  }, [locationData, userData]);
  // console.log("userOptionsVal----1>",userOptionsVal);

  useEffect(() => {
    if (changeLocationValue == true) {
      (queryParamsUser as any).branch_id = selectedLocationValues;
      fetchUser();
    } else {
      fetchUser();
    }
  }, [changeLocationValue, selectedLocationValues]);

  const filterBranchOptions = (options: any, { inputValue }: any) => {
    return options.filter((option: any) => {
      // Check if the option is not already selected
      if (
        selectedLocation?.some(
          (selected: any) => selected.label === option.label
        )
      ) {
        return false;
      }
      // Check if the input value matches the option's label
      return option.label
        .toLowerCase()
        .includes((inputValue as any).toLowerCase());
    });
  };

  const handleInputLocation = (
    // event: React.ChangeEvent<{}>,
    event: React.SyntheticEvent<Element, Event>,
    newValue: any | null
  ) => {
    const locationArray: any[] = [];
    if (newValue && newValue.length > 0) {
      (newValue as any[])?.map((singleLocation: any) => {
        locationArray.push(singleLocation.value);
        return singleLocation; // Make sure to return the mapped value
      });
    }
    setSelectedLocation(newValue);
    setSelectedLocationOnChange(locationArray);
    setCommanFilterVal((prevState) => ({ ...prevState, location: newValue }));
    if (newValue && newValue.length > 0) {
      setchangeLocation(true);
    } else {
      setchangeLocation(false);
    }
    // setSelectedUser(null);

    // console.log("Location", locationArray);
    // console.log("user", selectedUser);
    // console.log("UserOptions", userOptionsVal);

    // after adding multiple values in Autocomplete field scroll to bottom
    if (scrollTargetRefs.current.branchFilter.children[0]) {
      setTimeout(() => {
        scrollTargetRefs.current.branchFilter.children[0].scrollTop = 1000;
      }, 100);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "status",
      headerName: "Status",
      // flex: 1,
      width: 140,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
    },
    {
      field: "action",
      headerName: "Action",
      // flex: 1,
      width: 330,
      cellClassName: "py-3.5 px-2.5 centered-cell",
      headerClassName: "py-3 px-2.5 text-white centered-cell",
      minWidth: 170,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditClick(params.row.id)}>
            <Box
              className="bg-blue2 animate__animated animate__fadeIn justify-center min-w-[5.75rem] hover:bg-darkblue inline-flex rounded-md text-blacklight hover:text-white py-2.5 px-4 text-[.8125rem] cursor-pointer group hover:opacity-80  badge badge-primary items-center badge-icon"
              tabIndex={0}
              title="Edit User"
            >
              <Image
                src={editicon}
                alt="edit"
                // width={20}
                // height={20}
                className="w-5 h-5 mr-2 group-hover:brightness-0 group-hover:invert"
              />
              Edit
            </Box>
          </IconButton>
          <IconButton onClick={() => handleChangePasswordClick(params.row.id)}>
            <Box
              className="bg-blue2 animate__animated animate__fadeIn justify-center min-w-[5.75rem] hover:bg-darkblue inline-flex rounded-md text-blacklight hover:text-white py-2.5 px-4 text-[.8125rem] cursor-pointer group hover:opacity-80 badge badge-primary items-center badge-icon"
              tabIndex={0}
              title="Change Password"
            >
              <Image
                src={changePassword}
                alt="change password"
                // width={30}
                className="w-5 h-5 mr-2 group-hover:brightness-0 group-hover:invert"
              />
              Reset Password
            </Box>
          </IconButton>
        </>
      ),
    },
  ];

  const handleCreateUser = () => {
    router.push(`/user-management/user-form`);
  };

  const handleEditClick = (id: number) => {
    router.push(`/user-management/user-form?id=${id}`);
  };

  const handleChangePasswordClick = (id: number) => {
    setEditUserId(id)
    // router.push(`/user-management/change-password?id=${id}`);
    setIsModalOpen(true)
  };

  let userArray: any = [];
  if (superAdmin) {
    userOptionsVal?.forEach((obj: any) => {
      (usersData as any)?.forEach((user: any) => {
        if (obj?.value === user?.id) {
          userArray?.push({
            id: user?.id,
            name: user?.fullName,
            email: user?.emailId,
            phone: user?.contactNumber,
            role: user?.role?.name,
            isSuperAdmin: user?.role?.isSuperAdmin,
            status: user?.isActive ? "Active" : "InActive",
          });
        }
      });
    });
  } else {
    userOptionsVal?.forEach((obj: any) => {
      (usersData as any)?.forEach((user: any) => {
        if (obj?.value === user.id && user?.role?.isSuperAdmin === false) {
          userArray?.push({
            id: user?.id,
            name: user?.fullName,
            email: user?.emailId,
            phone: user?.contactNumber,
            role: user?.role.name,
            isSuperAdmin: user?.role?.isSuperAdmin,
            status: user?.isActive ? "Active" : "InActive",
          });
        }
      });
    });
  }

  // let userArray: any = [];
  // userOptionsVal.map((obj: any) => {
  //   (usersData as any)?.map(
  //     (user: any) =>
  //       obj.value == user.id &&
  //       userArray.push({
  //         id: user?.id,
  //         name: user?.fullName,
  //         email: user?.emailId,
  //         phone: user?.contactNumber,
  //         role: user?.role?.name,
  //         status: user?.isActive == true ? "Active" : "InActive",
  //       })
  //   );
  // });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    editUserId &&
      infoMsg == "Password Changed Successfully" &&
      router.push("/user-management");

      clearErrors();
      reset();
      setFieldValues({
        newPassword: "",
        confirmPassword: "",
      });

  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordModelSchema()),
  });


  const [fieldValues, setFieldValues] = useState<UserData>({
    newPassword: "",
    confirmPassword: "",
  });
  

  const { mutateAsync: changePasswordModal } = useUserControllerChangePassword();


  const onSubmit = async (data: UserData | any) => {

    const requestBody: UserData = {
      userId: editUserId
        ? (userDetails as any)?.keyCloakId
        : response?.user?.sub,
      newPassword: data?.newPassword,
    };
    let userResponse: any = await changePasswordModal({
      body: requestBody,
    });

    if (userResponse?.statusCode == 200 || userResponse?.userId) {
      setSuccess(true);
      setIsConfirmationModalOpen(true);
      setInfoMsg(`Password Changed Successfully`);
      clearForm();
      setIsModalOpen(false);
    } else if (userResponse?.statusCode == 400) {
      setIsConfirmationModalOpen(true);
      const error = userResponse?.message || `Something went wrong`;
      setInfoMsg(error);
    } else {
      setIsConfirmationModalOpen(true);
      const error = userResponse?.message || `Something went wrong`;
      setInfoMsg(error);
    }
  };

  const handleTogglePasswordVisibility = (field: string) => {
    if (field === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
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

  const clearForm = () => {
    clearErrors();
    reset();
    setFieldValues({
      newPassword: "",
      confirmPassword: "",
    });
  };


  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    editUserId &&
      infoMsg == "Password Changed Successfully" &&
      router.push("/user-management");
  };


  return (
    <>
      <SidebarWithLayout>
        <Box className="content-wrapper pb-6 h-full relative user-management-page">
          {/* <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 mb-4 res-title-height flex flex-wrap justify-between items-center"> */}
          {/* <Box className="flex justify-between items-center sm:block"> */}
          {/* <PanelHeading firstHeading={"User Management"} /> */}

          {/* </Box> */}
          <Loading className={`${loading && usersData?.length > 0 && userArray?.length > 0 ? "" : "hide"} `} />

          <Box className="filter-input-field-main order-4">
            <Autocomplete
              className="custom_filter"
              multiple
              id="grouped-demo"
              onChange={handleInputLocation}
              options={locationOptionsVal}
              getOptionLabel={(option: any) => option.label}
              value={selectedLocation === null ? [] : selectedLocation}
              filterOptions={filterBranchOptions}
              filterSelectedOptions={true}
              renderInput={(params) => (
                <TextField
                {...params}
                label="Branch Filter"
                size="small"
                className="custom_filter_button"
                ref={(el) => (scrollTargetRefs.current.branchFilter = el)} // Assign ref for the user Autocomplete
                />
              )}
            />
              <ButtonItem
                className="containBtn create-btn mx-1"
                ButtonTitle="Create User"
                type="button"
                onClick={handleCreateUser}
              />
          </Box>
          {/* </Box> */}

          <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              modalextraclass="modal-small"
            >
              {/* <Box> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box className=" flex items-center">
                    <Box className="max-w-full">
                    <Box className="max-w-full" key={0}>
                    <Grid container spacing={2}>
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
                            type={showNewPassword ? "text" : "password"}
                            inputProps={{ maxLength: 127, autoComplete: "off" }}
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
                          <Typography color="error" className=" text-sm">
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
                          type={showConfirmPassword ? "text" : "password"}
                          defaultValue={fieldValues?.confirmPassword}
                          inputProps={{ maxLength: 127, autoComplete: "off" }}
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
                          <Typography color="error" className=" text-sm">
                            {errors.confirmPassword.message}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>

                      <Box className="w-100 mb-2 mt-5 flex justify-center">
                        <ButtonItem
                          className="containBtn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                          ButtonTitle="Save"
                          type="submit"
                        />
                      </Box>
                    </Box>
                  </Box>
                </form>
            </Modal>

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

          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 user-list-table">
            <Box className="dashboard-sales-items">
              <UserListing usersData={userArray} columns={columns} />
            </Box>
          </Box>
        </Box>
      </SidebarWithLayout>
    </>
  );
}
