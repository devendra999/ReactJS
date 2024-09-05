"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
// import ButtonItem from "@root/components/ButtonItem";
// import Modal from "../../components/Modal";
import { PanelHeading } from "@root/components/PanelHeading";
// import SidebarWithLayout from "../layout-with-sidebar";
// import PermissionTable from "../../components/PermissionTable";
import {
  useGetManyBaseRolesControllerRoles,
  useGetManyBaseRoleskpiControllerRolesKpi,
  useKpiControllerBrandWiseKpiListing,
  useRoleskpiControllerPermissionRoleKpi,
} from "@root/backend/backendComponents";
import { getFromLocalStorage } from "@root/utils";
import { useAuthStore } from "@root/store/auth-store";
// import Loading from "@root/components/Loading";

import dynamic from "next/dynamic";

const SidebarWithLayout = dynamic(() => import("../layout-with-sidebar"));
const ButtonItem = dynamic(() => import("@root/components/ButtonItem"));
const Modal = dynamic(() => import("@root/components/Modal"));
const PermissionTable = dynamic(
  () => import("@root/components/PermissionTable")
);
const Loading = dynamic(() => import("@root/components/Loading"));

const Permission: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [expanded, setExpanded] = useState<string | false>("panel1");
  const [tableHeader, setTableHeader] = useState([]);
  const [acDynamicData, setAcDynamicData] = useState([]);
  const [rolesArray, setRolesArray] = useState([]);
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
    data: rolesKpiData,
    // isLoading,
    refetch: getAllRolesKpiData,
  } = useGetManyBaseRoleskpiControllerRolesKpi({}, { enabled: false });
  const {
    data: allKpiData,
    // isLoading: allKpiLoading,
    refetch: getAllKpiData,
  } = useKpiControllerBrandWiseKpiListing(
    { pathParams: { brandId: brandId.brandId } },
    { enabled: false }
  );
  const {
    data: allRolesData,
    // isLoading: rolesLoading,
    refetch: getAllRolesData,
  } = useGetManyBaseRolesControllerRoles({}, { enabled: false });
  const { mutateAsync: savePermissions, isLoading: saveLoader } =
    useRoleskpiControllerPermissionRoleKpi();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    getAllRolesKpiData();
    getAllKpiData();
    getAllRolesData();
  };

  useEffect(() => {
    if (rolesKpiData && allKpiData && allRolesData) {
      let tableHeadersCopy = ["Section"];
      let roles = [];
      for (let i = 0; i < allRolesData?.length; i++) {
        if (allRolesData[i].isSuperAdmin != true) {
          tableHeadersCopy.push(allRolesData[i].name);
          roles.push(allRolesData[i].name);
        }
      }
      setTableHeader(tableHeadersCopy);

      let ac_data = [
        {
          maintitle: "Sales Permission",
          rows: [],
        },
        {
          maintitle: "Service Permission",
          rows: [],
        },
      ];
      const salesResultBySection = {};
      const serviceResultBySection = {};

      for (const entry of allKpiData?.data) {
        if (entry.isDisplay != false) {
          const kpiName = entry.name;
          const kpiCode = entry.code;
          const kpiId = entry.id;
          const kpiSectionName = entry.section.name;
          const kpiSectionSequence = entry.section.orderBy;
          const kpiSequence = entry.sequence;
          const kpiPageCode = entry.master.pageCode;
          let curRolesKpi = (rolesKpiData as any)?.filter(
            (value: any) => value.kpiId === kpiId
          );

          if (curRolesKpi.length === 0) {
            if (kpiPageCode === "sl_dashboard") {
              if (!salesResultBySection[kpiSectionName]) {
                salesResultBySection[kpiSectionName] = {
                  category_name: kpiSectionName,
                  section_sequence: kpiSectionSequence,
                  detailtable: [],
                };

                salesResultBySection[kpiSectionName].detailtable.push({
                  kpiId: kpiId,
                  category_name: kpiName + " - " + kpiCode,
                  kpi_Sequence: kpiSequence,
                  // [`${curRoleName}`]: true,
                });
              } else {
                const insertedKpiIndex = salesResultBySection[
                  kpiSectionName
                ].detailtable.findIndex((val) => {
                  return val.kpiId === kpiId;
                });
                if (insertedKpiIndex !== -1) {
                  salesResultBySection[kpiSectionName].detailtable[
                    insertedKpiIndex
                  ] = {
                    ...salesResultBySection[kpiSectionName].detailtable[
                      insertedKpiIndex
                    ],
                    // [`${curRoleName}`]: true,
                  };
                } else {
                  salesResultBySection[kpiSectionName].detailtable.push({
                    kpiId: kpiId,
                    category_name: kpiName + " - " + kpiCode,
                    kpi_Sequence: kpiSequence,
                    // [`${curRoleName}`]: true,
                  });
                }

                for (
                  let i = 0;
                  i < salesResultBySection[kpiSectionName].detailtable.length;
                  i++
                ) {
                  for (let j = 0; j < roles.length; j++) {
                    if (
                      !salesResultBySection[kpiSectionName].detailtable[i][
                        `${roles[j]}`
                      ]
                    ) {
                      salesResultBySection[kpiSectionName].detailtable[i] = {
                        ...salesResultBySection[kpiSectionName].detailtable[i],
                        [`${roles[j]}`]: false,
                      };
                    }
                  }
                }
              }
            } else if (kpiPageCode === "sr_dashboard") {
              if (!serviceResultBySection[kpiSectionName]) {
                serviceResultBySection[kpiSectionName] = {
                  category_name: kpiSectionName,
                  section_sequence: kpiSectionSequence,
                  detailtable: [],
                };

                serviceResultBySection[kpiSectionName].detailtable.push({
                  kpiId: kpiId,
                  category_name: kpiName + " - " + kpiCode,
                  kpi_Sequence: kpiSequence,
                  // [`${curRoleName}`]: true,
                });
              } else {
                const insertedKpiIndex = serviceResultBySection[
                  kpiSectionName
                ].detailtable.findIndex((val) => {
                  return val.kpiId === kpiId;
                });
                if (insertedKpiIndex !== -1) {
                  serviceResultBySection[kpiSectionName].detailtable[
                    insertedKpiIndex
                  ] = {
                    ...serviceResultBySection[kpiSectionName].detailtable[
                      insertedKpiIndex
                    ],
                    // [`${curRoleName}`]: true,
                  };
                } else {
                  serviceResultBySection[kpiSectionName].detailtable.push({
                    kpiId: kpiId,
                    category_name: kpiName + " - " + kpiCode,
                    kpi_Sequence: kpiSequence,
                    // [`${curRoleName}`]: true,
                  });
                }
              }

              for (
                let i = 0;
                i < serviceResultBySection[kpiSectionName].detailtable.length;
                i++
              ) {
                for (let j = 0; j < roles.length; j++) {
                  if (
                    !serviceResultBySection[kpiSectionName].detailtable[i][
                      `${roles[j]}`
                    ]
                  ) {
                    serviceResultBySection[kpiSectionName].detailtable[i] = {
                      ...serviceResultBySection[kpiSectionName].detailtable[i],
                      [`${roles[j]}`]: false,
                    };
                  }
                }
              }
            }
          } else {
            for (let i = 0; i < curRolesKpi?.length; i++) {
              const curRoleName = allRolesData?.find(
                (value) => value.id === curRolesKpi[i].roleId
              )?.name;

              if (kpiPageCode === "sl_dashboard") {
                if (!salesResultBySection[kpiSectionName]) {
                  salesResultBySection[kpiSectionName] = {
                    category_name: kpiSectionName,
                    section_sequence: kpiSectionSequence,
                    detailtable: [],
                  };

                  salesResultBySection[kpiSectionName].detailtable.push({
                    kpiId: kpiId,
                    category_name: kpiName + " - " + kpiCode,
                    kpi_Sequence: kpiSequence,
                    [`${curRoleName}`]: true,
                  });
                } else {
                  const insertedKpiIndex = salesResultBySection[
                    kpiSectionName
                  ].detailtable.findIndex((val) => {
                    return val.kpiId === kpiId;
                  });
                  if (insertedKpiIndex !== -1) {
                    salesResultBySection[kpiSectionName].detailtable[
                      insertedKpiIndex
                    ] = {
                      ...salesResultBySection[kpiSectionName].detailtable[
                        insertedKpiIndex
                      ],
                      [`${curRoleName}`]: true,
                    };
                  } else {
                    salesResultBySection[kpiSectionName].detailtable.push({
                      kpiId: kpiId,
                      kpi_Sequence: kpiSequence,
                      category_name: kpiName + " - " + kpiCode,
                      [`${curRoleName}`]: true,
                    });
                  }
                }

                for (
                  let i = 0;
                  i < salesResultBySection[kpiSectionName].detailtable.length;
                  i++
                ) {
                  for (let j = 0; j < roles.length; j++) {
                    if (
                      !salesResultBySection[kpiSectionName].detailtable[i][
                        `${roles[j]}`
                      ]
                    ) {
                      salesResultBySection[kpiSectionName].detailtable[i] = {
                        ...salesResultBySection[kpiSectionName].detailtable[i],
                        [`${roles[j]}`]: false,
                      };
                    }
                  }
                }
              } else if (kpiPageCode === "sr_dashboard") {
                if (!serviceResultBySection[kpiSectionName]) {
                  serviceResultBySection[kpiSectionName] = {
                    category_name: kpiSectionName,
                    section_sequence: kpiSectionSequence,
                    detailtable: [],
                  };

                  serviceResultBySection[kpiSectionName].detailtable.push({
                    kpiId: kpiId,
                    category_name: kpiName + " - " + kpiCode,
                    kpi_Sequence: kpiSequence,
                    [`${curRoleName}`]: true,
                  });
                } else {
                  const insertedKpiIndex = serviceResultBySection[
                    kpiSectionName
                  ].detailtable.findIndex((val) => {
                    return val.kpiId === kpiId;
                  });
                  if (insertedKpiIndex !== -1) {
                    serviceResultBySection[kpiSectionName].detailtable[
                      insertedKpiIndex
                    ] = {
                      ...serviceResultBySection[kpiSectionName].detailtable[
                        insertedKpiIndex
                      ],
                      [`${curRoleName}`]: true,
                    };
                  } else {
                    serviceResultBySection[kpiSectionName].detailtable.push({
                      kpiId: kpiId,
                      category_name: kpiName + " - " + kpiCode,
                      kpi_Sequence: kpiSequence,
                      [`${curRoleName}`]: true,
                    });
                  }
                }

                for (
                  let i = 0;
                  i < serviceResultBySection[kpiSectionName].detailtable.length;
                  i++
                ) {
                  for (let j = 0; j < roles.length; j++) {
                    if (
                      !serviceResultBySection[kpiSectionName].detailtable[i][
                        `${roles[j]}`
                      ]
                    ) {
                      serviceResultBySection[kpiSectionName].detailtable[i] = {
                        ...serviceResultBySection[kpiSectionName].detailtable[
                          i
                        ],
                        [`${roles[j]}`]: false,
                      };
                    }
                  }
                }
              }
            }
          }
        }
      }
      // Convert the result object into an array of sections
      const serviceSectionsArray = Object.values(serviceResultBySection);
      const salesSectionsArray = Object.values(salesResultBySection);

      for (let i = 0; i < salesSectionsArray.length; i++) {
        salesSectionsArray[i].detailtable.sort(
          (a, b) => a.kpi_Sequence - b.kpi_Sequence
        );
      }
      for (let i = 0; i < serviceSectionsArray.length; i++) {
        serviceSectionsArray[i].detailtable.sort(
          (a, b) => a.kpi_Sequence - b.kpi_Sequence
        );
      }
      salesSectionsArray.sort(
        (a, b) => a.section_sequence - b.section_sequence
      );
      // salesSectionsArray.sort( (arr) => arr.sort((a,b) => a.kpi_Sequence - b.kpi_Sequence))
      serviceSectionsArray.sort(
        (a, b) => a.section_sequence - b.section_sequence
      );

      ac_data[0].rows = salesSectionsArray;
      ac_data[1].rows = serviceSectionsArray;

      setAcDynamicData(ac_data);
      setRolesArray(roles);
    }
  }, [rolesKpiData, allKpiData, allRolesData]);

  const handleChangeKpiCheckBox = (event, row, role, item, rows) => {
    const sectionKpis = row.detailtable;
    const dynamicDataCopy = acDynamicData;
    if (row.hasOwnProperty(role)) {
      dynamicDataCopy
        ?.find((val) => val.maintitle === item?.maintitle)
        .rows.find((val) => val.category_name === rows.category_name)
        .detailtable.map(
          (detail) =>
            detail.kpiId === row.kpiId &&
            (detail[`${role}`] = !detail[`${role}`])
        );
    }
    setClicked(true);
    setFinalTableBool(true);
    setAcDynamicData(dynamicDataCopy);
  };

  const handleChangeSectionCheckBox = (event, row, role, item) => {
    const sectionKpis = row.detailtable;
    const dynamicDataCopy = acDynamicData;

    for (const key of sectionKpis) {
      if (key.hasOwnProperty(role)) {
        dynamicDataCopy
          ?.find((val) => val.maintitle === item?.maintitle)
          .rows.find((val) => val.category_name === row.category_name)
          .detailtable.map(
            (detail) => (detail[`${role}`] = event.target.checked)
          );
      }
    }
    setClicked(true);
    setFinalTableBool(true);
    setAcDynamicData(dynamicDataCopy);
  };

  const handleChangeSectionMainCheckBox = (
    event: any,
    row: any,
    role: any,
    item: any
  ) => {
    const dynamicDataCopy = acDynamicData;

    dynamicDataCopy
      ?.find((val) => val.maintitle === item?.maintitle)
      .rows.map((val) =>
        val.detailtable.map(
          (detail) => (detail[`${row}`] = event.target.checked)
        )
      );

    setClicked(true);
    setFinalTableBool(true);
    setAcDynamicData(dynamicDataCopy);
  };

  const saveKpiPermissions = async (dynamicData, maintitle) => {
    const selectedData = dynamicData.find((val) => val.maintitle === maintitle);

    let bodyArray = [];

    // for(let i = 0 ; i < dynamicData.length; i++){
    for (let j = 0; j < selectedData.rows.length; j++) {
      for (let k = 0; k < selectedData.rows[j].detailtable.length; k++) {
        for (let l = 0; l < allRolesData?.length; l++) {
          bodyArray.push({
            kpi_id: selectedData.rows[j].detailtable[k].kpiId,
            role_id: allRolesData[l].id,
            is_active:
              selectedData.rows[j].detailtable[k][`${allRolesData[l].name}`],
            created_by: currentUser?.userId,
            updated_by: currentUser?.userId,
          });
        }
      }
    }
    // }

    const reqBody = {
      rolekpi: bodyArray,
    };

    const response = await savePermissions({
      body: reqBody,
    });

    if (response) {
      if (response.statusCode === 200 || 201) {
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
            Permissions saved successfully!
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
        <Loading className={`${saveLoader ? "" : "hide"} `} />
      ) : (
        <Box className="content-wrapper pb-6 h-full relative">
          {/* <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 res-title-height flex flex-wrap justify-between items-center"> */}
            {/* <Box className="flex justify-between items-center sm:block"> */}
              {/* <PanelHeading firstHeading={"Permission"} /> */}
            {/* </Box> */}
          {/* </Box> */}

          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 permission-scroll-item">
            <PermissionTable
              tableHeader={tableHeader}
              acDynamicData={acDynamicData}
              rolesArray={rolesArray}
              handleChangeKpiCheckBox={handleChangeKpiCheckBox}
              handleChangeSectionCheckBox={handleChangeSectionCheckBox}
              handleChangeSectionMainCheckBox={handleChangeSectionMainCheckBox}
              finalTableBool={finalTableBool}
              setFinalTableBool={setFinalTableBool}
              clicked={clicked}
              setClicked={setClicked}
              saveKpiPermissions={saveKpiPermissions}
            />
          </Box>
        </Box>
      )}
    </SidebarWithLayout>
  );
};
export default Permission;
