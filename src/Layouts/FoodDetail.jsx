import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const FoodDetail = ({ foods }) => {
    const initialPortion = foods?.servings?.serving?.[0]?.serving_description || "";
    const [selectedPortion, setSelectedPortion] = useState(initialPortion);
    const [nutritionData, setNutritionData] = useState(null);

    useEffect(() => {
        if (initialPortion && foods?.servings?.serving) {
            const selectedServing = foods.servings.serving.find((s) => s.serving_description === initialPortion);
            if (selectedServing) {
                setNutritionData({
                    calories: selectedServing.calories,
                    fat: selectedServing.fat,
                    carbohydrate: selectedServing.carbohydrate,
                    protein: selectedServing.protein,
                });
            }
        }
    }, [initialPortion, foods]);

    if (!foods || !foods.servings || !foods.servings.serving) {
        return null;
    }

    const portionOptions = foods.servings.serving.map((s) => s.serving_description);

    const handlePortionChange = (e) => {
        const selectedDescription = e.target.value;
        setSelectedPortion(selectedDescription);

        const selectedServing = foods.servings.serving.find((s) => s.serving_description === selectedDescription);

        if (selectedServing) {
            setNutritionData({
                calories: selectedServing.calories,
                fat: selectedServing.fat,
                carbohydrate: selectedServing.carbohydrate,
                protein: selectedServing.protein,
            });
        }
    };

    function calculateNutritionPercentages(data) {
        if (!data) return {};

        const nutritionValues = {
            fat: parseFloat(data.fat),
            carbohydrate: parseFloat(data.carbohydrate),
            protein: parseFloat(data.protein),
        };

        return {
            labels: ["Fat", "Carbohydrate", "Protein"],
            datasets: [
                {
                    label: "Nutrition Distribution",
                    data: [nutritionValues.fat, nutritionValues.carbohydrate, nutritionValues.protein],
                    backgroundColor: ["#FACC15", "#EF4444", "#3B82F6"],
                    borderColor: ["#fff", "#fff", "#fff"],
                    borderWidth: 2,
                },
            ],
        };
    }

    const chartData = calculateNutritionPercentages(nutritionData);

    return (
        <div className="w-full">
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Portion Size</label>
                <select 
                    value={selectedPortion} 
                    onChange={handlePortionChange} 
                    className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                    {portionOptions.map((portion, index) => (
                        <option key={index} value={portion}>
                            {portion}
                        </option>
                    ))}
                </select>
            </div>

            {nutritionData && (
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Chart Section */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-6 text-gray-800">Nutrition Distribution</h3>
                        <div className="w-64 h-64 relative">
                            <Doughnut data={chartData} options={{ maintainAspectRatio: true }} />
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold">Total Energy</p>
                            <p className="text-4xl font-bold text-gray-900 mt-1">{parseFloat(nutritionData.calories).toFixed(0)} <span className="text-lg font-medium text-gray-500">kcal</span></p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-yellow-700">Fat</span>
                                <span className="text-sm font-medium bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg">
                                    {parseFloat(((nutritionData.fat * 9) / (nutritionData.calories || 1)) * 100).toFixed(1)}%
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">{parseFloat(nutritionData.fat).toFixed(1)}g</p>
                        </div>

                        <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-red-700">Carbohydrates</span>
                                <span className="text-sm font-medium bg-red-200 text-red-800 px-2 py-1 rounded-lg">
                                    {parseFloat(((nutritionData.carbohydrate * 4) / (nutritionData.calories || 1)) * 100).toFixed(1)}%
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">{parseFloat(nutritionData.carbohydrate).toFixed(1)}g</p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-blue-700">Protein</span>
                                <span className="text-sm font-medium bg-blue-200 text-blue-800 px-2 py-1 rounded-lg">
                                    {parseFloat(((nutritionData.protein * 4) / (nutritionData.calories || 1)) * 100).toFixed(1)}%
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">{parseFloat(nutritionData.protein).toFixed(1)}g</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetail;
