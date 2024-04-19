"use client";
import React, { useEffect, useState, useRef } from "react";

const ShowOnScroll = () => {
  const [isActive, setIsActive] = useState(false);
  const [isOneTimeActive, setIsOneTimeActive] = useState(false);

  const elementRef = useRef(null);
  const elementRefOneTime = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      /* elementRef start */
      const scrollTop = window.scrollY;
      const elementTop = elementRef.current.offsetTop;
      const visibleHeight = window.innerHeight;
      //   console.log(scrollTop, elementTop, "height...");
      if (scrollTop > elementTop - visibleHeight + 200) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }

      /* elementRef end */

      /* elementRefOneTime start*/
      //   const scrollTop = window.scrollY;
      const elementOntTimeTop = elementRefOneTime.current.offsetTop;
      //   const visibleHeight = window.innerHeight;

      console.log(scrollTop, elementOntTimeTop, "height...");

      if (scrollTop > elementOntTimeTop - visibleHeight + 200) {
        setIsOneTimeActive(true);
      }
      /* elementRefOneTime end */
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="h-100" style={{ backgroundColor: "#159784" }}></div>
      <div className="h-100 d-flex align-items-center justify-content-center bg-gray">
        <div className={isActive ? "box active" : "box"} ref={elementRef}>
          <p>Hello I am reveal box</p>
        </div>
      </div>
      <div className="h-100 d-flex align-items-center justify-content-center bg-gray">
        <div
          className={isOneTimeActive ? "box active" : "box"}
          ref={elementRefOneTime}
        >
          <p>Hello I am reveal only one time</p>
        </div>
      </div>
      <div className="h-100" style={{ backgroundColor: "#159784" }}></div>
    </>
  );
};

export default ShowOnScroll;
