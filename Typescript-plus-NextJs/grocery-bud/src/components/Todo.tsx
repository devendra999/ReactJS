import React from "react";

interface TodoProps {
  item: {
    id: number;
    checked: boolean;
    text: string;
  };
}

const Todo: React.FC<TodoProps> = ({ item }) => {
  const handleCheckbox = () => {
    return !item.checked;
  };

  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={handleCheckbox}
        />
        {item.text}
        <button onClick={() => removeTodo(item.id)}>delet</button>
      </li>
    </>
  );
};

export default Todo;
