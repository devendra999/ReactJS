"use client";
import React, { useEffect, useState, useRef } from "react";
import { db } from "../db.js";

const VerticalTimelineActiveOnscroll = () => {
  const [activeIndices, setActiveIndices] = useState([]);
  const timelineRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newActiveIndices = timelineRefs.current
        .map((ref, index) => ({ index, offsetTop: ref.offsetTop }))
        .filter(({ offsetTop }) => offsetTop < scrollPosition - 500)
        .map(({ index }) => index);
      setActiveIndices(newActiveIndices);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div style={{ height: "100vh" }}></div>

      <div className="timeline">
        <ul>
          {db &&
            db.map((timeline, index) => {
              return (
                <li
                  key={index}
                  ref={(ref) => (timelineRefs.current[index] = ref)}
                  className={activeIndices.includes(index) ? "active" : ""}
                >
                  <div className="content">
                    <h3>{timeline.title}</h3>
                    <p>{timeline.description}</p>
                  </div>
                  <div className="time">
                    <h4>{timeline.date}</h4>
                  </div>
                </li>
              );
            })}
        </ul>
        <div style={{ clear: "both" }}></div>
      </div>

      <div style={{ height: "100vh" }}></div>
    </>
  );
};

export default VerticalTimelineActiveOnscroll;
