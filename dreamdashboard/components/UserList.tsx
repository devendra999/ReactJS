import React, { useState } from "react";
import Box from "@mui/material/Box";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";

interface User {
  username: string;
  email: string;
  role: string;
  emailconfirmed: string;
  phoneNo: number;
}

interface MUIDataTableProps {
  data: User[];
  columns: any[];
  options: MUIDataTableOptions;
  className?: any;
}

const UserList: React.FC<MUIDataTableProps> = ({
  data,
  columns,
  options,
  className,
}) => {
  const [searchText, setSearchText] = useState<string | null>(null);

  const handleSearch = (searchValue: string | null) => {
    setSearchText(searchValue);
  };

  return (
    <Box>
      <MUIDataTable
        title={"Users"}
        data={data}
        className={`${className}`}
        columns={columns}
        options={{
          ...options,
          searchText: searchText || "",
          onSearchChange: handleSearch,
        }}
      />
    </Box>
  );
};

export default UserList;

