import React from "react";
import { Link } from "react-router-dom";
import Layout from "components/Layout/layout"; // Correct path to Layout component

const StudioGuestPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 lg:py-28">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-semibold mb-6">Welcome to the Studio</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg">
            Access exclusive content creation tools and manage your podcasts.
            Please log in or sign up to continue.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-base font-medium rounded-md text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudioGuestPage; 