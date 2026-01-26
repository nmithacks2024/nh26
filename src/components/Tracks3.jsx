'use client';

import React from 'react';
import { Gamepad2, Cpu, BrainCircuit, ShieldCheck, Lightbulb } from 'lucide-react';

const tracksData = [
    {
        title: "Game Dev",
        description: "Bring virtual worlds to life, crafting captivating and interactive gaming experiences.",
        icon: Gamepad2
    },
    {
        title: "IOT",
        description: "Witness the convergence of software and hardware to implement solutions that leverage the power of IoT.",
        icon: Cpu
    },
    {
        title: "AI & ML",
        description: "Push the boundaries of intelligent systems in the cutting-edge world of AI & ML.",
        icon: BrainCircuit
    },
    {
        title: "Blockchain / Cybersecurity",
        description: "Secure decentralized systems and protect digital assets in the evolving landscape of Web3 and security.",
        icon: ShieldCheck
    },
    {
        title: "Open Innovation",
        description: "Embrace the freedom to explore tech frontiers, fostering ideas that break boundaries.",
        icon: Lightbulb
    }
];

const Card = ({ title, description, icon: Icon }) => {
    const [isActive, setIsActive] = React.useState(false);

    return (
        <div 
            onClick={() => setIsActive(!isActive)}
            className={`group overflow-hidden bg-[#02093D] rounded-xl text-gray-50 max-w-sm transition-transform duration-300 border-2 border-[#ff0000] cursor-pointer ${isActive ? 'scale-105' : 'hover:scale-105'}`}
        >
            <div className={`before:duration-700 before:absolute before:w-28 before:h-28 before:bg-transparent before:blur-none before:border-8 before:opacity-20 before:rounded-full before:-left-4 before:-top-12 w-80 h-48 flex flex-col justify-between relative z-10 before:border-neutral-500 ${isActive ? 'before:top-28 before:left-44 before:scale-125 before:blur' : 'group-hover:before:top-28 group-hover:before:left-44 group-hover:before:scale-125 group-hover:before:blur'}`}>
                <div className="p-5 flex flex-col h-full relative z-10">
                    <div className="absolute top-5 right-5">
                        <Icon className={`w-6 h-6 transition-all duration-500 ${isActive ? 'rotate-[360deg] scale-155 text-[#ff0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]' : 'text-white group-hover:rotate-[360deg] group-hover:scale-155 group-hover:text-[#ff0000] group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]'}`} />
                    </div>
                    <div className="flex-1 mt-2">
                        <span className={`font-bold text-[#ef8f8fff] text-2xl tracking-tight block mb-4 transition-transform duration-300 origin-left ${isActive ? 'scale-105' : 'hover:scale-105'}`}>
                            {title}
                        </span>
                        <p className={`text-neutral-300 text-sm leading-relaxed transition-transform duration-300 origin-left ${isActive ? 'scale-105' : 'hover:scale-105'}`}>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Tracks3 = () => {
    return (
        <section className="py-20 bg-[#010524ff]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#f17575ff] mb-6">
                        <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
                            Tracks
                        </span>
                    </h2>
                    <p className="text-white max-w-2xl mx-auto">
                        This edition provides connection beyond boundaries... <span className="text-[#f17575ff]">We bring you the coolest tracks!</span>
                    </p>
                </div>

                {/* Row 1 */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 mb-8">
                    {tracksData.slice(0, 3).map((track, index) => (
                        <Card key={index} {...track} />
                    ))}
                </div>

                {/* Row 2 */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
                    {tracksData.slice(3, 5).map((track, index) => (
                        <Card key={index + 3} {...track} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tracks3;
