import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <div className="flex text-purp-10 flex-col gap-y-9 items-center justify-center h-full">
        <p className="text-5xl">Oops! This page does not exist!</p>
        <p className="text-4xl">Error: 404 Not Found</p>
        <Link
          to="/"
          className="text-2xl text-purp-1 border-2 border-purp-10 rounded-xl p-2 hover:bg-purp-10 hover:text-purp-950"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
