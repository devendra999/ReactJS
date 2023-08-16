import React from 'react'
import { Link } from 'react-router-dom'
import FormatPrice from '../helper/FormatPrice'


const ProductItem = ({ id, name, price, image, company, colors, category }) => {
    return (
        <>
            <div className="col-md-4 mb-4">
                <div className="card" >
                    <div className="img-wrapper">
                        <img src={image} className="card-img-top" alt="..." />
                        <span className='shadow'>{category}</span>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <div className="d-flex justify-content-between">
                            <b><FormatPrice price={price} /></b>
                            <b>{company}</b>
                        </div>
                        <hr />
                        <div className="colors d-flex align-items-center">
                            <b>Colors : </b>
                            {colors.map((curColor, index) => {
                                return <button key={index} className='colorButton' style={{ backgroundColor: curColor }}></button>
                            })}
                        </div>
                        <hr />
                        <Link to={`/product/${id}`} className="btn btn-primary">Go somewhere</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem