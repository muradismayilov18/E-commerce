import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/commerce/mehsullar" }),
  tagTypes: ['Cart', 'Favorites'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),

    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),

    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/admin/products",
        method: "POST",
        body: productData,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
    }),

    editProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/products/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),

    getCart: builder.query({
      query: () => "/products/cart",
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: '/products/cart',
        method: 'POST',
        body: { productId, quantity },
        credentials: 'include',
      }),
      invalidatesTags: ['Cart'],
    }),

    updateCartQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/products/cart/update/${productId}`,
        method: 'PUT',
        body: { quantity },
        credentials: 'include',
      }),
      invalidatesTags: ['Cart'],
    }),

    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/products/cart/${productId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Cart'],
    }),

    getFavorites: builder.query({
      query: () => '/products/favorites',
      providesTags: ['Favorites'],
      transformResponse: (response) => ({
        favorites: response?.favorites || [],
      }),
    }),

    addToFavorites: builder.mutation({
      query: (productId) => ({
        url: '/products/favorites',
        method: 'POST',
        body: { productId },
        credentials: 'include',
      }),
      invalidatesTags: ['Favorites'],
    }),

    removeFromFavorites: builder.mutation({
      query: (productId) => ({
        url: `/products/favorites/${productId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Favorites'],
    }),

    getFilteredProducts: builder.query({
      query: (filters) => {
        const query = new URLSearchParams(filters).toString();
        return `/products/filter?${query}`;
      },
    }),

    getFilteredCart: builder.query({
      query: (category) => ({
        url: '/products/filter',
        params: { category },
      }),
      providesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useGetFilteredProductsQuery,
  useGetFilteredCartQuery, // Yeni əlavə edilən endpoint
} = productApi;