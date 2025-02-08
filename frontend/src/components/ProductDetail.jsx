import React from 'react';
import { useParams } from "react-router-dom";
import { 
    useGetProductDetailsQuery, 
    useAddToCartMutation,
    useAddToFavoritesMutation 
} from '../redux/api/productsApi';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const params = useParams();
    const { data, isLoading, error } = useGetProductDetailsQuery(params?.id);
    const [addToCart] = useAddToCartMutation();
    const [addToFavorites] = useAddToFavoritesMutation();

    const product = data?.product;

    // Məhsul şəklinin URL-ni təyin et
    const productImageUrl = product?.images && product.images.length > 0
        ? product.images[0]?.url
        : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg";

    const handleAddToCart = async (e) => {
        e.preventDefault();
        try {
            await addToCart({
                productId: product._id,
                quantity: 1
            }).unwrap();
            toast.success('Məhsul səbətə əlavə edildi');
        } catch (error) {
            console.error("Səbətə əlavə edilərkən xəta:", error);
            toast.error('Məhsul əlavə edilərkən xəta baş verdi');
        }
    };

    const handleAddToFavorites = async () => {
        try {
            const result = await addToFavorites(product._id).unwrap();
            if (result.success) {
                toast.success('Məhsul sevimlilərə əlavə edildi');
            }
        } catch (error) {
            console.error("Sevimlilərə əlavə edilərkən xəta:", error);
            toast.error(error.data?.message || 'Məhsul əlavə edilərkən xəta baş verdi');
        }
    };

    if (isLoading) return <div>Yüklənir...</div>;
    if (error) return <div>Xəta: {error.message}</div>;
    if (!product) return <div>Məhsul tapılmadı</div>;

    return (
        <section className="py-8 bg-gradient-to-br from-gray-50 to-white md:py-16 dark:from-gray-900 dark:to-gray-800 antialiased min-h-screen">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    {/* Şəkil bölməsi */}
                    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
                        <div className="relative group">
                            <img
                                className="w-full rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 object-cover"
                                src={productImageUrl}
                                alt={product?.name || "Product Image"}
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                        </div>
                    </div>

                    {/* Məhsul məlumatları bölməsi */}
                    <div className="mt-6 sm:mt-8 lg:mt-0 space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white leading-tight">
                                {product?.name}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-4">
                                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                                    {product?.price} <span className="text-2xl">₼</span>
                                </p>

                                <div className="flex items-center gap-2">
                                    <StarRatings
                                        rating={product?.ratings || 0}
                                        starRatedColor="#FBBF24"
                                        numberOfStars={5}
                                        starDimension="24px"
                                        starSpacing="2px"
                                    />
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        ({product?.ratings || 0} rating)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stok və Çatdırılma məlumatları */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">Stokda var</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 8l-8 5-8-5V6l8 5 8-5V8z"></path>
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">2-3 gün ərzində çatdırılma</span>
                            </div>
                        </div>

                        {/* Düymələr */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                            >
                                <span className="relative flex items-center w-full px-5 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    Səbətə əlavə et
                                </span>
                            </button>

                            <button 
                                onClick={handleAddToFavorites}
                                className="flex-1 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                                Sevimlilərə əlavə et
                            </button>
                        </div>

                        {/* Məhsul təsviri */}
                        <div className="prose prose-lg dark:prose-invert">
                            <hr className="my-6 border-gray-200 dark:border-gray-700" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Məhsul haqqında
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {product?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;