import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

const token = localStorage.getItem('token');

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/api/v1` }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<{
      user: User,
      token: string,
    }, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }), // Endpoint to get current user
      providesTags: ['Auth'],
      transformResponse: (response: { 
        user: User,
        token: string,
      }) => {
        localStorage.setItem('token', token || response.token);
        return response;
      },

    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/email/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
      transformResponse: (response: { 
        user: User,
        token: string,
      }) => {
        localStorage.setItem('token', response.token);
        return response;
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/email/register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    confirmEmail: builder.mutation<void, { hash: string }>({
      query: ({ hash }) => ({
        url: 'auth/email/confirm',
        method: 'POST',
        body: { hash },
      }),
    }),
    confirmEmailNew: builder.mutation<void, { hash: string }>({
      query: ({ hash }) => ({
        url: 'auth/email/confirm/new',
        method: 'POST',
        body: { hash },
      }),
    }),
    updateUser: builder.mutation<
      User,
      {
        firstName: string;
        lastName: string;
        email: string;
        oldPassword?: string;
        newPassword?: string;
      }
    >({
      query: ({ firstName, lastName, email, oldPassword, newPassword }) => ({
        url: `auth/me`,
        method: 'PATCH',
        headers: {
          'authorization': `Bearer ${token}`,
        },
        body: { firstName, lastName, email, oldPassword, newPassword },
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    forgotPassword: builder.mutation<{ message?: string }, { email: string }>({
      query: ({ email }) => ({
        url: 'auth/forgot/password',
        method: 'POST',
        body: { email },
      }),
    }),

    resetPassword: builder.mutation<{ message?: string }, { password: string; hash: string }>({
      query: ({ password, hash }) => ({
        url: 'auth/reset/password',
        method: 'POST',
        body: { password, hash },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useConfirmEmailMutation,
  useConfirmEmailNewMutation,
  useUpdateUserMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi; 