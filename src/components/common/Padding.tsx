import React from "react";

interface Props {
  children: any;
  size?: number;
  side?: "t" | "b" | "l" | "r" | "x" | "y";
  className?: any;
  grow?: boolean;
}

/**
 *
 * @todo switch from || to ?? when enabled in cra
 */
export function Padding({ grow, size, side, children, className }: Props) {
  return (
    <div
      className={`${grow ? "flex flex-grow" : ""}  p${side || ""}-${size ||
        4} ${className || ""}`}
    >
      {children}
    </div>
  );
}
