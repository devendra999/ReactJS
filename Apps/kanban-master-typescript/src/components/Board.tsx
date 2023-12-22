// Assuming BoardTypes is in 'app/page.ts'
import React, { useState } from "react";
import { BoardTypes, CardTypes } from "../app/page";
import Card from "./Card";
import { Button, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "../components/Dropdown";
import CloseIcon from "@mui/icons-material/Close";

interface BoardPageType {
  board: BoardTypes;
  removeBoard: (id: number) => void;
  addCard: (bid: number, card: CardTypes) => void;
  removeCard: (bid: number, cid: number) => void;
  updateCard: (bid: number, cid: number, card: CardTypes) => void;
  renameBoard: (bid: number, title: string) => void;
}

const Board = ({
  board,
  removeBoard,
  addCard,
  removeCard,
  updateCard,
  renameBoard,
}: BoardPageType) => {
  const [showDropdown, setshowDropdown] = useState(false);
  const [cardToggle, setcardToggle] = useState<boolean>(false);
  const [cardTitle, setcardTitle] = useState<string>("");
  const [titleToggle, settitleToggle] = useState<boolean>(false);
  const [titleToggleID, settitleToggleID] = useState<number>(0);
  const [boardTitle, setboardTitle] = useState<string>("");

  const cardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: CardTypes = {
      id: new Date().getTime(),
      title: cardTitle,
      date: new Date(),
      description: "",
      labels: [],
      tasks: [],
    };
    addCard(board.id, newCard);
    setcardTitle("");
    setcardToggle(false);
  };

  const renameBoardTitle = (bid: number) => {
    settitleToggle(true);
    settitleToggleID(bid);
    setboardTitle(board.title);
  };

  const newTitle = (e: React.FormEvent) => {
    e.preventDefault();
    renameBoard(titleToggleID, boardTitle);
    settitleToggle(false);
    settitleToggleID(0);
    setboardTitle("");
    setshowDropdown(false);
  };

  return (
    <>
      <div className="single-board">
        <div className="title">
          {titleToggle ? (
            <form onSubmit={newTitle} className="title-area">
              <TextField
                label="Title"
                variant="filled"
                size="small"
                value={boardTitle}
                onChange={(e) => setboardTitle(e.target.value)}
              />
              <Button type="submit" variant="contained" size="small">
                Save
              </Button>
            </form>
          ) : (
            <>
              <h3>{board.title}</h3>
              <div className="dropdown">
                <Button onClick={() => setshowDropdown(true)}>
                  <MoreVertIcon />
                </Button>
                {showDropdown && (
                  <Dropdown setshowDropdown={setshowDropdown}>
                    <li onClick={() => renameBoardTitle(board.id)}>
                      Rename board
                    </li>
                    <li onClick={() => removeBoard(board.id)}>Delete board</li>
                  </Dropdown>
                )}
              </div>
            </>
          )}
        </div>
        <div className="cards-wrapper">
          {board.cards &&
            board.cards.length > 0 &&
            board.cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                removeCard={removeCard}
                bid={board.id}
                updateCard={updateCard}
              />
            ))}

          <div className="add-card">
            {cardToggle ? (
              <form onSubmit={cardSubmit} className="form">
                <TextField
                  fullWidth
                  style={{ marginBottom: "0.5rem" }}
                  label="Add Card"
                  value={cardTitle}
                  onChange={(e) => setcardTitle(e.target.value)}
                  size="small"
                  variant="outlined"
                />
                <Button type="submit" size="small" variant="contained">
                  Add
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setcardToggle(false);
                    setcardTitle("");
                  }}
                >
                  <CloseIcon />
                </Button>
              </form>
            ) : (
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => setcardToggle(true)}
              >
                Add Card
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
