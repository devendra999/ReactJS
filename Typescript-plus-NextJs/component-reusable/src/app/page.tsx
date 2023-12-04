"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import SelectOption from "@/components/SelectOption";
import React, { useState, ChangeEvent } from "react";

const Home: React.FC = () => {
  // input
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // button
  const handleClick = () => {
    console.log("Button clicked!");
  };

  // select option
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <>
      <div>
        <Input
          type="text"
          required={true}
          value={inputValue}
          placeholder="Enter text"
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Button onClick={handleClick}>Click me</Button>
      </div>

      <div>
        <SelectOption
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
        />
      </div>
    </>
  );
};

export default Home;
