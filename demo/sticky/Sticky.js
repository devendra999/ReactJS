import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Navbar from '../navbar/Navbar'
import './sticky.scss'

const Sticky = () => {
    const targetRef = useRef();
    const [sidebarWidth, setSidebarWidth] = useState(undefined);
    const [sidebarTop, setSidebarTop] = useState(undefined);
    const [height, setHeight] = useState({});

    useLayoutEffect(() => {
        if (targetRef.current) {
            setHeight({
                height: targetRef.current.offsetHeight + "px",
            })
        }

    }, []);
   
    useEffect(() => {
        const sidebarEl = document.querySelector('.navbar-wrapper').getBoundingClientRect();
        setSidebarWidth(sidebarEl.width);
        setSidebarTop(sidebarEl.top);

    }, []);

useEffect(() => {
    if (!sidebarTop) return;

    window.addEventListener('scroll', isSticky);
    return () => {
        window.removeEventListener('scroll', isSticky);
    };
}, [sidebarTop]);

    const isSticky = (e) => {
        const sidebarEl = document.querySelector('.navbar-wrapper');
        const scrollTop = window.scrollY;
        if (scrollTop >= sidebarTop) {
            sidebarEl.classList.add('is-sticky');
        } else {
            sidebarEl.classList.remove('is-sticky');
        }
    }

  return (
    <>
        <div className="sticky-section">
            <div style={{ height: '50vh' }}></div>
            <div className="navbar-wrapper" ref={targetRef} style={height}>
                <Navbar />
            </div>
            <div style={{ height: '50vh' }}></div>
            <div style={{ height: '50vh' }}></div>
            <div style={{ height: '50vh' }}></div>
            <div style={{ height: '50vh' }}></div>
        </div>
    </>
  )
}

export default Sticky