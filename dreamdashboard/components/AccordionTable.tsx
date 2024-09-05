import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface AccordionTableProps {
  tableData: Record<string, React.ReactNode>[];
  tableHeaders: string[];
}

const AccordionTable: React.FC<AccordionTableProps> = ({ tableData, tableHeaders }) => {
  return (
    <TableContainer component={Paper} className='accodion-table-wrapper'> 
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className=' bg-gradient-blue'>
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
                <TableCell key={index}>{cellValue}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccordionTable;
