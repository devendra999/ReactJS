"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
// import ButtonItem from "./ButtonItem";
// import Loading from "./Loading";

import dynamic from "next/dynamic";

const ButtonItem = dynamic(
  () => import("./ButtonItem")
);
const Loading = dynamic(
  () => import("./Loading")
);

interface MasterPageTableProps {
  tableHeader: any[];
  rolesArray: any[];
  acDynamicData: any[];
  saveMasterPagePermissions: any;
  handleChangeKpiCheckBox: any;
  handleChangeSectionMainCheckBox: any;
  finalTableBool: any;
  setFinalTableBool: any;
  setClicked: any;
}

const MasterPageTable: React.FC<MasterPageTableProps> = (props) => {
  // const [dynamicData, setDynamicData] = useState();
  const [dynamicData, setDynamicData] = useState(props?.acDynamicData || []);
  const [finalTableArray, setFinalTableArray] = useState([]);
  useEffect(() => {
    setDynamicData(props?.acDynamicData);
  }, [props?.acDynamicData]);

  const handleChangeKpiCheckBox = (event: any, role: any, item: any) => {
    props.setClicked(false);
    props.setFinalTableBool(false);
    props.handleChangeKpiCheckBox(event, role, item);
    allChecked();
  };

  const handleChangeSectionMainCheckBox = (
    event: any,
    role: any,
    item: any
  ) => {
    props.setClicked(false);
    props.setFinalTableBool(false);
    props.handleChangeSectionMainCheckBox(event, role, item);
    allChecked();
  };

  const allChecked = () => {
    let finalTblArray: any = [];

    for (let i = 1; i < props?.tableHeader.length; i++) {
      let currentKey = props?.tableHeader[i];
      for (let j = 0; j < props?.acDynamicData.length; j++) {
        const value = props?.acDynamicData[j][currentKey];
        if (value == false) {
          const isUnique = finalTblArray.every(
            (item) => item[currentKey] !== value
          );

          if (isUnique) {
            finalTblArray.push({
              [currentKey]: value,
            });
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
      {(dynamicData as any)?.length === 0 &&
      props.acDynamicData.length === 0 ? (
        <Loading />
      ) : (
        <Box className="master-page-table">
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
              <TableHead className="card-header white-checkbox bg-gradient-blue">
                <TableRow>
                  {props?.tableHeader?.map((column, index) => (
                    <TableCell align="center" key={index}>
                      <Box className='checkbox-title-item flex items-center justify-center break-words animate__animated animate__fadeIn'>
                      {column}
                      {column !== "Master Page" && (
                        <Checkbox
                          key={index}
                          name={index}
                          checked={
                            finalTableArray.some(
                              (obj) => Object.keys(obj)[0] === column
                            )
                              ? false
                              : true
                          }
                          onChange={(event) =>
                            handleChangeSectionMainCheckBox(
                              event,
                              column,
                              index
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
                {props?.acDynamicData?.map((item, index) => (
                  <TableRow className="accordion-body" key={index}>
                    <TableCell align="center" className='animate__animated animate__fadeInUp'>{item.category_name}</TableCell>
                    {props?.rolesArray?.map((role, index) => {
                      return (
                        <TableCell align="center" key={index}>
                          <Checkbox
                            checked={
                              // item?.hasOwnProperty(`${role}`) ? true : false
                              item[`${role}`]
                            }
                            onChange={(event) =>
                              handleChangeKpiCheckBox(event, role, item)
                            }
                            className="animate__animated animate__fadeInUp"
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="permission-button">
            <ButtonItem
              className="containBtn create-btn mx-auto mt-5 animate__animated animate__fadeIn animate__delay-1s"
              ButtonTitle="Save Master Page Permissions"
              type="button"
              onClick={() => props.saveMasterPagePermissions(dynamicData)}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
export default MasterPageTable;
