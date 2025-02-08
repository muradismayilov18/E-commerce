// SebetCart.jsx
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
            console.error("Miqdar yenilənərkən xəta:", error);
            toast.error('Miqdar yenilənərkən xəta baş verdi');
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await removeFromCart(productId).unwrap();
            toast.success('Məhsul səbətdən silindi');
        } catch (error) {
            console.error("Məhsul silinərkən xəta:", error);
            toast.error('Məhsul silinərkən xəta baş verdi');
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-red-500 text-center">
                <p className="text-xl font-semibold">Xəta baş verdi</p>
                <p className="text-sm">{error.message}</p>
            </div>
        </div>
    );

    if (!cartData?.cart?.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center">
                    <i className="fa-solid fa-shopping-cart text-5xl text-gray-300 mb-6"></i>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Səbətiniz boşdur</h2>
                    <p className="text-gray-500 mb-8 text-lg">Səbətinizdə heç bir məhsul yoxdur</p>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-10">
                    Səbətim ({cartData.cart.length} məhsul)
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {cartData.cart.map((item) => (
                            <div key={item.product._id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100"
                            >
                                <div className="flex gap-6">
                                    {/* Məhsul şəkli */}
                                    <div className="w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                                        <Link to={`/product/${item.product._id}`}>
                                            <img
                                                src={item.product.images?.[0]?.url || '/default-product.jpg'}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/default-product.jpg';
                                                }}
                                            />

                                        </Link>
                                    </div>

                                    <div className="flex-grow">
                                        <Link to={`/product/${item.product._id}`}>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                                                {item.product.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${item.product.stock > 5
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-orange-100 text-orange-800'}`}>
                                                Stok: {item.product.stock}
                                            </span>
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
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                                                        ${item.quantity <= 1
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
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
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                                                        ${item.quantity >= item.product.stock
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                                                    disabled={item.quantity >= item.product.stock}
                                                >
                                                    <span className="text-lg">+</span>
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-blue-600">
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
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                Sifariş xülasəsi
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Məhsulların qiyməti</span>
                                    <span className="font-medium">{calculateTotal().toFixed(2)}₼</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Çatdırılma</span>
                                    <span className="font-medium">0.00₼</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Ümumi</span>
                                        <span className="text-lg font-bold text-blue-600">{calculateTotal().toFixed(2)}₼</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-4 rounded-lg mt-6 hover:bg-blue-700 transition-colors font-medium">
                                Sifarişi təsdiqlə
                            </button>

                            <Link
                                to="/"
                                className="block text-center text-blue-600 hover:text-blue-800 mt-4 text-sm font-medium"
                            >
                                Alış-verişə davam et
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SebetCart;