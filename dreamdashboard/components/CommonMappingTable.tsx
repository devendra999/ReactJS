import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

interface CommonMappingTable {
  tableData: Record<string, React.ReactNode>[];
  tableHeaders: string[];
}

const CommonMappingTable: React.FC<CommonMappingTable> = ({
  tableData,
  tableHeaders,
}) => {

  return (
    <>
      {tableData.length > 0 ? (
        <TableContainer
          component={Paper}
          className="accodion-table-wrapper mapping-table"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="select-common">
            <TableHead className="bg-gradient-blue">
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((cellValue, index) => (
                    <TableCell key={index} className="text-center">{cellValue}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Typography variant="h6" className="text-center mt-8">
            All Data Already Mapped.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default CommonMappingTable;
