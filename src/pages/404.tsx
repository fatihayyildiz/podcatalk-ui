import React from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Layout from "components/Layout/layout";

const Page404: React.FC = () => (
  <Layout>
    <div className="container relative py-16 lg:py-28">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-semibold mb-4">404 - Page Not Found</h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <ButtonPrimary href="/">Return Home</ButtonPrimary>
      </div>
    </div>
  </Layout>
);

export default Page404; 