import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import React, { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  subscriptionSection?: boolean;
}

const Layout = ({ children, subscriptionSection = true }: LayoutProps) => {
  return (
    <div className={`pc-ai-LayoutPage relative`}>
      <div className="container relative pt-6 sm:pt-10 pb-16 lg:pt-20 lg:pb-28">
        {/* CONTENT */}
        <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
          {children}
        </div>
      </div>

      {subscriptionSection && (
        <div className="container pb-16 lg:pb-28">
          <SectionSubscribe2 />
        </div>
      )}
    </div>
  );
};

export default Layout;
