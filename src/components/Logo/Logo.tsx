import React from "react";
import logoImg from "images/logo.png";
import logoLightImg from "images/logo-light.png";
import LogoSvg from "./LogoSvg";
import Link from "components/Link";
import LogoTextSvg from "./LogoText";

export interface LogoProps {
  img?: string;
  imgLight?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
}) => {
  return (
    <Link
      href="/"
      className="ttnc-logo text-primary-6000 flex flex-shrink-0 flex-direction-row items-center justify-center gap-2"
    >
      {/* THIS USE FOR MY MULTI DEMO */}
      {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
      <LogoSvg />
      <LogoTextSvg />
    </Link>
  );
};

export default Logo;
