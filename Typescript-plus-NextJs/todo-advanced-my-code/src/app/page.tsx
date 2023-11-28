"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@mui/material/Typography";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const getLocalData = () => {
  let data: string | null = localStorage.getItem("todo");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export default function Home() {
  const searchParams = useSearchParams();
  const filterButton = searchParams.get("todos");
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(getLocalData());
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditID, setIsEditID] = useState<number | undefined>();

  const addTodo = (e: FormEvent) => {
    e.preventDefault();

    if (text && !isEdit) {
      const newTodo: Todo = {
        id: Math.random(),
        text: text,
        completed: false,
        createdAt: new Date(),
      };

      setTodos((prev) => [newTodo, ...prev]);
      setText("");
    } else if (text && isEdit && isEditID !== undefined) {
      const updatedTodos = todos.map((todo) =>
        todo.id === isEditID ? { ...todo, text: text } : todo
      );

      setTodos(updatedTodos);
      setIsEdit(false);
      setIsEditID(undefined);
      setText("");
    }
    localStorage.setItem("todo", JSON.stringify(todos));
  };

  const editTodo = (todo: Todo) => {
    setIsEdit(true);
    setIsEditID(todo.id);
    setText(todo.text);
  };

  const completedHandle = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  };

  let filteredTodos = todos;
  if (filterButton === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filterButton === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  //---------------------

  return (
    <div className="main-todo">
      <h2>Todo app</h2>

      <div className="add-todo">
        <form>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Wright Todo"
            variant="outlined"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {isEdit ? (
            <Button onClick={addTodo} type="button" variant="contained">
              <EditIcon />
            </Button>
          ) : (
            <Button onClick={addTodo} type="button" variant="contained">
              <AddIcon />
            </Button>
          )}
        </form>
      </div>

      <div className="nav-list">
        <Link href="/">
          <Button
            type="button"
            variant={filterButton === null ? "contained" : "outlined"}
          >
            All
          </Button>
        </Link>
        <Link href="?todos=active">
          <Button
            type="button"
            variant={filterButton === "active" ? "contained" : "outlined"}
          >
            Active
          </Button>
        </Link>
        <Link href="?todos=completed">
          <Button
            type="button"
            variant={filterButton === "completed" ? "contained" : "outlined"}
          >
            Completed
          </Button>
        </Link>
      </div>

      {filteredTodos && filteredTodos.length > 0 ? (
        <div className="todo-list">
          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id}>
                <Checkbox
                  onChange={() => completedHandle(todo.id)}
                  checked={todo.completed}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                />
                <span className={todo.completed ? "complete text" : "text"}>
                  {todo.text}
                </span>
                {todo.completed && (
                  <>
                    <Button
                      onClick={() => editTodo(todo)}
                      type="button"
                      variant="outlined"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      className="remove"
                      onClick={() => deleteTodo(todo.id)}
                      type="button"
                      variant="outlined"
                    >
                      <DeleteOutlineIcon />
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="todo-list">
          <Typography variant="h5" gutterBottom>
            No Data Available here
          </Typography>
        </div>
      )}
    </div>
  );
}
