import React, { useState, useEffect, useRef } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";

import PropTypes from "prop-types";
import {
  Card,
  Tabs,
  Tab,
  Typography,
  Box,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Popover,
} from "@mui/material";

import "../../node_modules/flatpickr/dist/flatpickr.css";
import { YearSlide } from "./YearSlide";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { updateGlobalFilterKey } from "@root/app/layout";
import { useSelector } from "react-redux";
const Flatpickr = dynamic(() => import("react-flatpickr"));

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue: string;
  inputRef: React.Ref<HTMLInputElement>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  defaultValue,
  inputRef,
  ...props
}) => {
  return <input {...props} defaultValue={defaultValue} ref={inputRef} />;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface CalanderFilterProps {
  // sendSelectedDate: (param: any) => void;
  cellnum: any;
}

export const CalanderFilter: React.FC<CalanderFilterProps> = (props: any) => {
  const searchParams = useSearchParams();
  const pageCode = searchParams.get("page");

  const d = new Date();
  let initialMonth = "0" + (d.getMonth() + 1);
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);

  let globalYear =
    new Date(_globalFilter.global_filter.p_start_date).getFullYear() ||
    new Date().getFullYear();

  let compareGlobalYear1 =
    new Date(
      _globalFilter.compare_filter.first_column.p_start_date
    ).getFullYear() || new Date().getFullYear();

  let compareGlobalYear2 =
    new Date(
      _globalFilter.compare_filter.second_column.p_start_date
    ).getFullYear() || new Date().getFullYear();

  let compareGlobalYear3 =
    new Date(
      _globalFilter.compare_filter.third_column.p_start_date
    ).getFullYear() || new Date().getFullYear();

  let compareGlobalYear4 =
    new Date(
      _globalFilter.compare_filter.fourth_column.p_start_date
    ).getFullYear() || new Date().getFullYear();

  const [yearr, setYearr] = useState<number>(globalYear);
  const [compareYear, setCompareYear] = useState<number>(globalYear);
  const [compareCustDate, setCompareCustDate] = useState<any>(null);
  const [value, setValue] = useState(0);
  const [customDate, setCustomDate] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState<any>(initialMonth);
  const [quarterMonth, setQuarterMonth] = useState(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);

    if (pageCode == "compare") {
      if (props.cellnum === 1) {
        let fullDates = _globalFilter.compare_filter.first_column.p_start_date;
        let getYear = new Date(fullDates).getFullYear();
        setCompareYear(getYear);

        let getMonth = new Date(fullDates).getMonth();
        setSelectedMonth(getMonth + 1);

        let qutMonth = _globalFilter.compare_filter.first_column.formatted_date;
        qutMonth = qutMonth?.substring(0, 2);
        setQuarterMonth(qutMonth);

        let custDateFirst =
          _globalFilter.compare_filter.first_column.p_start_date;
        let custDateSecond =
          _globalFilter.compare_filter.first_column.p_end_date;
        setCompareCustDate({
          startDate: custDateFirst,
          endDate: custDateSecond,
        });

        if (_globalFilter.compare_filter.first_column.date_unit === "month") {
          setValue(0);
          setCompareCustDate(null);
        }
        if (_globalFilter.compare_filter.first_column.date_unit === "quarter") {
          setValue(1);
          setCompareCustDate(null);
        }
        if (_globalFilter.compare_filter.first_column.date_unit === "year") {
          setValue(2);
          setCompareCustDate(null);
        }
        if (_globalFilter.compare_filter.first_column.date_unit === "custom") {
          setValue(3);
        }
      }
      if (props.cellnum == 2) {
        let fullDates = _globalFilter.compare_filter.second_column.p_start_date;
        let getYear = new Date(fullDates).getFullYear();
        setCompareYear(getYear);

        let getMonth = new Date(fullDates).getMonth();
        setSelectedMonth(getMonth + 1);

        let qutMonth =
          _globalFilter.compare_filter.second_column.formatted_date;
        qutMonth = qutMonth?.substring(0, 2);

        setQuarterMonth(qutMonth);

        let custDateFirst =
          _globalFilter.compare_filter.second_column.p_start_date;
        let custDateSecond =
          _globalFilter.compare_filter.second_column.p_end_date;
        setCompareCustDate({
          startDate: custDateFirst,
          endDate: custDateSecond,
        });

        if (_globalFilter.compare_filter.second_column.date_unit === "month") {
          setValue(0);
          setCompareCustDate(null);
        }
        if (
          _globalFilter.compare_filter.second_column.date_unit === "quarter"
        ) {
          setValue(1);
          setCompareCustDate(null);
        }
        if (_globalFilter.compare_filter.second_column.date_unit === "year") {
          setValue(2);
          setCompareCustDate(null);
        }
        if (_globalFilter.compare_filter.second_column.date_unit === "custom") {
          setValue(3);
        }
      }
      if (props.cellnum == 3) {
        let fullDates = _globalFilter.compare_filter.third_column.p_start_date;
        let getYear = new Date(fullDates).getFullYear();
        setCompareYear(getYear);

        let getMonth = new Date(fullDates).getMonth();
        setSelectedMonth(getMonth + 1);

        let qutMonth = _globalFilter.compare_filter.third_column.formatted_date;
        qutMonth = qutMonth?.substring(0, 2);
        setQuarterMonth(qutMonth);

        let custDateFirst =
          _globalFilter.compare_filter.third_column.p_start_date;
        let custDateSecond =
          _globalFilter.compare_filter.third_column.p_end_date;
        setCompareCustDate({
          startDate: custDateFirst,
          endDate: custDateSecond,
        });

        if (_globalFilter.compare_filter.third_column.date_unit === "month") {
          setValue(0);
          setCompareCustDate(null);
        }
        if (_globalFilter.compare_filter.third_column.date_unit === "quarter") {
          setValue(1);
          setCompareCustDate(null);
        }
        if (_globalFilter.compare_filter.third_column.date_unit === "year") {
          setValue(2);
          setCompareCustDate(null);
        }
        if (_globalFilter.compare_filter.third_column.date_unit === "custom") {
          setValue(3);
        }
      }
      if (props.cellnum == 4) {
        let fullDates = _globalFilter.compare_filter.fourth_column.p_start_date;
        let getYear = new Date(fullDates).getFullYear();
        setCompareYear(getYear);

        let getMonth = new Date(fullDates).getMonth();
        setSelectedMonth(getMonth + 1);

        let qutMonth =
          _globalFilter.compare_filter.fourth_column.formatted_date;
        qutMonth = qutMonth?.substring(0, 2);
        setQuarterMonth(qutMonth);

        let custDateFirst =
          _globalFilter.compare_filter.fourth_column.p_start_date;
        let custDateSecond =
          _globalFilter.compare_filter.fourth_column.p_end_date;
        setCompareCustDate({
          startDate: custDateFirst,
          endDate: custDateSecond,
        });

        if (_globalFilter.compare_filter.fourth_column.date_unit === "month") {
          setValue(0);
          setCompareCustDate(null);
        }
        if (
          _globalFilter.compare_filter.fourth_column.date_unit === "quarter"
        ) {
          setValue(1);
          setCompareCustDate(null);
        }
        if (_globalFilter.compare_filter.fourth_column.date_unit === "year") {
          setValue(2);
          setCompareCustDate(null);
        }
        if (_globalFilter.compare_filter.fourth_column.date_unit === "custom") {
          setValue(3);
        }
      }
    } else {
      let fullDates = _globalFilter.global_filter.p_start_date;
      let getYear = new Date(fullDates).getFullYear();
      setCompareYear(getYear);

      let getMonth = new Date(fullDates).getMonth();
      setSelectedMonth(getMonth + 1);

      let qutMonth = _globalFilter.formatted_date;
      qutMonth = qutMonth?.substring(0, 2);
      setQuarterMonth(qutMonth);
      setCustomDate({
        startDate: _globalFilter.global_filter.p_start_date,
        endDate: _globalFilter.global_filter.p_end_date,
      });

      if (
        _globalFilter.global_filter?.date_unit === "month" ||
        _globalFilter.global_filter?.date_unit === "quarter" ||
        _globalFilter.global_filter?.date_unit === "year"
      ) {
        setCustomDate(null);
      }

      if (_globalFilter.global_filter.date_unit === "month") {
        setValue(0);
      }
      if (_globalFilter.global_filter.date_unit === "quarter") {
        setValue(1);
      }
      if (_globalFilter.global_filter.date_unit === "year") {
        setValue(2);
      }
      if (_globalFilter.global_filter.date_unit === "custom") {
        setValue(3);
      }
    }
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const updateMonthDates = (
    p_start_date: any,
    p_end_date: any,
    formatted_date: any,
    date_unit: any
  ) => {
    updateGlobalFilterKey(
      "compare_filter.first_column.p_start_date",
      p_start_date
    );
    updateGlobalFilterKey("compare_filter.first_column.p_end_date", p_end_date);
    updateGlobalFilterKey("compare_filter.first_column.date_unit", date_unit);
    updateGlobalFilterKey(
      "compare_filter.first_column.formatted_date",
      formatted_date
    );

    updateGlobalFilterKey(
      "compare_filter.second_column.p_start_date",
      p_start_date
    );
    updateGlobalFilterKey(
      "compare_filter.second_column.p_end_date",
      p_end_date
    );
    updateGlobalFilterKey("compare_filter.second_column.date_unit", date_unit);
    updateGlobalFilterKey(
      "compare_filter.second_column.formatted_date",
      formatted_date
    );

    updateGlobalFilterKey(
      "compare_filter.third_column.p_start_date",
      p_start_date
    );
    updateGlobalFilterKey("compare_filter.third_column.p_end_date", p_end_date);
    updateGlobalFilterKey("compare_filter.third_column.date_unit", date_unit);
    updateGlobalFilterKey(
      "compare_filter.third_column.formatted_date",
      formatted_date
    );

    updateGlobalFilterKey(
      "compare_filter.fourth_column.p_start_date",
      p_start_date
    );
    updateGlobalFilterKey(
      "compare_filter.fourth_column.p_end_date",
      p_end_date
    );
    updateGlobalFilterKey("compare_filter.fourth_column.date_unit", date_unit);
    updateGlobalFilterKey(
      "compare_filter.fourth_column.formatted_date",
      formatted_date
    );
    updateGlobalFilterKey("vahan_filter.p_start_date", p_start_date);
    updateGlobalFilterKey("vahan_filter.p_end_date", p_end_date);
    updateGlobalFilterKey("vahan_filter.date_unit", date_unit);
    updateGlobalFilterKey("global_filter.p_start_date", p_start_date);
    updateGlobalFilterKey("global_filter.p_end_date", p_end_date);
    updateGlobalFilterKey("global_filter.date_unit", date_unit);
    updateGlobalFilterKey("formatted_date", formatted_date);
  };

  const getMonth = (month: any, monthName: string) => {
    if (props.cellnum == 1) {
      const cFirstStart = new Date(compareGlobalYear1, month - 1, 2)
        .toISOString()
        .split("T")[0];
      const cFirstEnd = new Date(compareGlobalYear1, month, 1)
        .toISOString()
        .split("T")[0];
      updateGlobalFilterKey(
        "compare_filter.first_column.p_start_date",
        cFirstStart
      );
      updateGlobalFilterKey(
        "compare_filter.first_column.p_end_date",
        cFirstEnd
      );
      updateGlobalFilterKey("compare_filter.first_column.date_unit", "month");
      updateGlobalFilterKey(
        "compare_filter.first_column.formatted_date",
        monthName + " " + compareGlobalYear1
      );
    } else if (props.cellnum == 2) {
      const cSecondStart = new Date(compareGlobalYear2, month - 1, 2)
        .toISOString()
        .split("T")[0];
      const cSecondEnd = new Date(compareGlobalYear2, month, 1)
        .toISOString()
        .split("T")[0];

      updateGlobalFilterKey(
        "compare_filter.second_column.p_start_date",
        cSecondStart
      );
      updateGlobalFilterKey(
        "compare_filter.second_column.p_end_date",
        cSecondEnd
      );
      updateGlobalFilterKey("compare_filter.second_column.date_unit", "month");
      updateGlobalFilterKey(
        "compare_filter.second_column.formatted_date",
        monthName + " " + compareGlobalYear2
      );
    } else if (props.cellnum == 3) {
      const cThirdStart = new Date(compareGlobalYear3, month - 1, 2)
        .toISOString()
        .split("T")[0];
      const cThirdEnd = new Date(compareGlobalYear3, month, 1)
        .toISOString()
        .split("T")[0];

      updateGlobalFilterKey(
        "compare_filter.third_column.p_start_date",
        cThirdStart
      );
      updateGlobalFilterKey(
        "compare_filter.third_column.p_end_date",
        cThirdEnd
      );
      updateGlobalFilterKey("compare_filter.third_column.date_unit", "month");
      updateGlobalFilterKey(
        "compare_filter.third_column.formatted_date",
        monthName + " " + compareGlobalYear3
      );
    } else if (props.cellnum == 4) {
      const cFourthStart = new Date(compareGlobalYear4, month - 1, 2)
        .toISOString()
        .split("T")[0];
      const cFourthEnd = new Date(compareGlobalYear4, month, 1)
        .toISOString()
        .split("T")[0];

      updateGlobalFilterKey(
        "compare_filter.fourth_column.p_start_date",
        cFourthStart
      );
      updateGlobalFilterKey(
        "compare_filter.fourth_column.p_end_date",
        cFourthEnd
      );
      updateGlobalFilterKey("compare_filter.fourth_column.date_unit", "month");
      updateGlobalFilterKey(
        "compare_filter.fourth_column.formatted_date",
        monthName + " " + compareGlobalYear4
      );
    } else {
      const firstDay = new Date(globalYear, month - 1, 2)
        .toISOString()
        .split("T")[0];
      const lastDay = new Date(globalYear, month, 1)
        .toISOString()
        .split("T")[0];
      updateMonthDates(
        firstDay,
        lastDay,
        monthName + " " + globalYear,
        "month"
      );
    }
    updateGlobalFilterKey("custom_filter", 0);
    handlePopoverClose();
  };

  const getQmonth = (quartermonth: any, quarterName: string) => {
    const selectedYear =
      pageCode === "compare"
        ? compareGlobalYear1 || yearr
        : globalYear || yearr;
    const dateUnit = "quarter";
    let startDateMonth, endDateMonth;

    switch (quartermonth) {
      case "q1":
        startDateMonth = "01";
        endDateMonth = "03";
        break;
      case "q2":
        startDateMonth = "04";
        endDateMonth = "06";
        break;
      case "q3":
        startDateMonth = "07";
        endDateMonth = "09";
        break;
      default:
        startDateMonth = "10";
        endDateMonth = "12";
    }

    const dateObj = {
      firstDate: `${selectedYear}-${startDateMonth}-01`,
      secondDate:
        endDateMonth == "03" || endDateMonth == "12"
          ? `${selectedYear}-${endDateMonth}-31`
          : `${selectedYear}-${endDateMonth}-30`,
      formatted_date: `${quarterName} ${selectedYear}`,
      dateUnit: dateUnit,
    };

    if (props.cellnum >= 1 && props.cellnum <= 4) {
      const compareYear =
        pageCode === "compare"
          ? eval(`compareGlobalYear${props.cellnum}`) || yearr
          : globalYear || yearr;
      dateObj.firstDate = `${compareYear}-${startDateMonth}-01`;
      dateObj.secondDate = `${compareYear}-${endDateMonth}-${
        endDateMonth == "03" || endDateMonth == "12" ? 31 : 30
      }`;
      dateObj.formatted_date = `${quarterName} ${compareYear}`;

      if (props.cellnum == 1) {
        updateGlobalFilterKey(
          "compare_filter.first_column.p_start_date",
          dateObj.firstDate
        );
        updateGlobalFilterKey(
          "compare_filter.first_column.p_end_date",
          dateObj.secondDate
        );
        updateGlobalFilterKey(
          "compare_filter.first_column.date_unit",
          "quarter"
        );
        updateGlobalFilterKey(
          "compare_filter.first_column.formatted_date",
          dateObj.formatted_date
        );
      }
      if (props.cellnum == 2) {
        updateGlobalFilterKey(
          "compare_filter.second_column.p_start_date",
          dateObj.firstDate
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.p_end_date",
          dateObj.secondDate
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.date_unit",
          "quarter"
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.formatted_date",
          dateObj.formatted_date
        );
      }
      if (props.cellnum == 3) {
        updateGlobalFilterKey(
          "compare_filter.third_column.p_start_date",
          dateObj.firstDate
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.p_end_date",
          dateObj.secondDate
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.date_unit",
          "quarter"
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.formatted_date",
          dateObj.formatted_date
        );
      }
      if (props.cellnum == 4) {
        updateGlobalFilterKey(
          "compare_filter.fourth_column.p_start_date",
          dateObj.firstDate
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.p_end_date",
          dateObj.secondDate
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.date_unit",
          "quarter"
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.formatted_date",
          dateObj.formatted_date
        );
      }
    } else {
      updateMonthDates(
        dateObj.firstDate,
        dateObj.secondDate,
        dateObj.formatted_date,
        "quarter"
      );
    }
    updateGlobalFilterKey("custom_filter", 0);
    handlePopoverClose();
  };

  const sendYearData = (yearData: any) => {
    if (value === 1) {
      updateGlobalFilterKey("global_filter.p_start_date", yearData + "-01-01");
      updateGlobalFilterKey("global_filter.p_end_date", yearData + "-12-31");
      updateGlobalFilterKey("global_filter.date_unit", "year");
      updateGlobalFilterKey("formatted_date", "Year" + " " + yearr);
    } else {
      if (props.cellnum == 1) {
        updateGlobalFilterKey(
          "compare_filter.first_column.p_start_date",
          yearData + "-01-01"
        );
        updateGlobalFilterKey(
          "compare_filter.first_column.p_end_date",
          yearData + "-12-31"
        );
        updateGlobalFilterKey("compare_filter.first_column.date_unit", "year");
        updateGlobalFilterKey(
          "compare_filter.first_column.formatted_date",
          "Year" + " " + yearData
        );
      } else if (props.cellnum == 2) {
        updateGlobalFilterKey(
          "compare_filter.second_column.p_start_date",
          yearData + "-01-01"
        );
        updateGlobalFilterKey(
          "compare_filter.second_column.p_end_date",
          yearData + "-12-31"
        );
        updateGlobalFilterKey("compare_filter.second_column.date_unit", "year");
        updateGlobalFilterKey(
          "compare_filter.second_column.formatted_date",
          "Year" + " " + yearData
        );
      } else if (props.cellnum == 3) {
        updateGlobalFilterKey(
          "compare_filter.third_column.p_start_date",
          yearData + "-01-01"
        );
        updateGlobalFilterKey(
          "compare_filter.third_column.p_end_date",
          yearData + "-12-31"
        );
        updateGlobalFilterKey("compare_filter.third_column.date_unit", "year");
        updateGlobalFilterKey(
          "compare_filter.third_column.formatted_date",
          "Year" + " " + yearData
        );
      } else if (props.cellnum == 4) {
        updateGlobalFilterKey(
          "compare_filter.fourth_column.p_start_date",
          yearData + "-01-01"
        );
        updateGlobalFilterKey(
          "compare_filter.fourth_column.p_end_date",
          yearData + "-12-31"
        );
        updateGlobalFilterKey("compare_filter.fourth_column.date_unit", "year");
        updateGlobalFilterKey(
          "compare_filter.fourth_column.formatted_date",
          "Year" + " " + yearData
        );
      } else {
        updateMonthDates(
          yearData + "-01-01",
          yearData + "-12-31",
          "Year" + " " + yearData,
          "year"
        );
      }
      updateGlobalFilterKey("custom_filter", 0);
      handlePopoverClose();
    }
  };

  const sendOnlyYear = (year: any) => {
    if (props.cellnum == 1) {
      compareGlobalYear1 = year;
    } else if (props.cellnum == 2) {
      compareGlobalYear2 = year;
    } else if (props.cellnum == 3) {
      compareGlobalYear3 = year;
    } else if (props.cellnum == 4) {
      compareGlobalYear4 = year;
    } else {
      globalYear = year;
      setYearr(year);
    }
  };

  useEffect(() => {
    if (yearr) {
      globalYear = yearr;
    }
  }, [yearr]);

  const formatDate = (date: any) => {
    const options = { day: "numeric", month: "short", year: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options as any);
  };

  const onChangeSelectedDates = (fDate: any, eDate: any) => {
    const formattedStartDate = formatDate(fDate);
    const formattedEndDate = formatDate(eDate);
    const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;

    if (props.cellnum == 1) {
      updateGlobalFilterKey("compare_filter.first_column.p_start_date", fDate);
      updateGlobalFilterKey("compare_filter.first_column.p_end_date", eDate);
      updateGlobalFilterKey("compare_filter.first_column.date_unit", "custom");
      updateGlobalFilterKey(
        "compare_filter.first_column.formatted_date",
        formattedDateRange
      );
    } else if (props.cellnum == 2) {
      updateGlobalFilterKey("compare_filter.second_column.p_start_date", fDate);
      updateGlobalFilterKey("compare_filter.second_column.p_end_date", eDate);
      updateGlobalFilterKey("compare_filter.second_column.date_unit", "custom");
      updateGlobalFilterKey(
        "compare_filter.second_column.formatted_date",
        formattedDateRange
      );
    } else if (props.cellnum == 3) {
      updateGlobalFilterKey("compare_filter.third_column.p_start_date", fDate);
      updateGlobalFilterKey("compare_filter.third_column.p_end_date", eDate);
      updateGlobalFilterKey("compare_filter.third_column.date_unit", "custom");
      updateGlobalFilterKey(
        "compare_filter.third_column.formatted_date",
        formattedDateRange
      );
    } else if (props.cellnum == 4) {
      updateGlobalFilterKey("compare_filter.fourth_column.p_start_date", fDate);
      updateGlobalFilterKey("compare_filter.fourth_column.p_end_date", eDate);
      updateGlobalFilterKey("compare_filter.fourth_column.date_unit", "custom");
      updateGlobalFilterKey(
        "compare_filter.fourth_column.formatted_date",
        formattedDateRange
      );
    } else {
      updateGlobalFilterKey("global_filter.p_start_date", fDate);
      updateGlobalFilterKey("global_filter.p_end_date", eDate);
      updateGlobalFilterKey("global_filter.date_unit", "custom");
      updateGlobalFilterKey("formatted_date", formattedDateRange);
      updateGlobalFilterKey("compare_filter.first_column.p_start_date", fDate);
      updateGlobalFilterKey("compare_filter.first_column.p_end_date", eDate);
      updateGlobalFilterKey("compare_filter.first_column.date_unit", "custom");
      updateGlobalFilterKey(
        "compare_filter.first_column.formatted_date",
        formattedDateRange
      );
      updateGlobalFilterKey("compare_filter.second_column.p_start_date", fDate);
      updateGlobalFilterKey("compare_filter.second_column.p_end_date", eDate);
      updateGlobalFilterKey("compare_filter.second_column.date_unit", "custom");
      updateGlobalFilterKey(
        "compare_filter.second_column.formatted_date",
        formattedDateRange
      );
      updateGlobalFilterKey("compare_filter.third_column.p_start_date", fDate);
      updateGlobalFilterKey("compare_filter.third_column.p_end_date", eDate);
      updateGlobalFilterKey("compare_filter.third_column.date_unit", "custom");
      updateGlobalFilterKey(
        "compare_filter.third_column.formatted_date",
        formattedDateRange
      );
      updateGlobalFilterKey("compare_filter.fourth_column.p_start_date", fDate);
      updateGlobalFilterKey("compare_filter.fourth_column.p_end_date", eDate);
      updateGlobalFilterKey("compare_filter.fourth_column.date_unit", "custom");
      updateGlobalFilterKey(
        "compare_filter.fourth_column.formatted_date",
        formattedDateRange
      );
    }
    updateGlobalFilterKey("custom_filter", 0);
  };

  return (
    <Box className="filter-icons filter-calander relative mx-1.5">
      <CalendarTodayIcon onClick={handlePopoverOpen} />

      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className={
          popoverOpen
            ? "animate__animated animate__fadeIn"
            : "animate__animated animate__fadeIn"
        }
      >
        <Card className="share-data calender" ref={targetRef}>
          <CloseIcon className="closeIcon" onClick={handlePopoverClose} />
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider" }}
              className="tab-main-calender pr-6"
            >
              <Tabs
                className="custom-btn"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Month" {...a11yProps(0)} />
                <Tab label="Quarter" {...a11yProps(1)} />
                <Tab label="Year" {...a11yProps(2)} />

                {_globalFilter.benchmark_toggle == false &&
                  window.location.pathname != "/vahan" && (
                    <Tab label="Custom" {...a11yProps(3)} />
                  )}
              </Tabs>
            </Box>
            <TabPanel className="tabs-content" value={value} index={0}>
              <YearSlide
                sendYear={sendOnlyYear}
                stateYear={yearr}
                compareYear={compareYear}
                compareMonth={selectedMonth}
                cellNum={props.cellnum}
              />
              <Table className="month-wrapper">
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={`${selectedMonth == "01" && "active-month"}`}
                      onClick={() => getMonth("01", "Jan")}
                    >
                      jan
                    </TableCell>
                    <TableCell
                      className={`${selectedMonth == "02" && "active-month"}`}
                      onClick={() => getMonth("02", "Feb")}
                    >
                      feb
                    </TableCell>
                    <TableCell
                      className={`${selectedMonth == "03" && "active-month"}`}
                      onClick={() => getMonth("03", "Mar")}
                    >
                      mar
                    </TableCell>
                    <TableCell
                      className={`${selectedMonth == "04" && "active-month"}`}
                      onClick={() => getMonth("04", "Apr")}
                    >
                      apr
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={`${selectedMonth == "05" && "active-month"}`}
                      onClick={() => getMonth("05", "May")}
                    >
                      may
                    </TableCell>
                    <TableCell
                      className={`${selectedMonth == "06" && "active-month"}`}
                      onClick={() => getMonth("06", "Jun")}
                    >
                      jun
                    </TableCell>
                    <TableCell
                      className={`${selectedMonth == "07" && "active-month"}`}
                      onClick={() => getMonth("07", "Jul")}
                    >
                      july
                    </TableCell>
                    <TableCell
                      className={`${selectedMonth == "08" && "active-month"}`}
                      onClick={() => getMonth("08", "Aug")}
                    >
                      aug
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={`${selectedMonth == "09" && "active-month"}`}
                      onClick={() => getMonth("09", "Sep")}
                    >
                      sept
                    </TableCell>
                    <TableCell
                      className={`${selectedMonth == "10" && "active-month"}`}
                      onClick={() => getMonth("10", "Oct")}
                    >
                      oct
                    </TableCell>
                    <TableCell
                      className={`${selectedMonth == "11" && "active-month"}`}
                      onClick={() => getMonth("11", "Nov")}
                    >
                      nov
                    </TableCell>
                    <TableCell
                      className={`${selectedMonth == "12" && "active-month"}`}
                      onClick={() => getMonth("12", "Dec")}
                    >
                      dec
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabPanel>
            <TabPanel className="tabs-content" value={value} index={1}>
              <YearSlide
                sendYear={sendOnlyYear}
                stateYear={yearr}
                compareYear={compareYear}
                compareMonth={selectedMonth}
                cellNum={props.cellnum}
              />
              <Table className="quarter-wrapper mt-3.5">
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={`${
                        quarterMonth == "q1" ||
                        (quarterMonth == "Q1" && "active-Quarter")
                      } false p-2 text-center uppercase cursor-pointer border-b-0`}
                      onClick={() => getQmonth("q1", "Q1")}
                    >
                      q1
                    </TableCell>
                    <TableCell
                      className={`${
                        quarterMonth == "q2" ||
                        (quarterMonth == "Q2" && "active-Quarter")
                      } false p-2 text-center uppercase cursor-pointer border-b-0`}
                      onClick={() => getQmonth("q2", "Q2")}
                    >
                      q2
                    </TableCell>
                    <TableCell
                      className={`${
                        quarterMonth == "q3" ||
                        (quarterMonth == "Q3" && "active-Quarter")
                      } false p-2 text-center uppercase cursor-pointer border-b-0`}
                      onClick={() => getQmonth("q3", "Q3")}
                    >
                      q3
                    </TableCell>
                    <TableCell
                      className={`${
                        quarterMonth == "q4" ||
                        (quarterMonth == "Q4" && "active-Quarter")
                      } false p-2 text-center uppercase cursor-pointer border-b-0`}
                      onClick={() => getQmonth("q4", "Q4")}
                    >
                      q4
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabPanel>
            <TabPanel className="tabs-content" value={value} index={2}>
              <YearSlide
                sendYear={sendYearData}
                stateYear={yearr}
                compareYear={compareYear}
                compareMonth={selectedMonth}
                cellNum={props.cellnum}
              />
            </TabPanel>
            <TabPanel className="tabs-content" value={value} index={3}>
              <Box className="custom_date_picker">
                <Flatpickr
                  options={{
                    mode: "range",
                    minDate: "2000-01",
                    maxDate: new Date(),
                    dateFormat: "Y-m-d",
                    defaultDate:
                      pageCode == "compare"
                        ? [compareCustDate?.startDate, compareCustDate?.endDate]
                        : [customDate?.startDate, customDate?.endDate],
                  }}
                  onChange={(selectedDates) => {
                    if (selectedDates && selectedDates[0] && selectedDates[1]) {
                      const firstDate = selectedDates[0];
                      const year = firstDate.getFullYear();
                      const month = firstDate.getMonth() + 1;
                      const day = firstDate.getDate();
                      const secondDate = selectedDates[1];
                      const yearSec = secondDate.getFullYear();
                      const monthSec = secondDate.getMonth() + 1;
                      const daySec = secondDate.getDate();
                      const formattedFirstDate = `${year}-${month
                        .toString()
                        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                      const formattedSecondDate = `${yearSec}-${monthSec
                        .toString()
                        .padStart(2, "0")}-${daySec
                        .toString()
                        .padStart(2, "0")}`;
                      onChangeSelectedDates(
                        formattedFirstDate,
                        formattedSecondDate
                      );
                      handlePopoverClose();
                    }
                  }}
                  render={(
                    { defaultValue, range, value, ...props }: any,
                    ref: React.Ref<HTMLInputElement>
                  ) => {
                    return (
                      <CustomInput
                        defaultValue={defaultValue}
                        inputRef={ref}
                        placeholder="Pick Date"
                      />
                    );
                  }}
                />
              </Box>
            </TabPanel>
          </Box>
        </Card>
      </Popover>
    </Box>
  );
};

export default CalanderFilter;
