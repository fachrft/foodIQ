import React from "react";
import { FaUtensils } from "react-icons/fa"; // Icon untuk simbol food
import { Link } from "react-router-dom";

function InfoCard({ image, title, desc, link }) {
    return (
        <div className="max-w-md md:max-w-lg p-12 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105">
            {/* Icon */}
            <div className="flex justify-center items-center w-20 h-20 bg-blue-100 rounded-full mb-6 transition-transform duration-300 transform hover:scale-110">
                <img src={image} alt="" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold">{title}</h2>

            {/* Description */}
            <p className="text-gray-500 mt-3 text-lg">{desc}</p>

            {/* Button */}
            <Link to={link}>
                <button className="w-full mt-8 bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300 text-lg">More</button>
            </Link>
        </div>
    );
}

export default InfoCard;
