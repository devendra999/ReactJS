import Link from "next/link";
import FormatPrice from "@/helper/FormatPrice";

import { ProductTypes } from "../store/productStore";

interface PageTypes {
  product: ProductTypes;
}

const Product = ({ product }: PageTypes) => {
  return (
    <>
      <div className="single-product col-4">
        <Link href={`/${product?.id}`}>
          <div className="image_box">
            <span className="category">{product?.category}</span>
            <img className="w-100" src={product?.image} alt={product?.name} />
          </div>
          <div className="detail w-100 d-flex align-items-center justify-content-between">
            <h4 className="name">{product?.name}</h4>
            <h6 className="Price">
              <FormatPrice price={product?.price} />
            </h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Product;
