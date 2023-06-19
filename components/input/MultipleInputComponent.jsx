import React, { useState } from 'react';

const MultipleInputComponent = () => {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission using the input values
        console.log(inputs);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={inputs.firstName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={inputs.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MultipleInputComponent;
