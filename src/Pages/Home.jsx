import React from "react";
import BackgroundImage from "../assets/your-background-image.png"; // Ganti dengan path gambar background
import Info from "../Components/Fragments/Info";
import aman from '../assets/aman.svg'
import warning from '../assets/warning.png'

function Home() {
    const fetchData = () => {
        const storedData = JSON.parse(localStorage.getItem("hasilPerhitungan"));
        if (storedData) {
            return storedData;
        } else {
            console.log("Tidak ada data di localStorage.");
            return null;
        }
    };

    const data = fetchData();
    const bmi = data?.hasilBMI;
    const kalori = data?.cetakKalori
    // console.log(bmi)

    // Fungsi validasi BMI
    const renderBMIMessage = () => {
        if (bmi < 18.5) {
            return <Info color="bg-red-500" image={warning} warning="Berat badan kamu terindikasi (underweight)." kalori={kalori} />;
        } else if (bmi >= 18.5 && bmi <= 22.9) {
            return <Info color="bg-[#86D293]" image={aman} warning="Berat badan kamu terindikasi (normal)."  kalori={kalori}/>;
        } else if (bmi >= 23 && bmi <= 24.9 ) {
            return <Info color="bg-red-500" image={warning} warning="Berat badan kamu terindikasi (overweight)." kalori={kalori}/>;            
        } else if (bmi >= 25 && bmi <= 29.9) {
            return <Info color="bg-red-500" image={warning} warning="Berat badan kamu terindikasi (Obesitas)." kalori={kalori} />;
        } else {
            return <Info color="bg-red-500" image={warning} warning="Berat badan kamu terindikasi (Obesitas II)." kalori={kalori} />;
        }
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-white">
            {/* Background Image */}
            <div className="flex justify-center items-center absolute">
                <img
                    src={BackgroundImage}
                    alt="background"
                    className="inset-0 h-full object-cover opacity-40"
                />
            </div>

            {/* Content */}
            <div className="z-10 text-center px-4 sm:px-10">
                <h1 className="text-4xl sm:text-5xl font-semibold text-green-700 poppins">
                    Healthy Living with <br /> FoodIQ
                </h1>
                <p className="text-gray-600 mt-4 max-w-lg mx-auto text-lg">
                    FoodIQ helps with your nutritional needs with accurate data, so you can live a healthier and more balanced lifestyle.
                </p>

                {/* Conditional Rendering for BMI Info */}
                {bmi ? renderBMIMessage() : <Info text="Data BMI tidak ditemukan. Silakan masukkan data Anda." />}
            </div>
        </div>
    );
}

export default Home;
