"use client"
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const Prizes2 = () => {
  const container = useRef(null)
  
  // Refs
  const goldCard = useRef(null)
  const silverCard = useRef(null)
  const bronzeCard = useRef(null)
  
  // Coin Refs
  const coinGold = useRef(null)
  const coinSilver = useRef(null)
  const coinBronze = useRef(null)

  // Shine Refs
  const shineGold = useRef(null)
  const shineSilver = useRef(null)
  const shineBronze = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container.current,
            start: "top 60%", 
            end: "bottom bottom",
            toggleActions: "play none none none", // One way play
            once: true // strict: ONLY once
        }
    })

    // Initial State: Cards are completely off-screen or low
    // We animate them hoisting UP to their final positions relative to the hanger
    
    // 1. Gold Hoist
    tl.to(goldCard.current, {
        top: "35%", // Hangs lower for visible string spacing
        duration: 1.5,
        ease: "power2.out"
    })
    
    // 2. Silver Hoist (Sequential)
    .to(silverCard.current, {
        top: "45%", // Lower than Gold
        duration: 1.5,
        ease: "power2.out"
    }, ">-0.5") 

    // 3. Bronze Hoist (Sequential)
    .to(bronzeCard.current, {
        top: "55%", // Lowest
        duration: 1.5,
        ease: "power2.out"
    }, ">-0.5")

    // Continuous Swing Animation
    const swing = (element, delay) => {
        gsap.to(element, {
            rotation: 2, 
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: delay
        })
    }
    swing(goldCard.current, 1)
    swing(silverCard.current, 1.5)
    swing(bronzeCard.current, 2.0)

    // Spin & Glow Animation (Constant Glow + Loop Spin)
    // Spin & Glow Animation (Constant Glow + Loop Spin)
    const setupCoinAnimation = (element, shineElement, color, spinDelay) => {
        // 1. Smoothly fade in a CONSTANT glow - Starts Immediately
        // Using fromTo to ensure zero-state is explicit and transition is perceptibly smooth
        gsap.fromTo(element, 
            { filter: "drop-shadow(0 0 0px transparent)" },
            {
                filter: `drop-shadow(0 0 30px ${color})`,
                duration: 2.5, // Slower for smoothness
                ease: "sine.inOut", // Soft easing
                delay: 0.5 
            }
        )

        // 2. Continuous Spin Loop (Independent, after arrival)
        const spinTl = gsap.timeline({ 
            repeat: -1, 
            repeatDelay: 3, 
            delay: spinDelay 
        })

        spinTl.to(element, { 
            rotationY: 360, 
            duration: 2, 
            ease: "power2.inOut" 
        })
        .set(element, { rotationY: 0 }) 
        
        // 3. Mirror Shine Effect (Immediately after spin)
        .fromTo(shineElement,
            { xPercent: -200, opacity: 0 },
            { 
                xPercent: 290, 
                opacity: 3, 
                duration: 0.5, 
                ease: "power6.inOut"
            },
            ">" // Start immediately after the spin finishes
        )
    }

    // Glow starts immediately, Spin waits for hoist
    // Glow starts immediately, Spin waits for hoist
    setupCoinAnimation(coinGold.current, shineGold.current, "#FFD700", 3.5)
    setupCoinAnimation(coinSilver.current, shineSilver.current, "#C0C0C0", 4.0)
    setupCoinAnimation(coinBronze.current, shineBronze.current, "#CD7F32", 4.5)

  }, { scope: container })

  return (
    <section ref={container} className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center pt-16 md:pt-20">
        
        {/* Mask to hide strings above hanger */}
        <div className="absolute top-0 left-0 w-full h-[22%] bg-black z-20"></div>

        {/* 1. Title */}
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-center text-white mb-4 z-30 relative font-['PPMori'] tracking-tight">Prizes</h2>

        {/* 2. The Hanger (Solid White Bar) */}
        <div className="absolute top-[22%] w-[95%] md:w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] max-w-4xl h-2 md:h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] z-30"></div>

        {/* Cards Container */}

        {/* Bronze Card (3rd) - Left */}
        <div 
            ref={bronzeCard}
            className="absolute left-[2%] md:left-[10%] lg:left-[15%] xl:left-[20%] 2xl:left-[25%] w-28 h-40 md:w-36 md:h-52 lg:w-40 lg:h-56 xl:w-44 xl:h-60 2xl:w-48 2xl:h-64 rounded-xl flex flex-col items-center justify-center border border-white/10 z-10"
            style={{ 
                top: "100%", 
                background: "linear-gradient(145deg, #4a2c0f, #2e1a05)", 
                boxShadow: "0 10px 30px rgba(139, 69, 19, 0.3)"
            }}
        >
            <div className="absolute bottom-[100%] left-1/2 w-[1px] md:w-[2px] h-[200vh] bg-white/40 -translate-x-1/2"></div>
            
            {/* Mirror Shine Overlay */}
            <div className="absolute inset-0 z-20 overflow-hidden rounded-xl pointer-events-none">
                <div ref={shineBronze} className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#CD7F32]/40 to-transparent -skew-x-[25deg] opacity-0"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4">
                <div className="relative w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] xl:w-[75px] xl:h-[75px] 2xl:w-[80px] 2xl:h-[80px]">
                     <Image ref={coinBronze} src="/assets/third.png" alt="3rd" fill className="object-contain drop-shadow-lg" />
                </div>
                <div className="text-lg md:text-xl xl:text-2xl font-bold text-[#CD7F32] font-['PPMori']">₹ 10,000</div>
            </div>
        </div>

        {/* Gold Card (1st) - Center */}
        <div 
            ref={goldCard}
            className="absolute left-1/2 -translate-x-1/2 w-40 h-52 md:w-48 md:h-64 lg:w-52 lg:h-72 xl:w-56 xl:h-76 2xl:w-64 2xl:h-80 rounded-xl flex flex-col items-center justify-center border border-white/10 z-10"
            style={{ 
                top: "100%", 
                background: "linear-gradient(145deg, #8B6508, #5c4203)", 
                boxShadow: "0 10px 40px rgba(218, 165, 32, 0.4)"
            }}
        >
            <div className="absolute bottom-[100%] left-1/2 w-[1px] md:w-[2px] h-[200vh] bg-white/60 -translate-x-1/2"></div>

            {/* Mirror Shine Overlay */}
            <div className="absolute inset-0 z-20 overflow-hidden rounded-xl pointer-events-none">
                <div ref={shineGold} className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent -skew-x-[25deg] opacity-0"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6">
                 <div className="relative w-[70px] h-[70px] md:w-[85px] md:h-[85px] lg:w-[95px] lg:h-[95px] xl:w-[105px] xl:h-[105px] 2xl:w-[110px] 2xl:h-[110px]">
                    <Image ref={coinGold} src="/assets/first.png" alt="1st" fill className="object-contain drop-shadow-2xl" />
                 </div>
                <div className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#FFD700] font-['PPMori']">₹ 25,000</div>
            </div>
        </div>

        {/* Silver Card (2nd) - Right */}
        <div 
            ref={silverCard}
            className="absolute right-[2%] md:right-[10%] lg:right-[15%] xl:right-[20%] 2xl:right-[25%] w-28 h-40 md:w-36 md:h-52 lg:w-40 lg:h-60 xl:w-44 xl:h-60 2xl:w-48 2xl:h-64 rounded-xl flex flex-col items-center justify-center border border-white/10 z-10"
            style={{ 
                top: "100%", 
                background: "linear-gradient(145deg, #71797E, #36454F)",
                boxShadow: "0 10px 30px rgba(192, 192, 192, 0.3)"
            }}
        >
            <div className="absolute bottom-[100%] left-1/2 w-[1px] md:w-[2px] h-[200vh] bg-white/40 -translate-x-1/2"></div>

            {/* Mirror Shine Overlay */}
            <div className="absolute inset-0 z-20 overflow-hidden rounded-xl pointer-events-none">
                <div ref={shineSilver} className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#C0C0C0]/40 to-transparent -skew-x-[25deg] opacity-0"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4">
                 <div className="relative w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] xl:w-[75px] xl:h-[75px] 2xl:w-[80px] 2xl:h-[80px]">
                    <Image ref={coinSilver} src="/assets/second.png" alt="2nd" fill className="object-contain drop-shadow-lg" />
                 </div>
                <div className="text-lg md:text-xl xl:text-2xl font-bold text-[#C0C0C0] font-['PPMori']">₹ 15,000</div>
            </div>
        </div>

    </section>
  )
}

export default Prizes2
