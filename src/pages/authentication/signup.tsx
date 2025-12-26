import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import Heading2 from "components/Heading/Heading2";
import Layout from "components/Layout/layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery, useRegisterMutation } from "store/services/authApi";
import { useEffect, useState } from "react";

type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const PageSignUp = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    isSuccess: isSuccessCurrentUser,
  } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isLoadingCurrentUser) return;
    if (isSuccessCurrentUser && currentUser) {
      navigate("/studio/podcasts", { replace: true });
    }
  }, [currentUser, isLoadingCurrentUser, isSuccessCurrentUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setSubmitError(null);

    try {
      // `unwrap()` resolves for any 2xx status (including 204) and throws for non-2xx.
      await registerUser({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      }).unwrap();

      navigate("/signup/check-email");
    } catch (err: any) {
      const maybeData: any = err?.data;
      const message =
        typeof maybeData?.message === "string"
          ? maybeData.message
          : "Registration failed. Please try again.";
      setSubmitError(message);
    }
  };

  return (
    <Layout subscriptionSection={false}>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>Sign up</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Welcome to Podcatalk! Create your account to continue.
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* FORM */}
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              First Name <span className="text-red-600 dark:text-red-400">*</span>
            </span>
            <Input
              type="text"
              placeholder="First Name"
              className="mt-1"
              autoComplete="given-name"
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            {errors.firstName?.message && (
              <span className="mt-1 block text-sm text-red-600 dark:text-red-400">
                {errors.firstName.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Last Name <span className="text-red-600 dark:text-red-400">*</span>
            </span>
            <Input
              type="text"
              placeholder="Last Name"
              className="mt-1"
              autoComplete="family-name"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
            {errors.lastName?.message && (
              <span className="mt-1 block text-sm text-red-600 dark:text-red-400">
                {errors.lastName.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email address <span className="text-red-600 dark:text-red-400">*</span>
            </span>
            <Input
              type="email"
              placeholder="example@example.com"
              className="mt-1"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email?.message && (
              <span className="mt-1 block text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Password <span className="text-red-600 dark:text-red-400">*</span>
            </span>
            <Input
              type="password"
              className="mt-1"
              autoComplete="new-password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password?.message && (
              <span className="mt-1 block text-sm text-red-600 dark:text-red-400">
                {errors.password.message}
              </span>
            )}
          </label>

          {submitError && (
            <div className="text-sm text-red-600 dark:text-red-400">
              {submitError}
            </div>
          )}

          <ButtonPrimary type="submit" loading={isLoading}>
            Continue
          </ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Already have an account? {` `}
          <NcLink href="/login">Sign in</NcLink>
        </span>
      </div>
    </Layout>
  );
};

export default PageSignUp;
