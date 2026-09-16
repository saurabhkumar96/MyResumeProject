import React, { useState, useMemo } from 'react';

// understanding the useMemo
function Test() {
  const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(0);

  // 1. A heavy, resource-intensive function
  const expensiveSquare = (num) => {
    console.log("Calculating square... (this is expensive)");
    // Simulating a heavy loop delay
    for (let i = 0; i < 1000000000; i++) {} 
    return num * num;
  };

  // 2. Using useMemo to cache the result
  // This will ONLY re-run when the 'number' state changes
  const squaredNumber = useMemo(() => {
    return expensiveSquare(number);
  }, [number]); 

  return (
    <div style={{ padding: '20px' }}>
      <h2>React useMemo Example</h2>
      
      {/* Input that triggers the expensive calculation */}
      <div>
        <input 
          type="number" 
          value={number} 
          onChange={(e) => setNumber(Number(e.target.value))} 
        />
        <p>Calculated Square: {squaredNumber}</p>
      </div>

      <hr />

      {/* Independent counter button */}
      <div>
        <p>Counter value: {counter}</p>
        <button onClick={() => setCounter(counter + 1)}>
          Increment Counter Fast
        </button>
      </div>
    </div>
  );
}

export default Test;
