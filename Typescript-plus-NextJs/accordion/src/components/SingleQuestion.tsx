"use client";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface SingleQuestionProps {
  question: {
    id: number;
    title: string;
    info: string;
  };
}

const SingleQuestion = ({ question }: SingleQuestionProps) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <div className="card" key={question.id}>
      <div className="title">
        {question.title}
        <div className="icons" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <RemoveCircleIcon /> : <AddCircleIcon />}
        </div>
      </div>
      {showInfo && <div className="info">{question.info}</div>}
    </div>
  );
};

export default SingleQuestion;
