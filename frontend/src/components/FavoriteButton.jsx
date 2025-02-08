import { useState, useEffect } from 'react';
import { useGetFavoritesQuery, useRemoveFromFavoritesMutation } from '../redux/api/productsApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const FavoriteButton = () => {
    const { data: favoriteData, isLoading, refetch } = useGetFavoritesQuery();
    const [removeFromFavorites] = useRemoveFromFavoritesMutation();
    const [localFavorites, setLocalFavorites] = useState([]);

    // **API-dan gələn favoritlər lokal state-ə otursun**
    useEffect(() => {
        if (favoriteData?.favorites) {
            setLocalFavorites(favoriteData.favorites);
        }
    }, [favoriteData]);

    const handleRemoveFromFavorites = async (productId) => {
        try {
            // Optimistik yeniləmə (UI dərhal dəyişir)
            setLocalFavorites(prev => prev.filter(item => item._id !== productId));

            await removeFromFavorites(productId).unwrap();
            toast.success('Məhsul favorilərdən silindi');

            // **API-dan yenilənmiş məlumatları çəkmək**
            refetch();
        } catch (error) {
            toast.error('Məhsul silinərkən xəta baş verdi');
            setLocalFavorites(favoriteData?.favorites || []); // Əvvəlki vəziyyətə qaytar
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!localFavorites.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center">
                    <i className="fas fa-heart text-5xl text-gray-300 mb-6"></i>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Favori siyahınız boşdur</h2>
                    <p className="text-gray-500 mb-8 text-lg">Hələ heç bir məhsulu favori etməmisiniz</p>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <i className="fas fa-shopping-bag mr-2"></i>
                        Alış-verişə başla
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-gradient-to-b from-gray-50 to-white py-12 min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Favori Məhsullarım 
                        <span className="ml-2 text-2xl text-gray-500">
                            ({localFavorites.length} məhsul)
                        </span>
                    </h2>
                    <Link 
                        to="/"
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Alış-verişə davam et
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {localFavorites.map((product) => (
                        <div 
                            key={product._id} 
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                        >
                            <div className="relative">
                                <Link to={`/product/${product._id}`}>
                                    <img 
                                        src={product.images?.[0]?.url || '/default-product.jpg'}
                                        alt={product.name} 
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/default-product.jpg';
                                        }}
                                    />
                                </Link>
                                <button
                                    onClick={() => handleRemoveFromFavorites(product._id)}
                                    className="absolute top-3 right-3 p-3 bg-white/90 backdrop-blur-sm text-red-500 
                                             rounded-full hover:bg-red-500 hover:text-white transition-all duration-300
                                             opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0
                                             shadow-sm hover:shadow-md"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                                {product.stock < 5 && (
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                                        Son {product.stock} ədəd
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-5">
                                <Link to={`/product/${product._id}`}>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                        {product.name}
                                    </h3>
                                </Link>
                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {product.price.toFixed(2)} ₼
                                        </p>
                                        {product.oldPrice && (
                                            <p className="text-sm text-gray-500 line-through">
                                                {product.oldPrice.toFixed(2)} ₼
                                            </p>
                                        )}
                                    </div>
                                    <Link 
                                        to={`/product/${product._id}`}
                                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                                    >
                                        <span>Ətraflı</span>
                                        <i className="fas fa-arrow-right ml-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FavoriteButton;
