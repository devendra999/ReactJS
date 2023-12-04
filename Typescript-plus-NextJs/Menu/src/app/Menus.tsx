"use client";

import React, { useState } from "react";
import menu from "@/Menu";
import MenuButton from "@/components/MenuButton";
import MenuCard from "@/components/MenuCard";

interface MenuProps {
  id: number;
  price: number;
  img: string;
  title: string;
  desc: string;
  category: string;
}

const Menus: React.FC = () => {
  const [menuList, setMenuList] = useState<MenuProps[]>(menu);
  const [category, setCategory] = useState<string | undefined>("");

  const categoryFilter = (cat: string) => {
    setCategory(cat);
  };

  let filteredList = menuList;
  if (category && category !== "all") {
    filteredList = menuList.filter((menu) => menu.category === category);
  } else if (category === "all") {
    filteredList = menuList;
  }

  return (
    <>
      <MenuButton categoryFilter={categoryFilter} />
      <div className="allList">
        {filteredList &&
          filteredList?.length > 0 &&
          filteredList?.map((menu) => <MenuCard key={menu.id} menu={menu} />)}
      </div>
    </>
  );
};

export default Menus;
