import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

let clearWatch;

function App() {
  const [watch, setWatch] = useState(0);
  const [isStart, setIsStart] = useState(false);

  const startWatch = () => { 
    clearWatch = setInterval(() => {
      setWatch((x) => x + 1);
    }, 1000);
    setIsStart(true);
  }

  const stoptWatch = () => { 
    clearInterval(clearWatch);
    setIsStart(false);
  }

  const resetWatch = () => { 
    setWatch(0);
    clearInterval(clearWatch);
    setIsStart(false);
  }


  return <>
    <h2 className="text-center">Start Stop Watch</h2>
    <h2 className="text-center">{watch}</h2>
    <div className="text-center">
      <button disabled={isStart} onClick={startWatch}>start</button>
      <button onClick={stoptWatch}>stop</button>
      <button onClick={resetWatch}>reset</button>
    </div>
  </>;
}

export default App;
