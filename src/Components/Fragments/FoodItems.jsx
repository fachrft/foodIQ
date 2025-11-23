import React from "react";

const FoodItems = ({ name, size, calories, carbohydrate, fat, protein, onClick }) => {
    return (
        <div 
            className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-start justify-between gap-4">
                {/* Content Section */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-2 line-clamp-2">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                        Serving: <span className="font-medium text-gray-700">{size}</span>
                    </p>
                    
                    {/* Nutrition Info */}
                    <div className="flex flex-wrap gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-1 rounded-lg font-medium">
                            <span className="font-bold">{calories}</span> kcal
                        </span>
                        <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg font-medium">
                            <span className="font-bold">{fat}g</span> Fat
                        </span>
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 rounded-lg font-medium">
                            <span className="font-bold">{carbohydrate}g</span> Carbs
                        </span>
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-medium">
                            <span className="font-bold">{protein}g</span> Protein
                        </span>
                    </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0 text-gray-400 group-hover:text-green-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default FoodItems;
