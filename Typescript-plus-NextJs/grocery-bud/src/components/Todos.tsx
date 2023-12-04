"use client";
import React, { useState, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Todo from "./Todo";

interface TodosProps {
  id: number;
  checked: boolean;
  text: string;
}

const getLocalGrocery = () => {
  let localItems = localStorage.getItem("grocery");
  if (localItems) {
    return JSON.parse(localItems);
  } else {
    return [];
  }
};

const Todos: React.FC = () => {
  const [items, setItems] = useState<TodosProps[]>(getLocalGrocery());
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      let item: TodosProps = {
        id: new Date().getTime(),
        checked: false,
        text: text,
      };
      setItems((prevItem) => {
        const updatedItems = [item, ...prevItem];
        localStorage.setItem("grocery", JSON.stringify(updatedItems));
        return updatedItems;
      });
      setText("");
      toast.success("Item added successfully");
    } else {
      toast.error("Enter Item name");
    }
  };

  const removeTodo = (id: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("grocery", JSON.stringify(updatedItems));
      return updatedItems;
    });
    toast.error("Item removed successfully");
  };

  const handleCheckbox = (id: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      return updatedItems;
    });
    localStorage.setItem("grocery", JSON.stringify(items));
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">add item</button>
        </form>
      </div>
      {items && items.length > 0 && (
        <div className="item-list">
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckbox(item.id)}
                  />
                  <span className={`${item.checked ? "line-through" : ""} `}>
                    {item.text}
                  </span>
                </span>
                <button onClick={() => removeTodo(item.id)}>delet</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
    </>
  );
};

export default Todos;
