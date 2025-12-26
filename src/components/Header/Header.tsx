import React, { FC } from "react";
import MainNav from "./MainNav";

export interface HeaderLoggedProps {}

const Header: FC<HeaderLoggedProps> = () => {
  return (
    <div className="nc-HeaderLogged sticky top-0 w-full z-40">
      <MainNav />
    </div>
  );
};

export default Header;
