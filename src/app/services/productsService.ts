import { apiSlice } from "./api";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: updatedProduct,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    findProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    findAllByPage: builder.query({
      query: ({ page = 1, limit = 10, categoryId }) =>
        `/products?page=${page}&limit=${limit}&categoryId=${categoryId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFindProductByIdQuery,
  useFindAllByPageQuery,
} = productsApiSlice;
