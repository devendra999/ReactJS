"use client";
import React, { useEffect, useState, useRef } from "react";
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
import CustomDatePicker from "../../../components/CustomDatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { UserData } from "../user-interface";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Table from "../../../components/Table";
import {
  useGetManyBaseRolesControllerRoles,
  useCreateManyBaseBranchUserControllerBranchUser,
  useGetManyBaseBranchUserControllerBranchUser,
  useCreateOneBaseUserControllerUser,
  useBranchControllerFilterBranch,
  useUpdateOneBaseUserControllerUser,
  useBranchUserControllerBulkDelete,
  useAuthControllerLogout,
  useDashboardShareControllerPermissionRoleKpi,
  useDashboardShareControllerGetCronTypeWiseFunction,
  useUserControllerEmailDuplicationCheck,
  useUserControllerUpdateUserInKeyClock,
} from "../../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../schema/schema";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getFromLocalStorage } from "@root/utils/common";
import dayjs from "dayjs";
import OutlinedInput from "@mui/material/OutlinedInput";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Options {
  value: number;
  label: string;
}

interface ManageUserProps {
  isEdit: boolean;
  initialUserData: any;
  refetchUserDetails?: any;
}
const timeSlots = [
  { key: "10.00AM", value: "10:00:00" },
  { key: "11.00AM", value: "11:00:00" },
  { key: "12.00PM", value: "12:00:00" },
  { key: "1.00PM", value: "13:00:00" },
  { key: "2.00PM", value: "14:00:00" },
  { key: "3.00PM", value: "15:00:00" },
  { key: "4.00PM", value: "16:00:00" },
  { key: "5.00PM", value: "17:00:00" },
  { key: "6.00PM", value: "18:00:00" },
  { key: "7.00PM", value: "19:00:00" },
  { key: "8.00PM", value: "20:00:00" },
  { key: "9.00PM", value: "21:00:00" },
  { key: "10.00PM", value: "22:00:00" },
  { key: "11.00PM", value: "23:00:00" },
  { key: "12.00AM", value: "24:00:00" },
  { key: "1.00AM", value: "01:00:00" },
  { key: "2.00AM", value: "02:00:00" },
  { key: "3.00AM", value: "03:00:00" },
  { key: "4.00AM", value: "04:00:00" },
  { key: "5.00AM", value: "05:00:00" },
  { key: "6.00AM", value: "06:00:00" },
  { key: "7.00AM", value: "07:00:00" },
  { key: "8.00AM", value: "08:00:00" },
  { key: "9.00AM", value: "09:00:00" },
];
const dashboardTypes = [
  { key: "Sales", value: "sl_dashboard" },
  { key: "Service", value: "sr_dashboard" },
];
const ManageUser: React.FC<ManageUserProps> = ({
  isEdit,
  initialUserData,
  refetchUserDetails,
}) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [roleOptions, setRoleOptions] = useState<Options[]>([]);
  const [branchOptions, setBranchOptions] = useState<Options[]>([]);
  const [deleteBranchIds, setDeleteBranchIds] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const [isBranchesMultiple, setIsBranchesMultiple] = useState(false);

  const [editUserId, setEditUserId] = useState(searchParams.get("id"));
  const [dashboardShareArray, setDashboardShareArray] = useState<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [fieldValues, setFieldValues] = useState<UserData>(
    isEdit
      ? {
          fullName: initialUserData?.fullName || "",
          username: initialUserData?.username || "",
          emailId: initialUserData?.emailId || "",
          contactNumber: initialUserData?.contactNumber || "",
          address1: initialUserData?.address1 || "",
          address2: initialUserData?.address2 || "",
          city: initialUserData?.city || "",
          state: initialUserData?.state || "",
          country: initialUserData?.country || "",
          pincode: initialUserData?.pincode || "",
          // password: "",
          // confirmPassword: "",
          roleId: initialUserData?.roleId || null,
          branches: [],
          dateOfJoining: initialUserData?.dateOfJoining || null,
          dateOfLeaving: initialUserData?.dateOfLeaving || null,
          isActive: initialUserData?.isActive,
        }
      : {
          fullName: "",
          username: "",
          emailId: "",
          contactNumber: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          password: "",
          roleId: null,
          branches: [],
          dateOfJoining: null,
          dateOfLeaving: null,
          isActive: true,
        }
  );
  const currentUser = getFromLocalStorage("@user-details")
    ? JSON.parse(getFromLocalStorage("@user-details") as string)
    : {};

  const [infoMsg, setInfoMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { mutateAsync: createUser, isLoading } =
    useCreateOneBaseUserControllerUser();
  const { mutateAsync: updateUser } = useUpdateOneBaseUserControllerUser();
  const { mutateAsync: createBulkBranchUser, isLoading: branchUserLoading } =
    useCreateManyBaseBranchUserControllerBranchUser();
  const [showTooltip, setShowTooltip] = useState(false);
  const branchListContainerRef = useRef(null);
  const brandId = JSON.parse(getFromLocalStorage("@brand-id") || "{}");
  const [tenureSlot, setTenureSlot] = useState("");
  const [isButtonScheduleDisabled, setIsButtonScheduleDisabled] = useState<boolean>(false);
  const [isSchedulerModalOpen, setIsSchedulerModalOpen] =
    useState<boolean>(false);
  const queryParams = {
    user_id: (currentUser as any)?.id,
    brand_id: brandId.brandId as number,
  };

  const { data: roles, refetch: refetchRoles } =
    useGetManyBaseRolesControllerRoles(
      {},
      {
        enabled: false,
      }
    );

  const { data: userBranches, refetch: refetchUserBranches } =
    useGetManyBaseBranchUserControllerBranchUser(
      {},
      {
        enabled: false,
      }
    );

  const { mutateAsync: deletedBranch } = useBranchUserControllerBulkDelete();
  const { data: scheduleDataTypeWise, refetch: getAllScheduleDataTypeWise } =
    useDashboardShareControllerGetCronTypeWiseFunction(
      {
        queryParams: {
          userId: editUserId,
          brandId: brandId.brandId as number,
          cronType: tenureSlot,
        },
      },
      { enabled: false }
    );
    

  const {
    data: branches,
    refetch: refetchBranches,
    isLoading: branchesLoading,
  } = useBranchControllerFilterBranch(
    { queryParams: queryParams },
    {
      enabled: false,
    }
  );

  const { data: logoutData, refetch: refetchLogout } = useAuthControllerLogout(
    {
      pathParams: {
        userId: initialUserData?.keyCloakId,
      },
    },
    { enabled: false }
  );

  // update key clock details
  const { mutateAsync: updateUserInKeyClock } =
    useUserControllerUpdateUserInKeyClock();

  // save schedulaer details
  const { mutateAsync: saveschedulerDetails } =
    useDashboardShareControllerPermissionRoleKpi();

  const handleTenureChange = async (e) => {
    await setTenureSlot(e.target.value);
    if (tenureSlot !== "" || tenureSlot !== null) {
      const response = await getAllScheduleDataTypeWise();
      if (response && response?.data) {
        setIsButtonScheduleDisabled(true)
        setDashboardShareArray(response?.data?.data);
      }
    }
  };
  const handleCheckboxChange = (
    timeSlotValue: string,
    dashboardTypeValue: string,
    checked: boolean // Add a parameter to determine if the checkbox is checked or unchecked
  ) => {
    if (timeSlotValue && dashboardTypeValue) {
      if (checked) {
        // Check if the entry already exists
        const exists = dashboardShareArray?.some(
          (item) =>
            item.cronTimeSlot === timeSlotValue &&
            item.dashboardName.toLowerCase() ===
              dashboardTypeValue.toLowerCase()
        );

        // If the entry doesn't exist, push it
        if (!exists) {
          const newDashboardShareArray = [
            ...(dashboardShareArray || []),
            {
              dashboardName: dashboardTypeValue?.toLowerCase(),
              cronTimeSlot: timeSlotValue,
            },
          ];
          setDashboardShareArray(newDashboardShareArray);
        }
      } else {
        // If the checkbox is unchecked, remove the corresponding object from the array
        const newDashboardShareArray = dashboardShareArray?.filter(
          (item) =>
            !(
              item.cronTimeSlot === timeSlotValue &&
              item.dashboardName.toLowerCase() ===
                dashboardTypeValue.toLowerCase()
            )
        );
        setDashboardShareArray(newDashboardShareArray);
      }
    }
  };

  const handleSubmits = async (e) => {
    // Use dashboardShareArray as needed
    if (!initialUserData || !initialUserData.emailId) {
      setIsSubmitModalOpen(true);
      setErrMsg("Email is mandatory to subscribe dashboard report.");
    } else if (dashboardShareArray?.length === 0) {
      setIsSubmitModalOpen(true);
      setErrMsg("Please select at least one checkbox.");
    } else if (dashboardShareArray === null) {
      setIsSubmitModalOpen(true);
      setErrMsg("Please select at least one checkbox.");
    }  else {
      let bodyArray = {
        userId: editUserId,
        brandId: (brandId.brandId as number) || null,
        email: fieldValues.emailId,
        models: null,
        users: null,
        branches: null,
        cyLy: "cy",
        cronType: tenureSlot,
        DashboardShareArray: dashboardShareArray,
      };
      const response = await saveschedulerDetails({
        body: bodyArray,
      });
      if (response?.statusCode == 200) {
        setIsSchedulerModalOpen(true);
        setErrMsg("Scheduler details saved successfully.");
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await refetchRoles();
        const branchesResponse = await refetchBranches();
        if (rolesResponse.isSuccess && branchesResponse.isSuccess) {
          const rolesData = rolesResponse.data;
          const branchesData = (branchesResponse as any)?.data?.data;
          if (Array.isArray(rolesData) && rolesData.length > 0) {
            const options = rolesData
              .filter((item) => !item.isSuperAdmin)
              .map((item) => ({
                value: item.id,
                label: item.name,
                code: item.roleCode,
                superAmin: item.isSuperAdmin,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));
            setRoleOptions(options);
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
  }, [refetchRoles, refetchBranches]);

  const [triggerFetch, setTriggerFetch] = useState(false);
  

  useEffect(() => {
    
    const fetchData = async () => {
      const response: any = await refetchUserBranches();
      if (response.isSuccess && response?.data?.length > 0) {
        const filteredObjects = response?.data.filter(
          (obj: { userId: number | null }) => obj?.userId == editUserId
        );
        const data = filteredObjects.map(
          (obj: { id: number; branchId: number | null }) => {
            return {
              id: obj.id,
              branchId: obj.branchId,
            };
          }
        );

        const ids = data.map((obj: { id: number }) => obj?.id);
        const branchIds = data.map(
          (obj: { branchId: number }) => obj?.branchId as number
        );
        const existBranchIds = branchIds.filter((id: number) =>
          branchOptions.some((option) => option.value == id)
        );
        setFieldValues({ ...fieldValues, ["branches"]: existBranchIds });
        if (fieldValues?.branches && fieldValues?.branches.length === 0) {
          setValue("branches", existBranchIds);
        }        
        setDeleteBranchIds(ids);
      }
    };
    fetchData()
    // setTriggerFetch(false)
  }, [triggerFetch,editUserId, branchOptions]);



  
  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(userSchema(isEdit)),
    // defaultValues: fieldValues,
  });

  const handleDateChange = (name: string, date: Date) => {
    const formattedDate = date ? dayjs(date) : null;
    setFieldValues({ ...fieldValues, [name]: formattedDate });
  };

  // const handleSelectChange = (event: SelectChangeEvent) => {
  //   const { name, value } = event.target;
  //   setFieldValues({ ...fieldValues, [name]: value });
  // };

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

  useEffect(() => {
    if (branchListContainerRef.current) {
      branchListContainerRef.current.scrollTop =
        branchListContainerRef.current.scrollHeight;
    }
  }, [fieldValues?.branches]);





  const isAllSelected =
    fieldValues?.branches?.length === branchOptions.length &&
    fieldValues?.branches?.every((branch) =>
      branchOptions.some((option) => option.value === branch)
    );

    const { data: emailUserData, refetch: refetchcheckEmail} = useUserControllerEmailDuplicationCheck(
      {
        queryParams: {
          user_id: parseInt(editUserId as unknown as string),
          email_id: fieldValues?.emailId // Ensure the email_id is a string
        },
      },
      { enabled: false }
    );

  const onSubmit = async (data: UserData | any) => {
    setTriggerFetch(true);

    let modifiedFirstElement = data?.fullName;
    let duplicateFullNameArray = [];

    if (initialUserData && initialUserData.duplicateFullName) {
      duplicateFullNameArray = [
        modifiedFirstElement,
        ...initialUserData.duplicateFullName.slice(1),
      ];
    } else {
      duplicateFullNameArray = [modifiedFirstElement];
    }
    const requestBody: UserData = {
      fullName: data?.fullName,
      duplicateFullName: duplicateFullNameArray,
      username: data?.username,
      emailId: data?.emailId,
      contactNumber: data?.contactNumber ? data?.contactNumber : null,
      address1: data?.address1 ? data?.address1 : null,
      address2: data?.address2 ? data?.address2 : null,
      city: data?.city ? data?.city : null,
      state: data?.state ? data?.state : null,
      country: data?.country ? data?.country : null,
      pincode: data?.pincode ? data?.pincode : null,
      password: data?.password,
      roleId: data?.roleId as number,
      dateOfJoining: fieldValues?.dateOfJoining
        ? fieldValues?.dateOfJoining
        : null,
      dateOfLeaving :  fieldValues?.dateOfJoining
        ? fieldValues?.dateOfLeaving ? fieldValues.dateOfLeaving : null
        : null,
      // dateOfLeaving: fieldValues?.dateOfLeaving
      //   ? fieldValues?.dateOfLeaving
      //   : null,
      isActive: data?.isActive,
      isDeleted: false,
      createdBy: (currentUser?.id as number) || 1,
      dealerId: (currentUser?.dealerId as number) || null,
      brandId: (brandId.brandId as number) || null,
    };
    let userResponse: any;
    let keyClockUpdateResponse : any;

    if (isEdit) {
      
      try{  
        if (fieldValues && fieldValues?.emailId != null && fieldValues?.emailId !== "") { 
        const response = await refetchcheckEmail();  
         if (response && response?.data?.statusCode==400) {
          setIsButtonDisabled(true);
          userResponse = await updateUser({
            pathParams: {
              id: parseInt(editUserId as unknown as string),
            },
            body: requestBody,
          });

          const keyClockBody = {
            userId: initialUserData?.keyCloakId,
            firstName: data?.fullName.split(" ")[0],
            lastName: data?.fullName.split(" ")[1]
              ? data?.fullName.split(" ")[1]
              : "",
            email: data?.emailId,
          };

         keyClockUpdateResponse = await updateUserInKeyClock({
            body: keyClockBody,
          });
          if (keyClockUpdateResponse?.statusCode != 200 || keyClockUpdateResponse?.statusCode != "200") {
            userResponse = await updateUser({
              pathParams: {
                id: parseInt(editUserId as unknown as string),
              },
              body: {
                fullName: initialUserData?.fullName,
                emailId: initialUserData?.emailId,
              },
            });
            setIsConfirmationModalOpen(true);
            setInfoMsg("Email and/or Name could not be updated. Please try after some time.");
            return;
          }
    
          if (deleteBranchIds && deleteBranchIds.length > 0) {
            const deletedBranchResponse = await deletedBranch({
              body: { deleteIds: deleteBranchIds },
            });
            setDeleteBranchIds([]);
          }
          if (requestBody.isActive === false) {
            await refetchLogout();
          }
         } else if (response && response?.data?.statusCode===200) {
          setIsConfirmationModalOpen(true);
          setInfoMsg("Email ID is already associated with another user.");
          return
         } 
        } else {
          setIsButtonDisabled(true);
          userResponse = await updateUser({
            pathParams: {
              id: parseInt(editUserId as unknown as string),
            },
            body: requestBody,
          });

          const keyClockBody = {
            userId: initialUserData?.keyCloakId,
            firstName: data?.fullName.split(" ")[0],
            lastName: data?.fullName.split(" ")[1]
              ? data?.fullName.split(" ")[1]
              : "",
            email: data?.emailId,
          };

         keyClockUpdateResponse = await updateUserInKeyClock({
            body: keyClockBody,
          });
          if (keyClockUpdateResponse?.statusCode != 200 || keyClockUpdateResponse?.statusCode != "200") {
            userResponse = await updateUser({
              pathParams: {
                id: parseInt(editUserId as unknown as string),
              },
              body: {
                fullName: initialUserData?.fullName,
                emailId: initialUserData?.emailId,
              },
            });
            setIsConfirmationModalOpen(true);
            setInfoMsg("Email and/or Name could not be updated. Please try after some time.");
            return;
          }
    
          if (deleteBranchIds && deleteBranchIds.length > 0) {
            const deletedBranchResponse = await deletedBranch({
              body: { deleteIds: deleteBranchIds },
            });
            setDeleteBranchIds([]);
          }
          if (requestBody.isActive === false) {
            await refetchLogout();
          }

        }    
      } catch (e) {
        console.log("error")
      }
    
    } else {
      userResponse = await createUser({
        body: requestBody,
      });
    }
    if (
      (!isEdit && userResponse?.statusCode == 200) ||
      (isEdit && userResponse?.id && keyClockUpdateResponse?.statusCode == 200)
    ) {
      if (fieldValues?.branches && fieldValues?.branches.length > 0) {
        let bulkData: any = fieldValues?.branches?.map((id) => ({
          dealerId: currentUser?.dealerId || null,
          brandId: (brandId.brandId as number) || null,
          roleId: data?.roleId,
          branchId: id,
          createdBy: currentUser?.id || 1,
          userId: editUserId
            ? parseInt(editUserId as unknown as string)
            : parseInt(userResponse?.data?.id),
          // isActive: data?.isActive,
          isDeleted: false,
        }));

        const createBranchUserResponse = await createBulkBranchUser({
          body: { bulk: bulkData },
        });
      }
      setSuccess(true);
      if (isEdit && refetchUserDetails) await refetchUserDetails();
      setIsConfirmationModalOpen(true);
      setInfoMsg(`User successfully ${isEdit ? "updated" : "created"} `);
      if (!isEdit) {
        clearForm();
      }
    } else {
      setIsConfirmationModalOpen(true);
      const error =
        userResponse?.message ||
        `Something went wrong while ${
          isEdit ? "updating" : "creating"
        } user...`;
      setInfoMsg(error);
    }
    setTriggerFetch(false)
  };

  const handleBack = () => {
    router.push("/user-management");
  };

  const handleSchedule = () => {
    const element = document.getElementById("scrollToDiv");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    //if (success) router.push("/user-management");
    if (success) {
      setIsButtonDisabled(false);
    }
  };
  const handleSubmitCloseModal = () => {
    setIsSubmitModalOpen(false);
    setIsSchedulerModalOpen(false);
  };

  const handleSubmitSchedulerCloseModal = () => {
    setIsSchedulerModalOpen(false);
  };

  const handleTogglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

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
  return (
    <>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header order-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 mb-2 res-title-height flex flex-wrap justify-between items-center">
          {/* <Box className="flex justify-between items-center"> */}
            <PanelHeading
              firstHeading={`${isEdit ? "Edit User" : "Create User"}`}
            />
            <Box className="backarrow-set user-back order-2">
              <Tooltip title="Back To User Management">
                <IconButton onClick={() => router.push(`/user-management`)} className='p-1'>
                  <ArrowBackIcon className="text-skyblue text-lg " />
                </IconButton>
              </Tooltip>
            </Box>
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
                  className="outlineBtn mx-1 animate__animated animate__fadeIn animate__delay-600ms"
                  ButtonTitle="Close"
                  type="button"
                  onClick={handleConfirmationCloseModal}
                />
              </Box>
            </Box>
          </Box>
        </Modal>
        <Modal
          isOpen={isSubmitModalOpen}
          onClose={handleSubmitCloseModal}
          modalextraclass="modal-small"
        >
          <Box className="modal-main-data">
            <Typography variant="h6" className="note-description text-center">
              {errMsg}
            </Typography>

            <Box>
              <Box className="w-100 flex justify-center button-group-data">
                <ButtonItem
                  className="outlineBtn mx-1 animate__animated animate__fadeIn animate__delay-600ms"
                  ButtonTitle="Close"
                  type="button"
                  onClick={handleSubmitCloseModal}
                />
              </Box>
            </Box>
          </Box>
        </Modal>
        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 edit-user">
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
                        disabled={isEdit ? true : false}
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
                      <label className="form-custom-label">Email</label>
                      <TextField
                        {...register("emailId")}
                        placeholder="Enter Email"
                        name="emailId"
                        type="emailId"
                        defaultValue={fieldValues?.emailId}
                        className="dropdownComponent rounded-lg text-blacklight p-0"
                        onChange={(e) =>
                          setFieldValues({
                            ...fieldValues,
                            emailId: e.target.value
                          })
                        }
                      />
                      {errors.emailId && (
                        <Typography color="error">
                          {errors.emailId.message}
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
                      <label className="form-custom-label">Phone</label>
                      <TextField
                        {...register("contactNumber")}
                        placeholder="Enter Phone"
                        name="contactNumber"
                        type="text"
                        defaultValue={fieldValues?.contactNumber}
                        className="dropdownComponent rounded-lg text-blacklight p-0"
                        inputProps={{ maxLength: 15, minLength: 10 }}
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
                        type="text"
                        defaultValue={fieldValues?.address1}
                        inputProps={{ maxLength: 256, autoComplete: "off" }}
                        className="dropdownComponent rounded-lg text-blacklight p-0"
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
                        type="text"
                        defaultValue={fieldValues?.address2}
                        inputProps={{ maxLength: 256, autoComplete: "off" }}
                        className="dropdownComponent rounded-lg text-blacklight p-0"
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
                      sm={12}
                      md={12}
                      lg={6}
                      xl={6}
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
                        xl={6}
                        className="mb-0"
                      >
                        <label className="form-custom-label">City</label>
                        <TextField
                          {...register("city")}
                          placeholder="Enter City"
                          name="city"
                          type="text"
                          defaultValue={fieldValues?.city}
                          inputProps={{ maxLength: 64, autoComplete: "off" }}
                          className="dropdownComponent rounded-lg text-blacklight p-0"
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
                        lg={6}
                        xl={6}
                        className="mb-0"
                      >
                        <label className="form-custom-label">State</label>
                        <TextField
                          {...register("state")}
                          placeholder="Enter State"
                          name="state"
                          type="text"
                          defaultValue={fieldValues?.state}
                          inputProps={{ maxLength: 64, autoComplete: "off" }}
                          className="dropdownComponent rounded-lg text-blacklight p-0"
                        />
                        {errors.state && (
                          <Typography color="error">
                            {errors.state.message}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      xl={6}
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
                        xl={6}
                        className="mb-0"
                      >
                        <label className="form-custom-label">Country</label>
                        <TextField
                          {...register("country")}
                          placeholder="Enter Country"
                          name="country"
                          type="text"
                          defaultValue={fieldValues?.country}
                          inputProps={{ maxLength: 64, autoComplete: "off" }}
                          className="dropdownComponent rounded-lg text-blacklight p-0"
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
                        lg={6}
                        xl={6}
                        className="mb-0"
                      >
                        <label className="form-custom-label">Zip Code</label>
                        <TextField
                          {...register("pincode")}
                          placeholder="Enter Zip Code"
                          name="pincode"
                          type="text"
                          defaultValue={fieldValues?.pincode}
                          className="dropdownComponent rounded-lg text-blacklight p-0"
                          inputProps={{ maxLength: 10, minLength: 4 }}
                        />
                        {errors.pincode && (
                          <Typography color="error">
                            {errors.pincode.message}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>

                    {!isEdit && (
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
                    )}

                    {!isEdit && (
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
                    )}

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      xl={6}
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
                                    ? selectedOption.label ||
                                      selectedOption.value
                                    : selected}
                                </div>
                              );
                            }}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem disabled value="">
                              Select Role
                            </MenuItem>
                            {roleOptions.map((option) => (
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
                        xl={6}
                        className="label-form-input"
                      >
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
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      xl={6}
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
                        xl={6}
                        className="mb-0"
                      >
                        <CustomDatePicker
                          name="dateOfJoining"
                          selectedDate={fieldValues?.dateOfJoining || null}
                          onChange={handleDateChange}
                          labelname="Date of Joining"
                          placeholder="Select Date"
                        />
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
                        {fieldValues.dateOfJoining && (
                          <CustomDatePicker
                            name="dateOfLeaving"
                            selectedDate={fieldValues?.dateOfLeaving || null}
                            onChange={handleDateChange}
                            labelname="Date of Leaving"
                            placeholder="Select Date"
                            minDate={fieldValues?.dateOfJoining || null}
                          />
                        )}
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      xl={6}
                      className="mb-0 yearly-row"
                      container
                      spacing={2}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        className="mb-0 active-inactive"
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
                  </Grid>
                </Box>

                <Box className="w-100 mb-2 mt-3 flex justify-center manage-btn">
                  <ButtonItem
                    className="outlineBtn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                    ButtonTitle="Cancel"
                    type="button"
                    onClick={handleBack}
                  />
                  <ButtonItem
                    className="containBtn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                    ButtonTitle="Save"
                    type="submit"
                    disabled={isButtonDisabled}
                  />
                  {isEdit && (
                    <ButtonItem
                      className="outlineBtn mx-1 animate__animated animate__fadeIn animate__delay-1s"
                      ButtonTitle="Schedule Report"
                      type="button"
                      onClick={handleSchedule}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
        {isEdit && (
          <>
            <Modal
              isOpen={isSchedulerModalOpen}
              onClose={handleSubmitSchedulerCloseModal}
              modalextraclass="modal-small"
            >
              <Box className="modal-main-data">
                <Typography
                  variant="h6"
                  className="note-description text-center"
                >
                  {infoMsg}
                </Typography>

                <Box>
                  <Box className="w-100 flex justify-center button-group-data">
                    <ButtonItem
                      className="outlineBtn mx-1"
                      ButtonTitle="Close"
                      type="button"
                      onClick={handleSubmitSchedulerCloseModal}
                    />
                  </Box>
                </Box>
              </Box>
            </Modal>
            <Modal
              isOpen={isSchedulerModalOpen}
              onClose={handleSubmitSchedulerCloseModal}
              modalextraclass="modal-small"
            >
              <Box className="modal-main-data">
                <Typography
                  variant="h6"
                  className="note-description text-center"
                >
                  {errMsg}
                </Typography>

                <Box>
                  <Box className="w-100 flex justify-center button-group-data">
                    <ButtonItem
                      className="outlineBtn mx-1"
                      ButtonTitle="Close"
                      type="button"
                      onClick={handleSubmitCloseModal}
                    />
                  </Box>
                </Box>
              </Box>
            </Modal>
            <Box className="flex flex-wrap items-center sm:block justify-start hr-hide">
            <PanelHeading
              firstHeading={"Schedule Report"} className="title-block"
            />
            </Box>
            <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4" id="scrollToDiv">
              <Box className="scroll-content-item">
                <Box className="user-form card-fields small-form-control bg-white max-w-[100%] my-0 mx-auto rounded-[20px]">
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    xl={6}
                    className="mb-0 animate__animated animate__fadeInUp animation-duration-1.5s "
                    container
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      className="label-form-input mb-5 "
                    >
                      <Grid
                        className="dropdownComponent custom-selectitem-main"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {" "}
                        <label
                          className="form-custom-label"
                          style={{ marginBottom: ".25rem" }}
                        >
                         Dashboard Schedule Type{" "}
                          <span style={{ color: "red" }}>
                            <sup>*</sup>
                          </span>
                        </label>
                        <Select
                          displayEmpty
                          input={<OutlinedInput />}
                          value={tenureSlot}
                          className="custom-select-item"
                          onChange={handleTenureChange}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "300px", // Set your desired max height here
                                overflowY: "auto", // Add scrolling if content exceeds maxHeight
                              },
                            },
                          }}
                        >
                          <MenuItem disabled value="">
                            Select
                          </MenuItem>
                          <MenuItem value="month">Monthly Dashboard</MenuItem>
                          <MenuItem value="year">Yearly Dashboard</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box className="user-form-in user-table animate__animated animate__fadeInUp animation-duration-1.5s" key={0}>
                    <Table
                      timeSlots={timeSlots}
                      dashboardTypes={dashboardTypes}
                      onCheckboxChange={handleCheckboxChange}
                      dashboardShareArray={dashboardShareArray} // Pass the state here
                    />
                  </Box>

                  <Box className="w-100  mb-2 mt-5 flex justify-center animate__animated animate__fadeInUp animation-duration-1.5s">
                    <ButtonItem
                      className="outlineBtn mx-1 animate__animated animate__fadeIn animate__delay-1s  "
                      ButtonTitle="Submit"
                      type="submit"
                      onClick={handleSubmits}
                      disabled={!isButtonScheduleDisabled}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
export default ManageUser;
