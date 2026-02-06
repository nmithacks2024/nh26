"use client";
import { CldImage } from 'next-cloudinary';


import React from 'react';
import Navbar from './Navbar';

const Hero = () => {
  return (
    <div className="min-h-screen w-full text-white flex flex-col items-center justify-center relative p-4 md:p-8 overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/assets/bg-3.jpeg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      {/* Outer Glow/Border Effect (Optional, staying strict B&W so just a border) */}
      <div className="w-[90vw] md:w-[80vw] lg:max-w-5xl xl:w-full xl:max-w-[95vw] min-h-[60vh] md:min-h-[80vh] xl:min-h-[85vh] rounded-[3rem] xl:rounded-3xl flex flex-col items-center relative overflow-visible mt-8 md:mt-0 transition-all duration-300">

        {/* Navbar positioned to overlap top border */}
        {/* Navbar moved to page.js */}



        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 xl:space-y-6 z-10 p-4 pt-24 md:pt-24 xl:pt-32 pb-12 xl:pb-10 w-full h-full justify-center my-auto xl:my-0 xl:justify-start">

          {/* Logo */}
          <div className="mb-2 md:mb-4 xl:mb-4 animate-fade-in-up">
            <CldImage
              src="hero_logo_wjbqzf"
              alt="NMIT Hacks Logo"
              width={500}
              height={200}
              className="h-24 md:h-36 lg:h-44 xl:h-40 w-auto object-contain"
              style={{ filter: "brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(6320%) hue-rotate(356deg) brightness(93%) contrast(118%)" }}
            />
          </div>

          {/* Details */}
          <div className="space-y-2 md:space-y-4 xl:space-y-3 pt-4 md:pt-2 xl:pt-6 animate-fade-in-up delay-100">
            <p className="text-xl md:text-3xl   lg:text-4xl xl:text-3xl text-[#ff0000] font-bold tracking-wide font-['PPMori'] px-2 mb-4 md:mb-6 mt-2 md:mt-4">
              National-Level 48-Hours Hackathon
            </p>
            <p className="text-lg md:text-2xl lg:text-3xl xl:text-2xl font-bold text-[#f17575ff] tracking-widest uppercase">
              8th - 10th May, 2026
            </p>
          </div>

          {/* Organization */}
          <div className="text-base md:text-xl lg:text-2xl xl:text-xl text-white font-bold animate-fade-in-up delay-200 px-4">
            <p className="tracking-wide">Organized by</p>
            <p className="text-white mt-1 md:mt-2 xl:mt-1 font-['PPMori'] font-bold">Department of Computer Science and Engineering</p>
            <p className="text-white text-sm md:text-lg lg:text-xl xl:text-lg mt-1 md:mt-2 xl:mt-1 font-bold tracking-widest">Nitte University, Bangalore campus</p>
          </div>

          {/* CTA Button */}
          <div className="pt-4 md:pt-0 xl:pt-0 animate-fade-in-up delay-300 flex flex-col items-center">
            <p className="text-[#f17575ff] text-xs md:text-xl xl:text-xl font-bold mb-2 tracking-wide font-['PPMori']">
              Register here
            </p>
            <div className="">
              <button className="w-40 md:w-48 h-10 md:h-11 border-2 rounded-[10px] border-[2px] border-[#ff0000] transition-all duration-300 hover:bg-white cursor-pointer flex items-center justify-center text-white overflow-hidden p-0">
                <img src="/assets/_Colored.png" alt="DEVFOLIO LOGO" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
