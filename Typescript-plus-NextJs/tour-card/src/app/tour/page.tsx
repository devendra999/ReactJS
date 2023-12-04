"use client";

import TourCard from "@/components/TourCard";
import { TourData } from "@/db";
import React, { useState } from "react";

interface TourDataType {
  id: string;
  image: string;
  info: string;
  name: string;
  price: string;
}

const Tour = () => {
  const [tourList, setTourList] = useState<TourDataType[]>(TourData);

  const devendra = (id: string) => {
    // Use setTourList to update the state based on the filtered array
    setTourList((prevTourList) => {
      // Filter out the tour with the specified id
      const filteredTourList = prevTourList.filter((tour) => tour.id !== id);
      return filteredTourList; // Return the filtered array to update the state
    });
  };

  return (
    <div className="list">
      <TourCard tourList={tourList} devendra={devendra} />
    </div>
  );
};

export default Tour;
