import React from "react";
import { NavBarButtons } from "./nav-bar-buttons";

export const NavBar = () => {
  return (
    <div className="nav-bar__container">
      <nav className="nav-bar">
        <NavBarButtons />
      </nav>
    </div>
  );
};
