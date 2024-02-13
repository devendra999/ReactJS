"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const headerHeight = headerRef.current.offsetHeight;

      if (offset > headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Run handleScroll once to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get header height when component mounts
  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: `${headerHeight}px` }}>
      <header
        ref={headerRef}
        className={`${isSticky ? "bg-gray shadow sticky" : "bg-gray shadow"}`}
      >
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="logo col">
              <Link href="/">
                <img src="./logo.png" />
              </Link>
            </div>
            <ul className="menu d-flex col">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/cart">Cart</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
