import React from 'react'
import ProductList from '../components/ProductList'
import Sort from '../components/Sort'
import FilterSection from '../components/FilterSection'


const Products = () => {
    return (
        <div className="product-list py-5">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <FilterSection />
                    </div>
                    <div className="col-9">
                        <Sort />
                        <ProductList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products