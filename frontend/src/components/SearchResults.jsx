import { useLocation, Link } from "react-router-dom"
import { useSearchProductsQuery } from "../redux/api/productsApi"
import StarRatings from "react-star-ratings"

const SearchResults = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("query") || ""
  const { data: results, isLoading, isError } = useSearchProductsQuery({ query })
  const defaultImageUrl = "https://via.placeholder.com/150"

  if (isLoading) {
    return <div className="container mx-auto p-6">Yükleniyor...</div>
  }

  if (isError) {
    return <div className="container mx-auto p-6">Sonuçlar getirilirken bir hata oluştu.</div>
  }

  if (!results || results.products.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-8">Axtarış Nəticələri</h1>
        <p className="text-xl text-red-500">Heç bir nəticə tapılmadı.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-8">Axtarış Nəticələri</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400 text-lg">
        <span className="font-semibold">"{query}"</span> için {results.totalProducts} nəticə tapıldı.
      </p>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.products.map((product) => {
          const imageUrl = product?.images?.[0]?.url || defaultImageUrl
          return (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <div className="h-72 w-full overflow-hidden rounded-t-2xl">
                  <img
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
                    src={imageUrl || "/placeholder.svg"}
                    alt={product.name || "Məhsul şəkli"}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-indigo-600 transition-all duration-300">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <StarRatings
                      rating={product.ratings || 0}
                      starRatedColor="yellow"
                      numberOfStars={5}
                      starDimension="22px"
                      starSpacing="2px"
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      ({product.ratings || 0})
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {product.price}
                    <span className="text-lg">₼</span>
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SearchResults

