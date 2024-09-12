import React from "react";

const Banner = () => {
    return (
        <div className="w-full relative">
            <img
                className="w-full h-[400px] object-cover"
                src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688491%2Fsettings%2Fslider-2_o6aezc.jpg&w=1080&q=75"
                alt="banner"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-start ml-8">
                <h1 className="text-3xl font-semibold mb-4 text-">Welcome to Ogani</h1>
                <p className="text-main mb-4">See Our latest products from here</p>
                <button className="bg-main font-bold py-2 px-4 rounded text-gray-50">
                    Shop now
                </button>
            </div>
        </div>
    );
};

export default Banner;
