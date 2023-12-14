"use client";

import Boards from "@/components/Boards";
import Navbar from "@/components/Navbar";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Plus, X } from "react-feather";

export default function Home() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );
  const [boardTitle, setboardTitle] = useState("");
  const [boardToggle, setboardToggle] = useState(false);

  const addBoard = (e) => {
    e.preventDefault();
    const board = {
      id: new Date().getTime(),
      title: boardTitle,
      cards: [],
    };

    const tempBoards = [...boards, board];
    setBoards(tempBoards);
    setboardTitle("");
    setboardToggle(false);
  };

  const removeBoard = (id) => {
    const tempBoards = boards.filter((board) => board.id !== id);
    setBoards(tempBoards);
  };

  const addCard = (bid, card) => {
    console.log(card);
    const updatedBoard = boards.map((board) => {
      if (board.id === bid) {
        return {
          ...board,
          cards: [...board.cards, card], // Add the new item to the items array
        };
      }
      return board;
    });
    setBoards(updatedBoard);
  };

  const removeCard = (bid, cid) => {
    const updatedBoard = boards.map((board) => ({
      ...board,
      cards: board?.cards.filter((card) => card.id !== cid),
    }));

    setBoards(updatedBoard);
  };

  const updateCard = (bid, cid, card) => {
    // console.log(bid, cid, card, "updated card");
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);

  return (
    <div className="main-wrapper">
      <Navbar />
      <div className="scroll">
        {boards &&
          boards.length > 0 &&
          boards.map((board) => (
            <Boards
              key={board.id}
              board={board}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              updateCard={updateCard}
            />
          ))}

        <div className="single-board">
          <div className="content">
            {boardToggle ? (
              <div className="form">
                <form onSubmit={addBoard}>
                  <TextField
                    style={{ marginBottom: "0.5rem" }}
                    size="small"
                    label="Add Board"
                    variant="outlined"
                    value={boardTitle}
                    onChange={(e) => setboardTitle(e.target.value)}
                  />
                  <Button variant="contained" size="small" type="submit">
                    Add
                  </Button>
                  <Button size="small" onClick={() => setboardToggle(false)}>
                    <X />
                  </Button>
                </form>
              </div>
            ) : (
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setboardToggle(true)}
              >
                <Plus /> Add Board
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
