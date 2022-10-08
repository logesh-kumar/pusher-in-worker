import React from "react";

export const Link = ({ currentFilter, filter, children, onClick }) => {
  if (filter === currentFilter) {
    return <span className="ml-3">{children}</span>;
  }

  return (
    <button
      className="ml-3 cursor-pointer underline hover:text-teal-600 focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
