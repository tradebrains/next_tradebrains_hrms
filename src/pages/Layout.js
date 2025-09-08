import LayoutClient from "@/components/LayoutClient/LayoutClient";
import React from "react";

function Layout({ children }) {
  return <LayoutClient>{children}</LayoutClient>;
}

export default Layout;
