import * as React from "react";

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <div className="flex items-center h-14 px-6 justify-between fixed top-0 w-full z-10 shadow-md">
      <h1 className="text-sky-400 text-2xl">PodSurf</h1>
    </div>
  );
}
