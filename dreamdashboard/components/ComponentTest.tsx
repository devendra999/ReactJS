import React, { useState } from "react";
import { Box } from "@mui/material";
import Button from "./ButtonItem";
import Footer from "./Footer";
import InputField from "./InputField";
import { PanelHeader } from "./PanelHeader";
import { FilterListing } from "./FilterListing";
import { Link, Outlet } from "react-router-dom";
import ShareData from "./ShareData";
import FilterOptions from "./FilterOptions";
import Modal from "./Modal";
import UserList from "../components/UserList";

export const ComponentTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-center  font-bold my-10  text-4xl  custom">
        Azure Autoverse Dashboard
      </h1>

      <ShareData />
      <FilterOptions />
      <Box className="text-center">
        <Button
          ButtonTitle="Welcome To Azure Autoverse"
          className="text-center mb-8"
        />
        <Footer />
        <InputField />

        <Box className="text-center mx-auto w-full  justify-center flex">
          <nav className="text-center mx-auto">
            <ul className="flex items-center">
              <li className="mr-4">
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/landing">Landing</Link>
              </li>
            </ul>
          </nav>
        </Box>

        <PanelHeader />

        <FilterListing />
        <UserList />
      </Box>

      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <p>Modal Content</p>
      </Modal>
    </>
  );
};

