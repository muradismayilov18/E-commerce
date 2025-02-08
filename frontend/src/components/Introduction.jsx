import React from 'react';
import Home from '../pages/Home';

const Introduction = () => {

  return (
    <>
    <section className="container mx-auto px-4 py-12 md:py-24 bg-gray-100">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Text Content */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">The Device That Takes You Higher.</h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicin do eiu smod tempor incididunt ut labore et dolo aliqua.
          Ut enim ad minim veniam.
        </p>
        <button className="bg-black text-white px-8 py-4 font-medium tracking-wide hover:bg-gray-800 transition-colors">
          VIEW COLLECTION
        </button>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1738821819/layer1_mlpmds.jpg"
          alt="VR device demonstration"
          className="w-full rounded-lg object-cover"
        />
        <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply rounded-lg"></div>
      </div>
    </div>
  </section>
  <Home/>
  </>
  );
};

export default Introduction;