import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

function Title() {
  const { userId } = useParams();

  return (
    <div className="flex justify-between items-center py-4 px-8">
      {userId ? (
        <NavLink className="flex group" to={`/${userId}`}>
          <h1 className="text-7xl mt-2 mb-4 text-purp-1 group-hover:text-purp-25">
            Split
          </h1>
          <h1 className="text-7xl mt-6 mb-2 text-purp-1 group-hover:text-purp-25">
            Ease
          </h1>
        </NavLink>
      ) : (
        <NavLink className="flex group" to="/">
          <h1 className="text-7xl mt-2 mb-4 text-purp-1 group-hover:text-purp-25">
            Split
          </h1>
          <h1 className="text-7xl mt-6 mb-2 text-purp-1 group-hover:text-purp-25">
            Ease
          </h1>
        </NavLink>
      )}
    </div>
  );
}

export default Title;
