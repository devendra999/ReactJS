import React, { useState } from "react";

import Menu from "./Sdata";
import MenuCard from "./Cards";
import Navbar from "./Navbar";


const uniqueList = [
    "All", ...new Set(
        Menu.map((curElem) => {
            return curElem.category;
        })
    ),
    
];

console.log(uniqueList);

const RestaurantTabs = () => {
    const [menuData, setMenuData] = useState(Menu);
    const [menuList, setMenuList] = useState(uniqueList);
    console.log(menuData)
    const filterItem = (category) => {
        if (category === "All") {
            setMenuData(Menu);
            return;
        }

        const updatedList = Menu.filter((curElem) => {
            return curElem.category === category;
        });

        setMenuData(updatedList);
    };

    return (
        <>
            <Navbar filterItem={filterItem} menuList={menuList} />
            <MenuCard menuData={menuData} />
        </>
    );
};

export default RestaurantTabs;