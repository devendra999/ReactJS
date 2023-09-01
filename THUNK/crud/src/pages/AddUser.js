import React, { useState } from "react";
import { createUser } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddUser = () => {



    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        const new_user = {
            id: new Date().getTime(),
            name: name,
            email: email,
            phone: phone,
        };
        console.log(new_user)

        dispatch(createUser(new_user));
        navigate("/");
    };


    return (
        <div className="container">
            <div className="py-4">
                <div className="card shadow">
                    <div className="card-header">Add A Post</div>
                    <div className="card-body">
                        <form onSubmit={submitForm}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter Post Title"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter Post Title"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    placeholder="Enter Post Title"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary btn-lg">Add New User</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser