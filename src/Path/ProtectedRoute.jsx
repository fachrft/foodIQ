import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        // Periksa data di localStorage
        const data = localStorage.getItem("hasilPerhitungan");

        // Jika data tidak ada, tampilkan alert dan redirect
        if (!data) {
            Swal.fire({
                icon: "warning",
                title: "Data Profil Belum Lengkap",
                text: "Anda harus mengisi data profil terlebih dahulu.",
                confirmButtonText: "Isi Profil",
                confirmButtonColor: "#16a34a",
                allowOutsideClick: false,
            }).then(() => {
                setShouldRedirect(true);
            });
        } else {
            setChecked(true);
        }
    }, []);

    // Jika harus redirect, arahkan ke register
    if (shouldRedirect) {
        return <Navigate to="/register" replace />;
    }

    // Jika belum dicek, tampilkan loading atau null
    if (!checked) {
        return null;
    }

    // Jika data ada, izinkan akses ke komponen
    return children;
};

export default ProtectedRoute;
