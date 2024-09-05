"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import ButtonItem from "@root/components/ButtonItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { SyntheticEvent } from "react";
import { NoSsr } from "@mui/material";
import CommanTable from "@root/components/CommanTable";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MultipleSelectPlaceholder from "@root/components/FilterDropdown";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { styled } from "@mui/material/styles";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Loading from "./Loading";

interface RowTypes {
  id: number;
  section_name: string;
  kpi: string;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `.0625rem solid ${theme.palette.divider}`,

  "&:not(:last-child)": {
    borderBottom: 0,
  },

  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",

  flexDirection: "row-reverse",

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },

  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),

  borderTop: ".0625rem solid rgba(0, 0, 0, .125)",
}));

const BenchMarkTable = (props) => {
  const [expanded, setExpanded] = useState<string | false>();
  const [expendcol, setexpendcol] = useState(false);
  const [curIndex, setCurIndex] = useState(null);
  const [dynamicData, setDynamicData] = useState();
  const [benchmark, setBenchmark] = useState([]);
  const [detailTableValues, setDetailTableValues] = useState({});
  const [text, setText] = useState<boolean>(props.text);

  const expandrow = (index: any) => {
    setCurIndex(index);
    setexpendcol(!expendcol);
  };

  const notexpandrow = () => {
    setCurIndex(null);
    setexpendcol(false);
  };

  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      // for onchange need to collapse accordion-item
      setCurIndex(null);
      setexpendcol(false);
    };

  const columns = [
    "Section",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    setText(true);
    setDynamicData(props?.acDynamicData);
  }, [props?.acDynamicData]);

  useEffect(() => {
    if (props?.year && props?.locationData) {
      setText(false);
    }
    setBenchmark([])
  }, [props?.year, props?.locationData]);
  

  const handleChangeMonth = (event: any, month: any, row: any, name: any, typeid) => {
    const inputValue = event.target.value;
    
    const isEmptyInput = inputValue.trim() === '';
  
    const existingRowIndex = benchmark.findIndex(
      (item) =>  typeid !== 4 ? item.kpi_id === row && item.month === month : item.kpi_name === name && item.month === month   
    );
  

    if (existingRowIndex !== -1) {
      setBenchmark((prevBenchmark) => {
        const updatedBenchmark = [...prevBenchmark];
        updatedBenchmark[existingRowIndex].kpi_value = isEmptyInput
          ? null // or 0, or ''
          : inputValue;
        return updatedBenchmark;
      });
    } else {
      // If there is no existing row, create a new row
      setBenchmark((prevBenchmark) => [
        ...prevBenchmark,
        {
          kpi_id: row,
          month: month,
          kpi_name: name,
          kpi_value: isEmptyInput
            ? null // or 0, or ''
            : inputValue,
        },
      ]);
    }
  };
  

  // useEffect(()=>{
  //   setText(true)
  //   setDynamicData(props?.acDynamicData);
  // },[text])

 


  return (
    <>
      {dynamicData?.length === 0 &&
      props.acDynamicData.length === 0 &&
      !text ? (
        <Loading />
      ) : (
        <NoSsr>
     

          {dynamicData?.map((item, index) => (
            <Accordion
              expanded={expanded === `{panel${index}`}
              onChange={handleChange(`{panel${index}`)}
              key={index}
              className="accordion-wrapper mb-[1.875rem] border-0 bg-white rounded-2xl py-0 px-4 permission-table benchmark-table animate__animated animate__fadeInDown animate__delay-700ms"
            >
              <AccordionSummary
                aria-controls={`{panel${index}d-content`}
                id={`{panel${index}d-header`}
                className="accordion-header flex text-black w-full  p-[1.25rem]" 
              >
                <Typography>{item.maintitle}</Typography>
              </AccordionSummary>

              <AccordionDetails className="accordion-details border-0">
                <Typography>
                  <TableContainer
                    component={Paper}
                    sx={{ borderRadius: 4 }}
                    className="table-container-main animate__animated animate__fadeIn animate__delay-1s"
                  >
                    <Table
                      style={{ borderSpacing: "0 8px" }}
                      sx={{ minWidth: 650 }}
                      aria-label="simple table"
                      className="simple-table"
                    >
                      <TableHead className="card-header bg-gradient-blue">
                        <TableRow>
                          {columns.map((column, index) => (
                            <TableCell align="center" key={index}>
                              {column}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody className="table-body">
                        {item?.rows?.map((row, index: number) => (
                          <React.Fragment key={index}>
                            <TableRow
                              key={index}
                              className={`accordion-heading ${
                                index % 2 !== 0 ? "itembg-cream" : ""
                              }`}
                            >
                              <TableCell align="center" className="heading_td">
                                {index === curIndex ? (
                                  <IconButton
                                    aria-label="RemoveIcon"
                                    className="acc_icon mr-4"
                                    onClick={() => notexpandrow()}
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    aria-label="RemoveIcon"
                                    className="acc_icon mr-4"
                                    onClick={() => expandrow(index)}
                                  >
                                    <AddIcon />
                                  </IconButton>
                                )}
                                {row.category_name}
                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell
                                align="center"
                                colSpan={13}
                                className="p-0 detail-table"
                              >
                                <Collapse
                                  in={index === curIndex ? true : false}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <Table>
                                  
                                    {row?.detailtable?.map(
                                      (detailRow: any, detailIndex: any) => (
                                        <TableRow
                                          key={detailIndex}
                                          className={`accordion-body ${
                                            detailIndex % 2 !== 0 ? "" : "itembg-cream"
                                          }`}
                                          // className="accordion-body"
                                        >
                                          <TableCell align="center"  className={`${
                                            detailIndex % 2 !== 0 ? "bg-white" : "itembg-cream"
                                          }`}>
                                            {detailRow.display_name ?detailRow.display_name : detailRow.categories_name}                                      
                                  
                                          </TableCell>

                                          <TableCell align="center">
                                            
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"                                          
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 1) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 1)?.kpi_value 
                                                        : detailRow?.January || ''
                                                    ) :
                                                    (
                                                 
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 1)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 1)?.kpi_value 
                                                        : detailRow?.January || ''
                                                    )
                                                }
                                                
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    1,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id

                                                  )
                                                }
                                              />
                                           
                                          </TableCell>

                                          <TableCell align="center">
                                           
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                                
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 2) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 2)?.kpi_value 
                                                        : detailRow?.February || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 2)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 2)?.kpi_value 
                                                        : detailRow?.February || ''
                                                    )
                                                }
                                                
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    2,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                           
                                          </TableCell>

                                          <TableCell align="center">
                                         
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 3) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 3)?.kpi_value 
                                                        : detailRow?.March || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 3)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 3)?.kpi_value 
                                                        : detailRow?.March || ''
                                                    )
                                                }
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    3,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                         
                                          </TableCell>

                                          <TableCell align="center">
                                      
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 4) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 4)?.kpi_value 
                                                        : detailRow?.April || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 4)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 4)?.kpi_value 
                                                        : detailRow?.April || ''
                                                    )
                                                }
                                            
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    4,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                           
                                          </TableCell>
                                          <TableCell align="center">
                                        
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 5) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 5)?.kpi_value 
                                                        : detailRow?.May || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 5)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 5)?.kpi_value 
                                                        : detailRow?.May || ''
                                                    )
                                                }
                                                // defaultValue={detailRow?.May}
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    5,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                           
                                          </TableCell>
                                          <TableCell align="center">
                                         
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 6) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 6)?.kpi_value 
                                                        : detailRow?.June || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 6)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 6)?.kpi_value 
                                                        : detailRow?.June || ''
                                                    )
                                                }
                                                // defaultValue={detailRow?.June}
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    6,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                           
                                          </TableCell>
                                          <TableCell align="center">
                                         
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 7) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 7)?.kpi_value 
                                                        : detailRow?.July || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 7)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 7)?.kpi_value 
                                                        : detailRow?.July || ''
                                                    )
                                                }
                                                // defaultValue={detailRow?.July}
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    7,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                          
                                          </TableCell>
                                          <TableCell align="center">
                                         
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 8) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 8)?.kpi_value 
                                                        : detailRow?.August || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 8)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 8)?.kpi_value 
                                                        : detailRow?.August || ''
                                                    )
                                                }
                                                
                                                // defaultValue={detailRow?.August}
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    8,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                       
                                          </TableCell>
                                          <TableCell align="center">
                                      
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 9) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 9)?.kpi_value 
                                                        : detailRow?.September || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 9)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 9)?.kpi_value 
                                                        : detailRow?.September || ''
                                                    )
                                                }
                                            
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    9,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                         
                                          </TableCell>
                                          <TableCell align="center">
                                           
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 10) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 10)?.kpi_value 
                                                        : detailRow?.October || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 10)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 10)?.kpi_value 
                                                        : detailRow?.October || ''
                                                    )
                                                }
                                               
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    10,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                         
                                          </TableCell>
                                          <TableCell align="center">
                                          
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                              
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 11) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 11)?.kpi_value 
                                                        : detailRow?.November || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 11)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 11)?.kpi_value 
                                                        : detailRow?.November || ''
                                                    )
                                                }
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    11,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                          
                                          </TableCell>
                                          <TableCell align="center">
                                    
                                              <TextField
                                                placeholder="value"
                                                variant="outlined"
                                                onInput={(event) => {
                                                  let sanitizedValue = event.target.value.replace(/[^0-9.]/g, "");
                                                  let [integerPart, decimalPart] = sanitizedValue.split(".");
                                                  integerPart = integerPart.slice(0, 10);
                                                  if (decimalPart !== undefined) {
                                                    decimalPart = decimalPart.slice(0, 4);
                                                  }
                                                  sanitizedValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
                                                  event.target.value = sanitizedValue;
                                                }}
                                                value={
                                                  detailRow.kpi_type_id !== 4 ?
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_id === detailRow.kpiId && item.month === 12) 
                                                        ? benchmark.find(item => item.kpi_id === detailRow.kpiId && item.month === 12)?.kpi_value 
                                                        : detailRow?.December || ''
                                                    ) :
                                                    (
                                                      benchmark.length > 0 &&
                                                      benchmark.some(item => item.kpi_name === detailRow.display_name && item.month === 12)
                                                        ? benchmark.find(item => item.kpi_name === detailRow.display_name && item.month === 12)?.kpi_value 
                                                        : detailRow?.December || ''
                                                    )
                                                }
                                                
                                                // defaultValue={
                                                //   detailRow?.December
                                                // }
                                                onChange={(event) =>
                                                  handleChangeMonth(
                                                    event,
                                                    12,
                                                    detailRow.kpiId,
                                                    detailRow.display_name,
                                                    detailRow.kpi_type_id
                                                  )
                                                }
                                              />
                                          
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </Table>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
            <ButtonItem
              className="containBtn create-btn mx-1 animate__animated animate__fadeIn animate__delay-1s"
              ButtonTitle="Submit"
              type="button"
              onClick={() => props.saveBenchmarkData(benchmark, text)}
            />
          </Box>
        </NoSsr>
      )}
    </>
  );
};

export default BenchMarkTable;
