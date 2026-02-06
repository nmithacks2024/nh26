"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Brochure = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showText, setShowText] = useState(true);

    const handleScrollClick = () => {
        setIsOpen(!isOpen);
    };

    React.useEffect(() => {
        let timeout;
        if (isOpen) {
            setShowText(false);
        } else {
            // Wait for partial animation to complete before showing text
            // Closing animation takes 0.8s, showing it slightly before or right at end
            timeout = setTimeout(() => {
                setShowText(true);
            }, 800);
        }
        return () => clearTimeout(timeout);
    }, [isOpen]);

    return (
        <section className="w-full py-20 bg-[#010524ff] relative z-10 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Section Title */}
            <div className="max-w-[90vw] xl:max-w-7xl mx-auto px-6 relative z-10 w-full mb-16">
                <h2 className="text-3xl md:text-5xl text-[#f17575ff] font-bold text-center font-['PPMori'] tracking-tight">
                    <span className="relative inline-block after:content-[''] after:absolute after:bottom-[-3] after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
                        Brochure
                    </span>
                </h2>
            </div>
            
            <h3 className="text-lg md:text-3xl font-bold text-white font-['PPMori'] mb-3 md:mb-4 leading-tight text-center">
                Looking to Sponsor <br/>
                <span className="text-[#f17575ff]">NMIT HACKS 2026?</span>
            </h3>

            {/* Dragon Scroll Container */}
            <div className="relative flex flex-col items-center justify-center pointer-events-none"> 
                
                {/* Top Handle */}
                <motion.div 
                    className="relative z-30 w-[90vw] max-w-[600px] h-[50px] md:h-[60px] cursor-pointer pointer-events-auto filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                    onClick={handleScrollClick}
                    initial={{ y: "50%" }}
                    animate={{ y: isOpen ? 0 : "50%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Cylinder Visuals - Dark Blue */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#02093D] to-[#000000] border-2 border-[#f17575ff]/30"></div>
                    
                    {/* Decorative Caps - Red #ff0000 */}
                    <div className="absolute left-[-5px] md:left-[-10px] top-1/2 -translate-y-1/2 w-[20px] md:w-[30px] h-[60px] md:h-[70px] bg-gradient-to-r from-[#ff0000] to-[#800000] rounded-l-lg border-y-2 border-l-2 border-[#fff] shadow-lg"></div>
                    <div className="absolute right-[-5px] md:right-[-10px] top-1/2 -translate-y-1/2 w-[20px] md:w-[30px] h-[60px] md:h-[70px] bg-gradient-to-l from-[#ff0000] to-[#800000] rounded-r-lg border-y-2 border-r-2 border-[#fff] shadow-lg"></div>
                    
                    {/* Text hint when closed */}
                    {showText && !isOpen && (
                         <div className="absolute inset-0 flex items-center justify-center p-2">
                            <span className="text-white/70 font-bold tracking-widest uppercase drop-shadow-md animate-pulse text-[10px] md:text-base whitespace-nowrap overflow-hidden text-ellipsis">Click to access Brochure !</span>
                         </div>
                    )}
                </motion.div>

                {/* Scroll Body (Paper) */}
                <motion.div
                    className="relative w-[85vw] max-w-[580px] bg-[#02093D] overflow-hidden shadow-2xl origin-top pointer-events-auto"
                    initial={{ height: 0 }}
                    animate={{ height: isOpen ? "auto" : 0 }} 
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* No Background Image as requested */}
                    
                    {/* Content Overlay */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 md:p-8 text-center border-x-[2px] md:border-x-[4px] border-[#f17575ff]/20 py-8 md:py-12">
                        
                        <div className="w-10 md:w-16 h-1 bg-[#ff0000] mb-4 md:mb-6"></div>


                        
                        <p className="text-gray-300 mb-6 md:mb-8 max-w-sm text-xs md:text-base font-['PPMori'] leading-relaxed">
                            Join us in empowering the next generation of innovators. Download our brochure to see how you can get involved.
                        </p>

                        <a 
                            href="/Brochure.pdf" 
                            download="NMIT_Hacks_Brochure.pdf"
                            className="relative inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-bold text-[#ff0000] transition-all duration-200 bg-white font-['PPMori'] rounded-full hover:bg-[#ff0000] hover:text-white hover:scale-105 shadow-xl border-2 border-transparent"
                        >
                            Download Brochure
                            <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                        </a>

                        <div className="w-10 md:w-16 h-1 bg-[#ff0000] mt-6 md:mt-8"></div>
                    </div>
                </motion.div>

                {/* Bottom Handle */}
                <motion.div 
                    className="relative z-20 w-[90vw] max-w-[600px] h-[50px] md:h-[60px] cursor-pointer pointer-events-auto filter drop-shadow-[0_-5px_10px_rgba(0,0,0,0.5)]"
                    onClick={handleScrollClick}
                    initial={{ y: "-50%" }}
                    // Moves slightly up when closed to touch top handle
                    animate={{ y: isOpen ? 0 : "-50%" }} 
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                     {/* Cylinder Visuals - Dark Blue */}
                     <div className="absolute inset-0  bg-gradient-to-b from-[#000000] via-[#02093D] to-[#000000] border-2 border-[#f17575ff]/30"></div>
                     
                    {/* Decorative Caps - Red #ff0000 */}
                    <div className="absolute left-[-5px] md:left-[-10px] top-1/2 -translate-y-1/2 w-[20px] md:w-[30px] h-[60px] md:h-[70px] bg-gradient-to-r from-[#ff0000] to-[#800000] rounded-l-lg border-y-2 border-l-2 border-[#fff] shadow-lg"></div>
                    <div className="absolute right-[-5px] md:right-[-10px] top-1/2 -translate-y-1/2 w-[20px] md:w-[30px] h-[60px] md:h-[70px] bg-gradient-to-l from-[#ff0000] to-[#800000] rounded-r-lg border-y-2 border-r-2 border-[#fff] shadow-lg"></div>
                </motion.div>

            </div>
        </section>
    );
};

export default Brochure;
