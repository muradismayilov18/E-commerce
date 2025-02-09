import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const SearchResults = () => {
    const location = useLocation();
    const { results } = location.state || { results: { products: [], totalProducts: 0, totalPages: 1, currentPage: 1 } };
    const [loading, setLoading] = useState(true);
    const defaultImageUrl = "https://via.placeholder.com/150"; // Placeholder şəkili

    useEffect(() => {
        if (results.products.length > 0) {
            setLoading(false); // Verilənlər gəldikdən sonra loading vəziyyətini dəyiş
        }
    }, [results]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-8">Axtarış Nəticələri</h1>
            {loading ? (
                <p className="text-xl text-gray-600">Yüklənir...</p>
            ) : results.products.length === 0 ? (
                <p className="text-xl text-red-500">Heç bir nəticə tapılmadı.</p>
            ) : (
                <div>
                    <p className="mb-6 text-gray-600 dark:text-gray-400 text-lg">{results.totalProducts} nəticə tapıldı.</p>
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {results.products.map((product) => {
                            const imageUrl = product?.images?.[0]?.url || defaultImageUrl;
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
                                                src={imageUrl}
                                                alt={product.name || "Məhsul şəkli"}
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full py-2 px-4">
                                                    Up to 35% off
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button type="button" className="p-3 text-gray-500 hover:bg-gray-200 rounded-full transition-all duration-300">
                                                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

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

                                            <ul className="flex items-center gap-4 text-sm mb-4">
                                                <li className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                                                    </svg>
                                                    Sürətli çatdırılma
                                                </li>
                                            </ul>

                                            <div className="flex items-center justify-between mt-4">
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {product.price}<span className="text-lg">₼</span>
                                                </p>
                                                <button 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addToCart(product);
                                                    }}
                                                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
                                                >
                                                    Səbətə əlavə et
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
