import React from 'react';
import { useGetCartQuery, useRemoveFromCartMutation, useUpdateCartQuantityMutation } from '../redux/api/productsApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SebetCart = () => {
    const { data: cartData, isLoading, error } = useGetCartQuery();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [updateQuantity] = useUpdateCartQuantityMutation();

    // Ümumi məbləği hesablama
    const calculateTotal = () => {
        if (!cartData?.cart) return 0;
        return cartData.cart.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    // Məhsul sayını dəyişmə
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

    // Məhsulu səbətdən silmə
    const handleRemoveFromCart = async (productId) => {
        try {
            await removeFromCart(productId).unwrap();
            toast.success('Məhsul səbətdən silindi');
        } catch (error) {
            console.error("Məhsul silinərkən xəta:", error);
            toast.error('Məhsul silinərkən xəta baş verdi');
        }
    };

    // Loading və error halları
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

    // Boş səbət
    if (!cartData?.cart?.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <i className="fa-solid fa-shopping-cart text-4xl text-gray-400 mb-4"></i>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Səbətiniz boşdur</h2>
                    <p className="text-gray-500 mb-4">Səbətinizdə heç bir məhsul yoxdur</p>
                    <Link
                        to="/"
                        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Alış-verişə başla
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-gray-50 py-8 min-h-screen">
            <div className="mx-auto max-w-screen-xl px-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                    Səbətim ({cartData.cart.length} məhsul)
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Məhsullar siyahısı */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartData.cart.map((item) => (
                            <div key={item.product._id}
                                className="bg-white rounded-lg shadow p-4 transition-shadow hover:shadow-md"
                            >
                                <div className="flex gap-4">
                                    {/* Məhsul şəkli */}
                                    <div className="w-24 h-24 flex-shrink-0">
                                    </div>

                                    {/* Məhsul məlumatları */}
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Stok: {item.product.stock}
                                        </p>
                                        <div className="flex items-center justify-between mt-4">
                                            {/* Miqdar kontrolları */}
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleQuantityChange(
                                                        item.product._id,
                                                        item.quantity,
                                                        item.product.stock,
                                                        -1
                                                    )}
                                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="w-12 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(
                                                        item.product._id,
                                                        item.quantity,
                                                        item.product.stock,
                                                        1
                                                    )}
                                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                                    disabled={item.quantity >= item.product.stock}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Qiymət */}
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {(item.product.price * item.quantity).toFixed(2)}₼
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {item.product.price}₼ / ədəd
                                                </p>
                                            </div>
                                        </div>

                                        {/* Əməliyyat düymələri */}
                                        <div className="flex justify-end mt-4 space-x-4">
                                            <button
                                                onClick={() => handleRemoveFromCart(item.product._id)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sifariş xülasəsi */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Sifariş xülasəsi
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Məhsulların qiyməti</span>
                                    <span className="font-medium">{calculateTotal().toFixed(2)}₼</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Çatdırılma</span>
                                    <span className="font-medium">0.00₼</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold">Ümumi</span>
                                        <span className="text-lg font-semibold">{calculateTotal().toFixed(2)}₼</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-blue-500 text-white py-3 rounded-lg mt-6 hover:bg-blue-600 transition-colors">
                                Sifarişi təsdiqlə
                            </button>

                            <Link
                                to="/"
                                className="block text-center text-blue-500 hover:text-blue-700 mt-4 text-sm"
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