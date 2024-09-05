"use client";
import React, { useState, useEffect } from "react";
import SidebarWithLayout from "../layout-with-sidebar";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import ButtonItem from "@root/components/ButtonItem";
import {
  useKpiBenchmarkControllerBrandWiseFilterModel,
  useKpiControllerBrandBenchmarkWiseKpiListing,
  useKpiControllerBrandWiseKpiListing,
  useBranchControllerFilterBranch,
  useKpiBenchmarkControllerPermissionRoleKpi,
} from "@root/backend/backendComponents";
import BenchMarkTable from "@root/components/BenchMarkTable";
import Modal from "../../components/Modal";
import Loading from "@root/components/Loading";
import { useSelector } from "react-redux";
import { reInitialStates } from "@root/utils/globalFunction";

const BenchMarkData = () => {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState<any>(thisYear);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [text, setText] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [location, setLocation] = useState<any>("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [acDynamicData, setAcDynamicData] = useState([]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { mutateAsync: saveBenchmark, isLoading: saveLoader } =
    useKpiBenchmarkControllerPermissionRoleKpi();

  const { data: benchmarkKpiData, refetch: getAllBenchmarkKpiData } =
    useKpiBenchmarkControllerBrandWiseFilterModel(
      {
        queryParams: { year: year, branch_id: location },
      },
      { enabled: false }
    );

  const { data: allKpiData, refetch: getAllKpiData } =
  useKpiControllerBrandBenchmarkWiseKpiListing(
      {
        pathParams: {
          brandId: _globalFilter && _globalFilter?.global_filter?.p_brand_id,
        },
      },
      { enabled: false }
    );

  const { data: locationData, refetch: fetchLocation } =
    useBranchControllerFilterBranch(
      {
        queryParams: _globalFilter && {
          user_id: _globalFilter?.global_filter?.p_user_id,
          brand_id: _globalFilter?.global_filter?.p_brand_id,
        },
      },

      {
        enabled: false,
      }
    );

  const fetchAllData = () => {
    getAllKpiData();
    getAllBenchmarkKpiData();
    fetchLocation();
  };

  useEffect(() => {
    reInitialStates();
  }, []);

  useEffect(() => {
    if (_globalFilter.global_filter.p_brand_id != 0) {
      fetchAllData();
    }
  }, [_globalFilter.global_filter.p_brand_id]);

  useEffect(() => {
    if (year && location) {
      getAllBenchmarkKpiData();
      getAllKpiData();
    }
  }, [year, location]);

  useEffect(() => {
    if (isSuccess) {
      getAllBenchmarkKpiData();
      getAllKpiData();
    }
    setIsSuccess(false);
  }, [isSuccess]);

  useEffect(() => {
    const locationList = (locationData as any)?.data;
    if (locationList) {
      const locationOptionsValue = (locationList as any)?.map(
        (location: any) => ({
          label: location.name,
          value: location.id,
        })
      );
      setLocationOptions(locationOptionsValue);
    }
  }, [locationData]);

  const columns = [
    "Section",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (allKpiData && columns && benchmarkKpiData) {
      let benchmark: any = [];
      let ac_data = [
        {
          maintitle: "Sales Target",
          rows: [],
        },
        {
          maintitle: "Service Target",
          rows: [],
        },
      ];
      const salesResultBySection = {};
      const serviceResultBySection = {};
      for (const entry of (allKpiData as any)?.data) {
        if (
          entry.isDisplay != false &&
          entry.operator !== "diff_tat" &&
          entry.operator !== "diff" 
        ) {       
          const kpiName = entry.name;
          const kpiCode = entry.code;
          const displayName = entry.display_column;
          const kpiId = entry.id;
          const kpiSectionName = entry.section.name;
          const kpiSectionSequence = entry.section.orderBy;
          const kpiSequence = entry.sequence;
          const kpiPageCode = entry.master.pageCode;
          const masterValue = entry.master_value;
          const kpiTypeId = entry.kpiTypeId
          

          // let curBenchmarkKpi = (benchmarkKpiData?.data as any)?.filter(
          //   (value: any) => value.kpiId === kpiId
          // );

          let curBenchmarkKpi = Array.isArray(benchmarkKpiData?.data)
            ? benchmarkKpiData?.data.filter(
                (value: any) => kpiTypeId !== 4 ?  value.kpiId === kpiId :  value.kpiId === kpiId && value.kpiName === masterValue
              )
            : [];

          if (curBenchmarkKpi?.length === 0) {
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
                  categories_name : kpiName,
                  display_name: kpiTypeId === 4 ? masterValue : displayName,
                  master_value: masterValue,
                  kpi_Sequence: kpiSequence,
                  kpi_type_id: kpiTypeId
                  // [`${curRoleName}`]: true,
                });
              } else {
                const insertedKpiIndex = salesResultBySection[
                  kpiSectionName
                ].detailtable.findIndex((val) => {
                  return val.kpiId === kpiId && val.master_value === masterValue; ;
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
                    categories_name : kpiName,
                    display_name: kpiTypeId === 4 ? masterValue : displayName,
                    master_value: masterValue,
                    kpi_Sequence: kpiSequence,
                    kpi_type_id: kpiTypeId
                    // [`${curRoleName}`]: true,
                  });
                }

                for (
                  let i = 0;
                  i < salesResultBySection[kpiSectionName].detailtable.length;
                  i++
                ) {
                  for (let j = 0; j < benchmark.length; j++) {
                    if (
                      !salesResultBySection[kpiSectionName].detailtable[i][
                        `${benchmark[j]}`
                      ]
                    ) {
                      salesResultBySection[kpiSectionName].detailtable[i] = {
                        ...salesResultBySection[kpiSectionName].detailtable[i],
                        [`${benchmark[j]}`]: false,
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
                  categories_name : kpiName,
                  display_name: kpiTypeId === 4 ? masterValue : displayName,
                  master_value: masterValue,
                  kpi_Sequence: kpiSequence,
                  kpi_type_id: kpiTypeId
                  // [`${curRoleName}`]: true,
                });
              } else {
                const insertedKpiIndex = serviceResultBySection[
                  kpiSectionName
                ].detailtable.findIndex((val) => {
                  
                  return val.kpiId === kpiId && val.master_value === masterValue;;
                });
                console.log(insertedKpiIndex, "---------------insertedKpiIndex----");
                
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
                    categories_name : kpiName,
                    display_name: kpiTypeId === 4 ? masterValue : displayName,
                    master_value: masterValue,
                    kpi_Sequence: kpiSequence,
                    kpi_type_id: kpiTypeId
                    // [`${curRoleName}`]: true,
                  });
                }
              }

              for (
                let i = 0;
                i < serviceResultBySection[kpiSectionName].detailtable.length;
                i++
              ) {
                for (let j = 0; j < benchmark.length; j++) {
                  if (
                    !serviceResultBySection[kpiSectionName].detailtable[i][
                      `${benchmark[j]}`
                    ]
                  ) {
                    serviceResultBySection[kpiSectionName].detailtable[i] = {
                      ...serviceResultBySection[kpiSectionName].detailtable[i],
                      [`${benchmark[j]}`]: false,
                    };
                  }
                }
              }
            }
          } else if (curBenchmarkKpi == undefined) {
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
                  categories_name : kpiName,
                  display_name: kpiTypeId === 4 ? masterValue : displayName,
                  master_value: masterValue,
                  kpi_Sequence: kpiSequence,
                  kpi_type_id: kpiTypeId
                  // [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                });
              } else {
                const insertedKpiIndex = salesResultBySection[
                  kpiSectionName
                ].detailtable.findIndex((val) => {
                  return val.kpiId === kpiId && val.master_value === masterValue;;
                });
                if (insertedKpiIndex !== -1) {
                  salesResultBySection[kpiSectionName].detailtable[
                    insertedKpiIndex
                  ] = {
                    ...salesResultBySection[kpiSectionName].detailtable[
                      insertedKpiIndex
                    ],
                    // [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                  };
                } else {
                  salesResultBySection[kpiSectionName].detailtable.push({
                    kpiId: kpiId,
                    kpi_Sequence: kpiSequence,
                    categories_name : kpiName,
                    display_name: kpiTypeId === 4 ? masterValue : displayName,
                    master_value: masterValue,
                    category_name: kpiName + " - " + kpiCode,
                    kpi_type_id: kpiTypeId
                    // [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                  });
                }
              }

              for (
                let i = 0;
                i < salesResultBySection[kpiSectionName].detailtable.length;
                i++
              ) {
                for (let j = 0; j < benchmark.length; j++) {
                  if (
                    !salesResultBySection[kpiSectionName].detailtable[i][
                      `${benchmark[j]}`
                    ]
                  ) {
                    salesResultBySection[kpiSectionName].detailtable[i] = {
                      ...salesResultBySection[kpiSectionName].detailtable[i],
                      [`${benchmark[j]}`]: false,
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
                  categories_name : kpiName,
                  display_name: kpiTypeId === 4 ? masterValue : displayName,
                  master_value: masterValue,
                  kpi_Sequence: kpiSequence,
                  kpi_type_id: kpiTypeId
                  // [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                });
              } else {
                const insertedKpiIndex = serviceResultBySection[
                  kpiSectionName
                ].detailtable.findIndex((val) => {
                  
                  return val.kpiId === kpiId && val.master_value === masterValue;;
                });
                if (insertedKpiIndex !== -1) {
                  serviceResultBySection[kpiSectionName].detailtable[
                    insertedKpiIndex
                  ] = {
                    ...serviceResultBySection[kpiSectionName].detailtable[
                      insertedKpiIndex
                    ],
                    // [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                  };
                } else {
                  serviceResultBySection[kpiSectionName].detailtable.push({
                    kpiId: kpiId,
                    category_name: kpiName + " - " + kpiCode,
                    categories_name : kpiName,
                    display_name: kpiTypeId === 4 ? masterValue : displayName,
                    master_value: masterValue,
                    kpi_Sequence: kpiSequence,
                    kpi_type_id: kpiTypeId,
                    // [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                  });
                }
              }

              for (
                let i = 0;
                i < serviceResultBySection[kpiSectionName].detailtable.length;
                i++
              ) {
                for (let j = 0; j < benchmark.length; j++) {
                  if (
                    !serviceResultBySection[kpiSectionName].detailtable[i][
                      `${benchmark[j]}`
                    ]
                  ) {
                    serviceResultBySection[kpiSectionName].detailtable[i] = {
                      ...serviceResultBySection[kpiSectionName].detailtable[i],
                      [`${benchmark[j]}`]: false,
                    };
                  }
                }
              }
            }
          } else {
            for (let i = 0; i < curBenchmarkKpi?.length; i++) {
              const curRoleName = columns.find(
                (value, index) => index === curBenchmarkKpi[i].month
              );

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
                    categories_name : kpiName,
                    display_name: kpiTypeId === 4 ? masterValue : displayName,
                    master_value: masterValue,
                    kpi_Sequence: kpiSequence,
                    kpi_type_id: kpiTypeId,
                    [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                    // [`${curRoleName}`]: curBenchmarkKpi.find(item => item.kpiId === kpiId && item.kpiName === masterValue)?.kpiValue,
                  });
                } else {
                  const insertedKpiIndex = salesResultBySection[
                    kpiSectionName
                  ].detailtable.findIndex((val) => {
                    return val.kpiId === kpiId && val.master_value === masterValue;;
                  });
                  if (insertedKpiIndex !== -1) {         
                    salesResultBySection[kpiSectionName].detailtable[
                      insertedKpiIndex
                    ] = {
                      ...salesResultBySection[kpiSectionName].detailtable[
                        insertedKpiIndex
                      ],
                      // [`${curRoleName}`]: curBenchmarkKpi.find(item => item.kpiId === kpiId && item.kpiName === masterValue  )?.kpiValue,
                      [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                    };
                  } else {
                    salesResultBySection[kpiSectionName].detailtable.push({
                      kpiId: kpiId,
                      kpi_Sequence: kpiSequence,
                      display_name: kpiTypeId === 4 ? masterValue : displayName,
                      master_value: masterValue,
                      categories_name : kpiName,
                      category_name: kpiName + " - " + kpiCode,
                      kpi_type_id: kpiTypeId,
                      // [`${curRoleName}`]: curBenchmarkKpi.find(item => item.kpiId === kpiId && item.kpiName === masterValue)?.kpiValue,
                      [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                    });
                  }
                }

                console.log(salesResultBySection, "-------------sales Result by section ------00000000---");
                
                

                for (
                  let i = 0;
                  i < salesResultBySection[kpiSectionName].detailtable.length;
                  i++
                ) {
                  for (let j = 0; j < benchmark.length; j++) {
                    if (
                      !salesResultBySection[kpiSectionName].detailtable[i][
                        `${benchmark[j]}`
                      ]
                    ) {
                      salesResultBySection[kpiSectionName].detailtable[i] = {
                        ...salesResultBySection[kpiSectionName].detailtable[i],
                        [`${benchmark[j]}`]: false,
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
                    categories_name : kpiName,
                    display_name: kpiTypeId === 4 ? masterValue : displayName,
                    master_value: masterValue,
                    kpi_Sequence: kpiSequence,
                    kpi_type_id: kpiTypeId,
                    // [`${curRoleName}`]: curBenchmarkKpi.find(item => item.kpiId === kpiId && item.kpiName === masterValue)?.kpiValue,
                    [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                  });
                  // console.log(serviceResultBySection, "-------------service Result by sectui");
                  
                } else {
                  const insertedKpiIndex = serviceResultBySection[
                    kpiSectionName
                  ].detailtable.findIndex((val) => {
                    return val.kpiId === kpiId && val.master_value === masterValue;;
                  });
                  if (insertedKpiIndex !== -1) {
                    
                    serviceResultBySection[kpiSectionName].detailtable[
                      insertedKpiIndex
                    ] = {
                      ...serviceResultBySection[kpiSectionName].detailtable[
                        insertedKpiIndex
                      ],
                      // [`${curRoleName}`]: curBenchmarkKpi.find(item => item.kpiId === kpiId && item.kpiName === masterValue)?.kpiValue,
                      [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                    };
                  } else {
                    serviceResultBySection[kpiSectionName].detailtable.push({
                      kpiId: kpiId,
                      category_name: kpiName + " - " + kpiCode,
                      categories_name : kpiName,
                      display_name: kpiTypeId === 4 ? masterValue : displayName,
                      master_value: masterValue,
                      kpi_Sequence: kpiSequence,
                      kpi_type_id: kpiTypeId,
                      // [`${curRoleName}`]: curBenchmarkKpi.find(item => item.kpiId === kpiId && item.kpiName === masterValue)?.kpiValue,
                      [`${curRoleName}`]: curBenchmarkKpi[i]?.kpiValue,
                    });
                  }
                }

                for (
                  let i = 0;
                  i < serviceResultBySection[kpiSectionName].detailtable.length;
                  i++
                ) {
                  for (let j = 0; j < benchmark.length; j++) {
                    if (
                      !serviceResultBySection[kpiSectionName].detailtable[i][
                        `${benchmark[j]}`
                      ]
                    ) {
                      serviceResultBySection[kpiSectionName].detailtable[i] = {
                        ...serviceResultBySection[kpiSectionName].detailtable[
                          i
                        ],
                        [`${benchmark[j]}`]: false,
                      };
                    }
                  }
                }
              }
            }
          }
        }
      }

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
    }
  }, [allKpiData, benchmarkKpiData]);

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  const handleChangeLocation = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };

  const saveBenchmarkData = async (benchmark: any, param: boolean) => {
    setText(param);
    if (!location || !year) {
      setIsModalOpen(true);
      setInfoMsg("Branch Option is required");
      return;
    }

    const requestBody: {
      branch_id: any;
      year: any;
      benchmark: any;
    } = {
      branch_id: location,
      year: year,
      benchmark: benchmark,
    };

    try {
      const benchmarkResponse: any = await saveBenchmark({
        body: requestBody,
      });

      if (benchmarkResponse) {
        if (
          benchmarkResponse.statusCode === 200 ||
          benchmarkResponse.statusCode === 201
        ) {
          setIsSuccess(true);
          setIsModalOpen(true);
          setInfoMsg("Benchmark saved successfully");
          benchmark([]);
        } else if (benchmarkResponse.statusCode === 400) {
          setIsModalOpen(true);
          setInfoMsg("Benchmark not saved successfully");
        }
      }
    } catch (error) {
      console.error("Error saving benchmark:", error);
      // Handle error as needed
    }
  };

  const numPreviousYears = 10;
  const numNextYears = 5;

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
            {infoMsg}
          </Typography>
          <ButtonItem
            className="containBtn mt-5"
            ButtonTitle="Close"
            type="button"
            onClick={handleCloseModal}
          />
        </Box>
      </Modal>
      {saveLoader ? (
        <Loading className={`${saveLoader ? "" : "hide"} `} />
      ) : (
        <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
          <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4  rm-space-icon-responsive">
            <Box className="title-component-select">
              <Typography component="h2" className="title-main text-darkblue flex flex-wrap items-center pl-10">
                Benchmark Year -
              </Typography>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: "300px", // Set your desired max height here
                        overflowY: "auto", // Add scrolling if content exceeds maxHeight
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Year
                  </MenuItem>

                  {[...Array(numNextYears).keys()].reverse().map((j) => {
                    const nextYear = thisYear + j + 1;
                    return (
                      <MenuItem key={nextYear} value={nextYear}>
                        {nextYear}
                      </MenuItem>
                    );
                  })}
                  <MenuItem value={thisYear}>{thisYear}</MenuItem>
                  {[...Array(numPreviousYears).keys()].map((i) => {
                    const previousYear = thisYear - i - 1;
                    return (
                      <MenuItem key={previousYear} value={previousYear}>
                        {previousYear}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl>
                <Select
                  labelId="location-label"
                  id="location"
                  value={location}
                  onChange={handleChangeLocation}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: "300px", // Set your desired max height here
                        overflowY: "auto", // Add scrolling if content exceeds maxHeight
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Branch
                  </MenuItem>

                  {locationOptions?.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Divider />
          </Box>

          <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 data-table-bm">
            <Box className="dashboard-sales-items main-view ">
              <BenchMarkTable
                acDynamicData={acDynamicData}
                locationData={location}
                year={year}
                saveBenchmarkData={saveBenchmarkData}
                text={text}
                setText={setText}
              />
            </Box>
          </Box>
        </Box>
      )}
    </SidebarWithLayout>
  );
};

export default BenchMarkData;
