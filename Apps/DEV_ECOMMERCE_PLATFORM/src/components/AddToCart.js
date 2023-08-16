import React, { useState } from 'react'

const AddToCart = ({ stock }) => {
    const [quantity, setQuantity] = useState(1);
    console.log(stock)

    const decrement = () => { if (quantity > 1) { setQuantity(quantity - 1) } }
    const increment = () => { if (stock > quantity) { setQuantity(quantity + 1) } }

    return (
        <>
            <div className="btn-group">
                <button onClick={decrement} className='btn btn-primary'>-</button>
                <button className='btn btn-transparent'>{quantity}</button>
                <button onClick={increment} className='btn btn-primary'>+</button>
            </div>
            <div className="btn-wrapper mt-4">
                <button className='btn btn-md btn-primary'>Add to cart</button>
            </div>
        </>
    )
}

export default AddToCart