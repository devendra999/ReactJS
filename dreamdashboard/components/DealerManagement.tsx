import React, { FunctionComponent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FileUpload from "@root/components/FileUploadComponent";
import ButtonItem from "./ButtonItem";
import { Box, Button, Typography } from "@mui/material";
import { _baseUrl } from "../../src/backend/backendFetcher";
import axios from "axios";
import {
  useGetManyBaseDealersControllerDealers,
  useDealersControllerDealerUpdateDetails,
} from "@root/backend/backendComponents";
import Modal from "./Modal";

interface Props {
  handleFileUpload: (file: File | null) => void;
}

const UserForm: FunctionComponent<Props> = ({ handleFileUpload }) => {
  const [homePageLogo, setHomePageLogo] = useState<any>(null);
  const [menubarLogo, setMenubarLogo] = useState<any>(null);
  const [dealerName, setDealerName] = useState("");
  const [dealerNameKey, setDealerNameKey] = useState(Date.now());
  const [homePageLogoKey, setHomePageLogoKey] = useState(Date.now());
  const [menubarLogoKey, setMenubarLogoKey] = useState(Date.now());

  const [infoMsg, setInfoMsg] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);

  const { data: dealers, refetch: fetchDealers } =
    useGetManyBaseDealersControllerDealers(
      {
        queryParams: {},
      },
      {
        enabled: false,
      }
    );
  const { mutateAsync: updateDealers } =
    useDealersControllerDealerUpdateDetails();

  useEffect(() => {
    if (Array.isArray(dealers) && dealers.length > 0) {
      setMenubarLogo(dealers[0]?.logoUrl || null);
      setHomePageLogo(dealers[0]?.brandPageLogo || null);
      setDealerName(dealers[0]?.name || "");
    }
  }, [dealers]);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  const handleDealerNameChange = (event: any) => {
    setDealerName(event.target.value);
  };

  const menuImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", menubarLogo);

    try {
      const response = await fetch("/api/upload-image?flag=menu", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };
  const brandImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", homePageLogo);

    try {
      const response = await fetch("/api/upload-image?flag=brand", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  const updateDealerFunction = async () => {
    try {
      if (Array.isArray(dealers) && dealers.length > 0) {
        const dealerId = dealers[0].id;
        const requestBody = {
          id: dealerId,
          name: dealerName.trim().replace(/\s+/g, ' '),
          logo_url: menubarLogo?.name ? menubarLogo?.name : menubarLogo,
          brand_page_logo: homePageLogo?.name
            ? homePageLogo?.name
            : homePageLogo,
        };

        try {
          await updateDealers({
            body: requestBody,
          });
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    } catch (error) {}
  };

  const updateDealerManagement = () => {
    let errorMessages = [];
    const MAX_FILE_SIZE_MB = 2;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    const allowedExtensions = ["jpeg", "jpg", "png"];

    const isInvalidFile = (file: any) => {
      // const allowedExtensions = ["jpeg", "jpg", "png"];
      const fileExtension =
        typeof file === "object"
          ? file?.name.split(".").pop()
          : file?.split(".").pop();
      return !allowedExtensions.includes(fileExtension);
    };

    const isFileTooLarge = (file: any) => {
      if (typeof file === "object" && file.size) {
        return file.size > MAX_FILE_SIZE_BYTES;
      }
      return false; // Assume non-object types are valid in size
    };

    if (homePageLogo && isInvalidFile(homePageLogo)) {
      errorMessages.push(
        `Home Page Logo ${
          typeof homePageLogo === "object"
            ? homePageLogo?.name.split(".").pop()
            : homePageLogo?.split(".").pop()
        } Extension not allowed...`
      );
    } else if (homePageLogo && isFileTooLarge(homePageLogo)) {
      errorMessages.push(
        `Home Page Logo exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB}MB`
      );
    }

    if (menubarLogo && isInvalidFile(menubarLogo)) {
      errorMessages.push(
        `Menubar Logo ${
          typeof menubarLogo === "object"
            ? menubarLogo?.name.split(".").pop()
            : menubarLogo?.split(".").pop()
        } Extension not allowed`
      );
    } else if (menubarLogo && isFileTooLarge(menubarLogo)) {
      errorMessages.push(
        `Menubar Logo exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB}MB`
      );
    }

    if (dealerName.trim() === "") {
      errorMessages.push("Blank Dealer name not allowed");
    }

    if (errorMessages.length > 0) {
      setInfoMsg(errorMessages.join(" "));
      setIsConfirmationModalOpen(true);
    } else {
      if (dealers[0]?.logoUrl !== menubarLogo) {
        deleteMenuLogo("menu", dealers[0]?.logoUrl);
        menuImageUpload();
      }
      if (dealers[0]?.brandPageLogo !== homePageLogo) {
        deleteMenuLogo("brand", dealers[0]?.brandPageLogo);
        brandImageUpload();
      }
      updateDealerFunction();
      setInfoMsg("Dealer details updated successfully");
      setIsConfirmationModalOpen(true);
    }
  };

  // const updateDealerManagement = () => {
  //   if (
  //     homePageLogo !== null &&
  //     homePageLogo !== undefined &&
  //     typeof homePageLogo === "object"
  //       ? homePageLogo?.name.split(".").pop() !== "jpeg" &&
  //         homePageLogo?.name.split(".").pop() !== "jpg" &&
  //         homePageLogo?.name.split(".").pop() !== "png"
  //       : homePageLogo !== null &&
  //         homePageLogo !== undefined &&
  //         homePageLogo?.split(".").pop() !== "jpeg" &&
  //         homePageLogo?.split(".").pop() !== "jpg" &&
  //         homePageLogo?.split(".").pop() !== "png"
  //   ) {
  //     setInfoMsg(
  //       "Home Page Logo " +
  //         (typeof homePageLogo === "object"
  //           ? homePageLogo?.name.split(".").pop()
  //           : homePageLogo?.split(".").pop()) +
  //         " Extension not allowed..."
  //     );
  //     setIsConfirmationModalOpen(true);
  //   } else if (
  //     menubarLogo !== null &&
  //     menubarLogo !== undefined &&
  //     typeof menubarLogo === "object"
  //       ? menubarLogo?.name.split(".").pop() !== "jpeg" &&
  //         menubarLogo?.name.split(".").pop() !== "jpg" &&
  //         menubarLogo?.name.split(".").pop() !== "png"
  //       : menubarLogo !== null &&
  //         menubarLogo !== undefined &&
  //         menubarLogo?.split(".").pop() !== "jpeg" &&
  //         menubarLogo?.split(".").pop() !== "jpg" &&
  //         menubarLogo?.split(".").pop() !== "png"
  //   ) {
  //     setInfoMsg(
  //       "Menubar Logo " +
  //         (typeof menubarLogo === "object"
  //           ? menubarLogo?.name.split(".").pop()
  //           : menubarLogo?.split(".").pop()) +
  //         " Extension not allowed..."
  //     );
  //     setIsConfirmationModalOpen(true);
  //   } else if (dealerName == "") {
  //     setInfoMsg("Blank Dealer name not allowed...");
  //     setIsConfirmationModalOpen(true);
  //   } else {
  //     if (dealers[0]?.logoUrl !== null) {
  //       deleteMenuLogo("menu", dealers[0]?.logoUrl);
  //       menuImageUpload();
  //     }
  //     if (dealers[0]?.brandPageLogo !== null) {
  //       deleteMenuLogo("brand", dealers[0]?.brandPageLogo);
  //       brandImageUpload();
  //     }
  //     updateDealerFunction();
  //     setInfoMsg("Dealer details updated successfully...");
  //     setIsConfirmationModalOpen(true);
  //   }
  // };

  const handleCancel = () => {
    if (Array.isArray(dealers) && dealers.length > 0) {
      setMenubarLogo(dealers[0]?.logoUrl || null);
      setHomePageLogo(dealers[0]?.brandPageLogo || null);
      setDealerName(dealers[0]?.name || "");
      setDealerNameKey(Date.now()); // Change the key to force re-render
      setHomePageLogoKey(Date.now()); // Change the key to force re-render
      setMenubarLogoKey(Date.now()); // Change the key to force re-render
    }
  };

  const deleteMenuLogo = async (param: any, imagePath: any) => {
    const formData = new FormData();
    formData.append("remove_file_path", imagePath);
    try {
      const response = await fetch("/api/delete?flag=" + param, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    setInfoMsg("");
  };

  return (
    <Box className="user-form card-fields small-form-control bg-white max-w-[100%] sm:mt-5 md:mt-5 mt-20 mx-auto rounded-[20px] dealer-manage">
      <Box className="dashboard-sales-items">
        <label className="form-custom-label">Dealer Name</label>
        <TextField
          key={dealerNameKey}
          name="dealername"
          inputProps={{ maxLength: 64 }}
          placeholder="Enter Dealer Name"
          type="text"
          value={dealerName}
          onDoubleClick={(event: any) => setDealerName(event.target.value)}
          onChange={handleDealerNameChange}
          className="dropdownComponent rounded-lg text-blacklight600 p-0 mb-4"
        />
        <Box className="flex manage-upload">
          <Box className="flex flex-col">
            <label className="form-custom-label">
              Home Page logo (brandPageLogo)
            </label>
            <FileUpload
              key={homePageLogoKey}
              accept="png, jpeg, jpg"
              buttonText="Select File"
              onFileUpload={(file: File) => {
                handleFileUpload(file);
                setHomePageLogo(file);
              }}
              type={"image"}
              imagePath={"homePageLogo"}
            />
          </Box>
          <Box className="flex flex-col">
            <label className="form-custom-label">Menubar Logo (logoUrl)</label>
            <FileUpload
              key={menubarLogoKey}
              accept="png, jpeg, jpg"
              buttonText="Select File"
              onFileUpload={(file: File) => {
                handleFileUpload(file);
                setMenubarLogo(file);
              }}
              type={"image"}
              imagePath={"menubarlogo"}
            />
          </Box>
        </Box>
        <Box className="w-100 flex justify-center button-group-data">
          <Button
            className="btn w-80 transparent mr-[10px]"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="btn w-80"
            type="button"
            onClick={updateDealerManagement}
          >
            Save
          </Button>
        </Box>
        <Modal
          isOpen={isConfirmationModalOpen}
          onClose={handleConfirmationCloseModal}
          modalextraclass="modal-small"
        >
          <Box className="modal-main-data">
            <Typography variant="h6" className="note-description text-center">
              {infoMsg}
            </Typography>

            <Box>
              <Box className="w-100 flex justify-center button-group-data">
                <ButtonItem
                  className="outlineBtn mx-1"
                  ButtonTitle="Close"
                  type="button"
                  onClick={handleConfirmationCloseModal}
                />
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default UserForm;
