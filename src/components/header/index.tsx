import { Link } from "react-router-dom";

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <div className="flex items-center h-14 px-6 justify-between sticky top-0 z-10 shadow-md bg-white">
      <Link to="/">
        <h1 className="text-sky-400 text-2xl">Podcaster</h1>
      </Link>
    </div>
  );
}
