"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import {
  useGetManyBaseRolesControllerRoles,
  useRoleMastePageControllerPermissionRoleMaster,
  useGetManyBaseRoleMastePageControllerRoleMasterPage,
  useMasterControllerMasterPageGet,
} from "@root/backend/backendComponents";
import { getFromLocalStorage } from "@root/utils";
import { useAuthStore } from "@root/store/auth-store";
// import SidebarWithLayout from "../layout-with-sidebar";
// import MasterPageTable from "@root/components/MasterPageTable";
// import Modal from "../../components/Modal";
// import ButtonItem from "@root/components/ButtonItem";
// import Loading from "@root/components/Loading";

import dynamic from "next/dynamic";

const SidebarWithLayout = dynamic(() => import("../layout-with-sidebar"));
const ButtonItem = dynamic(() => import("@root/components/ButtonItem"));
const Modal = dynamic(() => import("@root/components/Modal"));
const MasterPageTable = dynamic(
  () => import("@root/components/MasterPageTable")
);
const Loading = dynamic(() => import("@root/components/Loading"));

const MasterPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tableHeader, setTableHeader] = useState<any>([]);
  const [acDynamicData, setAcDynamicData] = useState<any>([]);
  const [rolesArray, setRolesArray] = useState<any>([]);
  const [clicked, setClicked] = useState(false);
  const [finalTableBool, setFinalTableBool] = useState(false);
  const brandId = JSON.parse(getFromLocalStorage("@brand-id") || "{}");
  const currentUser = useAuthStore((state) => state.loginData)?.user;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const {
    data: rolesMasterPageData,
    isLoading,
    refetch: getAllRolesMasterPageData,
  } = useGetManyBaseRoleMastePageControllerRoleMasterPage(
    {},
    { enabled: false }
  );
  const { mutateAsync: saveMasterPermissions, isLoading: saveLoader } =
    useRoleMastePageControllerPermissionRoleMaster();
  const {
    data: allMasterPageData,
    isLoading: allKpiLoadings,
    refetch: getAllMasterPageData,
  } = useMasterControllerMasterPageGet({}, { enabled: false });

  const {
    data: allRolesData,
    isLoading: rolesLoading,
    refetch: getAllRolesData,
  } = useGetManyBaseRolesControllerRoles({}, { enabled: false });

  useEffect(() => {
    getAllMasterPageData();
    getAllRolesData();
    getAllRolesMasterPageData();
  }, []);

  useEffect(() => {
    if (allRolesData && allMasterPageData && rolesMasterPageData) {
      //push all roles to array
      let tableHeadersCopy = ["Master Page"];
      let roles = [];
      for (let i = 0; i < (allRolesData as any)?.length; i++) {
        if (allRolesData[i].isSuperAdmin != true) {
          tableHeadersCopy.push((allRolesData as any)[i].name);
          roles.push((allRolesData as any)[i].name);
        }
      }

      setTableHeader(tableHeadersCopy);

      // Define an object to store the result grouped by section name
      const resultByMasterPage = {};

      for (const entry of allMasterPageData?.data as any) {
        const masterPageName = entry.name;
        const masterPageId = entry.id;
        const sectionName = masterPageName;

        if (!(resultByMasterPage as any)[sectionName]) {
          // If not, create a new entry for the section name
          (resultByMasterPage as any)[sectionName] = {
            category_name: masterPageName,
            page_id: masterPageId,
          };
        }
      }

      // Convert the result object into an array of sections
      const resultByMasterPageArray = Object.values(resultByMasterPage);

      for (let i = 0; i < resultByMasterPageArray.length; i++) {
        for (let j = 0; j < (allRolesData as any)?.length; j++) {
          let curMasterPage = (rolesMasterPageData as any)?.filter(
            (value: any) =>
              value.roleId === (allRolesData as any)[j].id &&
              value.masterPageId === (resultByMasterPageArray as any)[i].page_id
          );

          resultByMasterPageArray[i] = {
            ...(resultByMasterPageArray as any)[i],
            [`${(allRolesData as any)[j].name}`]:
              curMasterPage.length === 0 ? false : true,
          };
        }
      }
      setAcDynamicData(resultByMasterPageArray);
      setRolesArray(roles);
    }
  }, [allRolesData, allMasterPageData, rolesMasterPageData]);

  const handleChangeKpiCheckBox = (event: any, role: any, item: any) => {
    const dynamicDataCopy = acDynamicData;

    dynamicDataCopy.map((val: any) => {
      if (val.category_name === item?.category_name) {
        val[`${role}`] = !val[`${role}`];
      }
    });

    setClicked(true);
    setFinalTableBool(true);
    setAcDynamicData(dynamicDataCopy);
  };

  const handleChangeSectionMainCheckBox = (
    event: any,
    role: any,
    item: any
  ) => {
    const dynamicDataCopy = acDynamicData;
    dynamicDataCopy.map((val: any) => {
      val[`${role}`] = event.target.checked;
    });
    setClicked(true);
    setFinalTableBool(true);
    setAcDynamicData(dynamicDataCopy);
  };
  const saveMasterPagePermissions = async (dynamicData: any) => {
    let bodyArray = [];
    for (let i = 0; i < dynamicData.length; i++) {
      for (let l = 0; l < (allRolesData as any)?.length; l++) {
        bodyArray.push({
          role_id: (allRolesData as any)[l].id,
          master_page_id: dynamicData[i].page_id,
          is_active: dynamicData[i][`${(allRolesData as any)[l].name}`],
          created_by: (currentUser as any)?.userId,
          updated_by: (currentUser as any)?.userId,
        });
      }
    }

    const reqBody = {
      rolemaster: bodyArray,
    };

    const response = await saveMasterPermissions({
      body: reqBody,
    });

    if (response) {
      if ((response as any)?.statusCode === 200 || 201) {
      }
      handleOpenModal();
    }
  };

  return (
    <SidebarWithLayout>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        modalextraclass="modal-small text-center"
      >
        <Box>
          <Typography className="text-center" variant="h6">
            Master Page Permissions saved successfully!
          </Typography>
          <ButtonItem
            className="containBtn mt-5 animate__animated animate__fadeIn animate__delay-600ms"
            ButtonTitle="Close"
            type="button"
            onClick={handleCloseModal}
          />
        </Box>
      </Modal>
      {saveLoader ? (
        <Loading className={saveLoader ? "" : "hide"} />
      ) : (
        <Box className="content-wrapper pb-6 h-full relative">
          {/* <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 only-title res-title-height flex flex-wrap justify-between items-center"> */}
            {/* <Box className="flex justify-between items-center sm:block"> */}
              {/* <PanelHeading firstHeading={"Master Page"} /> */}
            {/* </Box> */}
          {/* </Box> */}

          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
            <MasterPageTable
              tableHeader={tableHeader}
              acDynamicData={acDynamicData}
              rolesArray={rolesArray}
              handleChangeKpiCheckBox={handleChangeKpiCheckBox}
              handleChangeSectionMainCheckBox={handleChangeSectionMainCheckBox}
              finalTableBool={finalTableBool}
              setFinalTableBool={setFinalTableBool}
              setClicked={setClicked}
              saveMasterPagePermissions={saveMasterPagePermissions}
            />
          </Box>
        </Box>
      )}
    </SidebarWithLayout>
  );
};
export default MasterPage;
