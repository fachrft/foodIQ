import React, { useState } from "react";
import Input from "../Components/Fragments/Input";
import Option from "../Components/Fragments/Option";
import FoodList from "../Components/FoodList";
import FoodDetail from "./FoodDetail";
import Navbar from "../Components/Navbar";
import Modal from "../Components/Fragments/Modal";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const FormFood = () => {
    const [region, setRegion] = useState("United States");
    const [searchTerm, setSearchTerm] = useState("");
    const [foods, setFoods] = useState([]);
    const [detailFood, setDetailFood] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const updateDetailFood = (food) => {
        setDetailFood(food);
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
                "https://food-iq-api.vercel.app/food/search",
                {
                    search: searchTerm,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.foods_search.results) {
                setFoods(response.data.foods_search.results);
            } else {
                setFoods([]);
            }
        } catch (error) {
            console.error("Error saat melakukan request:", error.response?.data || error.message);
            setFoods([]);
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
                        Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Nutritional Facts</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                        Search for any food item to get detailed insights into calories, macronutrients, and more.
                    </p>

                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[2rem] p-8 transform transition-all hover:scale-[1.01]">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/3">
                                <Option 
                                    label="Region" 
                                    options={["United States"]} 
                                    value={region} 
                                    onChange={(e) => setRegion(e.target.value)}
                                    className="!mb-0 text-left"
                                />
                            </div>
                            <div className="w-full md:w-2/3 relative">
                                <Input 
                                    label="Search Food" 
                                    type="text" 
                                    placeholder="e.g. Avocado Toast" 
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
                {foods && foods.food && foods.food.length > 0 && (
                    <div className="max-w-5xl mx-auto">
                        <FoodList foods={foods} updateDetailFood={updateDetailFood} />
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title={detailFood?.food_name || "Food Details"}
            >
                <FoodDetail foods={detailFood} />
            </Modal>
        </div>
    );
};

export default FormFood;
