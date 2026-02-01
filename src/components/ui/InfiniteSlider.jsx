'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SliderRow = ({ direction = 'right', speed = 20, size = '150px', items }) => {
  // Triple the items to ensure smooth looping without gaps
  const loopItems = [...items, ...items, ...items];
  const animationName = direction === 'right' ? 'scrollRight' : 'scrollLeft';

  const [clickedIndex, setClickedIndex] = React.useState(null);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = () => setClickedIndex(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const isPaused = isHovered || clickedIndex !== null;

  return (
    <div className="flex overflow-hidden w-full relative z-0 py-4">
      <div
        className="flex"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
          width: 'max-content',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loopItems.map((item, index) => (
          <div key={index} className="pr-4 md:pr-7 shrink-0">
            <motion.div
              className="flex items-center justify-center rounded-xl bg-[#02093D] border-2 border-[#ff0000] w-full h-full"
              style={{
                width: size,
                height: `calc(${size} * 0.6)`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setClickedIndex(index);
              }}
              animate={
                clickedIndex === index 
                  ? { scale: 1.1, boxShadow: "0 0 10px rgba(255, 0, 0, 1.0)" } 
                  : { scale: 1, boxShadow: "0 0 0px rgba(255, 0, 0, 0)" }
              }
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 10px rgba(255, 0, 0, 1.0)"
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="text-white opacity-50 text-xs md:text-sm font-medium">
                {item.label}
              </span>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfiniteSlider = () => {
  const items = Array.from({ length: 6 }, (_, i) => ({
    label: `Image ${i + 1}`,
  }));

  return (
    <div className="w-full flex flex-col gap-8 py-10 bg-[#010524ff] relative z-10 overflow-hidden">
      
      {/* Gallery Title */}
      <div className="max-w-[90vw] xl:max-w-7xl mx-auto px-6 relative z-10 w-full">
        <h2 className="text-3xl md:text-5xl text-[#f17575ff] font-bold text-center mb-16 font-['PPMori'] tracking-tight">
          <span className="relative inline-block after:content-[''] after:absolute after:bottom-[-3] after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
            Gallery
          </span>
        </h2>
      </div>

      {/* 1st slider (largest) : Right */}
      <SliderRow 
        direction="right" 
        size="clamp(220px, 30vw, 280px)" 
        items={items} 
        speed={25} 
      />

      {/* 2nd slider (smaller) : Left */}
      <SliderRow 
        direction="left" 
        size="clamp(180px, 25vw, 220px)" 
        items={items} 
        speed={22} 
      />

      {/* 3rd slider (smallest) : Right */}
      <SliderRow 
        direction="right" 
        size="clamp(140px, 20vw, 160px)" 
        items={items} 
        speed={19} 
      />
    </div>
  );
};

export default InfiniteSlider;
