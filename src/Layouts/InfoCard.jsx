import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function InfoCard({ image, title, desc, link }) {
    return (
        <div className="flex-1 min-w-[300px] max-w-md p-8 bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-300 group">
            {/* Icon */}
            <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-100">
                <img src={image} alt={title} className="w-10 h-10 object-contain" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{title}</h2>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed mb-8 h-24 overflow-hidden">{desc}</p>

            {/* Button */}
            <Link to={link} className="inline-block w-full">
                <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-green-600 hover:shadow-green-500/30 transition-all duration-300 group-hover:translate-y-[-2px]">
                    <span>Explore Now</span>
                    <ArrowRightIcon className="w-5 h-5" />
                </button>
            </Link>
        </div>
    );
}

export default InfoCard;
