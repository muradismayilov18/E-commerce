import { useState, useEffect } from 'react';

const Deal = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);

        const timer = setInterval(() => {
            const now = new Date();
            const difference = endDate - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({
                days,
                hours,
                minutes,
                seconds
            });

            if (difference < 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gray-800 rounded-xl max-w-7xl mx-auto my-16 p-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Left Content */}
                <div className="md:w-1/2 text-center md:text-left text-white">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-gray-200">
                        Weekly Exclusive Deal
                    </h2>
                    <div className="text-2xl md:text-3xl font-semibold mb-6">
                        <span className="text-yellow-400">$179.00</span>
                        <span className="text-lg text-gray-500 ml-4"><del>$249.00</del></span>
                    </div>
                    
                    {/* Timer */}
                    <div className="flex gap-8 mb-8 justify-center md:justify-start">
                        {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold bg-gray-900 p-6 rounded-lg min-w-[3.5rem] text-yellow-400 shadow-lg">
                                    {String(timeLeft[unit]).padStart(2, '0')}
                                </div>
                                <div className="text-gray-400 uppercase text-xs mt-2">{unit.toUpperCase()}</div>
                            </div>
                        ))}
                    </div>

                    <button className="bg-yellow-400 text-gray-800 px-12 py-4 rounded-full text-lg font-medium tracking-wider transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md">
                        Shop Now
                    </button>
                </div>

                {/* Right Image */}
                <div className="md:w-1/2">
                    <img 
                        src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1738916588/2_witg7u.png" 
                        alt="Monitor Deal" 
                        className="rounded-2xl w-full max-w-lg mx-auto h-auto object-cover shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
};

export default Deal;
