import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Fragments/Input";
import BG from "../assets/Rectangle 4368.svg";
import Option from "../Components/Fragments/Option";
import axios from 'axios';

function ProfileForm() {
    const navigate = useNavigate();
    const [umur, setUmur] = useState();
    const [tinggi, setTinggi] = useState();
    const [berat, setBerat] = useState();
    const [jenisKelamin, setJenisKelamin] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!umur || !tinggi || !berat || !jenisKelamin) {
            alert("Harap isi semua kolom.");
            return;
        }
        let hasil = 10 * berat + 6.25 * tinggi - 5 * umur + (jenisKelamin === "Laki-Laki" ? 5 : -161);
        let hasilBMI = berat / ((tinggi / 100) ** 2);
        hasil = Math.floor(hasil);
        const cetakKalori = `Kalori yang anda butuhkan per hari sebanyak ${hasil} Kalori`
    
        const token = await axios.post('https://food-iq-api.vercel.app/food/get-token')
        // console.log(token)

        // Simpan data ke localStorage sebagai JSON
        const data = { cetakKalori, hasilBMI, token: token.data.access_token };
        localStorage.setItem("hasilPerhitungan", JSON.stringify(data));
        

        alert("Hasil perhitungan berhasil disimpan!");
        navigate("/");
    };

    return (
        <div className="h-[100vh] w-[100vw] overflow-hidden">
            <div className="flex justify-center items-center pt-16">
                <div>
                    <h1 className="text-[30px] md:text-[40px] font-semibold">Create a FoodIQ Profile</h1>
                    <p className="text-center text-[#4DB868]">Selamat Datang di FoodIQ <span>👋</span></p>
                </div>
            </div>
            <div className="relative">
                <div className="absolute">
                    <img className="scale-[2.8] md:scale-[1.16] md:translate-x-24 md:translate-y-20 h-[100vh]" src={BG} alt="" />
                </div>
                <div>
                    <form className="relative z-10 px-5 pt-24 max-w-sm md:max-w-md w-full mx-auto" onSubmit={handleSubmit}>
                        <Input label="Umur" type="number" placeholder="Umur" value={umur} onChange={(e) => setUmur(e.target.value)} />
                        <Option label="Jenis Kelamin" options={["Laki-Laki", "Perempuan"]} value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)} />

                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <Input label="Tinggi Badan" type="number" placeholder="Tinggi Badan" value={tinggi} onChange={(e) => setTinggi(e.target.value)} />
                            </div>
                            <div className="w-1/2">
                                <Input label="Berat Badan" type="number" placeholder="Berat Badan" value={berat} onChange={(e) => setBerat(e.target.value)} />
                            </div>
                        </div>

                        <button type="submit" className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-md shadow hover:bg-green-700 transition-all duration-300">Input</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;
