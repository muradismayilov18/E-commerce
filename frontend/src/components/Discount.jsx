import React from 'react'

const Discount = () => {
    return (
        <div className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12">
                        Get Discount 30% Off
                    </h2>

                    <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                        <input
                            type="email"
                            placeholder="YOUR EMAIL"
                            className="flex-1 px-6 py-4 rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 uppercase"
                        />
                        <button className="px-8 py-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300 uppercase font-bold">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discount;