import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg/95 backdrop-blur-sm border-b border-border/50' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
        <Link to="/" className="font-syne font-black text-accent text-lg tracking-tight">JA</Link>
        <ul className="hidden md:flex gap-10 list-none">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href}
                 className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 relative group
                   ${location.pathname === '/contact' && l.href === '/contact' ? 'text-accent' : 'text-muted hover:text-accent'}`}>
                {l.label}
                <span className="absolute -bottom-1 left-0 right-full h-px bg-accent transition-all duration-300 group-hover:right-0" />
              </a>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-muted hover:text-accent transition-colors" onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-bg2 border-t border-border px-8 py-4">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
               className="block py-3 text-sm text-muted hover:text-accent transition-colors tracking-widest uppercase border-b border-border/30 last:border-0">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
