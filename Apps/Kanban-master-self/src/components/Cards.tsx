import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import {
  Calendar,
  CheckSquare,
  MoreHorizontal,
  MoreVertical,
} from "react-feather";
import Dropdown from "./Dropdown";
import Labels from "./Labels";
import Modal from "./Modal";
import CardInfo from "./CardInfo";
import moment from "moment";
import { debug } from "console";

const Cards = (props) => {
  const [showDropdown, setshowDropdown] = useState(false);
  const [showModal, setshowModal] = useState(false);
  //   console.log(props);
  return (
    <>
      <div
        className="single-card"
        onClick={(event) => {
          setshowModal(true);
        }}
      >
        <div className="content">
          <div className="title">
            <h5>{props.card?.title}</h5>
            <div className="dropdown">
              <Button
                className="hello"
                onClick={(e) => {
                  e.stopPropagation();
                  setshowDropdown(!showDropdown);
                }}
              >
                <MoreHorizontal />
              </Button>
              {showDropdown && (
                <Dropdown setshowDropdown={setshowDropdown}>
                  <ul>
                    <li>
                      <Button
                        onClick={() =>
                          props.removeCard(props?.bordId, props.card?.id)
                        }
                      >
                        Delete Card
                      </Button>
                    </li>
                  </ul>
                </Dropdown>
              )}
            </div>
          </div>
          {props.card?.labels && props.card?.labels.length > 0 && (
            <Stack direction="row" spacing={1}>
              {props.card?.labels.map((label) => (
                <Labels key={label?.text} label={label} />
              ))}
            </Stack>
          )}

          {/* card-detail */}
          <div className="detail">
            <div className="date single-detail">
              <Calendar />
              {props.card?.date
                ? moment(props.card?.date).format("Do MMM YYYY")
                : "Not set"}
            </div>
            <div className="task single-detail">
              <CheckSquare /> {props.card?.tasks?.length}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal setshowModal={setshowModal}>
          <CardInfo
            bordId={props.bordId}
            updateCard={props.updateCard}
            card={props.card}
          />
        </Modal>
      )}
    </>
  );
};

export default Cards;
