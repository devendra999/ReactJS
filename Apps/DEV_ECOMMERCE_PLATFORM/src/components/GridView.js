import React from 'react'
import { useFilterContext } from '../context/FilterContext'
import ProductItem from './ProductItem';

const GridView = () => {
    const { filterProducts } = useFilterContext();
    // console.log(filterProducts)

    return (
        <>
            <div className="row mt-5">
                {
                    filterProducts && filterProducts.length > 0 ?
                        filterProducts.map((curElem, index) => <ProductItem key={index} {...curElem} />) :
                        <div className="d-flex align-items-center justify-content-center"><h2>No Items Found</h2></div>

                }
            </div>
        </>
    )
}

export default GridView