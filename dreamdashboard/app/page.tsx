"use client";
import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { useMe } from "../utils/auth/useAuth";
import { getFromLocalStorage, isServer } from "../utils/common";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!isServer()) {
      const response = JSON.parse(
        getFromLocalStorage("@login-response") || "{}"
      );
      const user = response.user;
      if (user && user?.userId) {
        router.push(`/landing`);
      } else {
        router.push("/login");
      }
    }
  }, []);

  const isLoading = useMe();
  if (isLoading) {
    return <Loading />;
  }
  return <Loading />;
};

export default Home;

