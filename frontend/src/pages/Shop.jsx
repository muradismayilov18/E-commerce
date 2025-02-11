import React from 'react'

import Product from '../components/Product'

const Shop = () => {
    return (
      <>
      <div className="bg-blue-100 py-10 px-6 md:px-20 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black">Shop - Full Width</h1>
          <p className="text-gray-500 font-semibold mt-2">
            HOME / <span className="text-black">SHOP</span>
          </p>
        </div>
        <img
          src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1739266328/banner_eqhh6u.png"
          alt="Product"
          className="h-32 md:h-40 lg:h-48 object-contain"
        />
      </div>
      <Product/>
      </>
    );
  }

export default Shop