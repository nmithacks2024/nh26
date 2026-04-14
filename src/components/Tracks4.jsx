'use client';

import React from 'react';
import Image from 'next/image';
import { Gamepad2, Cpu, BrainCircuit, ShieldCheck, Lightbulb } from 'lucide-react';
import Starfield from './ui/Starfield';

const tracksData = [
    {
        title: "Game Dev",
        description: "Bring virtual worlds to life, crafting captivating and interactive gaming experiences.",
        icon: Gamepad2,
        color: "#e84b8a",
        accentColor: "from-pink-600/25 to-pink-600/10",
        image: '/assets/TrackPics/track-1.jpg',
    },
    {
        title: "IOT",
        description: "Witness the convergence of software and hardware to implement solutions that leverage the power of IoT.",
        icon: Cpu,
        color: "#0ba5e9",
        accentColor: "from-blue-600/25 to-blue-600/10",
        image: '/assets/TrackPics/track-2.jpg',
    },
    {
        title: "AI & ML",
        description: "Push the boundaries of intelligent systems in the cutting-edge world of AI & ML.",
        icon: BrainCircuit,
        color: "#16a34a",
        accentColor: "from-green-600/25 to-green-600/10",
        image: '/assets/TrackPics/track-3.jpg',
    },
    {
        title: "Blockchain / Cybersecurity",
        description: "Secure decentralized systems and protect digital assets in the evolving landscape of Web3 and security.",
        icon: ShieldCheck,
        color: "#ca8a04",
        accentColor: "from-amber-600/25 to-amber-600/10",
        image: '/assets/TrackPics/track-4.jpg',
    },
    {
        title: "Open Innovation",
        description: "Embrace the freedom to explore tech frontiers, fostering ideas that break boundaries.",
        icon: Lightbulb,
        color: "#dc2626",
        accentColor: "from-red-600/25 to-red-600/10",
        image: '/assets/TrackPics/track-5.jpg',
    }
];

const TrackCard = ({ track, isActive, onToggle }) => {
    const { title, description, icon: Icon, color, accentColor, image } = track;

    return (
        <div 
            className="track-card relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-500 h-72 cursor-pointer md:cursor-default"
            style={{
                boxShadow: `0 10px 30px ${color}30, 0 0 20px ${color}20`
            }}
            onClick={onToggle}
        >
            <style>{`
                .track-card-${title.replace(/\s+/g, '-').toLowerCase()} {
                    animation: none;
                }
                .track-card-${title.replace(/\s+/g, '-').toLowerCase()}:hover {
                    animation: glow-pulse-${title.replace(/\s+/g, '-').toLowerCase()} 2s ease-in-out infinite;
                }
                @keyframes glow-pulse-${title.replace(/\s+/g, '-').toLowerCase()} {
                    0%, 100% {
                        box-shadow: 0 10px 30px ${color}25, 0 0 20px ${color}15;
                    }
                    50% {
                        box-shadow: 0 15px 40px ${color}40, 0 0 30px ${color}30;
                    }
                }
            `}</style>

            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover w-full h-full"
                />
                <div className={`absolute inset-0 transition-all duration-500 ${isActive ? 'bg-black/50' : 'bg-black/70 md:group-hover:bg-black/50'}`}></div>
            </div>

            <div 
                className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}
                style={{
                    background: color,
                    boxShadow: `0 4px 20px ${color}50`
                }}
            ></div>

            <div className={`absolute inset-0 bg-linear-to-br ${accentColor} transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-6">
                {/* Icon - Hidden by default, visible on hover */}
                <div className={`mb-4 transition-all duration-500 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 translate-y-4'}`}>
                    <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center backdrop-blur-xl border-2 transition-all duration-500"
                        style={{
                            background: `${color}20`,
                            borderColor: color,
                            boxShadow: `0 0 16px ${color}40, inset 0 0 8px ${color}20`
                        }}
                    >
                        <Icon className="w-7 h-7" style={{ color }} />
                    </div>
                </div>

                {/* Title - Centered by default, positioned on hover with smooth transition */}
                <div className={`flex-1 flex items-center transition-all duration-500 ${isActive ? 'justify-start' : 'justify-center md:group-hover:justify-start'}`}>
                    <h3 className={`text-2xl font-black text-white leading-tight transition-all duration-500 ${isActive ? 'text-left' : 'text-center md:group-hover:text-left'}`}>
                        {title}
                    </h3>
                </div>

                {/* Description - Hidden by default, visible on hover */}
                <div className={`transition-all duration-500 transform ${isActive ? 'opacity-90 mb-4 translate-y-0' : 'opacity-0 md:group-hover:opacity-90 md:group-hover:mb-4 md:group-hover:translate-y-0 translate-y-2'}`}>
                    <p className="text-xs text-gray-300 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Active Track Pill - Hidden by default, visible on hover */}
                <div className={`pt-3 border-t border-white/15 flex items-center gap-2 transition-all duration-500 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 translate-y-2'}`}>
                    <div 
                        className="w-2 h-2 rounded-full"
                        style={{
                            background: color,
                            boxShadow: `0 0 8px ${color}`
                        }}
                    ></div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Active Track</span>
                </div>
            </div>
        </div>
    );
};



const Tracks4 = () => {
    const [activeTrackIndex, setActiveTrackIndex] = React.useState(null);

    const handleToggle = (index) => {
        if (window.innerWidth < 768) {
            setActiveTrackIndex(prev => (prev === index ? null : index));
        }
    };

    return (
        <section className="py-24 bg-[#010524ff] relative overflow-hidden">
            <Starfield />
            <div className="absolute inset-0 bg-linear-to-b from-[#010524ff] via-transparent to-[#010524ff] z-0 pointer-events-none opacity-80"></div>

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl md:text-5xl text-[#f17575ff] font-bold text-center mb-16 font-['PPMori'] tracking-tight">
                    <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
                        Tracks
                    </span>
                </h2>

                <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-[#f17575]/20 bg-linear-to-br from-[#0f0320]/60 via-[#1a0a3d]/40 to-[#010524]/60"
                    style={{
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px rgba(241, 117, 117, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <div 
                        className="absolute inset-0 rounded-3xl pointer-events-none hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: 'linear-gradient(135deg, rgba(241, 117, 117, 0.1) 0%, transparent 50%, rgba(0, 212, 255, 0.05) 100%)',
                            opacity: 0
                        }}
                    ></div>

                    <div className="flex flex-wrap justify-center gap-6 relative z-10 w-full">
                        {tracksData.map((track, i) => (
                            <div key={i} className="w-full md:w-[calc(33.333%-1rem)] min-w-[280px]">
                                <TrackCard 
                                    track={track} 
                                    isActive={activeTrackIndex === i}
                                    onToggle={() => handleToggle(i)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tracks4;