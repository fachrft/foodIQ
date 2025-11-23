import React, { useState } from "react";
import axios from "axios";
import FoodItems from "./Fragments/FoodItems";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const FoodList = ({ foods, updateDetailFood }) => {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingId, setLoadingId] = useState(null);

    const totalPages = foods?.food ? Math.ceil(foods?.food?.length / itemsPerPage) : 0;
    const paginatedfoods = foods?.food?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const fetchData = () => {
        const storedData = JSON.parse(localStorage.getItem("hasilPerhitungan"));
        return storedData || null;
    };

    const data = fetchData();
    const accessToken = data?.token;

    const getFoodById = async (id) => {
        if (!accessToken) {
            console.error("Token tidak ditemukan.");
            return;
        }
        
        setLoadingId(id);
        try {
            // Corrected API call: headers in the config object (3rd argument)
            const response = await axios.post(
                `https://food-iq-api.vercel.app/food/search/${id}`, 
                {}, // Empty body for POST request if needed, or null
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const detail = response.data.food;
            updateDetailFood(detail);
            // Optional: scroll to detail view on mobile
            if (window.innerWidth < 1024) {
                 const detailElement = document.getElementById("detail-food");
                 if(detailElement) detailElement.scrollIntoView({ behavior: "smooth" });
            }
        } catch (error) {
            console.error("Error saat melakukan request:", error.response?.data || error.message);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl rounded-[2rem] p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Search Results</h3>
            
            {(!foods?.food || foods.food.length === 0) ? (
                <div className="text-center py-10 text-gray-500">
                    <div className="mb-4 text-4xl">🥗</div>
                    <p className="text-lg font-medium">No results yet</p>
                    <p className="text-sm mt-2">Try searching for something like "Apple" or "Tacos"</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {paginatedfoods.map((food, index) => (
                            <div key={index} className="relative group">
                                <FoodItems
                                    name={food.food_name}
                                    size={food.servings.serving[0].serving_description}
                                    calories={food.servings.serving[0].calories}
                                    carbohydrate={food.servings.serving[0].carbohydrate}
                                    fat={food.servings.serving[0].fat}
                                    protein={food.servings.serving[0].protein}
                                    onClick={() => getFoodById(food.food_id)}
                                />
                                {loadingId === food.food_id && (
                                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl">
                                        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
                            <button 
                                onClick={handlePreviousPage} 
                                disabled={currentPage === 1} 
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                            >
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            
                            <span className="text-sm font-medium text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button 
                                onClick={handleNextPage} 
                                disabled={currentPage === totalPages} 
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FoodList;
