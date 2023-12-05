"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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

const user: React.FC<UserProp> = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [user, setUser] = useState<UserProp>();

  const getSingleUser = async () => {
    try {
      const response = await axios.get<UserProp>(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const data = response.data;
      setUser(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  console.log(user);

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <>
      <h1>Name : {user?.name}</h1>
      <h1>Username : {user?.username}</h1>
      <h1>Email : {user?.email}</h1>
      <h1>Phone : {user?.phone}</h1>
      <h1>Website: {user?.website}</h1>
      <h1>
        Address: {user?.address?.street} {user?.address?.suite}{" "}
        {user?.address?.city} {user?.address?.zipcode} <br />
        Geo : {user?.address?.geo?.lng} {user?.address?.geo?.lat}
        <br />
      </h1>
    </>
  );
};

export default user;
