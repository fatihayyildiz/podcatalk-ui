import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import Heading2 from "components/Heading/Heading2";
import Layout from "components/Layout/layout";
import { useForgotPasswordMutation } from "store/services/authApi";

type ForgotPasswordFormValues = {
  email: string;
};

const PageForgotPassword = () => {
  const [forgotPassword, { isLoading, error, isSuccess, data }] =
    useForgotPasswordMutation();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const errorMessage = useMemo(() => {
    if (!error) return null;
    const data: any = (error as any)?.data;
    return data?.message || "An error occurred";
  }, [error]);

  const onSubmit = handleSubmit(async ({ email }) => {
    setServerMessage(null);
    try {
      const response = await forgotPassword({ email }).unwrap();
      setServerMessage(
        response?.message ||
          "If an account exists for that email, we sent password reset instructions."
      );
    } catch (e: any) {
      setServerMessage(e?.data?.message || "An error occurred");
    }
  });

  return (
    <Layout subscriptionSection={false}>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>Forgot password</Heading2>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {(errorMessage || serverMessage || (isSuccess && data?.message)) && (
          <div
            className={
              errorMessage
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {errorMessage || serverMessage || data?.message}
          </div>
        )}

        {/* FORM */}
        <form
          className="grid grid-cols-1 gap-6"
          action="#"
          method="post"
          onSubmit={onSubmit}
        >
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email address
            </span>
            <Input
              type="email"
              placeholder="example@example.com"
              className="mt-1"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email?.message && (
              <span className="text-sm text-red-500 mt-1 block">
                {errors.email.message}
              </span>
            )}
          </label>
          <ButtonPrimary disabled={isLoading} loading={isLoading} type="submit">
            Continue
          </ButtonPrimary>
        </form>

        {/* ==== */}
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

export default PageForgotPassword;
