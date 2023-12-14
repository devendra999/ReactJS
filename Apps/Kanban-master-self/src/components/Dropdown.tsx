"use client";
import React, { useEffect, useRef } from "react";

const Dropdown = (props) => {
  const dropdownRef = useRef(null);

  const handleOutsideClick = (event) => {
    // Check if the click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      props.setshowDropdown(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown">
      {props.children}
    </div>
  );
};

export default Dropdown;
