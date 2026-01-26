"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import ShinyText from "../subcomponents/ShinyText";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '0, 0, 0';
const MOBILE_BREAKPOINT = 768;

const sponsorsData = {
  platinum: [
    { title: 'YellowHillsAI', image: '/assets/yellowhillsai.png', link: 'https://yellowhills.ai/' },
    { title: 'Lorem Ipsum' }
  ],
  gold: Array(2).fill({ title: 'Lorem Ipsum' }),
  silver: Array(4).fill({ title: 'Lorem Ipsum' })
};

const tierColors = {
  platinum: '229, 228, 226', // #E5E4E2
  gold: '255, 215, 0',       // #FFD700
  silver: '192, 192, 192'    // #C0C0C0
};

const tierHexColors = {
  platinum: '#b5b5b5',
  gold: '#b5b5b5',
  silver: '#b5b5b5'
};

const tierShineColors = {
  platinum: '#ffffffff',
  gold: '#FFD700',
  silver: '#dededeff'
};

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = radius => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  href
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        // Ensure we clone and append correctly
        const clone = particle.cloneNode(true);
        // Explicitly set background here to be safe, though createParticleElement should have handled it
        clone.style.background = `rgba(${glowColor}, 1)`;
        clone.style.boxShadow = `0 0 6px rgba(${glowColor}, 0.6)`;

        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = e => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = e => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  const Component = href ? 'a' : 'div';

  return (
    <Component
      ref={cardRef}
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </Component>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.card').forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div
    className="bento-section grid gap-2 p-3 max-w-[54rem] select-none relative mx-auto"
    style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const Sponsors = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <section className="w-full py-20 bg-[#010524ff] relative">
      <style>
        {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: #808080;
            --background-dark: #02093D;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(0, 0, 0, 1);
            --purple-glow: rgba(0, 0, 0, 0.2);
            --purple-border: rgba(0, 0, 0, 0.8);
          }

          /* Default state: red border */
          .card {
            border-color: #ff0000 !important;
          }

          /* Hover state: remove red border */
          .card:hover {
            border-color: #808080 !important;
          }

          
          .card-responsive {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            width: 100%;
            margin: 0 auto;
            padding: 1rem;
          }
          
          .tier-row {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.5rem;
            width: 100%;
          }
          
          .card {
             width: 100%;
             max-width: 200px; /* Reduced from 280px for standard mobile */
             height: 200px; /* Reduced from 250px */
             flex-shrink: 0;
          }

          @media (max-width: 400px) { /* Extra specific for SE/Mini */
             .card {
                max-width: 160px;
                height: 160px;
             }
          }

          @media (min-width: 768px) {
             .card {
                 width: 220px; /* Reduced from 300px to 220px for "not huge" look */
                 height: 220px;
             }
             .tier-row {
                 width: 100%; /* Allow full width for side-by-side */
                 max-width: 1200px; /* grid-like constraint but large enough for side-by-side */
                 margin: 0 auto;
                 display: flex;
                 flex-wrap: wrap;
                 justify-content: center;
                 gap: 2rem;
             }
          }

          @media (max-width: 767px) {
             .tier-row {
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
             }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(var(--tier-glow), calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(var(--tier-glow), calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(var(--tier-glow), 0.2);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(var(--tier-glow), 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .particle-container:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.2), 0 0 30px rgba(var(--tier-glow), 0.2);
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          @media (max-width: 599px) {
            .card-responsive {
              width: 95%;
              padding: 0.5rem;
            }
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {/* Title inside Grid for perfect alignment */}
        <h2 className="text-3xl md:text-5xl font-bold text-center text-[#f17575ff] mb-8 z-30 relative font-['PPMori'] tracking-tight pt-4 w-full">
          <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
            Sponsors
          </span>
        </h2>

        <div className="card-responsive flex flex-col items-center">
          {['platinum', 'gold', 'silver'].map((tier) => (
            <div key={tier} className="w-full flex flex-col items-center gap-8 mb-8">
              <ShinyText
                text={tier.charAt(0).toUpperCase() + tier.slice(1)}
                disabled={false}
                speed={3}
                className="text-2xl md:text-2xl font-bold uppercase tracking-widest font-['PPMori'] opacity-90"
                color={tierHexColors[tier]}
                shineColor={tierShineColors[tier]}
              />
              <div className="tier-row w-full px-4">
                {sponsorsData[tier].map((item, index) => {
                  const tierColor = tierColors[tier] || glowColor;

                  const baseClassName = `card flex flex-col items-center justify-center relative rounded-[20px] border-2 border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${enableBorderGlow ? 'card--border-glow' : ''
                    } ${item.link ? 'cursor-pointer' : ''}`;

                  const cardStyle = {
                    backgroundColor: 'var(--background-dark)', // Keep dark background for contrast
                    borderColor: 'var(--border-color)',
                    color: 'var(--white)',
                    '--glow-x': '50%',
                    '--glow-y': '50%',
                    '--glow-intensity': '0',
                    '--glow-radius': '200px',
                    '--tier-glow': tierColor // Dynamic CSS variable for this card
                  };

                  if (enableStars) {
                    return (
                      <ParticleCard
                        key={`${tier}-${index}-${tierColor}`} // Force re-render if color changes
                        className={baseClassName}
                        style={cardStyle}
                        disableAnimations={shouldDisableAnimations}
                        particleCount={particleCount}
                        glowColor={tierColor}
                        enableTilt={enableTilt}
                        clickEffect={clickEffect}
                        enableMagnetism={enableMagnetism}
                        href={item.link}
                      >
                        <div className="card__content flex flex-col items-center justify-center relative text-white h-full z-10 p-4 text-center w-full">
                          {item.image ? (
                            <div className="relative w-full h-full flex items-center justify-center p-4">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-contain p-4"
                              />
                            </div>
                          ) : (
                            <h3 className={`font-bold text-lg md:text-xl text-white/90 ${textAutoHide ? 'text-clamp-2' : ''}`}>
                              {item.title}
                            </h3>
                          )}
                        </div>
                      </ParticleCard>
                    );
                  }

                  return (
                    <div
                      key={`${tier}-${index}`}
                      className={baseClassName}
                      style={cardStyle}
                    // ... (Ref logic would go here if not using ParticleCard, but assuming enableStars is mostly true)
                    // For simplicity in this renovation, defaulting to just the struct since enableStars is widely used
                    // If enableStars is false, we'd need the ref logic. 
                    // I'll leave the ParticleCard branch as the main logic for now as per "fully utilises Sponsors.jsx components"
                    >
                      <div className="card__content flex flex-col items-center justify-center relative text-white h-full z-10 p-4 text-center w-full">
                        {item.image ? (
                          <div className="relative w-full h-full flex items-center justify-center p-4">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-contain p-4"
                            />
                          </div>
                        ) : (
                          <h3 className="font-bold text-lg">{item.title}</h3>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </BentoCardGrid>
    </section>
  );
};

export default Sponsors;

