import React from "react";

const RecipeItems = ({ image, name, desc, calories, carbohydrate, fat, protein, onClick }) => {
    return (
        <div 
            className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex gap-4">
                {/* Image Section */}
                <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-100">
                    <img 
                        src={image} 
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                    />
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-1 line-clamp-1">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                        {desc}
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
            </div>
        </div>
    );
};

export default RecipeItems;
