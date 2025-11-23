import React from "react";

const Info = ({ image, warning, status, kalori }) => {
    // Solid colors as requested, with a modern shape
    const styles = {
        success: "bg-[#4DB868] shadow-green-500/30", // Vibrant green
        warning: "bg-yellow-500 shadow-yellow-500/30",
        danger: "bg-red-500 shadow-red-500/30"
    };

    const currentStyle = styles[status] || styles.danger;

    return (
        <div className={`${currentStyle} text-white rounded-[2rem] p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 w-full max-w-3xl mx-auto transition-transform duration-300 hover:scale-[1.02]`}>
            {/* Icon Container */}
            <div className="flex-shrink-0 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                <img src={image} className="w-10 h-10 object-contain" alt="Status" />
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2 leading-tight">
                    {warning}
                </h3>
                <div className="inline-block bg-white/20 px-4 py-1.5 rounded-lg backdrop-blur-sm">
                    <p className="text-lg font-medium text-white/95">
                        {kalori}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Info;
