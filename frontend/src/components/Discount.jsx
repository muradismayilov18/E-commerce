import React from 'react';

const Discount = () => {
    return (
        <div className="bg-gradient-to-r from-teal-500 to-purple-700 py-24">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12">
                        Unlock 30% Discount on Your First Purchase
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-5 rounded-full border-2 border-transparent bg-white text-gray-800 placeholder-gray-500 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 ease-in-out shadow-xl"
                        />
                        <button className="px-12 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-bold rounded-full hover:from-indigo-600 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discount;
