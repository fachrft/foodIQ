import InfoCard from "../Layouts/InfoCard";
import logo_food from '../assets/food logo.svg'
import logo_recipe from '../assets/logo recipe.svg'

const Feature = () => {
    return (
        <div className="px-5 md:px-20">
            <div className="w-full h-[56px] border-2 border-[#4CAF50] flex justify-center items-center rounded-full md:text-2xl text-[#748189]">
                <h1>Healthy Food For You</h1>
            </div>
            <div className="flex justify-center items-center gap-20 flex-wrap pt-20">
                <InfoCard image={logo_food} title="Food" desc="Explore different types of foods and find out the nutritional content in them. FoodIQ provides comprehensive information that helps you make smarter choices." link="/food"/>
                <InfoCard image={logo_recipe} title="Recipe" desc="Discover delicious and nutritious recipes that come with nutritional analysis to help you plan a balanced meal." link="/recipe"/>
            </div>
        </div>
    );
};

export default Feature;
