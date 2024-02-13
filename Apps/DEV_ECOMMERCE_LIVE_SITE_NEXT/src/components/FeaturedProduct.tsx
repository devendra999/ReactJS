import Product from "./Product";
import { ProductTypes } from "../store/productStore";

const FeaturedProduct = ({
  featuredProducts,
}: {
  featuredProducts: ProductTypes[];
}) => {
  return (
    <>
      <div className="featured-section space bg-gray">
        <div className="container">
          <h2 className="main-title">Our Feature Services</h2>
          <div className="row">
            {featuredProducts && featuredProducts.length > 0
              ? featuredProducts.map((prod, index) => {
                  return <Product key={index} product={prod} />;
                })
              : "No Featured products found"}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProduct;
