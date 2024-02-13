import React from "react";
import Slider from "react-slick/";
import "slick-carousel/slick/slick.css";
import Image from "next/image";

const Carausel = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="space">
        <div
          className="container client-slider"
          style={{ position: "relative", width: "100%" }}
        >
          <h2 className="main-title">Trusted Clients</h2>
          <Slider {...settings}>
            <div className="single-item">
              <Image src="/image2.png" width={260} height={160} alt="" />
            </div>
            <div className="single-item">
              <Image src="/image3.png" width={260} height={160} alt="" />
            </div>
            <div className="single-item">
              <Image src="/image4.png" width={260} height={160} alt="" />
            </div>
            <div className="single-item">
              <Image src="/image6.png" width={260} height={160} alt="" />
            </div>
            <div className="single-item">
              <Image src="/image8.png" width={260} height={160} alt="" />
            </div>
            {/* Add more slides as needed */}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Carausel;
