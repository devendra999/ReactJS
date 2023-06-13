import React from "react";
import { useFormContext } from "react-hook-form";

const ContactForm = () => {
    const { register } = useFormContext();
    return (
        <div className="card border-0 mb-4">
            <div className="card-header">Contact Form</div>
            <div className="card-body">
                <div className="form-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your E-mail Address"
                        {...register('email')}
                    />
                </div>
                <div className="form-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Phone Number"
                        {...register('phone')}
                    />
                </div>
                <div className="form-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Alternate Phone Number"
                        {...register('alternate_phone')}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
