import React, { useState } from "react";
import Input from "../Components/Fragments/Input";
import Option from "../Components/Fragments/Option";
import food from "../assets/Group.png";
import RecipeDetail from "./RecipeDetail";
import RecipeList from "../Components/RecipeList";
import axios from "axios";

const FormRecipe = () => {
    const [region, setRegion] = useState("");
    const [recipiType, setRecipiType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [recipes, setRecipes] = useState([]); // State untuk menyimpan data resep
    const [detailRecipe, setDetailRecipe] = useState(null);

    const updateDetailRecipe = (recipe) => {
        setDetailRecipe(recipe);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

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

        try {
            const response = await axios.post(
                "http://localhost:5000/food/recipes-search",
                {
                    search: searchTerm,
                    types: recipiType,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);

            if (response.data.recipes.recipe) {
                // console.log(response.data);
                setRecipes(response.data.recipes.recipe);
            } else {
                console.log("Tidak ada resep ditemukan.");
                setRecipes([]);
            }
        } catch (error) {
            console.error("Error saat melakukan request:", error.response?.data || error.message);
            setRecipes([]);
        }
    };

    const getRecipeById = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/food/recipes/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            const detail = response.data.recipe;
            console.log(detail);
            setDetailRecipe(detail); // Local state
            updateDetailRecipe(detail); // Call parent function to update FormRecipe state
        } catch (error) {
            console.error("Error saat melakukan request:", error.response?.data || error.message);
        }
    };

    return (
        <div className="h-screen bg-gray-100 relative overflow-x-hidden">
            <div className="flex justify-center items-center absolute w-full translate-x-14">
                <img src={food} alt="background" className="inset-0 h-full object-cover" />
            </div>
            <div className="flex justify-between px-20">
                <div className="flex flex-col gap-5 pt-6">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full h-[500px] max-w-md z-20">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Search Recipes</h2>
                        <form className="mb-6">
                            <Option label="Region" options={["United States"]} value={region} onChange={(e) => setRegion(e.target.value)} />
                            <Option
                                label="Recipi Type"
                                options={["All", "Appetizer", "Soup", "Main Dish", "Side Dish", "Baked", "Salad and Salad Dressing", "Sauce and Condiment", "Dessert", "Snack", "Beverage", "Other", "Breakfast", "Lunch"]}
                                value={recipiType}
                                onChange={(e) => setRecipiType(e.target.value)}
                            />
                            <Input label="Search Term" type="text" placeholder="Search recipes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                            <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleSearch}>
                                Run Search
                            </button>
                        </form>
                    </div>
                    <RecipeList recipes={recipes} updateDetailRecipe={updateDetailRecipe} />
                </div>
                <RecipeDetail recipes={detailRecipe} />
            </div>
        </div>
    );
};

export default FormRecipe;
