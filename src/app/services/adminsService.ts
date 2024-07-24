import { apiSlice } from "./api";

export const adminsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAdmins: builder.query({
      query: () => "/admins",
      providesTags: ["Admins"],
    }),
    getAdminById: builder.query({
      query: (adminId) => `/admins/${adminId}`,
      providesTags: (result, error, id) => [{ type: "Admins", id }],
    }),
    createAdmin: builder.mutation({
      query: (newAdmin) => ({
        url: "/admins",
        method: "POST",
        body: newAdmin,
      }),
      invalidatesTags: ["Admins"],
    }),
    updateAdmin: builder.mutation({
      query: (updatedAdmin) => ({
        url: `/admins/${updatedAdmin.id}`,
        method: "PATCH",
        body: updatedAdmin,
      }),
      invalidatesTags: ["Admins"],
    }),
    deleteAdmin: builder.mutation({
      query: (adminId) => ({
        url: `/admins/${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useFetchAdminsQuery,
  useGetAdminByIdQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminsApiSlice;
