import React, { useState } from "react";
import { MoreVertical, Plus, X } from "react-feather";
import Dropdown from "./Dropdown";
import { Button, TextField } from "@mui/material";
import Cards from "./Cards";

const Boards = (props) => {
  const [showDropdown, setshowDropdown] = useState(false);
  const [cardToggle, setcardToggle] = useState(false);
  const [cardTitle, setcardTitle] = useState("");

  const handleCard = (e) => {
    e.preventDefault();
    const newCard = {
      id: new Date().getTime(),
      title: cardTitle,
      date: new Date(),
      description: "",
      labels: [],
      tasks: [],
    };
    props.addCard(props.board?.id, newCard);
    setcardToggle(false);
    setcardTitle("");
  };
  return (
    <>
      <div className="single-board">
        <div className="content">
          <div className="title">
            <h3>{props.board?.title}</h3>
            <div className="dropdown">
              <Button onClick={() => setshowDropdown(!showDropdown)}>
                <MoreVertical />
              </Button>
              {showDropdown && (
                <Dropdown setshowDropdown={setshowDropdown}>
                  <ul>
                    <li>
                      <Button
                        onClick={() => props.removeBoard(props.board?.id)}
                      >
                        Delete Board
                      </Button>
                    </li>
                  </ul>
                </Dropdown>
              )}
            </div>
          </div>
          {props.board?.cards && props.board?.cards.length > 0 && (
            <div className="card-wrapper">
              {props.board?.cards.map((card) => (
                <Cards
                  Key={card.id}
                  card={card}
                  removeCard={props.removeCard}
                  bordId={props.board?.id}
                  updateCard={props.updateCard}
                />
              ))}
            </div>
          )}

          <div className="s" style={{ marginTop: "1rem" }}>
            {cardToggle ? (
              <div className="form">
                <form onSubmit={handleCard}>
                  <TextField
                    size="small"
                    style={{ marginBottom: "0.5rem" }}
                    label="Add Card"
                    variant="outlined"
                    value={cardTitle}
                    onChange={(e) => setcardTitle(e.target.value)}
                  />
                  <Button variant="contained" size="small" type="submit">
                    Add
                  </Button>
                  <Button size="small" onClick={() => setcardToggle(false)}>
                    <X />
                  </Button>
                </form>
              </div>
            ) : (
              <Button
                size="small"
                fullWidth
                variant="outlined"
                onClick={() => setcardToggle(true)}
              >
                <Plus /> Add Card
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Boards;
