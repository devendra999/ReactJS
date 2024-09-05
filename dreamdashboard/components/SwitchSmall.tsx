import React from "react";
import { styled } from "@mui/material/styles";
import { Stack, Switch, Typography } from "@mui/material";

const baseFontSize = 16;

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: `${28 / baseFontSize}rem`,
  height: `${16 / baseFontSize}rem`,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: `${15 / baseFontSize}rem`,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: `translateX(${9 / baseFontSize}rem)`,
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: `${2 / baseFontSize}rem`,
    "&.Mui-checked": {
      transform: `translateX(${12 / baseFontSize}rem)`,
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark" ? "#177ddc" : "rgb(8, 82, 196)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: `0 ${2 / baseFontSize}rem ${
      4 / baseFontSize
    }rem 0 rgb(0 35 11 / 20%)`,
    width: `${12 / baseFontSize}rem`,
    height: `${12 / baseFontSize}rem`,
    borderRadius: `${6 / baseFontSize}rem`,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: `${16 / 2 / baseFontSize}rem`,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(8, 82, 196, 1)",
    boxSizing: "border-box",
  },
}));

interface CustomSwitchProps {
  leftLabel?: any;
  rightLabel?: any;
  className?: string;
  checked?: boolean;
  onChange?: any;
  // key?: boolean;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  leftLabel,
  rightLabel,
  className,
  checked,
  onChange,
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      className={className}
    >
      <Typography className="font-medium">{leftLabel}</Typography>
      <AntSwitch
        // defaultChecked={checked}
        checked={checked}
        onChange={onChange}
        inputProps={{ "aria-label": "ant design" }}
      />
      <Typography className="font-medium">{rightLabel}</Typography>
    </Stack>
  );
};

export default CustomSwitch;
