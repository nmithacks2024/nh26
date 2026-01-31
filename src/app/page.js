import React from 'react'
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutUs from '../components/AboutUs';
// import Tracks2 from '../components/Tracks2';
import ContactUs from '../components/ContactUs';
import Prizes from '../components/Prizes';
import Sponsors from '@/components/Sponsors';
import Faqs from '@/components/Faqs';
import Teams from '@/components/Teams';
// import Teams2 from '@/components/Teams2';
import { FlipCard } from '@/components/animate-ui/components/community/flip-card';
import Tracks3 from '../components/Tracks3';

// --- ADD THIS DATA OBJECT ---
const data = {
  name: 'Animate UI',
  username: 'animate_ui',
  image: 'https://pbs.twimg.com/profile_images/1950218390741618688/72447Y7e_400x400.jpg',
  bio: 'A fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, and Motion.',
  stats: { following: 200, followers: 2900, posts: 120 },
  socialLinks: {
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
};
// ----------------------------

const Home = () => {
  return (
    <main className="relative bg-black min-h-screen">
      <Navbar />
      <div className="-mt-[60px] w-full relative z-0">
        <Hero />
      </div>
      <section id="about">
        <AboutUs />
      </section>
      <section id="tracks">
        <Tracks3 />
      </section>
      <section id="prizes">
        <Prizes />
      </section>
      <section id="sponsors">
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
      </section>
      {/* <Teams /> */}
      <section id="teams">
        {/* <Teams2/> */}
      </section>
      {/* Container to center the card so it doesn't stretch full width */}
      {/* <div className="flex justify-center py-20">
         <FlipCard data={data} />
      </div> */}
      <section id="faqs">
        <Faqs />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
    </main>
  )
}

export default Home