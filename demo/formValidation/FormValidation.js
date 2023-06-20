import React, { useState } from 'react'

const style = {
    border: '1px solid #ccc',
}

const FormValidation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Form validation logic
        let errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password should be at least 6 characters long';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Form submission logic
            console.log(formData);
            // Reset form data
            setFormData({
                name: '',
                email: '',
                password: '',
            });
            setFormErrors({
                name: '',
                email: '',
                password: '',
            });
        }
    };

  return (
      <div className='form-validation'>
        <div className='container'>
            <h1>Form Validation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input style={style}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {formErrors.name && <p>{formErrors.name}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input style={style}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {formErrors.email && <p>{formErrors.email}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input style={style}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {formErrors.password && <p>{formErrors.password}</p>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
      </div>
  )
}

export default FormValidation