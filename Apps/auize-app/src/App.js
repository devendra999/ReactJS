import { useState } from "react";
import { questions } from "./Questions";

function App() {
  const [qut, setqut] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // handle answer change function
  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  // submit button
  const submitAnswer = () => {
    // Get the correct answer from the current question
    const correctAnswer = questions[qut]?.answers?.find(
      (answer) => answer.correct
    );
    console.log(correctAnswer)

    // Check if the selected answer is correct
    const isCorrect = selectedAnswer === correctAnswer?.text;

    if (isCorrect) {
      setScore(score + 1);
    }

    // You can update the score or perform other actions based on the correctness

    if (qut < questions.length - 1) {
      setqut(qut + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    } else {
      setShowScore(true);
    }
    setSelectedAnswer(null);
    console.log(score);
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="modal_body shadow">
        <div className="head">
          <h2>
            {`${qut + 1}. `} {questions[qut]?.question}
          </h2>
        </div>
        <div className="question">
          {questions[qut]?.answers?.map((elem, index) => {
            return (
              <div className="single" key={index}>
                <input
                  type="radio"
                  id={elem?.text}
                  name="answer"
                  value={elem?.text}
                  checked={selectedAnswer === elem?.text}
                  onChange={handleAnswerChange}
                />
                <label htmlFor={elem?.text}>{elem?.text}</label>
              </div>
            );
          })}
        </div>
        <div className="footer">
          {showScore ? (
            <div className="score-area">
              <h3 className="text-center">
                Your Score: {`${score} / ${questions.length}`}
              </h3>
              <button
                onClick={() => {
                  setShowScore(false);
                  setqut(0);
                  setScore(0);
                }}
              >
                Play Again
              </button>
            </div>
          ) : (
            <button
              disabled={selectedAnswer === null}
              type="submit"
              onClick={submitAnswer}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
