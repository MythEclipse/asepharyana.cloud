'use client';
import { useState } from "react";
export default function Count() {
    const [count, setCount] = useState(0);
    return (
        <div>
        <h1 className="text-4xl font-bold text-center">Count</h1>
        <p className="text-center mt-4">You clicked {count} times</p>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => setCount(count + 1)}
        >
            Click me
        </button>
        </div>
    );
}