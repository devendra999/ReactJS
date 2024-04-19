"use client";
import React, { useEffect, useState } from "react";

const ScrollClassAddRemove = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={scrolling ? "active item-2" : "item-2"}>
      {/* Your content goes here */}
    </div>
  );
};

export default ScrollClassAddRemove;
