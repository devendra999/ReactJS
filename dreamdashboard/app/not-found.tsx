"use client";
import { Box, Typography } from "@mui/material";
import ButtonItem from "@root/components/ButtonItem";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <Box className="notFoundClss bg-white text-center bg-no-repeat bg-contain bg-center">
      <Box className="textContentTop absolute top-[20px]  left-0 right-0">
      <Typography variant={"h1"}>404</Typography>
      </Box>
      <Box className="textContent absolute bottom-[20px]  left-0 right-0">
        <Typography variant={"h3"}>Look like you&apos;re lost</Typography>
        <Typography component={"span"} className="my-3">
          the page you are looking for not avaible!
        </Typography>
        <Box className={"mt-5"}>
          <ButtonItem
            className="containBtn"
            ButtonTitle="Back to Home"
            type="button"
            onClick={() => router.push("/")}
          />
        </Box>
      </Box>
    </Box>
  );
}
