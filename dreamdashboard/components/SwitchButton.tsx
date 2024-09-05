import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const SwitchButton = (props:any) => {
  const [subType, setSubType] = useState("");

  const onClick = (tabName:any) => {
    setSubType(tabName)
    props.sendData(tabName)
  };

  return (
    <Box className="flex button-item-switch">
      <Box className="mask-box rounded-[30px] ml-4 relative bg-blue-opacity whitespace-nowrap">
        <Box
          className="mask w-[120px] h-[35px] rounded-[30px] text-darkblue bg-white absolute transition-all duration-500 ease"
          style={{
            transform: `translateX(${subType === "modern" ? 0 : "7.5rem"})`,
          }}
        />

        <Button
          disableRipple
          variant="text"
          className={subType === "modern" ? "active" : ""}
          onClick={() => onClick("modern")}
        >
          Modern
        </Button>

        <Button
          disableRipple
          variant="text"
          className={subType === "classic" ? "active" : ""}
          onClick={()=>onClick("classic")}
        >
          Classic
        </Button>
      </Box>
    </Box>
  );
}
export default SwitchButton;