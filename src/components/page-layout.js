import React from "react";
import { NavBar } from "./navigation/desktop/nav-bar";
import { MobileNavBar } from "./navigation/mobile/mobile-nav-bar";

export const PageLayout = () => {
  return (
    <div className="page-layout">
      <NavBar />
      {/* <MobileNavBar /> */}
    </div>
  );
};
