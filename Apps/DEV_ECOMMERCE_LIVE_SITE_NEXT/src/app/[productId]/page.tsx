"use client";

import AddToCart from "@/components/AddToCart";
import Star from "@/components/Star";
import FormatPrice from "@/helper/FormatPrice";
import useStore from "@/store/productStore";
import { useEffect, useState } from "react";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";

const API = "https://api.pujakaitem.com/api/products";
const SingleProduct = ({ params }: any) => {
  const { setSingleProduct, singleProduct, getSingleProduct } = useStore();
  const [imageView, setimageView] = useState(0);

  useEffect(() => {
    getSingleProduct(`${API}/${params.productId}`);

    return () => {
      setSingleProduct();
    };
  }, [params.productId]);

  return (
    <div className="space single-product-detail">
      <div className="container">
        <div className="d-flex">
          <div className="image-wrapper">
            <div className="multipel-img">
              {singleProduct?.image?.map((img, index) => {
                return (
                  <img
                    key={index}
                    src={img?.url}
                    onClick={() => setimageView(index)}
                  />
                );
              })}
            </div>
            <div className="single-img">
              <img src={singleProduct?.image?.[imageView]?.url} />
            </div>
          </div>
          <div className="detail">
            <h3 className="main-title">{singleProduct?.name}</h3>

            <Star
              stars={singleProduct?.stars}
              reviews={singleProduct?.reviews}
            />

            <p>
              MRP:
              <del>
                <FormatPrice price={singleProduct?.price + 25000} />
              </del>
            </p>
            <p className="product-data-price product-data-real-price mb-5">
              Deal of the Day: <FormatPrice price={singleProduct?.price} />
            </p>
            <p>{singleProduct?.category}</p>
            <p className="description-product mb-5">
              {singleProduct?.description}
            </p>

            <div className="product-data-warranty mb-5">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Thapa Delivered </p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>2 Year Warranty </p>
              </div>
            </div>

            <div className="ex-detail">
              <p>
                Availbale in :
                <span>
                  {singleProduct?.stock > 0 ? "In Stock" : "Not Available"}
                </span>
              </p>
              <p>
                ID: <span>{singleProduct?.id}</span>
              </p>
              <p>
                Brand: <span>{singleProduct?.company}</span>
              </p>
            </div>

            <hr />
            {singleProduct?.stock > 0 && <AddToCart product={singleProduct} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
