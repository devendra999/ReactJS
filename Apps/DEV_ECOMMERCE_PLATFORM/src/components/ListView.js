import React from 'react'
import { useFilterContext } from '../context/FilterContext'
import { Link } from 'react-router-dom';
import FormatPrice from '../helper/FormatPrice';



const ListView = () => {
    const { filterProducts } = useFilterContext();

    return (
        <>
            <div className='mt-5'>
                {
                    filterProducts && filterProducts.length > 0 ?
                        filterProducts.map((curElem, index) => {
                            const { image, category, name, price, company, id } = curElem;
                            return (
                                <div className="card listview mb-4" key={index}>
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
                                        <Link to={`/product/${id}`} className="btn btn-primary">Go somewhere</Link>
                                    </div>
                                </div>
                            )
                        }) : <div className="d-flex align-items-center justify-content-center"><h2>No Items Found</h2></div>
                }
            </div>
        </>
    )
}

export default ListView