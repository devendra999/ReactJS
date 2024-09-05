import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Typography } from "@mui/material";
import { getFromLocalStorage } from "@root/utils";
import { useSelector } from "react-redux";

interface YearSlideProps {
  sendYear?: any;
  stateYear: number;
  compareYear: number;
  compareMonth: any;
  cellNum: () => void;
}

export const YearSlide: React.FC<YearSlideProps> = (props: any) => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const globalYear =
    new Date(_globalFilter.global_filter.p_start_date).getFullYear() ||
    new Date().getFullYear();

  const [curYear, setCurYear] = useState<number>(globalYear);

  const [cellNum, setCellNum] = useState<number>(props.cellnum);
  const [cYear, setCYear] = useState<number>(props.compareYear);
  const [cMonth, setCMonth] = useState<number>(props.compareMonth);

  const [selectedYear, setSelectedYear] = useState<number>(props.stateYear);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const prevYear = () => {
    if (curYear === 2002) {
      setCurYear(2002);
    } else {
      setCurYear((prevYear) => Number(prevYear) - 1);
    }
  };

  const nextYear = () => {
    if (curYear === new Date().getFullYear()) {
      setCurYear(curYear);
    } else {
      setCurYear((prevYear) => Number(prevYear) + 1);
    }
  };

  const getYear = (event: any, itemId: any) => {
    setActiveItem(itemId);
    props.sendYear(event.target.innerHTML);
    setSelectedYear(event.target.innerHTML);
  };

  useEffect(() => {
    setActiveItem(3);
    if (globalYear) {
      setCurYear(globalYear);
    }
    setSelectedYear(globalYear);
  }, [globalYear]);

  useEffect(() => {
    setActiveItem(3);
    if (props.cellNum === 1) {
      setActiveItem(3);
      if (cYear) {
        setCurYear(cYear);
      }
      setSelectedYear(cYear);
    }
    if (props.cellNum === 2) {
      setActiveItem(3);
      if (cYear) {
        setCurYear(cYear);
      }
      setSelectedYear(cYear);
    }
    if (props.cellNum === 3) {
      setActiveItem(3);
      if (cYear) {
        setCurYear(cYear);
      }
      setSelectedYear(cYear);
    }
    if (props.cellNum === 4) {
      setActiveItem(3);
      if (cYear) {
        setCurYear(cYear);
      }
      setSelectedYear(cYear);
    }
  }, [cYear]);

  return (
    <Box className="year-wrapper flex items-center justify-between">
      <Box className="prevYear">
        <ArrowBackIcon onClick={prevYear} />
      </Box>

      <Typography
        component="span"
        className={`c-date ${selectedYear == curYear - 2 ? "active" : ""}`}
        onClick={(event) => getYear(event, 1)}
      >
        {!NaN && curYear - 2}
      </Typography>

      <Typography
        component="span"
        className={`c-date ${selectedYear == curYear - 1 ? "active" : ""}`}
        onClick={(event) => getYear(event, 2)}
      >
        {!NaN && curYear - 1}
      </Typography>

      <Typography
        component="span"
        className={`c-date ${selectedYear == curYear ? "active" : ""}`}
        onClick={(event) => getYear(event, 3)}
      >
        {!NaN && curYear}
      </Typography>
      <Box
        className={`nextYear ${
          !isNaN && curYear === new Date().getFullYear() && "disabled"
        }`}
      >
        <ArrowForwardIcon onClick={nextYear} />
      </Box>
    </Box>
  );
};
