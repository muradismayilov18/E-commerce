import { useLocation, Link } from "react-router-dom";
import { useSearchProductsQuery } from "../redux/api/productsApi";
import StarRatings from "react-star-ratings";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  const { data: results, isLoading, isError } = useSearchProductsQuery({ query });
  const defaultImageUrl = "https://via.placeholder.com/300";

  if (isLoading) {
    return <div className="container mx-auto p-6 text-center text-2xl text-gray-800">Yüklənir...</div>;
  }

  if (isError) {
    return <div className="container mx-auto p-6 text-red-600 text-center text-2xl">Xəta baş verdi.</div>;
  }

  if (!results || results.products.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">Axtarış Nəticələri</h1>
        <p className="text-2xl text-gray-500">Heç bir nəticə tapılmadı.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-6 text-center">Axtarış Nəticələri</h1>
      <p className="text-xl text-gray-500 text-center mb-10">{results.totalProducts} nəticə tapıldı.</p>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.products.map((product) => {
          const imageUrl = product?.images?.[0]?.url || defaultImageUrl;
          return (
            <Link key={product._id} to={`/product/${product._id}`} className="hover:scale-105 transform transition-all duration-300">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-300">
                <div className="h-80 w-full overflow-hidden rounded-t-2xl relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                    src={imageUrl}
                    alt={product.name || "Məhsul şəkli"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-all duration-300">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <StarRatings
                      rating={product.ratings || 0}
                      starRatedColor="blue"
                      numberOfStars={5}
                      starDimension="24px"
                      starSpacing="2px"
                    />
                    <span className="text-lg font-medium text-gray-600">({product.ratings || 0})</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">
                    {product.price}
                    <span className="text-xl">₼</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
