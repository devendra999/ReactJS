import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { NoSsr } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/navigation";
interface CommanTableProps {
  columns: string[];
  rows: Row[];
}

interface Row {
  sheetname: string;
  emptyrows: string;
}
const CommanTable: React.FC<CommanTableProps> = ({ columns, rows }) => {

  const [expanded, setExpanded] = React.useState<string | false>("panel1");



  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
      <Table
        style={{ borderSpacing: "0 8px" }}
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="simple-table border-0"
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
          {rows.map((row: Row, index: number) => (
            <TableRow
              key={index}
              className={index % 2 !== 0 ? "itembg-cream" : ""}
            >
              <TableCell align="center">{row.sheetname}</TableCell>

              <TableCell align="center">{row.emptyrows}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CommanTable;
