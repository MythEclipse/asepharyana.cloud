"use strict";
"use client";
import { useState,useContext } from "react";
import { ContextApp }  from "@/components/ContextApp";
export default function Project1() {
    const {lokasi, setLokasi} = useContext(ContextApp);
  return (<main>
    <div>
      <h1 className="text-4xl font-bold text-center">Project 1</h1>
      <p className="text-center mt-4">This is a project {lokasi}.</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setLokasi("Bandung")}
      >
        bandung
      </button>
      <button
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setLokasi("Surabaya")}
      >
        surabaya
      </button>
    </div>
    <div>
<Count></Count>
    </div>
    </main>
  );
}

export function Count() {
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