import React from "react";

interface Props {
  className?: string;
  children: any;
}

export function Center({ className, children }: Props) {
  return (
    <div
      className={
        "flex justify-center items-center " + (className ? className : "")
      }
    >
      {children}
    </div>
  );
}
