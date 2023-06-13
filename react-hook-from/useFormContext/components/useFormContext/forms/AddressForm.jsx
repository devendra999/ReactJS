import React from "react";
import { useFormContext } from "react-hook-form";

const AddressForm = () => {
    const { register } = useFormContext();
    return (
        <div className="card border-0 mb-4">
            <div className="card-header">Address Form</div>
            <div className="card-body">
                <div className="form-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your City"
                        {...register('city')}
                    />
                </div>
                <div className="form-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Zipcode"
                        {...register('zipcode')}
                    />
                </div>
                <div className="form-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Village"
                        {...register('village')}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
