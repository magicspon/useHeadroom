import React, { useEffect, useRef, useReducer } from "react";
import throttle from "raf-throttle";
import shouldUpdate from "./shouldUpdate";

function getDocumentHeight() {
  const body = document.body;
  const documentElement = document.documentElement;

  return Math.max(
    body.scrollHeight,
    documentElement.scrollHeight,
    body.offsetHeight,
    documentElement.offsetHeight,
    body.clientHeight,
    documentElement.clientHeight
  );
}

function isOutOfBound(currentScrollY) {
  const pastTop = currentScrollY < 0;

  const scrollerPhysicalHeight = window.innerHeight;
  const scrollerHeight = getDocumentHeight();

  const pastBottom = currentScrollY + scrollerPhysicalHeight > scrollerHeight;

  return pastTop || pastBottom;
}

function reducer(state, { type, payload }) {
  switch (type) {
    case "pin": {
      return {
        ...state,
        translateY: 0,
        className: "headroom headroom--pinned",
        animation: true,
        state: "pinned"
      };
    }
    case "unpin": {
      return {
        ...state,
        translateY: "-100%",
        className: "headroom headroom--unpinned",
        animation: true,
        state: "unpinned"
      };
    }
    case "unpin-snap": {
      return {
        ...state,
        translateY: "-100%",
        className: "headroom headroom--unpinned headroom-disable-animation",
        animation: false,
        state: "unpinned"
      };
    }
    case "unfix": {
      return {
        ...state,
        translateY: 0,
        className: "headroom headroom--unfixed headroom-disable-animation",
        animation: false,
        state: "unfixed"
      };
    }
    case "none": {
      return state;
    }

    default: {
      throw new Error("action type missing");
    }
  }
}

function useHeadroom({ ref }) {
  const currentScrollY = useRef(0);
  const lastKnownScrollY = useRef(0);
  const height = useRef(0);
  const [state, dispatch] = useReducer(reducer, {
    state: "unfixed",
    translateY: 0,
    className: "headroom headroom--unfixed"
  });

  useEffect(() => {
    height.current = ref.current.offsetHeight;
  }, [state, height, ref]);

  useEffect(() => {
    const handle = throttle(() => {
      height.current = ref.current.offsetHeight;
    });

    window.addEventListener("resize", handle);

    return () => {
      window.removeEventListener("resize", handle);
    };
  }, [height, ref]);

  useEffect(() => {
    const handle = throttle(() => {
      currentScrollY.current = window.pageYOffset;

      if (!isOutOfBound(currentScrollY.current)) {
        const { action } = shouldUpdate(
          lastKnownScrollY.current,
          currentScrollY.current,
          {
            disable: false,
            upTolerance: 5,
            downTolerance: 0,
            pinStart: 0
          },
          {
            ...state,
            height: height.current
          }
        );

        dispatch({ type: action });
      }

      lastKnownScrollY.current = currentScrollY.current;
    });

    window.addEventListener("scroll", handle);

    return () => {
      window.removeEventListener("scroll", handle);
    };
  }, [ref, state, height]);

  let innerStyle = {
    position: state.state === "unfixed" ? "relative" : "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    transform: `translate3D(0, ${state.translateY}, 0)`
  };

  if (state.animation) {
    innerStyle = {
      ...innerStyle,
      transition: "all .2s ease-in-out"
    };
  }

  return {
    wrapperStyles: {
      height: height.current
    },
    innerStyle,
    className: state.className,
    state: state.state
  };
}

export default useHeadroom;
