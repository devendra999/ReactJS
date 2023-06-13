import React from 'react'
import { useForm } from "react-hook-form";
import classNames from "classnames";

const PasswordValidation = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const onSubmit = (data) => console.log(data);

    console.log(errors)

  return (
    <>
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h5>Password validation and know how to get values</h5>
                </div>
                <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-group mb-4">
                              <input
                                  type="email"
                                  className='form-control'
                                  placeholder="Enter Your E-mail Address"
                                  {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
                              />
                              {errors.email?.type == 'required' &&
                                  <small className='form-text text-danger'>This field is required</small>
                              }
                              {errors.email?.type == 'pattern' &&
                                  <small className='form-text text-danger'>Enter Valid email address</small>
                              }
                          </div>
                          <div className="form-group mb-4">
                              <input
                                  type="password"
                                  className='form-control'
                                  placeholder="Enter Your Password"
                                  {...register("password", { required: true, pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ })}
                              />
                              {errors.password?.type == 'required' &&
                                  <small className='form-text text-danger'>This field is required</small>
                              }
                              {errors.password?.type == 'pattern' &&
                                  <small className='form-text text-danger'>Password must be UpperCase, LowerCase, Number/SpecialChar and min 8 Chars</small>
                              }
                          </div>
                          <div className="form-group mb-4">
                              <input
                                  type="password"
                                  className='form-control'
                                  placeholder="Confirm Your Password"
                                  {...register("confirm_password", {
                                      required: true, 
                                      validate: (value) => value === getValues("password") })}
                              />
                              {errors.confirm_password?.type == 'required' &&
                                  <small className='form-text text-danger'>This field is required</small>
                              }
                              {errors.confirm_password?.type == "validate" &&
                                  <small className='form-text text-danger'>Password doesn't match</small>
                              }
                          </div>
                          <button className="btn btn-primary" type="submit">
                              Create Account
                          </button>
                      </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default PasswordValidation