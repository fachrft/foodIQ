import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const RecipeDetail = ({ recipes }) => {
    console.log(recipes);
    if (!recipes) {
        return null; // Tidak merender apa pun jika recipes tidak ada
    }

    function calculateNutritionPercentages(data) {
        // Mengambil nilai yang dibutuhkan
        // console.log(data)
        const nutritionValues = {
            fat: parseFloat(data.serving_sizes.serving.fat),
            carbohydrate: parseFloat(data.serving_sizes.serving.carbohydrate),
            protein: parseFloat(data.serving_sizes.serving.protein),
        };

        // Menghitung total
        const calories = recipes.serving_sizes.serving.calories

        // Menghitung persentase
        const persentage = {
            labels: ["fat", "carbo", "protein"],
            datasets: [
                {
                    label: "Nutrition",
                    data: [nutritionValues.fat, nutritionValues.carbohydrate, nutritionValues.protein],
                    backgroundColor: ["yellow", "red", "blue"],
                    presentase: [
                        parseFloat(((nutritionValues.fat * 9 / calories) * 100).toFixed(2)),      // Persentase kalori dari lemak
                        parseFloat(((nutritionValues.carbohydrate * 4 / calories) * 100).toFixed(2)), // Persentase kalori dari karbohidrat
                        parseFloat(((nutritionValues.protein * 4 / calories) * 100).toFixed(2)) // Persentase kalori dari protein
                    ],
                },
            ],
        };

        return persentage;
    }
    const chartData = calculateNutritionPercentages(recipes);
    const options = {};
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center pt-5 z-20" id="detail-recipe">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl w-full ">
                {/* Recipe Title */}
                <h1 className="text-2xl font-bold text-gray-800">{recipes.recipe_name}</h1>
                <p className="text-gray-600 mt-1">{recipes.recipe_description}</p>

                {/* Recipe Image */}
                <div className="mt-4">
                    {recipes.recipe_images && recipes.recipe_images.recipe_image && recipes.recipe_images.recipe_image.length > 0 ? (
                        <img
                            src={recipes.recipe_images.recipe_image[0]} // Mengakses elemen pertama dalam array recipe_image
                            alt="Baked Lemon Snapper"
                            className="rounded-md object-cover"
                        />
                    ) : (
                        <p>Data belum tersedia</p>
                    )}
                </div>
                {/* Recipe Info */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                    <div className="text-gray-700">
                        <p>
                            <strong>Yields:</strong> {recipes.number_of_servings}
                        </p>
                    </div>
                    <div className="text-gray-700">
                        <p>
                            <strong>Prep Time:</strong> {recipes.preparation_time_min} minutes
                        </p>
                    </div>
                    <div className="text-gray-700">
                        <p>
                            <strong>Cook Time:</strong> {recipes.cooking_time_min} minutes
                        </p>
                    </div>
                    <div className="text-gray-700">
                        <p>
                            <strong>Meal Types: </strong>
                            {recipes.recipe_types && recipes.recipe_types.recipe_type && recipes.recipe_types.recipe_type.length > 0 ? <span>{recipes.recipe_types.recipe_type.join(", ")}</span> : <p>Data Meal Types belum tersedia</p>}
                        </p>
                    </div>
                </div>

                {/* Ingredients */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">Ingredients</h2>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                        {recipes.ingredients && recipes.ingredients.ingredient && recipes.ingredients.ingredient.length > 0 ? (
                            recipes.ingredients.ingredient.map((ing, index) => <li key={index}>{ing.ingredient_description}</li>)
                        ) : (
                            <p>Data Ingredients belum tersedia</p>
                        )}
                    </ul>
                </div>

                {/* Directions */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">Directions</h2>
                    <ol className="list-decimal ml-6 mt-2 text-gray-700">
                        {recipes.directions && recipes.directions.direction && recipes.directions.direction.length > 0 ? (
                            recipes.directions.direction.map((dir, index) => <li key={index}>{dir.direction_description}</li>)
                        ) : (
                            <p>Data Directions belum tersedia</p>
                        )}
                    </ol>
                </div>

                {/* Nutrition Info */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">Per Serving</h2>
                    <div className="flex items-center mt-5 flex-wrap gap-5 md:gap-0">
                        {/* Nutrition Chart */}
                        <div className="">
                            <Doughnut data={chartData} option={options}></Doughnut>
                        </div>

                        {/* Nutrition Details */}
                        <div className="ml-6 text-gray-700">
                            <p>
                                <span className="text-yellow-500 font-bold">{chartData.datasets[0].presentase[0]}% Fat:</span> <span className="font-bold text-black">{chartData.datasets[0].data[0]}g</span>
                            </p>
                            <p>
                                <span className="text-red-500 font-bold">{chartData.datasets[0].presentase[1]}% Carbs:</span> <span className="font-bold text-black">{chartData.datasets[0].data[1]}g</span>
                            </p>
                            <p>
                                <span className="text-blue-500 font-bold">{chartData.datasets[0].presentase[2]}% Protein:</span> <span className="font-bold text-black">{chartData.datasets[0].data[2]}g</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4 text-3xl">
                    <h1><strong>Calories</strong> {recipes.serving_sizes.serving.calories} Kal</h1>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
