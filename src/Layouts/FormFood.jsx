import React, { useState } from "react";
import Input from "../Components/Fragments/Input";
import Option from "../Components/Fragments/Option";
import food from "../assets/Group.png";
import FoodList from "../Components/FoodList";
import FoodDetail from "./FoodDetail"
import axios from "axios";

const FormFood = () => {
    const [region, setRegion] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [foods, setFoods] = useState([]);
    const [detailFood, setDetailFood] = useState(null);

    const updateDetailFood = (food) => {
        setDetailFood(food);
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
                "http://localhost:5000/food/search",
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
            // console.log(response);

            if (response.data.foods_search.results) {
                // console.log(response.data.foods_search.results);
                setFoods(response.data.foods_search.results);
            } else {
                console.log("Tidak ada resep ditemukan.");
                setFoods([]);
            }
        } catch (error) {
            console.error("Error saat melakukan request:", error.response?.data || error.message);
            setFoods([]);
        }
    };
    
    return (
        <div className="h-screen bg-gray-100 relative overflow-x-hidden">
            <div className="flex justify-center items-center absolute w-full translate-x-14">
                <img src={food} alt="background" className="inset-0 h-full object-cover" />
            </div>
            <div className="flex justify-between px-20">
                <div className="flex flex-col gap-5 pt-6">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full z-20">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Search Food</h2>
                        <form className="mb-6">
                            <Option label="Region" options={["United States"]} value={region} onChange={(e) => setRegion(e.target.value)} />
                            <Input label="Search Term" type="text" placeholder="Search recipes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                            <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleSearch}>
                                Run Search
                            </button>
                        </form>
                    </div>
                    <FoodList foods={foods} updateDetailFood={updateDetailFood}/>
                </div>
                <FoodDetail foods={detailFood} />
            </div>
        </div>
    );
};

export default FormFood;
