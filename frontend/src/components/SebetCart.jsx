import React from 'react';
import { useGetCartQuery, useRemoveFromCartMutation, useUpdateCartQuantityMutation } from '../redux/api/productsApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SebetCart = () => {
    const { data: cartData, isLoading, error } = useGetCartQuery();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [updateQuantity] = useUpdateCartQuantityMutation();

    const calculateTotal = () => {
        if (!cartData?.cart) return 0;
        return cartData.cart.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    const handleQuantityChange = async (productId, currentQuantity, stock, change) => {
        const newQuantity = currentQuantity + change;

        if (newQuantity < 1) {
            toast.error('Məhsul sayı 1-dən az ola bilməz');
            return;
        }

        if (newQuantity > stock) {
            toast.error('Kifayət qədər stok yoxdur');
            return;
        }

        try {
            await updateQuantity({
                productId,
                quantity: newQuantity
            }).unwrap();
            toast.success('Məhsul sayı yeniləndi');
        } catch (error) {
            toast.error('Miqdar yenilənərkən xəta baş verdi');
        }
    };

    const handleRemoveFromCart = async (productId) => {
        const confirmed = window.confirm("Bu məhsulu səbətdən silmək istədiyinizə əminsiniz?");
        if (!confirmed) return;

        try {
            await removeFromCart(productId).unwrap();
            toast.success('Məhsul səbətdən silindi');
        } catch (error) {
            toast.error('Məhsul silinərkən xəta baş verdi');
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-200 to-blue-500">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-600"></div>
        </div>
      );
    
      if (error) return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-100 to-pink-200">
          <div className="text-red-500 text-center">
            <p className="text-xl font-semibold">Xəta baş verdi</p>
            <p className="text-sm">{error.message}</p>
          </div>
        </div>
      );

    if (!cartData?.cart?.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-100 to-white">
                <div className="text-center">
                    <i className="fa-solid fa-shopping-cart text-6xl text-gray-300 mb-6"></i>
                    <h2 className="text-4xl font-bold text-gray-800 mb-3">Səbətiniz boşdur</h2>
                    <p className="text-gray-500 mb-8 text-lg">Səbətinizdə heç bir məhsul yoxdur</p>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center bg-gradient-to-r from-teal-600 to-teal-800 text-white px-8 py-3 rounded-full hover:bg-gradient-to-r hover:from-teal-700 hover:to-teal-900 transition-all duration-300 shadow-xl transform hover:scale-105"
                    >
                        <i className="fas fa-shopping-bag mr-2"></i>
                        Alış-verişə başla
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-gradient-to-b from-teal-50 via-teal-100 to-teal-200 py-12 min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">
                    Səbətim ({cartData.cart.length} məhsul)
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        {cartData.cart.map((item) => (
                            <div key={item.product._id}
                                className="bg-gradient-to-r from-white to-teal-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 hover:border-teal-600 transform hover:scale-105"
                            >
                                <div className="flex gap-6">
                                    <div className="w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                                        <Link to={`/product/${item.product._id}`}>
                                            <img
                                                className="w-full h-64 object-cover rounded-t-3xl transition-all duration-300 group-hover:opacity-90"
                                                src={item.product.images?.[0]?.url || "default-image.jpg"}
                                                alt={item.product.name}
                                            />
                                        </Link>
                                    </div>

                                    <div className="flex-grow">
                                        <Link to={`/product/${item.product._id}`}>
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-teal-600 transition-colors duration-300">
                                                {item.product.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center gap-2 mb-4">
                                            <p className="text-gray-300 text-sm">
                                                {item.product.stock ? `Stokda: ${item.product.stock} ədəd` : "Stokda yoxdur"}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => handleQuantityChange(
                                                        item.product._id,
                                                        item.quantity,
                                                        item.product.stock,
                                                        -1
                                                    )}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform
                                                        ${item.quantity <= 1
                                                            ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                                                            : 'bg-teal-600 text-white hover:bg-teal-700 hover:scale-105'}`}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <span className="text-lg">-</span>
                                                </button>
                                                <span className="w-12 text-center font-medium text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(
                                                        item.product._id,
                                                        item.quantity,
                                                        item.product.stock,
                                                        1
                                                    )}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform
                                                        ${item.quantity >= item.product.stock
                                                            ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                                                            : 'bg-teal-600 text-white hover:bg-teal-700 hover:scale-105'}`}
                                                    disabled={item.quantity >= item.product.stock}
                                                >
                                                    <span className="text-lg">+</span>
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-teal-600">
                                                    {(item.product.price * item.quantity).toFixed(2)}₼
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {item.product.price.toFixed(2)}₼ / ədəd
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <button
                                                onClick={() => handleRemoveFromCart(item.product._id)}
                                                className="inline-flex items-center text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Sil
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-3xl shadow-lg p-6 sticky top-8 border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Sifariş xülasəsi
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Məhsulların qiyməti</span>
                                    <span className="font-medium">{calculateTotal().toFixed(2)}₼</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Çatdırılma</span>
                                    <span className="font-medium">0₼</span>
                                </div>
                                <div className="border-t border-gray-200 my-4"></div>
                                <div className="flex justify-between text-xl font-semibold text-gray-900">
                                    <span>Cəm</span>
                                    <span>{calculateTotal().toFixed(2)}₼</span>
                                </div>
                            </div>

                            <button
                                className="w-full mt-6 bg-gradient-to-r from-teal-600 to-teal-800 text-white font-semibold py-3 rounded-full hover:bg-gradient-to-r hover:from-teal-700 hover:to-teal-900 transition-all duration-300 shadow-xl transform hover:scale-105"
                                onClick={() => toast.info('Sifariş göndərmək funksiyası əlavə ediləcək!')}
                            >
                                Sifarişi tamamlamaq
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SebetCart;
