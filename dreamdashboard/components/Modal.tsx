import React, { useState } from "react";
import {
  Modal as MuiModal,
  Box,
  Fade,
  Backdrop,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import RotateIcon from "../assets/images/screen-rotate.png";
import IconButton from "./IconButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { PanelHeading } from "./PanelHeading";
import { addToLocalStorage, getFromLocalStorage } from "@root/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modaltitle?: any;
  modaltitle1?: any;
  modalextraclass?: any;
  filterFunctionality?: boolean;
  excelButton?: boolean;
  handleExcelDownloadAllData?: () => void;
  // handleChangeTab?: (param: any) => void;
  // handleFilterDate?: (param: any) => void;
  // handleFilterData?: (param: any) => void;
  valueTab?: number; // Ensure valueTab is defined in props
  setValueTab?: (value: number) => void; // Ensure setValueTab is defined in prop
  tabModal?: boolean;
}

const Modal: React.FC<ModalProps> = (props: any) => {
  // const filterData = JSON.parse(getFromLocalStorage("@filter-data") || "{}");
  // const [filtersData, setFilters] = useState(
  //   Object.keys(filterData).length > 0 ? filterData : []
  // );
  // const [filterSelectedDates, setFilterSelectedDates] = useState<
  //   { firstDate: string; secondDate: string; filterDate: string } | undefined
  // >();
  // const [dateUnit, setDateUnit] = useState("year");
  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );
  // const filterDateUnit = JSON.parse(
  //   getFromLocalStorage("@filter-dateUnit") || "{}"
  // );
  // const filterSelectYear = JSON.parse(
  //   getFromLocalStorage("@filter-selectyear") || "{}"
  // );
  // const filterDate = JSON.parse(getFromLocalStorage("@filter-date") || "{}");
  // const globalFilter = JSON.parse(
  //   getFromLocalStorage("@global-filter") || "{}"
  // );
  // const comparePageCode = JSON.parse(
  //   getFromLocalStorage("@compare-pageCode") || "{}"
  // );
  // const [switchValue, setSwitchValue] = useState<string>(
  //   Object.keys(comparePageCode).length > 0 ? comparePageCode : "sl_dashboard"
  // );

  const [tabModal, setTabModal] = useState(false);

  const handleClose = () => {
    props.onClose();
  };

  // const handleChange = (FilterVal: any) => {
  //   if (FilterVal) {
  //     setFilters(FilterVal);
  //   }
  // };

  // const sendFilterData = (FilterVal: any) => {
  //   // console.log(FilterVal, "----FilterVal----");
  //   if (FilterVal) {
  //     if (FilterVal.location?.length == 0 || FilterVal.location == null) {
  //       globalFilter.p_location = "";
  //     }
  //     if (FilterVal.model?.length == 0 || FilterVal.model == null) {
  //       globalFilter.p_model = "";
  //     }
  //     if (FilterVal.user?.length == 0 || FilterVal.user == null) {
  //       globalFilter.p_sc = "";
  //     }
  //     addToLocalStorage("@filter-data", FilterVal);
  //     addToLocalStorage("@global-filter", globalFilter);
  //     setFilters(FilterVal);
  //     props.handleFilterData(FilterVal);
  //   }
  // };

  // const sendSelectedDate = (startEndDates: any) => {
  //   if (startEndDates) {
  //     addToLocalStorage("@filter-date", startEndDates);
  //     setFilterSelectedDates(startEndDates);
  //     globalFilter.p_start_date = startEndDates.firstDate;
  //     globalFilter.p_end_date = startEndDates.secondDate;
  //     globalFilter.date_unit = startEndDates.dateUnit;
  //     addToLocalStorage("@global-filter", globalFilter);
  //     props.handleFilterDate(startEndDates);
  //   }
  // };

  // const sendDateUnit = (selectDateUnit: any) => {
  //   if (selectDateUnit) {
  //     addToLocalStorage("@filter-dateUnit", selectDateUnit);
  //     setDateUnit(selectDateUnit.dateFormate);
  //   }
  // };

  // const [valueTab, setValueTab] = useState(props.valueTab);

  // Define handleChangeTab function to update valueTab
  // const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
  //   setValueTab(newValue);
  //   props.setValueTab(newValue); // Notify parent component about tab change
  // };

  return (
    <MuiModal
      className={`modal ${props.modalextraclass} `}
      open={props.isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.isOpen}>
        <Box className="modal-dialog flex z-[1] my-4 mx-auto modal-dialog-centered">
          <Box className={`modal-content relative flex flex-col w-full h-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none animate__animated animate__fadeInUp animate__faster`}>
            <Box
              className={`flex justify-between ${
                props.tabModal
                  ? "modal-header modal-header-tab pt-2 pr-4 pb-0 pl-4 items-end"
                  : "modal-header items-center py-2 px-4"
              }`}
            >
              {props.tabModal ? (
                <Box className="modal-tab-component">
                  <Tabs
                    value={props.valueTab}
                    onChange={(event, newValue) => props.setValueTab(newValue)}
                  >
                    <Tab label={props.modaltitle} />
                    <Tab label={props.modaltitle1} />
                  </Tabs>
                </Box>
              ) : (
                <h2>{props.modaltitle}</h2>
              )}

              <Box className="flex items-center right-items">
                <Box className="rotate-icon-top">
                  <Image
                    height={38}
                    width={38}
                    src={RotateIcon}
                    alt="rotate-img"
                  />
                </Box>

                <Box
                  className={`filter-excel-button-mobile ${
                    rolewiseDisplay.isChartExportAllowed === false && `mr-3`
                  }`}
                >
                  {props.filterFunctionality && (
                    <PanelHeading
                      firstHeading={""}
                      secondHeading={""}
                      filterOption={true}
                      // handleChange={handleChange}
                      // sendFilterDataToPage={sendFilterData}
                      // sendSelectedDateToPage={sendSelectedDate}
                      // sendTabDataToPage={sendDateUnit}
                    />
                  )}
                  {props.excelButton && (
                    <IconButton
                      className="small-btn-iconpop"
                      variant="contained"
                      onClick={props.handleExcelDownloadAllData}
                      ButtonTitle="Excel"
                      startIcon={<FileDownloadIcon />}
                    />
                  )}
                </Box>
                <button className={`modal-close-button`} onClick={handleClose}>
                  <CloseIcon />
                </button>
              </Box>
            </Box>

            <Box className="modal-body">{props.children}</Box>
          </Box>
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
