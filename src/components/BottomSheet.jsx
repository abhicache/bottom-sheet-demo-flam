import React, { useState } from 'react'
import './BottomSheet.css' 
const BottomSheet = ({children}) => {

    const [position, setPosition] = useState('bottom')
  return (
     <>
      <div className="demo-controls">
        <button onClick={() => setPosition('closed')}>Closed</button>
        <button onClick={() => setPosition('half')}>Half</button>
        <button onClick={() => setPosition('full')}>Full</button>
      </div>
      <div className={`bottom-sheet bottom-sheet--${position}`}>
        <div className="bottom-sheet__handle"></div>
        <div className="bottom-sheet__content">
          {children}
        </div>
      </div>
    </>
  )
}

export default BottomSheet