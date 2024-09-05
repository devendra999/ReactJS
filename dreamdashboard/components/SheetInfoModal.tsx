"use client";
import React, { SyntheticEvent, useState } from "react";
import { Box } from "@mui/material";
import ButtonItem from "@root/components/ButtonItem";
import Modal from "./Modal";
import CommanTable from "@root/components/CommanTable";
import { PanelHeading } from "@root/components/PanelHeading";
import SidebarWithLayout from "../app/layout-with-sidebar";
// import PermissionTable from "../../components/PermissionTable";

interface SheetInfoModalProps  {
    isSheetInfoModalOpen:boolean;
    HandleSheetInfoPopup: () => void;
    // sheetHealthData

}

const SheetInfoModal = ({isSheetInfoModalOpen,HandleSheetInfoPopup,sheetHealthData}:SheetInfoModalProps) => {
    
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isSheetInfoModalOpen);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    HandleSheetInfoPopup(false)
    setIsModalOpen(false);
  };

  const columns = ["Column Name", "Empty Rows"];

  const dynamicRows = [];

  if(sheetHealthData !== undefined){
    // console.log('inside if of sheetss');
    for(const key in sheetHealthData){
        
        // console.log(key,'if keyy');
        
        
        const temp = sheetHealthData[key]
        // console.log(temp,'loop');
        let obj;

        if(key === 'v_date_result'){
            obj = {
                sheetname: temp?.[0]?.date_column,
                emptyrows: temp?.[0]?.null_row
            }
        }else{
            obj = {
                sheetname: temp.field_value,
                emptyrows: temp.null_row
            }
        }
        dynamicRows.push(obj);

         

        // console.log(obj,'value');
        
    }

    // console.log(dynamicRows,'dyna rowssssssss');
    

  }

  const rows = [
    {
      sheetname: "Models:",
      emptyrows: "1542",
    },
    {
      sheetname: "Branch:",
      emptyrows: "125",
    },
    {
      sheetname: "Modification:",
      emptyrows: "125",
    },
    {
      sheetname: "Consultant:",
      emptyrows: "125",
    },
    {
      sheetname: "Date:",
      emptyrows: "54",
    },
  ];

  return (
    <>
        <Modal
          isOpen={isSheetInfoModalOpen}
          onClose={handleCloseModal}
          modalextraclass="modal-small table-modal-small"
        >
          <Box>
            <CommanTable columns={columns} rows={dynamicRows} />

            <Box className="w-100 flex justify-center button-group-data">
              <ButtonItem
                className="containBtn mx-1"
                ButtonTitle="Ok"
                type="button"
                onClick={handleCloseModal}
              />
            </Box>
          </Box>
        </Modal>
    </>
  );
};
export default SheetInfoModal;
