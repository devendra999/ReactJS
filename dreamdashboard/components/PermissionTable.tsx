"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  Box,
  Typography,
  NoSsr,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Collapse,
  IconButton,
} from "@mui/material";
import ButtonItem from "@root/components/ButtonItem";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Loading from "./Loading";

import dynamic from "next/dynamic";
const Loading = dynamic(
  () => import("@root/components/Loading")
);

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

const Permission: React.FC = (props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string | false>();
  const [expendcol, setexpendcol] = useState(false);
  const [curIndex, setCurIndex] = useState(null);
  const [dynamicData, setDynamicData] = useState();
  const [finalTableArray, setFinalTableArray] = useState([]);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  useEffect(() => {
    setDynamicData(props?.acDynamicData);
  }, [props?.acDynamicData]);

  useEffect(() => {
    if (props?.clicked) {
      setDynamicData(props?.acDynamicData);
    }
  }, [props?.clicked, props?.finalTableBool]);

  const handleSectionCheck = (row, role) => {
    const sectionKpis = row?.detailtable;

    for (const kpi of sectionKpis) {
      if (!kpi[`${role}`]) {
        return false;
      }
    }
    return true;
  };

  const handleChangeKpiCheckBox = (event, row, role, item, rows) => {
    props.setClicked(false);
    props.setFinalTableBool(false);
    props.handleChangeKpiCheckBox(event, row, role, item, rows);
    allChecked();
  };
  const handleChangeSectionCheckBox = (event, row, role, item) => {
    props.setClicked(false);
    props.setFinalTableBool(false);
    props.handleChangeSectionCheckBox(event, row, role, item);
    allChecked();
  };

  const handleChangeSectionMainCheckBox = (event, row, role, item) => {
    props.setClicked(false);
    props.setFinalTableBool(false);
    props.handleChangeSectionMainCheckBox(event, row, role, item);
    allChecked();
  };

  const allChecked = () => {
    let finalTblArray: any = [];

    for (let i = 1; i < props?.tableHeader.length; i++) {
      let currentKey = props?.tableHeader[i];

      for (let j = 0; j < props?.acDynamicData.length; j++) {
        for (let k = 0; k < props?.acDynamicData[j].rows.length; k++) {
          for (
            let l = 0;
            l < props?.acDynamicData[j].rows[k].detailtable.length;
            l++
          ) {
            const value =
              props?.acDynamicData[j].rows[k].detailtable[l][
                props?.tableHeader[i]
              ];

            if (value == false) {
              const isUnique = finalTblArray.every(
                (item) => item[currentKey] !== value
              );

              if (isUnique) {
                finalTblArray.push({
                  [props?.acDynamicData[j].maintitle + currentKey]: value,
                });
              }
            }
          }
        }
      }
    }
    setFinalTableArray(finalTblArray);
  };

  useEffect(() => {
    allChecked();
  }, [props?.acDynamicData, props?.tableHeader, props?.finalTableBool]);

  return (
    <>
      {dynamicData?.length === 0 && props.acDynamicData.length === 0 ? (
        <Loading />
      ) : (
        <NoSsr>
          {dynamicData?.map((item, index) => (
            <Accordion
              expanded={expanded === `{panel${index}`}
              onChange={handleChange(`{panel${index}`)}
              key={index}
              className="accordion-wrapper mb-[1.875rem] border-0 bg-white rounded-2xl py-0 px-4 permission-table animate__animated animate__fadeInDown"
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
                    className="table-container-main"
                  >
                    <Table
                      style={{ borderSpacing: "0 8px" }}
                      sx={{ minWidth: 650 }}
                      aria-label="simple table"
                      className="simple-table"
                    >
                      <TableHead className="card-header permissionTbl bg-gradient-blue">
                        <TableRow>
                          {props?.tableHeader?.map((column, index) => (
                            <TableCell align="center" key={index}>

                              <Box className='checkbox-title-item '>
                              {column} {/* {Object.keys(column)[0]} */}
                              {column !== "Section" && (
                                <Checkbox
                                  key={index}
                                  name={index}
                                  checked={
                                    finalTableArray.some(
                                      (obj) =>
                                        Object.keys(obj)[0] ===
                                        item.maintitle + column
                                    )
                                      ? false
                                      : true
                                  }
                                  onChange={(event) =>
                                    handleChangeSectionMainCheckBox(
                                      event,
                                      column,
                                      index,
                                      item
                                    )
                                  }
                                />
                              )}
                                
                              </Box>
                            
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
                                    className="acc_icon"
                                    onClick={() => notexpandrow()}
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    aria-label="RemoveIcon"
                                    className="acc_icon"
                                    onClick={() => expandrow(index)}
                                  >
                                    <AddIcon />
                                  </IconButton>
                                )}

                                {row.category_name}
                              </TableCell>
                              {props?.rolesArray?.map((role, index) => {
                                return (
                                  <TableCell align="center" key={index}>
                                    <Checkbox
                                      key={index}
                                      name={index}
                                      checked={handleSectionCheck(row, role)}
                                      onChange={(event) =>
                                        handleChangeSectionCheckBox(
                                          event,
                                          row,
                                          role,
                                          item
                                        )
                                      }
                                    />
                                    {/* <Checkbox key={index} name={index}  onChange={(event) => handleChangeSectionCheckBox(event,row,role,item)} /> */}
                                  </TableCell>
                                );
                              })}
                            </TableRow>

                            <TableRow>
                              <TableCell
                                align="center"
                                colSpan={props?.tableHeader?.length}
                                className="p-0 detail-table"
                              >
                                <Collapse
                                  in={index === curIndex ? true : false}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <Table className="detail-table-ac-in">
                                    {row?.detailtable?.map(
                                      (detailRow: any, detailIndex: any) => (
                                        <TableRow
                                          key={detailIndex}
                                          className={`accordion-body ${
                                            detailIndex % 2 !== 0 ? "" : "itembg-cream"
                                          }`}
                                          // className="accordion-body"
                                        >
                                          <TableCell align="center" className={`${
                                            detailIndex % 2 !== 0 ? "bg-white" : "itembg-cream"
                                          }`}>
                                            {detailRow.category_name}
                                          </TableCell>
                                          {props?.rolesArray?.map(
                                            (role, index) => {
                                              return (
                                                <TableCell
                                                  align="center"
                                                  key={index}
                                                >
                                                  <Checkbox
                                                    // checked={detailRow?.hasOwnProperty(`${role}`) ? true : false }
                                                    key={index}
                                                    name={index}
                                                    checked={
                                                      detailRow[`${role}`]
                                                    }
                                                    onChange={(event) =>
                                                      handleChangeKpiCheckBox(
                                                        event,
                                                        detailRow,
                                                        role,
                                                        item,
                                                        row
                                                      )
                                                    }
                                                  />
                                                </TableCell>
                                              );
                                            }
                                          )}
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
              <Box className="permission-button">
                <ButtonItem
                  className="containBtn create-btn mx-1"
                  ButtonTitle="Save Permissions"
                  type="button"
                  onClick={() =>
                    props.saveKpiPermissions(dynamicData, item.maintitle)
                  }
                />
              </Box>
            </Accordion>
          ))}
        </NoSsr>
      )}
    </>
  );
};
export default Permission;
