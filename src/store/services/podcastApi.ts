import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { PodcastsPaginationParams } from 'store/types';

const token = localStorage.getItem('token');

export const podcastApi = createApi({
  reducerPath: 'podcastApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/api/v1` }),
  tagTypes: ['Podcast'],
  endpoints: (builder) => ({
    getPodcasts: builder.query({
      query: (params: PodcastsPaginationParams) => ({
        url: `podcasts?${qs.stringify(params)}`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`,
        }
      }),
      providesTags: ['Podcast'],
      transformResponse: (response: any) => {
        return {
          data: response.data,
          hasNextPage: response.hasNextPage,
          total: response.total,
        };
      }
    }),
    getPodcastById: builder.query({
      query: (id) => ({
        url: `podcasts/${id}`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }),
      providesTags: (result, error, id) => [{ type: 'Podcast', id }],
    }),
    createPodcast: builder.mutation({
      query: (podcast) => ({
        url: 'podcasts',
        method: 'POST',
        body: podcast,
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Podcast'],
    }),
    updatePodcast: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `podcasts/${id}`,
        method: 'PATCH',
        body: patch,
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Podcast', id }],
    }),
    deletePodcast: builder.mutation({
      query: (id) => ({
        url: `podcasts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Podcast'],
    }),
  }),
});

export const {
  useGetPodcastsQuery,
  useGetPodcastByIdQuery,
  useCreatePodcastMutation,
  useUpdatePodcastMutation,
  useDeletePodcastMutation,
} = podcastApi; 