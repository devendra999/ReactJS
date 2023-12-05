"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface UserProp {
  id: number;
  name: string;
  username: string;
  phone: string;
  website: string;
  email: string;
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    bs: string;
    catchPhrase: string;
  };
}

const EditUser = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [formData, setFormData] = useState({
    id,
    name: "",
    phone: "",
    email: "",
    username: "",
    website: "",
  });

  const getSingleUser = async () => {
    try {
      const response = await axios.get<UserProp>(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const data: any = response.data;
      setFormData({
        id: data.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        username: data.username,
        website: data.website,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Multiple input handle change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform actions with formData, e.g., submit to a server
    console.log(formData);
    try {
      axios.put(
        `https://jsonplaceholder.typicode.com/users/${formData.id}`,
        formData,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    router.push("/");
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInputChange}
            name="name"
            type="text"
            value={formData?.name}
          />
          <input
            onChange={handleInputChange}
            name="username"
            type="text"
            value={formData?.username}
          />
          <input
            onChange={handleInputChange}
            name="phone"
            type="text"
            value={formData?.phone}
          />
          <input
            onChange={handleInputChange}
            name="website"
            type="text"
            value={formData?.website}
          />
          <input
            onChange={handleInputChange}
            name="email"
            type="text"
            value={formData?.email}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
