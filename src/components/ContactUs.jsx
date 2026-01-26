import React from 'react';
import { FaInstagram, FaFacebookF, FaDiscord, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsHeartFill } from "react-icons/bs";

const ContactUs = () => {
  return (
    <section className="min-h-screen bg-[#010524ff] text-white py-12 px-4 flex flex-col items-center justify-between relative overflow-hidden">

      {/* 1. Header Section */}
      <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center text-[#f17575ff]">
        <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
          Contact Us
        </span>
      </h2>

      {/* 2. Logos & Map Container */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12">

        {/* Left Column: Map */}
        <div className="w-full">
          <div className="w-full h-56 md:h-80 lg:h-96 rounded-lg overflow-hidden border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <iframe
              src="https://maps.google.com/maps?q=Nitte+Meenakshi+Institute+of+Technology&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NMIT Location Map"
            ></iframe>
          </div>
        </div>

        {/* Right Column: Logos */}
        <div className="flex flex-col items-center gap-8">
          <img
            src="/assets/nmit-logo.png"
            alt="Nitte Meenakshi Institute of Technology"
            className="h-12 md:h-20 object-contain brightness-0 invert"
          />
          <img
            src="/assets/hacks-vertical.png"
            alt="NMIT Hacks Logo"
            className="h-24 md:h-40 object-contain"
          />
        </div>
      </div>

      {/* 3. Footer / Socials Section */}
      <div className="flex flex-col items-center gap-6 w-full z-10">

        <p className="text-lg md:text-xl flex items-center gap-2">
          You can visit us <span role="img" aria-label="smile">😊</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <SocialIcon href="https://www.instagram.com/nmit_hacks?igsh=YzJyaGx4Z2oyZzZy" icon={<FaInstagram size={24} />} />
          {/* <SocialIcon href="https://facebook.com" icon={<FaFacebookF size={24} />} /> */}
          {/* <SocialIcon href="https://discord.com" icon={<FaDiscord size={24} />} /> */}
          <SocialIcon href="https://www.linkedin.com/in/nmit-hacks-8082531bb/" icon={<FaLinkedinIn size={24} />} />
          <SocialIcon href="https://x.com/NMIT_Hacks" icon={<FaXTwitter size={24} />} />
        </div>

        <button className="mt-4 px-6 py-2 md:px-8 md:py-3 rounded-full border-2 cursor-pointer border-red-500 text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold text-sm md:text-base">
          Code of Conduct
        </button>

        <p className="mt-2 text-gray-300 text-center">
          For event-related queries, contact: <a href="mailto:hackathon@nmit.ac.in" className="text-[#f17575ff] font-bold hover:underline">hackathon@nmit.ac.in</a>
        </p>

        <p className="mt-6 md:mt-1 flex items-center gap-2 text-xs md:text-sm text-gray-400">
          Made with <BsHeartFill className="text-[#ff0000] animate-pulse" /> by NMIT Hacks
        </p>
      </div>

    </section>
  );
};

const SocialIcon = ({ href, icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full border-[2px] border-white flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.8)] hover:text-[#c70202ff] transition-all duration-300"
    >
      {icon}
    </a>
  );
};

export default ContactUs;