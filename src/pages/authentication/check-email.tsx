import ButtonPrimary from "components/Button/ButtonPrimary";
import Heading2 from "components/Heading/Heading2";
import Layout from "components/Layout/layout";
import NcLink from "components/NcLink/NcLink";

const PageCheckEmail = () => {
  return (
    <Layout subscriptionSection={false}>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>Check your email</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          We sent you a confirmation email. Please check your inbox and follow the
          link to confirm your account.
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center text-neutral-700 dark:text-neutral-300">
          If you don’t see it, check your spam/junk folder.
        </div>

        <div className="flex justify-center">
          <NcLink href="/login">
            <ButtonPrimary>Go to sign in</ButtonPrimary>
          </NcLink>
        </div>
      </div>
    </Layout>
  );
};

export default PageCheckEmail;
