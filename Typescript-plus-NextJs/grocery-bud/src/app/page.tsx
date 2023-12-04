"use client";
import Title from "@/components/Title";
import Todos from "@/components/Todos";

export default function Home() {
  return (
    <>
      <div className="main-wrapper">
        <div className="content">
          <Title text="Grocery add hrer" />
          <Todos />
        </div>
      </div>
    </>
  );
}
