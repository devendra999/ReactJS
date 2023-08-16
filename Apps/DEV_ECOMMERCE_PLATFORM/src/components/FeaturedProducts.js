import React from 'react'
import { useProductContext } from '../context/ProductContext'
import ProductItem from './ProductItem';

const FeaturedProducts = () => {
    const { featuredProducts, isLoading } = useProductContext();

    if (isLoading) {
        return <div className="d-flex align-items-center justify-content-center text-center" style={{ minHeight: '200px' }}>
            <h3>Loading...</h3>
        </div>
    }

    return (
        <>
            <div className="row">
                {
                    featuredProducts && featuredProducts.length > 0 &&
                    featuredProducts.map((curElem, index) => {
                        return <ProductItem key={index} {...curElem} />
                    })
                }
            </div>
        </>
    )
}

export default FeaturedProducts