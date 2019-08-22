import React, { useRef } from "react";
import ReactDOM from "react-dom";
import useHeadroom from "./useHeadroom";
import "./styles.css";

function App({ style = {}, containerStyle = {} }) {
  const node = useRef();
  const { wrapperStyles, innerStyle, className } = useHeadroom({
    ref: node
  });

  return (
    <header ref={node} style={{ ...containerStyle, ...wrapperStyles }}>
      <div className={className} style={{ ...style, ...innerStyle }}>
        <div className="relative p-8 border bg-gray-200 text-center">
          <h1 className="font-bold">Word</h1>
        </div>
      </div>
    </header>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
