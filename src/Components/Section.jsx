import React from "react";

const Section = ({ className, children, style }) => {
  return (
    <section className={`section ${className}`} style={style}>
      {children}
    </section>
  );
};

export default Section;
