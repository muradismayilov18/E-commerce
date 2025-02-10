import { useParams } from "react-router-dom"
import { useGetProductDetailsQuery, useAddToCartMutation, useAddToFavoritesMutation } from "../redux/api/productsApi"
import StarRatings from "react-star-ratings"
import { toast } from "react-toastify"

const ProductDetail = () => {
  const params = useParams()
  const { data, isLoading, error } = useGetProductDetailsQuery(params?.id)
  const [addToCart] = useAddToCartMutation()
  const [addToFavorites] = useAddToFavoritesMutation()

  const product = data?.product

  const productImageUrl =
    product?.images && product.images.length > 0
      ? product.images[0]?.url
      : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"

  const handleAddToCart = async (e) => {
    e.preventDefault()
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      }).unwrap()
      toast.success("Məhsul səbətə əlavə edildi")
    } catch (error) {
      toast.error("Məhsul əlavə edilərkən xəta baş verdi")
    }
  }

  const handleAddToFavorites = async () => {
    try {
      const result = await addToFavorites(product._id).unwrap()
      if (result.success) {
        toast.success("Məhsul sevimlilərə əlavə edildi")
      }
    } catch (error) {
      toast.error(error.data?.message || "Məhsul əlavə edilərkən xəta baş verdi")
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 animate-pulse">
        <div className="max-w-screen-xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
            <div className="space-y-4 mt-6 lg:mt-0">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center p-8 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
          <svg className="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Xəta baş verdi</h3>
          <p className="text-gray-600 dark:text-gray-300">{error.message}</p>
        </div>
      </div>
    )

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center p-8 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Məhsul tapılmadı</h3>
        </div>
      </div>
    )

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
      <div className="max-w-screen-xl px-4 mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* Image Section */}
          <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-2 transition-transform duration-300 hover:scale-[1.02] shadow-lg hover:shadow-2xl">
            <div className="aspect-square overflow-hidden rounded-xl">
              <img
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                src={productImageUrl || "/placeholder.svg"}
                alt={product?.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="mt-8 lg:mt-0 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                {product?.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6">
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 animate-gradient">
                  {product?.price} <span className="text-3xl">₼</span>
                </p>

                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
                  <StarRatings
                    rating={product?.ratings || 0}
                    starRatedColor="#FBBF24"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    ({product?.ratings || 0})
                  </span>
                </div>
              </div>
            </div>

            {/* Stock and Delivery Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4 shadow-lg transform transition-all duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    className="w-6 h-6 text-green-500 dark:text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-900 dark:text-white">Stokda var</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <svg
                    className="w-6 h-6 text-blue-500 dark:text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 8l-8 5-8-5V6l8 5 8-5V8z"
                    ></path>
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-900 dark:text-white">2-3 gün ərzində çatdırılma</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 group relative overflow-hidden rounded-lg text-lg font-semibold"
              >
                <div className="absolute inset-0 w-3 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
                <div className="relative flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-500 group-hover:bg-transparent transition-colors duration-[400ms] text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Səbətə əlavə et
                </div>
              </button>

              <button
                onClick={handleAddToFavorites}
                className="flex-1 group relative overflow-hidden rounded-lg text-lg font-semibold"
              >
                <div className="absolute inset-0 w-3 bg-gray-100 dark:bg-gray-700 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
                <div className="relative flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent transition-colors duration-[400ms]">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                  Sevimlilərə əlavə et
                </div>
              </button>
            </div>

            {/* Product Description */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-8"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Məhsul haqqında</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{product?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail

