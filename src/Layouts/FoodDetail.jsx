import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const FoodDetail = ({ foods }) => {
    const initialPortion = foods?.servings?.serving?.[0]?.serving_description || ""; // Pilihan awal
    const [selectedPortion, setSelectedPortion] = useState(initialPortion);
    const [nutritionData, setNutritionData] = useState(null);

    // console.log(foods.servings.serving);

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

        const total = nutritionValues.fat + nutritionValues.carbohydrate + nutritionValues.protein;

        return {
            labels: ["Fat", "Carbohydrate", "Protein"],
            datasets: [
                {
                    label: "Nutrition Distribution",
                    data: [((nutritionValues.fat / total) * 100).toFixed(2), ((nutritionValues.carbohydrate / total) * 100).toFixed(2), ((nutritionValues.protein / total) * 100).toFixed(2)],
                    backgroundColor: ["yellow", "red", "blue"],
                    borderColor: ["#fff", "#fff", "#fff"],
                    borderWidth: 2,
                },
            ],
        };
    }

    const chartData = calculateNutritionPercentages(nutritionData);

    return (
        <div className="max-w-xl mx-auto p-4 z-20 bg-white h-[110vh] rounded-xl mt-8 pt-10">
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
                    <ul>
                        <li className="text-3xl text-center mb-10">
                            <strong>Calories:</strong> {parseFloat(nutritionData.calories).toFixed(2)} g
                        </li>
                        <li className="text-xl">
                            <strong>Fat:</strong> {parseFloat(nutritionData.fat).toFixed(2)} g
                        </li>
                        <li className="text-xl">
                            <strong>Carbohydrate:</strong> {parseFloat(nutritionData.carbohydrate).toFixed(2)} g
                        </li>
                        <li className="text-xl">
                            <strong>Protein:</strong> {parseFloat(nutritionData.protein).toFixed(2)} g
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FoodDetail;
