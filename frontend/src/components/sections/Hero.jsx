import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import { personal, stats } from '../../utils/data'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-16 px-8 relative overflow-hidden grid-bg">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(0,255,157,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="noise-overlay absolute inset-0" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left — Text */}
        <div>
          <div className="flex items-center gap-3 text-accent text-xs tracking-[0.3em] uppercase mb-6"
               style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease' }}>
            <span className="w-8 h-px bg-accent" /> Operations Engineer · DevOps
          </div>

          <h1 className="font-syne font-black leading-[0.92] tracking-tight mb-6"
              style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)', opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease 0.15s' }}>
            <span style={{ WebkitTextStroke: '1px #e8f4f8', color: 'transparent' }}>JITHNUKA</span><br />
            <span className="text-accent">ATHURU</span><br />
            GIRIYA
          </h1>

          <div className="text-muted text-sm mb-4"
               style={{ opacity: loaded ? 1 : 0, transition: 'all 0.8s ease 0.25s' }}>
            <TypeAnimation
              sequence={['Linux Server Admin', 2000, 'DevOps Engineer', 2000, 'Telecom Systems', 2000, 'MySQL DBA', 2000, 'PHP Developer', 2000]}
              wrapper="span" speed={50} repeat={Infinity}
              className="text-accent2 font-mono text-sm tracking-widest"
            />
          </div>

          <p className="text-muted text-sm leading-relaxed max-w-lg mb-10"
             style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease 0.3s' }}>
            Motivated DevOps Engineer with hands-on experience in telecom-grade systems supporting{' '}
            <span className="text-text font-medium">10+ international operators</span>. Specialized in Linux, Nagios, MySQL, and production automation.
          </p>

          <div className="flex flex-wrap gap-4"
               style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease 0.4s' }}>
            <Link to="/contact" className="btn-primary">Get In Touch</Link>
            <a href="#experience" className="btn-outline">View Work</a>
          </div>
        </div>

        {/* Right — Photo + Stats */}
        <div className="flex flex-col items-center gap-8"
             style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease 0.3s' }}>
          <div className="relative">
            <div className="w-64 h-80 lg:w-80 lg:h-96 bg-surface border border-border relative overflow-hidden"
                 style={{ animation: 'float 6s ease-in-out infinite' }}>
              {/*
                TO ADD YOUR PHOTO:
                1. Copy your photo to frontend/public/photo.jpg
                2. Replace the div below with:
                   <img src="/photo.jpg" className="w-full h-full object-cover object-top" alt="Jithnuka" />
              */}
              <div className="w-full h-full flex flex-col items-center justify-center text-muted">
                <svg width="100" height="120" viewBox="0 0 100 120" fill="none" className="opacity-20 mb-3">
                  <circle cx="50" cy="38" r="24" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 110 C10 80 90 80 90 110" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span className="text-xs tracking-[0.2em] opacity-50">ADD PHOTO</span>
                <span className="text-xs opacity-30 mt-1">public/photo.jpg</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent pointer-events-none" />
            </div>
            <div className="absolute -top-3 -right-3 w-full h-full border border-accent/40 pointer-events-none"
                 style={{ animation: 'float 6s ease-in-out infinite 0.5s' }} />
            <div className="absolute -bottom-3 -left-3 w-full h-full border border-accent2/20 pointer-events-none" />
            <div className="absolute -top-4 -right-8 bg-surface border border-border px-4 py-2 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent2" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
                <span className="text-xs tracking-widest text-accent2 uppercase">Available</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border border border-border w-full max-w-sm">
            {stats.map((s, i) => (
              <div key={i} className="bg-surface px-6 py-4 text-center hover:bg-[#151f2a] transition-colors">
                <div className="font-syne font-black text-2xl text-accent leading-none">{s.num}</div>
                <div className="text-[0.6rem] text-muted tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
