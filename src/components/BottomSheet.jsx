import React, { useEffect, useRef, useState } from 'react'
import './BottomSheet.css' 
const BottomSheet = ({children}) => {

    const [position, setPosition] = useState('closed')
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const sheetRef = useRef(null);
    const lastTimeRef = useRef(0);

    const snapPoints = {
        closed: 70,
        half: 40,
        full: 0
    };

    const handleStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart(clientY);
    setLastY(clientY);
    setVelocity(0);
    lastTimeRef.current = Date.now();
    };

  const handleMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const now = Date.now();
    const timeDiff = now - lastTimeRef.current;

    if (timeDiff > 0) {
      const newVelocity = (clientY - lastY) / timeDiff;
      setVelocity(newVelocity);
    }
    setLastY(clientY);
    lastTimeRef.current = now;
    const dragDistance = clientY - dragStart;
    const currentSnap = snapPoints[position];

    const resistance = 0.5;
    const newPosition = Math.max(-10, Math.min(80, currentSnap + (dragDistance * resistance / 10)));
    
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${newPosition}%)`;
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const dragDistance = lastY - dragStart;
    let newPosition = position;
    
    if (Math.abs(velocity) > 0.5) {
      if (velocity > 0) {
        // down swipe
        if (position === 'full') newPosition = 'half';
        else if (position === 'half') newPosition = 'closed';
      } else {
        // up swipe
        if (position === 'closed') newPosition = 'half';
        else if (position === 'half') newPosition = 'full';
      }
    } else {
      if (dragDistance > 50) {
        if (position === 'full') newPosition = 'half';
        else if (position === 'half') newPosition = 'closed';
      } else if (dragDistance < -50) {
        if (position === 'closed') newPosition = 'half';
        else if (position === 'half') newPosition = 'full';
      }
    }
    
    setPosition(newPosition);

    if (sheetRef.current) {
      sheetRef.current.style.transform = '';
    }
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMove = (e) => handleMove(e);
      const handleGlobalEnd = () => handleEnd();
      
      document.addEventListener('mousemove', handleGlobalMove);
      document.addEventListener('mouseup', handleGlobalEnd);
      document.addEventListener('touchmove', handleGlobalMove, { passive: false });
      document.addEventListener('touchend', handleGlobalEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMove);
        document.removeEventListener('mouseup', handleGlobalEnd);
        document.removeEventListener('touchmove', handleGlobalMove);
        document.removeEventListener('touchend', handleGlobalEnd);
      };
    }
  }, [isDragging, dragStart, lastY, velocity, position]);

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
      style={{ 
          transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)' 
        }}
      >
        <div 
            className="bottom-sheet__handle"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            ></div>

        <div className="bottom-sheet__content">
          {children}
        </div>
      </div>
    </>
  )
}

export default BottomSheet