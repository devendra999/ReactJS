import React, { useRef, useState } from 'react'

const LiveColorChange = () => {
    const [color, setcolor] = useState('#000000')
    const value = useRef(0);
  return (
    <>
        <div className="livecolorchange">
            <div className="container">
                  <h1 style={{ color: color }}>Hello User</h1>
                  <input ref={value} onChange={(e) => setcolor(e.target.value)} type="color" />
            </div>
        </div>
    </>
  )
}

export default LiveColorChange