import React from 'react';

const ServiceSection = () => {
    const services = [
        {
            icon: (
                <svg className="w-16 h-16 text-gradient p-2 bg-blue-100 rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            ),
            title: "100% Free Shipping",
            description: "We ship all our products for free as long as you buy within the USA."
        },
        {
            icon: (
                <svg className="w-16 h-16 text-gradient p-2 bg-blue-100 rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            ),
            title: "24/7 Support",
            description: "Our support team is extremely active, you will get a response within 2 minutes."
        },
        {
            icon: (
                <svg className="w-16 h-16 text-gradient p-2 bg-blue-100 rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: "30 Day Return",
            description: "Our 30-day return program is open to customers, just fill up a simple form."
        }
    ];

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                        <div className="mb-6">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-300">
                            {service.title}
                        </h3>
                        <p className="text-gray-500 text-sm">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServiceSection;
