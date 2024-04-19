"use client";
import React, { useEffect, useState, useRef } from "react";

const Sticky = () => {
  const [isSticky, setIsSticky] = useState(false);

  const elementRef = useRef(null);
  const [elementHeight, setElementHeight] = useState(null);

  useEffect(() => {
    if (elementRef.current) {
      const height = elementRef.current.clientHeight;
      setElementHeight(height);
    }
  }, [elementRef.current?.clientHeight]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const elementTop = elementRef.current.offsetTop;

      const wrapperTop = elementRef.current.parentElement.offsetTop;
      //   console.log(scrollTop, elementTop, "com");

      if (scrollTop > wrapperTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
        reprehenderit ut repellendus placeat deleniti earum labore, animi, saepe
        inventore hic repellat voluptates. Dignissimos error officiis sint
        excepturi provident? Accusantium amet minima, repudiandae voluptatum
        exercitationem ut aut vel voluptates quaerat eum iure, sequi rerum eaque
        porro possimus perspiciatis neque, quidem debitis. Doloremque rerum
        accusamus ab nobis iusto obcaecati nihil, impedit quasi voluptatibus
        officia repellendus incidunt quia libero! Cumque, omnis doloribus odit
        corrupti ex magnam vel itaque fuga molestias officia consequatur quod,
        numquam, ipsa suscipit ipsum? Quaerat ea necessitatibus cumque expedita
        praesentium adipisci labore minus quae! Beatae ad aliquam, doloremque
        quo ipsum aspernatur, excepturi repellat labore dolorum sit ut quasi
        voluptatibus facilis corrupti asperiores quos quidem. Quia vero non
        dolore similique? Quidem voluptate necessitatibus facilis cum assumenda
        aliquid qui ab commodi sint beatae quae eligendi labore excepturi
        officiis, minima neque sit ea accusamus earum! Reiciendis repudiandae
        delectus accusamus sunt architecto commodi ab eius asperiores officiis
        consequuntur. Possimus officiis nemo, dolorem repudiandae, quasi libero
        dolore quas veniam iure exercitationem accusamus quis odit hic quisquam
        in reiciendis debitis dolor vitae rerum porro laborum excepturi optio.
        Corrupti expedita possimus magnam necessitatibus voluptate officiis
        nesciunt provident corporis saepe! Excepturi omnis sequi quas qui
        tenetur placeat eius? Scroll down to see the effect Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Maxime quo quibusdam, sapiente
        corporis magnam aut officia recusandae? Voluptatum accusamus labore quo
        aliquam magni, mollitia amet recusandae molestias ut, blanditiis
        excepturi. Blanditiis corporis illum doloremque accusantium?
      </p>
      <div style={{ height: elementHeight }}>
        <h2
          id="title"
          className={`sticky-title ${isSticky ? "sticky" : ""}`}
          ref={elementRef}
        >
          Onscroll Sticky
        </h2>
      </div>
      <div>
        <p>
          Scroll down and the title should stick to the top when it reaches
          there.
        </p>
        <p>
          Scroll down to see the effect Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Maxime quo quibusdam, sapiente corporis magnam aut
          officia recusandae? Voluptatum accusamus labore quo aliquam magni,
          mollitia amet recusandae molestias ut, blanditiis excepturi.
          Blanditiis corporis illum doloremque accusantium?
        </p>
        <p>
          Scroll down to see the effect Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Maxime quo quibusdam, sapiente corporis magnam aut
          officia recusandae? Voluptatum accusamus labore quo aliquam magni,
          mollitia amet recusandae molestias ut, blanditiis excepturi.
          Blanditiis corporis illum doloremque accusantium?
        </p>
        <p>
          Scroll down to see the effect Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Maxime quo quibusdam, sapiente corporis magnam aut
          officia recusandae? Voluptatum accusamus labore quo aliquam magni,
          mollitia amet recusandae molestias ut, blanditiis excepturi.
          Blanditiis corporis illum doloremque accusantium?
        </p>
        <p>
          Scroll down to see the effect Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Maxime quo quibusdam, sapiente corporis magnam aut
          officia recusandae? Voluptatum accusamus labore quo aliquam magni,
          mollitia amet recusandae molestias ut, blanditiis excepturi.
          Blanditiis corporis illum doloremque accusantium?
        </p>
        <p>
          Scroll down to see the effect Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Maxime quo quibusdam, sapiente corporis magnam aut
          officia recusandae? Voluptatum accusamus labore quo aliquam magni,
          mollitia amet recusandae molestias ut, blanditiis excepturi.
          Blanditiis corporis illum doloremque accusantium?
        </p>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default Sticky;
