import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const ProductCard = ({ mehsul }) => {
   const defaultImageUrl = "https://via.placeholder.com/150"; // Placeholder şəkili

   if (!mehsul) {
       return null;
   }

   const imageUrl = mehsul.images && mehsul.images[0] ? mehsul.images[0].url : defaultImageUrl;

   return (
       <Link to={`/product/${mehsul._id}`}>
           <section className="bg-gray-50 antialiased dark:bg-gray-900">
               <div className="mx-auto">
                   <div className="mb-4 grid gap-4 md:mb-8">
                       <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                           <div className="rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                               <div className="h-56 w-full overflow-hidden rounded-lg">
                                   <img
                                       className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                                       src={imageUrl}
                                       alt={mehsul.name || "product image"}
                                   />
                               </div>
                               <div className="pt-6">
                                   {/* Digər məzmun */}
                               </div>
                           </div>

                           <div className="pt-6">
                               <div className="mb-4 flex items-center justify-between gap-4 pt-[40px]">
                                   <span className="me-2 rounded bg-blue-500 text-[#fff] px-2.5 py-0.5 text-xs"> Up to 35% off </span>
                               </div>

                               <p className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">{mehsul.name}</p>

                               <div className="mt-2 flex items-center gap-2">
                                   <StarRatings
                                       rating={mehsul.ratings || 0}
                                       starRatedColor="yellow"
                                       numberOfStars={5}
                                       starDimension="16px"
                                       starSpacing="2px"
                                   />
                                   <p className="text-sm font-medium text-gray-900 dark:text-white">{mehsul.ratings || "Reyting no"}</p>
                                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{mehsul.stock || "Stokda yoxdur"}</p>
                               </div>

                               <div className="mt-4">
                                   <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                                       {mehsul.price}<span className="text-lg">&#8380;</span>
                                   </p>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </section>
       </Link>
   );
};

export default ProductCard;
