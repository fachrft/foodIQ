import InfoCard from "../Layouts/InfoCard";
import logo_food from '../assets/food logo.svg'
import logo_recipe from '../assets/logo recipe.svg'

const Feature = () => {
    return (
        <div id="feature" className="py-20 px-5 md:px-20 bg-[#f0fdf4] relative">
             {/* Decorative Background */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-green-100 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-yellow-100 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div 
                    className="inline-block px-6 py-2 rounded-full bg-white border border-green-100 text-green-600 font-semibold mb-12 shadow-sm"
                    data-aos="fade-down"
                >
                    Healthy Food For You
                </div>
                
                <div 
                    className="flex justify-center items-stretch gap-8 flex-wrap max-w-6xl mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div data-aos="zoom-in" data-aos-delay="200">
                        <InfoCard 
                            image={logo_food} 
                            title="Food Analysis" 
                            desc="Explore different types of foods and find out the nutritional content in them. FoodIQ provides comprehensive information that helps you make smarter choices." 
                            link="/food"
                        />
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="300">
                        <InfoCard 
                            image={logo_recipe} 
                            title="Smart Recipes" 
                            desc="Discover delicious and nutritious recipes that come with nutritional analysis to help you plan a balanced meal tailored to your needs." 
                            link="/recipe"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;
