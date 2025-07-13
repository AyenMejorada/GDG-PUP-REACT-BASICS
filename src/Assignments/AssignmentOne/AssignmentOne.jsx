import React, { useState } from "react";
import "./AssignmentOne.css";

function AssignmentOne() {
  const [count, setCount] = useState(0);

  const incrementCounter = () => setCount(count + 1);
  const decrementCounter = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="counter-container">
      <p className="counter-value"><b>Current Count: {count}</b></p>

      <div className="button-container">
        <button className="increment-button" onClick={incrementCounter}>
          Increment
        </button>
        <button
          className="decrement-button"
          onClick={decrementCounter}
          disabled={count === 0}
        >
          Decrement
        </button>
      </div>

      <div className="assignment-container">
        <p>
          This code teaches React basics by demonstrating how to build a
          simple counter app. It covers creating functional components,
          managing state using the useState hook to remember the counter
          value, and handling user interactions through button click events to
          update the state. Additionally, it introduces JSX, which combines
          HTML-like syntax with JavaScript logic to dynamically display the
          counter value. This example highlights essential concepts for
          building interactive and state-driven applications in React.
        </p>
        <p>
          <span className="bold-text">Bonus:</span> The decrement button is
          disabled when count is zero to avoid negative values.
        </p>
      </div>
    </div>
  );
}

export default AssignmentOne;

