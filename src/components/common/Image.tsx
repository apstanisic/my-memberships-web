import React from "react";

interface Props {
  src: string;
  alt?: string;
  height?: string | number;
  width?: string | number;
  center?: boolean;
  //   position?: "center" | "stretch";
}

export function Image({ src, alt, height, width, center }: Props) {
  return (
    <img
      src={src}
      alt={alt ?? ""}
      style={{
        // height,
        height,
        width,
        margin: center ? "0 auto" : "",
      }}
    />
  );
}
