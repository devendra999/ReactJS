import React, { useState, useRef, useEffect } from "react"; 
import IconButtonSingle from "./IconButtonSingle";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import { useForm } from "react-hook-form";
import { supportSchema } from "@root/app/support-schema/supportSchema";
import {
  useZendeskControllerCreateTicket, 
} from "@root/backend/backendComponents";
import { useYupValidationResolver } from "../components/hooks/yup-validation-resolver";
import {
  Box,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { getFromLocalStorage } from "@root/utils";
import ButtonItem from "./ButtonItem";
import Modal from "./Modal";

interface FooterItemProps {
  firstHeading?: string;
  secondHeading?: string;
}

export const FooterItem: React.FC<FooterItemProps> = (props) => {

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
  useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const supportformRef = useRef();
  const [infoMsg, setInfoMsg] = useState("");
  const [isSupportFormVisible, setSupportFormVisible] = useState(false);
  const { mutateAsync } = useZendeskControllerCreateTicket();
  const resolver = useYupValidationResolver(supportSchema);

  const toggleFormVisibility = () => {
    setSupportFormVisible(!isSupportFormVisible);
  };
  const toggle = (e: any) => {
    setIsOpen(!isOpen);
  };


  // onclick outside of support form start
  const handleClickOutsideSupportForm = (event: any) => {
    if (
      supportformRef.current &&
      !supportformRef.current.contains(event.target)
    ) {
      setSupportFormVisible(false);
      clearErrors();
      reset();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSupportForm);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSupportForm);
    };
  }, []);


  const {
    handleSubmit,
    formState: { errors },
    register,
    clearErrors,
    reset,
    control,
  } = useForm({ resolver });

  const onSubmit = async (data: any) => {
    try {
      const trackDetails = await mutateAsync({
        body: {
          name: data?.name,
          email: data?.email,
          subject: data?.subject,
          description: data?.description,
        },
      });

      if (trackDetails?.statusCode === 200) {
        setIsConfirmationModalOpen(true);
        setInfoMsg("Ticket Created Successfully");
        clearForm();
      } else {
        setIsConfirmationModalOpen(true);
        setInfoMsg("Ticket Not Created Successfully");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsConfirmationModalOpen(true);
      setInfoMsg("An error occurred while creating the ticket");
    }
  };

  const clearForm = () => {
    clearErrors();
    reset();
    setSupportFormVisible(false);
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <>
      <footer className=" relative text-center left-0 right-0 footer-component">
        <Box className="text-center  animate__animated animate__fadeIn  ">
          <Typography
            variant="body1"
            component="p"
            className="block text-body text-skyblue  font-semibold footer-powerby"
          >
            {props.firstHeading}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="footer-copyright text-base font-medium"
          >
            {props.secondHeading}
          </Typography>
        </Box>

        <Box className='content-wrap-parent'>
          <Box className="footer-fixed-content fixed w-full text-grey500 z-[4]  bottom-0 text-left  animate__animated animate__fadeIn animate__faster">
            Dream Dashboard Version 3.0
          </Box>
          <Box className='form-support '>

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


          <Box className="support-item">
            <IconButtonSingle
              onClick={toggleFormVisibility}
              className="icon-button-support w-auto text-white rounded-[8px] mb-[5px] py-[4px] px-[8px] transition-all duration-500 ease-in-out"
              icon={
                <Tooltip
                  title={isSupportFormVisible ? "Close" : "Support"}
                  placement="top"
                >
                  {isSupportFormVisible ? (
                    <CloseIcon
                      style={{ color: "#fff" }}
                      className="icon-support ml-[8px] text-[20px]"
                    />
                  ) : (
                    <ChatIcon
                      style={{ color: "#fff" }}
                      className="icon-support ml-[8px] text-[20px]"
                    />
                  )}
                </Tooltip>
              }
              iconTitle={"Support"}
            />
          </Box>

          {isSupportFormVisible && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-support-main z-[11] bg-white rounded-[15px] fixed animate__animated  animate__fadeInRight animate__faster"
              ref={supportformRef}
            >
              <Box className=" small-form-control text-left">
                <Typography variant="h3" className="title-main">
                  Raise A Ticket
                </Typography>

                <Grid container spacing={2} className="two-field-group-item">
                  <Grid item xs={12} className="mb-0">
                    <label className="form-custom-label">
                      Name
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("name")}
                      name="name"
                      placeholder="Enter Name"
                      type="text"
                      className="dropdownComponent rounded-lg bg-white text-blacklight p-0"
                      inputProps={{ maxLength: 50, autoComplete: "off" }}
                      error={errors?.name?.message ? true : false}
                      helperText={errors?.name?.message?.toString()}
                    />
                  </Grid>
                  <Grid item xs={12} className="mb-0">
                    <label className="form-custom-label">
                      Email
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("email")}
                      name="email"
                      placeholder="Enter Email"
                      type="email"
                      className="dropdownComponent rounded-lg bg-white text-blacklight p-0"
                      inputProps={{ maxLength: 128 }}
                      error={errors?.email?.message ? true : false}
                      helperText={errors?.email?.message?.toString()}
                    />
                    {/* {errors.email && (
                        <Typography color="error">
                          {errors.email.message}
                        </Typography>
                      )} */}
                  </Grid>
                  <Grid item xs={12} className="mb-0">
                    <label className="form-custom-label">
                      Subject
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("subject")}
                      name="subject"
                      placeholder="Enter Subject"
                      type="text"
                      inputProps={{ maxLength: 128, autoComplete: "off" }}
                      error={errors?.subject?.message ? true : false}
                      helperText={errors?.subject?.message?.toString()}
                      className="dropdownComponent rounded-lg bg-white text-blacklight p-0"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="mt-0">
                  <Grid item xs={12} className="mb-0">
                    <label className="form-custom-label">
                      Description
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </label>
                    <TextField
                      {...register("description")}
                      name="description"
                      placeholder="Enter Description"
                      type="text"
                      inputProps={{ maxLength: 1000, autoComplete: "off" }}
                      error={errors?.description?.message ? true : false}
                      helperText={errors?.description?.message?.toString()}
                      className="dropdownComponent rounded-lg bg-white text-blacklight p-0"
                      multiline
                      minRows={3}
                      maxRows={4}
                    />
                  </Grid>
                </Grid>

                <Box className="w-100   mt-4 flex ">
                  <ButtonItem
                    className="mx-1 w-full"
                    ButtonTitle="Save"
                    type="submit"
                  />
                </Box>
              </Box>
            </form>
          )}

          </Box>


        </Box>
        
      </footer>
    </>
  );
};
