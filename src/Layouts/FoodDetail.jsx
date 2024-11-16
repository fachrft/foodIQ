import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const FoodDetail = ({ foods }) => {
    const [selectedPortion, setSelectedPortion] = useState(""); // Menyimpan pilihan user
    const [nutritionData, setNutritionData] = useState(null); // Menyimpan data nutrisi berdasarkan pilihan user

    // Pastikan foods dan foods.servings ada sebelum kita mencoba menggunakan data
    if (!foods || !foods.servings || !foods.servings.serving) {
        return <div>Loading...</div>; // Menampilkan loading jika data belum tersedia
    }

    // Data untuk dropdown (serving descriptions)
    const portionOptions = foods.servings.serving.map((s) => s.serving_description);

    // Fungsi untuk menangani perubahan pilihan user
    const handlePortionChange = (e) => {
        const selectedDescription = e.target.value;
        setSelectedPortion(selectedDescription);

        // Mencari data yang sesuai dengan pilihan user
        const selectedServing = foods.servings.serving.find((s) => s.serving_description === selectedDescription);

        // Menyimpan data nutrisi yang sesuai
        if (selectedServing) {
            setNutritionData({
                calories: selectedServing.calories,
                fat: selectedServing.fat,
                carbohydrate: selectedServing.carbohydrate,
                protein: selectedServing.protein,
            });
        }
    };

    // Fungsi untuk menghitung persentase dan menyiapkan data chart
    function calculateNutritionPercentages(data) {
        if (!data) return {}; // Jika data kosong, jangan lakukan perhitungan

        const nutritionValues = {
            fat: parseFloat(data.fat),
            carbohydrate: parseFloat(data.carbohydrate),
            protein: parseFloat(data.protein),
        };

        const total = nutritionValues.fat + nutritionValues.carbohydrate + nutritionValues.protein;

        // Menghitung persentase nutrisi terhadap total
        const percentage = {
            labels: ["Fat", "Carbohydrate", "Protein"],
            datasets: [
                {
                    label: "Nutrition Distribution",
                    data: [((nutritionValues.fat / total) * 100).toFixed(2), ((nutritionValues.carbohydrate / total) * 100).toFixed(2), ((nutritionValues.protein / total) * 100).toFixed(2)],
                    backgroundColor: ["yellow", "red", "blue"], // Warna untuk masing-masing bagian
                    borderColor: ["#fff", "#fff", "#fff"], // Warna border
                    borderWidth: 2,
                },
            ],
        };

        return percentage;
    }

    // Menyiapkan data chart yang terupdate setiap kali nutritionData berubah
    const chartData = calculateNutritionPercentages(nutritionData);

    return (
        <div className="max-w-xl mx-auto p-4 z-20 bg-white mt-8 pt-10">
            <h2 className="text-xl font-semibold mb-4">{foods.food_name}</h2>

            {/* Dropdown untuk memilih portion */}
            <select value={selectedPortion} onChange={handlePortionChange} className="w-full p-2 border border-gray-300 rounded mb-6">
                <option value="">Select a portion</option>
                {portionOptions.map((portion, index) => (
                    <option key={index} value={portion}>
                        {portion}
                    </option>
                ))}
            </select>

            {/* Menampilkan grafik jika data nutrisi sudah dipilih */}
            {nutritionData && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Nutrition Distribution (in %)</h3>
                    <div className="">
                        <Doughnut data={chartData} />
                    </div>
                </div>
            )}

            {/* Menampilkan informasi nutrisi dalam bentuk persentase */}
            {nutritionData && (
                <div className="mt-4">
                    <ul>
                        <li>
                            <strong>Fat:</strong> {((parseFloat(nutritionData.fat) / (parseFloat(nutritionData.fat) + parseFloat(nutritionData.carbohydrate) + parseFloat(nutritionData.protein))) * 100).toFixed(2)}%
                        </li>
                        <li>
                            <strong>Carbohydrate:</strong> {((parseFloat(nutritionData.carbohydrate) / (parseFloat(nutritionData.fat) + parseFloat(nutritionData.carbohydrate) + parseFloat(nutritionData.protein))) * 100).toFixed(2)}%
                        </li>
                        <li>
                            <strong>Protein:</strong> {((parseFloat(nutritionData.protein) / (parseFloat(nutritionData.fat) + parseFloat(nutritionData.carbohydrate) + parseFloat(nutritionData.protein))) * 100).toFixed(2)}%
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FoodDetail;
