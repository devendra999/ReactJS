import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";
import CardEdit from "./CardEdit";
import {
  Checkbox,
  Chip,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import moment from "moment";

const CardInfo = (props) => {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [selectedColor, setSelectedColor] = useState();
  const [values, setValues] = useState({
    ...props.card,
  });

  console.log(values);

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, description: value });
  };

  const updateDate = (date) => {
    if (!date) return;

    setValues({
      ...values,
      date,
    });
  };

  const addLabel = (label) => {
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setSelectedColor("");
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setValues({
      ...values,
      tasks: [...values.tasks, task],
    });
  };

  const removeTask = (id) => {
    const tasks = [...values.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setValues({
      ...values,
      tasks: tempTasks,
    });
  };

  const updateTask = (id, value) => {
    const tasks = [...values.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = value;

    setValues({
      ...values,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!values.tasks?.length) return 0;
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100;
  };

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.bordId, values.id, values);
  }, [values]);

  //   console.log(values);
  return (
    <div className="modal-body">
      <div className="single-edit-field">
        <div className="d-flex align-items-center edit-title">
          <Type />
          <h4>Title</h4>
        </div>
        <div className="editable-field">
          {
            <CardEdit
              defaultValue={values.title}
              text={values.title}
              placeholder="Enter Title"
              onSubmit={updateTitle}
            />
          }
        </div>
      </div>

      <div className="single-edit-field">
        <div className="d-flex align-items-center edit-title">
          <List />
          <h4>Description</h4>
        </div>
        <div className="editable-field">
          {
            <CardEdit
              defaultValue={values.description}
              text={values.description || "Add a Description"}
              onSubmit={updateDesc}
              placeholder="Enter description"
            />
          }
        </div>
      </div>

      <div className="single-edit-field">
        <div className="d-flex align-items-center edit-title">
          <Calendar />
          <h4>Date</h4>
        </div>
        <TextField
          type="date"
          size="small"
          defaultValue={moment(values?.date).format("YYYY-MM-DD")}
          onChange={(event) => updateDate(event.target.value)}
        />
      </div>

      <div className="single-edit-field">
        <div className="d-flex align-items-center edit-title">
          <Tag />
          <h4>Labels</h4>
        </div>
        <div className="cardinfo-labels">
          <Stack direction="row" spacing={1}>
            {values.labels?.map((item, index) => (
              <Chip
                key={index}
                label={item.text}
                style={{ backgroundColor: item.color, color: "#fff" }}
                onDelete={() => removeLabel(item)}
              />
            ))}
          </Stack>
        </div>
        <ul className="color-groups">
          {colors.map((item, index) => (
            <li
              key={index + item}
              style={{ backgroundColor: item }}
              className={selectedColor === item ? "li_active" : ""}
              onClick={() => setSelectedColor(item)}
            />
          ))}
        </ul>
        <div className="editable-field">
          <CardEdit
            text="Add Label"
            placeholder="Add Label"
            onSubmit={(value) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </div>
      </div>

      <div className="single-edit-field cardinfo_box">
        <div className="d-flex align-items-center edit-title">
          <CheckSquare />
          <h4>Tasks</h4>
        </div>
        {values.tasks && values.tasks.length > 0 && (
          <div className="cardinfo_box_progress-bar">
            <div
              className="cardinfo_box_progress"
              style={{
                width: `${calculatePercent()}%`,
                backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
              }}
            />
          </div>
        )}

        <div className="cardinfo_box_task_list">
          {values.tasks?.map((item) => (
            <div key={item.id} className="cardinfo_box_task_checkbox">
              <FormControlLabel
                className={item.completed ? "completed" : ""}
                control={
                  <Checkbox
                    size="small"
                    checked={item.completed}
                    onChange={(event) =>
                      updateTask(item.id, event.target.checked)
                    }
                  />
                }
                label={item.text}
              />
              <Trash
                className="close-task"
                onClick={() => removeTask(item.id)}
              />
            </div>
          ))}
        </div>
        <CardEdit
          text="Add a Task"
          placeholder="Add a Task"
          onSubmit={addTask}
        />
      </div>
    </div>
  );
};

export default CardInfo;
