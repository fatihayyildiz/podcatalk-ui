import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PodcastAudioRequestBody } from 'store/types';

const token = localStorage.getItem('token');

export const audioApi = createApi({
  reducerPath: 'audioApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_AI_AGENT_API_URL}/api/v1` }),
  tagTypes: ['Audio'],
  endpoints: (builder) => ({
    generateAudio: builder.mutation({
      query: (body: PodcastAudioRequestBody) => {

        const formData = new FormData();
        // Assuming PodcastAudioRequestBody is an object with keys and values
        Object.entries(body).forEach(([key, value]) => {
          // If value is a File or Blob, append as is; otherwise, convert to string
          formData.append(key, value as any);
        });
        return {
          url: `podcast/generate/audio`,
          method: 'POST',
          headers: {
            'authorization': `Bearer ${token}`,
          },
          body: formData,        
        };
      },
      invalidatesTags: ['Audio'],    
    }),
  }),
});
export const {
  useGenerateAudioMutation,
} = audioApi;