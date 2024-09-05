import React from "react";
import { Typography, Box } from "@mui/material";
import Image from "next/image";

interface LandingHeadingProps {
  topHeading: string;
  bottomHeading: string;
  brandPageLogo: string;
  BrandPageLogoDefault: any;
}

export const LandingHeading: React.FC<LandingHeadingProps> = (props) => {
  return (
    <Box className="top-header text-center mb-0 pl-0">
      <Image
        src={
          props.brandPageLogo ? props.brandPageLogo : props.BrandPageLogoDefault
        }
        className="client-logo"
        height={190}
        width={190}
        alt="client-logo"
      />

      <Typography
        variant="h1"
        className="heading max-width-content text-center text-blue200 inline-block font-semibold  border-solid border-b-4   border-grey400"
      >
        {props.topHeading}
      </Typography>
      <Typography
        variant="h2"
        className="sub-heading text-center text-grey300 font-bold"
      >
        <h2>Dream Dashboard</h2>
      </Typography>
    </Box>
  );
};
