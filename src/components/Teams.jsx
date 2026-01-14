"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const TEAMS_DATA = [
  { name: 'Operations Team', count: 5 },
  { name: 'Sponsorship Team', count: 3 },
  { name: 'Design Team', count: 5 },
  { name: 'Social Media Team', count: 5 },
  { name: 'Content Team', count: 3 },
  { name: 'DevFolio Team', count: 3 },
  { name: 'Tech Team', count: 4 },
];

const TeamMemberCard = ({ isActive, onClick, setPaused, isTouchRef }) => {
  // Local state to track strictly hovering on the "Yellow" part
  const [isHovered, setIsHovered] = useState(false);

  // Combine click (active) and strict hover state
  const isExpanded = isActive || isHovered;

  const handleMouseEnter = () => {
    // Only expand and pause if it's not a touch event
    if (!isTouchRef.current) {
      setIsHovered(true);
      setPaused(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPaused(false);
  };

  return (
    <div 
      className={`relative flex items-center justify-center w-[300px] max-w-full isolate z-10 shrink transition-[height] duration-400 ease-in-out ${isExpanded ? 'h-[400px]' : 'h-[250px] md:h-[400px]'}`}
      onMouseLeave={handleMouseLeave}
      // REMOVED onClick from here to prevent generic clicks
    >
      {/* FRONT CARD (The Trigger) 
        - Hover: Desktop Only
        - Click: Triggers Expansion (Elongation)
      */}
      <div 
        onMouseEnter={handleMouseEnter}
        onClick={(e) => {
          e.stopPropagation();
          onClick(); // Trigger Elongation
        }}
        className={`absolute w-[90%] max-w-[250px] h-[190px] rounded-[25px] flex flex-col items-center justify-start pt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-400 ease-in-out hover:cursor-pointer ${isExpanded ? 'bg-[#FFE87C]' : 'bg-[#F5F5F5]'} text-black`}
      >
        <Image 
          src="/assets/dummy.png" 
          alt="Team Member" 
          width={130} 
          height={130} 
          className="relative rounded-full object-cover w-[100px] h-[100px] mb-[15px]"
        />
        <div className="font-bold text-[1.1em] text-black text-center mb-5">Gurucharan Maripala</div>
      </div>

      {/* BACK CARD (The Details)
        - Click: Stops propagation so clicking details/links doesn't close the card
      */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`absolute flex flex-col w-[85%] max-w-[240px] h-[190px] rounded-[35px] bg-white -z-10 transition-all duration-400 ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isExpanded ? 'h-[350px] [&>div]:opacity-100' : 'h-[190px] [&>div]:opacity-0'}`}
      >
        <div className="absolute top-[30px] w-full flex justify-center opacity-0 transition-opacity duration-400 ease-in-out">
          <div className="text-[1.2em] text-black font-bold flex flex-col items-center">
            Tech Team Co-Lead
            <div className="h-[2px] w-[50px] bg-black mt-1"></div>
          </div>
        </div>

        <div className="absolute bottom-[30px] w-full flex justify-center opacity-0 transition-opacity duration-400 ease-in-out">
          <div className="flex gap-[15px]">
            <a href="#" className="text-[#333] transition-colors duration-300 hover:text-[#0070f3]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="text-[#333] transition-colors duration-300 hover:text-[#0070f3]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="text-[#333] transition-colors duration-300 hover:text-[#0070f3]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Teams = () => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null); 
  const isTouch = React.useRef(false);

  useEffect(() => {
    let interval;
    if (!isPaused && !activeCardId) {
      interval = setInterval(() => {
        setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % TEAMS_DATA.length);
      }, 3000); 
    }
    return () => clearInterval(interval);
  }, [isPaused, activeCardId]);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % TEAMS_DATA.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentTeamIndex((prevIndex) => (prevIndex - 1 + TEAMS_DATA.length) % TEAMS_DATA.length);
  };

  const handleBackgroundClick = () => {
    // This is the ONLY place where Compression happens (Clicking outside)
    setActiveCardId(null);
  };

  const handleCardClick = (id) => {
    // STRICT "Elongation" logic: Clicking yellow sets active.
    // It does not toggle off. Closing is handled by handleBackgroundClick.
    setActiveCardId(id);
  };

  return (
    <section 
      className="w-full relative z-10 flex flex-col items-center justify-center bg-black py-20 min-h-screen"
      onClick={handleBackgroundClick}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-8 z-30 relative font-['PPMori'] tracking-tight pt-4 w-full">
        Teams
      </h2>
      
      <div 
        className="w-full max-w-[95vw] overflow-hidden"
        onTouchStart={() => { isTouch.current = true; }}
      >
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentTeamIndex * 100}%)` }}
        >
          {TEAMS_DATA.map((team, teamIndex) => (
            <div key={teamIndex} className="w-full shrink-0 flex flex-col items-center">
              <div className="text-2xl text-neutral-400 mb-10 font-['PPMori'] text-center">
                {team.name}
              </div>
              <div className="flex flex-wrap justify-center gap-2 w-full px-4 items-start">
                {Array.from({ length: team.count }).map((_, cardIndex) => {
                  const cardId = `${teamIndex}-${cardIndex}`;
                  return (
                    <TeamMemberCard 
                      key={cardIndex} 
                      isActive={activeCardId === cardId}
                      onClick={() => handleCardClick(cardId)}
                      setPaused={setIsPaused}
                      isTouchRef={isTouch}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-8 mt-6 md:mt-12 z-20">
        <button 
          onClick={handlePrev}
          className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={handleNext}
          className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </section>
  );
};

export default Teams;