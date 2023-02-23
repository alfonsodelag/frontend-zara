import React from "react";

const Container = ({
  children,
  sx = {},
}: {
  children: React.ReactNode;
  sx?: React.CSSProperties;
}) => {
  return (
    <div className="p-4 shadow-lg rounded-md" style={sx}>
      {children}
    </div>
  );
};

export default Container;
