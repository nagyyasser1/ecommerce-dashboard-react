import { Category, SubCategory } from "../../interfaces/category";
import { CreateSubCategory } from "../../types";
import { apiSlice } from "./api";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => "/category",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Categories" as const, id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
    getCategoryById: builder.query<Category, number>({
      query: (id) => `/category/${id}`,
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (newCategory) => ({
        url: "/category",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    createSubCategory: builder.mutation<
      CreateSubCategory,
      Partial<CreateSubCategory>
    >({
      query: (newSubCategory) => ({
        url: "/sub-category",
        method: "POST",
        body: newSubCategory,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Categories", id }],
    }),
    updateCategory: builder.mutation<
      void,
      Partial<Category> & Pick<Category, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Categories", id }],
    }),
    updateSubCategory: builder.mutation<void, any>({
      query: ({ id, ...patch }) => ({
        url: `/sub-category/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: "Categories", id: categoryId },
      ],
    }),
    deleteCategory: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
    deleteSubCategory: builder.mutation<
      { success: boolean; data: number },
      any
    >({
      query: (data) => ({
        url: `/sub-category/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: "Categories", id: categoryId },
      ],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
} = categoryApiSlice;
