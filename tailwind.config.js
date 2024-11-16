/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                green: {
                  500: "#4DB868", // Hijau untuk tombol
                  700: "#34A853", // Hijau untuk judul
                },
              },
        },
    },
    plugins: [],
};
