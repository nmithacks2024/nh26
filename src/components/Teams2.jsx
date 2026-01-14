"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

const TEAMS_DATA = [
  { name: 'Operations Team', count: 5 },
  { name: 'Sponsorship Team', count: 3 },
  { name: 'Design Team', count: 5 },
  { name: 'Social Media Team', count: 5 },
  { name: 'Content Team', count: 3 },
  { name: 'DevFolio Team', count: 3 },
  { name: 'Tech Team', count: 4 },
];

const FlipMemberCard = ({ onHoverStart, onHoverEnd }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-[260px] h-[260px] md:w-[300px] md:h-[320px] perspective-1000 shrink-0"
      onMouseEnter={() => { setIsFlipped(true); onHoverStart?.(); }}
      onMouseLeave={() => { setIsFlipped(false); onHoverEnd?.(); }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[35px] bg-[#F5F5F5] flex flex-col items-center justify-start pt-10 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image 
            src="/assets/dummy.png" 
            alt="Team Member" 
            width={150} 
            height={150} 
            className="rounded-full object-cover w-[120px] h-[120px] md:w-[150px] md:h-[150px] mb-6 border-4 border-white shadow-sm"
          />
          <div className="font-bold text-lg md:text-xl text-black text-center px-4">Gurucharan Maripala</div>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[35px] bg-white border border-gray-100 flex flex-col items-center justify-center backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-lg md:text-xl text-black font-bold flex flex-col items-center mb-8">
            Tech Team Co-Lead
            <div className="h-[2px] w-[50px] bg-black mt-2"></div>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-[#333] transition-colors duration-300 hover:text-[#0070f3] hover:scale-110 transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="text-[#333] transition-colors duration-300 hover:text-[#0070f3] hover:scale-110 transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
            <a href="#" className="text-[#333] transition-colors duration-300 hover:text-[#0070f3] hover:scale-110 transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Teams2 = () => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [containerHeight, setContainerHeight] = useState('auto');
  const isTouch = useRef(false);
  const teamRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % TEAMS_DATA.length);
      }, 3000); // 3 seconds delay as requested
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (teamRefs.current[currentTeamIndex]) {
      setContainerHeight(`${teamRefs.current[currentTeamIndex].offsetHeight}px`);
    }
  }, [currentTeamIndex]);

  const handleNext = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % TEAMS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex - 1 + TEAMS_DATA.length) % TEAMS_DATA.length);
  };

  return (
    <section className="w-full relative z-10 flex flex-col items-center justify-center bg-black py-20 min-h-screen">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-8 z-30 relative font-['PPMori'] tracking-tight pt-4 w-full">
        Teams
      </h2>

      {/* Navigation & Header */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 z-30 relative w-full px-4">
        <button 
          onClick={handlePrev}
          className="p-2 md:p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <div className="text-xl md:text-3xl text-neutral-400 font-['PPMori'] text-center min-w-[200px]">
          {TEAMS_DATA[currentTeamIndex].name}
        </div>

        <button 
          onClick={handleNext}
          className="p-2 md:p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      
      <div 
        className="w-full max-w-[95vw] overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: containerHeight }}
        onTouchStart={() => { isTouch.current = true; }}
      >
        <div 
          className="flex items-start transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentTeamIndex * 100}%)` }}
        >
          {TEAMS_DATA.map((team, index) => (
            <div 
              key={index} 
              ref={el => teamRefs.current[index] = el}
              className="w-full shrink-0 flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center gap-6 w-full px-4 items-start">
                {Array.from({ length: team.count }).map((_, i) => (
                  <FlipMemberCard 
                    key={i} 
                    onHoverStart={() => setIsPaused(true)}
                    onHoverEnd={() => setIsPaused(false)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Teams2;