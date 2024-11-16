import { color } from "chart.js/helpers";
import React from "react";

const Info = ({ image, warning, color, kalori }) => {
    return (
        <div className="mt-8 flex justify-center">
            <button className={`flex items-center ${color} h-[79px] md:w-[405px] md:h-[88px] text-white font-semibold px-8 py-3 rounded-3xl shadow-lg hover:bg-green-600 transition-all duration-300 gap-4`}>
                <img src={image} className="w-10" alt="" />
                <div>
                    <p className="text-left text-md">{warning}</p>
                    <p className="text-sm">{kalori}</p>
                </div>
            </button>
        </div>
    );
};

export default Info;
