import React from 'react'
import FeaturedProducts from '../components/FeaturedProducts'

const Home = () => {
    return (
        <>
            <div className="featured-section py-5">
                <div className="container">
                    <h3 className="text-center pb-3">
                        Featured Products
                    </h3>
                    <FeaturedProducts />
                </div>
            </div>
        </>
    )
}

export default Home