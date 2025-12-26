import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { PodcastsPaginationParams } from 'store/types';

const token = localStorage.getItem('token');

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/api/v1` }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (params: PodcastsPaginationParams) => ({
        url: `messages?${qs.stringify(params)}`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`,
        }
      }),
      providesTags: ['Message'],
      transformResponse: (response: any) => {
        return {
          data: response.data,
          hasNextPage: response.hasNextPage,
        };
      }
    }),
    getMessagesByConversationId: builder.query({
      query: (id: string | null) => ({
        url: `messages/conversations/${id}`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }),
      providesTags: (result, error, id) =>
        id ? [{ type: 'Message', id }] : [{ type: 'Message' }],
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: 'messages',
        method: 'POST',
        body: message,
        headers: {
          'authorization': `Bearer ${token}`,
        }
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});
export const {
  useGetMessagesQuery,
  useGetMessagesByConversationIdQuery,
  useSendMessageMutation,
} = messageApi;