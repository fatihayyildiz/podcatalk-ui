import Layout from "components/Layout/layout";
import Heading2 from "components/Heading/Heading2";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useConfirmEmailMutation } from "store/services/authApi";

const PageConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const hash = useMemo(() => searchParams.get("hash")?.trim() || "", [searchParams]);

  const [confirmEmail, { isLoading, isSuccess, error }] = useConfirmEmailMutation();
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (!hash) return;
    if (hasRequestedRef.current) return;
    hasRequestedRef.current = true;

    confirmEmail({ hash });
  }, [hash, confirmEmail]);

  const errorMessage = useMemo(() => {
    const maybeData: any = (error as any)?.data;
    if (typeof maybeData?.message === "string") return maybeData.message;
    return "Email confirmation failed. Please try again.";
  }, [error]);

  return (
    <Layout subscriptionSection={false}>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>Email Confirmation</Heading2>
      </header>

      <div className="max-w-md mx-auto space-y-6 text-center">
        {!hash && (
          <div className="text-sm text-red-600 dark:text-red-400">
            Missing confirmation hash.
          </div>
        )}

        {hash && isLoading && (
          <div className="text-sm text-neutral-700 dark:text-neutral-200">
            Confirming…
          </div>
        )}

        {hash && !isLoading && isSuccess && (
          <div className="space-y-4">
            <div className="text-md text-green-700 dark:text-green-400">
              Your email has been confirmed.
            </div>
            <div>
              <NcLink href="/login">Continue to sign in</NcLink>
            </div>
          </div>
        )}

        {hash && !isLoading && !isSuccess && error && (
          <div className="space-y-4">
            <div className="text-sm text-red-600 dark:text-red-400">{errorMessage}</div>
            <div>
              <ButtonPrimary type="button" onClick={() => confirmEmail({ hash })}>
                Try again
              </ButtonPrimary>
            </div>
          </div>
        )}

        {!hash && (
          <div>
            <NcLink href="/signup">Back to sign up</NcLink>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PageConfirmEmail;
