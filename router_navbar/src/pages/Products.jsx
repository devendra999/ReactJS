import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
const Products = () => {
    const [items, setItems] = useState([])
    
    const getUsers = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setItems(data)
    }

    useEffect(() => {
      getUsers();
    }, [])
    

  return (
    <>
        <h1>Products</h1>
        <div className="container">
            <div className="row">
                {
                    items.map((curElem) => {
                        const {id, name, username, email} = curElem;
                        return <div className="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">{name}</h5>
                                    <p class="card-text">{email}</p>
                                    <Link to={`/product/${id}`}>Go somewhere</Link>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </>
  )
}

export default Products