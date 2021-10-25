import React from "react";

const Layout = ({ className, children }) => (
  <div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
