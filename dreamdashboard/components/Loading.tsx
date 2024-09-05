import * as React from "react";
import Box from "@mui/material/Box";
import loaderImg from "@root/assets/icons/loader.gif";
import Image from "next/image";

export default function Loading({className}:{className: string}) {
  return (
    <Box className={`loaderScreen flex items-center justify-center z-[26] fixed top-0 left-0 h-[100vh] w-[100vw] bg-loader-background ${className}`}>
      <Image src={loaderImg} width={150} height={150} alt="loader" />
    </Box>
  );
}
