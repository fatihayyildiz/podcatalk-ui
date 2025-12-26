import Layout from "components/Layout/layout";
import Heading2 from "components/Heading/Heading2";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetCurrentUserQuery, useUpdateUserMutation } from "store/services/authApi";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
};

const PageProfile = () => {
  const { data: currentUserResponse, isLoading, isSuccess } = useGetCurrentUserQuery();
  const user: any = useMemo(
    () => (currentUserResponse as any)?.user ?? currentUserResponse,
    [currentUserResponse]
  );

  const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      oldPassword: "",
      newPassword: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!isSuccess || !user) return;

    const nameParts = typeof user?.name === "string" ? user.name.trim().split(/\s+/) : [];
    const inferredFirstName = user?.firstName ?? nameParts[0] ?? "";
    const inferredLastName = user?.lastName ?? (nameParts.length > 1 ? nameParts.slice(1).join(" ") : "");

    reset({
      firstName: inferredFirstName,
      lastName: inferredLastName,
      email: user?.email ?? "",
      oldPassword: "",
      newPassword: "",
    });
  }, [isSuccess, user, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    const hasOld = values.oldPassword.trim().length > 0;
    const hasNew = values.newPassword.trim().length > 0;
    if ((hasOld && !hasNew) || (!hasOld && hasNew)) {
      setSubmitError("To change your password, please fill both old and new password fields.");
      return;
    }

    try {
      const payload: any = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      };

      if (hasOld && hasNew) {
        payload.oldPassword = values.oldPassword;
        payload.newPassword = values.newPassword;
      }

      await updateUser(payload).unwrap();

      setSubmitSuccess("Profile updated successfully. To be able use your new email, please check your inbox for a confirmation link. Your email won't be changed until you confirm it.");
    } catch (err: any) {
      const maybeData: any = err?.data;
      const message =
        typeof maybeData?.message === "string"
          ? maybeData.message
          : "Profile update failed. Please try again.";
      setSubmitError(message);
    }
  };

  if (isLoading) {
    return (
      <Layout subscriptionSection={false}>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 dark:border-gray-100 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout subscriptionSection={false}>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>Profile</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Update your basic profile information.
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email <span className="text-red-600 dark:text-red-400">*</span>
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
              First Name <span className="text-red-600 dark:text-red-400">*</span>
            </span>
            <Input
              type="text"
              placeholder="First name"
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
              placeholder="Last name"
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
            <span className="text-neutral-800 dark:text-neutral-200">Old Password</span>
            <Input
              type="password"
              placeholder="Old password"
              className="mt-1"
              autoComplete="current-password"
              {...register("oldPassword")}
            />
          </label>

          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">New Password</span>
            <Input
              type="password"
              placeholder="New password"
              className="mt-1"
              autoComplete="new-password"
              {...register("newPassword", {
                minLength: {
                  value: 6,
                  message: "New password must be at least 6 characters",
                },
              })}
            />
            {errors.newPassword?.message && (
              <span className="mt-1 block text-sm text-red-600 dark:text-red-400">
                {errors.newPassword.message}
              </span>
            )}
          </label>

          {submitError && (
            <div className="text-sm text-red-600 dark:text-red-400">{submitError}</div>
          )}
          {submitSuccess && (
            <div className="text-sm text-green-700 dark:text-green-400">{submitSuccess}</div>
          )}

          <ButtonPrimary type="submit" loading={isSaving} disabled={isSaving}>
            Save
          </ButtonPrimary>
        </form>
      </div>
    </Layout>
  );
};

export default PageProfile;
