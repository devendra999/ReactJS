import React from "react";
import SyncIcon from "@mui/icons-material/Sync";
import Image from "next/image";

const loading = () => {
  return (
    <div className="space loading">
      {/* <SyncIcon /> */}
      <Image src="/loader.webp" width={100} height={100} alt="" />
    </div>
  );
};

export default loading;
