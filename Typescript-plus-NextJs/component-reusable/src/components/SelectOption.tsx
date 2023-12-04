import React, { FC, ChangeEvent } from "react";

interface SelectOptionProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectOption: FC<SelectOptionProps> = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
