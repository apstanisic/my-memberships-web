import React from "react";

interface Props {
  children: any;
  size?: number;
  side?: "t" | "b" | "l" | "r" | "x" | "y";
  className?: any;
}

/**
 *
 * @todo switch from || to ?? when enabled in cra
 */
export function Padding({ size, side, children, className }: Props) {
  return (
    <div className={`p${side || ""}-${size || 4} ${className || ""}`}>
      {children}
    </div>
  );
}
