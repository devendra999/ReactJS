import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom";

const api = 'https://jsonplaceholder.typicode.com/users'

const SingleProduct = () => {
    const [singleUser, setSingleUser] = useState('');
    const params = useParams();
    const id = params.id;

    const getSingleUsers = async () => {
        const res = await fetch(`${api}/${id}`);
        const data = await res.json();
        setSingleUser(data)
    }
    console.log(singleUser)

    useEffect(() => {
      getSingleUsers();
    }, [])
    

  return (
    <>
        <div className="container">
              <h1>Single Users</h1>
              <div className="col-md-4">
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title">{singleUser.name}</h5>
                          <p class="card-text">{singleUser.email}</p>
                          <p class="card-text">{singleUser.phone}</p>
                          <p class="card-text">{singleUser.username}</p>
                          <p class="card-text">{singleUser.website}</p>
                          <p class="card-text"><b>Company :</b> {singleUser?.company?.bs} {singleUser?.company?.catchPhrase} {singleUser?.company?.name}</p>
                          <p class="card-text"><b>Address :</b> {singleUser?.address?.city} {singleUser?.address?.street} {singleUser?.address?.zipcode}</p>
                      </div>
                  </div>
              </div>
        </div>
    </>
  )
}

export default SingleProduct