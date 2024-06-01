"use client";
import { useState } from "react";
export default function Count() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">Count</h1>
      <p className="mt-4 text-center">You clicked {count} times</p>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
    </div>
  );
}
