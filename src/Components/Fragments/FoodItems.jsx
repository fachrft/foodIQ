import React from "react";

const FoodItems = ({ name, size, calories, carbohydrate, fat, protein, onClick }) => {
    return (
        <div className=" flex flex-col gap-1 border-b-2 border-black py-4">
            <h1 className="text-xl font-semibold text-blue-500 hover:underline cursor-pointer" onClick={onClick}>
                {name}
            </h1>
            <p className="text-sm">
                 <span> Per {size} Kalori: {calories}kal </span> |<span> Lemak: {fat}g </span> |<span> Karbo: {carbohydrate}g </span> |<span> Prot: {protein}g </span>
            </p>
        </div>
    );
};

export default FoodItems;
