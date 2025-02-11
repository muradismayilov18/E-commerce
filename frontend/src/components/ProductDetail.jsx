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

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-screen-2xl px-4 mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-start">
          {/* Ultra Luxury Image Section */}
          <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-4 shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500">
            <div className="aspect-square overflow-hidden rounded-2xl border-4 border-white/20 dark:border-gray-700/50 relative">
              <img
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                src={productImageUrl}
                alt={product?.name}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Premium
              </div>
            </div>
          </div>

          {/* Ultra Premium Product Details */}
          <div className="mt-12 lg:mt-0 space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-none tracking-tight font-playfair">
                {product?.name}
              </h1>

              <div className="flex flex-wrap items-center gap-8">
                <div className="relative">
                  <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 animate-pulse-slow">
                    {product?.price} 
                    <span className="text-4xl ml-2 bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
                      ₼
                    </span>
                  </p>
                  <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-amber-500 to-transparent opacity-50"></div>
                </div>

                <div className="flex items-center gap-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 rounded-xl shadow-xl">
                  <StarRatings
                    rating={product?.ratings || 0}
                    starRatedColor="#F59E0B"
                    numberOfStars={5}
                    starDimension="24px"
                    starSpacing="3px"
                    svgIconPath="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                  <span className="text-lg font-semibold text-amber-600 dark:text-amber-400">
                    ({product?.ratings || 0} Rating)
                  </span>
                </div>
              </div>
            </div>

            {/* Ultra Luxury Info Cards */}
            <div className="space-y-6">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/30 transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-amber-500/10">
                    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Stok Mövcudluğu</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Həmən alın - Çatdırılma təmin edilir</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/30 transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-emerald-500/10">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Sürətli Çatdırılma</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">24-48 saat ərzində Bakı daxilində çatdırılma</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ultra Premium Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-100 group-hover:from-amber-700 group-hover:to-amber-600 transition-colors duration-500"></div>
                <div className="relative flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold text-white">
                  <svg
                    className="w-7 h-7 transform group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Səbətə əlavə et
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </button>

              <button
                onClick={handleAddToFavorites}
                className="flex-1 group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1 border-2 border-amber-500/20 hover:border-amber-500/50"
              >
                <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors duration-500"></div>
                <div className="relative flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold text-amber-600 dark:text-amber-400">
                  <svg
                    className="w-7 h-7 transform group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                  Sevimlilərə əlavə et
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent animate-shimmer"></div>
                </div>
              </button>
            </div>

            {/* Ultra Luxury Product Description */}
            <div className="mt-12 border-t border-amber-500/20 pt-12">
              <h3 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-6 relative">
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-transparent bg-clip-text">
                  Məhsul Haqqında Detallar
                </span>
                <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent"></div>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg tracking-wide">
                {product?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail