import React, { useRef } from "react";
import useHeadroom from "./useHeadroom";

function Headroom({ style = {}, containerStyle = {}, children }) {
  const node = useRef();
  const { wrapperStyles, innerStyle, className } = useHeadroom({
    ref: node
  });

  console.log(wrapperStyles);

  return (
    <header ref={node} style={wrapperStyles}>
      <div className={className} style={{ ...style, ...innerStyle }}>
        {children}
      </div>
    </header>
  );
}

export default Headroom;
