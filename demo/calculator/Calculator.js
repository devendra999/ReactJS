import React, { useState } from 'react'
import './calculator.scss'

const Calculator = () => {
    const [result, setresult] = useState('');

    const eventHandler = (event) => {
        console.log('hello')
        setresult(result.concat(event.target.value));
    }

    const clearResult = () => {
        setresult('');
    }

    const calculateResult = () => {
        setresult(eval(result).toString());
    }

  return (
    <div className="section">
        <div className="container">
            <h4>Calculator</h4>
            <div className="calc">
                <input type="text" value={result} placeholder='0' />
                <div className="button">
                    <button onClick={eventHandler} type='button' value="9">9</button>
                    <button onClick={eventHandler} type='button' value="8">8</button>
                    <button onClick={eventHandler} type='button' value="7">7</button>
                    <button onClick={eventHandler} type='button' value="+">+</button>
                    <button onClick={eventHandler} type='button' value="6">6</button>
                    <button onClick={eventHandler} type='button' value="5">5</button>
                    <button onClick={eventHandler} type='button' value="4">4</button>
                    <button onClick={eventHandler} type='button' value="-">-</button>
                    <button onClick={eventHandler} type='button' value="3">3</button>
                    <button onClick={eventHandler} type='button' value="2">2</button>
                    <button onClick={eventHandler} type='button' value="1">1</button>
                    <button onClick={eventHandler} type='button' value="*">*</button>
                    <button onClick={clearResult} type='button'>Clear</button>
                    <button onClick={eventHandler} type='button' value="0">0</button>
                    
                    
                    
                    <button onClick={calculateResult} type='button' value="6">=</button>
                    <button onClick={eventHandler} type='button' value="/">/</button>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Calculator