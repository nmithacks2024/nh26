'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const SliderRow = ({ direction = 'right', speed = 20, size = '150px', items, rowIndex, activeCard, onCardClick, isExternalPaused, isDesktop }) => {
  // Triple the items to ensure smooth looping without gaps
  const loopItems = [...items, ...items, ...items];
  const animationName = direction === 'right' ? 'scrollRight' : 'scrollLeft';

  const [isHovered, setIsHovered] = React.useState(false);

  // Check if this row contains the active card
  const isRowActive = activeCard && activeCard.rowIndex === rowIndex;
  // Pause if hovered OR if this row has the active card OR if externally paused (modal open)
  const isPaused = isHovered || isRowActive || isExternalPaused;

  return (
    <div className="flex overflow-hidden w-full relative z-0 py-4">
      <div
        className="flex"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
          width: 'max-content',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
        onMouseEnter={() => {
          if (isDesktop) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (isDesktop) setIsHovered(false);
        }}
      >
        {loopItems.map((item, index) => {
          const isCardActive = isRowActive && activeCard.cardIndex === index;
          return (
            <div key={index} className="pr-4 md:pr-7 shrink-0 cursor-pointer">
              <motion.div
                className="flex items-center justify-center rounded-xl bg-[#02093D] border-2 border-[#ff0000] w-full h-full overflow-hidden relative"
                style={{
                  width: size,
                  height: `calc(${size} * 0.6)`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onCardClick(rowIndex, index, item);
                }}
                animate={
                  isCardActive
                    ? { scale: isDesktop ? 1.1 : 1, boxShadow: "0 0 10px rgba(255, 0, 0, 1.0)" } 
                    : { scale: 1, boxShadow: "0 0 0px rgba(255, 0, 0, 0)" }
                }
                whileHover={isDesktop ? { 
                  scale: 1.1,
                  boxShadow: "0 0 7px rgba(255, 0, 0, 1.0)"
                } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {item.image ? (
                   <Image 
                     src={item.image} 
                     alt={item.label || "Gallery Image"} 
                     fill
                     className="object-cover"
                   />
                ) : (
                    <span className="text-white opacity-50 text-xs md:text-sm font-medium">
                    {item.label}
                    </span>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const InfiniteSlider = () => {
  // First Slider - Real Images
  const firstSliderItems = [
    { image: '/assets/Gallery/First/IMG_9260.JPG' },
    { image: '/assets/Gallery/First/IMG_9262.JPG' },
    { image: '/assets/Gallery/First/IMG_9265.JPG' },
    { image: '/assets/Gallery/First/IMG_9268.JPG' },
    { image: '/assets/Gallery/First/IMG_9271.JPG' },
    { image: '/assets/Gallery/First/IMG_9277.JPG' },
    { image: '/assets/Gallery/First/IMG_9283.JPG' },
    { image: '/assets/Gallery/First/IMG_9290.JPG' },
  ];

  const secondSliderItems = [
    { image: '/assets/Gallery/Second/IMG20250517220407.jpg' },
    { image: '/assets/Gallery/Second/IMG_8939.JPG' },
    { image: '/assets/Gallery/Second/IMG_8942.JPG' },
    { image: '/assets/Gallery/Second/IMG_9000.JPG' },
    { image: '/assets/Gallery/Second/IMG_9001.JPG' },
    { image: '/assets/Gallery/Second/IMG_9008.JPG' },
  ];

  const thirdSliderItems = [
    { image: '/assets/Gallery/Third/1000060858.jpg' },
    { image: '/assets/Gallery/Third/1000060987.jpg' },
    { image: '/assets/Gallery/Third/20250517_004513.jpg' },
    { image: '/assets/Gallery/Third/IMG_8646.JPG' },
    { image: '/assets/Gallery/Third/IMG_8799.JPG' },
    { image: '/assets/Gallery/Third/IMG_8839.JPG' },
  ];

  const dummyItems = Array.from({ length: 6 }, (_, i) => ({
    label: `Image ${i + 1}`,
  }));

  const [activeCard, setActiveCard] = useState(null); // { rowIndex, cardIndex }
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop(); // Initial check
    
    // Add logic to handle click outside
    const handleClickOutside = () => setActiveCard(null);
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', checkDesktop);
    
    return () => {
        window.removeEventListener('click', handleClickOutside);
        window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  const handleCardClick = (rowIndex, cardIndex, item) => {
    // If it has an image, open the modal
    if (item.image) {
        setSelectedImage(item.image);
    }
    
    // Also toggle active state if needed (for mobile tap behavior uniformity)
    // On mobile we might not strictly need 'activeCard' scale effect anymore since user requested no scale.
    // But keeping state logic is fine, we just disable the visual scale in SliderRow.
    if (activeCard && activeCard.rowIndex === rowIndex && activeCard.cardIndex === cardIndex) {
      setActiveCard(null);
    } else {
      setActiveCard({ rowIndex, cardIndex });
    }
  };

  const closeLoop = () => {
    setSelectedImage(null);
    setActiveCard(null);
  };

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

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
        rowIndex={0}
        activeCard={activeCard}
        onCardClick={handleCardClick}
        direction="right" 
        size="clamp(220px, 30vw, 280px)" 
        items={firstSliderItems} 
        speed={25} 
        isExternalPaused={!!selectedImage}
        isDesktop={isDesktop}
      />

      {/* 2nd slider (smaller) : Left */}
      <SliderRow 
        rowIndex={1}
        activeCard={activeCard}
        onCardClick={handleCardClick}
        direction="left" 
        size="clamp(180px, 25vw, 220px)" 
        items={secondSliderItems} 
        speed={22} 
        isExternalPaused={!!selectedImage}
        isDesktop={isDesktop}
      />

      {/* 3rd slider (smallest) : Right */}
      <SliderRow 
        rowIndex={2}
        activeCard={activeCard}
        onCardClick={handleCardClick}
        direction="right" 
        size="clamp(140px, 20vw, 160px)" 
        items={thirdSliderItems} 
        speed={19} 
        isExternalPaused={!!selectedImage}
        isDesktop={isDesktop}
      />

      {/* Modal for Expanded Image */}
      <AnimatePresence>
        {selectedImage && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                onClick={closeLoop}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} // Ensure extended coverage
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative w-full max-w-4xl h-[50vh] md:h-[80vh] rounded-xl overflow-hidden shadow-2xl border-2 border-[#ff0000]/50 bg-[#02093D]"
                    onClick={(e) => e.stopPropagation()} // Prevent close when clicking image itself
                >
                     {/* Image Container with vertical padding for blue bars */}
                     <div className="relative w-full h-full flex flex-col justify-between py-6 md:py-10">
                         <Image 
                            src={selectedImage}
                            alt="Expanded Gallery View"
                            fill
                            className="object-contain"
                            quality={100}
                         />
                     </div>
                     
                     {/* Close Button */}
                     <button 
                        onClick={closeLoop}
                        className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 cursor-pointer hover:bg-[#ff0000] text-white rounded-full p-2 transition-colors duration-300"
                     >
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                     </button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default InfiniteSlider;
