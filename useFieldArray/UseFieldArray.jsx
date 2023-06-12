import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

const UserInformation = (prop) => {
    const { register, control } = prop;
    const { fields, append, prepend, remove, swap, move, insert, } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "users", // unique name for your Field Array
    });


    return <div className="card mt-5">
        <div className="card-header">
            <h5>User Information</h5>
        </div>
        <div className="card-body">
            {fields.map((users, index) => (

                <div className="form-row row form-group mb-3" key={index}>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Enter Your First name" {...register(`users.${index}.firstName`)} defaultValue={users.firstName} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Enter Your Last name" {...register(`users.${index}.lastName`)} defaultValue={users.lastName} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Enter Your E-mail Address" {...register(`users.${index}.emailAddress`)} defaultValue={users.emailAddress} />
                    </div>
                    <div className="col">
                        <select className="form-control" id="state" {...register(`users.${index}.state`)} defaultValue={users.state}>
                            <option value="">Select Your State</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Assam">Assam</option>
                            <option value="Goa">Goa</option>
                            <option value="Manipur">Manipur</option>
                        </select>
                    </div>
                    <div className="col">
                        <button className='btn btn-danger' onClick={() => {remove(index);}}>Remove</button>
                    </div>
                </div>
            ))}
            <div>
                <button className='btn btn-success'
                    type="button"
                    onClick={() => append({ firstName: "", lastName: "", emailAddress: '', state: '' })}
                >
                    Add User
                </button>
            </div>
        </div>
    </div>
}

const UseFieldArray = () => {

   

    const { register, handleSubmit, control } = useForm();
    const onSubmit = (data) => {
        console.log(data)
    }        


    const basicForm = (
        <>
            <div className="card">
                <div className="card-header">
                    <h5>Simple form</h5>
                </div>
                <div className="card-body">
                    <div className="form-group mb-3">
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" className="form-control" id="fullname" {...register('fullname', { required: false })} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" {...register('email', { required: false })} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" className="form-control" id="phone" {...register('phone', { required: false })} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="phone">State</label>
                        <input type="text" className="form-control" id="phone" {...register('address.state', { required: false })} />
                    </div>
                </div>
            </div>
        </>
    );


  return (
    <div className="container">
        <h5>useFieldArray create dynamic form like in form append some user also delete it so we can use this.</h5>
          <h5>Custom hook for working with Field Arrays (dynamic form). The motivation is to provide better user experience and performance. You can watch this short video to visualize the performance enhancement.</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
            {basicForm}

            <UserInformation register={register} control={control} />
            <div className="form-group mb-3">
                <button type='submit' className='btn btn-success'>Submit</button>
            </div> 
        </form>
    </div>
  )
}

export default UseFieldArray