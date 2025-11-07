import React, { useMemo, useState } from "react";


const MemoDemo = () => {
  const [count, setCount] = useState(0);
 const [name, setName] = useState("");
  
 const expensiveCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1e7; i++) {} // heavy work
    return num * 2;
  };

  // const value = expensiveCalculation(count); // No memoization
  const value = useMemo(() => expensiveCalculation(count), [count]); // No memoization

  return (
    <div>
      <h2>Value: {value}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button><br/><br/>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

export default MemoDemo;
