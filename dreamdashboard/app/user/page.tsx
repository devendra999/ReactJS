"use client"
import React from 'react';
import Box from "@mui/material/Box";
import UserList from "@root/components/UserList";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from '@root/components/ButtonItem';
import { TextField, Typography } from '@mui/material';
import { MUIDataTableOptions } from 'mui-datatables';
import { FooterItem } from '@root/components/Footer';

interface User {
  username: string;
  email: string;
  role: string;
  emailconfirmed: string;
  phoneNo: number;
}

const UserPage: React.FC = () => {

  const columns = [
    {
      name: 'username',
      label: 'User Name',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'role',
      label: 'Role',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'emailconfirmed',
      label: 'Email Confirmation',
      options: {
        filter: false,
        sort: false,
        customBodyRender: () => (
          <span className='badge-primary'> Confirmed </span>
        ),
      },
    },
    {
      name: 'phoneNo',
      label: 'Phone Number',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'Action',
      label: 'Action',
      headerStyle: 'table-header',
      options: {
        filter: false,
        sort: false,
        customBodyRender: () => (
          <ButtonItem className='btn-blue' ButtonTitle='Edit' type='button' />
        ),
      },
    },
  ];

  const data: User[] = [
    { username: 'payal.nikumbh@azureknowledge.com', email: 'chirag.rajpara@azureknowledge.com', role: 'Sales Head', emailconfirmed: 'Confirmed', phoneNo: 5896589625 },
    { username: 'abc@azureknowledge.com', email: 'chirag.rajpara@azureknowledge.com', role: 'Sales Head', emailconfirmed: 'Confirmed', phoneNo: 2548965862 },
    { username: 'xyz@azureknowledge.com', email: 'chirag.rajpara@azureknowledge.com', role: 'Sales Head', emailconfirmed: 'Confirmed', phoneNo: 1035485565 },
    { username: 'pqr.nikumbh@azureknowledge.com', email: 'chirag.rajpara@azureknowledge.com', role: 'Sales Head', emailconfirmed: 'Confirmed', phoneNo: 8695245896 },
  ];

  const options: MUIDataTableOptions = {
    pagination: false,
    filter: false,
    print: false,
    searchOpen: true,
    viewColumns: false,
    download: false,
    search: false,
    selectableRows: 'none',
    responsive: 'standard',
    customSearchRender: (
      searchText: string,
      handleSearch: (text: string) => void,
      hideSearch: () => void,
      options: MUIDataTableOptions
    ) => (
      <TextField className='search-box'
        variant='outlined'
        fullWidth
        placeholder={options.searchPlaceholder}
        value={searchText}
        onChange={(event) => handleSearch(event.target.value)}
        autoFocus // Automatically focus on the search input
      />
    ),
  };

  return (
    <>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4">
          <Box className="flex justify-between items-center sm:block">
            <PanelHeading
              firstHeading={"Users"}
            />
          </Box>
        </Box>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <Box className="dashboard-sales-items">
            <Box>
              <UserList columns={columns} data={data} options={options} className='custom-table' />
            </Box>
          </Box>
        </Box>
        {/* <Box className="footer-bottom">
          </Box> */}
      </Box>

    </>
  );
}

export default UserPage;