"use client";
import React, { useState } from "react";
import db from "@/db";
import SingleQuestion from "@/components/SingleQuestion";

interface QuestionProps {
  id: number;
  title: string;
  info: string;
}

const MultipleShow = () => {
  const [questions, setQuestions] = useState<QuestionProps[]>(db);
  const [index, setIndex] = useState<number>(1);

  return (
    <>
      {questions &&
        questions.length > 0 &&
        questions.map((question: QuestionProps) => {
          return <SingleQuestion key={question.id} question={question} />;
        })}
    </>
  );
};

export default MultipleShow;
