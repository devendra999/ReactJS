import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from '../redux/actions/userAction';

const UpdateUser = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.users.user);
    const { id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");



    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user?.phone);
        }
    }, [user]);

    const loadUser = () => {
        dispatch(getUser(id));
    };


    const submitForm = (e) => {
        e.preventDefault();
        const update_user = {
            id: user.id,
            name: name,
            email: email,
            phone: phone,
        };

        dispatch(updateUser(update_user));
        navigate("/");
    };

    return (
        <>
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
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Post Title"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary btn-lg">Update User</button>
            </form>
        </>
    )
}

export default UpdateUser