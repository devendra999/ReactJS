import React, { useState, useMemo } from "react";

const UseMemo = () => {
    const [myNum, setMyNum] = useState(0);
    const [show, setShow] = useState(false);

    const getValue = () => {
        return setMyNum(myNum + 1);
    };

    const countNumber = (num) => {
        console.log("🚀 ~ file: Memo.jsx ~ line 12 ~ countNumber ~ num", num);
        for (let i = 0; i <= 1000000000; i++) { }
        return num;
    };

    // subscribe to thapa technical

    const checkData = useMemo(() => {
        return countNumber(myNum);
    }, [myNum]);

  return (
    <div className="sectin">
        <div className="container">
            <button onClick={getValue} style={{ backgroundColor: "red" }}>
                Counter
            </button>
            <p> My new number : {checkData} </p>
            <button onClick={() => setShow(!show)}>
                {show ? "You clicked me" : "Click me plz"}
            </button>
        </div>
    </div>
  )
}

export default UseMemo