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
        <div className="bg-[#f6f6f6] rounded-xl max-w-6xl mx-auto my-16 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Weekly Deal</h2>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-8">$179.00</div>
                
                {/* Timer */}
                <div className="flex gap-4 mb-8 justify-center md:justify-start">
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold bg-gray-100 p-3 rounded-lg min-w-[3rem]">
                            {String(timeLeft.days).padStart(2, '0')}
                        </div>
                        <div className="text-gray-600 uppercase text-xs mt-1">DAYS</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold self-start">:</div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold bg-gray-100 p-3 rounded-lg min-w-[3rem]">
                            {String(timeLeft.hours).padStart(2, '0')}
                        </div>
                        <div className="text-gray-600 uppercase text-xs mt-1">HOURS</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold self-start">:</div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold bg-gray-100 p-3 rounded-lg min-w-[3rem]">
                            {String(timeLeft.minutes).padStart(2, '0')}
                        </div>
                        <div className="text-gray-600 uppercase text-xs mt-1">MINUTES</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold self-start">:</div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold bg-gray-100 p-3 rounded-lg min-w-[3rem]">
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-gray-600 uppercase text-xs mt-1">SECONDS</div>
                    </div>
                </div>

                <button className="bg-[#f36823e2] hover:bg-[#f96116] text-white px-8 py-3 rounded-md transition-colors duration-300">
                    SHOP NOW
                </button>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2">
                <img 
                    src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1738916588/2_witg7u.png" 
                    alt="Monitor Deal" 
                    className="rounded-lg w-full max-w-md mx-auto h-auto object-cover"
                />
            </div>
        </div>
    </div>
    );
};

export default Deal;