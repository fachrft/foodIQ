import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const RecipeDetail = ({ recipes }) => {
    if (!recipes) {
        return null;
    }

    function calculateNutritionPercentages(data) {
        const nutritionValues = {
            fat: parseFloat(data.serving_sizes.serving.fat),
            carbohydrate: parseFloat(data.serving_sizes.serving.carbohydrate),
            protein: parseFloat(data.serving_sizes.serving.protein),
        };

        const calories = recipes.serving_sizes.serving.calories;

        return {
            labels: ["Fat", "Carbohydrate", "Protein"],
            datasets: [
                {
                    label: "Nutrition",
                    data: [nutritionValues.fat, nutritionValues.carbohydrate, nutritionValues.protein],
                    backgroundColor: ["#FACC15", "#EF4444", "#3B82F6"],
                    borderColor: ["#fff", "#fff", "#fff"],
                    borderWidth: 2,
                    presentase: [
                        parseFloat(((nutritionValues.fat * 9 / calories) * 100).toFixed(2)),
                        parseFloat(((nutritionValues.carbohydrate * 4 / calories) * 100).toFixed(2)),
                        parseFloat(((nutritionValues.protein * 4 / calories) * 100).toFixed(2))
                    ],
                },
            ],
        };
    }

    const chartData = calculateNutritionPercentages(recipes);

    return (
        <div className="w-full space-y-8">
            {/* Hero Image */}
            {recipes.recipe_images?.recipe_image?.[0] && (
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 md:h-80">
                    <img
                        src={recipes.recipe_images.recipe_image[0]}
                        alt={recipes.recipe_name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white/90 text-sm line-clamp-2">{recipes.recipe_description}</p>
                    </div>
                </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                    <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Yields</p>
                    <p className="text-2xl font-bold text-gray-800">{recipes.number_of_servings}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center">
                    <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">Prep</p>
                    <p className="text-2xl font-bold text-gray-800">{recipes.preparation_time_min}m</p>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                    <p className="text-red-600 text-xs font-bold uppercase tracking-wider mb-1">Cook</p>
                    <p className="text-2xl font-bold text-gray-800">{recipes.cooking_time_min}m</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                    <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-1">Calories</p>
                    <p className="text-2xl font-bold text-gray-800">{recipes.serving_sizes.serving.calories}</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Ingredients & Directions (2/3 width) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Ingredients */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-2xl">🥕</span>
                            Ingredients
                        </h2>
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <ul className="space-y-3">
                                {recipes.ingredients?.ingredient?.map((ing, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></div>
                                        <span className="text-gray-700 leading-relaxed">{ing.ingredient_description}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Directions */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-2xl">🍳</span>
                            Directions
                        </h2>
                        <div className="space-y-4">
                            {recipes.directions?.direction?.map((dir, index) => (
                                <div key={index} className="flex gap-4 bg-white rounded-xl p-4 border border-gray-100">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pt-1">{dir.direction_description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Nutrition (1/3 width) */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 sticky top-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Nutrition Facts</h3>
                        
                        {/* Chart */}
                        <div className="w-48 h-48 mx-auto mb-6 relative">
                            <Doughnut 
                                data={chartData} 
                                options={{ 
                                    maintainAspectRatio: true,
                                    plugins: {
                                        legend: {
                                            display: false
                                        }
                                    }
                                }} 
                            />
                        </div>

                        {/* Nutrition Details */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <span className="text-gray-700 font-medium text-sm">Fat</span>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-gray-800">{chartData.datasets[0].data[0]}g</span>
                                    <span className="text-xs text-gray-400">{chartData.datasets[0].presentase[0]}%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span className="text-gray-700 font-medium text-sm">Carbs</span>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-gray-800">{chartData.datasets[0].data[1]}g</span>
                                    <span className="text-xs text-gray-400">{chartData.datasets[0].presentase[1]}%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-700 font-medium text-sm">Protein</span>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-gray-800">{chartData.datasets[0].data[2]}g</span>
                                    <span className="text-xs text-gray-400">{chartData.datasets[0].presentase[2]}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Recipe Type Badge */}
                        {recipes.recipe_types?.recipe_type?.[0] && (
                            <div className="mt-6 text-center">
                                <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                                    {recipes.recipe_types.recipe_type[0]}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
