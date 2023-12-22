import React, { useState } from "react";
import { CardTypes } from "../app/page";
import Label from "./Label";
import moment from "moment";
import { Button, Stack } from "@mui/material";
import Dropdown from "./Dropdown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModalCard from "./ModalCard";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export interface CardPageType {
  card: CardTypes;
  bid: number;
  removeCard: (bid: number, cid: number) => void;
  updateCard: (bid: number, cid: number, card: CardTypes) => void;
}

const Card = ({ card, removeCard, bid, updateCard }: CardPageType) => {
  const [showDropdown, setshowDropdown] = useState<boolean>(false);
  const [showModal, setshowModal] = useState<boolean>(false);

  const totalTask = card.tasks?.length;
  const compTotalTask = card.tasks?.filter((task) => task.completed === true);

  return (
    <>
      <div className="single-card" onClick={() => setshowModal(true)}>
        <div className="card-title">
          <h4>{card.title}</h4>
          <div className="dropdown">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setshowDropdown(true);
              }}
            >
              <MoreHorizIcon />
            </Button>
            {showDropdown && (
              <Dropdown setshowDropdown={setshowDropdown}>
                <li
                  onClick={() => {
                    removeCard(bid, card.id);
                    setshowDropdown(false);
                  }}
                >
                  Delete Card
                </li>
              </Dropdown>
            )}
          </div>
        </div>

        {card.labels && card.labels.length > 0 && (
          <div className="labels-wrapper">
            <Stack direction="row" spacing={1}>
              {card.labels.map((label) => (
                <Label key={label.text} label={label} />
              ))}
            </Stack>
          </div>
        )}

        <div className="card-info">
          <span>
            <CalendarTodayIcon />
            {moment(card.date).format("Do MMM YYYY")}
          </span>
          <span>
            <PlaylistAddOutlinedIcon />
            {`${compTotalTask?.length}/${totalTask}`}
          </span>
        </div>
      </div>

      {showModal && (
        <ModalCard
          card={card}
          setshowModal={setshowModal}
          bid={bid}
          updateCard={updateCard}
        />
      )}
    </>
  );
};

export default Card;
