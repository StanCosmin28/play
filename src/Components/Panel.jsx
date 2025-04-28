import React from "react";

const Panel = ({ className, children }) => {
  return <article className={`panel ${className}`}>{children}</article>;
};

export default Panel;
