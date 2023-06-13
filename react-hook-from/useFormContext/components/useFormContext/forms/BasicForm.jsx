import React from "react";
import { useFormContext } from "react-hook-form";

const BasicForm = () => {
    const { register } = useFormContext();
    return (
        <div className="card border-0 mb-4">
            <div className="card-header">Basic Form</div>
            <div className="card-body">
                <div className="form-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your First Name"
                        {...register('firstName')}
                    />
                </div>
                <div className="form-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Middle Name"
                        {...register('middleName')}
                    />
                </div>
                <div className="form-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Last Name"
                        {...register('lastName')}
                    />
                </div>
            </div>
        </div>
    );
};

export default BasicForm;
