import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "/commerce/mehsullar"}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products"
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
                providesTags: ['Cart']
            }),
    
            addToCart: builder.mutation({
                query: ({ productId, quantity }) => ({
                    url: '/products/cart',
                    method: 'POST',
                    body: { productId, quantity },
                    credentials: 'include'
                }),
                invalidatesTags: ['Cart']
            }),
  
          updateCartQuantity: builder.mutation({
              query: ({ productId, quantity }) => ({
                  url: `/products/cart/update/${productId}`, // URL-i dəyişdik
                  method: 'PUT',
                  body: { quantity },
                  credentials: 'include' // Cookie-ləri göndərmək üçün
              }),
              invalidatesTags: ['Cart']
          }),
  
          removeFromCart: builder.mutation({
              query: (productId) => ({
                  url: `/products/cart/${productId}`,
                  method: 'DELETE',
                  credentials: 'include'
              }),
              invalidatesTags: ['Cart']
          }),

                  // Favoriləri gətirmək üçün
                  getFavorites: builder.query({
                    query: () => '/products/favorites',
                    transformErrorResponse: (response) => {
                        console.error('Favorites Error:', response);
                        return { favorites: [] };
                    }
                }),

        // Favorilərə əlavə etmək üçün
        addToFavorites: builder.mutation({
            query: (productId) => ({
                url: '/products/favorites',
                method: 'POST',
                body: { productId },
                credentials: 'include'
            }),
            invalidatesTags: ['Favorites']
        }),

                // Favorilərdən silmək üçün
                removeFromFavorites: builder.mutation({
                    query: (productId) => ({
                        url: `/products/favorites/${productId}`,
                        method: 'DELETE',
                        credentials: 'include'
                    }),
                    invalidatesTags: ['Favorites']
                }),

    })
})
// default
//const - named import or export
export const {useGetProductDetailsQuery, useGetProductsQuery, useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useUpdateCartQuantityMutation, useGetFavoritesQuery, useAddToFavoritesMutation, useRemoveFromFavoritesMutation} = productApi