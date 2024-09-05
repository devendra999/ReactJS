import React from "react";
import Flatpickr from "react-flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.css";
import { Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface CustomDatePickerProps {
  name: string;
  selectedDate: Date | null;
  onChange: (name: string, date: Date) => void;
  labelname?: string;
  placeholder?: string;
  minDate?: Date | null;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = (props) => {
  const { labelname, placeholder, selectedDate, onChange, name, minDate } = props;
  const parseDateString = (dateString) => {
    return dateString ? new Date(dateString) : null;
  };
  return (
    <Box className="form-control">
      {labelname ? (
        <label className="form-custom-label">{labelname}</label>
      ) : null}
      <Box className="custom-date-picker">
        <Flatpickr
          name={name || ""}
          placeholder={placeholder}
          options={{
            dateFormat: "d-m-Y",
            disableMobile: true,
            defaultDate: selectedDate || undefined, // Convert to the expected type
            minDate:parseDateString(minDate) || null,
          }}
          // value={selectedDate ? selectedDate.toISOString() : ""}
          onChange={(dates) => {
            onChange(name, dates[0] || null);
          }}
        />
        <CalendarTodayIcon className="cal-icon" />
      </Box>
    </Box>
  );
};

export default CustomDatePicker;

