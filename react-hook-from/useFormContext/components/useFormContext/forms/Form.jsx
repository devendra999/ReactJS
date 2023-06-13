import React, { Fragment } from "react";

import AddressForm from "./AddressForm";
import BasicForm from "./BasicForm";
import ContactForm from "./ContactForm";

const Form = ({ methods }) => {

    // const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        
            <div className="container">
                <div className="card">
                    <div className="card-header mb-4">
                        <h5>useFormContext like useContext data provider from multiple form components</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <BasicForm />
                            <AddressForm />
                            <ContactForm />
                            <button type="submit" className="btn btn-primary">Create New Account</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        
    );
};

export default Form;
