import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const FoodDetail = ({ foods }) => {
    const initialPortion = foods?.servings?.serving?.[0]?.serving_description || ""; // Pilihan awal
    const [selectedPortion, setSelectedPortion] = useState(initialPortion);
    const [nutritionData, setNutritionData] = useState(null);

    useEffect(() => {
        if (initialPortion) {
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
        return <div></div>;
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
                    backgroundColor: ["yellow", "red", "blue"],
                    borderColor: ["#fff", "#fff", "#fff"],
                    borderWidth: 2,
                },
            ],
        };
    }

    const chartData = calculateNutritionPercentages(nutritionData);

    return (
        <div className="max-w-xl mx-auto p-4 z-20 bg-white h-[110vh] rounded-xl mt-8 pt-10" id="detail-food">
            <h2 className="text-xl font-semibold mb-4">{foods.food_name}</h2>

            <select value={selectedPortion} onChange={handlePortionChange} className="w-full p-2 border border-gray-300 rounded mb-6">
                {portionOptions.map((portion, index) => (
                    <option key={index} value={portion}>
                        {portion}
                    </option>
                ))}
            </select>

            {nutritionData && (
                <div className="mt-6 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-semibold mb-4">Nutrition Distribution (in %)</h3>
                    <div>
                        <Doughnut data={chartData} />
                    </div>
                </div>
            )}

            {nutritionData && (
                <div className="mt-4">
                    <div className="ml-6 text-gray-700">
                        <p>
                            <span className="text-yellow-500 font-bold">{parseFloat(((nutritionData.fat * 9) / (nutritionData.calories || 1)) * 100).toFixed(2)}% Fat:</span>{" "}
                            <span className="font-bold text-black">{parseFloat(nutritionData.fat).toFixed(2)} g</span>
                        </p>
                        <p>
                            <span className="text-red-500 font-bold">{parseFloat(((nutritionData.carbohydrate * 4) / (nutritionData.calories || 1)) * 100).toFixed(2)}% Carbs:</span>{" "}
                            <span className="font-bold text-black">{parseFloat(nutritionData.carbohydrate).toFixed(2)} g</span>
                        </p>
                        <p>
                            <span className="text-blue-500 font-bold">{parseFloat(((nutritionData.protein * 4) / (nutritionData.calories || 1)) * 100).toFixed(2)}% Protein:</span>{" "}
                            <span className="font-bold text-black">{parseFloat(nutritionData.protein).toFixed(2)} g</span>
                        </p>
                    </div>
                    <div className="text-center text-3xl mt-4">
                        <strong>Calories:</strong> <span className="font-bold text-black">{parseFloat(nutritionData.calories).toFixed(2)} Kal</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetail;
