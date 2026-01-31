'use client'
import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const Prizes = () => {
  const container = useRef(null)
  const [canHover, setCanHover] = useState(false)

  // Refs for elements
  const bar2 = useRef(null)
  const coin2 = useRef(null)

  const bar1 = useRef(null)
  const coin1 = useRef(null)

  const bar3 = useRef(null)
  const coin3 = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 50%", // Start animation when top of prizes section hits 70% of viewport
        once: true
      },
      delay: 0.5 // Delay the start of the animation sequence
    })

    // Initial state setup (explicitly set here just in case)
    gsap.set([bar2.current, bar1.current, bar3.current], { height: '160px' })
    gsap.set([coin2.current, coin1.current, coin3.current], { y: 0 })

    // 1. Elevation: Bars rise to their final heights
    tl.to(bar2.current, { height: '260px', duration: 1, ease: "power2.out" })
      .to(bar1.current, { height: '360px', duration: 1, ease: "power2.out" }, "<0.1") // Overlap start slightly
      .to(bar3.current, { height: '200px', duration: 1, ease: "power2.out" }, "<0.1")

    // 2. Revolve & Rise: Simultaneous smooth movement
    // Revolve: 360 degree spin
    // 2. Revolve & Rise: Staggered Sequence (From Static Bottom)
    // Wait for bars to finish, then small delay, then Coins animate one by one

    // Gold (1st Place) - First
    tl.to(coin1.current, {
      y: -350, // Travel from bottom to float above 360px bar
      rotationY: 360,
      duration: 1,
      ease: "power2.inOut"
    }, "<0.5") // 0.5s delay AFTER bars finish

    // Silver (2nd Place) - Second
    tl.to(coin2.current, {
      y: -250, // Travel from bottom to float above 260px bar
      rotationY: 360,
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.65")

    // Bronze (3rd Place) - Third
    tl.to(coin3.current, {
      y: -190, // Travel from bottom to float above 200px bar
      rotationY: 360,
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.65")

    // 4. Levitate & Glow Loop
    // Create floating animation
    const floatAnim = (element, distance, duration) => {
      gsap.to(element, {
        y: `-=${distance}`,
        duration: duration,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      })
    }

    // Create glow animation (radiance) - Updated to simple Glove
    const addGlow = (element, color) => {
      gsap.to(element, {
        boxShadow: `0 0 40px 15px ${color}`,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut" // list all the options : 
      })
    }


    // Trigger floating and glowing after sequence
    tl.call(() => {
      setCanHover(true)
      floatAnim(coin2.current, 15, 2.0)
      floatAnim(coin1.current, 15, 2.2)
      floatAnim(coin3.current, 15, 1.8)

      // Activate Glows
      addGlow(coin2.current, "rgba(192, 192, 192, 0.6)") // Silver
      addGlow(coin1.current, "rgba(255, 215, 0, 0.6)")  // Gold
      addGlow(coin3.current, "rgba(205, 127, 50, 0.6)") // Bronze

    })

  }, { scope: container })

  const handleHover = (e) => {
    if (!canHover) return
    const el = e.currentTarget
    if (el.getAttribute('data-spinning') === 'true') return

    el.setAttribute('data-spinning', 'true')
    gsap.to(el, {
      rotationY: '+=360',
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => {
        el.removeAttribute('data-spinning')
      }
    })
  }

  return (
    <section ref={container} className="w-full py-20 bg-[#010524ff] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-[#f17575ff] mb-24 font-['PPMori'] tracking-tight">
          <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
            Prizes
          </span>
        </h2>

        {/* Podium Container */}
        <div className="flex items-end justify-center gap-2 md:gap-8 h-[550px] w-full max-w-3xl pb-10">

          {/* 2nd Place (Left) - Silver */}
          <div
            ref={bar2}
            className="w-1/3 max-w-[188px] h-[160px] bg-gradient-to-b from-[#F54646] to-[#FD9A9A] rounded-t-lg relative flex flex-col justify-end pb-6 items-center"
          >
            {/* Prize Slot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] py-1 rounded-md bg-gray-300 text-gray-800 font-bold font-['PPMori'] text-sm md:text-xl flex justify-center items-center z-0 whitespace-nowrap">
              ₹ 15,000
            </div>

            {/* Moving Container for Coin */}
            <div ref={coin2} onMouseEnter={handleHover} className="relative z-20 w-24 h-24 flex items-center justify-center rounded-full">
              {/* Coin Image */}
              <div className="relative z-10 w-full h-full">
                <Image src="/assets/second.png" alt="2nd Place" width={96} height={96} className="object-contain" />
              </div>
            </div>
          </div>

          {/* 1st Place (Center) - Gold */}
          <div
            ref={bar1}
            className="w-1/3 max-w-[188px] h-[160px] bg-gradient-to-b from-[#F54646] to-[#FD9A9A] rounded-t-lg relative flex flex-col justify-end pb-6 items-center shadow-[0_0_30px_rgba(255,255,255,0.3)] z-10"
          >
            {/* Prize Slot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] py-1 rounded-md bg-yellow-400 text-yellow-900 font-bold font-['PPMori'] text-sm md:text-xl flex justify-center items-center z-0 whitespace-nowrap">
              ₹ 25,000
            </div>

            <div ref={coin1} onMouseEnter={handleHover} className="relative z-20 w-24 h-24 flex items-center justify-center rounded-full">
              {/* Coin Image */}
              <div className="relative z-10 w-full h-full">
                <Image src="/assets/first.png" alt="1st Place" width={96} height={96} className="object-contain" />
              </div>
            </div>
          </div>

          {/* 3rd Place (Right) - Bronze */}
          <div
            ref={bar3}
            className="w-1/3 max-w-[188px] h-[160px] bg-gradient-to-b from-[#F54646] to-[#FD9A9A] rounded-t-lg relative flex flex-col justify-end pb-6 items-center"
          >
            {/* Prize Slot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] py-1 rounded-md bg-orange-300 text-orange-900 font-bold font-['PPMori'] text-sm md:text-xl flex justify-center items-center z-0 whitespace-nowrap">
              ₹ 10,000
            </div>

            <div ref={coin3} onMouseEnter={handleHover} className="relative z-20 w-24 h-24 flex items-center justify-center rounded-full">
              {/* Coin Image */}
              <div className="relative z-10 w-full h-full">
                <Image src="/assets/third.png" alt="3rd Place" width={96} height={96} className="object-contain" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Prizes