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
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "auth/forgotpassword",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "auth/resetpassword",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
} = authApiSlice;
