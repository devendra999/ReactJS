import React, { useState } from 'react'
import { quizDB } from './quizeDb'


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showScore, setShowScore] = useState(false)

    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < quizDB.length-1) {
            setCurrentQuestion(currentQuestion + 1)
            setClickedOption(0);
        } else {
            setShowScore(true)
        }
    }
    const updateScore = () => {
        if (clickedOption === quizDB[currentQuestion].answer) {
            setScore(score + 1);
        }
    }

    const gameReset = () => {
        setCurrentQuestion(0)
        setScore(0)
        setClickedOption(0)
        setShowScore(false)
    }

  return (
    <>
          <div className="section">
              <div className="quize-wrapper">
                  {showScore == false &&
                  <div id="quiz">
                          <h2 className="question">{`${currentQuestion + 1}. ${quizDB[currentQuestion].question}`}</h2>
                      <div className="answer-wrapper">
                            {quizDB[currentQuestion].options.map((e, i) => {
                                return <div className={`mb-3  ${clickedOption == i + 1 && "checked"}`} 
                                        key={i} 
                                        onClick={() => setClickedOption(i + 1)}
                                        >
                                            <input type="radio" name="answer" className="form-control answer" id={`ans-${i}`} />
                                            <label htmlFor={`ans-${i}`} className="form-label answer1">{`${i+1} ${e}`}</label>
                                        </div>
                            })}
                          
                      </div>
                      <button id="submit" onClick={changeQuestion}>Submit</button>
                  </div>
                  }
                  {showScore == true &&
                    <div id="score-area">
                          <h5>Your score {score} / {quizDB.length} </h5>
                          <button id='playAgain' onClick={gameReset}>Play Again</button>
                    </div>
                  }
              </div>
          </div>
    </>
  )
}

export default Quiz