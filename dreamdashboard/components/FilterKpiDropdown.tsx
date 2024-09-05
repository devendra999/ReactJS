import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButtonSingle from "./IconButtonSingle";
import { useSearchParams } from "next/navigation";
import { OutlinedInput } from "@mui/material";

export default function FilterKpiDropdown(props: any) {
  const [dropdownValue, setDropdownValue] = React.useState<any[]>([]);
  const searchParams = useSearchParams();
  const pageCode = searchParams.get("page");
  const handleChange = (event: SelectChangeEvent<typeof dropdownValue>) => {

    const {
      target: { value },
    } = event;
    setDropdownValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    // setDropdownValue(event.target.value as string);
    props.sendChildToParent(typeof value === 'string' ? value.split(',') : value);
  };

  const removeMenuItem = (param: any) => {
    props.onSelect(param);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth className={props.className}>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          displayEmpty
          value={dropdownValue}
          // label="Age"
          // input={<OutlinedInput />}
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "300px", // Set your desired max height here
                overflowY: "auto", // Add scrolling if content exceeds maxHeight
              },
            },
          }}
          inputProps={{ 'aria-label': 'Without label' }}
          // renderValue={(selected) => {
          //   if (selected.length === 0) {
          //     return (
          //       <b className="dropdownInsideFont">{props.dropdownTitle}</b>
          //     );
          //   }
          // }}
        >
          <MenuItem disabled value="">
            <b className="dropdownInsideFont">{props.dropdownTitle}</b>
          </MenuItem>
          {pageCode != "compare"
            ? props.options &&
              props.options.map((option: any, index: number) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            : props.options &&
              props.options.map((option: any) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  className={option.className}
                >
                  <Box className=" flex justify-between flex-wrap items-center w-full">
                    {option.label}
                    {option.value > 1 && (
                      <IconButtonSingle
                        onClick={() => removeMenuItem(option.value)}
                        className="p-0 ml-2 filterRemoveIcon"
                        icon={<CancelIcon sx={{ fontSize: "1.4rem" }} />}
                      />
                    )}
                  </Box>
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Box>
  );
}
