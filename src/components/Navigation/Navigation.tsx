import React, { FC } from "react";
import NavigationItem, { NavItemType } from "./NavigationItem";
import { useGetCurrentUserQuery } from "store/services/authApi";

interface Props {
  className?: string;
}

const Navigation: FC<Props> = ({ className = "flex" }) => {
  const { data: currentUser, isLoading, isSuccess } = useGetCurrentUserQuery();

  const isAuthenticated = !isLoading && isSuccess && !!currentUser;

  const studioMenu: NavItemType = {
    id: "studio",
    href: isAuthenticated ? "/studio/podcasts" : "/studio/guest",
    name: "Podcast Studio"
  };

  const pricingMenu: NavItemType = {
    id: "pricing",
    href: "/pricing",
    name: "Pricing"
  };

  const aboutMenu: NavItemType = {
    id: "about",
    href: "/about",
    name: "About"
  };

  return (
    <ul className={`nc-Navigation items-center ${className}`}>
      <NavigationItem key={studioMenu.id} menuItem={studioMenu} />
      <NavigationItem key={pricingMenu.id} menuItem={pricingMenu} />
      <NavigationItem key={aboutMenu.id} menuItem={aboutMenu} />
    </ul>
  );
};

export default Navigation;
