import React from "react";
import { memo } from "react";
import { Link } from "./Link";

const TodoFilterMeomized = ({ currentFilter, onClick }) => {
  return (
    <div className="mt-6 flex justify-center">
      <Link
        filter="SHOW_ALL"
        currentFilter={currentFilter}
        onClick={() => onClick("SHOW_ALL")}
      >
        All
      </Link>
      <Link
        filter="SHOW_ACTIVE"
        currentFilter={currentFilter}
        onClick={() => onClick("SHOW_ACTIVE")}
      >
        Active
      </Link>
      <Link
        filter="SHOW_COMPLETED"
        currentFilter={currentFilter}
        onClick={() => onClick("SHOW_COMPLETED")}
      >
        Completed
      </Link>
    </div>
  );
};

export const TodoFilter = memo(TodoFilterMeomized);
