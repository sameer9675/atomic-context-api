import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

/**
 * Optimization technique -> chilren props
 *
 */

export function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {/**
       * this will not render on count update
       *
       * Reason -> SlowComponent is created before the Counter component get re render (render or anything happens in counter component) -> so that why there is no way SlowComponent get affected by state update
       *
       */}
      {children}
    </div>
  );
}

export default function Test() {
  return (
    <Counter>
      <SlowComponent />
    </Counter>
  );
}

/*
export default function Test() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {/**
       * when count state get update the SlowComponent also get called(re render) which making whole component slow as some heavy task happening in SlowComponent
       * ideally it should not happen as SlowComponent is not dependent on state
       /}
      <SlowComponent />
    </div>
  );
}
*/
