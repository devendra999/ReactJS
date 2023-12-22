"use client";
import React, { useState, useEffect } from "react";
import Board from "@/components/Board";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "@/components/Navbar";
export interface BoardTypes {
  id: number;
  title: string;
  cards?: CardTypes[];
}
export interface CardTypes {
  id: number;
  title: string;
  labels?: LabelTypes[];
  date: Date;
  tasks?: TaskTypes[];
  description?: string;
}
export interface LabelTypes {
  color?: string;
  text: string;
}
export interface TaskTypes {
  id: number;
  completed: boolean;
  text: string;
}

export default function Home() {
  const [boards, setboards] = useState<BoardTypes[]>(
    JSON.parse(localStorage.getItem("TASKBOARD") ?? "[]") as BoardTypes[]
  );
  const [boardTitle, setboardTitle] = useState<string>("");
  const [boardToggle, setboardToggle] = useState<boolean>(false);

  const addBoard = (e: React.FormEvent) => {
    e.preventDefault();
    const newBoard: BoardTypes = {
      id: new Date().getTime(),
      title: boardTitle,
      cards: [],
    };

    const tempboards = [...boards, newBoard];
    setboards(tempboards);
    setboardTitle("");
    setboardToggle(false);
  };

  const removeBoard = (bid: number) => {
    const tempboards = boards.filter((board) => board.id !== bid);
    setboards(tempboards);
  };

  const addCard = (bid: number, card: CardTypes) => {
    const updatedBoard = boards.map((board) => {
      if (board.id === bid) {
        return {
          ...board,
          cards: [...(board.cards || []), card],
        };
      }
      return board;
    });
    setboards(updatedBoard);
  };

  const removeCard = (bid: number, cid: number) => {
    const updatedBoard = boards.map((board) => ({
      ...board,
      cards: (board.cards || []).filter((card) => card.id !== cid),
    }));

    setboards(updatedBoard);
  };

  const renameBoard = (bid: number, title: string) => {
    const tempBoard = boards.map((board) => {
      if (board.id === bid) {
        return {
          ...board,
          title: title,
        };
      }
      return board;
    });

    setboards(tempBoard);
  };

  const updateCard = (bid: number, cid: number, card: CardTypes) => {
    // 1st way updated it
    // const index = boards.findIndex((item) => item.id === bid);
    // if (index < 0) return;

    // const tempBoards = [...boards];
    // const cards = tempBoards[index].cards;

    // const cardIndex = (cards || []).findIndex((item) => item.id === cid);
    // if (cardIndex < 0) return;

    // tempBoards[index].cards[cardIndex] = card;

    // 2nd way updated it
    const tempBoards = [...boards];
    const updatedBoards = tempBoards.map((board) => {
      if (board.id === bid) {
        return {
          ...board,
          cards: board?.cards?.map((singleCard) => {
            if (singleCard.id === cid) {
              return {
                ...singleCard,
                ...card,
              };
            }
            return singleCard;
          }),
        };
      }
      return board;
    });

    setboards(updatedBoards);
  };

  useEffect(() => {
    localStorage.setItem("TASKBOARD", JSON.stringify(boards));
  }, [boards]);

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <div className="scroll">
          {boards &&
            boards.length > 0 &&
            boards.map((board) => (
              <Board
                key={board.id}
                board={board}
                removeBoard={removeBoard}
                addCard={addCard}
                removeCard={removeCard}
                updateCard={updateCard}
                renameBoard={renameBoard}
              />
            ))}

          <div className="single-board">
            {boardToggle ? (
              <form onSubmit={addBoard} className="form">
                <TextField
                  style={{ marginBottom: "0.5rem" }}
                  label="Add Board"
                  value={boardTitle}
                  onChange={(e) => setboardTitle(e.target.value)}
                  size="small"
                  variant="outlined"
                />
                <Button type="submit" size="small" variant="contained">
                  Add
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setboardToggle(false);
                    setboardTitle("");
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
                onClick={() => setboardToggle(true)}
              >
                Add Board
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
