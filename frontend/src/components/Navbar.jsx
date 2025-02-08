import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/userSlice';
import axios from "axios";
import { useGetCartQuery, useGetFavoritesQuery } from '../redux/api/productsApi';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cart və Favorites data
    const { data: cartData } = useGetCartQuery();
    const { data: favoriteData } = useGetFavoritesQuery();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    // Navbar komponenti içində

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setError('Axtarış üçün məhsul adı daxil edin');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:3010/commerce/mehsullar/products/search?keyword=${searchQuery}`);

            if (response.data.products.length === 0) {
                setError('Heç bir məhsul tapılmadı');
                return;
            }

            navigate('/search-results', {
                state: {
                    results: {
                        products: response.data.products,
                        totalProducts: response.data.totalProducts,
                        totalPages: response.data.totalPages,
                        currentPage: response.data.currentPage
                    }
                }
            });
        } catch (error) {
            setError('Axtarış zamanı xəta baş verdi');
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <nav className="bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1737639267/logo_wkss52.png"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                </Link>

                <div className="flex md:order-2">
                    {/* Search button for mobile */}
                    <button
                        type="button"
                        data-collapse-toggle="navbar-search"
                        aria-controls="navbar-search"
                        aria-expanded="false"
                        className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
                    >
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>

                    {/* Search input for desktop */}
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="search-navbar"
                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Cart Icon with Counter */}
                    <Link to="/cart" className="relative">
                        <i className="fa-solid fa-cart-shopping p-[10px]"></i>
                        {cartData?.cart?.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartData?.cart?.length}
                            </span>
                        )}
                    </Link>

                    {/* Favorites Icon with Counter */}
                    <Link to="/favori" className="relative">
                        <i className="fa-solid fa-heart p-[10px]"></i>
                        {favoriteData?.favorites?.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {favoriteData?.favorites?.length}
                            </span>
                        )}
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        data-collapse-toggle="navbar-search"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-search"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    {/* Mobile Search */}
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="search-navbar"
                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Navigation Menu */}
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <Link to="/home" className="block py-2 px-3 text-black" aria-current="page">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/home" className="block py-2 px-3 text-black" aria-current="page">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link to="/home" className="block py-2 px-3 text-black" aria-current="page">
                                Pages
                            </Link>
                        </li>
                        <li>
                            <Link to="/home" className="block py-2 px-3 text-black" aria-current="page">
                                News
                            </Link>
                        </li>
                        <li>
                            <Link to="/home" className="block py-2 px-3 text-black" aria-current="page">
                                Contact
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            >
                                Logout
                            </button>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                                    aria-current="page"
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;