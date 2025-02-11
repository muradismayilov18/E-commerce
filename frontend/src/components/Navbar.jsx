import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/features/userSlice"
import { useGetCartQuery, useGetFavoritesQuery } from "../redux/api/productsApi"

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => ({
    isAuthenticated: state.userSlice.isAuthenticated,
    user: state.userSlice.user,
  }))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`)
    }
    setShowSearch(false)
  }

  const { data: cartData, isLoading: cartLoading, error: cartError } = useGetCartQuery()

  const getCartItemCount = () => {
    if (cartError || cartLoading || !cartData?.cart) {
      return 0
    }
    return cartData.cart.length
  }

  const getFavoriteItemCount = () => {
    if (favoriteError || favoriteLoading || !favoriteData?.favorites) {
      return 0
    }
    return favoriteData.favorites.length
  }

  const { data: favoriteData, isLoading: favoriteLoading, error: favoriteError } = useGetFavoritesQuery()

  return (
    <nav className="bg-white shadow-xl border-b-2 border-gray-200">
      {/* Fullscreen Search Panel */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="w-full max-w-xl relative px-4">
            <button
              onClick={() => setShowSearch(false)}
              className="absolute -top-12 right-4 text-white hover:text-gray-200 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Axtarış..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors duration-200 bg-white/90"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Axtar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              {isAuthenticated && user?.name ? (
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full text-2xl text-white font-semibold shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <img
                  className="h-12 w-auto"
                  src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1737639267/logo_wkss52.png"
                  alt="Logo"
                />
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-gray-500 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-10">
              <Link
                to="/"
                className="text-gray-800 hover:text-yellow-500 px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-800 hover:text-yellow-500 px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-gray-800 hover:text-yellow-500 px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300"
              >
                About
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-gray-800 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link
              to="/cart"
              className="relative p-2 text-gray-800 hover:text-yellow-500 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 004 0z"
                />
              </svg>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* Favorites */}
            <Link
              to="/favori"
              className="relative p-2 text-gray-800 hover:text-yellow-500 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {getFavoriteItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getFavoriteItemCount()}
                </span>
              )}
            </Link>

            {/* User Profile Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center focus:outline-none rounded-full transition-all duration-200"
                >
                  <i className="fa-regular fa-user"></i>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-10 border border-gray-300">
                    <Link
                      to="/admin/products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                    >
                      Add Products
                    </Link>
                    <Link
                      to="/admin/product"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                    >
                      Admin Product
                    </Link>
                    <Link
                      to="/admin/editproduct"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                    >
                      Edit Product
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-6">
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-yellow-500 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 hover:text-yellow-500 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-gray-800 hover:text-yellow-500 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-gray-800 hover:text-yellow-500 px-3 py-2 rounded-md text-base font-medium"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-gray-800 hover:text-yellow-500 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar