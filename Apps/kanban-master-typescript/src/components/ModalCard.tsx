import React, { ChangeEvent, useEffect, useState } from "react";
import TitleIcon from "@mui/icons-material/Title";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Editable from "./Editable";
import moment from "moment";
import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { CardTypes, LabelTypes, TaskTypes } from "@/app/page";

interface ModalPageType {
  bid: number;
  card: CardTypes;
  setshowModal: (value: boolean) => void;
  updateCard: (bid: number, cid: number, card: CardTypes) => void;
}

const ModalCard = ({ card, setshowModal, updateCard, bid }: ModalPageType) => {
  const [selectedColor, setselectedColor] = useState<string>("");
  const [values, setValues] = useState(card);

  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const updateTitle = (value: string) => {
    setValues({ ...values, title: value });
  };

  const updateDescription = (value: string) => {
    setValues({ ...values, description: value });
  };

  // const updateDate = (date: string) => {
  //   setValues({
  //     ...values,
  //     date: date,
  //   });
  // };

  const updateDate = (dateString: string) => {
    // Convert the string date to a JavaScript Date object
    const dateObject = new Date(dateString);

    // Check if the conversion was successful
    if (!isNaN(dateObject.getTime())) {
      setValues({
        ...values,
        date: dateObject,
      });
    } else {
      // Handle invalid date string
      console.error("Invalid date string:", dateString);
    }
  };

  const addLabel = (label: { text: string; color: string }) => {
    setValues({
      ...values,
      labels: [...(values?.labels || []), label],
    });
    setselectedColor("");
  };

  const removeLabel = (label: LabelTypes) => {
    const tempLabels = values?.labels?.filter(
      (item) => item.text !== label.text
    );

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const addTask = (value: string) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setValues({
      ...values,
      tasks: [...(values?.tasks || []), task],
    });
  };

  const removeTask = (id: number) => {
    const tasks = [...(values.tasks || [])];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setValues({
      ...values,
      tasks: tempTasks,
    });
  };

  const updateTask = (id: number, value: boolean) => {
    const tasks = [...(values.tasks || [])];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = value;

    setValues({
      ...values,
      tasks,
    });
  };

  const handleContentClick = (e: React.FormEvent) => {
    e.stopPropagation();
  };

  const handleModalClick = () => {
    setshowModal(false);
  };

  useEffect(() => {
    if (updateCard) updateCard(bid, values.id, values);
  }, [values]);

  return (
    <div className="modal" onClick={handleModalClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <div className="modal-header">
          <h3>
            Edit <span style={{ color: "#f00" }}>{values.title}</span>
          </h3>
          <Button className="modal-close" onClick={handleModalClick}>
            <ClearOutlinedIcon />
          </Button>
        </div>
        <div className="modal-body">
          <div className="single-edit">
            <div className="field-edit">
              <TitleIcon /> <h4>Title</h4>
            </div>
            <Editable
              text="Add Title"
              defaultValue={values.title || "Add Title"}
              onSubmit={updateTitle}
            />
          </div>

          <div className="single-edit">
            <div className="field-edit">
              <FormatListBulletedIcon /> <h4>Description</h4>
            </div>
            <Editable
              text="Add Description"
              defaultValue={values.description || "Add Description"}
              onSubmit={updateDescription}
            />
          </div>

          <div className="single-edit">
            <div className="field-edit">
              <CalendarTodayIcon /> <h4>Date</h4>
            </div>
            <TextField
              className="value-edit"
              type="date"
              defaultValue={moment(values?.date).format("YYYY-MM-DD")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateDate(e.target.value)
              }
              size="small"
              id="outlined-basic"
              label="Select Date"
              variant="outlined"
            />
          </div>

          <div className="single-edit">
            <div className="field-edit">
              <BookmarksOutlinedIcon /> <h4>Labels</h4>
            </div>
            <div className="labels-wrapper">
              <Stack direction="row" spacing={1}>
                {values.labels &&
                  values.labels.length > 0 &&
                  values.labels.map((label) => (
                    <Chip
                      className="single-label"
                      style={{ backgroundColor: label.color }}
                      label={label.text}
                      onDelete={() => removeLabel(label)}
                    />
                  ))}
              </Stack>
              <div className="color-wrapper">
                {colors.map((color, i) => (
                  <span
                    onClick={() => setselectedColor(color)}
                    className={`${
                      selectedColor === color ? "active-color" : ""
                    }`}
                    key={i}
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </div>
            <Editable
              text="Add Label"
              onSubmit={(value) =>
                addLabel({ color: selectedColor, text: value })
              }
            />
          </div>
          <div className="single-edit">
            <div className="field-edit">
              <PlaylistAddOutlinedIcon /> <h4>Tasks</h4>
            </div>
            {values.tasks &&
              values.tasks.length > 0 &&
              values.tasks.map((task) => (
                <div
                  className={`${
                    task.completed ? "single-task complete" : "single-task"
                  }`}
                >
                  <FormControlLabel
                    key={task.id}
                    control={
                      <Checkbox
                        checked={task.completed}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          updateTask(task.id, event.target.checked)
                        }
                      />
                    }
                    label={task.text}
                  />
                  <DeleteOutlineOutlinedIcon
                    className="delete-task"
                    onClick={() => removeTask(task.id)}
                  />
                </div>
              ))}
            <Editable text="Add Task" onSubmit={addTask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
