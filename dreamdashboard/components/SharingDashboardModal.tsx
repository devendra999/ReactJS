import React from "react";
// import Modal from "./Modal";
import { Box } from "@mui/material";
import { PanelHeading } from "./PanelHeading";
// import ButtonItem from "./ButtonItem";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import dynamic from "next/dynamic";
const Modal = dynamic(() => import("./Modal"));
const ButtonItem = dynamic(() => import("./ButtonItem"));

interface SharingDashboardModal {
    isOpen: boolean;
    onClose: () => void;
    success: boolean;
}



const SharingDashboardModal = (props:SharingDashboardModal) => {

  
  if (props?.isOpen) {
    // If isOpen is true, remove the class
    document.documentElement.classList.remove('html-line-height');
  } 

  return (
    <Modal
      isOpen={props?.isOpen}
      onClose={props?.onClose}
      modalextraclass="modal-small"
    >
      <Box className="modal-wrap-item">
        {props?.success ? (
          <Box className="modal-error ">
            <Box className="modal-error-in">
              <Box className="icondata">
                <CheckCircleIcon className="text-lightgreen" />
              </Box>

              <PanelHeading
                firstHeading={"Email Sent Succussfully!"}
                // firstHeading={"Shared Succussfully!"}
                className="text-lightgreen"
              />

              <Box>
                <Box className="w-100 flex justify-center button-group-data">
                  <ButtonItem
                    className="outlineBtn mx-1"
                    ButtonTitle="Close"
                    type="button"
                    onClick={props?.onClose}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
            <Box className="modal-error ">
            <Box className="modal-error-in">
              <Box className="icondata">
                <CancelIcon className="text-red" />
              </Box>

              <PanelHeading
                firstHeading={"something went wrong"}
                className="text-red"
              />

              <Box>
                <Box className="w-100 flex justify-center button-group-data">
                  <ButtonItem
                    className="outlineBtn mx-1"
                    ButtonTitle="Close"
                    type="button"
                    onClick={props?.onClose}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SharingDashboardModal;
