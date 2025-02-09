import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ProductCard = ({ mehsul }) => {
  const defaultImageUrl = "https://via.placeholder.com/150";
  if (!mehsul) return null;

  const imageUrl =
    mehsul.images && mehsul.images[0] ? mehsul.images[0].url : defaultImageUrl;

  return (
    <Link to={`/product/${mehsul._id}`} className="group">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-800 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-indigo-500 h-full flex flex-col">
        
        {/* Ürün Resmi */}
        <div className="relative">
          <img
            className="w-full h-64 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            src={imageUrl}
            alt={mehsul.name || "product image"}
          />
          {/* Etiket */}
          <span className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md transform rotate-3">
            🚀 Yeni Gəliş!
          </span>
        </div>

        {/* Ürün Detayları */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 transition-all duration-300 group-hover:text-indigo-600">
              {mehsul.name}
            </h3>

            {/* Reytinq */}
            <div className="flex items-center gap-2 mt-2">
              <StarRatings
                rating={mehsul.ratings || 0}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="4px"
              />
              <span className="text-sm text-gray-500">
                ({mehsul.ratings || "Reyting yoxdur"})
              </span>
            </div>

            {/* Stok */}
            <p className="text-sm text-gray-600 mt-1">
              {mehsul.stock ? `Stokda: ${mehsul.stock} ədəd` : "Stokda yoxdur"}
            </p>
          </div>

          {/* Fiyat */}
          <div className="mt-4">
            <p className="text-2xl font-bold text-indigo-600 transition-all duration-300 group-hover:text-indigo-800">
              {mehsul.price} <span className="text-lg">₼</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
