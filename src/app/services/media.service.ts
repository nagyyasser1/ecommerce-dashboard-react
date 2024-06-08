import { apiSlice } from "./api";

export const mediaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation({
      query: (credentials) => ({
        url: "cloudinary/create-folder",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: [{ type: "Folders", id: "LIST" }],
    }),
    getFolders: builder.query({
      query: () => ({
        url: "cloudinary/folders",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "Folders" as const,
                id,
              })),
              { type: "Folders", id: "LIST" },
            ]
          : [{ type: "Folders", id: "LIST" }],
    }),
    getAllInFolder: builder.query({
      query: ({ folderName }) => ({
        url: `cloudinary/folder/${folderName}/images`,
      }),
      providesTags: (result, error, { folderName }) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "Images" as const,
                id,
              })),
              { type: "Images", id: folderName },
            ]
          : [{ type: "Images", id: folderName }],
    }),
    removeFolder: builder.mutation({
      query: (folderPath) => ({
        url: `cloudinary/remove-folder/${folderPath}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Folders", id: "LIST" }],
    }),
    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: "cloudinary/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { folderName }) => [
        { type: "Images", id: folderName },
      ],
    }),
    deleteFile: builder.mutation({
      query: (data) => ({
        url: `cloudinary/delete-file`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (result, error, { folderName }) => [
        { type: "Images", id: folderName },
      ],
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useGetFoldersQuery,
  useGetAllInFolderQuery,
  useRemoveFolderMutation,
  useUploadFilesMutation,
  useDeleteFileMutation,
} = mediaApiSlice;
