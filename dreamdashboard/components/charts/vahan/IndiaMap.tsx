import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { addCommasToNumber } from "@root/utils/globalFunction";

// Dynamically import the VectorMap component
const VectorMap = dynamic(
  () => import("react-jvectormap").then((mod) => mod.VectorMap),
  { ssr: false }
);

interface IndiaMapProps {
  stateData: [];
  scalTitle: any;
}

const IndiaMap: React.FC<IndiaMapProps> = ({
  stateData = [],
  scalTitle,
}: any) => {
  const [dynamicScale, setDynamicScale] = useState<any[]>([]);

  useEffect(() => {
    if (stateData && stateData?.length > 0) {
      // Calculate max and min values
      const maxValue = Math.max(
        ...stateData?.map((item: any) => parseFloat(item.value))
      );
      const minValue = Math.min(
        ...stateData?.map((item: any) => parseFloat(item.value))
      );

      // Create dynamic scale
      const colorScale = [
        // { color: "#a0c4ff", value: minValue },
        // { color: "#72aaff", value: minValue + (maxValue - minValue) * 0.2 },
        // { color: "#4593ff", value: minValue + (maxValue - minValue) * 0.4 },
        // { color: "#2372ff", value: minValue + (maxValue - minValue) * 0.6 },
        // { color: "#104bbf", value: minValue + (maxValue - minValue) * 0.8 },
        // { color: "#0027ff", value: maxValue },
        { color: "#0027ff", value: minValue }, // Deep blue
        { color: "#00bfff", value: minValue + (maxValue - minValue) * 0.2 }, // Lighter blue
        { color: "#00ff7f", value: minValue + (maxValue - minValue) * 0.4 }, // Green
        { color: "#ffff00", value: minValue + (maxValue - minValue) * 0.6 }, // Yellow
        { color: "#ff7f00", value: minValue + (maxValue - minValue) * 0.8 }, // Orange
        { color: "#ff0000", value: maxValue }, // Red
      ];

      setDynamicScale(colorScale);
    }
  }, [stateData]);

  const getalldata = () => {
    const countryData: any = {};
    stateData?.length > 0 &&
      stateData?.forEach((obj: any) => {
        countryData[obj.code] = obj.value;
      });
    return countryData;
  };
  // const scale = [
  //   { color: "#a0c4ff", value: 0 },
  //   { color: "#72aaff", value: 4000 },
  //   { color: "#4593ff", value: 6000 },
  //   { color: "#2372ff", value: 8000 },
  //   { color: "#104bbf", value: 10000 },
  //   { color: "#0027ff", value: 12000 },
  // ];

  const onRegionTipShow = (event: any, label: any) => {
    const selectedStateValue =
      stateData?.length > 0 &&
      stateData?.filter((obj: any) => obj.state == label.text());
    label.html(
      `<div>${label.text()} : ${
        selectedStateValue?.length > 0
          ? addCommasToNumber(selectedStateValue[0].value) +
            " " +
            selectedStateValue[0].per_result
          : 0
      }</div>`
    );
  };

  const onMarkerOver = (event: any, index: any) => {
    const tooltip = document.querySelector(".jvectormap-tip");
    if (tooltip) {
      tooltip.remove();
    }
  };

  // const onMarkerOver = (event: any, index: any) => {
  //   console.log('Marker hovered over:', index);
  //   // Additional logic can be added here, e.g., show custom tooltip
  // };

  return (
    <>
      {stateData?.length > 0 && dynamicScale?.length > 0 && (
        <Box className="w-full">
          <VectorMap
            map={"in_mill"}
            backgroundColor="transparent"
            focusOn={{
              x: 0.5,
              y: 0.5,
              scale: 0,
              animate: true,
            }}
            zoomOnScroll={false}
            containerStyle={{
              width: "100%",
              height: "100%",
            }}
            // onRegionClick={(e, countryCode) => console.log(countryCode)}
            onRegionTipShow={onRegionTipShow}
            onMarkerOver={onMarkerOver}
            containerClassName="map"
            regionStyle={{
              initial: {
                fill: "#e4e4e4",
                "fill-opacity": 0.9,
                stroke: "none",
                "stroke-width": 0,
                "stroke-opacity": 0,
              },
              hover: {
                "fill-opacity": 0.8,
                cursor: "pointer",
              },
              selected: {
                fill: "#2938bc", // onclick color of state
              },
            }}
            regionsSelectable={false}
            series={{
              regions: [
                {
                  values: getalldata(), // can be directly served with API response or any data
                  scale: dynamicScale?.map((s: any) => s.color), // color range
                  normalizeFunction: "polynomial",
                },
              ],
            }}
          />
          <Box
            style={{
              marginTop: "20px",
              textAlign: "center",
              width: "fit-content",
              marginRight: "10px",
              marginLeft: "auto",
              transform: "rotate(-90deg)",
              position: "absolute",
              right: "-110px",
              bottom: "155px",
            }}
          >
            <h3>{scalTitle}</h3>
            <Box
              style={{
                position: "relative",
                display: "inline-block",
                width: "300px",
                height: "20px",
                background:
                  "linear-gradient(to right, #0027ff, #00bfff, #00ff7f, #ffff00, #ff7f00, #ff0000)",
              }}
            >
              {dynamicScale?.map((s: any, index: any) => (
                <Box
                  key={index}
                  style={{
                    position: "absolute",
                    left: `${(index / (dynamicScale?.length - 1)) * 100}%`,
                    transform: "translateX(-50%)",
                    textAlign: "center",
                  }}
                >
                  <Box
                    style={{
                      width: "2px",
                      height: "10px",
                      backgroundColor: "black",
                      marginBottom: "2px",
                      marginLeft: "20px",
                    }}
                  ></Box>
                  <span style={{ fontSize: "10px" }}>
                    {addCommasToNumber(s?.value?.toFixed(2))}
                  </span>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default IndiaMap;
