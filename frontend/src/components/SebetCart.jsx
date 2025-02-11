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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="animate-pulse">
            <div className="h-24 w-24 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-glow animate-spin-slow"></div>
          </div>
        </div>
      );
    
      if (error) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-white/10 transform hover:scale-[1.02] transition-all duration-500">
                <div className="mb-8 animate-float">
                    <svg className="w-24 h-24 mx-auto text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 mb-6 font-playfair">
                    Favori Siyahınız Boşdur
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                    Hələ heç bir məhsul əlavə etməmisiniz.
                </p>
                <Link
                    to="/shop"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-600 text-white px-8 py-4 rounded-xl hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold tracking-wide"
                >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    Alış-verişə Başla
                </Link>
                <p className="text-gray-400 text-sm mt-6 max-w-md">
                    {error.message}
                </p>
            </div>
        </div>
    );

    if (!cartData?.cart?.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-8">
                <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-white/10 transform hover:scale-[1.02] transition-all duration-500">
                    <div className="mb-8 animate-float">
                        <svg className="w-32 h-32 mx-auto text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-6 font-playfair">Səbətiniz Boşdur</h2>
                    <p className="text-gray-300 text-lg mb-8">Lüks məhsullar kolleksiyamızı kəşf edin</p>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold tracking-wide"
                    >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        Alış-verişə başla
                    </Link>
                </div>
            </div>
        );
    }

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
        <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 text-center mb-16 font-playfair">
                Lüks Səbətim ({cartData.cart.length} məhsul)
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        {cartData.cart.map((item) => (
                            <div key={item.product._id}
                                className="group bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-6 border border-white/10 hover:border-amber-400/30 relative overflow-hidden"
                            >
                                <div className="flex gap-6">
                                    <div className="w-40 h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-xl relative">
                                        <Link to="">
                                            <img
                                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                                src={item.product.images?.[0]?.url || "default-image.jpg"}
                                                alt={item.product.name}
                                            />
                                        </Link>
                                        <span className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">Premium</span>
                                    </div>

                                    <div className="flex-grow">
                                        <Link to={`/product/${item.product._id}`}>
                                            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-2 hover:from-amber-300 hover:to-amber-500 transition-all duration-300">
                                                {item.product.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center gap-2 mb-4">
                                        <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <span className="text-sm text-gray-300 ml-2">({item.product?.ratings || 0} Rating)</span>
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
                                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all transform shadow-lg
                                                        ${item.quantity <= 1
                                                            ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed'
                                                            : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 hover:scale-105'}`}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <span className="text-lg">-</span>
                                                </button>
                                                <span className="w-12 text-center font-medium text-2xl text-amber-400">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(
                                                        item.product._id,
                                                        item.quantity,
                                                        item.product.stock,
                                                        1
                                                    )}
                                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all transform shadow-lg
                                                        ${item.quantity >= item.product.stock
                                                            ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed'
                                                            : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 hover:scale-105'}`}
                                                    disabled={item.quantity >= item.product.stock}
                                                >
                                                    <span className="text-lg">+</span>
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                                    {(item.product.price * item.quantity).toFixed(2)}₼
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    {item.product.price.toFixed(2)}₼ / ədəd
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <button
                                                onClick={() => handleRemoveFromCart(item.product._id)}
                                                className="flex items-center text-amber-400 hover:text-amber-300 transition-colors group"
                                            >
                                                <svg className="w-6 h-6 mr-2 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sticky top-8 border border-white/10">
                            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-8 font-playfair">
                                Sifariş xülasəsi
                            </h3>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className='text-gray-300'>Məhsulların qiyməti</span>
                                    <span className="text-amber-400 font-medium text-lg">{calculateTotal().toFixed(2)}₼</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className='text-gray-300'>Çatdırılma</span>
                                    <span className="text-emerald-400 font-medium text-lg">0₼</span>
                                </div>
                                <div className="border-t border-white/20 my-6"></div>
                                <div className="flex justify-between items-center">
                                    <span className='text-2xl text-gray-100'>Cəm</span>
                                    <span className='text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent'>{calculateTotal().toFixed(2)}₼</span>
                                </div>
                            </div>

                            <button
                                className="w-full mt-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 rounded-xl hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-2"
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
