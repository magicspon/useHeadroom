import React from "react";
import ReactDOM from "react-dom";
import Headroom from "./Headroom";
import "./styles.css";

function App() {
  return (
    <Headroom className="relative p-8 border bg-gray-200 text-center">
      <h1 className="font-bold">Word</h1>
    </Headroom>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
