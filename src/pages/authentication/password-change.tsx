import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Layout from "components/Layout/layout";
import Heading2 from "components/Heading/Heading2";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { useResetPasswordMutation } from "store/services/authApi";

type PasswordChangeFormValues = {
  password: string;
  confirmPassword: string;
};

const PagePasswordChange = () => {
  const [searchParams] = useSearchParams();
  const hash = useMemo(() => searchParams.get("hash")?.trim() || "", [searchParams]);

  const [resetPassword, { isLoading, error, isSuccess, data }] =
    useResetPasswordMutation();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordChangeFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const errorMessage = useMemo(() => {
    if (!error) return null;
    const maybeData: any = (error as any)?.data;
    return maybeData?.message || "An error occurred";
  }, [error]);

  const onSubmit = handleSubmit(async ({ password }) => {
    setServerMessage(null);

    if (!hash) {
      setServerMessage("Missing reset hash.");
      return;
    }

    try {
      const response = await resetPassword({ password, hash }).unwrap();
      setServerMessage(response?.message || "Your password has been updated.");
    } catch (e: any) {
      setServerMessage(e?.data?.message || "An error occurred");
    }
  });

  return (
    <Layout subscriptionSection={false}>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>Change password</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Enter your new password below.
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {!hash && (
          <div className="text-sm text-red-600 dark:text-red-400">
            Missing reset hash.
          </div>
        )}

        {(errorMessage || serverMessage || (isSuccess && data?.message)) && (
          <div
            className={
              errorMessage
                ? "text-red-500"
                : "text-neutral-700 dark:text-neutral-300"
            }
          >
            {errorMessage || serverMessage || data?.message}
          </div>
        )}

        {/* FORM */}
        {!isSuccess && (
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={onSubmit}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                New password
              </span>
              <Input
                type="password"
                placeholder="New password"
                className="mt-1"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password?.message && (
                <span className="text-sm text-red-500 mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Confirm password
              </span>
              <Input
                type="password"
                placeholder="Confirm password"
                className="mt-1"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
              {errors.confirmPassword?.message && (
                <span className="text-sm text-red-500 mt-1 block">
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>

            <ButtonPrimary
              disabled={isLoading || !hash}
              loading={isLoading}
              type="submit"
            >
              Update password
            </ButtonPrimary>
          </form>
        )}

        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Go back for {` `}
          <NcLink href="/login">Sign in</NcLink>
          {` / `}
          <NcLink href="/signup">Sign up</NcLink>
        </span>
      </div>
    </Layout>
  );
};

export default PagePasswordChange;
