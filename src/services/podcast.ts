import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITUNES_URL } from '../constants';

export const podcastApi = createApi({
  reducerPath: 'podcastApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.allorigins.win/get?url=${encodeURIComponent(ITUNES_URL)}`,
  }),
  endpoints: (builder) => ({
    getPodcasts: builder.query({
      query: () => ({
        url: "/us/rss/toppodcasts/limit=100/genre=1310/json",
      }),
    }),
    getPodcastById: builder.query({
      query: (id) => `/lookup?id=${id}`,
    }),
    getEpisodeById: builder.query({
      query: ( {podcastId, episodeId} ) =>`/lookup?id=${podcastId}/episode/${episodeId}`,
    }),
   getPodcastEpisodes: builder.query({
    query: (id) => encodeURIComponent(`/lookup?id=${id}&media=podcast&entity=podcastEpisode`),
  }),
  }),
}); 