import React, { useRef, useState } from 'react'
import './BottomSheet.css' 
const BottomSheet = ({children}) => {

    const [position, setPosition] = useState('closed')
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const sheetRef = useRef(null);

    const snapPoints = {
        closed: 70,
        half: 40,
        full: 0
    };

    const handleStart = (e) => {
    setIsDragging(true);
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart(clientY);
    setCurrentY(clientY);
    };

  const handleMove = (e) => {
    if (!isDragging) return;
    
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setCurrentY(clientY);
    
    const dragDistance = clientY - dragStart;
    const currentSnap = snapPoints[position];

    const newPosition = Math.max(0, Math.min(70, currentSnap + (dragDistance / 10)));
    
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${newPosition}%)`;
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const dragDistance = currentY - dragStart;
    let newPosition = position;
    
    if (dragDistance > 100) {
      if (position === 'full') newPosition = 'half';
      else if (position === 'half') newPosition = 'closed';
    } else if (dragDistance < -100) {
      if (position === 'closed') newPosition = 'half';
      else if (position === 'half') newPosition = 'full';
    }
    
    setPosition(newPosition);

    if (sheetRef.current) {
      sheetRef.current.style.transform = '';
    }
  };

  return (
     <>
      <div className="demo-controls">
        <button onClick={() => setPosition('closed')}>Closed</button>
        <button onClick={() => setPosition('half')}>Half</button>
        <button onClick={() => setPosition('full')}>Full</button>
      </div>
      <div
      ref={sheetRef} 
      className={`bottom-sheet bottom-sheet--${position}`}
      style={{ transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}
      >
        <div 
            className="bottom-sheet__handle"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}></div>

        <div className="bottom-sheet__content">
          {children}
        </div>
      </div>
    </>
  )
}

export default BottomSheet