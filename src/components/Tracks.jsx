'use client'
import React from 'react'

const TRACKS = [
  {
    id: 'game-dev',
    title: 'Game Dev',
    desc: 'Bring virtual worlds to life, crafting captivating and interactive gaming experiences.'
  },
  {
    id: 'iot',
    title: 'IOT',
    desc: 'Witness the convergence of software and hardware to implement solutions that leverage the power of IoT.'
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    desc: 'Push the boundaries of intelligent systems in the cutting-edge world of AI & ML.'
  },
  {
    id: 'blockchain',
    title: (
      <>
        Blockchain/
        <br />
        Cybersecurity
      </>
    ),
    desc: 'Create secure, transparent, and transformative applications that harness the power of blockchain networks.'
  },
  {
    id: 'open-innovation',
    title: 'Open Innovation',
    desc: 'Embrace the freedom to explore tech frontiers, fostering ideas that break traditional boundaries.'
  }
]

const Icon = ({ name }) => {
  switch (name) {
    case 'game-dev':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 10h2M15 10h2M11 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'iot':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8v2M12 14v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'ai-ml':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'blockchain':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="7" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="15" y="7" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 10.5h6M6 10.5L9 10.5M15 17.5L18 17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'open-innovation':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 8c1-2 5-2 7 0s1 4 0 6-6 2-7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null
  }
}

const TrackCard = ({ t }) => (
  <div 
    className="relative bg-white/5 border border-white/20 rounded-3xl p-6 md:p-8 pt-12 hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm group w-full h-full flex flex-col"
  >
    {/* Mask to hide the top border line behind the semi-circle */}
    <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-[90px] h-[2px] bg-black opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />

    {/* Semi-circle that appears on hover */}
    <div className=" bg-black absolute top-[-1] left-1/2 -translate-x-1/2 w-[90px] h-[45px] border-b border-l border-r border-t-black border-white/30 rounded-b-[45px] opacity-0 group-hover:opacity-100 border-1  transition-all duration-300 pointer-events-none" />

    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black p-3 rounded-full border border-white/20 group-hover:scale-110 group-hover:-top-12 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] transition-all duration-300">
      <Icon name={t.id} />
    </div>
    
    <div className="flex flex-col items-center text-center flex-grow w-full">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-['PPMori'] break-words hyphens-auto w-full mt-5">{t.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed font-['PPMori']">
        {t.desc}
      </p>
    </div>
  </div>
)

const Tracks = () => {
  return (
    <section className="w-full py-20 bg-black text-white relative">
      
      <div className="max-w-[90vw] xl:max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-bold text-center text-white mb-6 font-['PPMori'] tracking-tight">Tracks</h2>
        <p className="text-center text-gray-400 mb-16 font-['PPMori'] max-w-2xl mx-auto">
          This edition provides connection beyond boundaries... We bring you the coolest tracks!
        </p>

        {/* All tracks in a flex container for centering the last item on tablet */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 mt-8">
          {TRACKS.map((t) => (
            <div key={t.id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex">
              <TrackCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tracks
