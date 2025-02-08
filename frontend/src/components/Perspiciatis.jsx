import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Perspiciatis = () => {
    const slides = [
        {
            id: 1,
            image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
            title: "Gaming Accessories",
            description: "Best Gaming accessories for your setup",
            buttonText: "Shop Now"
        },
        {
            id: 2,
            image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
            title: "New Collection",
            description: "Check out our latest products",
            buttonText: "Discover"
        },
        {
            id: 3,
            image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
            title: "Special Offers",
            description: "Get amazing deals on selected items",
            buttonText: "View Deals"
        }
    ];

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                loop={true}
                className="mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-[500px] object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/1200x500';
                                }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                                    <p className="mb-6">{slide.description}</p>
                                    <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors">
                                        {slide.buttonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Perspiciatis;