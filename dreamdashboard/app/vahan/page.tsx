"use client"; // Add this line at the top

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const SidebarWithLayout = dynamic(() => import("../layout-with-sidebar"));
import YearWiseChart from "@root/components/charts/vahan/YearWiseChart";
import MakerwiseChart from "@root/components/charts/vahan/MakerwiseChart";
import StatewiseChart from "@root/components/charts/vahan/StatewiseChart";
import PieChart from "@root/components/charts/vahan/PieChart";
import { PanelHeading } from "@root/components/PanelHeading";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { reInitialStates } from "@root/utils/globalFunction";
import axios from "axios";
import ModalDataDump from "@root/components/ModalDataDump";
import VahanTable from "@root/components/tables/VahanTable";
import MapChart from "@root/components/charts/vahan/MapChart";
import HistoricChart from "@root/components/charts/vahan/HistoricChart";
import IndiaMap from "@root/components/charts/vahan/IndiaMap";
import { updateGlobalFilterKey } from "../layout";
import Modal from "@root/components/Modal";
import ButtonItem from "@root/components/ButtonItem";
import InfoIcon from "@mui/icons-material/Info";

export default function Vahan() {
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const [loading, setLoading] = useState(true);
  const [yearWiseData, setYearWiseData] = useState([]);
  const [makerWiseData, setMakerWiseData] = useState([]);
  const [stateWiseData, setStateWiseData] = useState([]);
  const [selectedData, setSelectedData] = useState(false);
  const [modalDataDump, setModalDataDump] = useState(false);
  const [historicAllIndiaRetailWiseData, sethistoricAllIndiaRetailWiseData] =
    useState([]);

  const [premiumCategoryData, setPremiumCategoryData] = useState([]);
  const [luxuriusCategoryData, setLuxuriusCategoryData] = useState([]);
  const [massCategoryData, setMassCategoryData] = useState([]);

  const [northData, setNorthData] = useState([]);
  const [southData, setSouthData] = useState([]);
  const [eastData, setEastData] = useState([]);
  const [westData, setWestData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryParams = _globalFilter && {
    p_start_date: _globalFilter.vahan_filter.p_start_date,
    p_end_date: _globalFilter.vahan_filter.p_end_date,
    p_state_id: _globalFilter.vahan_filter.p_state_id
      ? `ARRAY[${_globalFilter.vahan_filter.p_state_id
          .map((obj: any) => obj.value + "::smallint")
          .join(",")}]`
      : null,
    p_city_id: _globalFilter.vahan_filter.p_city_id
      ? `ARRAY[${_globalFilter.vahan_filter.p_city_id
          .map((obj: any) => obj.value)
          .join(",")}]`
      : null,
    p_rto_id: _globalFilter.vahan_filter.p_rto_id
      ? `ARRAY[${_globalFilter.vahan_filter.p_rto_id
          .map((obj: any) => obj.value)
          .join(",")}]`
      : null,
    p_maker_id: _globalFilter.vahan_filter.p_maker_id
      ? `ARRAY[${_globalFilter.vahan_filter.p_maker_id
          .map((obj: any) => obj.value)
          .join(",")}]`
      : null,
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        process.env.NEXT_PUBLIC_API_DEV_BASE_URL +
        `/vahan/graph/details?p_start_date=${queryParams.p_start_date}&p_end_date=${queryParams.p_end_date}&p_state_id=${queryParams.p_state_id}&p_city_id=${queryParams.p_city_id}&p_rto_id=${queryParams.p_rto_id}&p_maker_id=${queryParams.p_maker_id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        setYearWiseData(response?.data?.data[0]?.return_date);
        setStateWiseData(response?.data?.data[0]?.return_state);
        setMakerWiseData(response?.data?.data[0]?.return_maker);
        // Filter the data based on category
        const premiumData = response?.data?.data[0]?.return_maker?.filter(
          (item: any) => item.category === 1
        );
        const luxuriusData = response?.data?.data[0]?.return_maker?.filter(
          (item: any) => item.category === 2
        );
        const massData = response?.data?.data[0]?.return_maker?.filter(
          (item: any) => item.category === 3
        );

        const _northData = response?.data?.data[0]?.return_state?.filter(
          (item: any) => item.region === 1
        );
        const _southData = response?.data?.data[0]?.return_state?.filter(
          (item: any) => item.region === 2
        );
        const _eastData = response?.data?.data[0]?.return_state?.filter(
          (item: any) => item.region === 3
        );
        const _westData = response?.data?.data[0]?.return_state?.filter(
          (item: any) => item.region === 4
        );

        setPremiumCategoryData(premiumData);
        setLuxuriusCategoryData(luxuriusData);
        setMassCategoryData(massData);

        setNorthData(_northData);
        setSouthData(_southData);
        setEastData(_eastData);
        setWestData(_westData);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [_globalFilter]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        process.env.NEXT_PUBLIC_API_DEV_BASE_URL +
        `/vahan/graph/details?p_start_date=${"2001-01-01"}&p_end_date=${
          new Date().getFullYear() + "-12-31"
        }&p_state_id=${null}&p_maker_id=${null}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        sethistoricAllIndiaRetailWiseData(response?.data?.data[0]?.return_date);
      })
      .catch((error) => {
        // console.log(error);
      });

    if (
      _globalFilter?.vahan_filter?.p_state_id !== null ||
      _globalFilter?.vahan_filter?.p_city_id !== null ||
      _globalFilter?.vahan_filter?.p_rto_id !== null
    ) {
      scrollToSection();
    }
  }, [_globalFilter]);

  useEffect(() => {
    reInitialStates();
    updateGlobalFilterKey(
      "vahan_filter.p_start_date",
      new Date().getFullYear() + "-01-01"
    );
    updateGlobalFilterKey(
      "vahan_filter.p_end_date",
      new Date().getFullYear() + "-12-31"
    );
    updateGlobalFilterKey(
      "global_filter.formatted_date",
      "Year " + new Date().getFullYear()
    );
  }, []);

  const handleDataDumpPopup = (isOpen: boolean, selectedValue: any) => {
    setSelectedData(selectedValue);
    setModalDataDump(isOpen);
  };

  const scrollToSection = () => {
    const section = document.getElementById("allIndiaRetail");
    if (section) {
      const offsetPosition = section.offsetTop - 100; // Adjust the offset as needed
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    reInitialStates();
    return () => {
      let tooltip = document.querySelector(".jvectormap-tip");
      if (tooltip) {
        tooltip.remove();
      }
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
  const handleInfoNotes = () => {
    setIsModalOpen(true);
  };
 
  const features = [
    {
      title: "Comprehensive Vehicle Registration Insights",
      description:
        "Analyze both historical and current vehicle registration data segmented by Vehicle Category, including 2-Wheelers, 3-Wheelers, and Commercial Vehicles.",
    },
    {
      title: "Market Share Visualization",
      description:
        "Seamlessly visualize your brand's market share directly on the Vahan Dashboard, offering a clear view of your standing in the industry.",
    },
    {
      title: "Fuel Type Analysis",
      description:
        "Dive deep into vehicle registration trends by Fuel Type—Petrol, Diesel, CNG, and more—providing valuable insights into shifting consumer preferences.",
    },
    {
      title: "Auto Market Share Comparison",
      description:
        "Effortlessly compare your market share against competitors and within your own brand portfolio, empowering data-driven decision-making.",
    },
    {
      title: "Automotive Timeline",
      description:
        "Explore the evolution of the automotive market with our Timeline feature, allowing you to navigate through key historical events and market reactions.",
    },
    {
      title: "Advanced Filters for Enhanced Search",
      description:
        "Utilize Custom and User Filters on the Vahan platform for intuitive and efficient data filtering and searching, tailored to your specific needs.",
    },
  ];


  return (
    <SidebarWithLayout>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 compare-header rm-space-icon-responsive filt-comp res-title-height">
          <PanelHeading
            firstHeading={"Vahan - "}
            secondHeading={_globalFilter.formatted_date}
            filterOption={true}
          />
        </Box>

        {handleDataDumpPopup && (
          <ModalDataDump
            isOpen={modalDataDump}
            selectedValue={selectedData}
            handleDataDumpPopup={handleDataDumpPopup}
          />
        )}

<Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          modalextraclass="modal-small"
        >
          <Box className="modal-main-data">
            <Typography
              variant="h6"
              className="note-description text-center font-semibold"
            >
              Coming Soon to Your Dashboard
            </Typography>
 
            <Box className='listing-points-soon mt-4 sm:mt-2'>
              <List>
                {features?.map((feature, index) => (
                  <ListItem
                    key={index}
                    sx={{ padding: 1 }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        component="div"
                        className=" text-sm  font-semibold"
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" className=" text-xs">
                        {feature.description}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
 
            <Box>
              <Box className="w-100 flex justify-center mt-3 md:mt-2">
                <ButtonItem
                  className="outlineBtn mx-1"
                  ButtonTitle="Close"
                  type="button"
                  onClick={handleCloseModal}
                />
              </Box>
            </Box>
          </Box>
        </Modal>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4 fit-content compare-page-main vahan-page">
        <Box className="flex  justify-end mb-3 mt-1 icon-button-oneline">
            <ButtonItem
              startIcon={<InfoIcon />}
              ButtonTitle="Coming Soon"
              onClick={handleInfoNotes}
            />
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <HistoricChart
                data={historicAllIndiaRetailWiseData}
                loader={loading}
                handleDataDumpPopup={handleDataDumpPopup}
                chartTitle={"Historic All India Retail"}
              />
            </Grid>
            <Grid item xs={12} id="allIndiaRetail">
              <YearWiseChart
                data={yearWiseData}
                loader={loading}
                chartTitle={"All India Retail"}
                handleDataDumpPopup={handleDataDumpPopup}
              />
            </Grid>
            <Grid item xs={12}>
              <MakerwiseChart
                data={makerWiseData}
                loader={loading}
                handleDataDumpPopup={handleDataDumpPopup}
              />
            </Grid>
            <Grid item xs={12}>
              <StatewiseChart
                data={stateWiseData}
                loader={loading}
                handleDataDumpPopup={handleDataDumpPopup}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <PieChart
                data={premiumCategoryData}
                chartTitle={"Luxury OEM Market Share"}
                loader={loading}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <PieChart
                data={luxuriusCategoryData}
                chartTitle={"Premium OEM Market Share"}
                loader={loading}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <PieChart
                data={massCategoryData}
                chartTitle={"Mass OEM Market Share"}
                loader={loading}
              />
            </Grid>
          </Grid>

          <Grid
            container
            className="mt-2"
            alignItems="stretch"
            // xs={12}
            // md={12}
            // lg={12}
            spacing={4}
          >
            <Grid item xs={12} md={12} lg={6}>
              <Grid container spacing={4}>
                {northData?.length > 0 && (
                  <Grid item xs={12} md={6} lg={6}>
                    <VahanTable
                      data={northData}
                      chartTitle={"North India"}
                      loader={loading}
                    />
                  </Grid>
                )}
                {southData?.length > 0 && (
                  <Grid item xs={12} md={6} lg={6}>
                    <VahanTable
                      data={southData}
                      chartTitle={"East India"}
                      loader={loading}
                    />
                  </Grid>
                )}
                {eastData?.length > 0 && (
                  <Grid item xs={12} md={6} lg={6}>
                    <VahanTable
                      data={eastData}
                      chartTitle={"West India"}
                      loader={loading}
                    />
                  </Grid>
                )}
                {westData?.length > 0 && (
                  <Grid item xs={12} md={6} lg={6}>
                    <VahanTable
                      data={westData}
                      chartTitle={"South India"}
                      loader={loading}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Grid container>
                <Grid item xs={12}>
                  <MapChart data={stateWiseData} loader={loading} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </SidebarWithLayout>
  );
}
