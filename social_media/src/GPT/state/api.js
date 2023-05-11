import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337" }),
    reducerPath: "main",
    tagTypes: [],
    endpoints: (build) => ({ 
      postAiText: build.mutation({
        query: (payload) => ({
          url: "openai/text",
          method: "POST",
          body: payload,
        }),
      }), 
      postAiCode: build.mutation({
        query: (payload) => ({
          url: "openai/code",
          method: "POST",
          body: payload,
        }),
      }),
    }),
});   

export const { usePostAiTextMutation, usePostAiCodeMutation } = api;