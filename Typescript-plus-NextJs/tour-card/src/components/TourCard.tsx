import React, { useState } from "react";

interface TourDataType {
  id: string;
  image: string;
  info: string;
  name: string;
  price: string;
}

interface TourCardProps {
  tourList: TourDataType[];
  devendra: (id: string) => void;
}

const TourCard = (props: TourCardProps) => {
  const notInterested = (id: string) => {
    props.devendra(id);
  };

  return (
    <>
      {props.tourList &&
        props.tourList.length > 0 &&
        props.tourList.map((tour) => {
          return (
            <div className="card" key={tour.id}>
              <div className="image-wrapper">
                <img src={tour.image} alt="" />
                <span>{tour.price}</span>
              </div>
              <div className="detailed">
                <h4>{tour.name}</h4>
                <p>{tour.info}</p>
                <div className="btn-wrapper">
                  <button onClick={() => notInterested(tour.id)}>
                    Not interested
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default TourCard;
