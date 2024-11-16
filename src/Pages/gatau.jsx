<div className="flex items-center mt-5">
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
</div>;