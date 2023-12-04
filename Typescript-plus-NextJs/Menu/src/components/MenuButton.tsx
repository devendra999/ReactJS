"use client";
import menu from "@/Menu";
import React, { useState } from "react";

interface MenuProps {
  id: number;
  price: number;
  img: string;
  title: string;
  desc: string;
  category: string;
}

interface MenuButtonProps {
  categoryFilter: (cat: string) => void;
}

const MenuButton = (props: MenuButtonProps) => {
  const [menuButton, setMenuButton] = useState<MenuProps[]>(menu);
  const [categoryButton, setCategoryButton] = useState<string | undefined>(
    "all"
  );

  let allCategories: any = new Set(menuButton.map((menu) => menu.category));
  let categorys = ["all", ...allCategories];

  const singleCategory = (cat: string) => {
    setCategoryButton(cat);
    props.categoryFilter(cat);
  };

  return (
    <nav>
      <ul>
        {categorys &&
          categorys.length > 0 &&
          categorys.map((cat) => (
            <li
              className={categoryButton === cat ? "active" : ""}
              onClick={() => singleCategory(cat)}
            >
              {cat}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default MenuButton;
