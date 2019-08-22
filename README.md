# useHeadroom

[React Headroom](https://github.com/KyleAMathews/react-headroom) re-implemented with React hooks

Example

```javascript

import React, { useRef } from "react";
import useHeadroom from "./useHeadroom";

function StickyHeader({ style = {}, containerStyle = {} }) {
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
```
