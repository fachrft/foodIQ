import React, { useState } from "react";
import axios from "axios";
import RecipeItems from "./Fragments/RecipeItems";

const RecipeList = ({ recipes, updateDetailRecipe }) => {
    const itemsPerPage = 4; // Jumlah item per halaman
    const [currentPage, setCurrentPage] = useState(1);
    const [detailRecipe, setDetailRecipe] = useState([]);

    // Hitung total halaman
    const totalPages = Math.ceil(recipes.length / itemsPerPage);

    // Ambil data berdasarkan halaman
    const paginatedRecipes = recipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

    const getRecipeById = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/food/recipes/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            const detail = response.data.recipe;
            setDetailRecipe(detail); // Local state
            updateDetailRecipe(detail); // Update parent state
        } catch (error) {
            console.error("Error saat melakukan request:", error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-white p-10 z-20 max-w-xl">
            {recipes.length === 0 ? (
                <div className="text-gray-700">
                    <p className="text-lg font-medium">We provide access to thousands of verified recipes globally.</p>
                    <p className="text-md mt-2">All recipes are specific to the United States and provided in English.</p>
                    <p className="text-md mt-2">If no recipe type is selected, the search will include all types.</p>
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
                        {paginatedRecipes.map((recipe, index) => (
                            <RecipeItems
                                key={index}
                                image={recipe.recipe_image}
                                name={recipe.recipe_name}
                                desc={recipe.recipe_description}
                                calories={recipe.recipe_nutrition.calories}
                                fat={recipe.recipe_nutrition.fat}
                                carbohydrate={recipe.recipe_nutrition.carbohydrate}
                                protein={recipe.recipe_nutrition.protein}
                                onClick={() => getRecipeById(recipe.recipe_id)}
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

export default RecipeList;
