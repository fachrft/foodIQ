import { color } from "chart.js/helpers";
import React from "react";

const Info = ({ image, warning, color, kalori }) => {
    return (
        <div className="mt-8 flex justify-center">
            <button className={`flex items-center ${color}  md:max-w-md  text-white font-semibold px-3 md:px-9 py-3 rounded-3xl shadow-lg hover:bg-green-600 transition-all duration-300 gap-4`}>
                <img src={image} className="w-10" alt="" />
                <div>
                    <p className="text-md">{warning}</p>
                    <p className="text-sm">{kalori}</p>
                </div>
            </button>
        </div>
    );
};

export default Info;
