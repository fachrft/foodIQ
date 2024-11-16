import React from "react";

const RecipeItems = ({ image, name, desc, calories, carbohydrate, fat, protein, onClick }) => {

    return (
        <div className="border-b-2 border-black py-4 flex gap-6 max-w-xl">
            <img src={image} className="w-16" alt="" />
            <div className=" flex flex-col gap-1">
                <h1 className="text-xl font-semibold text-blue-500 hover:underline cursor-pointer" onClick={onClick}>{name}</h1>
                <p className="text-[12px]">{desc}</p>
                <p className="text-sm">
                    Per Serve <span> Kalori: {calories}kal </span> |<span> Lemak: {fat}g </span> |<span> Karbo: {carbohydrate}g </span> |<span> Prot: {protein}g </span>
                </p>
            </div>
        </div>
    );
};

export default RecipeItems;
