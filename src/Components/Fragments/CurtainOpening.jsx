import React, { useEffect, useState } from 'react';

const CurtainOpening = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start the exit animation
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 2000); // Show splash for 2 seconds

    // Remove component from DOM
    const cleanup = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Wait for transition to finish

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanup);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-green-600 to-emerald-900 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        startAnimation ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className={`flex flex-col items-center transition-opacity duration-500 ${startAnimation ? 'opacity-0' : 'opacity-100'}`}>
        {/* Animated Logo Container */}
        <div className="relative mb-6">
            <div className="w-24 h-24 bg-white rounded-2xl rotate-45 flex items-center justify-center shadow-2xl animate-bounce-slow">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center">
                    <span className="text-4xl font-bold text-white -rotate-45">F</span>
                </div>
            </div>
            {/* Pulse Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/30 rounded-2xl rotate-45 blur-xl animate-pulse"></div>
        </div>

        {/* Text with Reveal Effect */}
        <div className="overflow-hidden">
            <h1 className="text-5xl font-bold text-white tracking-wider animate-slide-up">
                Food<span className="text-yellow-300">IQ</span>
            </h1>
        </div>
        
        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/20 rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-yellow-400 animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default CurtainOpening;
