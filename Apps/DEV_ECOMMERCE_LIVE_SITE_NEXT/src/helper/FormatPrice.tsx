import React from "react";

const FormatPrice = ({ price }: { price: number }) => {
  const RealPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  return <>{RealPrice}</>;
};

export default FormatPrice;
