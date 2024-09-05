import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";

interface DashboardTableProps {
  timeSlots: { key: string; value: string }[];
  dashboardTypes: { key: string; value: string }[];
  onCheckboxChange: (
    timeSlotValue: string,
    dashboardTypeValue: string,
    checked: boolean
  ) => void;
  dashboardShareArray: any[]; // Add this prop
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  timeSlots,
  dashboardTypes,
  onCheckboxChange,
  dashboardShareArray,
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedDashboardType, setSelectedDashboardType] = useState<
    string | null
  >(null);
  return (
    <Table
      className="checkbox-table simple-table"
      style={{ borderSpacing: "0 8px" }}
    >
      <TableHead className="card-header bg-gradient-blue">
        <TableRow>
          <TableCell style={{ minWidth: "200px" }}>Dashboard Type</TableCell>
          {timeSlots.map((timeSlot, rowIndex) => (
            <TableCell key={rowIndex}>{timeSlot.key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dashboardTypes.map((type, colIndex) => (
          <TableRow key={colIndex}>
            <TableCell>{type.key}</TableCell>
            {timeSlots.map((timeSlot, rowIndex) => (
              <TableCell key={rowIndex}>
                <Checkbox
                  checked={
                    dashboardShareArray && dashboardShareArray?.length > 0 && dashboardShareArray?.some(
                      (item) =>
                        item.cronTimeSlot === timeSlot.value &&
                        item.dashboardName === type.value.toLowerCase()
                    )
                  }                  
                  onChange={() => {
                    setSelectedTimeSlot(timeSlot.value);
                    setSelectedDashboardType(type.value);
                    onCheckboxChange(
                      timeSlot.value,
                      type.value,
                      event.target.checked
                    );
                  }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
