import React from 'react'
import { useForm } from 'react-hook-form'

const BasicForm = () => {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }



  return (
    <>
        <div className="container">
            <h5>Basic Form</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group mb-3">
                      <label htmlFor="fullname">Full Name</label>
                      <input type="text" className="form-control" id="fullname" {...register('fullname', {required: false})} />
                  </div>
                  <div className="form-group mb-3">
                      <label htmlFor="email">Email address</label>
                      <input type="email" className="form-control" id="email" {...register('email', {required: false})} />
                  </div>
                  <div className="form-group mb-3">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="text" className="form-control" id="phone" {...register('phone', {required: false})} />
                  </div>
                  <div className="form-group mb-3">
                      <label htmlFor="phone">State</label>
                      <input type="text" className="form-control" id="phone" {...register('address.state', {required: false})} />
                  </div>
                  <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" {...register('password', {required: false})} />
                  </div>
                  <div className="form-group mb-3">
                        <button className='btn btn-success'>Submit</button>
                  </div>
            </form>
        </div>
    </>
  )
}

export default BasicForm