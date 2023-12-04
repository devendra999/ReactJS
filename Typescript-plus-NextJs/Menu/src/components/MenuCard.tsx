import React from "react";

interface MenuCardProps {
  menu: {
    id: number;
    price: number;
    img: string;
    title: string;
    desc: string;
    category: string;
  };
}

const MenuCard = ({ menu }: MenuCardProps) => {
  return (
    <div className="card">
      <img src={`./${menu.img}`} alt="" />
      <div className="detail">
        <div className="title">
          <h5>{menu.title}</h5>
          <span>{menu.price}</span>
        </div>
        <p>{menu.desc}</p>
      </div>
    </div>
  );
};

export default MenuCard;
