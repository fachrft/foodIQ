import React, { useState } from "react";
import axios from "axios";
import FoodItems from "./Fragments/FoodItems";
const FoodList = ({ foods, updateDetailFood }) => {
    const itemsPerPage = 4; // Jumlah item per halaman
    const [currentPage, setCurrentPage] = useState(1);
    const [detailFood, setDetailFood] = useState([]);

    const totalPages = foods?.food ? Math.ceil(foods?.food?.length / itemsPerPage) : 0;

    // Dan untuk paginasi
    const paginatedfoods = foods?.food?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const fetchData = () => {
        const storedData = JSON.parse(localStorage.getItem("hasilPerhitungan"));
        return storedData || null;
    };

    const data = fetchData();
    const accessToken = data?.token;

    if (!accessToken) {
        console.error("Token tidak ditemukan.");
        return;
    }

    const getFoodById = async (id) => {
        try {
            const response = await axios.post(`https://food-iq-api.vercel.app/food/search/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            // console.log(response.data.food)
            const detail = response.data.food;
            updateDetailFood(detail);
        } catch (error) {
            console.error("Error saat melakukan request:", error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-white p-10 z-20 max-w-xl">
            {foods.length === 0 ? (
                <div className="text-gray-700">
                    <p className="text-lg font-medium">The Food Search will work for any of the provided market and language combinations.</p>
                    <p className="text-md mt-2">For Example: tacos</p>
                    <p className="text-md mt-2">Click on any search result to see full information available.</p>
                </div>
            ) : (
                <>
                    {/* Pagination Info */}
                    <div className="mb-4">
                        <h2 className="text-gray-700 font-semibold">
                            Page {currentPage} of {totalPages}
                        </h2>
                    </div>

                    {/* Daftar Resep */}
                    <div>
                        {paginatedfoods.map((food, index) => (
                            <FoodItems
                                key={index}
                                name={food.food_name}
                                size={food.servings.serving[0].serving_description}
                                calories={food.servings.serving[0].calories}
                                carbohydrate={food.servings.serving[0].carbohydrate}
                                fat={food.servings.serving[0].fat}
                                protein={food.servings.serving[0].protein}
                                onClick={() => getFoodById(food.food_id)}
                            />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-6">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={`px-4 py-2 rounded-md text-white ${currentPage === 1 ? "bg-gray-300" : "bg-indigo-600 hover:bg-indigo-700"}`}>
                            Previous
                        </button>

                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-md text-white ${currentPage === totalPages ? "bg-gray-300" : "bg-indigo-600 hover:bg-indigo-700"}`}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FoodList;
