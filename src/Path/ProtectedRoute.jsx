import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Periksa data di localStorage
    const data = localStorage.getItem("hasilPerhitungan");

    // Jika data tidak ada, arahkan ke halaman register
    if (!data) {
        alert("Anda harus mengisi data profil terlebih dahulu.");
        return <Navigate to="/register" replace />;
    }

    // Jika data ada, izinkan akses ke komponen
    return children;
};

export default ProtectedRoute;
