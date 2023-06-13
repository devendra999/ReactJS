import React, {useEffect} from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";

const ResetORautofillData = () => {
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        loadUser();
    }, []);
    const loadUser = async () => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
        console.log(res);

        // here reset data are working
        reset(res.data);
    };
    const onSubmit = (data) => console.log(data);



  return (
    <>
        <div className="container">
              <div className="card shadow">
                  <div className="card-header">
                      <h5>Reset data (featch data and put the input field) </h5>
                  </div>
                  <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-group mb-4">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Your Name"
                                  {...register("name")}
                              />
                          </div>
                          <div className="form-group mb-4">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Your User Name"
                                  {...register("username")}
                              />
                          </div>
                          <div className="form-group mb-4">
                              <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Enter Your E-mail Address"
                                  {...register("email")}
                              />
                          </div>
                          <div className="form-group form-row mb-4">
                              <div className="col">
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Street"
                                      {...register("address.street")}
                                  />
                              </div>
                              <div className="col">
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Suite"
                                      {...register("address.suite")}
                                  />
                              </div>
                          </div>
                          <div className="form-group form-row mb-4">
                              <div className="col">
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="City"
                                      {...register("address.city")}
                                  />
                              </div>
                              <div className="col">
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Zipcode"
                                      {...register("address.zipcode")}
                                  />
                              </div>
                          </div>
                          <div className="form-group mb-4">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Your Phone Number"
                                  {...register("phone")}
                              />
                          </div>
                          <div className="form-group mb-4">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Your Website Name"
                                  {...register("website")}
                              />
                          </div>
                          <div className="form-group mb-4">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Your Company Name"
                                  {...register("company.name")}
                              />
                          </div>
                          <div className="form-group mb-4">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Your Company catch phrase"
                                  {...register("company.catchPhrase")}
                              />
                          </div>
                          <div className="form-group mb-4">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Your Company bs"
                                  {...register("company.bs")}
                              />
                          </div>
                          <button className="btn btn-warning" type="submit">
                              Update User
                          </button>
                      </form>
                  </div>
              </div>
        </div>
    </>
  )
}

export default ResetORautofillData