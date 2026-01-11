'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '#about' },
    { name: 'Tracks', href: '#tracks' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Teams', href: '#teams' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        sticky
        top-15 left-0 right-0 z-50
        flex items-start
        transition-all duration-500 ease-in-out
      `}
    >
      <div
        className={`
          rounded-full px-6 py-3
          flex items-center justify-between md:justify-normal gap-4 lg:gap-8
          border transition-all duration-500 ease-in-out
          ml-4 w-[calc(100vw-2rem)] translate-x-0
          md:ml-[50%] md:w-auto md:-translate-x-1/2 md:pr-15
          ${
            isScrolled
              ? 'bg-black/10 backdrop-blur-[15px] border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
              : 'bg-black/60 backdrop-blur-md border-white/20 shadow-none'
          }
        `}
        style={
          isScrolled
            ? { background: 'rgba(0,0,0,0.25)' }
            : undefined
        }
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <img
              src="/assets/navbar logo.png"
              alt="Logo"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-3 lg:gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 uppercase tracking-wide font-['PPMori'] whitespace-nowrap"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl flex flex-col gap-2 z-40 md:hidden w-[70vw] max-w-sm animate-fade-in-up">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-200 uppercase tracking-wide font-['PPMori'] block text-center"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;