"use client";

import React, { useEffect, useState } from "react";

interface dataTypes {
  id: number;
  text: string;
}
const getList = () => {
  let allList = localStorage.getItem("todo");

  if (allList) {
    return JSON.parse(allList);
  } else {
    return [];
  }
};

const Todos: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [list, setList] = useState<dataTypes[]>(getList());
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditID, setIsEditID] = useState<number | undefined>();

  const addValue = (e) => {
    e.preventDefault();
    if (text && isEdit && isEditID) {
      setList(
        list.filter((list) =>
          list.id === isEditID ? (list.text = text) : list
        )
      );
      setText("");
      setIsEdit(false);
      setIsEditID(undefined);
    } else {
      let data = {
        id: new Date().getTime(),
        text: text,
      };
      setList([data, ...list]);
      setText("");
    }
    localStorage.setItem("todo", JSON.stringify(list));
  };

  const editList = (list: dataTypes) => {
    setText(list.text);
    setIsEdit(true);
    setIsEditID(list.id);
  };

  // const deletList = (id: number) => {
  //   setList(list.filter((e) => e.id !== id));
  //   localStorage.setItem("todo", JSON.stringify(list));
  // };

  const deletList = (id: number) => {
    // Create a copy of the current state to avoid directly modifying it
    const updatedList = list.filter((e) => e.id !== id);

    // Update the state directly
    setList(updatedList);

    // Update localStorage
    localStorage.setItem("todo", JSON.stringify(updatedList));
  };

  return (
    <>
      <h2>Todo List</h2>
      <div>
        <form onSubmit={addValue}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {!isEdit ? (
            <button type="submit">Add</button>
          ) : (
            <button type="submit">Edit</button>
          )}
        </form>
      </div>
      {list && list.length > 0 && (
        <div className="list">
          <ul>
            {list.map((list) => (
              <li key={list.id}>
                {list.text}
                <button onClick={() => deletList(list.id)}>Del</button>
                <button onClick={() => editList(list)}>Edt</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Todos;
