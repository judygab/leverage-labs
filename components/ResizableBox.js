import React from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

export default function ResizableBox({
  children,
  width = 600,
  height = 300,
  resizable = true,
  style = {},
  className = "",
}) {
  console.log("resizable", resizable);
  return (
    <div
      style={{ marginLeft: 20 }}
      className="flex flex-col flex-grow h-full text-white justify-center"
    >
      <div
        style={{
          display: "inline-block",
          width: "auto",
          background: "transparent",
          padding: ".5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 30px 40px rgba(0,0,0,.1)",
          text: "white",
          ...style,
        }}
      >
        {resizable ? (
          <ReactResizableBox width={width} height={height}>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
              className={className}
            >
              {children}
            </div>
          </ReactResizableBox>
        ) : (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            className={className}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
