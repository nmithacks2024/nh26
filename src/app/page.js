import React from 'react'
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutUs from '../components/AboutUs';
import Tracks from '../components/Tracks';
import Prizes from '../components/Prizes';
// import Prizes2 from '@/components/Prizes2';
import Sponsors from '@/components/Sponsors';
import Faqs from '@/components/Faqs';

const Home = () => {
  return (
    <main className="relative bg-black min-h-screen">
      <Navbar />
      {/* Pull Hero up to overlap with Navbar (approx half navbar height + padding) */}
      <div className="-mt-[32px] w-full relative z-0">
        <Hero/>
      </div>
      <AboutUs />
      <Tracks/>
      <Prizes />
      <Sponsors 
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
      />
      <Faqs />
    </main> 
  )
}

export default Home