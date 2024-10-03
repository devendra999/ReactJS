"use client";

import { FormEvent, useEffect, useState } from "react";

interface CardType {
  id: number;
  title: string;
}

interface TaskType {
  category: string;
  cards: CardType[];
}

interface BoardItemProps {
  board: TaskType;
  editCard: (data: CardType, category: string) => void;
}

interface CardItemProps {
  task: CardType;
  editCard: (data: CardType, category: string) => void;
  category: string;
}

interface CategoryProps {
  category: string[];
  handleTask: (data: { title: string; category: string }) => void;
  isEdit: { title: string; category: string; oldCategory: string; id?: number | null };
  editable: boolean;
}

export default function Home() {
  const [task, setTask] = useState<TaskType[]>([
    {
      category: "todo",
      cards: [
        { id: 454, title: "card 1" },
        { id: 455454, title: "card 2" },
        { id: 454878754, title: "card 3" },
      ],
    },
    {
      category: "progress",
      cards: [
        { id: 455454545454, title: "card pro 2" },
        { id: 4548765655458754, title: "card pro 3" },
      ],
    },
    {
      category: "completed",
      cards: [{ id: 4554546565545454, title: "card com 2" }],
    },
  ]);

  const [editable, setEditable] = useState(false);
  const [isEdit, setIsEdit] = useState({
    title: "",
    category: "",
    oldCategory: "",
    id: null,
  });

  const category: string[] = task.map((cat) => cat.category);

  const editCard = (data: CardType, category: string) => {
    const payload = {
      id: data.id,
      title: data.title,
      oldCategory: category,
      category,
    };
    setIsEdit(payload);
    setEditable(true);
  };

  const handleTask = (data: { title: string; category: string }) => {
    if (editable) {
      const payload = {
        ...data,
        id: isEdit?.id,
      };

      const tempTask = task.map((board) => {
        // Check if the board category matches the payload category
        if (board.category === payload.category) {
          // Check if there is a card with the same ID in the board's cards
          const existingCard = board.cards.find(
            (card) => card.id === payload.id
          );

          // If a matching card is found, update its title
          if (existingCard) {
            return {
              ...board,
              cards: board.cards.map((card) =>
                card.id === payload.id
                  ? { ...card, title: payload.title }
                  : card
              ),
            };
          }

          // If no matching card is found, add the new card
          return {
            ...board,
            cards: [...board.cards, payload], // Add the new card
          };
        }

        // Check if the board category matches the old category (isEdit)
        if (board.category === isEdit.oldCategory) {
          return {
            ...board,
            // Filter out the old card by its ID
            cards: board.cards.filter((card) => card.id !== isEdit.id),
          };
        }

        // If neither condition is met, return the board unchanged
        return board;
      });

      setTask(tempTask);
      setIsEdit({ title: "", category: "", oldCategory: "", id: null });
      setEditable(false);
    } else {
      const payload = {
        ...data,
        id: new Date().getTime(),
      };

      const tempTask = task.map((board) => {
        if (board.category === data.category) {
          return {
            ...board,
            cards: [...board.cards, payload],
          };
        }
        return board;
      });

      setTask(tempTask);
    }
  };

  return (
    <div className="container">
      <h2>Trello Card</h2>
      <TaskForm
        category={category}
        handleTask={handleTask}
        isEdit={isEdit}
        editable={editable}
      />
      <div className="parent-div">
        {task.map((board, index) => (
          <BoardItem key={index} board={board} editCard={editCard} />
        ))}
      </div>
    </div>
  );
}

const BoardItem = (props: BoardItemProps) => {
  return (
    <div className="single-board">
      <h5>{props.board.category}</h5>
      {props.board.cards.map((task, index) => (
        <CardItem
          key={index}
          task={task}
          editCard={props.editCard}
          category={props.board.category}
        />
      ))}
    </div>
  );
};

const CardItem = (props: CardItemProps) => {
  return (
    <div className="single-card">
      <h5>{props.task.title}</h5>
      <button onClick={() => props.editCard(props.task, props.category)}>
        Edit
      </button>
    </div>
  );
};

const TaskForm = (props: CategoryProps) => {
  const [singleTask, setSingleTask] = useState({
    title: "",
    category: "",
  });

  useEffect(() => {
    setSingleTask({
      title: props.isEdit.title,
      category: props.isEdit.category,
    });
  }, [props.isEdit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.handleTask(singleTask);
    setSingleTask({ title: "", category: "" });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={singleTask.title}
            onChange={(e) =>
              setSingleTask({ ...singleTask, title: e.target.value })
            }
          />
        </div>
        <div>
          <select
            value={singleTask.category}
            onChange={(e) =>
              setSingleTask({ ...singleTask, category: e.target.value })
            }
          >
            <option>select category</option>
            {props.category.map((cat, index) => (
              <option value={cat} key={index}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">{props.editable ? "Edit" : "Add"}</button>
        </div>
      </form>
    </div>
  );
};
