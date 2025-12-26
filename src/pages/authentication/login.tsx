import { useEffect, useMemo, useState } from "react";
import Input from "components/Input/Input";
import Heading2 from "components/Heading/Heading2";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import Layout from "components/Layout/layout";
import { useLoginMutation, useGetCurrentUserQuery } from "store/services/authApi";
import { useNavigate } from "react-router-dom";

const PageLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const loginResponse = await login({ email, password });
    if (loginResponse.data) {
      if (loginResponse.data) {
        localStorage.setItem('token', loginResponse.data.token);
        window.location.href = '/studio/podcasts';
      }
    }
  };

  const errorMessage = useMemo(() => {
    if (!error) return null;

    const status = (error as any)?.status;
    const data: any = (error as any)?.data;
    const inactiveAccount =
      status === 422 && data?.errors?.password === "inactiveAccount";

    if (inactiveAccount) {
      return "Your account is not active yet. Please confirm your email address using the link we sent you.";
    }

    return data?.message || "An error occurred";
  }, [error]);

  // <div className="max-w-md mx-auto space-y-6">
  return (
    <Layout subscriptionSection={false}>
        <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20 ">
          <Heading2>Login</Heading2>
          <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
            Welcome to Podcatalk! Please login to continue.
          </span>
        </header>

        <div className="max-w-md mx-auto space-y-6">
          {errorMessage && (
            <div className="text-red-500">
              {errorMessage}{" "}
              {(error as any)?.status === 422 &&
                (error as any)?.data?.errors?.password === "inactiveAccount" && (
                  <NcLink href="/signup/check-email" className="underline">
                    Check email instructions
                  </NcLink>
                )}
            </div>
          )}
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <NcLink href="/forgot-password" className="text-sm underline">
                  Forgot password?
                </NcLink>
              </span>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-1"
              />
            </label>
            <ButtonPrimary disabled={isLoading} loading={isLoading} type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <NcLink href="/signup">Create an account</NcLink>
          </span>
      </div>
    </Layout>
  );

  //  </div>
};

export default PageLogin;
