import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProductContext } from '../context/ProductContext';
import FormatPrice from '../helper/FormatPrice';
import { FaCheck } from "react-icons/fa";
import AddToCart from '../components/AddToCart';



const API = 'https://api.pujakaitem.com/api/products';

const SingleProduct = () => {
    const [listImage, setListImage] = useState(0);
    const [listColor, setListColor] = useState(0);
    const { id } = useParams();
    const { getSingleProduct, singleProduct, isSingleLoading } = useProductContext();

    const {
        name,
        category,
        colors,
        company,
        description,
        image,
        price,
        reviews,
        shipping,
        stars,
        stock,
    } = singleProduct;

    useEffect(() => {
        getSingleProduct(`${API}/?id=${id}`);
    }, [])

    if (isSingleLoading) {
        return <div className="d-flex align-items-center justify-content-center text-center" style={{ minHeight: '200px' }}>
            <h3>Loading...</h3>
        </div>
    }


    return (
        <>
            <div className="container">
                <div className="product-list py-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-2">
                                    {
                                        image && image.length > 0 &&
                                        image.map((curImage, index) => {
                                            return <div key={index} className="img-wrapper mb-2">
                                                <img onClick={() => setListImage(index)} src={image[index].url} alt="" />
                                            </div>
                                        })
                                    }

                                </div>
                                <div className="col-md-10">
                                    {
                                        image && image.length > 0 &&
                                        <img src={image[listImage].url} alt="" />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3>{name}</h3>
                            <p><b>Company : </b>{company}</p>
                            <p><b>Category : </b>{category}</p>
                            <hr />
                            <p><b>Reviews : </b>{reviews}</p>
                            <p><b>Shipping : </b>{shipping === true ? 'Yes' : 'No'}</p>
                            <p><b>Start : </b>{stars}</p>
                            <p><b>Stock : </b>{stock}</p>
                            <hr />
                            <p><b>Description : </b>{description}</p>
                            <p><b>Price : </b><FormatPrice price={price} /></p>
                            <p className='d-flex align-items-center'><b>Colors : </b>
                                <div className="d-flex align-items-center">
                                    {
                                        colors && colors.length > 0 &&
                                        colors.map((curColor, index) => <button onClick={() => setListColor(index)} className={`${curColor === colors[listColor] ? 'colorButton active' : 'colorButton'}`} style={{ backgroundColor: curColor, }}>
                                            {curColor === colors[listColor] && <FaCheck />}
                                        </button>)
                                    }
                                </div>
                            </p>
                            <hr />
                            {stock && <AddToCart stock={stock} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct