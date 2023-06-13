import React from 'react'
import { useForm } from 'react-hook-form'

const Validation = () => {
    const { handleSubmit, register,  formState: { errors } } = useForm({
        mode: "onChanged",
        // mode: "onTouched",
    });

    // check error object  - formState: { errors }
    console.log(errors)

    const onSubmit = data => console.log(data);

  return (
    <>
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h5>Validation & Errors</h5>
                </div>
                <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-group mb-4">
                              <label htmlFor="fullname">Full Name</label>
                              <input
                                  type="text"
                                  className={`form-control ${errors.fullname && 'error'}`}
                                  id="fullname"
                                  placeholder="Enter Your Full Name"
                                  {...register("fullname", { required: true, minLength: 4 })}
                              />
                              {errors.fullname?.type == 'required' && 
                                <small className='form-text text-danger'>This field is required</small>
                              }
                              {errors.fullname?.type == 'minLength' && 
                                <small className='form-text text-danger'>Minimum 4 charactors are required</small>
                              }
                          </div>
                          <div className="form-group mb-4">
                              <label htmlFor="email">E-mail Address</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  id="email"
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
                              <label htmlFor="phone">Phone Number</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  id="phone"
                                  placeholder="Enter Your Phone Number"
                                  {...register("phone", { required: true, pattern: /^\d{10}$/ })}
                              />
                              {errors.phone?.type == 'required' &&
                                  <small className='form-text text-danger'>This field is required</small>
                              }
                              {errors.phone?.type == 'pattern' &&
                                  <small className='form-text text-danger'>Enter Valid phone number</small>
                              }
                          </div>
                          <div className="form-group mb-4">
                              <label htmlFor="password">Password</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  id="password"
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
                              <label htmlFor="state">Choose Your State</label>
                              <select className="form-control" id="state" 
                                  {...register("state", { required: true })}
                              >
                                  <option value="">--- Select Your State ---</option>
                                  <option value="Jharkhand">Jharkhand</option>
                                  <option value="Assam">Assam</option>
                                  <option value="Meghalaya">Meghalaya</option>
                                  <option value="Punjab">Punjab</option>
                              </select>
                              {errors.state?.type == 'required' &&
                                  <small className='form-text text-danger'>This field is required</small>
                              }
                          </div>
                          <div className="form-group mb-4">
                              <label htmlFor="gender" className="mr-4">Choose Your Gender</label><br />
                              <div className="form-check form-check-inline">
                                  <input
                                      className="form-check-input"
                                      type="radio"
                                      id="male"
                                      value="male"
                                      {...register("gender", { required: true })}
                                  />
                                  <label className="form-check-label" htmlFor="male">male</label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <input
                                      className="form-check-input"
                                      type="radio"
                                      id="female"
                                      value="female"
                                      {...register("gender", { required: true })}
                                  />
                                  <label className="form-check-label" htmlFor="female">female</label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <input
                                      className="form-check-input"
                                      type="radio"
                                      id="other"
                                      value="other"
                                      {...register("gender", { required: true })}
                                  />
                                  <label className="form-check-label" htmlFor="other">other</label>
                              </div><br />
                              {errors.gender?.type == 'required' &&
                                  <small className='form-text text-danger'>Please select one</small>
                              }
                          </div>
                          <div className="form-group mb-4">
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="checkbox" id="tnc"
                                      {...register("termsandcondition", { required: true })}
                                  />
                                  <label className="form-check-label" htmlFor="tnc">I agree all terms & conditions</label><br />
                                  {errors.termsandcondition?.type == 'required' &&
                                      <small className='form-text text-danger'>Please checked to read terms and condition</small>
                                  }
                              </div>
                          </div>
                          <button className="btn btn-primary" type='submit'>Create New Account</button>
                      </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Validation