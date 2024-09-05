import React, { useState, useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      typeof personName === "number" || personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectPlaceholder(props: any) {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState<null | boolean>(null);
  const [personName, setPersonName] = useState<string[]>([
    props.defaultValue || [],
  ]);

  useEffect(() => {
    if (Array.isArray(props.defaultValue)) {
      setPersonName(props.defaultValue);
    } else {
      setPersonName(props.defaultValue ? props.defaultValue.split(",") : []);
    }
  }, [props.defaultValue]);

  useEffect(() => {
    if(props?.isMapped){
      setPersonName([]);
      props?.setIsMapped(false)
    }
  },[props?.isMapped])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setIsSelected(true);
    if (props.handleChange) {
      props.handleChange(event.target);
    }
    if (props.handleBranchMapping) {
      props.handleBranchMapping(event.target, props.branch);
    }
    if (props.handleModelMapping) {
      props.handleModelMapping(event.target, props.model);
    }
    if (props.handleConsultantMapping) {
      props.handleConsultantMapping(event.target, props.model);
    }

    if (props.handleSheetMappingChange && props.currentDropdown) {
      props.handleSheetMappingChange(
        props.currentDropdown,
        event.target.value,
        props.model
      );
    }

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    if (props.handleSelectedRow) {
      props.handleSelectedRow(event.target, props.rowId, props.fieldName);
    }
  };

  const handleClearSelection = () => {
    setPersonName([]);
    setIsSelected(false);
    if (props.handleSheetMappingChange && props.currentDropdown) {
      props.handleSheetMappingChange(props.currentDropdown, "", props.model);
    }
    if (props.handleSelectedRow) {
      props.handleSelectedRow(event.target, props.rowId, props.fieldName);
    }
  };
  return (
    <div>
      <FormControl
        className={props.className}
        style={{ display: "flex", flexDirection: "row" }}
      >
        {props.labelname ? (
          <label
            className="form-custom-label"
            style={{ marginBottom: ".25rem" }}
          >
            {props.labelname}
          </label>
        ) : (
          ""
        )}

        <Select
        key={props.key}
          multiple={props.multiple}
          displayEmpty
          disabled={props.rowId === undefined && props.disabled || props.rowId && props.disabled}
          value={personName}
          name={props.name || ""}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected?.length === 0) {
              return (
                <b className="dropdownInsideFont">{props.dropdownTitle}</b>
              );
            }

            // If multiple values are selected, wrap each value in a <div>
            if (Array.isArray(selected)) {
              return (
                <div>
                  {selected.map((value, index: number) => {
                    const selectedOption = props.options?.find(
                      (option) => option?.value === value
                    );
                    return (
                      <div key={index}>
                        {selectedOption
                          ? selectedOption.label || selectedOption.value
                          : value}
                      </div>
                    );
                  })}
                </div>
              );
            }

            // If only one value is selected, return it as is
            const selectedOption = props.options?.find(
              (option) => option.value === selected
            );
            return (
              <div>
                {selectedOption
                  ? selectedOption.label || selectedOption.value
                  : props.dropdownTitle}
              </div>
            );
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <b className="dropdownInsideFont">{props.dropdownTitle}</b>
          </MenuItem>
          {props.options &&
            props.options.map((option: any, index: number) => (
              <MenuItem
                key={index}
                value={option?.value}
                className={`${
                  option?.value === "New" ? "text-darkblue font-semibold " : ""
                }`}
              >
                { option?.code ? option.label +  ' - ' + option.code : option?.label  ?? option?.value}
              </MenuItem>
            ))}
        </Select>

        {isSelected && props.enableDeselect && (
          <div style={{ flex: 0.5 }}>
            <ClearIcon
              onClick={handleClearSelection}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </FormControl>
    </div>
  );
}

