import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "components/Header/Header";

const SiteHeader = () => {
  let pathname = useLocation().pathname;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return <Header />;
};
export default SiteHeader;
