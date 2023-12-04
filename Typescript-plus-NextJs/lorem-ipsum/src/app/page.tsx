"use client";
import { FormEvent, useState } from "react";
import data from "../data";

export default function Home() {
  const [count, setCount] = useState<number>(1);
  const [text, setText] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let amount = parseInt(count.toString());
    if (count <= 0) {
      amount = 1;
    }
    if (count > 8) {
      amount = 8;
    }
    setText(data.slice(0, amount));
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="content">
          <div className="form">
            <h3>TIRED OF BORING LOREM IPSUM?</h3>
            <form className="lorem-form" onSubmit={handleSubmit}>
              <label htmlFor="amount">paragraphs:</label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
              />
              <button className="btn">generate</button>
            </form>
          </div>
          <div className="paragraph">
            {text.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
