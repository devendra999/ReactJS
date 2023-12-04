// Import necessary modules
"use client";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

// Define the shape of the data you expect from the API
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// React component
const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchAndSetData = async (): Promise<Todo[]> => {
    try {
      const response: AxiosResponse<Todo[]> = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  return (
    <div>
      <h1>Todos from API</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
          <p>{todo.completed ? "Completed" : "Not Completed"}</p>
        </div>
      ))}
    </div>
  );
};

export default Todos;
