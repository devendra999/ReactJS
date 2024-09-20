"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [tasks, setTasks] = useState([
    {
      id: 455,
      category: "todo",
      cards: [
        {
          id: 214,
          title: "card 2",
        },
        {
          id: 2145454,
          title: "card 3",
        },
      ],
    },
    {
      id: 456,
      category: "progress",
      cards: [
        {
          id: 21,
          title: "card 1",
        },
      ],
    },
    {
      id: 4568788,
      category: "completed",
      cards: [
        {
          id: 454521,
          title: "card sdfds 1",
        },
      ],
    },
  ]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, seteditData] = useState(null);

  const category = tasks.map((cat) => cat.category);

  const addTask = (data, category: string, title: string) => {
    if (isEdit) {
      const updatedData = {
        id: data?.id,
        title,
        category,
      };
      let tempTask = tasks.map((board) => {
        // Check if the current board is the old category
        if (board?.category === data?.category) {
          return {
            ...board,
            cards: board.cards?.filter((card) => card?.id !== data?.id), // Remove the card from old category
          };
        }
        // Check if the current board is the new category
        if (board?.category === category) {
          return {
            ...board,
            cards: [...board.cards, updatedData], // Add the card to new category
          };
        }
        return board; // Return the original board if category doesn't match
      });

      setTasks(tempTask);
      setIsEdit(false);
      seteditData(null);
    } else {
      let payload = {
        id: new Date().getTime(),
        ...data,
      };

      let newTasksks = tasks.map((e) => {
        if (e.category === payload?.category) {
          return {
            ...e,
            cards: [...e.cards, payload],
          };
        }
        return e;
      });
      setTasks(newTasksks);
    }
  };

  const editTask = (card, bid) => {
    let cardData;

    const board = tasks.find((e) => {
      if (e.id === bid) {
        return e;
      }
    });

    if (board) {
      cardData = board.cards?.find((e) => e.id === card.id);
    }

    let alldata = {
      category: board?.category,
      ...cardData,
    };

    setIsEdit(true);
    seteditData(alldata);
  };

  return (
    <>
      <div className="container">
        <div className="new-task">
          <AddNewTask
            allcategory={category}
            addTask={addTask}
            isEdit={isEdit}
            editData={editData}
          />
        </div>
        <div className="main-bg">
          {tasks.map((board, index) => (
            <BoardItem key={index} board={board} editTask={editTask} />
          ))}
        </div>
      </div>
    </>
  );
}

const BoardItem = (props) => {
  return (
    <>
      <div className="single-board">
        <h4>{props?.board?.category}</h4>
        {props?.board?.cards?.map((card, index) => (
          <CardItem
            key={index}
            card={card}
            editTask={props?.editTask}
            bid={props?.board?.id}
          />
        ))}
      </div>
    </>
  );
};

const CardItem = (props) => {
  return (
    <>
      <div className="single-card">
        <h4>{props?.card?.title}</h4>
        <button onClick={() => props?.editTask(props?.card, props?.bid)}>
          edit card
        </button>
      </div>
    </>
  );
};

const AddNewTask = (props) => {
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (props?.isEdit) {
      props?.addTask(props?.editData, category, title);
      settitle("");
      setcategory("");
    } else {
      const data = {
        title,
        category,
      };
      props?.addTask(data);
      settitle("");
      setcategory("");
    }
  };

  useEffect(() => {
    if (props.editData) {
      settitle(props.editData.title || "");
      setcategory(props.editData.category || "");
    }
  }, [props.editData]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option>select category</option>
            {props?.allcategory?.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <button type={"submit"}>
            {props?.isEdit ? "edit task" : "add task"}
          </button>
        </div>
      </form>
    </>
  );
};
