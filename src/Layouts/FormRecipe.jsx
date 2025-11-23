import React, { useState } from "react";
import Input from "../Components/Fragments/Input";
import Option from "../Components/Fragments/Option";
import RecipeDetail from "./RecipeDetail";
import RecipeList from "../Components/RecipeList";
import Navbar from "../Components/Navbar";
import Modal from "../Components/Fragments/Modal";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const FormRecipe = () => {
    const [region, setRegion] = useState("United States");
    const [recipiType, setRecipiType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [detailRecipe, setDetailRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const updateDetailRecipe = (recipe) => {
        setDetailRecipe(recipe);
        setIsModalOpen(true);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        const fetchData = () => {
            const storedData = JSON.parse(localStorage.getItem("hasilPerhitungan"));
            return storedData || null;
        };

        const data = fetchData();
        const accessToken = data?.token;

        if (!accessToken) {
            console.error("Token tidak ditemukan.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "https://food-iq-api.vercel.app/food/recipes-search",
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
            if (response.data.recipes.recipe) {
                setRecipes(response.data.recipes.recipe);
            } else {
                setRecipes([]);
            }
        } catch (error) {
            console.error("Error saat melakukan request:", error.response?.data || error.message);
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f0fdf4] font-poppins">
            <Navbar />
            
            {/* Background Blobs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-300/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-300/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
                {/* Hero Search Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Recipe</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                        Explore thousands of delicious recipes with detailed nutritional information and step-by-step instructions.
                    </p>

                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[2rem] p-8 transform transition-all hover:scale-[1.01]">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Option 
                                    label="Region" 
                                    options={["United States"]} 
                                    value={region} 
                                    onChange={(e) => setRegion(e.target.value)}
                                    className="!mb-0 text-left"
                                />
                                <Option
                                    label="Recipe Type"
                                    options={["All", "Appetizer", "Soup", "Main Dish", "Side Dish", "Baked", "Salad and Salad Dressing", "Sauce and Condiment", "Dessert", "Snack", "Beverage", "Other", "Breakfast", "Lunch"]}
                                    value={recipiType}
                                    onChange={(e) => setRecipiType(e.target.value)}
                                    className="!mb-0 text-left"
                                />
                            </div>
                            
                            <div className="relative">
                                <Input 
                                    label="Search Recipe" 
                                    type="text" 
                                    placeholder="e.g. Chicken Pasta" 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="!mb-0 text-left"
                                />
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="absolute right-2 bottom-2 top-8 bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-green-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <MagnifyingGlassIcon className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Results Section */}
                {recipes && recipes.length > 0 && (
                    <div className="max-w-5xl mx-auto">
                        <RecipeList recipes={recipes} updateDetailRecipe={updateDetailRecipe} />
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title={detailRecipe?.recipe_name || "Recipe Details"}
            >
                <RecipeDetail recipes={detailRecipe} />
            </Modal>
        </div>
    );
};

export default FormRecipe;
