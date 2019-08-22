import React, { useRef } from "react";
import { string, func, any, bool, number, object } from "prop-types";
import useHeadroom from "./useHeadroom";

const noop = () => {};

function Headroom({
  parent = () => window,
  disableInlineStyles = false,
  disable = false,
  upTolerance = 5,
  downTolerance = 0,
  onPin = noop,
  onUnpin = noop,
  onUnfix = noop,
  pinStart = 0,
  calcHeightOnResize = true,
  wrapperStyle = {},
  style = {},
  children,
  className: wrapperClassName
}) {
  const node = useRef();
  const { wrapper, innerStyle, className } = useHeadroom({
    ref: node,
    parent,
    disableInlineStyles,
    disable,
    upTolerance,
    downTolerance,
    onPin,
    onUnpin,
    onUnfix,
    pinStart,
    calcHeightOnResize
  });

  return (
    <header
      className={wrapperClassName}
      ref={node}
      style={{ ...wrapper, ...wrapperStyle }}
    >
      <div className={className} style={{ ...style, ...innerStyle }}>
        {children}
      </div>
    </header>
  );
}

Headroom.propTypes = {
  className: string,
  parent: func,
  children: any.isRequired,
  disableInlineStyles: bool,
  disable: bool,
  upTolerance: number,
  downTolerance: number,
  onPin: func,
  onUnpin: func,
  onUnfix: func,
  wrapperStyle: object,
  pinStart: number,
  style: object,
  calcHeightOnResize: bool
};

export default Headroom;
