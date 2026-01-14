import React from 'react';
import Navbar from './Navbar';

const Hero = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative p-4 md:p-8">
      {/* Outer Glow/Border Effect (Optional, staying strict B&W so just a border) */}
      <div className="w-[90vw] md:w-[80vw] lg:max-w-5xl xl:w-full xl:max-w-[95vw] min-h-[60vh] md:min-h-[80vh] xl:min-h-[85vh] rounded-[3rem] xl:rounded-3xl flex flex-col items-center relative overflow-visible mt-8 md:mt-0 transition-all duration-300">
        
        {/* Navbar positioned to overlap top border */}
        {/* Navbar moved to page.js */}
        
       

        <div className="flex flex-col items-center text-center space-y-6 md:space-y-10 xl:space-y-6 z-10 p-4 pt-24 md:pt-0 xl:pt-32 pb-12 xl:pb-10 w-full h-full justify-center my-auto xl:my-0 xl:justify-start">
          
          {/* Logo */}
          <div className="mb-2 md:mb-6 xl:mb-4 animate-fade-in-up">
            <img 
              src="/assets/hero logo.png" 
              alt="NMIT Hacks Logo" 
              className="h-16 md:h-40 xl:h-27 w-auto object-contain brightness-0 invert" 
            />
          </div>

          {/* Details */}
          <div className="space-y-3 md:space-y-6 xl:space-y-3 pt-4 md:pt-2 xl:pt-6 animate-fade-in-up delay-100">
            <p className="text-lg md:text-3xl lg:text-4xl xl:text-2xl text-gray-300 font-light tracking-wide font-['PPMori'] px-2">
              National-Level 48-Hours Hackathon
            </p>
            <p className="text-lg md:text-3xl lg:text-4xl xl:text-2xl font-medium text-white tracking-widest uppercase">
              16th - 18th May, 2025
            </p>
          </div>

          {/* Organization */}
          <div className="text-sm md:text-xl lg:text-2xl xl:text-base text-gray-500 animate-fade-in-up delay-200 px-4">
            <p className="tracking-wide">Organized by</p>
            <p className="text-gray-300 mt-2 xl:mt-1 font-['PPMori']">Department of Computer Science and Engineering</p>
            <p className="text-gray-400 text-xs md:text-sm lg:text-base xl:text-xs mt-2 xl:mt-1 uppercase tracking-widest">Nitte University, Bangalore campus</p>
          </div>

          {/* CTA Button */}
          <div className="pt-8 md:pt-14 xl:pt-10 animate-fade-in-up delay-300">
            <button className="px-10 md:px-16 xl:px-12 py-3 md:py-5 xl:py-3 rounded-full border-[2px] border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs md:text-lg xl:text-sm font-bold cursor-pointer backdrop-blur-sm bg-black/50">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
