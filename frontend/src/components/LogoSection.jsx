import React from 'react'

const LogoSection = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
                <div className="flex justify-center">
                    <img 
                        src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1738917428/svg1_tolzrc.png"
                        alt="Triangle Logo"
                        className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                    />
                </div>
                <div className="flex justify-center">
                    <img 
                        src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1738917487/svg2_berngc.png"
                        alt="Box Logo"
                        className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                    />
                </div>
                <div className="flex justify-center">
                    <img 
                        src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1738920176/svg3_fy2qvd.png"
                        alt="Diamond Logo"
                        className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                    />
                </div>
                <div className="flex justify-center">
                    <img 
                        src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1738920274/svg4_ppjwas.png"
                        alt="Circle Logo"
                        className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                    />
                </div>
                <div className="flex justify-center">
                    <img 
                        src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1738920731/svg5_vefpxh.png"
                        alt="Hexagon Logo"
                        className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default LogoSection;