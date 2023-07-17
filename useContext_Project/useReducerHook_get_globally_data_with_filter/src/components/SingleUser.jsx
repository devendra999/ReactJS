import React from 'react'

const SingleUser = ({ id, name, email, phone }) => {
    console.log(name)
  return (
    <>
        <div className="col">
            <h5>{name}</h5>
            <h6>{email}</h6>
            <b>{phone}</b>
        </div>
    </>
  )
}

export default SingleUser