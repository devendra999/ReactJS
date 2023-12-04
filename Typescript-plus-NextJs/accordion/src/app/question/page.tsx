"use client";
import React, { useState } from "react";
import db from "@/db";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface QuestionProps {
  id: number;
  title: string;
  info: string;
}

const Questions = () => {
  const [questions, setQuestions] = useState<QuestionProps[]>(db);
  const [index, setIndex] = useState<number>(1);
  return (
    <>
      {questions &&
        questions.length > 0 &&
        questions.map((question) => {
          return (
            <div className="card" key={question.id}>
              <div className="title">
                {question.title}
                <div className="icons" onClick={(e) => setIndex(question.id)}>
                  {question.id === index ? (
                    <RemoveCircleIcon />
                  ) : (
                    <AddCircleIcon />
                  )}
                </div>
              </div>
              {question.id === index && (
                <div className="info">{question.info}</div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default Questions;
