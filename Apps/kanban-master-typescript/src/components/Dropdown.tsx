import React, { ReactNode, useEffect, useRef } from "react";

interface DropdownPageType {
  children: ReactNode;
  setshowDropdown: (show: boolean) => void;
}

const Dropdown = ({ children, setshowDropdown }: DropdownPageType) => {
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the clicked element is outside the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setshowDropdown(false);
      }
    };

    // Add event listener to handle outside clicks
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Remove event listener when the component is unmounted
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return <ul ref={dropdownRef}>{children}</ul>;
};

export default Dropdown;
