import { apiSlice } from "./api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "auth/admin/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/admin/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApiSlice;
